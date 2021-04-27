import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
// var gMap;

function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then((map) => {
            mapClickedEv(map);
            // gMap = map;
            onSearchAdress(map)
        })

        .catch(() => console.log('Error: cannot init map'))
}

function onSearchAdress(map){
    console.log('then geoCode');
    const geocoder = new google.maps.Geocoder();
    document.querySelector(".submit-address").addEventListener("click", () => {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    const address = document.querySelector(".input-address").value;
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function mapClickedEv(map) {
    map.addListener("click", (mapsMouseEvent) => {
        console.log('Map is mapIsClicked');
        var lat = mapsMouseEvent.latLng.lat();
        var lng = mapsMouseEvent.latLng.lng();
        console.log(lat, lng);
    });
}

function addEventListenrs() {
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.69103054930886, 139.77040508554606);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                console.log('Locations:', locs)
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })
    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                document.querySelector('.user-pos').innerText =
                    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
                mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

