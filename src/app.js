const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001
//define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath =  path.join(__dirname,'../templates/partials')

// setup handelbars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'uttam',
        created: 'uttam'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name:'uttam',
        created: 'uttam'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        res.send({
            error: 'Need an address'
        })
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location} = {}) => { // destructuring // object returns ablank object if data not found
            if(error){
                res.send({
                    error
                })
            }else{
               forecast(latitude,longitude,(error,response) => {
                   if(error){
                    res.send({
                        error
                    })
                   }else{
                    res.send({
                        location,
                        latitude,
                        longitude,
                        response,
                    })
                   }
                  
               })
            }
              
           })
        
    }
    
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you provide search term'
        })
    }else{
        // console.log(req.query)
        res.send({
            product: []
        })
    }
})

//error page for route after help 
app.get('/help/*',(req,res) => {
    // res.send('help article not found')
    res.render('404',{
        title: '404',
        error: 'help article not found',
        created: 'uttam'
    })
})

// error page for any route if not found
// app.get('*',(req,res) => {
//     res.send('my 404 page')
// })

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        error: 'page not found',
        created: 'uttam'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})