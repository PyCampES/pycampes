import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import NewsletterForm from "../../components/NewsletterForm/NewsletterForm";

import "./Event.css";

function Event() {
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
      </main>

      <Footer />
    </div>
  );
}

export default Event;
