import React, { useContext, useEffect } from "react";
import Search from "./Search";
import "./home.css";
import MedCard from "./MedCard";
import Medicamentos from "../../Data/Medicamentos";
import Context from "../../Components/Context/Context";

const Home = () => {
  const { location, setLocation, setWp } = useContext(Context);

  useEffect(() => {
    if (
      location[0] === 22.986886203432356 &&
      location[1] === -82.46164577350554
    ) {
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
              else return [position.coords.latitude, position.coords.longitude];
            });
          },
          function (error) {
            console.log(error);
          }
        );
      }
    }
  }, []);

  return (
    <>
      <div className="imgBanner">
        <img src="/consultMed/img/banner.png" alt="imgBanner" />
      </div>
      <Search />
      <div className="cards">
        {Medicamentos.map((e) => {
          return (
            <div key={e.id}>
              <MedCard
                name={e.name}
                description={e.description}
                imgUrl={e.imgUrl}
                price={e.price}
                availability={e.availability}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
