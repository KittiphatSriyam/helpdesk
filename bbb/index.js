const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Controller = require('./controller')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.post('/', (req, res) => {
  res.send('index.js')
})


app.post('/getDepartment', async (req, res) => {
  const department = await Controller.getDepartment()
  res.status(200).json(department)
})

app.listen(3000, () => {
  console.log('http://localhost:3000');
})
