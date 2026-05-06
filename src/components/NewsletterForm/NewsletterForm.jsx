import { useState } from "react";
import Button from "../Button/Button";
import { iconMail } from "../../assets";
import "./NewsletterForm.css";

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      return;
    }

    const formData = new FormData(e.target);
    const response = await fetch(e.target.action, {
      method: e.target.method,
      body: new URLSearchParams(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });

    if (!response.ok) {
      return;
    }

    const result = await response.json();

    if (result?.success) {
      setSubmitted(true);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <iframe
          name="ml-hidden-iframe"
          title="newsletter-subscription"
          style={{ display: "none" }}
        />
        <div className="newsletter-icon">
          <img src={iconMail} alt="" />
        </div>

        <h2 className="newsletter-title">Únete a nuestra comunidad</h2>
        <p className="newsletter-description">
          Suscríbete a nuestra newsletter para recibir noticias sobre el próximo
          PyCamp,
          <br />
          ¡te avisaremos cuando salgan las próximas entradas!
        </p>

        {!submitted ? (
          <form
            className="newsletter-form"
            action="https://assets.mailerlite.com/jsonp/189141/forms/178924638060939050/subscribe"
            data-code=""
            method="post"
            target="ml-hidden-iframe"
            onSubmit={handleSubmit}
          >
            <div className="newsletter-form-row">
              <input
                type="email"
                name="fields[email]"
                placeholder="tu@email.com"
                data-inputmask=""
                className="newsletter-input"
                required
              />
              <Button type="submit" variant="primary">
                Suscribirme
              </Button>
            </div>

            {/* GDPR checkbox */}
            <label className="newsletter-consent">
              <input
                type="checkbox"
                name="gdpr[]"
                value="Email"
                xp-if="gdpr.title"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span xp-if="gdpr.description">
                Acepto recibir emails informativos sobre el PyCamp. Utilizamos
                MailerLite como plataforma de email marketing.
              </span>
            </label>

            <input type="hidden" name="ml-submit" value="1" />
            <input type="hidden" name="anticsrf" value="true" />
          </form>
        ) : (
          <div className="newsletter-success">
            <h3>¡Gracias!</h3>
            <p>
              <strong>Ya estás suscrito a nuestra newsletter.</strong> ¡Te
              mantendremos al tanto de cualquier novedad sobre el PyCamp!
            </p>
            <p className="newsletter-legal">
              Si lo deseas, puedes <strong>darte de baja</strong> en cualquier
              momento haciendo click en el footer de nuestros emails.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsletterForm;
