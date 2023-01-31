const apiKey = 'a0d3264f2a057f9271b6060ea7dad81a'
const countryURL = 'https://flagcdn.com/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const temperatureElement = document.querySelector('#temperature span')
const descriptionElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')

// Functions
const getWeatherData = async(city) => {
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(data);

    return data

}

const showWeatherData = async (city) => {

    const data = await getWeatherData(city)

    cityElement.innerText = `${data.name}`

    temperatureElement.innerText = Math.round(data.main.temp)

    descriptionElement.innerText = data.weather[0].description
    
    weatherIconElement.setAttribute('src', 
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png
    `)

    countryElement.setAttribute('src', countryURL + data.sys.country.toLowerCase() + '.svg')

    humidityElement.innerText = `${data.main.humidity}%`

    windElement.innerText = `${data.wind.speed} km/h`

    weatherContainer.classList.remove('hide')

}

// Events
searchBtn.addEventListener('click', (evento) => {

    evento.preventDefault()
    
    const city = cityInput.value
    
    showWeatherData(city)

})

cityInput.addEventListener('keyup', (event) => {
    if(event.code === 'Enter') {
        const city = event.target.value

        showWeatherData(city)
    }
})