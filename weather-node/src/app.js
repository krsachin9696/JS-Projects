
const path = require("path")
const express = require("express")
const hbs = require("hbs")


const getCoordinates = require("./utils/geocode")
const getWeatherInfo = require("./utils/forecast")

const app = express()

const publicDirectory = path.join(__dirname,"..","public")
const viewsPath = path.join(__dirname,"..","templates/views")
const partialsPath =  path.join(__dirname,"..","templates/partials")

app.use(express.static(publicDirectory))
app.set("view engine","hbs")
app.set("views",viewsPath)

hbs.registerPartials(partialsPath)


app.get("",(req,res)=>{ 
    // converts into html and displays information
    res.render('index',{
        title:"Weather",
        name:"Sachin..."
    })
})

app.get("/about",(req,res)=>{ 
    res.render('about',{
        title:"About",
        name:"Sahin..."
    })
})

app.get("/help",(req,res)=>{ 
    res.render('help',{
        title:"Help",
        message:"You can contact us @weather.help.com for any help required! :)",
        name:"Sachin..."
    })
})


app.get("/weather",(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            message:"Please provide an address!"
        })
    }
    getCoordinates(req.query.address)
    .then(({latitude,longitude}={})=>{
        return getWeatherInfo(latitude,longitude)
    })
    .then(({lat,lon,...data}={})=>{
        res.send({
            location:{
                name:req.query.address,
                latitude:lat,
                longitude:lon
            },
            temparature:Math.round(parseInt(data.main.temp)-273.16),
            description:data.weather[0].description
        })
    })
    .catch((err)=>{
        res.send({
            message:`${err}`
        })
    })
    
})



app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"Oops! 404 not found",
        message:"Help article not found",
        name:"Sachin..."
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"Oops! 404 not found",
        message:"Page not found",
        name:"Sachin..."
    })
})


// starts up server
app.listen(3000,()=>{
    console.log("Server is up and running")
})

