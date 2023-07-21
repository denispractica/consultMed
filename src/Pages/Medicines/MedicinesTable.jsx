import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

function MedicinesTable() {
  const params = useParams();
  const columns = ["Medicamentos", "Disponibilidad", "Precio"];
  const nombrePharmacy = params.nombre;
  const [data, setData] = useState([]);
  const options = {
    download: false,
    print: false,
    fixedSelectColumn: false,
    tableBodyHeight: "75.6vh",
    responsive: "standard",
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 12, 16],
    selectableRows: "none",
    viewColumns: false,
    textLabels: { body: { noMatch: <LinearProgress /> } },
  };
  const getMedicines = (medicines) => {
    const aux = [];
    medicines.map((m) => {
      aux.push([m.nombre, m.disponibilidad, m.precio]);
    });
    setData(aux);
  };

  useEffect(() => {
    axios
      .get(`https://backend.t3sd.nat.cu/getMedicine/${nombrePharmacy}`)
      .then((resp) => getMedicines(resp.data.Medicines))
      .catch((e) => console.log(e));
  }, []);

  return (
    <MUIDataTable
      title={`Tabla de Medicamentos de la Farmacia "${params.nombre}"`}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default MedicinesTable;
