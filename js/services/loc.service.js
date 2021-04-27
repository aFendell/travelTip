export const locService = {
    getLocs
}
import { storageService } from './storage.service.js'

const LOCKEY = 'locDB'
var gLocs;

createPlaces()

function createPlaces(){
    var locs = storageService.loadFromStorage(LOCKEY);
    if (!locs || locs.length === 0){
        locs = [
            { id: 0, name: 'Loc1', lat: 32.047104, lng: 34.832384, weather:0, createdAt:Date.now(), updatedAt:0 },
            { id: 1, name: 'Loc2', lat: 13.745204, lng: 100.510569, weather:0, createdAt:0, updatedAt:0 },
            { id: 2, name: 'Loc3', lat: 64.145178, lng: -21.943076, weather:0, createdAt:0, updatedAt:0 },
            // { name: 'Loc2', lat: 32.047201, lng: 34.832581 }
        ];
    } 
    gLocs = locs;
    storageService.saveToStorage(LOCKEY,gLocs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}
function removeLoc(id){

}

function goToLoc(id){

}

