let movies_div = document.getElementById("movies");
let id;

async function searchMovies() {

// 7005a77c my api key

try{

const query = document.getElementById("query").value;
    
const res = await fetch(`https://www.omdbapi.com/?apikey=7005a77c&s=${query}`);

const data = await res.json();

const movies = data.Search;

return movies;
} catch (err) {
    console.log("err:", err);
 }
}


function appendMovies(data) {
    // optimisation  #2
    
// movies_div.innerHTML = null;

document.getElementById('movies').innerHTML = '';


data.forEach(function (el) {
    let p = document.createElement("p");

    p.innerText = el.Title;

    p.style.cursor = 'pointer';

    p.addEventListener("click", function(){
        showMovie(el)
        document.getElementById('movies').style.display = 'none';
       
    })

    document.getElementById('movies').append(p)
 
    document.getElementById('movies').style.display = 'block';
});

}

// 1. we will assemble them in one function 

async function main() {
    try{
    let data = await searchMovies();

    if (data === undefined) {
        document.getElementById('movies').style.display = 'none';
        return;
    }

    appendMovies(data);
}
catch (error) {
        console.log(error);
}
}

// 2. Debouncing

function debounce(func, delay) {
    if (id) {
        clearTimeout(id);
    }

    id= setTimeout(function () {
        func();
    }, delay);
}

//   a -> debounce -> mian('a') ->
//   av -> debounce -> main('ave') -> id of main('av') -> clearInterval(a)
//  ave -> debounce -> main('ave') -> id of  main('ave') -> 



// *----------------------------------------------------------*


// show image, Year of release, Poster, imdb rating, cast ( if possible ) etc.


function showMovie(data) {

    let div= document.createElement("div");

    let img = document.createElement("img");
    img.src = data.Poster;

    let title = document.createElement("h3");
    title.innerText =`Title :  ${data.Title}`;

    let year = document.createElement("h3");
    year.innerText = `Release :  ${data.Year}`;

    let type = document.createElement("h3");
    type.innerText = `Type : ${data.Type}`;

    // let rating = document.createElement("h4");
    // rating.innerText = `Ratings  : ${data.Rating}`;

    // let cast = document.createElement("h4");
    // cast.innerText = `Castings  : ${data.Cast}`;


    div.append(img,title,year,type);
    document.querySelector(".show").append(div);

}