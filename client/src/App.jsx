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
          <div className="container">
        <form onSubmit={grabPoke}>
     
          <input
            type="text"
            id="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Pokémon name or ID"
            />
          <button id="submit" type="submit">
     Selecionar
          </button>
      
        </form>

        {pokemonData && (
          <div>
            
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
              <div class="bottom-container">
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
<table>
  <tr>

  </tr>
  <tr>
    <td>HP:</td>
    <div id="hp"> {pokemonData.stats[5].base_stat}</div>
  </tr>
  <tr>
    <td>Attack:</td>
    <div id="attack"> {pokemonData.stats[4].base_stat}</div>
  </tr>
  <tr>
    <td>Defense:</td>
    <div id="defense"> {pokemonData.stats[3].base_stat}</div>
  </tr>
  <tr>
    <td>Speed</td>
    <div id="speed"> {pokemonData.stats[0].base_stat}</div>
  </tr>
</table>
          </div>
              </div>
            

          
            
            
            
            )}

            </div>
    </div>
  );
};

export default PokemonApp;
