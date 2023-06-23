import React, { useEffect, useContext } from "react";
import L from "leaflet";
import { IconButton } from "@mui/material";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useMap } from "react-leaflet";
import { createRoot } from "react-dom/client";
import Context from "../../Components/Context/Context";

const LocationButton = () => {
  const map = useMap();
  const { setLocation, setWp } = useContext(Context);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation([position.coords.latitude, position.coords.longitude]);
          setWp((e) => {
            if (e.length > 1)
              return [
                [position.coords.latitude, position.coords.longitude],
                e[1],
              ];
            else return [[position.coords.latitude, position.coords.longitude]];
          });
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  useEffect(() => {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");

    createRoot(container).render(
      <IconButton
        sx={{ "& .MuiSvgIcon-root": { fontSize: "20px" } }}
        title="Localizar"
        color="default"
        size="large"
        component="label"
        onClick={() => {
          getLocation();
        }}
      >
        <GpsFixedIcon />
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
};
export default LocationButton;
