---
# Lo que ve quien recibe el email
subject: "⚠️ Último aviso: tu reserva para el PyCamp ${year} vence en ${days_left_last_reminder} días"
preheader: "Después de ese plazo, la plaza pasa a la lista de espera."
reason: "Recibes este email porque te inscribiste en el PyCamp España ${year}."

# Documentación interna (no aparece en el email)
workflow: "Inscritos sin pagar"
trigger: "6 días después de «Haz el pago», si el Estado no es «Pagado»"
---

# Último aviso ⚠️

¡Hola! 👋

Tu reserva para el **PyCamp España ${year}** vence en **${days_left_last_reminder} días**. Si para entonces no has comprado tu entrada, la plaza pasará a la siguiente persona de la lista de espera.

Todavía estás a tiempo. Este es tu código:

> Tu código: **{{cupon}}**

[[Comprar mi entrada]](${pretix_url})

¿Tienes algún problema con el pago o con la tienda? Responde a este email y lo resolvemos juntos.

¡Ojalá nos veamos en el PyCamp! 🏕️
