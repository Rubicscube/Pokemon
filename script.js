const api_url = "https://pokeapi.co/api/v2/pokemon/";
const moveAmount = 4;

//SEARCH BUTTON
document.getElementById("run").addEventListener("click", function(){

    let input = document.getElementById('pokemon').value.toLowerCase();
    fetcher(input);

});

function fetcher(input){
    fetch(api_url+input)
        .then(function(response){
            return response.json();
        })
        .then(function(pokemon) {
            //ALL THE INFO
            console.log(pokemon);

            //NAME
            console.log(pokemon.name);
            let name = document.createElement('p');

            //ID
            console.log(pokemon.id);

            //IMAGE
            console.log(pokemon.sprites.front_default);

            //DISPLAY 4 RANDOM MOVES (or less, if the pokemon doesn't have 4 moves)
            if (pokemon.moves.length < moveAmount){

                for (let i = 0; i < pokemon.moves.length; i++) {
                    console.log(pokemon.moves[i].move.name);
                }
            }
            else{
                for (let i = 0; i < moveAmount; i++) {
                    let list = Math.floor(Math.random() * pokemon.moves.length);
                    console.log(pokemon.moves[list].move.name);
                }
            }
        });
}

//document.getElementById("prev")
