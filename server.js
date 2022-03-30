const fs = require('fs');
const path = require('path');

const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3003;
const app = express();

// make these files static resources //
app.use(express.static('public')); 
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
       if (typeof query.personalityTraits === 'string') {
           personalityTraitsArray = [query.personalityTraits];
       } else {
           personalityTraitsArray = query.personalityTraits;
       } 
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
        path.join(_dirname, './data/animals.json'),
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



// GET data route for animals //
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
      results = filterByQuery(req.query, results);
  }
    res.json(results);

});

// 2nd GET data route for required parameters for animal array // 
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});



// POST data route, this time for user input to add zoo animals // post requests are user to server //
app.post('/api/animals', (req, res) => {
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

// GET to serve the index.html from the express.js server //
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// serve animals.html page //
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// serve zookeeper.html page //
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// serve a page that does not exist, like About, Membership, Contact. * should come last//
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// the GET route for serving the public index.html file //

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



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



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// req.query multifaceted - req.param is specific to one property //

// stopped at 11.3.6 //
