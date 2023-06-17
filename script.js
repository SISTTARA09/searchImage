"use strict";
const cl = console.log;
let accesKey = "aA3w5gQhatBLRfXP5sQGBPeyNxhW3ayTOlfb3fgfQxE";
let submit = document.getElementById("submit");
let searchInp = document.getElementById("searchInp");
let searchForm = document.getElementById('searchForm')
let showBox = document.querySelector(".show-box");
let showMoreBtn = document.getElementById("showMore");
let num = Math.random().toFixed(1) * 10;
searchForm.addEventListener("submit", async (ev) => {
  ev.preventDefault()
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
			let box = document.createElement("div");
			box.setAttribute("class", "box");
			let anchor = document.createElement("a");
			anchor.setAttribute("href", imgPage);
			anchor.target = "_blank";
			let img = document.createElement("img");
			img.setAttribute("src", url);
			let p = document.createElement("p");
			p.setAttribute("class", "description");
			p.textContent = data.results[i].alt_description;
			anchor.append(img, p);
			box.append(anchor);
			showBox.append(box);
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
				let box = document.createElement("div");
				box.setAttribute("class", "box");
				let anchor = document.createElement("a");
				anchor.setAttribute("href", imgPage);
				anchor.target = "_blank";
				let img = document.createElement("img");
				img.setAttribute("src", url);
				let p = document.createElement("p");
				p.setAttribute("class", "description");
				p.textContent = data.results[i].alt_description;
				anchor.append(img, p);
				box.append(anchor);
				showBox.append(box);
			}
		} catch (re) {
			cl(re);
		}
	};
});
