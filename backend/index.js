const connectToMongo= require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo(); 
const app = express()
const port = 5000


app.use(cors())

app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})

// after exporting this db.js in index.js we have to type npm i -D nodemon in the terminal to download the nodemon
// benifit of using this nodemon was that the server restarted after clicking on save 