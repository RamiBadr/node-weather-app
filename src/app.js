const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const allCountries = require('./utils/allCountries');

// define a port for heroku
const port = process.env.PORT || 3000;

// define paths for express engine
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.use(express.json());

// set up handlebars engine and view location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// dynamic routes.
app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather App',
            name: "Ramy Badr", 
        });
});

app.get('/countries', (req, res) => {
    allCountries((error, countries) => {
        if(error) {
            return res.send(error)
        }

        res.send(countries);
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ramy Badr'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ramy Badr'
    });
});

// set up public folder for static routes
app.use(express.static(publicDir));

// static routes

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: "you must provide a location."
        })
    }

geocode(req.query.location, (error, {lat, lng, location, country}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast({lat, lng}, (error, forecastData) => {
        
            if(error) {
                return res.send({
                    error
                })
            }
        
            res.send([{
                forecast: forecastData,
                location,
                country
            }])
        });
})

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 Help article not found!',
        name: "Ramy Badr"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 Page not found!',
        name: "Ramy Badr"
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

