const {Router} = require("express")
const fetch = require("node-fetch")

const router = new Router()

const getUrl = (coord, city) => {
    let url = process.env.API_URL
    if (coord){
        const coordenates = coord.split(",")
        const lat = coordenates[0].trim()
        const lon = coordenates[1].trim()
        
        url = url+`lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`
    }
    if(city){
        url = url+`q=${city}&units=metric&appid=${process.env.API_KEY}`
    }
    return url
}
router.get("", async (request, response) => {
    const {coord, city} = request.query
    
    const url = getUrl(coord, city)

    try {
        
        const data = await fetch(url)
        const weatherData = await data.json()
        weatherData.weather.forEach(element => {
            element.url = process.env.API_URL_IMG+element.icon+'.png'
        });
        
        const info = {
            city: weatherData.name + ", " + weatherData.sys.country,
            weather:  weatherData.weather,
            temperature: weatherData.main,
            wind: weatherData.wind.speed,
            clouds: weatherData.clouds.all
        }
        response.cookie('weather', info, {
            maxAge: 120000
        })
        response.cookie('isSearch', true, {
            maxAge: 120000
        })
        response.redirect("/")
        
    } catch (error) {
        response.redirect("/")
    }
})

module.exports = router