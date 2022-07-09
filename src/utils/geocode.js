const request = require('request')

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidXR0YW1rcnNhaCIsImEiOiJja3h6d284aGMwMDB3MnZtd2E2ZW03bGdjIn0.OrpokdBf93vDTruiYo2tAA&limit=1"
    //request({url: url, json: true},(error,response) => {
    request({url: url, json: true},(error,{body}) => {   //destructuring
        if (error) {
            callback("Unable connect to server",undefined);
        } else if (body.features.length <= 0) {
            callback("Unable to find location",undefined);
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode