import "./styles/styles.scss";

import GSheetReader from "g-sheets-api";

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

const compactLinks = value => {
  return value
    .split(/\s+/)
    .map(item => {
      if (item.trim().startsWith("http")) {
        return `<a href="${item}">${item
          .split("/")
          .filter(v => !!v) // Remove empty values
          .pop()}<a>`;
      }
      return item;
    })
    .join(" ");
};

const addProjectTable = () => {
  const options = {
    sheetId: "1H0dZ-NaYcgTyVwL3GK1cWE3pSH2R4hcsYdnSF9QIhmA",
    returnAllResults: true
  };
  GSheetReader(options, function(results) {
    for (let row of results.filter(function(row) {
      return row["autorizo que incluyan estos datos en la web de pycamp españa"]
        .toLowerCase()
        .includes("s");
    })) {
      document.getElementById("project-rows").innerHTML += `
  <tr>
    <td>
    ${row["nombre del proyecto "]}
    </td>
    <td>
    ${compactLinks(row["descripción"])}
    </td>
       <td>
    ${compactLinks(row["requerimientos "])}
    </td>
    <td>
    ${row["nivel de conocimiento requerido con skill principal del proyecto"]}
    </td>
  </tr>
  `;
    }
  });
};

accordionBehavior();
addMapWithMarker();
addProjectTable();
