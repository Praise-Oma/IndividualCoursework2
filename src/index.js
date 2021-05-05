const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/lessons', (req, res) => {
  res.json([
    { topic : 'math' , location : 'London' , price : 100 },
    { topic : 'math' , location : 'Liverpool' , price : 80 },
    { topic : 'math' , location : 'Oxford' , price : 90 },
    { topic : 'math' , location : 'Bristol' , price : 120 }
    ]);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/user', (req, res) => {
    res.json({ email : 'user@email.com' , password : 'mypassword' });
  })

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})