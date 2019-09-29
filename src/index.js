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

accordionBehavior();
