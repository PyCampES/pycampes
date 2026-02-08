import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import logoGrey from "../../assets/logos/pycamp-logo-grey.png";
import groupPhoto from "../../assets/images/pycamp-group-photo.jpg";
import iconCode from "../../assets/icons/code.svg";
import iconTrees from "../../assets/icons/trees.svg";
import iconUsers from "../../assets/icons/users.svg";
import iconBinoculars from "../../assets/icons/binoculars.svg";
import logoPythonEspana from "../../assets/logos/pythonespana-logo.webp";
import logoArgentinaEnPython from "../../assets/logos/argentinaenpython-logo.webp";
import logoEuroPython from "../../assets/logos/europython-society-logo.webp";
import "./Home.css";

function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email enviado:", email);
  };
//TODO: revisar cómo se manda ese email del user que se quiere suscribir. Añadir alerta de enviado.

  const features = [
    {
      icon: iconCode,
      title: "Proyectos Reales",
      description:
        "Trabaja en proyectos de código abierto con impacto real en la comunidad Python.",
    },
    {
      icon: iconTrees,
      title: "Entorno Único",
      description:
        "Alojamiento en un espacio diseñado para fomentar la creatividad y colaboración.",
    },
    {
      icon: iconUsers,
      title: "Comunidad",
      description:
        "Conecta con gente experta y apasionada de España, Europa y el mundo.",
    },
    {
      icon: iconBinoculars,
      title: "Temas Diversos",
      description:
        "Participa en debates sobre temas de ética, sociedad y el futuro de la industria.",
    },
  ];

  const sponsors = [
    {
      category: "Organiza",
      name: "Python España",
      logo: logoPythonEspana,
    },
    {
      category: "Colabora",
      name: "Argentina en Python",
      logo: logoArgentinaEnPython,
    },
    {
      category: "Sponsor",
      name: "EuroPython Society",
      logo: logoEuroPython,
    },
  ];

  return (
    <div className="home">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <img
                src={logoGrey}
                alt="PyCamp España"
                className="hero-logo"
              />
              <p className="hero-description">
                Un evento en un entorno inspirador para disfrutar de unos días
                llenos de programación y diversión al aire libre, conectando con
                buena gente.
              </p>

              <div className="hero-buttons">
                <Button
                  variant="primary"
                  to="/event"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
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

        {/* About Section */}
        <section className="about">
          <div className="about-container">
            <h2 className="about-title">
              ¿Qué es el <span className="highlight">PyCamp</span>?
            </h2>
            <p className="about-subtitle">
              Más que un evento de programación, es una experiencia que combina
              desarrollo de software, naturaleza y comunidad.
            </p>

            <div className="features-grid">
              {features.map((feature, index) => (
                <article key={index} className="feature-card">
                  <div className="feature-icon">
                    <img src={feature.icon} alt="" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter">
          <div className="newsletter-container">
            <div className="newsletter-icon">
              <svg width="43" height="43" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h2 className="newsletter-title">Únete a nuestra comunidad</h2>
            <p className="newsletter-description">
              Suscríbete a nuestra newsletter para recibir noticias sobre el
              próximo PyCamp,
              <br />
              ¡te avisaremos cuando salgan las próximas entradas!
            </p>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="tu@email.com"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary">
                Suscribirme
              </Button>
            </form>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="sponsors">
          <div className="sponsors-container">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-group">
                <h3 className="sponsor-label">{sponsor.category}:</h3>
                <img src={sponsor.logo} alt={sponsor.name} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
