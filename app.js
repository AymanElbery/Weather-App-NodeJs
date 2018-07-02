const geocode = require("./geocode/geocode");
const getWeather = require("./weather/weather");
const yargs = require("yargs");
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


geocode.geocodeAddress(argv.a , (errorMessage , results) => {
    if (errorMessage) {
        console.log(errorMessage);
    }else{
        console.log(JSON.stringify(results , undefined , 2));
        getWeather.getWeather(apiKey , results.latitude , results.longitude ,(errorMessage , weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            }else{
                console.log(JSON.stringify(weatherResults , undefined , 2));
            }
        });
    }
});


