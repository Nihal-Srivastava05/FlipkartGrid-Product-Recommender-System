import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import Wishlist from "./pages/wishlist";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path='/home' element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
