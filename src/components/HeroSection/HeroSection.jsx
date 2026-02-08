import Button from "../Button/Button";
import logoGrey from "../../assets/logos/pycamp-logo-grey.png";
import groupPhoto from "../../assets/images/pycamp-group-photo.jpg";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <img src={logoGrey} alt="PyCamp España" className="hero-logo" />
          <p className="hero-description">
            Un evento en un entorno inspirador para disfrutar de unos días
            llenos de programación y diversión al aire libre, conectando con
            buena gente
          </p>

           <div className="hero-buttons">
            <Button 
              variant="primary" 
              to="/event"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              }
            >
              Descubre el próximo PyCamp
            </Button>
            <Button variant="secondary" to="/previous-editions">
              Ver proyectos anteriores
            </Button>
          </div>
        </div>

        <div className="hero-image">
          <img src={groupPhoto} alt="PyCamp en acción" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
