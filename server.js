const express = require('express')
const app = express()
const mw = require('./middleware')

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/list', mw.fetchList)
app.get('/:id', mw.fetchUrl)
app.post('/shorten', mw.createUrl)

app.listen(4000)
console.log('Listening in port 4000...')