# Grocery List App with Node.js

This project is a sample application for managing a grocery list using Node.js. It includes functionality to add and remove items, with the list being stored locally in a file and displayed on a webpage.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/grassfed-development/grocery-list-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd grocery-list-app
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Instructions

#### Week 1: Introduction to Node.js and Project Setup

1. **Introduction to Node.js:**
   - Overview of Node.js and npm.

2. **Project Setup:**
   - Initialize a new Node.js project:
     ```bash
     npm init -y
     ```
   - Install necessary packages:
     ```bash
     npm install express
     ```

3. **Basic Express Server:**
   - Create an `index.js` file and set up a basic Express server:
     ```javascript
     const express = require('express');
     const app = express();
     const port = 3000;

     app.use(express.json());
     app.use(express.urlencoded({ extended: true }));

     app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
     });
     ```

4. **Serving Static Files:**
   - Create a `public` directory and an `index.html` file inside it.
   - Serve the static files using Express:
     ```javascript
     app.use(express.static('public'));
     ```

#### Week 2: HTML and Basic UI

1. **Basic HTML Structure:**
   - Create a basic HTML file (`public/index.html`) with a form to add items and a list to display them:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <title>Grocery List</title>
     </head>
     <body>
       <h1>Grocery List</h1>
       <form id="grocery-form">
         <input type="text" id="item" placeholder="Add an item" required>
         <button type="submit">Add</button>
       </form>
       <ul id="grocery-list"></ul>
       <script src="app.js"></script>
     </body>
     </html>
     ```

2. **Basic CSS (Optional):**
   - Style the form and list (optional but recommended for a better look).

#### Week 3: Client-Side JavaScript

1. **Handling Form Submission:**
   - Create an `app.js` file in the `public` directory and add event listener for form submission:
     ```javascript
     document.getElementById('grocery-form').addEventListener('submit', function(event) {
       event.preventDefault();
       const item = document.getElementById('item').value;
       // Make a POST request to add the item
     });
     ```

2. **Fetching and Displaying Items:**
   - Fetch the list of items from the server and display them in the list:
     ```javascript
     fetch('/items')
       .then(response => response.json())
       .then(items => {
         const list = document.getElementById('grocery-list');
         items.forEach(item => {
           const listItem = document.createElement('li');
           listItem.textContent = item;
           list.appendChild(listItem);
         });
       });
     ```

#### Week 4: Server-Side Logic

1. **Handling GET and POST Requests:**
   - Set up routes in `index.js` to handle fetching and adding items:
     ```javascript
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
     ```

#### Week 5: Deleting Items

1. **Client-Side Deletion:**
   - Add a delete button next to each item and handle the click event to delete the item:
     ```javascript
     // In public/app.js
     function addItemToList(item) {
       const listItem = document.createElement('li');
       listItem.textContent = item;
       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';
       deleteButton.addEventListener('click', function() {
         // Make a DELETE request to remove the item
       });
       listItem.appendChild(deleteButton);
       document.getElementById('grocery-list').appendChild(listItem);
     }
     ```

2. **Server-Side Deletion:**
   - Add a route in `index.js` to handle deleting items:
     ```javascript
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
     ```