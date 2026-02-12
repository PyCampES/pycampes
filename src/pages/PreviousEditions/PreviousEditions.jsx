import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import cameraIcon from "../../assets/icons/camera.svg";
import externalLinkIcon from "../../assets/icons/external-link.svg";
import mapPinIcon from "../../assets/icons/map-pin.svg";
import githubIcon from "../../assets/icons/project-github.svg";
import arrowBrown from "../../assets/icons/arrow-right-brown.svg";
import photo2025 from "../../assets/images/pycamp-cover-2025.webp";
import photo2024 from "../../assets/images/pycamp-cover-2024.webp";
import photo2023 from "../../assets/images/pycamp-cover-2023.webp";
import photo2022 from "../../assets/images/pycamp-cover-2022.webp";
import "./PreviousEditions.css";

function PreviousEditions() {
  const editions = [
    {
      year: "2025",
      photos: photo2025,
      link: "https://photos.app.goo.gl/Lw2M76V2bzYMZoFt6",
      location: "Encinares de Escardiel - Castilblanco de los Arroyos, Sevilla",
    },
    {
      year: "2024",
      photos: photo2024,
      link: "https://photos.app.goo.gl/gPYLUEzDAokZ4PrQA",
      location: "Casa de Colonias Aiguaviva - Guixers, Lleida",
    },
    {
      year: "2023",
      photos: photo2023,
      link: "https://photos.app.goo.gl/zmtyihL3B3KaBtpF9",
      location: "El Bosc de la Massana - Vilablareix, Girona",
    },
    {
      year: "2022",
      photos: photo2022,
      link: "https://photos.app.goo.gl/GSeufqbsjHvXLJxZA",
      location: "El Bosc de la Massana - Vilablareix, Girona",
    },
  ];

  const projects = [
    {
      name: "nombre-proyecto",
      title: "Título del proyecto",
      description: "Proyecto de ejemplo que sirve para estas cosas",
      github: "https://github.com/EJEMPLO",
    },
    {
      name: "nombre-proyecto",
      title: "Título del proyecto",
      description: "Proyecto de ejemplo que sirve para estas cosas",
      github: "https://github.com/EJEMPLO",
    },
    {
      name: "nombre-proyecto",
      title: "Título del proyecto",
      description: "Proyecto de ejemplo que sirve para estas cosas",
      github: "https://github.com/EJEMPLO",
    },
    {
      name: "nombre-proyecto",
      title: "Título del proyecto",
      description: "Proyecto de ejemplo que sirve para estas cosas",
      github: "https://github.com/EJEMPLO",
    },
    {
      name: "nombre-proyecto",
      title: "Título del proyecto",
      description: "Proyecto de ejemplo que sirve para estas cosas",
      github: "https://github.com/EJEMPLO",
    },
    {
      name: "nombre-proyecto",
      title: "Título del proyecto",
      description: "Proyecto de ejemplo que sirve para estas cosas",
      github: "https://github.com/EJEMPLO",
    },
  ];

  return (
    <div className="previous-editions">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="editions-hero">
          <div className="editions-hero-container">
            <h1 className="editions-title">
              <span className="title-primary">Ediciones</span>{" "}
              <span className="title-highlight">Anteriores</span>
            </h1>
            <p className="editions-description">
              Descubre todo lo que vivimos en ediciones pasadas
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="photo-gallery">
          <h2 className="editions-subtitle">Momentos de PyCamps anteriores</h2>
          <div className="photo-gallery-container">
            {editions.map((edition, index) => (
              <article key={index} className="photo-card">
                <div className="photo-placeholder">
                  {edition.photos ? (
                    <img src={edition.photos} alt={`PyCamp ${edition.year}`} />
                  ) : (
                    <img src={cameraIcon} alt="" className="placeholder-icon" />
                  )}
                </div>

                <a
                  href={edition.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="photo-label"
                >
                  <span>Fotos {edition.year}</span>
                  <img
                    src={externalLinkIcon}
                    alt=""
                    className="external-icon"
                  />
                </a>

                <div className="photo-location">
                  <img src={mapPinIcon} alt="" className="map-icon" />
                  <span>{edition.location}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects">
          <div className="projects-container">
            <h2 className="projects-title">Proyectos de la comunidad</h2>
            <p className="projects-description">
              Proyectos propuestos por los participantes y desarrollados en
              equipo durante las ediciones de PyCamp. ¡se aceptan
              contribuciones!
            </p>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <article key={index} className="project-card">
                  <div className="project-icon">
                    <img src={githubIcon} alt="" />
                  </div>

                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-description">{project.description}</p>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <span>Ver en Github</span>
                    <img src={arrowBrown} alt="" />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                    aria-label={`Abrir ${project.name} en nueva pestaña`}
                  >
                    <img src={externalLinkIcon} alt="" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PreviousEditions;
