const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4a23caa464348c1477d8a0c75e2b8737&query=' + lat + ',' + long

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to network', undefined)
        } else if (body.error) {
            callback('Unable to find location. try again', undefined)
        } else {
            const temp = body.current
            callback(undefined, temp.weather_descriptions + '. It is currently ' + temp.temperature + ' degrees out. It feels like ' 
            + temp.feelslike + ' degrees out. There is a ' + temp.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast