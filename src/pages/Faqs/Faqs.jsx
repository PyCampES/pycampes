import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import { iconQuestionCircle } from "../../assets";
import "./Faqs.css";

const FAQ_HASH_PREFIX = "faq-";

function Faqs() {
  const location = useLocation();
  let selectedFaq = 0;
  if (location.hash.startsWith(`#${FAQ_HASH_PREFIX}`)) {
    const parsed = parseInt(
      location.hash.slice(FAQ_HASH_PREFIX.length + 1),
      10
    );
    if (!Number.isNaN(parsed)) {
      selectedFaq = parsed;
    }
  }

  const [openAccordion, setOpenAccordion] = useState(selectedFaq);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué es un PyCamp?",
      answer: (
        <>
          <p>
            El PyCamp consiste en tomar un lugar esilo casa rural y juntarnos
            durante 4 días un grupo de aproximadamente 30 personas a programar y a
            divertirnos.
          </p>
          <p>
            Los asistentes proponen los proyectos open source en los que quieren
            trabajar (o ideas un poco locas que les apetece implementar), y el
            resto se apunta para colaborar. Se acuerdan slots de tiempo para
            cada proyecto a lo largo de los días, y cada persona elige en qué
            slots participa — durante mañana, tarde y, si se anima, también la
            noche.
          </p>
          <p>
            Durante esos 4 días todos desayunamos, comemos, cenamos y dormimos
            en el mismo lugar. Eso elimina las distracciones de la rutina diaria
            y hace que se generen muchísimas conversaciones, colaboraciones y
            amistades en torno al código y a los juegos de mesa, y caminatas.
          </p>
          <p>
            El espíritu es comunitario:{" "}
            <em>
              nadie llega como alumno o como ponente, todos llegamos a programar
              juntos.
            </em>
          </p>
        </>
      ),
    },
    {
      question: "¿Cuándo se celebra el PyCamp?",
      answer: (
        <>
          <p>
            Solo hay dos fechas posibles en el calendario en las que celebramos
            el PyCamp:
          </p>
          <ul>
            <li>
              El fin de semana del puente del{" "}
              <strong>1 de mayo (Día del Trabajador)</strong>.
            </li>
            <li>
              El fin de semana de <strong>Semana Santa</strong>.
            </li>
          </ul>
          <p>
            La razón es la misma que motiva la estructura de 4 días: queremos
            un puente con un día festivo entre semana, de forma que los
            asistentes solo tengan que pedir un día libre en su trabajo para
            venir. Las fechas concretas de cada edición se publican en la
            newsletter y aquí en la web una vez confirmado el venue.
          </p>
        </>
      ),
    },
    {
      question: "¿Cuántas personas asistimos?",
      answer: (
        <p>
          Somos un grupo de aproximadamente 30 personas. Esa cifra no es
          casualidad: es lo suficientemente grande para tener variedad de
          proyectos y perspectivas, y lo suficientemente pequeña para que
          durante los 4 días puedas hablar con todo el mundo. Las plazas son
          limitadas y suelen agotarse rápido.
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
    {
      question: "¿En qué consisten los proyectos?",
      answer: (
        <>
          <p>
            Los proyectos los proponen los propios asistentes en la charla de
            apertura del primer día. Pueden ser issues de un proyecto open
            source, prototipos nuevos, talleres de hardware o electrónica, e
            incluso actividades fuera del ordenador como caminatas o talleres no
            técnicos.
          </p>
          <p>
            Cada propuesta abre un slot que se vota brevemente y se distribuye
            en la pizarra para los días siguientes. Varios proyectos suelen
            ocurrir en paralelo y cada persona se mueve libremente entre los que
            más le interesen.
          </p>
          <p>
            La organización <em>no</em> propone proyectos: la idea es
            que las actividades las traigan los propios asistentes. Vale como
            regla informal que{" "}
            <em>
              "quien propone un proyecto se hace cargo de coordinarlo"
            </em>{" "}
            durante los días del evento.
          </p>
        </>
      ),
    },
    {
      question: "¿Hay Wifi en el venue?",
      answer: (
        <p>
          Sí. La conexión a internet es uno de los requisitos no negociables
          que pedimos al venue, y siempre la testeamos al visitarlo. Si la
          conexión propia del venue es débil, llevamos también nuestra propia
          solución (antena Starlink + router) para garantizar que haya
          cobertura suficiente en los espacios de hack durante todo el evento.
        </p>
      ),
    },
    {
      question: "¿Cómo se gestionan las restricciones alimentarias?",
      answer: (
        <p>
          Pedimos las restricciones alimentarias en el formulario de
          inscripción y se las comunicamos al venue con antelación. Solo
          trabajamos con venues capaces de gestionar vegetarianos, veganos,
          intolerancias y alergias como parte normal del menú. Si
          tienes una alergia seria o un caso especial, contactamos
          directamente con el venue por email para confirmar que pueden
          gestionarla.
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
            {/* <li>
              Sábana (colchón) y sobre sábana: el venue provee almohada y
              manta/cobija pero si prefieres, puedes llevar tus propias cosas
            </li> */}
          </ul>
        </>
      ),
    },
    // {
    //   question: "¿Hay ayuda económica para pagar la entrada?",
    //   answer: (
    //     <p>
    //       Somos conscientes de la importancia de equidad y diversidad en
    //       tecnología. Gracias al apoyo de nuestros patrocinadores podemos
    //       ayudarte con becas.{" "}
    //       <a
    //         href="https://docs.google.com/forms/d/e/1FAIpQLSd9exVI0POXRq2WW3Wc8gzcrGy8F106MNzXLgQc9vVphb7YiA/viewform"
    //         className="scholarship-link"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Aplica a través de este formulario.
    //       </a>
    //     </p>
    //   ),
    // },
    {
      question:
        "¿Hay traslado al venue desde la ciudad principal más cercana? (PyBus)",
      answer: (
        <p>
          Sí. Como los venues están alejados de la ciudad, ofrecemos un servicio
          de autocar privado (PyBus) que traslada a los asistentes desde un
          punto accesible (aeropuerto o estación de tren) cercano al venue, y
          los lleva de vuelta al final del evento. Los detalles concretos del
          horario y punto de salida se publican una vez confirmado el venue de
          cada edición.
        </p>
      ),
    },
    {
      question: "¿Cómo me apunto? ¿Cuándo abren las entradas?",
      answer: (
        <p>
          Cuando se abre la venta lo anunciamos primero al grupo de Telegram de
          asistentes anteriores, después por la newsletter, y finalmente en
          redes sociales (LinkedIn, Twitter/X, Instagram). Si quieres
          asegurarte de no perderte la apertura, suscríbete a nuestra
          newsletter desde la página principal: te avisamos en cuanto salgan
          las entradas.
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
          <div className="container faqs-hero-container">
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
          <div className="container faqs-list-container">
            <div className="faqs-accordion">
              {faqs.map((faq, index) => (
                <article
                  id={`${FAQ_HASH_PREFIX}${index}`}
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
                        src={iconQuestionCircle}
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
          title="¿Aún tienes dudas?"
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
          secondaryButton={{
            text: "Ver eventos pasados",
            to: "/previous-editions",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Faqs;
