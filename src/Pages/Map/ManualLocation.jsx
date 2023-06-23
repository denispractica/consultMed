import React, { useContext, useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { createRoot } from "react-dom/client";
import { TextField, Autocomplete, useTheme } from "@mui/material";
import municipios from "../../Data/Municipios.json";
import Context from "../../Components/Context/Context";

function ManualLocation() {
  const map = useMap();
  const theme = useTheme();
  const { setLocation, setWp } = useContext(Context);
  useEffect(() => {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");

    createRoot(container).render(
      <Autocomplete
        onChange={(e, valor) => {
          if (valor != null) {
            setLocation(valor.coordinates);
            setWp((e) => {
              if (e.length > 1) return [valor.coordinates, e[1]];
              else return [valor.coordinates];
            });
          }
        }}
        id="menuselect"
        options={municipios}
        sx={{ width: 280, [theme.breakpoints.down(600)]: { width: 180 } }}
        renderInput={(params) => <TextField {...params} label="Ubicación" />}
      />
    );
    map.addControl(
      new (L.Control.extend({
        options: { position: "topleft" },
        onAdd: () => container,
      }))()
    );
  }, []);

  return null;
}
export default ManualLocation;
