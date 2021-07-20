
// Module Fetches JSON data, parses data into JavaScript and
// provides a copy of the original data.

let imageList = []

export const useImages = () => [...imageList.message]


export const getBreedImages = (breed) => {
    return fetch(`https://dog.ceo/api/breed/${breed}/images`, {
        "method": "GET"
        })
        .then(response => response.json())
        .then( parsedResponse => imageList = parsedResponse )
}

export const getSubBreedImages = (breed, subBreed) => {
    return fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`, {
        "method": "GET"
        })
        .then(response => response.json())
        .then( parsedResponse => imageList = parsedResponse )
}
