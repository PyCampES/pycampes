---
# Lo que ve quien recibe el email
subject: "⏳ PyCamp ${year}: la inscripción cierra el ${registration_deadline}"
preheader: "Últimas plazas para el PyCamp ${year}. Después ya no podremos sumar a nadie."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${not_registered_segment}"
days_before_event: "40"
send_time: "18:00"

# Documentación interna (no aparece en el email)
trigger: "Journey No inscritos (email 5 de 5): unos 60 días después de la apertura (03), solo a quien todavía no se inscribió. Si se agotan las plazas antes, borra esta campaña en Sender."
---

# Últimas plazas ⏳

¡Hola! 👋

Este es el último email que te mandamos sobre la inscripción: **el ${registration_deadline} cerramos la inscripción para el PyCamp ${year}**. Después tenemos que cerrar los números con el venue y el PyBus, y ya no podremos sumar a nadie.

- 📅 Fechas: **${dates}**
- 🏡 Lugar: **${venue}**
- 🎟️ Precio: **${price}**

Quedan pocas plazas, así que no lo dejes para el último día:

[[Inscribirme]](${registration_form_url})

Si ya te inscribiste y todavía no te llegó tu código para comprar la entrada, no te preocupes: lo estamos procesando y te escribiremos en breve.

Y si este año no puedes, no pasa nada: seguirás recibiendo la newsletter y te avisaremos de la próxima edición. 🤗

¡Ojalá nos veamos en el PyCamp! 🏕️
