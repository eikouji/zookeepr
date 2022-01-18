/* functions in this file: 
 filterByQuery()
 findById()
 createNewAnimal()
 validateAnimal()*/

 const fs = require('fs');
 const path = require('path');



 // filter by query function // 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // saving the animalsArray as filteredResults here: //
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // save personalityTraits as a dedicated array. //
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        } 
        console.log(personalityTraitsArray);
        personalityTraitsArray.ForEach(trait => {
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
 
 function findById(id, animalsArray) {
     const result = animalsArray.filter(animal => animal.id === id)[0];
     return result;
 }
 
 function createNewAnimal(body, animalsArray) {
     // main code // //
     const animal = body;
     animalsArray.push(animal);
     fs.writeFileSync(
         path.join(_dirname, '../data/animals.json'),
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
     if (!animal.personalTraits || !Array.isArray(animal.personalTraits)) {
         return false;
     }
     return true;
 
 }

  // module exports //
  module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};
 
 