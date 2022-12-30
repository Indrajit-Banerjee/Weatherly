
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html")
})


app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "fb75e0d6f87413e5ef59827f25bc72fa";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+units;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/" +weatherIcon+ "@2x.png";

        
            res.setHeader("Content-Type", "text/html");

            res.write("<h4>The weather is currently " + weatherDescription + ".</h4>");
            res.write("<h1>The temperature of "+ query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src="+ imageURL +">");

            res.send();
        })
})

})

app.listen(3000, function(){
    console.log("Server is running on port 3000.")
});