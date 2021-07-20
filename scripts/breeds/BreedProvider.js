
// Module Fetches JSON data, parses data into JavaScript and
// provides a copy of the original data.

let breedList = {}

export const useBreeds = () => Object.assign({}, breedList.message)

export const getBreeds = () => {

    return fetch("https://dog.ceo/api/breeds/list/all", {
        "method": "GET"
        })
        .then(response => response.json())
        .then( parsedResponse => breedList = parsedResponse )
}