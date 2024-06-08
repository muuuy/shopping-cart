import "./App.scss";
import { useState, useEffect, useRef } from "react";
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
import Banner from "./components/Banner";
import PokemonBanner from "./components/PokemonBanner";

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const [userInput, setUserInput] = useState("pikachu");
  const [itemType, setItemType] = useState("pokemon");

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

      <div id="section0">
        <Navbar setInput={setUserInput} setType={setItemType} />
        <GreetingBanner />
      </div>
      <div id="section1">
        <Banner />
      </div>
      <div id="section2">
        <PokemonBanner />
      </div>
      <div>
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
      </div>
    </>
  );
}

export default App;
