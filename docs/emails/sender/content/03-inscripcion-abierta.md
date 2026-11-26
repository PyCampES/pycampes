---
# Lo que ve quien recibe el email
subject: "🎟️ ¡Abrimos la inscripción para el PyCamp ${year}!"
preheader: "Hay ${max_attendees} plazas: te contamos cómo conseguir la tuya."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "Newsletter"

# Documentación interna (no aparece en el email)
trigger: "A mano, unos días después de la preventa (02)"
---

# ¡No te quedes fuera! 🎟️

¡Hola! 👋

Ya está abierta la inscripción para la **${edition} edición del PyCamp España**: cuatro días programando en proyectos open source, aprendiendo con gente apasionada y desconectando en plena naturaleza.

- 📅 Fechas: **${dates}**
- 🏡 Lugar: **${venue}**
- 🎟️ Precio: **${price}**

Hay **${max_attendees} plazas** y suelen volar, así que no te lo pienses demasiado:

[[Inscribirme]](${registration_form_url})

**¿Cómo funciona?**

1. Te inscribes en el formulario.
2. Te enviamos por email un **código personal** para comprar tu entrada en nuestra tienda.
3. Tienes **${payment_days} días** para completar la compra. Si no, la plaza pasa a la siguiente persona de la lista de espera.

**La entrada incluye:**

- Alojamiento durante 4 días y 3 noches
- Pensión completa: desayuno, comida, merienda y cena
- Espacios cerrados y al aire libre para programar
- Conexión a internet
- Transporte (PyBus) hasta el venue
- Actividades propuestas por los propios asistentes: juegos de mesa y de rol, deportes, malabares y mucho más

<!-- if scholarships_form_url -->

Tenemos **becas** para que nadie se quede fuera por motivos económicos:

[[Solicitar una beca]](${scholarships_form_url})

<!-- endif -->

Si todavía estás dudando, echa un vistazo a las [fotos de las ediciones anteriores](https://pycamp.es/previous-editions). Y si tienes cualquier duda, responde a este email o mira las [preguntas frecuentes](${faqs_url}).

¡Esperamos verte en el PyCamp! 🐍🏕️
