import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";

const MedCard = ({
  name = "medicamento",
  pharmacy = "sobre el medicamento",
  price = "1",
  availability = false,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={"/consultMed/img/med.jpg"}
          alt={name}
        />
        <CardContent sx={{ height: 105 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display="block"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
            }}
          >
            {pharmacy}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ backgroundColor: availability ? "#21c05a" : "#e1183a" }}
      >
        <Button>
          <MapIcon sx={{ color: "black", fontSize: "30px" }} />
        </Button>
      </CardActions>
    </Card>
  );
};
export default MedCard;
