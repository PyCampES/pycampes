import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
            El PyCamp consiste en tomar un lugar estilo casa rural y juntarnos
            durante 4 días un grupo de aproximadamente 30 personas a programar y
            a divertirnos.
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
            amistades en torno al código, los juegos de mesa y las caminatas.
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
            La razón es la misma que motiva la estructura de 4 días: buscamos un
            puente con algún día festivo, de forma que los asistentes tengan que
            pedir el menor número posible de días libres en su trabajo para
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
          súmate, que lo vas a pasar genial y vas a aprender un montón de cosas!
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
            Después de las presentaciones, cada persona vota en qué proyectos
            quiere participar (como máximo 2 o 3, para no repartirse tanto que
            no se aporte en ninguno) y, con esos votos, se reparten los slots en
            la pizarra para los días siguientes. Varios proyectos suelen ocurrir
            en paralelo y cada persona se mueve libremente entre los que más le
            interesen. Si un proyecto recibe muy pocos votos, no ocupa un slot
            oficial, pero quienes estén interesados pueden juntarse a charlarlo
            en cualquier momento.
          </p>
          <p>
            La organización <em>no</em> propone proyectos: la idea es que las
            actividades las traigan los propios asistentes. Vale como regla
            informal que{" "}
            <em>"quien propone un proyecto se hace cargo de coordinarlo"</em>{" "}
            durante los días del evento.
          </p>
          <p>
            Al cierre del evento cada grupo muestra al resto lo que hizo, y con
            una votación anónima elegimos el mejor proyecto de la edición, que
            publicamos aquí en la web. Para participar, el proyecto tiene que
            estar subido a la organización de PyCamp España en GitHub.
          </p>
        </>
      ),
    },
    {
      question: "¿Cómo es un día en el PyCamp?",
      answer: (
        <>
          <p>
            Llegamos a primera hora de la mañana del primer día y nos vamos a
            media tarde del último. Un día típico se organiza más o menos así:
          </p>
          <ul>
            <li>
              <strong>08:00 – 10:00</strong>: desayuno, cada persona a su ritmo.
            </li>
            <li>
              <strong>10:00 – 13:00</strong>: hack en los proyectos.
            </li>
            <li>
              <strong>13:00 – 14:30</strong>: comida.
            </li>
            <li>
              <strong>14:30 – 21:00</strong>: hack en bloques largos, con
              descansos para el coffee break.
            </li>
            <li>
              <strong>21:00 – 22:00</strong>: cena.
            </li>
            <li>
              <strong>22:00 – …</strong>: juegos de mesa, karaoke de charlas,
              sobremesas largas y hack nocturno para quien tenga energía.
            </li>
          </ul>
          <p>
            No es obligatorio estar en todo: cada persona elige en qué slots
            participa y cuándo prefiere descansar, salir a caminar o charlar.
          </p>
        </>
      ),
    },
    {
      question: "¿Hay Wifi en el venue?",
      answer: (
        <p>
          Sí. La conexión a internet es uno de los requisitos no negociables que
          pedimos al venue, y siempre la testeamos al visitarlo. Si la conexión
          propia del venue es débil, llevamos también nuestra propia solución
          (antena Starlink + router) para tener buena cobertura en los espacios
          de hack durante todo el evento.
        </p>
      ),
    },
    {
      question: "¿Cómo se gestionan las restricciones alimentarias?",
      answer: (
        <p>
          Pedimos las restricciones alimentarias en el formulario de inscripción
          y se las comunicamos al venue con antelación. Solo trabajamos con
          venues capaces de gestionar vegetarianos, veganos, intolerancias y
          alergias como parte normal del menú. Si tienes una alergia seria o un
          caso especial, contactamos directamente con el venue por email para
          confirmar que pueden gestionarla.
        </p>
      ),
    },
    {
      question: "¿Cómo son las habitaciones?",
      answer: (
        <p>
          Dormimos todos en el venue, en habitaciones compartidas con otras
          personas asistentes. La organización reparte las habitaciones antes
          del evento y en la puerta de cada una ponemos un cartel con quiénes
          duermen ahí. Si roncas, o necesitas dormir en un sitio tranquilo,
          avísanos y lo tenemos en cuenta al repartirlas. En cualquier caso, te
          recomendamos traer tapones para los oídos.
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
            Por eso, puedes llevar lo que consideres necesario para pasarlo bien
            y divertirte. Desde tu ordenador portátil para poder trabajar en los
            proyectos, hasta juegos de mesa para montar una partida por las
            noches, incluyendo instrumentos musicales para animar el ambiente
            con música. ¡O incluso una impresora 3D para tener una sesión de
            makers! Tú sabes mejor que nosotros qué llevar.
          </p>
          <p>
            Aquí te comentamos lo que creemos mínimo y esencial para poder
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
            <li>
              Si te apetece, algo de beber para las noches (cervezas, vino o lo
              que te guste tomar) para compartir mientras jugamos y charlamos
            </li>
          </ul>
          <p>
            <strong>Al momento de dormir:</strong>
          </p>
          <ul>
            <li>Tapones para oídos</li>
          </ul>
          <p>
            Lo que pone el venue (ropa de cama, manta, almohada, toallas) cambia
            según el lugar; te lo confirmamos por email unos días antes del
            evento.
          </p>
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
        <>
          <p>
            Sí. Como los venues están alejados de la ciudad, ofrecemos un
            servicio de autocar privado (PyBus), incluido en la entrada, que
            traslada a los asistentes desde un punto accesible (aeropuerto o
            estación de tren) cercano al venue, y los lleva de vuelta al final
            del evento. Los detalles concretos del horario y punto de salida se
            publican una vez confirmado el venue de cada edición.
          </p>
          <p>
            También puedes llegar por tus propios medios. Si el PyBus no te
            encaja (por horario o porque vienes desde otra zona), en el grupo de
            Telegram de asistentes puedes organizarte con otras personas para
            compartir coche.
          </p>
        </>
      ),
    },
    {
      question: "¿Qué incluye la entrada?",
      answer: (
        <p>
          La entrada incluye el alojamiento durante los 4 días y 3 noches,
          pensión completa (desayuno, comida, merienda y cena), el PyBus de ida
          y vuelta, la conexión a internet y el uso de todos los espacios del
          venue. El precio y el detalle de cada edición están en la página del{" "}
          <Link to="/event">próximo PyCamp</Link>.
        </p>
      ),
    },
    {
      question: "¿Cómo me apunto? ¿Cuándo abren las entradas?",
      answer: (
        <>
          <p>
            Cuando se abre la venta, primero hay una preventa para quienes
            vinieron a ediciones anteriores (por email y en el grupo de Telegram
            de asistentes). Unos días después la anunciamos a toda la newsletter
            y, por último, en redes sociales (LinkedIn, Twitter/X, Instagram).
            Si quieres asegurarte de no perderte la apertura, suscríbete a
            nuestra newsletter desde la página principal: te avisamos en cuanto
            salgan las entradas.
          </p>
          <p>
            Para apuntarte, rellenas el formulario de inscripción y te enviamos
            por email un código personal para comprar tu entrada. Tienes{" "}
            <strong>7 días</strong> para pagarla; si no, la plaza se libera para
            otra persona.
          </p>
        </>
      ),
    },
    {
      question: "¿Hay código de conducta?",
      answer: (
        <p>
          Sí. Todas las personas que participan en el PyCamp aceptan nuestro{" "}
          <Link to="/diversity">código de conducta</Link>. Lo repasamos en la
          charla de bienvenida del primer día, donde también te contamos cómo
          contactar con la organización si necesitas ayuda durante el evento.
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
