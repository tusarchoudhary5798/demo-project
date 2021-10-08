const mongoose = require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/demo_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.log('Connection to mongodb was not successful!', error);
  });

// import all of our models

require('./models/user');
require('./models/product');

