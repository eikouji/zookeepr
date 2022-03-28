const express = require('express');

// route to front-end //
const { animals } = require ('./data/animals');



// instantiate the server //
const app = express();


// add route //
app.get('/api/animals', (req,res) => {
    res.send('Hello!');
});

// port // server is 3003 because palindome numbers //
app.listen(3003, () => {
    console.log(`API server now on port 3003!`);
});