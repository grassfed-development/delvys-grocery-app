const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const itemsFilePath = path.join(__dirname, 'items.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to get all items
app.get('/items', (req, res) => {
  console.log('GET /items');
  fs.readFile(itemsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading items file:', err);
      res.status(500).send('Error reading items file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Route to add an item
app.post('/items', (req, res) => {
  console.log('POST /items:', req.body);
  const newItem = req.body.item;
  fs.readFile(itemsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading items file:', err);
      res.status(500).send('Error reading items file');
      return;
    }
    const items = JSON.parse(data);
    items.push(newItem);
    fs.writeFile(itemsFilePath, JSON.stringify(items), (err) => {
      if (err) {
        console.error('Error writing items file:', err);
        res.status(500).send('Error writing items file');
        return;
      }
      res.status(201).send('Item added');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
