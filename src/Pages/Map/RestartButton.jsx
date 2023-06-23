import React, { useEffect, useContext } from "react";
import L from "leaflet";
import { IconButton } from "@mui/material";
import DirectionsOffIcon from "@mui/icons-material/DirectionsOff";
import { useMap } from "react-leaflet";
import { createRoot } from "react-dom/client";
import Context from "../../Components/Context/Context";

function RestartButton() {
  const map = useMap();
  const { setWp, location } = useContext(Context);

  const restart = () => {
    setWp([location]);
  };

  useEffect(() => {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");

    createRoot(container).render(
      <IconButton
        sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" } }}
        title="Reiniciar Ruta"
        color="default"
        size="large"
        component="label"
        onClick={restart}
      >
        <DirectionsOffIcon />
      </IconButton>
    );

    map.addControl(
      new (L.Control.extend({
        options: { position: "bottomright" },
        onAdd: () => container,
      }))()
    );
  }, []);

  return null;
}
export default RestartButton;
