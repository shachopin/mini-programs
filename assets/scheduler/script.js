import list from './data.js';
const wrapper = document.getElementById("wrapper");
const fragment = document.createDocumentFragment();
const items = document.querySelectorAll(".item");
const unrankedDropZone = document.getElementById("unranked-drop-zone");
let draggedItem;

for (const item of list) {
  fragment.appendChild(createSection(item));
}
wrapper.prepend(fragment);

const dropzones = document.querySelectorAll(".drop-zone");
items.forEach(setUpItem);
dropzones.forEach(setUpDropZone);

function createSection(item) {
  const section = document.createElement("section");
  section.classList.add("tier-section");
  section.innerHTML = `
    <h1>${item}</h1>
    <div class="drop-zone"></div>
  `;
  return section;
}

function setUpItem(item) {
  item.addEventListener("dragstart", onDragItem);
  item.addEventListener("dblclick", onItemDoubleClick);
}

function setUpDropZone(dropzone) {
  dropzone.addEventListener("drop", onDrop);
  dropzone.addEventListener('dragover', onDragOver)
}

function onDragItem(e) {
  draggedItem = e.target;
}

function onItemDoubleClick(e) {
  if (e.target.parentElement !== unrankedDropZone) {
    unrankedDropZone.append(e.target);
  }
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop() {
  if (this !== draggedItem.parentNode) {
    this.appendChild(draggedItem);
  }
}