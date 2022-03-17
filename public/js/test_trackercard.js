import TrackerCard from "./TrackerCard.js";

class App {
	constructor() {
		this._tracker = new TrackerCard();
	}

	setup() {
		this._tracker.setCard("Pog", "ok", "$5.00", "$6.00");
		this._tracker.addToDOM(document.querySelector("#board"), this._onDelete);
	}

	_onDelete() {
		alert('Deleted');
	}
}

let app = new App();
app.setup();