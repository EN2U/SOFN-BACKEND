 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const app = express()


// Settings

app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })
// // Bring in the Passport Strategy

// Routes (URL)

// Static files

// Server is listening

app.listen(app.get('port'), () => {
    console.log(`url: http://localhost:${app.get('port')}`)
})