// Module fetches all breeds, then fetches the first photo of each request for every breed.
import { getBreedImages, useImages } from './ImageProvider.js'
import { getBreeds, useBreeds } from '../breeds/BreedProvider.js'

const eventHub = document.querySelector('.container')
const imageListElement = document.querySelector('.imageList')

let images = []

const thumbnailUrls = []
let filteredUrls = []

// Stores and retains thumbnails for breeds to prevent mass fetch calls
export const useThumbnails = () => thumbnailUrls.slice()
export const useFilteredThumbnails = () => filteredUrls.slice()

// Async function that executes retrieval of thumbnails through mass fetch calls
export async function getThumbnails (breeds) {
  if (thumbnailUrls.length === 0) {
    for (const breed of breeds) {
      await getBreedImages(breed)
      images = useImages()
      thumbnailUrls.push(images[0])
    }
  } else if (breeds.length === thumbnailUrls.length) {
    return

  } else if (breeds.length !== thumbnailUrls.length) {
    images = []
    filteredUrls = []
    for (const breed of breeds) {
      await getBreedImages(breed)
      images = useImages()
      filteredUrls.push(images[0])
    }
  }
}
