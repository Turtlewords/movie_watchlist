// Elements
const APIKey = "3eed1eec"
let movieResults = document.querySelector(".movie-results")
const exploring = document.querySelector(".exploring")
const empty = document.querySelector(".empty")
const watchlistEl = document.querySelector(".watchlist")
const userQuery = document.querySelector("#search")
const searchBtn = document.querySelector("#search-btn")

let tempMovies = {}

const moviesObj = localStorage.getItem("watchlist") ? localStorage.getItem("watchlist") : localStorage.setItem("watchlist", JSON.stringify({}));

// Event Listeners

if (searchBtn != null) {
    searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchMovies(userQuery.value)
})
}


// Functions

function checkWatchlist() {
    if (localStorage.getItem("watchlist") === "null") {
        if (empty != null && watchlistEl != null) {
            empty.style.display = "flex"
            watchlistEl.style.display = "none"
        }
        
        
    } else {
        if (empty != null && watchlistEl != null) {
            empty.style.display = "none"
            watchlistEl.style.display = "flex"
        }
        displayWatchList()
    }
}


function searchMovies(keyword) {
    fetch(`http://www.omdbapi.com/?apikey=${APIKey}&s=${keyword}&`)
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        populateMovieResults(data.Search)
    })
}

function populateMovieResults(data) {
    
    for (let item of data) {
        tempMovies[item.Title] = item
        movieResults.innerHTML += `
        <div class="movie movie-${item.Title}">
            <img class="poster" src=${item.Poster} alt=${item.Title}>
            <div class="movie-data">
                <h2 class="movie-title">${item.Title}</h2>
                <p class="movie-year">${item.Year}<p>
                <p class="add-to-watchlist" onclick="addToWatchList('${item.Title}')">
                    <img class="add-icon" src="images/plus_dark.svg">
                        Add  to watchlist
                </p>
            </div>
        </div>
        `
    }
}

function addToWatchList(title) {

    let watchlist = JSON.parse(localStorage.getItem("watchlist"))
    watchlist[title] = JSON.stringify(tempMovies[title])
    
    localStorage.setItem("watchlist", JSON.stringify(watchlist))  
}

function removeFromWatchList(title) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist"))
    // watchlist[title] = JSON.stringify(tempMovies[title])
    console.log(watchlist[title])
    delete watchlist[title]
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    location.reload();
}

// function removeFromWatchListHTML(element) {
//     const elementToRemove = document.querySelector(element)
//     element.remove()
// }

function displayWatchList() {
    let data = JSON.parse(localStorage.getItem("watchlist"))
    // let watchlist = JSON.stringify(data)
    populateWatchList(data)
    
}

function populateWatchList(data) {
    for (const key in data) {
        item = JSON.parse(data[key])
        watchlistEl.innerHTML += `
        <div class="movie">
            <img class="poster" src=${item.Poster} alt=${item.Title}>
            <div class="movie-data">
                <h2 class="movie-title">${item.Title}</h2>
                <p class="movie-year">${item.Year}<p>
                <p class="remove-from-watchlist" onclick="removeFromWatchList('${item.Title}')">
                    <img class="add-icon" src="images/remove.svg">
                        Remove from watchlist
                </p>
            </div>
        </div>
        `
    }
}

// Function calls


window.addEventListener("load", checkWatchlist)

