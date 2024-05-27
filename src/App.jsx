import "./App.css";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Favicon from "react-favicon";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import ShopPokemon from "./pages/ShopPokemon";

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

      <div id="web-container">
        <Navbar setInput={setUserInput} setType={setItemType} />
        <Routes>
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
