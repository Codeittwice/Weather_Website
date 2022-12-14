///run comm: nodemon src/app.js -e js,hbs

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

/// Define paths for express config
const publicDirPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/// Setup static directory to serve
app.use(express.static(publicDirPath))



app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Icopraimsq'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Icopraimsq'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Icopraimsq'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            console.log('Forecast for:', location)
            console.log(forecastData)

            res.send({
                forecast: forecastData.brief,
                location,
                address: req.query.address,
                windSpeed: forecastData.windSpeed,
                pressure: forecastData.pressure,
                humidity: forecastData.humidity,
                cloudcover: forecastData.cloudcover,
                uv_index: forecastData.uv_index,
                visibility: forecastData.visibility,
                observation_time: forecastData.observation_time,
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-error', {
        title: "Help",
        name: 'Icopraimsq',
        errorMsg: 'Help artice not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-error', {
        title: "Help",
        name: 'Icopraimsq',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {

    console.log('Server is up on port' + port)
})