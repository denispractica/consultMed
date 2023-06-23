import { Icon } from "leaflet";
import L from "leaflet";

export function myIcon(url) {
  return new Icon({
    iconUrl: url,
    iconSize: [38, 38],
    iconAnchor: [22, 34],
    popupAnchor: [-10, -70],
  });
}

//Algoritmo de Haversine
export function getKilometros(lat1, lon1, lat2, lon2) {
  const rad = function (x) {
    return (x * Math.PI) / 180;
  };
  let R = 6378.137; //Radio de la tierra en km
  let dLat = rad(lat2 - lat1);
  let dLong = rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d.toFixed(3); //Retorna tres decimales
}
export function RoutingMap({ waypoints }) {
  const instance = L.Routing.control({
    waypoints: waypoints.map((coords) => L.latLng(coords)),
    createMarker: () => null,
    lineOptions: {
      styles: [
        { color: "black", opacity: 0.8, weight: 8 },
        { color: "white", opacity: 1, weight: 4, dashArray: "7,12" },
      ],
    },
  });
  return instance;
}
