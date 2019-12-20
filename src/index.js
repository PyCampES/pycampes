import "./styles/styles.scss";

const accordionBehavior = () => {
  const accordionLinks = document.getElementsByClassName("faq-link");

  Array.prototype.map.call(accordionLinks, accordionLink => {
    const target = accordionLink.getAttribute("data-target");
    accordionLink.onclick = () => {
      const accordionBlock = document.getElementById(target);
      if (accordionBlock.classList.contains("show")) {
        accordionBlock.classList.remove("show");
      } else {
        accordionBlock.classList.add("show");
      }
    };
  });
};

const addMapWithMarker = () => {
  const L = window.L;
  if (!L) {
    return;
  }
  let map = L.map("mapid");
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const target = L.latLng("41.958312", "2.775938");

  // Set map's center to target with zoom 14.
  map.setView(target, 16);

  // Place a marker on the same location.
  L.marker(target).addTo(map);
};

accordionBehavior();
addMapWithMarker();
