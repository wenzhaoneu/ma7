const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

const name = "Wen Zhao"
console.log(`My name is ${name}`)

const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res,next) {
    res.send(myPokemon);
    next();
});


router.post('/', (req, res) => {
  
    const pokemon_name = req.body.name;
    const pokemon_health = req.body.health;
    const pokemon_level = req.body.level;

    const nameSearch = myPokemon.find(pokemon => pokemon.name === pokemon_name);

    if(nameSearch){
        res.status(404).send(pokemon_name + " existed in the team!")
    } else{

        const newPokemon = {}
        newPokemon.id = uuid();
        newPokemon.name = pokemon_name;
        if(pokemon_health != null){
            newPokemon.health = pokemon_health;
        }else{
            newPokemon.health = Number(Math.floor(Math.random() * 100) + 10);
        }
        if(pokemon_level != null){
            newPokemon.level = pokemon_level;
        }else{
            newPokemon.level = Number(Math.floor(Math.random() * 10) + 1);
        }
        myPokemon.push(newPokemon);
        res.sendStatus(200);
    }
});

router.get('/:pokemonId', function (req, res) {
    const newID = req.params.pokemonId;
    var result = 0;
    for(let i = 0; i < myPokemon.length;i++){
        if(myPokemon[i].id === newID){
            result = i;
        }
    }
    if(result != 0){
        res.status(200).send(myPokemon[result]);
    } else{
        res.status(404).send("No pokemon found with the id ")
    }
});

router.put('/:pokemonId', function(req, res) {
    const newID =req.params.pokemonId;
    const idSearch = myPokemon.find(pokemon => pokemon.id === newID)
    if(!idSearch){
        res.status(404).send("No pokemon matches " + newID);
    }else{
        const newName = req.body.name;
        const newHealth = req.body.health;
        const newLevel = req.body.level;
        if(newName == null || newHealth == null || newLevel == null){
            res.status(400).send("Not valid pokemon data ");
        }else{
            for(let i = 0; i < myPokemon.length;i++){
                if(myPokemon[i].id === newID){
                    const pokemon = myPokemon[i];
                    if(pokemon.name != newName){
                        res.status(400).send("Not valid pokemon name");
                    }else{
                        pokemon.health = newHealth;
                        pokemon.level = newLevel;
                        res.status(200).send("Success Put!")
                    }
                }
            }
        }
    }

})

router.delete('/:pokemonId', function(req, res) {
    const newID = req.params.pokemonId;
    for (let i = 0; i < myPokemon.length;i++) {
        const pokemon = myPokemon[i];
        if (pokemon.id === newID) {
            myPokemon.splice(i,1);
        }
    }
    res.status(200).send("Success Delete!")

})

module.exports = router;