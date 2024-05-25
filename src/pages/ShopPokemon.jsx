import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ShopPokemon = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("state", location.state.item);
    // Fetch data based on itemName if necessary
  }, [location]);

  return (
    <div>
      <p>diwhiaodhwaio</p>
    </div>
  );
};

export default ShopPokemon;
