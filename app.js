if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

function saveData() {
  localStorage.setItem('packingData', JSON.stringify(packingData));
}

function loadData() {
  const saved = localStorage.getItem('packingData');
  return saved ? JSON.parse(saved) : {};
}

let packingData = loadData();

function render() {
  const container = document.getElementById('categories');
  container.innerHTML = '';

  Object.keys(packingData).forEach(category => {
    const section = document.createElement('div');
    section.className = 'category';

    const titleContainer = document.createElement('div');
titleContainer.className = 'category-title';

const title = document.createElement('h2');
title.textContent = category;

const deleteCategoryBtn = document.createElement('button');
deleteCategoryBtn.textContent = '🗑️';
deleteCategoryBtn.className = 'delete-button';
deleteCategoryBtn.onclick = () => {
  delete packingData[category];
  saveData();
  render();
};

titleContainer.appendChild(title);
titleContainer.appendChild(deleteCategoryBtn);
section.appendChild(titleContainer);


    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.placeholder = 'Add item';
    section.appendChild(itemInput);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.onclick = () => {
      const val = itemInput.value.trim();
      if (val) {
        packingData[category].push({ text: val, checked: false });
        itemInput.value = '';
        saveData();
        render();
      }
    };
    section.appendChild(addButton);

    packingData[category].forEach((item, index) => {
  const itemContainer = document.createElement('div');
  itemContainer.className = 'item-row';

  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = item.checked;
  checkbox.onchange = () => {
    packingData[category][index].checked = checkbox.checked;
    saveData();
  };

  const textNode = document.createTextNode(item.text);
  label.appendChild(checkbox);
  label.appendChild(textNode);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-button';
  deleteBtn.onclick = () => {
    packingData[category].splice(index, 1);
    saveData();
    render();
  };

  itemContainer.appendChild(label);
  itemContainer.appendChild(deleteBtn);
  section.appendChild(itemContainer);
});


    container.appendChild(section);
  });
}

function addCategory() {
  const input = document.getElementById('new-category');
  const val = input.value.trim();
  if (val && !packingData[val]) {
    packingData[val] = [];
    input.value = '';
    saveData();
    render();
  }
}

document.addEventListener('DOMContentLoaded', render);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
