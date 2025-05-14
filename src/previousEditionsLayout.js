/**
 * This file exists because of a bug in parcel.
 * Right now each different html file must point to
 * a different js.
 */
import "./index";

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", function() {
    document
      .querySelectorAll(".tab")
      .forEach(t => t.classList.remove("active"));
    document
      .querySelectorAll(".container")
      .forEach(c => c.classList.remove("active"));

    this.classList.add("active");
    document
      .getElementById("year-" + this.dataset.year)
      .classList.add("active");
  });
});
