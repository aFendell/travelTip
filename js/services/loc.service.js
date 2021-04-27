export const locService = {
    getLocs
}
var locs = [
    { id: 0, name: 'Loc1', lat: 32.047104, lng: 34.832384, weather:0, createdAt:0, updatedAt:0 },
    { name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}
function removeLoc(id){

}

function goToLoc(id){

}

