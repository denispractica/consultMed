import React, { useContext } from "react";
import { Autocomplete, Grid, TextField, useTheme } from "@mui/material";
import Ubicaciones from "./../../Data/Ubicaciones.json";
import Context from "../../Components/Context/Context";

const Filters = () => {
  const { municipio, setMunicipio, provincia, setProvincia } =
    useContext(Context);

  const provincias = [...new Set(Ubicaciones.map((item) => item.provincia))];
  const municipios = provincia
    ? Ubicaciones.filter((item) => item.provincia === provincia).map(
        (item) => item.municipio
      )
    : [];
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      flexDirection={"column"}
      margin={"10px"}
      sx={{ [theme.breakpoints.down(600)]: { marginTop: "10vh" } }}
    >
      <Grid item xs={2} minWidth={"210px"}>
        <Autocomplete
          options={provincias}
          value={provincia}
          onChange={(event, newValue) => {
            setProvincia(newValue);
            setMunicipio(null);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar por provincia" />
          )}
        />
      </Grid>
      <Grid item xs={2} minWidth={"210px"}>
        <Autocomplete
          options={municipios}
          value={municipio}
          onChange={(event, newValue) => {
            setMunicipio(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar por municipio" />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
