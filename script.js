"use strict";
const cl = console.log;
// LET THE ELEMENTS
let accesKey = "aA3w5gQhatBLRfXP5sQGBPeyNxhW3ayTOlfb3fgfQxE";
let submit = document.getElementById("submit");
let searchInp = document.getElementById("searchInp");
let searchForm = document.getElementById("searchForm");
let showBox = document.querySelector(".show-box");
let showMoreBtn = document.getElementById("showMore");
let num = Math.random().toFixed(1) * 10;
// CREATE THE SEARCH FUNCTION
async function searchFunction(ev) {
	ev.preventDefault();
	submit.addEventListener("click", () => (showBox.innerHTML = ""));
	let fetchUrl = `https://api.unsplash.com/search/photos?page=${num}&query=${searchInp.value}&client_id=${accesKey}`;
	let mainData = await fetch(fetchUrl);
	let data = await mainData.json();
	let resultsArr = data.results;
	// WORK WITH SHOW BOX
	resultsArr.map((ele) => {
		let url = ele.urls.small;
		let imgPage = ele.links.html;
		let description = ele.alt_description;
		showBox.innerHTML += `
		<div class="box">
		<a href="${imgPage}" target="_blank">
		<img src="${url}">
		<p class="description">${description}</p>
		</a>
		</div>`;
		// DISPLAY THE SHOW MORE BUTTON
		showMoreBtn.style = "display: block;";
	});
	num++;
}
// ADD EVENT LISTENER TO THE SEARCH FORM
searchForm.addEventListener("submit", searchFunction);
// ADD EVENT LISTENER TO THE SHOW MORE BUTTON
showMoreBtn.addEventListener("click", searchFunction);
