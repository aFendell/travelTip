export const locService = {
    getLocs,
    addLocation,
    removeLoc
}
import { storageService } from './storage.service.js'

const LOCKEY = 'locDB'
var gLocs;

createLocations()

function createLocations() {
    var locs = storageService.loadFromStorage(LOCKEY);
    if (!locs || locs.length === 0) {
        locs = [
            createLocation('London', 51.516169, -0.125339, 0, 0),
            createLocation('Bangkok', 13.745204, 100.510569, 0, 0),
            createLocation('Reykjavik', 64.145178, -21.943076, 0, 0),
        ];
    }
    gLocs = locs;
    storageService.saveToStorage(LOCKEY, gLocs);
}
function createLocation(name, lat, lng, weather = 25, updatedAt = 0) {
    var newLoc = {
        id: getRandomInt(0, 1000),
        name,
        lat,
        lng,
        weather,
        createdAt: new Date(Date.now()).toLocaleString(),
        updatedAt
    }
    return newLoc;
}
function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function addLocation(name, lat, lng, weather, updatedAt) {
    const addLoc = createLocation(name, lat, lng, weather, updatedAt);
    gLocs.push(addLoc)
    storageService.saveToStorage(LOCKEY, gLocs)
}
function removeLoc(id) {
    const locIdx = gLocs.findIndex(loc => {
        return loc.id === id;
    })
    gLocs.splice(locIdx, 1);
    storageService.saveToStorage(LOCKEY, gLocs);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}