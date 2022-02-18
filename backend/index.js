const connectToMongo = require('./db')
const express = require('express')
const app = express()

const port = 3000

connectToMongo();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })