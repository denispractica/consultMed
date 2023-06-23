import React, { useState } from "react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: `${value === 0 ? "absolute" : "relative"}`,
        width: "100%",
        display: "flex",
        justifyContent: "right",
        marginTop: `${value === 0 ? "50vh" : "1px"}`,
        [theme.breakpoints.down(600)]: {
          marginTop: `${value === 0 ? "30vh" : "1px"}`,
        },
      }}
    >
      <BottomNavigation
        sx={{
          margin: "10px",
          backgroundColor: "transparent",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Inicio"
          icon={<HomeIcon />}
          onClick={() => navigate("/consultMed")}
        />
        <BottomNavigationAction
          label="Mapa"
          icon={<MapIcon />}
          onClick={() => navigate("/consultMed/map")}
        />
        <BottomNavigationAction
          label="Suscribirse"
          icon={<AppRegistrationIcon />}
          onClick={() => navigate("/consultMed/form")}
        />
      </BottomNavigation>
    </Box>
  );
};
export default NavBar;
