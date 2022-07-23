const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=hEoLJTqoVDRYDf7cAzJxZkc5SBMHVH3J&location=${encodeURIComponent(address)}`;

    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback('unable to connect to coordinates sevice');
        } else if(body.results[0].locations.length === 0) {
            callback('please provide a valid location');
        } else {
            const latlng = body.results[0].locations[0].latLng;
            const location = body.results[0].locations[0].adminArea5;
            const country = body.results[0].locations[0].adminArea1;
            callback(undefined, {...latlng, location, country});
        }
    });
}

module.exports = geocode;