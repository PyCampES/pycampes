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
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    if (!consent) {
      e.preventDefault();
      return;
    }

    setSubmitted(true);
  };

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
            <iframe
              name="ml-hidden-iframe"
              title="newsletter-subscription"
              style={{ display: "none" }}
            />
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

            {!submitted ? (
              <form
                className="newsletter-form"
                action="https://assets.mailerlite.com/jsonp/189141/forms/68861306304726502/subscribe"
                method="post"
                target="ml-hidden-iframe"
                onSubmit={handleSubmit}
              >
                <div className="newsletter-form-row">
                  <input
                    type="email"
                    name="fields[email]"
                    placeholder="tu@email.com"
                    className="newsletter-input"
                    required
                  />
                  <Button type="submit" variant="primary">
                    Suscribirme
                  </Button>
                </div>

                {/*GDPR checkbox */}
                <label className="newsletter-consent">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    Acepto recibir emails informativos sobre el PyCamp.
                    Utilizamos MailerLite como plataforma de email marketing.
                  </span>
                </label>

                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            ) : (
              <div className="newsletter-success">
                <h3>¡Gracias!</h3>
                <p>
                  <strong>Ya estás suscrito a nuestra newsletter.</strong> ¡Te mantendremos al
                  tanto de cualquier novedad sobre el PyCamp!
                </p>
                <p className="newsletter-legal">
                  Si lo deseas, puedes <strong>darte de baja</strong> en cualquier momento
                  haciendo click en el footer de nuestros emails.
                </p>
              </div>
            )}
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
