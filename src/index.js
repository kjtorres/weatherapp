const express = require("express")

const app = express()
const PORT = process.env.APP_PORT

app.listen(PORT, () => console.log(`Service running on ${PORT}`))