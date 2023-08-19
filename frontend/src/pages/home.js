import { React, useState } from "react";
import { TextField, Button } from "@mui/material";

import axios from "axios";

import Card from "../components/Card";

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
      <h1>Home</h1>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="filled"
        size="large"
        onChange={onChangeHandler}
      />
      <Button variant="contained" onClick={onSubmitHandler}>
        Submit
      </Button>
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
