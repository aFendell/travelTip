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
        })
        .catch(() => console.log('Error: cannot init map'));
    locService.getLocs()
        .then(locs => {
            renderLocations(locs)
        })
}
function mapClickedEv(map) {
    map.addListener("click", (mapsMouseEvent) => {
        var latitude = mapsMouseEvent.latLng.lat();
        var longtitude = mapsMouseEvent.latLng.lng();
        gUserCurrLoc.lat = latitude;
        gUserCurrLoc.lng = longtitude;
        console.log('gUserCurrLoc[lat]', gUserCurrLoc.lat, 'gUserCurrLoc[lng]', gUserCurrLoc.lng);
    });
}
function addEventListenrs() {
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.6798391, 139.7674084);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: gUserCurrLoc.lat, lng: gUserCurrLoc.lng }, prompt('Enter place name'));
    })
    // document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {


    // })
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
function renderLocations(locs) {
    const strHtmls = locs.map(loc => {
        return `<tr>
        <td>${loc.name}</td>
        <td>${loc.weather}</td>
        <td>${loc.createdAt}</td>
        <td><button class="btn-go" data-i="${loc.id}">Go</button></td>
        <td><button class="btn-go" data-i="${loc.id}">✖</button></td>
      </tr>`
    })
    console.log(strHtmls);
    document.querySelector('.locs').innerHTML = strHtmls.join('');
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

