const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/app.html");
});

app.post("/", function (req, res) {
  
  const query = req.body.cityName;
  const apiKey = "654c16851341a196a8936000f6dfc439";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    console.log(response.statusCode, response.statusMessage);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degress Celcius.</h1>"
      );
      res.write("<h2>The weather is currently " + weatherDesc + "</h2>");
      res.write("<img src = " + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started");
});
