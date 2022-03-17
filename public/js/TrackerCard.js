/* A DOM component that represents a tracker card created by the user, which displays a given Amazon item's current price, URL, and user-generated title.
*/
export default class TrackerCard {

  constructor(title, url, actualPrice, targetPrice) {
    this.title = title;
    this.url = url;
    this.actualPrice = actualPrice;
    this.targetPrice = targetPrice;
    this._elem = this._createElement();
    this._onDelete = this._onDelete.bind(this);
    this.onDelete = null;
  }

  addToDOM(parent, onDelete) {
    this.onDelete = onDelete;
    this._elem = this._createElement();
    parent.append(this._elem);
  }

  _createElement() {
    let container = document.createElement("div");
    container.classList.add("trackerCard");
    container.classList.add("paper");

    let title = document.createElement("h1");
    title.textContent = this.title;
    title.classList.add("title");
    container.append(title);

    let url = document.createElement("p");
    url.textContent = this.url;
    container.append(url);

    let actualPrice = document.createElement("p");
    actualPrice.textContent = this.actualPrice;
    container.append(actualPrice);

    let targetPrice = document.createElement("p");
    targetPrice.textContent = "Target: " + this.targetPrice;
    container.append(targetPrice);

    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("deleteButton");
    /* Set this attribute to make the button readable with assistive technology. */
    button.setAttribute("aria-label", `Remove ${this.title}`);
    button.textContent = "\u00d7"; /* The "times" character */
    button.addEventListener("click", this._onDelete);
    container.append(button);

    return container;
  }

  _onDelete(event) {
    let item = event.currentTarget.closest(".trackerCard");
    let title = item.querySelector(".title").textContent;
    this.onDelete(title);
    item.remove();
  }
}
