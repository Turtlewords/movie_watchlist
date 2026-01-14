// Elements

const movieResults = document.querySelector(".movie-results")
const empty = document.querySelector(".empty")
const watchlist = document.querySelector(".watchlist")

// Event Listeners



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

// Function calls

checkWatchlist()