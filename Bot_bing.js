// ==UserScript==
// @name         Bing-bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  for google
// @author       Dmitriy_Petrov
// @match        https://www.bing.com/*
// @match        https://auto.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let keywords = ["купить авто", "автомобили купить", "подержанные авто"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let bingInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("search")[0];




if (btnK !== undefined) {
	let i = 0;
	let timerId = setInterval(()=> {
		bingInput.value += keyword[i];
		i++;
		if(i == keyword.length) {
			clearInterval(timerId);
			btnK.click();

		}
	},500)
	} else if (location.hostname == "auto.ru") {
		console.log("Мы на auto.ru");

		setTimeout(()=> {
		let index = getRandom(0, links.length);
		if (getRandom(0, 100) >= 70) {
		location.href = "https://www.bing.com/";
		} else if
			(links[index].href.indexOf("auto.ru") !== -1){
			links[index].click();}
			}, getRandom(2000, 5000))
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
		if(document.querySelector(".sb_pagF").innerText == "5") {
			nextGooglePage = false;
			location.href = "https://www.bing.com/";
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
