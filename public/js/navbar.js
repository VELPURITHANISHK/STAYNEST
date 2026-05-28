document.addEventListener("DOMContentLoaded", () => {

const input =
document.getElementById("searchInput");

if (!input) return;

input.addEventListener("keyup", () => {

const value =
input.value.toLowerCase();

document
.querySelectorAll(".listing-card")
.forEach(card => {

const text =
card.innerText.toLowerCase();

card.parentElement.style.display =
text.includes(value)
? ""
: "none";

});

});

});