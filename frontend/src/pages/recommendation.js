import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";
import myInitObject from "../components/global";

const Recommendation = (props) => {
  const [data, setData] = useState({});
  const [dataReceived, setDataReceived] = useState(false);
  const [loading, setLoading] = useState(true);

  const formData = {
    p_name: myInitObject.p_name,
    description: myInitObject.description,
    category: myInitObject.category,
  };

  // const formData = {
  //   p_name: "Men Regular Fit Printed Spread Collar Casual Shirt",
  //   description:
  //     "High-quality FabricThe MILDIN Men Slim-fit formal shirt is made from high-quality cotton-blend fabric that comprises 60% cotton—making it ideal for wearing in the summer. Additionally, the shirt being slim fit helps you achieve a smart, professional look.",
  //   category: "Clothing",
  // };

  useEffect(() => {
    axios({
      // Endpoint to send files
      url: "http://127.0.0.1:5000/getRec",
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
        console.log(res.data);
        setLoading(false);
        setData(res.data);
        setDataReceived(true);
      })

      // Catch errors if any
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <h1>Recommendation</h1>

          {dataReceived &&
            data.map((product) => {
              return (
                <Card
                  key={Math.random()}
                  p_name={product[0]}
                  price={product[1]}
                  image={product[3].slice(1, -1).split(",")[0].slice(1, -1)}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
