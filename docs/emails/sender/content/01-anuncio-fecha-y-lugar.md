---
# Lo que ve quien recibe el email
subject: "🏕️ ¡Ya tenemos fecha y lugar para el PyCamp ${year}!"
preheader: "Reserva estos días en tu calendario: te contamos todos los detalles."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "Newsletter"

# Documentación interna (no aparece en el email)
trigger: "Una sola vez, a mano, al confirmar la fecha y el lugar con el venue"
---

# ¡El PyCamp ${year} ya se siente! 🏕️

¡Hola! 👋

Tenemos muchas ganas de contarte esto: **ya tenemos fecha y lugar confirmados para la ${edition} edición del PyCamp España**.

- 📅 Fechas: **${dates}**
- 🏡 Lugar: **${venue}**
- 🌐 Web: [pycamp.es](https://pycamp.es)

Reserva estos días en tu calendario desde ya: son cuatro días de programar en proyectos open source, aprender con gente apasionada y desconectar en plena naturaleza.

<!-- if registration_form_url -->

**La inscripción ya está abierta.** Las plazas son limitadas, así que no lo dejes para el último momento:

[[Inscribirme]](${registration_form_url})

<!-- else -->

**Muy pronto abriremos la inscripción**, y te avisaremos por este mismo medio. Las plazas son limitadas, así que estate atento/a a tu bandeja de entrada.

<!-- endif -->

Si todavía estás dudando, echa un vistazo a las fotos de las ediciones anteriores: hay cientos de razones para terminar de convencerte.

[[Ver ediciones anteriores]](https://pycamp.es/previous-editions)

Y si tienes cualquier duda, responde a este email o mira las [preguntas frecuentes](${faqs_url}).

¡Nos vemos en el PyCamp! 🐍
