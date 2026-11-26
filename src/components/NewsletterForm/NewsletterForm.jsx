import { useEffect } from "react";
import { iconMail } from "../../assets";
import "./NewsletterForm.css";

// Sender.net embedded form ("Newsletter").
// The form's fields, texts and the group subscribers join are configured in
// Sender: Forms -> Newsletter.
const SENDER_ACCOUNT_ID = "a3e0f4e0894846";
const SENDER_FORM_ID = "axkPM9";
const SENDER_FORM_EMBED_HASH = "mww7jmd1axkpm90g41y";
const SENDER_SCRIPT_URL =
  "https://cdn.sender.net/accounts_resources/universal.js?explicit=true";

// Load Sender's script once per page load (equivalent to its embed snippet).
// `explicit=true` makes us responsible for rendering the form, which we need
// because this component is mounted and unmounted on client-side navigation.
function loadSender() {
  if (window.sender) {
    return;
  }
  window.Sender = "sender";
  window.sender = function (...args) {
    (window.sender.q = window.sender.q || []).push(args);
  };
  window.sender.l = Date.now();

  const script = document.createElement("script");
  script.async = true;
  script.src = SENDER_SCRIPT_URL;
  document.head.appendChild(script);

  window.sender(SENDER_ACCOUNT_ID);
}

function NewsletterForm() {
  useEffect(() => {
    loadSender();

    const render = () => window.senderForms.render(SENDER_FORM_ID);
    if (window.senderFormsLoaded) {
      render();
    } else {
      window.addEventListener("onSenderFormsLoaded", render, { once: true });
    }

    return () => {
      window.removeEventListener("onSenderFormsLoaded", render);
      window.senderForms?.destroy(SENDER_FORM_ID);
    };
  }, []);

  return (
    <section className="newsletter">
      <div className="newsletter-container">
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

        <div
          className="sender-form-field newsletter-form"
          data-sender-form-id={SENDER_FORM_EMBED_HASH}
        />

        <p className="newsletter-legal">
          Al suscribirte aceptas recibir emails informativos sobre el PyCamp.
          Utilizamos Sender como plataforma de email marketing y puedes darte de
          baja en cualquier momento desde el pie de nuestros emails.
        </p>
      </div>
    </section>
  );
}

export default NewsletterForm;
