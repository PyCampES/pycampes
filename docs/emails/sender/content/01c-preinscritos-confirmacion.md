---
# Lo que ve quien recibe el email
subject: "🎉 ¡Hay PyCamp ${year}! Te contamos los siguientes pasos"
preheader: "Confirmamos fecha y lugar. Por haberte pre-inscrito, te inscribes antes que nadie."
reason: "Recibes este email porque te pre-inscribiste en el PyCamp ${year}."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${preregistered_group}"

# Documentación interna (no aparece en el email)
trigger: "Solo en 2027, a mano, al confirmar fecha y lugar (plan A: antes del viernes 18 de diciembre; plan B: antes del viernes 29 de enero), el mismo día que 01-anuncio-fecha-y-lugar. Antes de enviarlo, importar en Sender al grupo preregistered_group los emails del formulario de pre-inscripción. Borrar este archivo después de enviarlo."
---

# ¡Hay PyCamp ${year}! 🎉

¡Hola! 👋

Gracias a tu pre-inscripción, y a la de mucha gente más, **confirmamos la ${edition} edición del PyCamp España**:

- 📅 **${dates}**: 4 días y 3 noches
- 🏡 **${venue}**
- 💶 **${price}**, con alojamiento, pensión completa y PyBus incluidos

**¿Qué pasa ahora?**

1. El **${preregistration_registration_date}** te enviaremos el **formulario de inscripción**, antes que a nadie. Hay que rellenarlo para confirmar tu plaza: te pediremos algunos datos más que en la pre-inscripción.
2. Después de inscribirte te enviaremos tu **código personal** para comprar la entrada. Puede tardar desde unas horas hasta un par de días. Desde que te llegue, tendrás **${payment_days} días** para completar la compra.
3. Al llegar al PyCamp te daremos tu **camiseta de edición limitada**. 👕

Hasta entonces no tienes que hacer nada. Si ya no puedes venir, responde a este email y así liberamos tu plaza para otra persona.

¡Nos vemos en el PyCamp! 🐍
