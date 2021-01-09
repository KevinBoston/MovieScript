class List {
    
    constructor(listAttributes) {
        this.id = listAttributes.id
        this.name = listAttributes.attributes.name
        this.color = listAttributes.attributes.color
        List.all.push(this) 
    }

    // addToAll() {
    //     console.log("made it to addToAll")
    //     if (List.all.length === 0 ) {
    //         List.all.push(this)
    //     } else {
    //         List.all.forEach(list => {
    //             if (list.id === this.id) {
    //                 console.log("Did not push duplicate")
    //             } else {
    //                 List.all.push(this)
    //                 console.log("pushed list id " + this.id)
    //                 return
    //             }
    //         })
    //     }
    // }
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
    // uniqueList() {

    // }
}


List.all = []