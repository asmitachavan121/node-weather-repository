const path = require('path')
const express = require('express')
const app  = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

// app.get is a route handler //
app.get('', (request, response) => {
    response.render('index',{
        title:'Weather app',
        name: 'Asmita Chavan'
    })
})

app.get('/about', (request, response) => {
    response.render('about',{
        title: 'About Me ',
        name: 'Asmita Chavan'
    })
})

app.get('/help', (request, response) => {
    response.render('help',{
        title:'HELP page',
        name: 'Asmita Chavan'
    })
})

app.get('/help/*', (request, response) => {
    response.render('404',{
        title: 'Help page',
        name: 'Asmita Chavan',
        message:'Help article not found'
    })
})

app.get('/weather', (request, response) => {
    if(!request.query.address) {
        return response.send({
            error: 'Provide the address'
        })
    }
    // const address = response.query.address
    // console.log(address)

    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return response.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return response.send({ error })
            }
            response.send({
   
                address: request.query.address,
                Location: location,
                Forecast : forecastData,

            })

        })
    })
    
})

app.get('/products', (request, response) => {

    console.log(request.query)
    // response.send(request.query)
    // response.send({
    //     products : []
    // })
})

app.get('*', (request, response) => {
    response.render('404',{
        title: 'Weather app',
        name: 'Asmita Chavan',
        message:'Page not found'
    })
})
app.listen(port, (err) => {
    if(err)
        throw err
    console.log('Server up and running')
} )

