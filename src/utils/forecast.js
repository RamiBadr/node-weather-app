const request = require("postman-request");

const forecast = ({lat, lng}, callback) => {
    request({url: `http://api.weatherstack.com/current?access_key=8aa0aaa0def3e50d4ff00ed05835fbb3&query=${lat},${lng}`,
     json: true}, 
    (error, response, body) => {
        if(error) {
                callback('unable to connect to weather service');
               } else if(body.error) {
                callback('please provide a valid location');
               } else {
                const {temperature, weather_descriptions, feelslike, precip} = body.current;
                callback(
                    undefined,
                    `It's ${weather_descriptions[0]}, it's currently ${temperature} degrees out. there's a ${precip}% chance of rain .`
                );
               }
    })
}

module.exports = forecast;