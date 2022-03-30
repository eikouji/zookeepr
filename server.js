const fs = require('fs');
const path = require('path');

const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3003;

// instantiate the server //
const app = express();

// parse incoming string or array data //
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data //
app.use(express.json());

// filter by query function // 
function filterByQuery(query, animalsArray) {
   let personalityTraitsArray = [];
   // saving the animalsArray as filteredResults here: //
   let filteredResults = animalsArray;
   if (query.personalityTraits) {
       // save personalityTraits as a dedicated array. //
       // if personalityTraits is a string, place into a new array and save //
       if (typeof query.personalityTraits === 'string') {
           personalityTraitsArray = [query.personalityTraits];
       } else {
           personalityTraitsArray = query.personalityTraits;
       } 
       personalityTraitsArray.ForEach(trait => {
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }  
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, './data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  return animal;
}

function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
  return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
  return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
  return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
  return false;
  }
  return true;
}


// GET routes //

// data route for animals //
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
      results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// add route //
app.get('/api/animals:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

// POST routes //

app.post('/api/animals', (req, res) => {
  // set id based on what the next index of the array will be //
  req.body.id = animals.length.toString();

  // add animal to json file and animals array in this function //
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});  
  
// port // server is 3003 because palindome numbers //
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
