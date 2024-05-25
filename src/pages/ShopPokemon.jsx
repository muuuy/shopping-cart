import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShopPokemon = () => {
  const { itemName } = useParams();

  useEffect(() => {
    console.log("Item name:", itemName);
    // Fetch data based on itemName if necessary
  }, [itemName]);

  return (
    <div>
      <p>diwhiaodhwaio</p>
    </div>
  );
};

export default ShopPokemon;
