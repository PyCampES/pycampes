import { Link } from "react-router-dom";
import {
  logoPycampWhite,
  iconSocialMail,
  iconSocialTelegram,
  iconSocialTwitter,
  iconSocialGithub,
  iconSocialLinkedin,
} from "../../assets";
import "./Footer.css";

function Footer() {
  const socialLinks = [
    {
      href: "mailto:pycampes@gmail.com",
      icon: iconSocialMail,
      label: "Email",
    },
    {
      href: "https://t.me/pycampes",
      icon: iconSocialTelegram,
      label: "Telegram",
    },
    {
      href: "https://twitter.com/PyCampES",
      icon: iconSocialTwitter,
      label: "Twitter",
    },
    {
      href: "https://github.com/PyCampES",
      icon: iconSocialGithub,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/pycampes/",
      icon: iconSocialLinkedin,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <img
            src={logoPycampWhite}
            alt="PyCamp España"
            className="footer-logo"
          />
          <p className="footer-description">
            Un evento anual de programación Python en un entorno natural único.
            Comunidad, proyectos reales y aprendizaje colaborativo.
          </p>
        </div>

        <div className="footer-links">
          <h3>Enlaces de Interés</h3>
          <ul>
            <li>
              <Link to="/diversity">Código de Conducta</Link>
            </li>
            <li>
              <Link to="/faqs">Preguntas Frecuentes</Link>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Síguenos</h3>
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="social-icon"
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <img src={social.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PyCamp España</p>
      </div>
    </footer>
  );
}

export default Footer;
