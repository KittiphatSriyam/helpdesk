const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getDepartment } = require('./controller/department')
const { addMember, getMember, getMemberByToken } = require('./controller/member')
const cors = require('cors')
const jwt = require('jsonwebtoken');


app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.post('/', (req, res) => {
  res.send('index.js')
})


app.post('/getDepartment', async (req, res) => {
  const department = await getDepartment()
  res.status(200).json(department)
})

app.post('/login', async (req, res) => {
  const memberToken = await getMember(req.body)
  res.send(memberToken)
})
app.post('/getMemberByToken', async (req, res) => {
  const profile = getMemberByToken(req.body.token)
  res.send(profile)
})

app.post('/register', async (req, res) => {
  const member = await addMember(req.body)
  res.status(200).json(member)
})

app.listen(3000, () => {
  console.log('http://localhost:3000');
})
