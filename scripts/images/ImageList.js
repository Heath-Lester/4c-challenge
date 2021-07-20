
// Module reacts to breed selection, executes data retrieval and renders to the DOM.
import { getBreedImages, getSubBreedImages, useImages } from './ImageProvider.js';


const eventHub = document.querySelector(".container")
const imageListElement = document.querySelector(".imageList")


let images = []


const render = () => {
    imageListElement.innerHTML = images.map(
        (image) => {
            return `<img src=${image} alt="breed image" />`
        }
    ).join("")
}

// Executes rendering and re-rendering based on breed or sub-breed selected
eventHub.addEventListener("breedSelect", event => {
    if (event.detail.subBreed === undefined) {
        getBreedImages(event.detail.breed)
            .then(() => {
                images = useImages()
                render()
            })
    } else if (event.detail.subBreed !== undefined) {
        getSubBreedImages(event.detail.breed, event.detail.subBreed)
            .then(() => {
                images = useImages()
                render()
            })
    }
})
