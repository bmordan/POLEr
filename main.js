const express = require('express')
const app = express()
const {
    index,
    personByName,
    expandNodeById
} = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public', {index: "index.html"}))

app.get('/', index)
app.get('/person', personByName)
app.get('/expand/:id', expandNodeById)

app.listen(3000, () => console.log("POLEr running go explore"))
