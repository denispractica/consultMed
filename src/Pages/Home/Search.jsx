import React, { useState, useEffect, useRef, useCallback } from "react";
import "./home.css";
import { useMedicines } from "../../Components/Hooks/useMedicines";
import { Medicines } from "./Medicines";
import LinearProgress from "@mui/material/LinearProgress";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const firstInput = useRef(true);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No está escribiendo nada para buscar");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar un medicamento con un número");
      return;
    }

    if (search.length < 3) {
      setError("Debe escribir al menos 3 caracteres para buscar");
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error };
};

const Search = () => {
  const { search, setSearch, error } = useSearch();
  const { medicines, getMedicines, loading } = useMedicines({ search });

  const searchTerm = (e) => {
    e.preventDefault();
    getMedicines();
  };

  const searchChange = (e) => {
    const newSearch = e.target.value;
    
    if (newSearch.startsWith(" ")) return;
    setSearch(newSearch);
  };

  return (
    <>
      <header className="container">
        <form onSubmit={searchTerm}>
          <div className="inputbox">
            <input
              required="required"
              value={search}
              placeholder="Buscar Medicamentos..."
              onChange={searchChange}
            />
            
            <button
              onClick={() => {
                setSearch("");
              }}
              type="reset"
              className="del"
            ></button>
    
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main className="showResult">
        {loading ? <LinearProgress /> : <Medicines medicines={medicines} />}
      </main>
    </>
  );
};

export default Search;
