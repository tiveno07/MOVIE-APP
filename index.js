const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=af0f1a4691d49f2d2e5484feffff9ba3";
const API_KEY_READER =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjBmMWE0NjkxZDQ5ZjJkMmU1NDg0ZmVmZmZmOWJhMyIsIm5iZiI6MTcyNzgxNTgyMi42NTAwMDUsInN1YiI6IjY2ZmM1ZGQ2OWIxZjkxMjFhYmQ2NjE0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xLgX0cqh5YnwF7b8rZ9V7RUGqHtmf5-Dl99KPv1uJTg";

const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` 
            <img src="${IMG_URL + poster_path}" alt=${title}>

            <div class="movie-info">
                <h1>${title}</h1>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                ${overview}
        </div> `;

    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 0) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchFrom = search.value;
  if (searchFrom) {
    getMovies(searchURL + "&query=" + searchFrom);
  } else {
    getMovies(API_URL);
  }
});
