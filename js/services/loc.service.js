export const locService = {
    getLocs
}
import { storageService } from './storage.service.js'

const LOCKEY = 'locDB'
var gLocs;

createLocations()

function createLocations(){
    var locs = storageService.loadFromStorage(LOCKEY);
    if (!locs || locs.length === 0){
        locs = [
            createLocation (0,'Loc1', 32.047104, 34.832384, 0, Date.now(), 0 ),
            createLocation (0,'Loc2', 13.745204, 100.510569, 0, Date.now(), 0 ),
            createLocation (0,'Loc3', 64.145178, -21.943076, 0, Date.now(), 0 ),
        ];
    } 
    gLocs = locs;
    storageService.saveToStorage(LOCKEY,gLocs);
}
function createLocation(id, name, lat, lng, weather=25, createdAt, updatedAt=0){
    var newLoc = {
        id, 
        name, 
        lat, 
        lng, 
        weather, 
        createdAt, 
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
function removeLoc(id){

}

function goToLoc(id){

}

function addLocation(){
   
}
