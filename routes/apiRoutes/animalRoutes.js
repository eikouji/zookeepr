const router = require('express').Router();
const { filterByQuery, createNewAnimal, validateAnimal } = require ('../../lib/animals');
const { animals } = require('../../data/animals');



// GET data route for animals //
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
      res.json(results);
  
  });
  
  // 2nd GET data route for required parameters for animal array // 
  router.get('/animals/:id', (req, res) => {
      const result = findById(req.params.id, animals);
      if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
  });

  // POST data route, this time for user input to add zoo animals // post requests are user to server //
router.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be, as to avoid repeats or errors //
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back //
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

modules.exports = router;
