---
# Lo que ve quien recibe el email
subject: "🤔 ¿Tienes dudas sobre el PyCamp? Te las resolvemos"
preheader: "Nivel técnico, qué incluye la entrada, cómo es el ambiente… y cómo escribirnos."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${not_registered_segment}"
days_before_event: "55"
send_time: "10:00"

# Documentación interna (no aparece en el email)
trigger: "Journey No inscritos (email 4 de 5): unos 45 días después de la apertura (03), solo a quien todavía no se inscribió"
---

# ¿Tienes dudas? 🤔

¡Hola! 👋

Si todavía no te inscribiste en el **PyCamp ${year}**, quizás es porque tienes alguna duda. Estas son las que más nos llegan:

**"¿Tengo nivel suficiente?"**<br>
Sí. Con un conocimiento básico de Python ya puedes aprovecharlo al máximo. No hay talleres para aprender a programar desde cero, pero vas a trabajar codo a codo con gente con mucha experiencia, ver cómo piensan y cómo atacan un problema. Nadie te va a examinar.

**"¿Cómo es el ambiente?"**<br>
Tranquilo y horizontal. Somos unas ${max_attendees} personas, así que en cuatro días te da tiempo a hablar con todo el mundo. Queremos que sea un espacio seguro para cualquier persona, y para eso tenemos un [código de conducta](https://pycamp.es/diversity).

**"¿Qué incluye la entrada?"**<br>
Por **${price}**: alojamiento durante 4 días y 3 noches, pensión completa, espacios para programar dentro y al aire libre, conexión a internet y el transporte (PyBus) hasta el venue.

<!-- if scholarships_form_url -->

**"¿Y si no me lo puedo permitir?"**<br>
Tenemos **becas** para que nadie se quede fuera por motivos económicos:

[[Solicitar una beca]](${scholarships_form_url})

<!-- endif -->

¿Tu duda es otra? **Responde a este email** y te contestamos nosotros, o mira las [preguntas frecuentes](${faqs_url}).

Y si ya lo tienes claro:

[[Inscribirme]](${registration_form_url})

Si ya te inscribiste y todavía no te llegó tu código para comprar la entrada, no te preocupes: lo estamos procesando y te escribiremos en breve.

¡Un abrazo! 🐍
