const express = require('express')
const app = express()
const {
    index,
    all
} = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public', {index: "index.html"}))

app.get('/', index)
app.get('/all', all)

app.listen(3000, () => console.log("POLEr running go explore"))
