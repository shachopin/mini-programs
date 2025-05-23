const form = document.querySelector("form");
const input = document.querySelector("input")
const answer = document.getElementById("ans");

form.addEventListener('submit', function(e) {
  e.preventDefault();
  fetch('https://dawei-spring.herokuapp.com/permutation-i', {method: 'post', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, body: JSON.stringify({
            "nums": splitWords(input.value)
            })}).then(res => res.json()).then(a => {
    answer.textContent = JSON.stringify(a.permutations)} );
})

function splitWords(s) {
    return s === "" ? [] : s.split(" ");
}