document.getElementById('grocery-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const item = document.getElementById('item').value;
    // Make a POST request to add the item
  });

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
