const openWeatherApiKey = 'a0d3264f2a057f9271b6060ea7dad81a'
const apiCountryURL = 'https://flagcdn.com/'
const apiUnsplashURL = 'https://source.unsplash.com/1600x900/?'
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

const errorMessageContainer = document.querySelector('#error-message')
const loader = document.querySelector('#loader')

const suggestionsContainer = document.querySelector('#suggestions')
const suggestionsButtons = document.querySelectorAll('#suggestions button')

// Loader
const toggleLoader = () => {
    loader.classList.toggle('hide')
}

// Functions
const getWeatherData = async(city) => {

    toggleLoader()
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherApiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    toggleLoader()

    return data

}

// Tratamento de erro

const showErrorMessage = () => errorMessageContainer.classList.remove('hide')

const hideInformation = () => {
    errorMessageContainer.classList.add('hide')
    weatherContainer.classList.add('hide')
    suggestionsContainer.classList.add('hide')
}

const showWeatherData = async (city) => {

    hideInformation()

    const data = await getWeatherData(city)

    if(data.cod === '404') {
        showErrorMessage()
        return
    }

    cityElement.innerText = `${data.name}`
    temperatureElement.innerText = Math.round(data.main.temp)
    descriptionElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute('src', 
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png
    `)
    countryElement.setAttribute('src', apiCountryURL + data.sys.country.toLowerCase() + '.svg')
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed} km/h`

    document.body.style.backgroundImage = `url('${apiUnsplashURL + city}')`

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

suggestionsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute('id')

        showWeatherData(city)
    })
})