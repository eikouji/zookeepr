const express = require('express');

const app = express();

const { animals } = require('./data/animals');

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

       /* Loop through each trait in the personalityTraits array:
       personalityTraitsArray.forEach(trait => {
           - check the trait against each animal in the filteredResults array.
           - It is initially a copy of the animalsArray, but we're updating it for each trait in the
           .forEach() loop.
           For each trait being targeted by the filter, the filteredResults array will contain only
           the entries that contain the trait, so at the end we'll have an array of animalsArray
           that have every one of the traits when the .forEach() loop is finished.
           like shopping on amazon.com - pick traits like "size m", "colors green or blue", "men's", material, by Amazon or other brands.
           */
         
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !==-1
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

    //return the filtered results ; //
    return filteredResults;
}




// data route for animals //
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
      results = filterByQuery(req.query, results);
  }
    res.json(results);

});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});