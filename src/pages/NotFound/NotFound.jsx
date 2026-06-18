import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import { iconArrowRight } from "../../assets";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <Navbar />

      <main>
        <section className="not-found-hero">
          <div className="container not-found-container">
            <p className="not-found-code">404</p>
            <h1 className="not-found-title">
              <span className="title-primary">Página</span>{" "}
              <span className="title-highlight">no encontrada</span>
            </h1>
            <p className="not-found-description">
              La página que buscas no existe o se ha movido. Puede que el
              enlace esté roto o que la dirección sea incorrecta.
            </p>
            <div className="not-found-actions">
              <Button
                to="/"
                icon={
                  <img src={iconArrowRight} alt="" width="24" height="24" />
                }
              >
                Volver al inicio
              </Button>
              <Button variant="secondary" to="/faqs">
                Ver preguntas frecuentes
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
