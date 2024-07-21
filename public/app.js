
/* document. is handinling the form submission with an event listener that 
handles "submit" and the preventdefault stops javascript from giving you a value?

*/

document.getElementById('grocery-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const item = document.getElementById('item').value;


//sending a POST request, i need to study it a bit cause idk whats going on here

  fetch('/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  })
  .then(response => response.json())
  .then(data => {
    addItemToList(data.item); // Use the item from the response
    document.getElementById('item').value = ''; // Clear the field
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



//  Fetching and displaying items

fetch('/items')
  .then(response => response.json())
  .then(items => {
    const list = document.getElementById('grocery-list');
    items.forEach(item => {
      addItemToList(item);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });



  // function to add an item to the grocery list

function addItemToList(item) {
  const listItem = document.createElement('li');
  listItem.textContent = item;

  // Make a DELETE request to remove the item

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {

  // fetch for delete

    fetch(`/items/${encodeURIComponent(item)}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        listItem.remove();
      } else {
        console.error('Error deleting item:', data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  listItem.appendChild(deleteButton);
  document.getElementById('grocery-list').appendChild(listItem);
}
