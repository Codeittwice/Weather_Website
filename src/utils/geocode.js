const request = require('request')

const geocode = (adress, callback) => {

    const coordinates = {
        location: '',
        latitude: 0,
        longitude: 0
    }
    console.log(adress)

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiaHJpc3RvZ2FkemhldiIsImEiOiJjbDhsemJvaWswMmhnM29vNTIzYTNzczgwIn0.7ERsQv5Ehy4PeS5FDPE8Vw&limit=1'

    request({ url, json: true}, (error, {body}) => 
    {
        ///Proccessing errors
        if(error)
        {
            callback("Can't connect to location service!", undefined)
        }
        else if(body.features.length == 0)
        {
            callback("No matching results for your location!", undefined)
        }
        else
        {
            /// Getting lattitude and longitude
            coordinates.location = body.features[0].place_name
            coordinates.latitude = body.features[0].center[1]
            coordinates.longitude = body.features[0].center[0]
            callback(undefined, coordinates)
            console.log(coordinates)
        }
    })
            
}

module.exports = geocode