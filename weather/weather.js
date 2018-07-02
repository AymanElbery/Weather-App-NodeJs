const request = require("request");

var getWeather = (apiKey, lat , lng , callback) => {
    //var address = encodeURIComponent(address);

    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json: true,
    } , (error , response , body) => {
        if (error) {
            callback("Unable to connect to forecast.io servers !");
        }else if (response.statusCode === 400) {
            callback("Unable to fetch weather !");
        }else if (response.statusCode === 200) {
            callback(undefined , {
                summary     : body.currently.summary ,
                temperature : body.currently.temperature ,
                windSpeed   : body.currently.windSpeed ,
                pressure    : body.currently.pressure ,
            })
        }   
    });
}

module.exports.getWeather = getWeather;


