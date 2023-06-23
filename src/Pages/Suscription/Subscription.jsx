import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./subscription.css";

const Subscription = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [pharmacyNumber, setPharmacyNumber] = useState("");

  const handlePharmacyNumberChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPharmacyNumber(value);
    }
  };

  const [subsSucces, setSubsSucces] = useState(false);

  const postForm = (e) => {
    e.preventDefault();
    setSubsSucces(() => !subsSucces);
    
   
    //Enviar el formulario al backend
  };

  return (
    <div className="subscribe">
      <div
        className={
          subsSucces
            ? "subscribeImage subscribeImage--success"
            : "subscribeImage"
        }
      >
        <img src="/consultMed/img/subscribe.png" />
      </div>
      <Form onSubmit={postForm} className="form">
        {!subsSucces && <h2 className="heading">Suscríbete</h2>}
        {subsSucces && (
          <h2 className="heading">Te has suscrito correctamente 👍</h2>
        )}
        <Form.Control
          className="input"
          type="email"
          placeholder="Correo de Notificación"
          required
        />
        <Form.Control
          className="input"
          type="text"
          placeholder="Número de Farmacia"
          value={pharmacyNumber}
          onChange={handlePharmacyNumberChange}
          required
        />
        <Form.Check
          className="checkbox"
          type="checkbox"
          label="Tarjetón"
          onChange={() => setShowCardForm(!showCardForm)}
        />

        {showCardForm && (
          <>
            <h3>Datos del tarjetón</h3>
            {/*Datos del tarjetón */}
          </>
        )}

        <Button disabled={subsSucces} type="submit" className="btn">
          Suscribirse
        </Button>
      </Form>
    </div>
  );
};

export default Subscription;
