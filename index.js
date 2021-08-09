const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const swaggerUI = require('swagger-ui-express')

const mongoose = require('mongoose')
const fs = require('fs')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./test.yaml')

const app = express()

const credentials = fs.readFileSync('../Certificados/X509-cert-4529026583364673650.pem')

mongoose.connect('mongodb+srv://sreipeme.hvazi.mongodb.net/TFG?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  sslKey: credentials,
  sslCert: credentials
}).then(db => console.log('DB is connected'))
  .catch(err => console.error(err))

// Settings

app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Routes (URL)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/api/openFoodFacts', require('./routes/openFoodFacts'))
app.use('/api/user', require('./routes/user'))
app.use('/enterprise', require('./routes/enterprise'))

// Static files

// Server is listening

app.listen(app.get('port'), () => {
  console.log(`url: http://localhost:${app.get('port')}`)
})
