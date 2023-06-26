import axios from "axios";

export const SearchMedicines = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=e046e150&s=${search}`
    );
    const data = await response.data;

    const medicines = data.Search;

    return medicines?.map((medicine) => ({
      id: medicine.imdbID,
      farmacia: medicine.Title,
      nombre: medicine.Year,
      cantidad: medicine.Year,
      precio: medicine.Type,
    }));
  } catch (e) {
    throw new Error("Error al buscar");
  }
};
