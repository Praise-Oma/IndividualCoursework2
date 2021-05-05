const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.get('/lessons', (req, res) => {
  res.json([
    { topic : 'maths' , location : 'London' , price : 100 },
    { topic : 'maths' , location : 'Sunderland' , price : 200 },
    { topic : 'maths' , location : 'Oxford' , price : 300 },
    { topic : 'maths' , location : 'Brighton' , price : 400 }
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
