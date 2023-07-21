import React from "react";
import MedCard from "./MedCard";
import "./home.css";

const ListOfMedicines = ({ medicines }) => {
  return (
    <div className="cards">
      {medicines.map((e) => {
        return (
          <MedCard
            key={crypto.randomUUID()}
            name={e.nombre}
            pharmacy={e.farmacia}
            price={e.precio}
            availability={e.disponibilidad}
          />
        );
      })}
    </div>
  );
};

const NoResults = () => {
  return <p>No se encontraron resultados</p>;
};

export const Medicines = ({ medicines }) => {
  const hasMedicines = medicines?.length > 0;

  return hasMedicines ? (
    <ListOfMedicines medicines={medicines} />
  ) : (
    <NoResults />
  );
};
