import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <img
            src="../../src/assets/logos/pycamp-logo-grey.png"
            alt="PyCamp España"
            className="hero-logo"
          />
          <p className="hero-description">
            Un evento en un entorno inspirador para disfrutar de unos días
            llenos de programación y diversión al aire libre, conectando con
            buena gente
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">
              Descubre el próximo PyCamp
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="btn btn-secondary">
              Ver proyectos anteriores
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src="../../src/assets/images/pycamp-group-photo.jpg" alt="PyCamp en acción" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
