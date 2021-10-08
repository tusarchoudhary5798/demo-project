require('dotenv').config({ path: __dirname + '/.env' })
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

require('./db');
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
// require('./utils/passport');

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);


app.listen(port, () => {
	console.log('Server is up and running on port', port);
})