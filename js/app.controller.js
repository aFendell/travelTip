import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
// var gMap;
var gUserCurrLoc = {
    lat: 0,
    lng: 0
}

function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then((map) => {
            mapClickedEv(map);
            // gMap = map;
            onSearchAdress(map)
        })
        .catch(() => console.log('Error: cannot init map'));
    locService.getLocs()
        .then(locs => {
            renderLocations(locs)
        })
}

function addEventListenrs() {
    // document.querySelector('.btn-pan').addEventListener('click', (ev) => {
    //     console.log('Panning the Map');
    //     mapService.panTo(35.6798391, 139.7674084);
    // })
    document.querySelector('.btn-add-loc').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        const title = prompt('Enter place name');
        mapService.addMarker({ lat: gUserCurrLoc.lat, lng: gUserCurrLoc.lng }, title);
        onAddLoc(title, gUserCurrLoc.lat, gUserCurrLoc.lng)
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
function onSearchAdress(map) {
    // console.log('then geoCode');
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
        onAddLoc(address, results[0].geometry.location.lat(), results[0].geometry.location.lng());
    });
}

function mapClickedEv(map) {
    map.addListener("click", (mapsMouseEvent) => {
        var latitude = mapsMouseEvent.latLng.lat();
        var longtitude = mapsMouseEvent.latLng.lng();
        gUserCurrLoc.lat = latitude;
        gUserCurrLoc.lng = longtitude;
    });
}
function onRemoveLoc(ev) {
    locService.removeLoc(ev.target.getAttribute('data-i'))
    locService.getLocs()
        .then(locs => {
            renderLocations(locs)
        })
}

function onAddLoc(name, lat, lng, weather, updatedAt) {
    locService.addLocation(name, lat, lng, weather, updatedAt)
    locService.getLocs()
        .then(locs => {
            renderLocations(locs)
        })
}
function renderLocations(locs) {
    const strHtmls = locs.map(loc => {
        return `<tr>
        <td>${loc.name}</td>
        <td>${loc.weather}</td>
        <td>${loc.createdAt}</td>
        <td><button class="btn-go" data-lat="${loc.lat}" data-lng="${loc.lng}">Go</button></td>
        <td><button class="btn-remove" data-i="${loc.id}">✖</button></td>
      </tr>`
    })
    document.querySelector('.locs').innerHTML = strHtmls.join('');
    [...document.querySelectorAll('.btn-go')].forEach((item) => {
        item.addEventListener('click', (ev) => {
            onGoToLoc(ev);
        })
    });

    [...document.querySelectorAll('.btn-remove')].forEach((item) => {
        item.addEventListener('click', (ev) => {
            onRemoveLoc(ev);
        })
    })
}


function onGoToLoc(ev) {
    const locLat = ev.target.getAttribute('data-lat');
    const locLng = ev.target.getAttribute('data-lng');
    console.log(locLat,locLng);
    
    mapService.panTo(locLat, locLng);
    mapService.addMarker({ lat: +locLat, lng: +locLng })

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

