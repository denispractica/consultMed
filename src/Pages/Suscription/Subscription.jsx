import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import "./subscription.css";
import axios from "axios";

const Subscription = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [response, setResponse] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const [subsSucces, setSubsSucces] = useState(false);

  const postForm = async (data) => {
    const rq = {
      email: data.email,
      pharmacy: data.pharmacy.trim().split(/\s+/),
      medicine: data.medicine.trim().split(/\s+/),
      tarjeton: data.tarjeton ? true : false,
    };

    try {
      const rp = await axios.post(
        "https://backend.t3sd.nat.cu/setSuscription",
        rq
      );
      if (rp.data.Error) {
        setResponse(rp.data.response);
        return;
      } else if (rp.data.response !== "Ese correo ya está en uso") {
        setResponse(rp.data.response);
        resetField("email");
        resetField("pharmacy");
        resetField("medicine");
        resetField("tarjeton");
        setSubsSucces(true);
        setTimeout( () => {
           setSubsSucces(false);
        }, 5000);
        return;
      } else {
        setResponse(rp.data.response);
        return;
      }
    } catch (error) {
      console.log("Algo salió mal", error);
    }
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
        <img src="/consultMed/img/subscribe.png" alt="imagen" />
      </div>
      <Form onSubmit={handleSubmit(postForm)} className="form">
        {!subsSucces && <h2 className="heading">Suscríbete</h2>}
        {subsSucces && <h2 className="heading">{response} </h2>}
        <Form.Control
          className="input"
          placeholder="Correo de Notificación"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email?.type === "required" && (
          <div className="aviso">El correo es obligatorio </div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="aviso">Lo que escribiste no es un correo válido</div>
        )}

        <Form.Control
          className="input"
          placeholder="Máximo 3 farmacias y separadas por un espacio"
          {...register("pharmacy", {
            required: true,
            pattern: /^\d{1,5}( \d{1,5}){0,4}\s*$/,
          })}
        />
        {errors.pharmacy?.type === "required" && (
          <div className="aviso">Debes ingresar al menos una farmacia</div>
        )}
        {errors.pharmacy?.type === "pattern" && (
          <div className="aviso">
            Máximo de tres farmacias separadas por un espacio
          </div>
        )}

        <Form.Control
          className="input"
          placeholder="Máximo 5 medicinas y separadas por un espacio"
          {...register("medicine", {
            required: true,
            pattern: /^([a-zA-Z]+\s){0,4}[a-zA-Z]+\s*$/,
          })}
        />
        {errors.medicine?.type === "required" && (
          <div className="aviso">Debes ingresar al menos un medicamento</div>
        )}
        {errors.medicine?.type === "pattern" && (
          <div className="aviso">
            Máximo de cinco medicamentos separados por un espacio
          </div>
        )}

        <Form.Check
          className="checkbox"
          type="checkbox"
          label="Tarjetón"
          onChange={() => setShowCardForm(!showCardForm)}
          {...register("tarjeton")}
        />
        {showCardForm && (
          <>
            <h3>Datos del tarjetón</h3>
          </>
        )}

        <Button type="submit" className="btn">
          Suscribirse
        </Button>
      </Form>
    </div>
  );
};
export default Subscription;
