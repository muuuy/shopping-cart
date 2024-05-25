import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import capitalize from "../utils/capitalize";

const ShopPokemon = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    console.log("state", location.state.item);
    setPokemon(location.state.item);
  }, [location]);

  return (
    <>
      {pokemon && (
        <div>
          <p>diwhiaodhwaio</p>
          <img src={pokemon.sprites.front_default}></img>
          <h1>{capitalize(pokemon.name)}</h1>
        </div>
      )}
    </>
  );
};

export default ShopPokemon;
