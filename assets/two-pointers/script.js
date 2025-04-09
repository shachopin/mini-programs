const form = document.querySelector("form");
const input = document.querySelector("input")

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(splitWords(input.value));
})

function splitWords(s) {
    return s === "" ? [] : s.split(" ");
}