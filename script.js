"use strict";
const cl = console.log;
let accesKey = "aA3w5gQhatBLRfXP5sQGBPeyNxhW3ayTOlfb3fgfQxE";
let submit = document.getElementById("submit");
let searchInp = document.getElementById("searchInp");
let searchForm = document.getElementById("searchForm");
let showBox = document.querySelector(".show-box");
let showMoreBtn = document.getElementById("showMore");
let num = Math.random().toFixed(1) * 10;
searchForm.addEventListener("submit", async (ev) => {
	ev.preventDefault();
	showBox.textContent = "";
	// WORK WITH API
	let mainData = await fetch(
		`https://api.unsplash.com/search/photos?page=${num++}&query=${
			searchInp.value
		}&client_id=${accesKey}`
	);
	try {
		let data = await mainData.json();
		for (let i in data.results) {
			let url = data.results[i].links.download;
			let imgPage = data.results[i].links.html;
			showBox.innerHTML += `<div class="box">
			<a href="${imgPage}" target="_blank">
			<img src="${url}">
			<p class="description">${data.results[i].alt_description}</p>
			</a>
			</div>` 
		}
	} catch (reason) {
		cl(reason);
	}
	// SHOW MORE BUTTON
	setTimeout(() => {
		showMoreBtn.style = "display: block;";
	}, 1000);
	showMoreBtn.onclick = async function () {
		let mainData = await fetch(
			`https://api.unsplash.com/search/photos?page=${num++}&query=${
				searchInp.value
			}&client_id=${accesKey}`
		);
		try {
			let data = await mainData.json();
			for (let i in data.results) {
				let url = data.results[i].links.download;
				let imgPage = data.results[i].links.html;
				showBox.innerHTML += `<div class="box">
				<a href="${imgPage}" target="_blank">
				<img src="${url}">
				<p class="description">${data.results[i].alt_description}</p>
				</a>
				</div>`
			}
		} catch (re) {
			cl(re);
		}
	};
});
('<div class="box"><a href="https://unsplash.com/photos/boEl1XGLZ10" target="_blank"><img src="https://unsplash.com/photos/boEl1XGLZ10/download?ixid=M3w0NjI2MzZ8MHwxfHNlYXJjaHwzMXx8ZnxlbnwwfHx8fDE2ODY5OTI3MDh8MA"><p class="description">a green sports car parked in front of a building</p></a></div>');
