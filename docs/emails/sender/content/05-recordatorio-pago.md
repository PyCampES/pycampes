---
# Lo que ve quien recibe el email
subject: "⏰ Recuerda comprar tu entrada para el PyCamp ${year}"
preheader: "Te quedan ${days_left_first_reminder} días para completar la compra con tu código."
reason: "Recibes este email porque te inscribiste en el PyCamp España."

# Documentación interna (no aparece en el email)
workflow: "Inscritos sin pagar"
trigger: "3 días después de «Haz el pago», si el Estado no es «Pagado»"
---

# Tu plaza sigue reservada ⏳

¡Hola! 👋

Te escribimos porque todavía no hemos recibido la compra de tu entrada para el **PyCamp España ${year}**. Tu plaza sigue reservada, pero **te quedan ${days_left_first_reminder} días** para completarla.

Recuerda que necesitas tu código personal:

> Tu código: **{{cupon}}**

[[Comprar mi entrada]](${pretix_url})

Si ya la compraste en las últimas horas, puedes ignorar este email: estamos actualizando la lista y en breve te llegará la confirmación.

Si al final no vas a poder venir, avísanos respondiendo a este email. Así podemos ofrecerle la plaza a otra persona de la lista de espera. 💚
