---
# Lo que ve quien recibe el email
subject: "🗣️ Lo que cuentan quienes ya vinieron al PyCamp"
preheader: "Le preguntamos a la gente qué se llevó del PyCamp. Esto es lo que más se repite."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${not_registered_segment}"
days_before_event: "85"
send_time: "10:00"

# Documentación interna (no aparece en el email)
trigger: "Journey No inscritos (email 2 de 5): unos 15 días después de la apertura (03), solo a quien todavía no se inscribió"
---

# No te lo pierdas 🏕️

¡Hola! 👋

Hace unos días abrimos la inscripción para el **PyCamp ${year}** (**${dates}**, en **${venue}**) y todavía no te vimos en la lista.

Cuando le preguntamos a quienes ya vinieron qué se llevaron del PyCamp, casi nadie habla de código. Lo que más se repite es esto:

- **Gente accesible y apasionada, con ganas reales de compartir.** Puedes sentarte al lado de alguien con años de experiencia y ver cómo piensa un problema.
- **Un ambiente donde no hace falta demostrar nada.** Nadie te pide un nivel mínimo ni un currículum.
- **Conversaciones que no tendrías en una oficina ni en una conferencia.** Sobre código, pero también sobre ética, tecnología y cómo queremos trabajar.
- **Conexiones que se quedan después del evento.** Proyectos que siguen, amistades y colaboraciones.

En pocas palabras: un entorno autoorganizado en la naturaleza donde gente que programa se junta para aprender, compartir y conectar de verdad, sin presión ni estructura rígida.

[[Inscribirme]](${registration_form_url})

Si ya te inscribiste y todavía no te llegó tu código para comprar la entrada, no te preocupes: lo estamos procesando y te escribiremos en breve.

¡Esperamos verte allí! 🐍
