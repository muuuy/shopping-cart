import "./App.scss";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Favicon from "react-favicon";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import ResetPassword from "./pages/ResetPassword";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import ShopPokemon from "./pages/ShopPokemon";

import GreetingBanner from "./components/GreetingBanner";

//test

function App() {
  const [userInput, setUserInput] = useState("pikachu");
  const [itemType, setItemType] = useState("pokemon");

  useEffect(() => {
    console.log(itemType);
  }, [itemType]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>POKE STOP</title>
        </Helmet>
      </HelmetProvider>

      <Favicon
        url={
          "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png"
        }
      />

      {/* <div id="web-container">
        <Navbar setInput={setUserInput} setType={setItemType} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/"
            element={<Home userInput={userInput} itemType={itemType} />}
          />
          <Route path="/store" Component={Store} />
          <Route path="/shop-pokemon/:itemName" element={<ShopPokemon />} />
        </Routes>
      </div> */}
      <Navbar setInput={setUserInput} setType={setItemType} />
      <GreetingBanner />
    </>
  );
}

export default App;
