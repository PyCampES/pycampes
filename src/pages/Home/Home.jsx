import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import NewsletterForm from "../../components/NewsletterForm/NewsletterForm";
import logoGrey from "../../assets/logos/pycamp-logo-grey.png";
import arrowRight from "../../assets/icons/arrow-right.svg";
import iconCode from "../../assets/icons/code.svg";
import iconTrees from "../../assets/icons/trees.svg";
import iconUsers from "../../assets/icons/users.svg";
import iconBinoculars from "../../assets/icons/binoculars.svg";
import logoPythonEspana from "../../assets/logos/pythonespana-logo.webp";
import logoArgentinaEnPython from "../../assets/logos/argentinaenpython-logo.webp";
import logoEuroPython from "../../assets/logos/europython-society-logo.webp";
import "./Home.css";

const groupPhoto = `${import.meta.env.BASE_URL}images/pycamp-group-photo.jpg`;

function Home() {
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
      url: "https://es.python.org/",
    },
    {
      category: "Colabora",
      name: "Argentina en Python",
      logo: logoArgentinaEnPython,
      url: "https://argentinaenpython.com/",
    },
    {
      category: "Sponsor",
      name: "EuroPython Society",
      logo: logoEuroPython,
      url: "https://www.europython-society.org/",
    },
  ];

  return (
    <div className="home">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container hero-container">
            <div className="hero-content">
              <img src={logoGrey} alt="PyCamp España" className="hero-logo" />
              <p className="hero-description">
                Un evento en un entorno inspirador para disfrutar de unos días
                llenos de programación y diversión al aire libre, conectando con
                buena gente.
              </p>

              <div className="hero-buttons">
                <Button
                  variant="primary"
                  to="/event"
                  icon={<img src={arrowRight} alt="" width="24" height="24" />}
                >
                  Descubre el próximo PyCamp
                </Button>
                <Button variant="secondary" to="/previous-editions">
                  Ver ediciones anteriores
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
          <div className="container about-container">
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

        <NewsletterForm />

        {/* Sponsors Section */}
        <section className="sponsors">
          <div className="container sponsors-container">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-group">
                <h3 className="sponsor-label">{sponsor.category}:</h3>
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                >
                  <img src={sponsor.logo} alt={sponsor.name} />
                </a>
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
