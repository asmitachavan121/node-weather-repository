const urllib = require('urllib')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNtaXRhY2hhdmFuMjMyIiwiYSI6ImNrN2N1eHlhdjAzdG8zbG51ZTliZnUxZnYifQ.7MKFn6fdt4vvZOGH68LxtQ'

    urllib.request(url , (error, data, response) => {
        if(data) {
            data = data.toString()
            data = JSON.parse(data)
        }
        
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(data.features.length == 0) {
            callback('Unable to find location. Try another search', undefined)
        } else if(data){
            var latitude = data.features[0].center[1]
            var longitude = data.features[0].center[0]
            var location = data.features[0].place_name

            callback(undefined, {

                latitude, longitude, location

                // latitude : data.features[0].center[1],
                // longitude : data.features[0].center[0],
                // location : data.features[0].place_name
            })
        }
            

    })
}

module.exports = geocode
