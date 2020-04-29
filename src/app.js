const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shizuo Heiwajima',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shizuo Heiwajima',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Do you need help?',
        title: 'Help',
        name: 'Shizuo Heiwajima',
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'Shizuo Heiwajima',
    })
})

app.get('/weather', (req, res) => {
    const loc = req.query.address

    if (!loc) {
        return res.send({
            error: 'You must provide an address',
        })
    }

    geocode(loc, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res({ error })
            }

            res.send({
                forecast: fdata,
                location,
                address: loc
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term',
        })
        return
    }

    console.log(req.query.name)
    res.send({
        products: [],
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
        name: 'Shizuo Heiwajima',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})