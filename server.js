const fs = require('fs');
const path = require('path');

const express = require('express');

const PORT = process.env.PORT || 3001;

// instantiate the server //
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

  // add animal to json file and animals array in this function //
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});  
  
// port // server is 3001 //
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
