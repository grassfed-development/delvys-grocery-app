const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//#Serving-static-files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const fs = require('fs');
const filePath = './grocery-list.json';

app.get('/items', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/items', (req, res) => {
  const newItem = req.body.item;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    const items = JSON.parse(data);
    items.push(newItem);
    fs.writeFile(filePath, JSON.stringify(items), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.status(201).send('Item added');
    });
  });
});
app.delete('/items', (req, res) => {
  const itemToDelete = req.body.item;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    let items = JSON.parse(data);
    items = items.filter(item => item !== itemToDelete);
    fs.writeFile(filePath, JSON.stringify(items), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }
      res.status(200).send('Item deleted');
    });
  });
});