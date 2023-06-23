import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Provider from "./Context/Provider";
import NavBar from "../Pages/Home/NavBar";
import Map from "../Pages/Map/Map";
import MedicinesTable from "../Pages/Medicines/MedicinesTable";
import Subscription from "../Pages/Suscription/Subscription";

const Router = () => {
  return (
    <BrowserRouter>
      <Provider>
        <NavBar />
        <Routes>
          <Route path="/consultMed" element={<Home />} />
          <Route path="/consultMed/map" element={<Map />} />
          <Route
            path="/consultMed/map/medicinesTable/:id/:nombre"
            element={<MedicinesTable />}
          />
          <Route path="/consultMed/form" element={<Subscription />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Router;
