---
# Lo que ve quien recibe el email
subject: "🎟️ Ya puedes inscribirte en el PyCamp ${year}, antes que nadie"
preheader: "Por haberte pre-inscrito, abrimos la inscripción para ti primero. Confirma tu plaza."
reason: "Recibes este email porque te pre-inscribiste en el PyCamp ${year}."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${preregistered_group}"

# Documentación interna (no aparece en el email)
trigger: "Solo en 2027, a mano, el día de preregistration_registration_date (plan A: lunes 11 de enero; plan B: lunes 1 de febrero). Primera ronda de venta, antes de la preventa (02). Borrar este archivo después de enviarlo."
---

# ¡Tu plaza te espera! 🎟️

¡Hola! 👋

Como te pre-inscribiste en el PyCamp ${year}, **abrimos la inscripción para ti antes que nadie**.

- 📅 Fechas: **${dates}**: 4 días y 3 noches
- 🏡 Lugar: **${venue}**
- 🎟️ Precio: **${price}**

**La pre-inscripción no confirma tu plaza.** Para confirmarla, rellena el formulario de inscripción: te pedimos algunos datos más que necesitamos para organizar el evento.

[[Inscribirme]](${registration_form_url})

**¿Cómo funciona?**

1. Te inscribes en el formulario.
2. Te enviamos por email un **código personal** para comprar tu entrada en nuestra tienda. Puede tardar desde unas horas hasta un par de días.
3. Desde que te llega el código, tienes **${payment_days} días** para completar la compra. Si no, la plaza pasa a la siguiente persona.

Tu prioridad dura hasta el **${preregistration_priority_until}**. Después abrimos la inscripción a quienes vinieron a ediciones anteriores y, unos días más tarde, a todo el mundo.

<!-- if scholarships_form_url -->

Y como siempre, tenemos **becas** para que nadie se quede fuera por motivos económicos:

[[Solicitar una beca]](${scholarships_form_url})

<!-- endif -->

Recuerda que tu **camiseta de edición limitada** te espera en el PyCamp. 👕

¡Nos vemos pronto! 🐍
