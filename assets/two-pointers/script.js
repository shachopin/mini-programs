const form = document.querySelector("form");

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(splitWords(e.target.value));
})

function splitWords(s) {
    return s === "" ? [] : s.split(" ");
}