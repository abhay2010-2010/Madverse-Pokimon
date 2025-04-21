const express = require("express");
const Pokemon = require("../models/pokemon");
const Router = express.Router();

Router.get("/", () => {
  res.send("✅ Server is alive and working!");
});


Router.get("/pokemons", async (req, res) => {
  const allPokemon = await Pokemon.find({});
  res.json(allPokemon);
});


Router.get("/pokemons/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const pokemon = await Pokemon.findOne({
      name: { $regex: `^${name}$`, $options: "i" }, // 'i' = case insensitive
    });
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ message: "Pokemon not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error fetching pokemon" });
  }
});

// Get multiple pokemon by names (case-insensitive)
Router.post("/pokemon", async (req, res) => {
  const { names } = req.body;
  try {
    const regexNames = names.map((name) => new RegExp(`^${name}$`, "i")); // case-insensitive
    const pokemons = await Pokemon.find({ name: { $in: regexNames } });
    res.json(pokemons);
  } catch (err) {
    console.error("Error fetching pokemons:", err);
    res.status(500).json({ error: "Error fetching pokemons" });
  }
});

// Get Pokémon by type
Router.get("/pokemons/type/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const pokemons = await Pokemon.find({ types: { $in: [type] } });
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Pokémon by type" });
  }
});

module.exports = Router;
