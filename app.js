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

    const title = document.createElement('h2');
    title.textContent = category;
    section.appendChild(title);

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
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.checked;
      checkbox.onchange = () => {
        packingData[category][index].checked = checkbox.checked;
        saveData();
      };
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(item.text));
      section.appendChild(label);
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
