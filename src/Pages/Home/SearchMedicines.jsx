import axios from "axios";

export const SearchMedicines = async ({ search }) => {
  let responseData = {};
  try {
    responseData = await axios.get(
      `https://backend.t3sd.nat.cu/getSearch/?search=${search}`
    );
  } catch (e) {
    return { Error: true };
  }

  if (!responseData.data.Error) {
    return responseData.data.Search;
  } else {
    return [];
  }
};
