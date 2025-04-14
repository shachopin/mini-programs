import list, {colors} from './data.js';
const wrapper = document.getElementById("wrapper");
const fragment = document.createDocumentFragment();
//const items = document.querySelectorAll(".item"); //let's use event delegation instead
const unrankedDropZone = document.getElementById("unranked-drop-zone");
let draggedItem;

for (const item of list) {
  fragment.appendChild(createSection(item));
}
wrapper.prepend(fragment);

const dropzones = document.querySelectorAll(".drop-zone");
//items.forEach(setUpItem); //let's use event delegation instead
dropzones.forEach(setUpDropZone);
//setUpUnrankedDropZone(unrankedDropZone);
//if you uwant to use event delegation on dragstart event, notice dragstart event tiggered on parent element only if 1)parent element dragged OR 2)any child element got dragged
//that's why if you only do it on unrankedDropZone, then after all child elements got dragged, it never got triggered again
//that's why you need to set this event on ALL dropzone, not just unrankedDropZone, for the draggedItem = e.target; to reset

function createSection(item) {
  const section = document.createElement("section");
  section.classList.add("tier-section");
  section.innerHTML = `
    <h1>${item}</h1>
    <div class="drop-zone"></div>
  `;
  return section;
}

// function setUpItem(item) { //let's use event delegation instead
//   item.addEventListener("dragstart", onDragItem);
//   item.addEventListener("dblclick", onItemDoubleClick);
// }

// function onDragItem(e) {
//   draggedItem = e.target;
// }

// function onItemDoubleClick(e) {
//   if (e.target.parentElement !== unrankedDropZone) {
//     unrankedDropZone.append(e.target);
//   }
// }

function setUpDropZone(dropzone) {
  dropzone.addEventListener("drop", onDrop);
  dropzone.addEventListener('dragover', onDragOver);
  dropzone.addEventListener('dblclick', onDoubleClickAnyDropZone);
  dropzone.addEventListener('dragstart', onDragItem);
}

// function setUpUnrankedDropZone(unrankedDropZone) {
//   unrankedDropZone.addEventListener('dragstart', onDragItem);
// }

function onDragItem(e) {
  console.log('dragstarted')
  if(e.target.classList && e.target.classList.contains("item")) {
    draggedItem = e.target;
  }
  
  //if you uwant to use event delegation on dragstart event, notice dragstart event tiggered on parent element only if 1)parent element dragged OR 2)any child element got dragged
//that's why if you only do it on unrankedDropZone, then after all child elements got dragged, it never got triggered again
//that's why you need to set this event on ALL dropzone, not just unrankedDropZone, for the draggedItem = e.target; to reset
}

function onDoubleClickAnyDropZone(e) {
  if (e.target === this) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.innerHTML += `<div draggable="true" id="${color}" class="item" contenteditable="true"></div>`;
  } else if (e.target.parentElement !== unrankedDropZone) {
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

