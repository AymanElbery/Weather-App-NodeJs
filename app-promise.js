const yargs = require("yargs");
const axios = require("axios");

const apiKey = "c7b1d3bded8ccbfbb41c0caa2a12bc6a";

const argv = yargs
.options({
    a: {
        demand: true,
        alias: "address",
        describe: 'Address to fetch whether for',
        string: true,
    },
})
.help()
.alias('help' , 'h')
.argv;

var address = encodeURIComponent(argv.a);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === "OVER_QUERY_LIMIT") {
       throw new Error("You have exceeded your daily request quota for this API !");
    }else if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find that address !");
    }
    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((response) => {
    var c = Math.round((response.data.currently.temperature - 32) * 5 / 9)
    console.log("Weather currently     : " , response.data.currently.summary );
    console.log("Temperature currently : " , c );
    console.log("Wind Speed currently  : " , response.data.currently.windSpeed , "km/h" );
    console.log("Pressure currently    : " , response.data.currently.pressure );
}).catch((e) => {
    if (e.code === "ENOTFOUND") {
        console.log("Unable to connect to API servers !");
    }else if (e.code === "EHOSTUNREACH") {
        console.log("Unable to connect to API servers !");
    }else{
        console.log(e.message);
    }
})





