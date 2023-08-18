import React from "react";
import Card from "../components/Card";
import style from "./Products.css";
export default function Products() {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card />
        <Card />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card />
        <Card />
      </div>
    </>
  );
}
