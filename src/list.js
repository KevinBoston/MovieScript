class List {
    
    constructor(listAttributes) {
        this.id = listAttributes.id
        this.name = listAttributes.attributes.name
        this.color = listAttributes.attributes.color
        List.all.push(this) 
    }

    renderListCard() {
        let newHeader = document.createElement("header")
        newHeader.style.backgroundColor = this.color
        newHeader.innerText = this.name
        newHeader.id = this.id
        
        let newDeleteListButton = document.createElement("button")
        newDeleteListButton.id = this.id
        newDeleteListButton.innerHTML = "Delete list?"
        newHeader.appendChild(newDeleteListButton)
        document.querySelector("#list-container").appendChild(newHeader) 
        newDeleteListButton.addEventListener("click", (e) => deleteList(e))
        return newHeader 
    }
}


List.all = []