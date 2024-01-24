

const fs = require('fs');
const http = require('http');

var requests = require('requests');
// const fileName = fs.readFileSync('C:/Users/hp pc/OneDrive/Desktop/node.js/weather/home.css' , "utf-8");



const  fileName = fs.readFileSync(`C:/Users/hp pc/OneDrive/Desktop/node.js/weather/home.html`,"utf-8");
// console.log(fileName);

const replaceVal = (tempVal, realVal) => {
    let temperature = tempVal.replace("{%temperature%}", (realVal.main.temp-273.15).toFixed(1));

    temperature = temperature.replace("{%country%}", realVal.sys.country);
    temperature = temperature.replace("{%minTemperature%}", (realVal.main.temp_min-273.15).toFixed(1));
     temperature = temperature.replace("{%maxTemperature%}", (realVal.main.temp_max-273.15).toFixed(1));
     temperature = temperature.replace("{%city%}", realVal.name);
    return temperature;
};



const server = http.createServer((req, res) => {
   if(req.url == "/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Mathura&appid=740a52de15c04520c9311d02fc46a3ab')
    .on('data',  (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrayData = [objdata];
        console.log(arrayData);
        const realTimeData = arrayData.map( val =>  replaceVal(fileName , val)).join("");
        // console.log(realTimeData);
        res.write(realTimeData);
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    });
    
   }
});

server.listen(8000, "127.0.0.1");