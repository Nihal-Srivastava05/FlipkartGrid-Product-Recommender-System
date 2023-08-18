//import { Favorite } from "@material-ui/icons";
import React, { useState } from "react";
import "./Card.css";
//import logo from "frontend/public/logo192.png";
import { Button } from "@mui/material";

import {Favorite} from '@mui/icons-material'
import NikeShoeWithImages from "../pages/SingleProduct"

const Card = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="card">
      <div className="card__heart"><Favorite /></div>
      <div className="card__image">
        <img
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          src={"/images/logo192.png"}
          alt="images"
        />
      </div>
      <div className="productDet">
        <div className="card__details">
          <p className="title">{props.p_name}</p>
          <p>running shoes</p>
          <span className="span1">₹{props.price}</span>
          <span className="span2">₹200</span>
          <span className="span3">56%</span>
        </div>
        <div className="card__size">
          <Button onClick={<NikeShoeWithImages p_name={props.p_name} price={props.price}/>}>Open</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
