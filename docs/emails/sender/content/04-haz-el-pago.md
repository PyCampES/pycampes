---
# Lo que ve quien recibe el email
subject: "🎟️ Tu plaza en el PyCamp ${year} te espera: completa la compra"
preheader: "Tu código personal para comprar la entrada y los pasos para hacerlo."
reason: "Recibes este email porque te inscribiste en el PyCamp España."

# Documentación interna (no aparece en el email)
workflow: "Inscritos sin pagar"
trigger: "Al pasar el campo Estado a «Inscrito»"
---

# ¡Ya casi estás dentro! 🏕️

¡Hola! 👋

Gracias por inscribirte en la ${edition} edición del **PyCamp España**. Te hemos reservado una plaza y solo falta un paso: **comprar tu entrada**.

La venta se hace en pretix y solo se puede comprar con un **código personal**. Este es el tuyo:

> Tu código: **{{cupon}}**

Para comprar tu entrada:

1. Entra en la tienda del PyCamp con el botón de abajo.
2. Introduce tu código cuando te lo pida.
3. Completa tus datos y paga con cualquiera de los medios disponibles.

[[Comprar mi entrada]](${pretix_url})

Tienes **${payment_days} días** para completar la compra. Pasado ese plazo, la plaza se libera para la siguiente persona en la lista de espera.

**Datos del PyCamp ${year}**

- 📅 Fechas: ${dates}
- 🏡 Lugar: ${venue}
- 🎟️ Precio: ${price}

La entrada incluye alojamiento y pensión completa durante los 4 días, espacios para programar dentro y al aire libre, conexión a internet y el transporte ida y vuelta al venue.

Si tienes cualquier duda, responde a este email o escríbenos a ${contact_email}. También puedes mirar las [preguntas frecuentes](${faqs_url}).

¡Nos vemos pronto!
