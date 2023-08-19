//import { Favorite } from "@material-ui/icons";
import React, { useState } from "react";
import "./Card.css";
//import logo from "frontend/public/logo192.png";
// import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import { Favorite } from "@mui/icons-material";
import myInitObject from "./global";

import { Card as MuiCard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = () => {
    myInitObject.p_name = props.p_name;
    myInitObject.price = props.price;
    myInitObject.image = props.image;
    myInitObject.description = props.description;
    myInitObject.category = props.category;

    Object.freeze(myInitObject);
    navigate("/singleproduct", { state: { props } });
  };

  return (
    <MuiCard sx={{ maxWidth: 250, minWidth: 250, margin: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.p_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary" onClick={onClickHandler}>
          Open
        </Button>
      </CardActions>
    </MuiCard>
    // <div className="card">
    //   <div className="card__heart">
    //     <Favorite />
    //   </div>
    //   <div className="card__image">
    //     <img
    //       onMouseOver={() => setShow(true)}
    //       onMouseLeave={() => setShow(false)}
    //       src={`${props.image}`}
    //       alt="images"
    //     />
    //   </div>
    //   <div className="productDet">
    //     <div className="card__details">
    //       <p className="title">{props.p_name}</p>
    //       <p>{props.category}</p>
    //       <span className="span1">{props.price}</span>
    //       <span className="span2">₹200</span>
    //       <span className="span3">56%</span>
    //     </div>
    //     <div className="card__size">
    //       <Button onClick={onClickHandler}>Open</Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
