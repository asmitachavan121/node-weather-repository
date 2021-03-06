// import { response } from "express"


console.log('Client side JS file is created from js folder!')
console.log('fetch api will get called')

// fetch('http://puzzle.mead.io/puzzle')
// fetch('http://localhost:2000/weather?address=!')

// // fetch('https://api.darksky.net/forecast/592c45aa8a4445b37ab3e383b9689151/37.8267,-122.4233' ,{mode:'no-cors'})
// // fetch('http://fakejson.com', {mode:'no-cors'})
// .then((response) => response.json() )//response.json())
// .then((data) => {
//     if(data.error)
//         console.log(data.error)
//     else
//         console.log(data)
// })

// .catch((error) => console.log('see error: ', error))


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageOne = document.querySelector('#msg-1')
var messageTwo = document.querySelector('#msg-2')

messageOne.textContent = 'From javascript '
messageTwo.textContent = ''
weatherForm.addEventListener('submit', (e) => {                 //e-event object
    
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Result will be shown soon...'
    const location = search.value

    const url = '/weather?address=' + location

    // fetch(url)
    fetch(url, {mode: 'no-cors'})
    .then((response) => response.json() )//response.json())
    .then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else {
            console.log(data)
            messageOne.textContent = data.Location
            messageTwo.textContent  = data.Forecast
        }
    })

    .catch((error) => console.log('see error: ', error))



    console.log(location)
})