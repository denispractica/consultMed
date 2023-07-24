import { useState, useContext } from "react";
import { SearchMedicines } from "../../Pages/Home/SearchMedicines";
import Context from "../Context/Context";

export const useMedicines = ({ search }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { municipio, provincia } = useContext(Context);
  let prov = provincia;
  let mun = municipio;

  const getMedicines = async () => {
    try {
      setLoading(true);
      setError(null);

      if (prov === null || prov === "undefined") prov = "";
      if (mun === null || mun === "undefined") mun = "";
      const newMedicines = await SearchMedicines({
        search,
        prov,
        mun,
      });

      if (newMedicines.length > 0) {
        setMedicines(newMedicines);
      } else {
        setMedicines([]);
      }
    } catch (e) {
      setError(e.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { medicines, getMedicines, loading };
};
