const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;

// instantiate the server //
const app = express();

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

// port // server is 3003 because palindome numbers //
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});