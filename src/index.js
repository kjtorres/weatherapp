const express = require("express")
const cookieParser = require('cookie-parser')
const path = require('path')

const weatherRouter = require("./routes/weather")

const app = express()
const PORT = process.env.APP_PORT

app.set("view engine", "ejs");


app.listen(PORT, () => console.log(`Service running on ${PORT}`))

/**
 * MIDDLEWARE
 */
app.use(express.static(path.join(__dirname, 'views')))
app.use(cookieParser())

/**
 * ROUTES
 */
app.use("/api/v1/weather", weatherRouter)

// FRONTEND
app.get('/', function(req, res) {
    const {weather, isSearch= false } = req.cookies
    res.render('index', {weather: weather, isSearch: isSearch});
});