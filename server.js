//npm install
//nodemon
//npm install ejs --save
//create file puplic. and use static methot for reading css, exxpres by default do not read css

const express = require('express')

const request =require('request')
const app = express()

const apiKey = '7a244b9db87b82784cfc1ed359b89a0a';
app.use(express.static('public'));
app.set ('view engine', 'ejs')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',  function(req, res){
    res.render('index', {weather: null, error: null});
})

app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    
    request(url, function (err, response, body) {
        if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body)
          if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
          } else {
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('index', {weather: weatherText, error: null});
          }
        }
      });
    })




app.listen(1500, function(){
    console.log('example app listhening on port 1500')
})