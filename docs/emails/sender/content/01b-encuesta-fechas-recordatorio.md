---
# Lo que ve quien recibe el email
subject: "⏰ Mañana cerramos la encuesta del PyCamp ${year}"
preheader: "¿Podrías venir del 29 de abril al 2 de mayo? Necesitamos tu respuesta antes del ${dates_survey_deadline}."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "Newsletter"

# Documentación interna (no aparece en el email)
trigger: "Solo en 2027, a mano, el miércoles 9 de diciembre (el día antes de cerrar la encuesta de 01a). Borrar este archivo después de enviarlo."
---

# Último día para responder ⏰

¡Hola! 👋

Hace unos días te contamos que el venue no tiene libre la Semana Santa y que **nuestra propuesta para el PyCamp ${year} es el puente de mayo: del jueves 29 de abril al domingo 2 de mayo, en el Encinar de Escardiel (Sevilla)**. Para venir habría que pedirse el jueves 29 y el viernes 30 en el trabajo.

**Mañana, ${dates_survey_deadline}, cerramos la encuesta** y con las respuestas decidiremos si el PyCamp ${year} se hace en esas fechas. Si todavía no has respondido, es un minuto:

[[Responder la encuesta]](${dates_survey_url})

Si ya respondiste, ¡muchas gracias! Puedes ignorar este email.

¡Nos vemos pronto! 🐍
