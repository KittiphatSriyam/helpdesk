const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Controller = require('./controller')
const cors = require('cors')
app.use(cors({
  origin: "http://localhost:4200"
}));

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
