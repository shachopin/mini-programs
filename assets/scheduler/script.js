import list from './data.js';
const wrapper = document.getElementById("wrapper");
const fragment = document.createDocumentFragment();

for (const item of list) {
  fragment.appendChild(createSection(item));
}
wrapper.prepend(fragment);

function createSection(item) {
  const section = document.createElement("section");
  section.classList.add("tier-section");
  section.innerHTML = `
    <h1>${item}</h1>
    <div class="drop-zone"></div>
  `;
  return section;
}
