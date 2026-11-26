import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import NewsletterForm from "../../components/NewsletterForm/NewsletterForm";

import {
  iconHome,
  iconCroissant,
  iconTrain,
  iconWifi,
  iconTrees,
  iconPuzzle,
  iconClock,
} from "../../assets";

import "./Event.css";

function Event() {
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
      title: "Transporte ida/vuelta desde la estación más cercana",
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
        {/* Coming Soon Intro */}
        <section className="event-intro">
          <div className="container event-intro-container">
            <h1 className="event-main-title">
              <span className="primary-text">PyCamp</span>
              <span className="highlight-text"> 2027</span>
            </h1>
            <p className="event-subtitle">
              Estamos planeando la próxima edición. Las fechas, el venue y la
              apertura de entradas se anunciarán próximamente. Suscríbete a
              nuestra newsletter para no perderte ninguna novedad.
            </p>
          </div>
        </section>

        <NewsletterForm />

        {/* Ticket Section (no price card) */}
        <section className="ticket-section">
          <div className="container ticket-container">
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
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="roadmap-section">
          <div className="container roadmap-container">
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
      </main>

      <Footer />
    </div>
  );
}

export default Event;
