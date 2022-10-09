const request = require('request')

const forecast = (latt, long, callback) => {

    ///Setting up the arguments for the weather data
    const url = 'http://api.weatherstack.com/current?access_key=ab3ab08c153deed07f170ec4d835d51d&query=' + latt + ',' + long + '&units=m'
    console.log(url)

    ///Getting weather data from weatherstack api
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            ///Proccessing errors
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        }
        else {
            ///Default message for weather
            const returnData = {
                brief: body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out, feels like " + body.current.feelslike + " degrees!",
                windSpeed: "Wind speed: " + body.current.wind_speed,
                pressure: "Pressure :" + body.current.pressure,
                humidity: "Humidity :" + body.current.humidity,
                cloudcover: "Cloud cover :" + body.current.cloudcover,
                uv_index: "UV index :" + body.current.uv_index,
                visibility: "Visibility :" + body.current.visibility,
                observation_time: "Data is for " + body.current.observation_time + " today!",
            }
            callback(undefined, returnData)
        }
    })
}

module.exports = forecast