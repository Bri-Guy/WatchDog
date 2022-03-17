import apiRequest from "./api.js";
import {scrapePrice} from "./scrape.js";

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const scrapeIt = require('scrape-it');

/* A data model representing a user of the app. */
export default class Tracker {

  /* Returns an array of user IDs */
  static async listTrackers() {
    let data = await apiRequest("GET", "/trackers");
    return data.trackers;
  }

  /* Returns a Tracker object*/
  static async load(title) {
    let data = await apiRequest("GET", `/trackers/${title}`);
    let actualPrice = await scrapePrice(data['url']);
    data['actualPrice'] = actualPrice;
    return new Tracker(data);
  }

  /* Creates a Tracker object*/
  static async create(title, url, targetPrice) {
  	let res = await apiRequest("POST", "/trackers", {title: title, url: url, targetPrice: targetPrice});
  	if(res.error != null) {
  		return res.error;
  	}
  }

  /* Amazon price scraping */
  // static async scrapePrice(url) {
  // 	let html = await scrapeHTML(url);
  // 	let getPrice = await getPrice(html);
  // 	// console.log(url);
  // 	// let res = await scrapeIt("https://www.amazon.com/all-new-fire-tv-stick-4k-with-alexa-voice-remote/dp/B08XVYZ1Y5/ref=sr_1_1?_encoding=UTF8&keywords=fire+tv+stick&m=ATVPDKIKX0DER&pd_rd_r=2ac2697a-ced2-44c1-9f90-1b0683f6e275&pd_rd_w=OcX78&pd_rd_wg=JekEp&pf_rd_p=4e2da077-d3bc-443f-8ade-0b8ad7fcb611&pf_rd_r=WG31K033V629YG05NV5R&qid=1647421499&refinements=p_89%3AAmazon%2Cp_6%3AATVPDKIKX0DER&rnid=303116011&s=electronics&sr=1-1", {
  // 	// 	price: '#corePrice_feature_div .a-offscreen'
  // 	// });
  // 	// return res;
  // }

  /*Deletes a Tracker object*/
  static async delete(title) {
  	await apiRequest("DELETE", `/trackers/${title}`);
  }

  constructor(data) {
    Object.assign(this, data);
  }
}
