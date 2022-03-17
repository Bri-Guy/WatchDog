import Tracker from "./Tracker.js";
import TrackerCard from "./TrackerCard.js";

class App {
  constructor() {
    this._trackerForm = null;
    this._onAdd = this._onAdd.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  setup() {
    this._trackerForm = document.querySelector("#trackerForm");
    this._trackerForm.addEventListener("submit", this._onAdd);
    this._loadTrackers();
  }

  _displayTracker(tracker) {
    /* Make sure we receive a Tracker object. */
    if (!(tracker instanceof Tracker)) throw new Error("displayTracker wasn't passed a Tracker object");

    let elem = new TrackerCard(tracker.title, tracker.url, tracker.actualPrice, tracker.targetPrice);
    elem.addToDOM(document.querySelector("#board"), this._onDelete);
  }

  async _loadTrackers() {
    /* Reset the feed */
    document.querySelector("#board").textContent = "";

    /* Reset tracker form */
    this._trackerForm.querySelector("#trackerTitle").value = "";
    this._trackerForm.querySelector("#trackerURL").value = "";
    this._trackerForm.querySelector("#trackerPrice").value = "";

    let trackers = await Tracker.listTrackers();
    for (let t of trackers) {
      let tracker = await Tracker.load(t);
      this._displayTracker(tracker);
    }
  }

  /*** Event Handlers ***/

  async _onAdd(event) {
    event.preventDefault();
    let title = this._trackerForm.querySelector("#trackerTitle").value;
    let url = this._trackerForm.querySelector("#trackerURL").value;
    let targetPrice = this._trackerForm.querySelector("#trackerPrice").value;
    let error = await Tracker.create(title, url, targetPrice);
    if(error != null) {
      alert(error);
      return;
    }
    await this._loadTrackers();
  }

  async _onDelete(title) {
    await Tracker.delete(title);
    await this._loadTrackers();
  }
}

let app = new App();
app.setup();
