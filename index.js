const apiRef = "http://localhost:3000/api/lists"
const movieAPIRef = ""
const searchForm = document.querySelector('#search-for-movies')
const addButton = document.querySelector('#add-movie-button')

document.addEventListener("DOMContentLoaded", () => {
    getLists()
    searchForm.style.display = "none";
    // let searchForMoviesForm = document.querySelector('#search-for-movies')
    // searchForMoviesForm.addEventListener('submit', (e) => loadSearchResults(e))
    addButton.addEventListener('submit', (e) => createMovieHandler(e))
} )

function getLists() {
    fetch(apiRef)
    .then(res => res.json())
    .then(lists => {
        lists.data.forEach(list => {
            let markedUpList = renderList(list)
            appendMovie(markedUpList);
            addMoviesToList(list)
        })

    })
}

function renderList(list) {
    console.log("Render list!")
    console.log(list.attributes)
    
    const listsContainer = `
        <div list-id=${list.id}>
        <p style="color:${list.attributes.color};">${list.attributes.name}</p>
    `
    return listsContainer

}
function appendMovie(listMarkup) {
    document.querySelector('#list-container').innerHTML += listMarkup;
}


function addMoviesToList(list) {
    let movies = list.attributes.movies
    let listID = list.id
    const movieContainers = []
    movies.forEach(movie => { 
        movieContainers.push(makeMovieContainer(movie));
    })
    
    movieContainers.forEach(container => {
        //console.log(container)
        
        let newMovieNode = document.createElement("div");
        newMovieNode.id = listID
        newMovieNode.innerHTML = container
        //debugger
        let list_cont = document.querySelector(`#list-container`)
        list_cont.appendChild(newMovieNode);
    })


}
function makeMovieContainer(movie) {
    
    const movieContainer = `
        <div movie-id=${movie.id}>
        <p>${movie.title}</p>
    `
    console.log(movieContainer)
    return movieContainer
}

// function loadSearchResults(e) {
//     e.preventDefault()
//     const query = document.querySelector('#input-text').value
//     fetch(movieAPIRef, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(query)
//     })
//         .then(res => res.json())
//         .then(results => {
//             const resultsData = results.data

//         })

//}

function createMovieHandler(e) {
    e.preventDefault();
    console.log("added!")
    const titleInput = document.querySelector('#title-input')
    const starringInput = document.querySelector('#starring-input')
    const urlInput = document.querySelector('#url-input')
    const descriptionInput = document.querySelector('#description-input')
    const notesInput = document.querySelector('#notes-input')
    postMovie(titleInput, starringInput, urlInput, descriptionInput, notesInput)
}

function postMovie(title, starring, url, description, notes) {
    let bodyData = {title, starring, url, description, notes }
    fetch(apiRef, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    } )
    .then(res => res.json())
    .then(movie => {
        const movieData = movie.data
        const movieMarkup = `
        <div data-id=${movie.id}>
            <h4><a href=${movie.url}>${movie.title}</a></h4>
            <p>Starring: ${movie.starring}</p>
            
            
            
            `;
            document.querySelector('#list-container').innerHTML += movieMarkup;
    })
}