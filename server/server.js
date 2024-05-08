const express = require('express');
const connectDB = require('./db/connect');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
require('dotenv').config();
const path = require('path');

// Routes
const userRoutes = require('./routes/userRoutes');

// Express App
const app = express();

// Middleware
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, //15 minutes
		max: 100, //limit each IP to 100 requests per windowMs
	})
);
app.use(express.json());
app.use(helmet()); //set security HTTP headers
app.use(cors()); //enable CORS
app.use(xss()); //prevent XSS attacks

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(
	'/assests',
	express.static(path.join(__dirname, '../client/dist/assests'))
);

app.use('/users', userRoutes);
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
		if (err) {
			console.error('Error sending file:', err);
		}
	});
});

// Function Start
const PORT = process.env.PORT || 5000;

async function start() {
	try {
		await connectDB(process.env.MONGO_URL);
		console.log('Connected to the database successfully');
		app.listen(PORT, () => {
			console.log(`Server is listening on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}

start();
