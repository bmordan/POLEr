const express = require('express')
const app = express()
const {
    index,
    nodeById,
    personByName,
    locationByName,
    expandNodeById
} = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public', {index: "index.html"}))

app.get('/', index)
app.get('/node/:id', nodeById)
app.get('/person', personByName)
app.get('/location', locationByName)
app.get('/expand/:id/:label', expandNodeById)

app.listen(3000, () => console.log("POLEr running go explore"))
