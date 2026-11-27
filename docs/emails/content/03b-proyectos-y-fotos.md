---
# Lo que ve quien recibe el email
subject: "💻 Aún estás a tiempo: esto es lo que hacemos en el PyCamp"
preheader: "Proyectos que nacieron en el PyCamp y fotos de ediciones anteriores."
reason: "Recibes este email porque te suscribiste a la newsletter de PyCamp España en nuestra web."

# Cuándo y a quién se envía (lo usa npm run emails:schedule)
audience: "${not_registered_segment}"
days_before_event: "70"
send_time: "10:00"

# Documentación interna (no aparece en el email)
trigger: "Journey No inscritos (email 3 de 5): unos 30 días después de la apertura (03), solo a quien todavía no se inscribió"
---

# Aún estás a tiempo 💻

¡Hola! 👋

¿Te preguntas qué se hace exactamente durante cuatro días en el PyCamp? Te lo enseñamos.

**Los proyectos los traen quienes vienen.** El primer día cada persona puede presentar una idea: un issue de un proyecto open source, un prototipo, algo con hardware o electrónica… o incluso una caminata. Las propuestas se reparten en una pizarra y cada persona se mueve libremente entre las que más le interesan.

Algunos de los proyectos que salieron de ediciones anteriores:

- **[MedNERDS](https://github.com/PyCampES/MedNERDS)**: reconocimiento de entidades en textos médicos para estructurar datos.
- **[dj-tui](https://github.com/PyCampES/dj-tui)**: una mesa de DJ en la terminal, controlada con un controlador MIDI.
- **[pycamp.es](https://github.com/PyCampES/pycampes)**: la propia web del PyCamp, que también se programa en comunidad.

Y entre proyecto y proyecto: juegos de mesa y de rol, deportes, malabares, sobremesas largas y mucho campo.

[[Ver fotos de ediciones anteriores]](https://pycamp.es/previous-editions)

Todavía quedan plazas para el **PyCamp ${year}** (**${dates}**, en **${venue}**):

[[Inscribirme]](${registration_form_url})

Si ya te inscribiste y todavía no te llegó tu código para comprar la entrada, no te preocupes: lo estamos procesando y te escribiremos en breve.

¡Nos vemos en el PyCamp! 🏕️
