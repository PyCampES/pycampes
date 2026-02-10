import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./PreviousEditions.css";

function PreviousEditions() {
  const editions = [
    { year: "2025", photos: null },
    { year: "2024", photos: null },
    { year: "2023", photos: null },
    { year: "2022", photos: null },
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
              Descubre los proyectos que han nacido en PyCamp en ediciones
              pasadas
            </p>
            <h2 className="editions-subtitle">
              Momentos de ediciones anteriores
            </h2>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="photo-gallery">
          <div className="photo-gallery-container">
            {editions.map((edition, index) => (
              <article key={index} className="photo-card">
                <div className="photo-placeholder">
                  <svg
                    width="66"
                    height="66"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="13"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="photo-label">Fotos {edition.year}</p>
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                    aria-label={`Abrir ${project.name} en nueva pestaña`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
