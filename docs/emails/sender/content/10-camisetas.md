---
# Lo que ve quien recibe el email
subject: "👕 Consigue tu camiseta del PyCamp ${year} antes del ${tshirts_deadline}"
preheader: "Edición limitada para quienes vienen al PyCamp. Te la entregamos allí."
reason: "Recibes este email porque te inscribiste en el PyCamp España."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "Asistentes ${year}"

# Documentación interna (no aparece en el email)
trigger: "A mano, unas semanas antes del evento, con tiempo para encargar las camisetas"
---

# ¡Consigue tu camiseta del PyCamp! 👕

¡Hola! 👋

Este año vamos a tener **camisetas del PyCamp ${year}** para quienes vienen al evento. ¡Te la entregaremos allí para que puedas lucirla desde el primer día!

- 💰 Precio: **${tshirts_price}**, un precio simbólico que solo cubre la producción.
- 📅 Fecha límite para pedirla: **${tshirts_deadline}**. Después ya no podremos encargar más.

Elige tu talla y paga en nuestra tienda:

[[¡Quiero mi camiseta!]](${tshirts_url})

Si tienes cualquier duda sobre tallas o pagos, responde a este email.

¡Nos vemos en el PyCamp! 🏕️
