const api_url = "https://pokeapi.co/api/v2/pokemon/";
let input = document.getElementById('pokemon').value;



fetch(api_url)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });

