import React, { useState } from "react";
import "./App.css"


const PokemonApp = () => {
  const [query, setQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  const grabPoke = async (e) => {
    e.preventDefault();
if (query == "" ) return

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        alert("Please make sure the Pokémon name or ID is typed correctly.");
        setPokemonData(null);
      }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  return (
    <div>
        <form onSubmit={grabPoke}>
        <div className="containerInput">
          <input
            type="text"
            id="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Pokémon name or ID"
            />
          <button id="submit" type="submit">
     
          </button>
            </div>
        </form>

        {pokemonData && (
          <div>
                  <div className="container">

      <div className="imgBack">
            <div id="number">#{pokemonData.id}</div>
            <img
              id="poke_pic"
              src={pokemonData.sprites.front_default}
              alt={pokemonData.species.name}
              />
             <img
              id="poke_pic"
              src={pokemonData.sprites.front_shiny}
              alt={pokemonData.species.name}
              />
              </div>
              </div>
            <div id="name">{pokemonData.species.name.toUpperCase()}</div>
            <div id="type">
              TYPE:{" "}
              {pokemonData.types
                .map((type) => type.type.name)
                .join(", ")
                .toUpperCase()}
            </div>
            <div id="abilities">
              ABILITIES:{" "}
              {pokemonData.abilities
                .map((ability) => ability.ability.name)
                .join(", ")
                .toUpperCase()}
            </div>
            <div id="hp">BASE HEALTH: {pokemonData.stats[5].base_stat}</div>
            <div id="attack">ATTACK: {pokemonData.stats[4].base_stat}</div>
            <div id="defense">DEFENSE: {pokemonData.stats[3].base_stat}</div>
            <div id="speed">SPEED: {pokemonData.stats[0].base_stat}</div>
              
          </div>

        )}

    </div>
  );
};

export default PokemonApp;
