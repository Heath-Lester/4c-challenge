
// Module creates an HTML element for a breed and creates a specific
// dispatch event for said element.

const eventHub = document.querySelector(".container")

export const BreedHTML = (breed, subBreeds, breedImage) => {
    return `
    <section class="breedCard">
        <h3 id="breed--${breed}" style="cursor:pointer">${breed}</h3>
        <img src=${breedImage} alt="breed thumbnail" />
            ${subBreeds.length > 0 ? `<h5 style="cursor:default">sub-breeds:</h5>` : ``}
            ${subBreeds.map(sub => {
                return `<dt id="subBreed--${breed}--${sub}" style="cursor:pointer">${sub}</dt>`}).join("")}
    </section>
    `
}



eventHub.addEventListener("click", breedElement => {
    const [prefix, breedName, subBreed] = breedElement.target.id.split("--")

    if (breedElement.target.id.startsWith("breed--")) {
        const breedEvent = new CustomEvent("breedSelect", {
            detail: {
                breed: breedName
            }
        })
        eventHub.dispatchEvent(breedEvent)

    } else if (breedElement.target.id.startsWith("subBreed--")) {
        const subBreedEvent = new CustomEvent("breedSelect", {
            detail: {
                breed: breedName,
                subBreed: subBreed
            }
        })
        eventHub.dispatchEvent(subBreedEvent)
    }
})
