// Module executes data retrieval and renders data via HTML modules

import { getBreeds, useBreeds } from './BreedProvider.js'
import { getBreedImages, useImages } from '../images/ImageProvider.js'
import { getThumbnails, useThumbnails, useFilteredThumbnails } from '../images/Thumbnail.js'
import { BreedHTML } from './Breed.js'

const eventHub = document.querySelector('.container')
const breedListElement = document.querySelector('.breedList')

// Declaring global variables to be reused
let breedOriginal = []
let breeds = []
let filteredBreeds = []
let thumbnails = []
let filteredThumbnails = []

// Async function for initial gathering of massive data and storing to prevent long re-renders
export async function breedList () {
  await getBreeds()
  breedOriginal = useBreeds()
  breeds = Object.keys(breedOriginal)
  await getThumbnails(breeds)
  thumbnails = useThumbnails()
  await render()
}

// Render function that executes based on filtering or not
async function render (filteredBreeds) {
  if (!filteredBreeds || filteredBreeds.length === 0) {
    let i = -1
    breedListElement.innerHTML = breeds
      .map(breed => {
        let subBreeds = []
        if (breedOriginal[breed].length > 0) {
          subBreeds = breedOriginal[breed]
        }
        i++
        return BreedHTML(breed, subBreeds, thumbnails[i])
      })
      .join('')
  } else if (filteredBreeds.length > 0) {
    await getThumbnails(filteredBreeds)
    filteredThumbnails = useFilteredThumbnails()
    let q = -1
    breedListElement.innerHTML = filteredBreeds
      .map(breed => {
        let subBreeds = []
        if (breedOriginal[breed].length > 0) {
          subBreeds = breedOriginal[breed]
        }
        q++
        return BreedHTML(breed, subBreeds, filteredThumbnails[q])
      })
      .join('')
  }
}

// Listener for Filter input
eventHub.addEventListener('filterBreed', event => {
  if (event.detail.filter !== '') {
    filteredBreeds = breeds.filter(breed =>
      breed.startsWith(event.detail.filter)
    )

    render(filteredBreeds)
  } else if (event.detail.filter === '') {
    filteredBreeds = []
    render()
  }
})
