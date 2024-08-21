const weatherAPI = "576f3ab963c2e78a3b5d6510bd1804a8"

async function getWeatherInfo(lat,lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}`
    try{
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`${response.status}  ${response.statusText}` )
        }
        const data = await response.json()
        return {lat,lon,...data,}
    }
    catch(e){
        console.log(e)
    }
}

module.exports = getWeatherInfo