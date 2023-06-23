import React, { useState } from "react";

const Search = () => {
  const [search, Setsearch] = useState("");

  const searchTerm = (e) => {
    e.preventDefault();
    console.log("Prueba de envio");
    //Hacer la consulta al backend
  };

  return (
    <form onSubmit={searchTerm}>
      <div className="inputbox">
        <input
          required="required"
          value={search}
          placeholder="Buscar Medicamentos..."
          onChange={(e) => Setsearch(e.target.value)}
        />
        <button
          onClick={() => {
            Setsearch("");
          }}
          type="reset"
          className="del"
        ></button>
      </div>
    </form>
  );
};

export default Search;
