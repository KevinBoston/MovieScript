const apiListRef = "http://localhost:3000/api/lists"
const apiMovieRef = "http://localhost:3000/api/movies"
const movieAPIRef = ""
const searchForm = document.querySelector('#search-for-movies')
const addForm = document.querySelector('#add-movie-manual')
const listContainer = document.querySelector('#list-container')

document.addEventListener("DOMContentLoaded", () => {
    getLists();
    searchForm.style.display = "none";
    // let searchForMoviesForm = document.querySelector('#search-for-movies')
    // searchForMoviesForm.addEventListener('submit', (e) => loadSearchResults(e))
    addForm.addEventListener('submit', (e) => createMovieHandler(e))
    //addListDropdownToForm(renderedLists)
} )

function addListDropdownToForm(lists) {
    let addMovieForm = document.querySelector("#add-movie-manual")
    let selectMenu = document.createElement("select")
    selectMenu.id = "input-list"

    addMovieForm.insertBefore(selectMenu, document.querySelector('#add-movie-button'))

}
function clearListContainer() {
    listContainer.innerHTML = ""
}

function getLists() {
    clearListContainer();
    let listData = fetch(apiListRef)
    .then(res => res.json())
    .then(lists => {
        lists.data.forEach(list => {
            let markedUpList = renderList(list)
            appendMovie(markedUpList);
            addMoviesToList(list)
        })
      
        return lists
    })
 
    return listData
}

function renderList(list) {
    let listsContainer = document.createElement("div")
    listsContainer.data_id = list.id
    let listName = document.createElement("p")
    listName.style.color = list.attributes.color
    listName.innerText = list.attributes.name 
    listsContainer.appendChild(listName)
    let newDeleteListButton = document.createElement("button")
    newDeleteListButton.id = list.id
    newDeleteListButton.innerHTML = "Delete list?"
    listsContainer.appendChild(newDeleteListButton)
    newDeleteListButton.addEventListener("click", (e) => deleteList(e))
    return listsContainer

}
function appendMovie(listMarkup) {
    listContainer.appendChild(listMarkup);
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
        <p>Starring: ${movie.starring}</p>
    `
    //console.log(movieContainer)
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
    console.log("Add button pressed")
    const titleInput = e.target.children[1].value
    const starringInput = document.querySelector('#input-starring').value
    const urlInput = document.querySelector('#input-url').value
    const descriptionInput = document.querySelector('#input-description').value
    const notesInput = document.querySelector('#input-notes').value
    const listIDInput = parseInt(document.querySelector('#input-selection-manual').value)
    postMovie(titleInput, starringInput, urlInput, descriptionInput, notesInput, listIDInput)

}

function postMovie(title, starring, url, description, notes, list_id) {
    let bodyData = {title, starring, url, description, notes, list_id}
    console.log(bodyData)
    fetch(apiMovieRef, {
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
            
            
        </div>
            `;
            document.querySelector('#list-container').innerHTML += movieMarkup;
            getLists();
            addForm.reset();
    })
}

function deleteList(e) {
    let deleteListId = e.path[0].id

    fetch(`${apiListRef}/${deleteListId}`, {
        method: "DELETE",
    } )
    getLists();    
}

