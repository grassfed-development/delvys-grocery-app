document.getElementById('grocery-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const item = document.getElementById('item').value;
  console.log('Adding item:', item);  // Debug log

  // Make a POST request to add the item
  fetch('/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: item }),
  })
  .then(response => {
    if (response.ok) {
      console.log('Item added successfully');
      return response.json();
    } else {
      throw new Error('Failed to add item');
    }
  })
  .then(() => {
    // Reload the items list
    console.log('Reloading items');
    loadItems();
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // Clear the input field
  document.getElementById('item').value = '';
});

// Function to load items
function loadItems() {
  console.log('Loading items');
  fetch('/items')
    .then(response => response.json())
    .then(items => {
      console.log('Items loaded:', items);
      const list = document.getElementById('grocery-list');
      list.innerHTML = '';
      items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error loading items:', error);
    });
}

// Load items when the page loads
window.onload = loadItems;
