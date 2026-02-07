import { Link } from "react-router-dom";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  to,
  href,
  onClick,
  icon,
  type = "button",
}) {
  const className = `btn btn-${variant}`;

  // Button (React Router Link - for internal navigation)
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
        {icon && <span className="btn-icon">{icon}</span>}
      </Link>
    );
  }

  // Button fo external links
  if (href) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {icon && <span className="btn-icon">{icon}</span>}
      </a>
    );
  }

  // Button for actions or forms
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
}

export default Button;
