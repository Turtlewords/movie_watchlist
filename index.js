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
        console.log(data)
        populateMovieResults(data.Search)
    })
}

function populateMovieResults(data) {

    for (let item of data) {
        movieResults.innerHTML += `
        <div class="movie">
            <img class="poster" src=${item.Poster} alt=${item.Title}>
            <div class="movie-data">
                <div class="movie-title-rating">
                    <h2 class="movie-title">${item.Title}</h2>
                    <div class="rating-container">
                        <img src="/images/star.svg">
                        <p class="rating">${item.imdbRating}</p>
                    </div>
                </div>
                <div class="movie-details">
                    <p class="movie-length">${item.Runtime}</p>
                    <p class="movie-genre">${item.Genre}</p>
                    <a class="add-link link" href="index.html">
                        <img class="add-icon" src="images/plus_dark.svg">
                        Let's add some movies!
                    </a>
                </div>
                <div class="movie-summary">
                    <p class="summary-text">${item.Plot}</p>
                </div>
            </div>
        </div>
        `
    }
}

// Function calls

checkWatchlist()