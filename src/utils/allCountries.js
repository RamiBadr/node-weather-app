const request = require('postman-request');

const allCountries = (callback) => {
    const result = request({url: 'https://restcountries.com/v3.1/all', json: true}, (error, response, body) => {
        if (error) {
            callback('unable to connect to countries service')
        } else {
            console.log(typeof body)
            callback(undefined, body)
        }
    })

   
}

module.exports = allCountries;