
const express=require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app= express()
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res){
    res.sendFile(__dirname +"\\index.html");
} );

app.post('/', function(req, res){

    
    const query = req.body.cityName;
    const APIKey = "251dc554c345f3d7c671074c8a3bf80b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+ APIKey+"&units="+unit;

    https.get(url,function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const icon  = weatherData.weather[0].icon
            
            const iconURL =" http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Temp in "+ query+ " is  " + temp + " Degree celsius</h1>");
            res.write("<h2>Weather is currently " + desc+"</h2>");
            res.write("<img src=" + iconURL+ ">");
            res.send();
        });
    });

});


app.listen(3000, function(){
    console.log("Server is on port 3000");
});