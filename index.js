// Elements
const APIKey = "3eed1eec"
let movieResults = document.querySelector(".movie-results")
const exploring = document.querySelector(".exploring")
const empty = document.querySelector(".empty")
const watchlist = document.querySelector(".watchlist")
const userQuery = document.querySelector("#search")
const searchBtn = document.querySelector("#search-btn")

// Event Listeners

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchMovies(userQuery.value)
})

// Functions

function checkWatchlist() {
    if (localStorage.getItem("watchlist") == null) {
        empty.style.display = "flex"
        watchlist.style.display = "none"
    } else {
        empty.style.display = "none"
        watchlist.style.display = "flex"
    }
}


function searchMovies(keyword) {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${keyword}`)
    .then(res => res.json())
    .then((data) => {
        populateMovieResults(data.Search)
    })
}

function populateMovieResults(data) {

    for (let item of data) {
        movieResults.innerHTML += `
        <div class="movie">
            <img class="poster" src=${item.Poster} alt=${item.Title}>
            <div class="movie-data">
                <h2 class="movie-title">${item.Title}</h2>
            </div>
        </div>
        `
    }
}

// Function calls

checkWatchlist()