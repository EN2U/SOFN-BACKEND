const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const mongoose = require('mongoose')
const fs = require('fs');

const app = express()


const credentials = fs.readFileSync('../Certificados/X509-cert-4529026583364673650.pem');

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


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);



// Routes (URL)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/api/openFoodFacts', require('./routes/openFoodFacts'))

// Static files

// Server is listening

app.listen(app.get('port'), () => {
    console.log(`url: http://localhost:${app.get('port')}`)
})