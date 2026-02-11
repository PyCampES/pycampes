import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import heartIcon from "../../assets/icons/heart.svg";
import usersIcon from "../../assets/icons/users-group.svg";
import shieldIcon from "../../assets/icons/shield.svg";
import messageIcon from "../../assets/icons/message.svg";
import checkCircleIcon from "../../assets/icons/check-circle.svg";
import dangerTriangleIcon from "../../assets/icons/danger-triangle.svg";
import chevronUpIcon from "../../assets/icons/chevron-up.svg";
import mailIcon from "../../assets/icons/mail.svg";
import externalLinkIcon from "../../assets/icons/external-link-g.svg";
import "./Diversity.css";

function Diversity() {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const coreValues = [
    {
      title: "Respeto Mutuo",
      description:
        "Trata a todos con dignidad y consideración, independientemente de su origen o experiencia.",
      icon: heartIcon,
    },
    {
      title: "Inclusión",
      description:
        "Creamos un espacio seguro para personas de todos los géneros, orientaciones, etnias y habilidades.",
      icon: usersIcon,
    },
    {
      title: "Profesionalismo",
      description:
        "Mantén un ambiente apropiado para una audiencia diversa y profesional.",
      icon: shieldIcon,
    },
    {
      title: "Comunicación amable",
      description:
        "Evita insultos, desprecio o cualquier forma de acoso hacia otros participantes.",
      icon: messageIcon,
    },
  ];

  const shortVersion = [
    "Proveer una experiencia libre de acoso o discriminación para todos, sin distinciones de género, orientación sexual, invalidez, aspecto físico, tamaño corporal, etnia, o religión.",
    "El contenido debe ser apropiado para una audiencia profesional. Las temáticas y contenidos sexuales no son apropiados.",
    "Ser amable con los demás. Los chistes discriminatorios, sexistas, racistas o de acoso no son apropiados.",
    "Los asistentes que violen estas normas podrán ser expulsados sin derecho a reembolso.",
  ];

  const faqs = [
    {
      question: "¿Qué se considera acoso?",
      answer:
        "Acoso incluye comentarios ofensivos relativos a género, orientación sexual, invalidez, aspecto físico, tamaño corporal, etnia, religión, pornografía en espacios públicos, intimidación deliberada, acecho, persecución, acoso por fotografías o grabaciones, constante interrupción de charlas u otros eventos, contacto físico impropio y el acoso sexual.",
    },
    {
      question: "¿Qué pasa si alguien es apercibido por acoso?",
      answer:
        "Los participantes que sean apercibidos por acoso deberán abstenerse inmediatamente. No hay tolerancia para este tipo de comportamientos.",
    },
    {
      question: "¿Cómo debo comunicarme?",
      answer:
        "Sé cuidadoso al seleccionar las palabras. Recuerda que los chistes sexistas, racistas y de otras clases pueden ser ofensivos para los demás. El exceso de malas palabras o chistes ofensivos no son apropiados para PyCamp.",
    },
    {
      question: "¿Cuáles son las consecuencias de violar el Código?",
      answer:
        "Si un participante se comportara de forma que violase el Código de Conducta, los organizadores de la conferencia podrían tomar las medidas que ellos consideren adecuadas, incluyendo el apercibimiento o expulsión de la conferencia, sin derecho a reembolso.",
    },
  ];

  return (
    <div className="diversity">
      <Navbar />

      <main>
        {/* Hero / Intro Section */}
        <section className="diversity-hero">
          <div className="diversity-hero-container">
            <h1 className="diversity-title">
              <span className="title-primary">Código de</span>{" "}
              <span className="title-highlight">Conducta</span>
            </h1>
            <p className="diversity-description">
              PyCamp es un evento de la comunidad que busca mejorar la
              comunicación y colaboración entre los desarrolladores.
            </p>

            <h2 className="values-title">Nuestros valores fundamentales</h2>
            <p className="values-description">
              Queremos que todos los asistentes tengan una experiencia agradable
              y satisfactoria.
              <br />
              Estos son los principios que guían nuestra comunidad.
            </p>

            <div className="values-grid">
              {coreValues.map((value, index) => (
                <article key={index} className="value-card">
                  <div className="value-icon">
                    <img src={value.icon} alt="" />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Short Version Section */}
        <section className="short-version">
          <div className="short-version-container">
            <h2 className="section-title">La versión corta</h2>

            <div className="short-version-list">
              {shortVersion.map((item, index) => (
                <article key={index} className="short-version-item">
                  <div className="check-icon">
                    <img src={checkCircleIcon} alt="" />
                  </div>
                  <p>{item}</p>
                </article>
              ))}
            </div>

            <p className="thank-you-message">
              ✨ Gracias por hacer de este un evento abierto a la comunidad y
              amistoso.
            </p>
          </div>
        </section>

        {/* Long Version / FAQ Section */}
        <section className="long-version">
          <div className="long-version-container">
            <h2 className="section-title">La versión larga</h2>
            <p className="section-description">
              Haz clic en cada pregunta para expandir los detalles.
            </p>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <article
                  key={index}
                  className={`faq-item ${openAccordion === index ? "active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={openAccordion === index}
                  >
                    <div className="faq-question-content">
                      <img
                        src={dangerTriangleIcon}
                        alt=""
                        className="warning-icon"
                      />
                      <span>{faq.question}</span>
                    </div>
                    <img src={chevronUpIcon} alt="" className="chevron-icon" />
                  </button>

                  {openAccordion === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Report Section */}
        <section className="report-section">
          <div className="report-container">
            <div className="report-icon">
              <img src={mailIcon} alt="" />
            </div>

            <h2 className="report-title">¿Necesitas reportar algo?</h2>
            <p className="report-description">
              Si eres objeto de acoso, notas que alguien más está siendo
              acosado, o tienes cualquier otra reclamación, por favor contáctate
              con uno de los organizadores del evento.
            </p>

            <a
              href="mailto:pycampes@gmail.com"
              className="report-email"
              aria-label="Enviar email a pycampes@gmail.com"
            >
              <img src={mailIcon} alt="" />
              <span>pycampes@gmail.com</span>
            </a>

            <p className="report-reference">
              PyCamp España ha decidido utilizar el{" "}
              <a
                href="https://ac.python.org.ar/diversidad/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="code-link"
              >
                código de conducta de Python Argentina
                <img src={externalLinkIcon} alt="" />
              </a>
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="diversity-cta">
          <div className="diversity-cta-container">
            <h2 className="cta-title">¿Tienes más preguntas?</h2>
            <p className="cta-description">
              Te animamos a que revises toda la información sobre el próximo
              PyCamp y nuestro apartado de FAQs. También puedes contactar con
              nosotros por email y seguirnos en nuestras redes.
            </p>

            <div className="cta-buttons">
              <Button variant="primary" to="/event">
                Ver próximo PyCamp
              </Button>
              <Button variant="secondary" to="/faqs">
                Preguntas Frecuentes
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Diversity;
