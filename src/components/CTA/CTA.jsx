import Button from "../Button/Button";
import "./CTA.css";

function CTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  background = "green",
}) {
  return (
    <section className={`cta-section cta-${background}`}>
      <div className="cta-container">
        <h2 className="cta-title">{title}</h2>

        {description && <p className="cta-description">{description}</p>}

        <div className="cta-buttons">
          {primaryButton && (
            <Button
              variant={primaryButton.variant || "primary"}
              to={primaryButton.to}
              href={primaryButton.href}
            >
              {primaryButton.text}
            </Button>
          )}

          {secondaryButton && (
            <Button
              variant={secondaryButton.variant || "secondary"}
              to={secondaryButton.to}
              href={secondaryButton.href}
            >
              {secondaryButton.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTA;
