import React, { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  const [location, setLocation] = useState([22.986886203432356, -82.46164577350554]);
  const [zoom, setZoom] = useState([10]);
  const [wp, setWp] = useState([]);
  return (
    <Context.Provider
      value={{ location, setLocation, setZoom, zoom, wp, setWp }}
    >
      {children}
    </Context.Provider>
  );
};
export default Provider;
