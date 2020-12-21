class Movie {
    constructor(movieAttributes) {
        this.id = movieAttributes.id;
        this.title = movieAttributes.title
        this.starring = movieAttributes.starring
        this.description = movieAttributes.description
        this.url = movieAttributes.url
        this.notes = movieAttributes.notes
        this.list_id = movieAttributes.list_id
        Movie.all.push(this)
    }

    renderCard() {
        let card = document.createElement('div')
        card.dataset.id = this.id
        card.className = "card"
        let title = document.createElement('p')
        title.innerText = this.title
        card.appendChild(title)
        let starring = document.createElement('ul')
        starring.innerText = `Starring: ${this.starring}`
        card.appendChild(starring)
        let description = document.createElement('ul')
        description.innerText = `Description: ${this.description}`
        card.appendChild(description)
        let notes = document.createElement('ul')
        notes.innerText = `Notes: ${this.notes}`
        card.appendChild(notes)
        let dButton = document.createElement('button')
        dButton.innerText = `Delete ${this.title}?`
        dButton.id = this.id
        card.appendChild(dButton)
        return card
    }

    


}
Movie.all = []