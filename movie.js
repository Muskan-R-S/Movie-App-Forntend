
const url = new URL(location.href); // 
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")
console.log(movieTitle)

const APILINK = 'http://localhost:8000/api/v1/reviews/';


const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle

const add = document.getElementById('add') 
add.innerHTML = 
    ` <h4>Add Review <a id="addReviewBtn" class="addReviewBtn" 
    href="addReview.html?id=${movieId}&title=${movieTitle}">➕</a> </h4>`


returnReviews(APILINK)

function returnReviews(url){
    console.log("Reaching here")
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data){
    console.log(data);
    data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML = 
        `<div class = "row"> 
            <div class= "column">
                <div class= "card" id = "${review._id}">
                    <p><strong>Review: </strong>${review.review}</p>
                    <p><strong>User: </strong>${review.user}</p>
                    <p><a href= "#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')"> ✏️</a>
                    <a href= "#" onclick="deleteReview('${review._id}')">🗑️</a>
                    </p>
                </div>
            </div>
        </div>`
    


  
        main.appendChild(div_card);
    });
  });
  }

function editReview(id, review, user){
    console.log(review)
    const element = document.getElementById(id)
    console.log(element)
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    element.innerHTML = `
    <p> <strong>Review:  </strong>
    <input type="text" id="${reviewInputId}" value= "${review}" >
    </p>
    <p> <strong>User:  </strong>
    <input type="text" id="${userInputId}" value= "${user}" >
    </p>
    <p>
    <a href="#" onclick="saveReview( '${reviewInputId}', '${userInputId}','${id}')"> 💾</a> 
    </p>
    `


}

function saveReview(reviewInputId, userInputId, id){
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    //here we are passing two parameters to the fetch function one is the api +id and other an object
    fetch(APILINK + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plane, */*',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    })


}

function deleteReview(id){
    fetch(APILINK +id, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    })

}