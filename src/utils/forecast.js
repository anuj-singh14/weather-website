const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f09f93bcb270abb93b62b46bcd7fc238/' + lat + ',' + long

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to network', undefined)
        } else if (body.error) {
            callback('Unable to find location. try again', undefined)
        } else {
            const temp = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp.temperature + ' degrees out. There is a ' + temp.precipProbability * 100 + '% chance of rain.')
        }
    })
}

module.exports = forecast