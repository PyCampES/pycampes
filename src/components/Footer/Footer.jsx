import { Link } from "react-router-dom";
import logoWhite from "../../assets/logos/pycamp-logo-white.webp";
import mailIcon from "../../assets/icons/social-mail.svg";
import telegramIcon from "../../assets/icons/social-telegram.svg";
import twitterIcon from "../../assets/icons/social-twitter.svg";
import githubIcon from "../../assets/icons/social-github.svg";
import linkedinIcon from "../../assets/icons/social-linkedin.svg";
import "./Footer.css";

function Footer() {
  const socialLinks = [
    {
      href: "mailto:pycampes@gmail.com",
      icon: mailIcon,
      label: "Email",
    },
    {
      href: "https://t.me/pycampes",
      icon: telegramIcon,
      label: "Telegram",
    },
    {
      href: "https://twitter.com/PyCampES",
      icon: twitterIcon,
      label: "Twitter",
    },
    {
      href: "https://github.com/PyCampES",
      icon: githubIcon,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/pycampes/",
      icon: linkedinIcon,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logoWhite} alt="PyCamp España" className="footer-logo" />
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
        <p>© 2026 PyCamp España</p>
      </div>
    </footer>
  );
}

export default Footer;
