// CC stands for Campus Centre
const melbCentre = { lat: -37.9716929, lng: 144.7729589 }
const claytonCC = { lat: -37.9120327, lng: 145.1329772 }  
const caufieldCC = { lat: -37.8773481, lng: 145.0428116 }

let map             // the google map
let markers = []    // list of marker on the map
let uniMarkers = [] // contains all markers of uni, potentially useful (default mode?)

// callback function when map js api is done loading
let initMap = () => {
    // Init-ing the map object
    map = new google.maps.Map(document.getElementById("map"), {
        center: melbCentre,
        zoom: 8
    })
}

// Autocomplete is the search box of ggmap
let initAutocomplete = () => {
    const input = document.getElementById("autocomplete")
    const defaultBounds = {
        north: melbCentre.lat + 0.1,
        south: melbCentre.lat - 0.1,
        east: melbCentre.lng + 0.1,
        west: melbCentre.lng - 0.1,
    }
    const options = {
        bounds: defaultBounds,                       // set bounds for search result
        componentRestrictions: { country: "au" }     // limit result to just AU
    }

    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener("place_changed", () => {       // fired when user enter the input or select the reccomended output
        let place = autocomplete.getPlace()
        if (place.geometry && place.geometry.location) {    // sometimes place dont have geometry nor location
            markers.push(new google.maps.Marker({           // add marker if possible 
                position: place.geometry.location,
                map: map
            }))
            map.panTo(place.geometry.location)
        }
    })
}

// One function call others init functions, or init some specific element
let initAll = () => {
    initMap()
    initAutocomplete()
    // let collBtn = document.getElementById("coll-btn")
    // let inputForm = document.getElementById("input-form")
    // collBtn.addEventListener("click", () => {
    //     if (inputForm.style.display === "block") {
    //         inputForm.style.display = "none"
    //     } else {
    //         inputForm.style.display = "block"
    //     }
    // })
}

window.initMap = initAll    // call this function when all HTML is loaded
