import { React, useState } from "react";
import { TextField, Button } from "@mui/material";

import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");

  const onChangeHandler = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = () => {
    console.log(name);
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
        console.log(res);
        fetch("../../../" + res)
          .then((response) => response.json())
          .then((json) => console.log(json));
      })

      // Catch errors if any
      .catch((err) => {});
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
    </div>
  );
}
