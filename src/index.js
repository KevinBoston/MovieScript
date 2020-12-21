const apiListRef = "http://localhost:3000/api/lists"
const apiMovieRef = "http://localhost:3000/api/movies"
const searchForm = document.querySelector('#search-for-movies')
const addMovieForm = document.querySelector('#add-movie-manual')
const addListForm = document.querySelector('#add-list-manual')
const listContainer = document.querySelector('#list-container')
const showAddMovieFormButton = document.querySelector('#show-add-movie-form')
const showAddListFormButton = document.querySelector('#show-add-list-form')
const hideAddMovieButton = document.querySelector("#add-movie-hide-button")
const hideAddListButton = document.querySelector("#add-list-hide-button")


document.addEventListener("DOMContentLoaded", () => {
    getLists();
    searchForm.style.display = "none"
    hideAddMovieForm();
    hideAddListForm();
    showAddMovieFormButton.addEventListener("click", showAddMovieForm)
    showAddListFormButton.addEventListener("click", showAddListForm)
    addMovieForm.addEventListener('submit', (e) => createMovieHandler(e))
    addListForm.addEventListener('submit', (e) => createListHandler(e) )
    hideAddMovieButton.addEventListener('click', hideAddMovieForm)
    hideAddListButton.addEventListener('click', hideAddListForm)
} )
function showAddMovieForm() {
    addMovieForm.style.display = "block"
    showAddMovieFormButton.style.display = "none"
    hideAddMovieButton.style.display = "block"
    addListDropdownToForm();
}
function hideAddMovieForm() {
    addMovieForm.style.display= "none"
    showAddMovieFormButton.style.display = "block"
    hideAddMovieButton.style.display = "none"
}
function showAddListForm() {
    addListForm.style.display = "block"
    showAddListFormButton.style.display = "none"
    hideAddListButton.style.display = "block"
}
function hideAddListForm() {
    addListForm.style.display= "none"
    showAddListFormButton.style.display = "block"
    hideAddListButton.style.display = "none"
}

function addListDropdownToForm() {
    document.querySelectorAll("#input-list").forEach(tag => {tag.remove()})
    let lists = List.all
    let selectMenu = document.createElement("select")
    selectMenu.id ="input-list"
    lists.forEach(list => {
        let newSelectOption = document.createElement("option")
        newSelectOption.value = list.id
        newSelectOption.innerText = list.name
        selectMenu.appendChild(newSelectOption)
    })
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
             renderList(list)
             addMoviesToList(list)
        })
      
        return lists
    })
 
    return listData
}

function renderList(list) {    
    let newList = new List(list)
    newList.renderListCard()
}


function addMoviesToList(list) {
    let movies = list.attributes.movies

    movies.forEach(movie => { 
        let newMovie = new Movie(movie)
        let newCard = newMovie.renderCard()
        listContainer.appendChild(newCard)
        let deleteMovieButton = newCard.children[4]
        deleteMovieButton.addEventListener('click', (e) => deleteMovie(e))
    })

}


function createMovieHandler(e) {
    e.preventDefault();
    const titleInput = e.target.children[1].value
    const starringInput = document.querySelector('#input-starring').value
    const urlInput = document.querySelector('#input-url').value
    const descriptionInput = document.querySelector('#input-description').value
    const notesInput = document.querySelector('#input-notes').value
    const listIDInput = parseInt(document.querySelector('#input-list').value)
    postMovie(titleInput, starringInput, urlInput, descriptionInput, notesInput, listIDInput)

}
function createListHandler(e) {
    e.preventDefault();
    const nameInput = document.querySelector('#input-name').value
    const colorInput = document.querySelector('#input-color').value
    postList(nameInput, colorInput);
}
function postList(name, color) {
    let bodyData = {name, color}
    fetch(apiListRef, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(res => res.json())
    .then(list => {
        getLists();
        addListForm.reset();
        hideAddMovieForm();
    })
}


function postMovie(title, starring, url, description, notes, list_id) {
    let bodyData = {title, starring, url, description, notes, list_id}
    fetch(apiMovieRef, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    } )
    .then(res => res.json())
    .then(res => {
            getLists();
            addMovieForm.reset();
            hideAddMovieForm();
    })
}

function deleteList(e) {
    let deleteListId = e.path[0].id

    fetch(`${apiListRef}/${deleteListId}`, {
        method: "DELETE",
    } )
    getLists();    
}

function deleteMovie(e) {
    
    let deleteMovieID = e.path[0].id
    fetch(`${apiMovieRef}/${deleteMovieID}`, {
        method: "DELETE",
    } )
    getLists();    
}
