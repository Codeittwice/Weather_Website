const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

const weatherMsg1 = document.querySelector('#weather-msg-1')
const weatherMsg2 = document.querySelector('#weather-msg-2')
const weatherMsg3 = document.querySelector('#weather-msg-3')
const weatherMsg4 = document.querySelector('#weather-msg-4')
const weatherMsg5 = document.querySelector('#weather-msg-5')
const weatherMsg6 = document.querySelector('#weather-msg-6')
const weatherMsg7 = document.querySelector('#weather-msg-7')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    weatherMsg1.textContent = ''
    weatherMsg2.textContent = ''
    weatherMsg3.textContent = ''
    weatherMsg4.textContent = ''
    weatherMsg5.textContent = ''
    weatherMsg6.textContent = ''
    weatherMsg7.textContent = ''


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                weatherMsg1.textContent = data.windSpeed
                weatherMsg2.textContent = data.pressure
                weatherMsg3.textContent = data.humidity
                weatherMsg4.textContent = data.cloudcover
                weatherMsg5.textContent = data.uv_index
                weatherMsg6.textContent = data.visibility
                weatherMsg7.textContent = data.obesrvation_time
            }
        })
    })
    console.log(location)
})