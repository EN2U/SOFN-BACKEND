 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const fs = require('fs');

const app = express()


const credentials = fs.readFileSync('../Certificados/X509-cert-3808143451361577486.pem');

mongoose.connect('mongodb+srv://sreipeme.hvazi.mongodb.net/TFG?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslKey: credentials,
    sslCert: credentials 
}).then(db => console.log(`DB is connected`))
  .catch(err => console.error(err))

// Settings

app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());


// Routes (URL)
app.use('/api/openFoodFacts', require('./routes/openFoodFacts'))

// Static files

// Server is listening

app.listen(app.get('port'), () => {
    console.log(`url: http://localhost:${app.get('port')}`)
})