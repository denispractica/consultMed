import React, { useContext } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useRef, useMemo } from "react";
import Context from "../../Components/Context/Context";
import { myIcon } from "../../Components/Functions";

const DraggableMarker = () => {
  const icon = myIcon("/consultMed/icons/pos.png");
  const { location, setLocation, setZoom, setWp } = useContext(Context);
  const markerRef = useRef(null);
  const map = useMap();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLocation([marker.getLatLng().lat, marker.getLatLng().lng]);
          setZoom(map.getZoom());
          setWp((e) => {
            if (e.length > 1)
              return [[marker.getLatLng().lat, marker.getLatLng().lng], e[1]];
            else return [[marker.getLatLng().lat, marker.getLatLng().lng]];
          });
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={location}
      ref={markerRef}
      icon={icon}
    >
      <Popup>
        <h6 style={{ fontSize: "15px" }}>
          Puedes mover el marcador para una ubicación más precisa
        </h6>
      </Popup>
    </Marker>
  );
};
export default DraggableMarker;
