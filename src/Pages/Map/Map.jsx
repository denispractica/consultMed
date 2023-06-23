import React, { useContext, useEffect, useState } from "react";
import Context from "../../Components/Context/Context";
import {
  TileLayer,
  MapContainer,
  LayerGroup,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import DraggableMarker from "./DraggableMarker";
import LocationButton from "./LocationButton";
import { getKilometros, myIcon,RoutingMap } from "../../Components/Functions";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { IconButton } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsIcon from "@mui/icons-material/Directions";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import RestartButton from "./RestartButton.jsx";
import ManualLocation from "./ManualLocation";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { useNavigate } from "react-router-dom";



const RoutingComp = createControlComponent(RoutingMap);

const Map = () => {
  const { location, zoom, wp, setWp } = useContext(Context);
  const [arrayIcons, setArrayIcons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/mitesis123/dbjson/farmacias")
      .then((resp) => setArrayIcons(paintFarms(resp.data)))
      .catch((e) => console.log(e));
  }, [location]);

  const paintFarms = (farms) => {
    const array = [];
    let farmIcon = myIcon("/consultMed/icons/farm.png");
    let farmIconNear = myIcon("/consultMed/icons/farmNear.png");
    let icon = farmIcon;
    farms.map((e) => {
      icon === farmIconNear ? (icon = farmIcon) : (icon = farmIcon);
      if (
        getKilometros(location[0], location[1], e.location[0], e.location[1]) <=
        5
      ) {
        icon = farmIconNear;
      }
      array.push(
        <Marker key={e.id} position={e.location} icon={icon}>
          <div className="mapPop">
            <Popup>
              <>
                <h6>
                  <IconButton sx={{ fontSize: "12px", color: "black" }}>
                    <BadgeIcon /> {e.nombre}
                  </IconButton>
                </h6>
                <h6>
                  <IconButton sx={{ fontSize: "12px", color: "black" }}>
                    <AlternateEmailIcon /> {e.direccion}
                  </IconButton>
                </h6>
                <h6>
                  <IconButton sx={{ fontSize: "12px", color: "black" }}>
                    <PhoneIphoneIcon /> {e.telefono}
                  </IconButton>
                </h6>
                <h6>
                  <IconButton sx={{ fontSize: "12px", color: "black" }}>
                    <DirectionsRunIcon />
                    {`Estás aproximadamente a ${getKilometros(
                      location[0],
                      location[1],
                      e.location[0],
                      e.location[1]
                    )}Km`}
                  </IconButton>
                </h6>
                <h6>
                  <IconButton
                    sx={{ fontSize: "12px", color: "black" }}
                    onClick={() => {
                      navigate(
                        `/consultMed/map/medicinesTable/${e.id}/${e.nombre}`
                      );
                    }}
                  >
                    <VaccinesIcon /> Ver Medicamentos
                  </IconButton>
                </h6>
                <h6>
                  <IconButton
                    sx={{ fontSize: "12px", color: "black" }}
                    onClick={() => {
                      if (wp.length > 0)
                        setWp((w) => {
                          if (w.length > 0) return [...w, e.location];
                        });
                    }}
                  >
                    <DirectionsIcon /> Ir
                  </IconButton>
                </h6>
              </>
            </Popup>
          </div>
        </Marker>
      );
    });
    return array;
  };

  return (
    <>
      <MapContainer
        attributionControl={false}
        key={`${location}`}
        center={location}
        zoom={zoom}
        scrollWheelZoom={true}
        className="mapContainer"
      >
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Farmacias">
            <LayerGroup>{arrayIcons}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.BaseLayer checked name="OSM">
            <LayerGroup>
              <TileLayer
                url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
              />
              ;
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Híbrido">
            <LayerGroup>
              <TileLayer
                url={"https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"}
              />
              ;
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satelital">
            <LayerGroup>
              <TileLayer
                url={
                  "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                }
              />
              ;
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>

        <DraggableMarker />

        <LocationButton />

        <RestartButton />

        <ManualLocation />

        {wp.length > 1 && <RoutingComp waypoints={wp} />}
      </MapContainer>
    </>
  );
};
export default Map;
