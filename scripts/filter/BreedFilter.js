//  Module renders filter input
const eventHub = document.querySelector(".container")
const filterElement = document.querySelector(".filter--breed")

export const breedFilter = () => {

    filterElement.innerHTML = `
    <label>Filter Breeds</label>
    <input type="text" id="filter" value=""/>
    `
}

//  Dispatches events based on input to text box above
eventHub.addEventListener("input", filterEvent => {
    if (filterEvent.target.id.startsWith("filter")) {
        const filterBreed = new CustomEvent("filterBreed", {
            detail: {
                filter: filterEvent.target.value
            }
        })
        eventHub.dispatchEvent(filterBreed)
    }
}, true)