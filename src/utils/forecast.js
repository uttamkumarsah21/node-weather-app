const request = require('request');

const forecast = (longitude,latitude,callback) => {
    const url ="http://api.weatherstack.com/current?access_key=3296f3d07f65195d8c7841fc91daf4de&query=" +longitude+","+latitude

    request({url: url,json:true}, (error,response) => {
        if (error) {
            callback("Unable connect to server",undefined)
        } else if (response.body.error){
            callback("Unable to find location",undefined)
        } else {
            callback(undefined,response.body)
        }
    })
}
module.exports = forecast