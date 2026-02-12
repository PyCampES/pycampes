import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

import iconCalendar from "../../assets/icons/calendar.svg";
import iconMapPin from "../../assets/icons/map-pin.svg";
import iconHome from "../../assets/icons/home.svg";
import iconCroissant from "../../assets/icons/croissant.svg";
import iconTrain from "../../assets/icons/train.svg";
import iconWifi from "../../assets/icons/wifi.svg";
import iconTrees from "../../assets/icons/trees.svg";
import iconPuzzle from "../../assets/icons/puzzle.svg";
import iconClock from "../../assets/icons/clock.svg";
import iconBulb from "../../assets/icons/bulb.svg";

import "./Event.css";

function Event() {
  const ticketForm = "https://docs.google.com/forms/d/e/1FAIpQLSfaFbNcw_qR5wTBJpFFO7cUfDO74YHtdanKnAlTt5gzR1mkmA/viewform";
  const projectsForm = "https://docs.google.com/forms/d/e/1FAIpQLSeLQSNjgXHhYzOzAcdqyun2_7Pfu_ezRKxvr0hD6Uc8lqP0Bg/viewform";

  const ticketIncludes = [
    {
      icon: iconHome,
      title: "Alojamiento 4 días y 3 noches",
    },
    {
      icon: iconCroissant,
      title: "Pensión completa",
      subtitle: "desayuno, comida, merienda y cena",
    },
    {
      icon: iconTrain,
      title: "Transporte ida/vuelta desde punto de encuentro (Sevilla)",
    },
    {
      icon: iconWifi,
      title: "Conexión a internet y espacios cerrados para concentrarse",
    },
    {
      icon: iconTrees,
      title: "Acceso a todos los espacios verdes del recinto",
    },
    {
      icon: iconPuzzle,
      title: "Actividades complementarias",
      subtitle: "juegos de rol y de mesa, basket, ping pong...",
    },
  ];

  const roadmapDays = [
    {
      day: "Día 1",
      title: "Bienvenida y puesta en marcha",
      description:
        "Check-in, presentaciones, formación de equipos de proyecto y desarrollo de ideas.",
      icon: iconClock,
    },
    {
      day: "Día 2-3",
      title: "Desarrollo intensivo y actividades",
      description:
        "Trabajo en proyectos, sesiones de pair programming, talleres técnicos, charlas, juegos...",
      icon: iconClock,
    },
    {
      day: "Día 4",
      title: "Demo day y cierre",
      description:
        "Último empujón a los proyectos, presentaciones, retrospectiva y despedida.",
      icon: iconClock,
    },
  ];

  return (
    <div className="event-page">
      <Navbar />

      <main>
        {/* Intro Section */}
        <section className="event-intro">
          <div className="event-intro-container">
            <h1 className="event-main-title">
              <span className="primary-text">PyCamp</span>
              <span className="highlight-text"> 2026</span>
            </h1>
            <p className="event-subtitle">
              Prepárate para una experiencia inmersiva de programación en la
              naturaleza. 4 días de código, colaboración y comunidad.
            </p>

            <div className="event-info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <img src={iconCalendar} alt="" />
                </div>
                <h3>¿Cuándo?</h3>
                <p className="info-highlight">30 Abril - 3 Mayo 2026</p>
                <p className="info-description">
                  Jueves por la mañana a domingo por la tarde. 4 días intensivos
                  de código y comunidad en un entorno natural.
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <img src={iconMapPin} alt="" />
                </div>
                <h3>¿Dónde?</h3>
                <p className="info-highlight">
                  <a href="https://maps.app.goo.gl/JWkPbEjNnvaJK2DG9" target="_blank" rel="noopener noreferrer">Encinar de Escardiel, Sevilla</a>
                </p>
                <p className="info-description">
                  Alojamiento rural a 1 hora de Sevilla. Un entorno natural
                  privilegiado con todas las comodidades para trabajar y
                  descansar.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              href={ticketForm}
            >
              ¡Reservar ya mi entrada!
            </Button>
          </div>
        </section>

        {/* Ticket Section */}
        <section className="ticket-section">
          <div className="ticket-container">
            <h2 className="section-title">¿Qué incluye la entrada?</h2>
            <p className="section-subtitle">
              Todo lo que necesitas para centrarte en lo importante: programar,
              aprender y conectar con la comunidad.
            </p>

            <div className="ticket-grid">
              {ticketIncludes.map((item, index) => (
                <div key={index} className="ticket-card">
                  <div className="ticket-icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="ticket-content">
                    <h3>{item.title}</h3>
                    {item.subtitle && <p>{item.subtitle}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="price-card">
              <p className="price-label">Precio por persona</p>
              <p className="price-amount">300 €</p>
              <p className="price-note">Plazas limitadas a 30 personas</p>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="roadmap-section">
          <div className="roadmap-container">
            <h2 className="section-title">¿Cómo funciona?</h2>
            <p className="section-subtitle">
              Un formato exitoso que hemos ido perfeccionando durante las
              últimas 4 ediciones y que maximiza el aprendizaje, la colaboración
              y la diversión.
            </p>

            <div className="roadmap-timeline">
              {roadmapDays.map((day, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="timeline-circle"></div>
                    <img src={day.icon} alt="" className="timeline-icon" />
                    {index < roadmapDays.length - 1 && (
                      <div className="timeline-line"></div>
                    )}
                  </div>
                  <div className="timeline-card">
                    <span className="timeline-day">{day.day}</span>
                    <h3>{day.title}</h3>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="roadmap-footer">
              ¿Tienes más preguntas?{" "}
              <Link to="/faqs" className="roadmap-link">
                haz click aquí
              </Link>{" "}
              para saber más.
            </p>
          </div>
        </section>

        {/* Project Idea Section */}
        <section id="project-idea" className="project-idea-section">
          <div className="project-idea-container">
            <div className="idea-icon">
              <img src={iconBulb} alt="" />
            </div>
            <h2 className="section-title">¿Tienes una idea de proyecto?</h2>
            <p className="section-description">
              PyCamp es el lugar perfecto para desarrollar tu idea con ayuda de
              la comunidad. Propón tu proyecto para la próxima edición y
              encuentra colaboradores.
            </p>
            <Button variant="secondary" href={projectsForm}>
              Proponer un proyecto
            </Button>
            <p className="section-note">
              No necesitas tener todo definido. Las mejores ideas evolucionan
              durante el evento.
            </p>
          </div>
        </section>

        <CTA
          title="¿Listo para vivir la experiencia?"
          description={
            <>
              Las plazas son limitadas y se agotan rápidamente.
              <br />
              Reserva tu lugar en el próximo PyCamp hoy.
            </>
          }
          primaryButton={{
            text: "Reservar mi plaza",
            href: ticketForm,
          }}
          secondaryButton={{
            text: "Preguntas Frecuentes",
            to: "/faqs",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Event;
