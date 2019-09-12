const api_url = "https://pokeapi.co/api/v2/pokemon/";



document.getElementById("run").addEventListener("click", function(){

    let input = document.getElementById('pokemon').value.toLowerCase();

    fetcher(input);

});

function fetcher(input){
    fetch(api_url+input)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {

            console.log(data);
            //NAME
            console.log(data.name);

            //IMAGE
            console.log(data.sprites.front_default)
        });
}
