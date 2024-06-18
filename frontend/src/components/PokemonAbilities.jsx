import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

import capitalize from "../utils/capitalize";

import styles from "../styles/PokemonAbilities.module.scss";

const PokemonAbilities = ({ abilities }) => {
  const [abilityDescription, setAbilityDescription] = useState(null);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const data = await Promise.all(
          abilities.map(async (ability) => {
            const res = await fetch(ability.ability.url);
            if (!res.ok) {
              throw new Error("Error fetching abilities");
            }
            return await res.json();
          })
        );

        const descriptions = data.map((abilityData) => {
          const entry = abilityData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );
          return entry ? entry.flavor_text : "No description avaliable.";
        });

        setAbilityDescription(descriptions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAbilities();
  }, [abilities]);

  const populateAbilities = () => {
    return abilities.map((ability, index) => (
      <div key={uuidv4()} className={styles.ability__items_text}>
        <p className={styles.ability__name}>{capitalize(ability.ability.name, true)}</p>
        <p>{abilityDescription[index]}</p>
      </div>
    ));
  };

  return (
    <>
      {abilityDescription !== null && (
        <div className={styles.ability__container}>
          <p>ABILITIES</p>
          <div className={styles.ability__items}>{populateAbilities()}</div>
        </div>
      )}
    </>
  );
};

PokemonAbilities.propTypes = {
  abilities: PropTypes.array.isRequired,
};

export default PokemonAbilities;
