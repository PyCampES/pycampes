import "./styles/styles.scss";

import GSheetReader from "g-sheets-api";

const accordionBehavior = () => {
  const accordionLinks = document.getElementsByClassName("faq-link");

  Array.prototype.map.call(accordionLinks, (accordionLink) => {
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

const compactLinks = (value) => {
  return value
    .split(/\s+/)
    .map((item) => {
      if (item.trim().startsWith("http")) {
        return `<a href="${item}">${item
          .split("/")
          .filter((v) => !!v) // Remove empty values
          .pop()}<a>`;
      }
      return item;
    })
    .join(" ");
};

const addProjectTable = () => {
  const options = {
    apiKey: "AIzaSyDVhqZ0tVRSgTPUssxi4Sf52ScuxC0o7XI",
    sheetName: "Form Responses 1",
    sheetId: "1OVEPFwCZpes-re4rClEEnEvY0ak-sZ2jTkZh5GgmxMY",
    returnAllResults: true,
  };
  GSheetReader(options, function(results) {
    for (let row of results.filter(function(row) {
      return row["Autorizo que incluyan estos datos en la web de PyCamp España"]
        .toLowerCase()
        .includes("s");
    })) {
      if (!row["URL del proyecto "]) {
        row["URL del proyecto "] = "#projects";
      }
      document.getElementById("project-rows").innerHTML += `
  <tr>
    <td>
    <a href="${row["URL del proyecto "]}" target="_blank">${
        row["Nombre del proyecto "]
      }</a>
    </td>
    <td>
    ${compactLinks(row["Descripción"])}
    </td>
       <td>
    ${compactLinks(row["Requerimientos "])}
    </td>
    <td>
    ${row["Nivel de conocimiento requerido con skill principal del proyecto"]}
    </td>
  </tr>
  `;
    }
  });
};

accordionBehavior();
addProjectTable();
