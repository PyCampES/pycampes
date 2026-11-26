---
# Lo que ve quien recibe el email
subject: "🎟️ Preventa: inscríbete al PyCamp ${year} antes que nadie"
preheader: "Por haber venido a ediciones anteriores, te avisamos antes del anuncio público."
reason: "Recibes este email porque participaste en una edición anterior del PyCamp España."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${previous_attendees_groups}"

# Documentación interna (no aparece en el email)
trigger: "A mano, unos días antes de abrir la inscripción a todo el mundo (03)"
---

# ¡Tu plaza te espera! 🎟️

¡Hola! 👋

Por haber formado parte del PyCamp en ediciones anteriores, queríamos contarte **antes que a nadie** que **ya está abierta la inscripción para la ${edition} edición del PyCamp España**.

- 📅 Fechas: **${dates}**
- 🏡 Lugar: **${venue}**
- 🎟️ Precio: **${price}**

En unos días haremos el anuncio público y hay **${max_attendees} plazas**, así que si quieres venir, no lo dejes para más adelante:

[[Inscribirme]](${registration_form_url})

<!-- if preregistration_form_url -->

Si te pre-inscribiste y todavía no rellenaste el formulario de inscripción, hazlo ahora con este mismo botón: la pre-inscripción sola no confirma tu plaza.

<!-- endif -->

**¿Cómo funciona?**

1. Te inscribes en el formulario.
2. Te enviamos por email un **código personal** para comprar tu entrada en nuestra tienda. Puede tardar desde unas horas hasta un par de días.
3. Desde que te llega el código, tienes **${payment_days} días** para completar la compra. Si no, la plaza pasa a la siguiente persona.

La entrada incluye alojamiento y pensión completa durante los 4 días, espacios para programar dentro y al aire libre, conexión a internet y el transporte (PyBus) hasta el venue.

<!-- if scholarships_form_url -->

Y como siempre, tenemos **becas** para que nadie se quede fuera por motivos económicos:

[[Solicitar una beca]](${scholarships_form_url})

<!-- endif -->

¡Qué ganas de volver a vernos! 🏕️
