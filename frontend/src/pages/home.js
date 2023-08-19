import { React, useState } from "react";
import { TextField, Button } from "@mui/material";

import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";

const Bg1Icon = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: -4.39%;
  bottom: 0%;
  left: 4.39%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
`;
const Bg4 = styled.div`
  position: absolute;
  top: 0px;
  left: -60px;
  width: 100%;
  height: 832px;
`;

export default function Home() {
  const [name, setName] = useState("");
  const [dataReceived, setDataReceived] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const onChangeHandler = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = () => {
    console.log(name);
    setLoading(true);
    const formData = { product: name };
    axios({
      // Endpoint to send files
      url: "http://127.0.0.1:5000/scrapeData",
      method: "POST",
      headers: {
        // Add any auth token here
        authorization: "your token comes here",
      },

      // Attaching the form data
      data: formData,
    })
      // Handle the response from backend here
      .then((res) => {
        setLoading(false);
        setData(res.data);
        setDataReceived(true);
      })

      // Catch errors if any
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Home</h1>
      <Bg4>
        <Bg1Icon alt="" src={"/images/bg-1@2x.png"} />
      </Bg4>
      <div
        style={{
          textAlign: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="filled"
          size="large"
          onChange={onChangeHandler}
          style={{ width: "80%" }}
        />
        <Button
          variant="contained"
          onClick={onSubmitHandler}
          style={{ height: "100%", padding: "1%" }}
        >
          Submit
        </Button>
      </div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {dataReceived &&
            data.map((product) => {
              // console.log(product);
              return (
                <Card
                  key={Math.random()}
                  p_name={product.title}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  category={product.category}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
