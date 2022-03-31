const fs = require('fs');
const path = require('path');

const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// make these files static resources //
app.use(express.static('public')); 
// parse incoming string or array data //
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data //
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);




fetch('/api/animals', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  },
  body: JSON.stringify(animalObject)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    alert ('Error' + response.statusText);
  })
  .then(postResponse => {
    console.log(postResponse);
    alert('Great! Thank you for adding a new animal!');
  });



  // not sure where this goes //
  fetch(queryUrl)
  .then(response => {
      if (!response.ok) {
          return alert('Error: ' + response.statusText);
      }
      return response.json();
  })
  .then(animalData => {
      console.log(animalData);
      printResults(animalData);
  });





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// req.query multifaceted - req.param is specific to one property //

// stopped at 11.4.5 //
