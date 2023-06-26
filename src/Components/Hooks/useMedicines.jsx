import { useRef, useState } from "react";
import { SearchMedicines } from "../../Pages/Home/SearchMedicines";

export const useMedicines = ({ search }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMedicines = async () => {
    if (previousSearch.current === search) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMedicines = await SearchMedicines({ search });
      setMedicines(newMedicines);
    } catch (e) {
      setError(e.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { medicines, getMedicines, loading };
};
