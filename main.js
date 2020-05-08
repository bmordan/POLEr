const express = require('express')
const app = express()
const publicRoot = file => `${__dirname}/public/${file}.html`
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public', {index: "index.html"}))
app.get('/', (req, res) => res.sendFile(publicRoot('index')))
app.listen(3000, () => console.log("POLEr running go explore"))
