const APILINK = 'http://localhost:8000/api/v1/reviews/';
const url = new URL(location.href); //to get the current URL
const movieId = url.searchParams.get("id") //Getting the movie ID
const movieTitle = url.searchParams.get("title") //Getting the movie title 
console.log(movieTitle)

const title = document.getElementById("title")
title.innerText = movieTitle
const back = document.getElementById("goBack")
back.innerHTML =`<a href="movie.html?id=${movieId}&title=${movieTitle}">Go Back</a>`


addReview()

function addReview(){

    const main = document.getElementById("submitbtn")
    console.log("Hi there")
    main.innerHTML = 
    `
    <button href="movies.html" onclick="saveReview()">Add Review</button>
    `

}

function saveReview(){
    var review = document.getElementById("review").value;
    var user = document.getElementById("user").value;

    //here we are passing two parameters to the fetch function one is the api +id and other an object
    fetch(APILINK + "/new", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plane, */*',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({"movieId": movieId, "user": user, "review": review})
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    })


}
