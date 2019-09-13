const api_url = "https://pokeapi.co/api/v2/pokemon/";
const moveAmount = 4;
const lastPokemon = 807;

window.addEventListener('load', function() {
    let input = 1;
    fetcher(input);
});

//SEARCH BUTTON
document.getElementById("run").addEventListener("click", function(){
    clear();
    let input = document.getElementById('pokemon').value.toLowerCase();
    //clear out all the <li>'s in current <ul>
    document.getElementById("move-list").innerHTML = "";
    //get new info
    fetcher(input);

});

//PREV BUTTON
document.getElementById("prev").addEventListener("click", function(){
    clear();
    let input = document.getElementById("id").innerText;

    input--;
    if (input < 1){
        input = 1
    }
    console.log(input);
    fetcher(input);


});

//NEXT BUTTON
document.getElementById("next").addEventListener("click", function(){
    clear();
    let input = document.getElementById("id").innerText;

    input++;
    if (input > lastPokemon){
        input = lastPokemon;
    }
    fetcher(input);

});


function fetcher(input){
    fetch(api_url+input)
        .then(function(response){
            return response.json();
        })
        .then(function(pokemon) {
            console.log(pokemon);

            //ID
            //console.log(pokemon.id);
            document.getElementById("id").innerText = pokemon.id;

            //NAME
            //console.log(pokemon.name);
            document.getElementById("name").innerText = pokemon.name.toUpperCase();

            //IMAGE
            //console.log(pokemon.sprites.front_default);
            if (pokemon.sprites.front_default != null){
                document.getElementById("main-pokemon").setAttribute("src", pokemon.sprites.front_default);
            }
            else{
                document.getElementById("main-pokemon").setAttribute("src", "./images/questionmark.png");
            }

            //DISPLAY ALL THE MOVES (unless it has more than 4, then take 4 random ones)
            if (pokemon.moves.length < moveAmount){
                for (let i = 0; i < pokemon.moves.length; i++) {
                    //console.log(pokemon.moves[i].move.name);

                    let node = document.createElement("LI");
                    let textnode = document.createTextNode(pokemon.moves[i].move.name);
                    node.appendChild(textnode);
                    document.getElementById("move-list").appendChild(node);
                }
            }
            else{
                for (let i = 0; i < moveAmount; i++) {
                    let list = Math.floor(Math.random() * pokemon.moves.length);
                    //console.log(pokemon.moves[list].move.name);

                    let node = document.createElement("LI");
                    let textnode = document.createTextNode(pokemon.moves[list].move.name);
                    node.appendChild(textnode);
                    document.getElementById("move-list").appendChild(node);

                }
            }

            //TYPES
            console.log(pokemon.types[0].type.name);

            for (let i = 0; i < pokemon.types.length; i++) {
                //console.log(pokemon.moves[i].move.name);

                let node = document.createElement("LI");
                let textnode = document.createTextNode(pokemon.types[i].type.name);
                node.appendChild(textnode);
                document.getElementById("type").appendChild(node);
            }

            //HP
            console.log(pokemon.stats[5].base_stat);
            document.getElementById("hp").innerText = pokemon.stats[5].base_stat;

            //HEIGHT and WEIGHT
            console.log("height: " + pokemon.height);
            document.getElementById("height").innerText = pokemon.height;
            console.log("weight: " + pokemon.weight);
            document.getElementById("weight").innerText = pokemon.weight;



            //CHECK FOR EVOLUTIONS
            fetch (pokemon.species.url)
                .then(function(response){
                return response.json();
            })
                .then(function(species) {
                    //console.log(species.evolves_from_species);
                    if (species.evolves_from_species != null){
                        document.getElementById("evolutions").style.display = "block";

                        fetch(api_url + species.evolves_from_species.name)
                            .then(function (response) {
                                return response.json()
                            })
                            .then(function (previous) {

                                document.getElementById("preName").innerText = "#"+previous.id+ " "+ previous.name.toUpperCase();
                                document.getElementById("pre-evolution").setAttribute("src", previous.sprites.front_default);

                            });
                    }
                    else{
                        document.getElementById("evolutions").style.display = "none";
                    }
                })
        });
}

function clear(){
    document.getElementById("move-list").innerHTML = "";
    document.getElementById("type").innerHTML = "";
}
