const urllib = require('urllib')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/592c45aa8a4445b37ab3e383b9689151/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    
    function FerheheitToDegree(temp) {
        temp = (temp - 32) * 0.55
        temp = temp.toFixed(2)
        return temp
    }
    
    urllib.request(url, (error, data, Response) => {
        if(data) {
            data = data.toString()
            data = JSON.parse(data)
        }

        if(error) {
            callback('Unable to access forecast service. Try again', undefined)
        } else if(data.code === 400) {
            callback('Unable to forecast weather. Try other location', undefined)
        }
         else {
            temp = data.currently.temperature
            highTemp = data.daily.data[0].temperatureHigh
            lowTemp = data.daily.data[0].temperatureLow
            temp = FerheheitToDegree(temp)
            highTemp = FerheheitToDegree(highTemp)
            lowTemp = FerheheitToDegree(lowTemp)

            // console.log(data.daily.data[0].summary + ' It is currently '+ temp + ' degree temperature')
            const forecastData = data.daily.data[0].summary + ' It is currently '+ temp + ' degree temperature. The highest and lowest temperature of the day is nearly ' + highTemp + ' and ' + lowTemp + ' respectively.'

            callback(undefined, forecastData)
            //console.log(data.daily.data[0].summary + ' It is currently '+ data.currently.temperature + ' temperature')


        }
    })


}


module.exports = forecast