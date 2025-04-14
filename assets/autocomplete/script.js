const buildTrieURL = "https://dawei-spring.herokuapp.com/buildTrie";
const autoCompleteURL = "https://dawei-spring.herokuapp.com/autoComplete"
const button = document.getElementById("upload");
const inputBox = document.querySelector("textarea");

button.addEventListener("click", onClickUpload);

async function onClickUpload() {
  const words = inputBox.value.split(" ").join(",");
  const url = new URL(buildTrieURL)
  url.searchParams.set("words", words);
  
  try {
    const res = await fetch(url);
    const result = await res.text();
    alert(result);
    inputBox.value = "";
  } catch (error) {
    console.log(error)
  }
}