const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { adminLogin } = require('./controller/admin')
const { getDepartment } = require('./controller/department')
const { addProblem, getProblemLimitedDone, getProblemLimitedPending, setStatusJob } = require('./controller/repair')
const { addMember, getMember, getMemberByToken } = require('./controller/member')
const cors = require('cors')
const port = process.env.PORT || 3000
app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

app.listen(port, function () {
  console.log(`server is : http://localhost:${port}`);
});

app.post('/', (req, res) => {
  res.send(200)
})


app.post('/getDepartment', async (req, res) => {
  const department = await getDepartment()
  res.status(200).json(department)
})

app.post('/login', async (req, res) => {
  const memberToken = await getMember(req.body)
  res.status(200).json(memberToken)
})

app.post('/getMemberByToken', async (req, res) => {
  const profile = getMemberByToken(req.body.token)
  res.send(profile)
})

app.post('/repair/getProblemLimitedDone', async (req, res) => {
  const problem = await getProblemLimitedDone(req.body)
  res.json(problem)
})
app.post('/repair/getProblemLimitedPending', async (req, res) => {
  const problem = await getProblemLimitedPending(req.body);
  res.json(problem)
})
app.post('/repair/setStatusJob', async (req, res) => {
  const result = await setStatusJob(req.body);
  res.json(result)

})

app.post('/repair/add', async (req, res) => {
  const profile = getMemberByToken(req.body.token)
  const param = {
    title: req.body.title,
    detail: req.body.detail,
    ...profile.profile
  }
  const status = await addProblem(param)
  res.json({ status })
})

app.post('/register', async (req, res) => {
  const member = await addMember(req.body)
  res.status(200).json(member)
})

app.post('/admin/login', async (req, res) => {
  const token = await adminLogin(req.body)
  res.json(token)
})


