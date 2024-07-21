
// importing express
const express = require('express');

// imports node.js filesystem <------------------
const fs = require('fs');

//creating an express app
const app = express();

//Setting the Port
const port = 3000;

// path to the json file
const filePath = './grocery-list.json'; // <-------------------

// stuff for JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));


// Handling GET request
app.get('/items', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

/* 
  
  app.post is handling POST request, in grassfed repo you had started line 
56 but theres some missing symbols, missing the
 (err) => { 
its writing the updated data bacck to the file?

theres this fs.writefile in app.post and app.delete but not app.get cause its 
just getting it?
fs.writeFile(filePath, JSON.stringify(items), (err) => {

*/
app.post('/items', (req, res) => {   
  const newItem = req.body.item;     // <------- gets the new item?
  fs.readFile(filePath, (err, data) => { 
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const items = JSON.parse(data);
    items.push(newItem);
    fs.writeFile(filePath, JSON.stringify(items), (err) => { // <----- is this a callback?
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.status(201).json({ message: 'Item added', item: newItem });
    });
  });
});


// Handling delete request
app.delete('/items/:item', (req, res) => {
  const itemToDelete = decodeURIComponent(req.params.item);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    let items = JSON.parse(data);
    const index = items.indexOf(itemToDelete);
    if (index > -1) {
      items.splice(index, 1);
      fs.writeFile(filePath, JSON.stringify(items), (err) => {
        if (err) {
          res.status(500).send('Error writing file');
          return;
        }
        res.status(200).json({ success: true, message: 'Item deleted' });
      });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  });
});


// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

