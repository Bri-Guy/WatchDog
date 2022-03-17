// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// import axios from "axios";
// import * as cheerio from 'cheerio';
// import cheerio from "cheerio";

async function scrapePrice(url) {
	// const { data: html } = await axios.get('https://www.amazon.com/dp/B08XVYZ1Y5');
	// url = 'https://www.amazon.com/Anne-Klein-109442CHHY-Gold-Tone-Champagne/dp/B004X4Y9ME/ref=sr_1_1?brr=1&pd_rd_r=89575f21-1e25-4d58-8996-baa3ea8c0951&pd_rd_w=u8LhD&pd_rd_wg=4uubE&pf_rd_p=e728773e-6bba-409c-b2ea-ef5cac1c0edf&pf_rd_r=C5W6R55T697YVSZRHP8G&qid=1647466281&rd=1&s=apparel&sr=1-1';
	let err = null;
	const {data: html} = await axios.get('https://cors-anywhere.herokuapp.com/' + url, {
		headers: {
    		'origin': 'http://localhost:1930/'
    	}
	}).catch(function (error) {
		err = 'Invalid URL';
		return err;
	});

	if(err) {
		return err;
	}

	let parser = new DOMParser();
	const dom = parser.parseFromString(html, 'text/html');
	let dollars = dom.querySelector('.a-price-whole').textContent;
	let cents = dom.querySelector('.a-price-fraction').textContent;
	let price = dollars + cents;
	console.log(price);
	return price;
}

// async function getPrice(html) {
// 	const $ = cheerio.load(html);
// 	// const price = $('#corePrice_feature_div .a-offscreen');
// 	const price = $('.mainPrice .notranslate');
// 	return price.html();
// }

// async function scrapePrice(url) {
// 	let res = await scrapeIt("https://cors-anywhere.herokuapp.com/https://www.amazon.com/all-new-fire-tv-stick-4k-with-alexa-voice-remote/dp/B08XVYZ1Y5/ref=sr_1_1?_encoding=UTF8&keywords=fire+tv+stick&m=ATVPDKIKX0DER&pd_rd_r=2ac2697a-ced2-44c1-9f90-1b0683f6e275&pd_rd_w=OcX78&pd_rd_wg=JekEp&pf_rd_p=4e2da077-d3bc-443f-8ade-0b8ad7fcb611&pf_rd_r=WG31K033V629YG05NV5R&qid=1647421499&refinements=p_89%3AAmazon%2Cp_6%3AATVPDKIKX0DER&rnid=303116011&s=electronics&sr=1-1", {
//   		price: '#corePrice_feature_div .a-offscreen'
//   	});
//   	return res;
// }

export {scrapePrice};