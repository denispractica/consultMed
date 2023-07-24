import axios from "axios";

export const SearchMedicines = async ({ search, prov, mun }) => {
  let responseData = {};
  try {
    responseData = await axios.get(
      `https://backend.t3sd.nat.cu/getSearch/?search=${search}&&prov=${prov}&&mun=${mun}`
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
