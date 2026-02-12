import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import questionIcon from "../../assets/icons/question-circle.svg";
import "./Faqs.css";

function Faqs() {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué es un PyCamp?",
      answer: (
        <p>
          El PyCamp es un evento sin fines de lucro que consiste en apoderarse
          de un lugar (como puede ser una Casa Rural) en el que un grupo de
          programadores (20 a 30 personas) nos juntamos a programar y
          divertirnos durante 4 días completos. Los asistentes proponen los
          proyectos Open Source en los que desean trabajar durante estos días (o
          alguna idea un poco loca que quieran implementar) y el resto se anota
          para colaborar y trabajar en esos proyectos. Así, se determinan
          diferentes slots de tiempo para cada proyecto durante todos los días y
          cada programador trabaja, dentro de los slots asignados, en los
          proyectos que más le han llamado la atención. Esta dinámica se
          mantiene durante los 4 días que dura el evento, trabajando mañana,
          tarde y hasta la noche, si lo desean. Durante los 4 días que dura el
          evento, todos los asistentes desayunan, almuerzan, cenan y duermen en
          el lugar que se haya alquilado. Esto hace que sea un evento sin
          ninguna distracción, que compartamos mucho tiempo en comunidad y
          colaboremos programando en lo que más nos gusta. ¡El PyCamp es un
          evento que genera un ambiente colaborativo y de comunidad hermoso!
        </p>
      ),
    },
    {
      question: "¿Qué llevo?",
      answer: (
        <>
          <p>
            Como ya sabrás, el PyCamp es un evento desestructurado. Lo que
            buscamos es poder aprender muchas cosas que nos gustan, en un
            ambiente relajado y rodeados por amigos de la comunidad.
          </p>
          <p>
            Por eso, puedes llevar lo que quieras que consideres necesario para
            pasarla bien y divertirte. Desde tu ordenador portátil para poder
            trabajar en los proyectos, hasta juegos de mesa para montar una
            partida por las noches, incluyendo instrumentos musicales para
            ponerle un poco de buena onda con música. ¡O incluso una impresora
            3D para tener una sesión de makers! --tú sabes mejor que nosotros
            qué llevar, ¡vamos!
          </p>
          <p>
            Aquí te comentamos lo que creemos mínimo y escencial para poder
            disfrutar del PyCamp España sin problemas.
          </p>
          <p>
            <strong>Para programar:</strong>
          </p>
          <ul>
            <li>
              <strong>Ordenador</strong>: intenta instalar y actualizar las
              dependencias y requisitos de los proyectos en los que quieras
              trabajar antes de venir para no colapsar la wifi del evento
            </li>
            <li>Extensores de corriente</li>
            <li>Adaptadores</li>
          </ul>
          <p>
            <strong>Para las actividades durante el evento:</strong>
          </p>
          <ul>
            <li>
              Ropa cómoda para programar día y noche, en los espacios cerrados,
              como así también en los espacios al aire libre
            </li>
            <li>Calzado cómodo</li>
            <li>
              Productos de higiene personal: toalla, cepillo de dientes, crema
              dental, shampoo y jabón; entre otros
            </li>
            <li>Protector solar</li>
            <li>Repelente de mosquitos</li>
          </ul>
          <p>
            <strong>Al momento de dormir:</strong>
          </p>
          <ul>
            <li>Tapones para oídos</li>
            <li>
              Sábana (colchón) y sobre sábana: el venue provee almohada y
              manta/cobija pero si prefieres, puedes llevar tus propias cosas
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "¿Hay ayuda económica para pagar la entrada?",
      answer: (
        <p>
          Somos conscientes de la importancia de equidad y diversidad en
          tecnología. Gracias al apoyo de nuestros patrocinadores podemos
          ayudarte con becas.{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd9exVI0POXRq2WW3Wc8gzcrGy8F106MNzXLgQc9vVphb7YiA/viewform"
            className="scholarship-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aplica a través de este formulario.
          </a>
        </p>
      ),
    },
    {
      question: "¿A qué público va dirigido?",
      answer: (
        <p>
          El PyCamp es un evento inclusivo donde se potencian las habilidades de
          programación desde la experiencia y práctica real apta para todos los
          niveles de conocimiento. Si bien, en principio, no hay talleres
          propuestos para aprender a programar, con un conocimiento básico de
          programación y Python se puede aprovechar al máximo. ¿Por qué? Porque
          vas a tener la oportunidad de trabajar codo a codo con gente que tiene
          años de experiencia en el tema y poder compartir la resolución de un
          problema en grupo, entender cómo piensan otros programadores y cómo
          atacan el problema de diferentes formas. ¿Crees que no tienes el
          conocimiento suficiente para asistir al evento? ¡No te preocupes,
          súmate que la vas a pasar genial y vas a aprender un montón de cosas!
        </p>
      ),
    },
  ];

  return (
    <div className="faqs">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="faqs-hero">
          <div className="faqs-hero-container">
            <h1 className="faqs-title">
              <span className="title-primary">Preguntas</span>{" "}
              <span className="title-highlight">Frecuentes</span>
            </h1>
            <p className="faqs-description">
              Haz clic en cada pregunta para expandir los detalles.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="faqs-list-section">
          <div className="faqs-list-container">
            <div className="faqs-accordion">
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
                        src={questionIcon}
                        alt=""
                        className="question-icon"
                      />
                      <span>{faq.question}</span>
                    </div>
                    <svg
                      className="chevron-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <polyline
                        points="18 15 12 9 6 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {openAccordion === index && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTA
          title="¿Tienes más preguntas?"
          description={
            <>
              Te animamos a que revises toda la información sobre el próximo
              PyCamp.
              <br />
              También puedes contactar con nosotros por email y seguirnos en
              nuestras redes.
            </>
          }
          primaryButton={{
            text: "Ver próximo PyCamp",
            to: "/event",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Faqs;
