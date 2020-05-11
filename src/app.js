///Call Function
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
//path
const path = require('path')
//expressJS
const express = require('express')
const app = express()
const hbs= require('hbs')
const port = process.env.PORT|| 3000

//Difine path
const publicDir=path.join(__dirname,'../public') // link to css/img
const viewsPath= path.join(__dirname,'../templates/views') //link to views (HTML/HBS) 
const partialPath=path.join(__dirname,'../templates/partial') //LINK to default dynamic HBS file

//setup handlerbars engine and views location
app.set('views',viewsPath) //view path
app.set('view engine','hbs')
hbs.registerPartials(partialPath) //partial path 

//Setup static directory to serve
app.use(express.static(publicDir)) ///POINT TO PUBLIC FOLDER


app.get('',(req,res)=>{  //ROOT
    res.render('index',{
        title:'Weather App',
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address',
        })
    }
    //GEOCODE IS HERE 
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        // fore cast
        forecast(latitude,longitude,(error, forecastData) => {  //lat - long
        if(error){
            return res.send({error})
        }
        return res.send({
            address: req.query.address,
            location: location,
            forecastData: forecastData,
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Help article not found',
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error',
        error:'404 Page not found!',
    })
})

//start server
app.listen(port,() => {
    console.log('Server is up on port '+port)
})