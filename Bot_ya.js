// ==UserScript==
// @name         Google-bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  for google
// @author       Dmitriy_Petrov
// @match        https://www.google.com/*
// @match        https://auto.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let keywords = ["купля продажа автомобиля", "автомобили купить", "подержанные авто"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];




if (btnK !== undefined) {
	let i = 0;
	let timerId = setInterval(()=> {
		googleInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btnK.click();

		}
	},500)
	} else if (location.hostname == "auto.ru") {
		console.log("Мы на auto.ru");
		let index = getRandom(0, links.length)
		setTimeout(()=> {
			if (links[index].href.indexOf("auto.ru") !== -1)
					links[index].click();
					}, getRandom(2000, 3000))
	}else {
		let nextGooglePage = true;
		for (let i = 0; i < links.length; i++) {
			if (links[i].href.includes("auto.ru")) {
				let link = links[i];
				nextGooglePage = false;
				console.log("Нашел строку " + links[i]);
				setTimeout(()=>{
					link.click();
				},getRandom(2000, 5000))

				break;
			}
		}
		if(document.querySelector(".YyVfkd").innerText == "5") {
			nextGooglePage = false;
			location.href = "https://www.google.com/";
		}
		if (nextGooglePage) {
			setTimeout(()=>{
				pnnext.click();
			},getRandom(3000, 7000));
		}
	}
function getRandom (min, max) {
	return Math.floor(Math.random()*(max - min) + min);
}
