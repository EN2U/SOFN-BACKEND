 
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

// // Bring in the Passport Strategy

// Routes (URL)
app.use('/api/openFoodFacts', require('./routes/openFoodFacts'))

// Static files

// Server is listening

app.listen(app.get('port'), () => {
    console.log(`url: http://localhost:${app.get('port')}`)
})