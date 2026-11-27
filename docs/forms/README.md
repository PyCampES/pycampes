# Formularios de Google Forms

Los textos de los formularios (inscripción, becas, pre-inscripción, proyectos y feedback) se guardan aquí, con los datos de la edición tomados del mismo [`edition.toml`](../emails/sender/edition.toml) que usan los emails. Google Forms solo se puede editar desde su web: estos archivos son la referencia para copiar los textos, y `npm run forms:check` dice qué falta cambiar.

| Archivo                  | Qué es                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [`content/`](content/)   | Un formulario por archivo: un encabezado entre líneas `---` con el id del formulario y, debajo, sus textos y preguntas.       |
| [`forms.mjs`](forms.mjs) | Genera los textos con los datos de `edition.toml` y los compara con los formularios publicados.                               |
| `build/`                 | Resultado: `<nombre>.md` con los textos para copiar y, al comparar, `<nombre>.live.md` con lo publicado. No se guarda en git. |

| Formulario                                                                 | Cuándo se usa                                                     |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`preinscripcion.md`](content/preinscripcion.md)                           | Solo 2027, plan A: pre-inscripción al puente de mayo (01a y 01b). |
| [`preinscripcion-semana-santa.md`](content/preinscripcion-semana-santa.md) | Solo 2027, plan B: pre-inscripción a Semana Santa (01d y 01e).    |
| [`inscripcion.md`](content/inscripcion.md)                                 | Inscripción (`registration_form_url`).                            |
| [`beca-diversidad.md`](content/beca-diversidad.md)                         | Becas de diversidad (`scholarships_form_url`).                    |
| [`proyectos.md`](content/proyectos.md)                                     | Propuestas de proyectos (`projects_form_url`).                    |
| [`feedback.md`](content/feedback.md)                                       | Encuesta después del evento (`survey_url`).                       |

## Cambiar un formulario

1. Cambia el texto en `content/` o los datos en `edition.toml`.
2. Desde la raíz del repositorio:

   ```
   npm run forms
   ```

   Genera `build/<nombre>.md` y avisa de los datos de `edition.toml` que siguen `POR DEFINIR`.

3. Copia los textos en el formulario de Google Forms.
4. Comprueba que el formulario publicado quedó igual:

   ```
   npm run forms:check
   npm run forms:check -- inscripcion   # solo uno
   ```

   Muestra las diferencias palabra por palabra: en rojo, lo que falta poner en Google Forms; en verde, lo que sobra.

Un formulario cerrado no muestra sus preguntas en la página pública: para comprobarlo hay que abrirlo un momento. Solo se leen los textos y las preguntas, nunca las respuestas.

Para una edición nueva, duplica el formulario en Google Drive y pon el id del nuevo en el campo `form` de su archivo.

## Editar desde la API de Google Forms

[`api.mjs`](api.mjs) lee y cambia los formularios con la API oficial (no necesita que el formulario esté abierto). Usa un cliente OAuth propio de tipo "Desktop app", guardado en `~/.config/pycamp/google-credentials.json`, fuera del repositorio.

```
npm run forms:api -- login                            # autorizar (una vez)
npm run forms:api -- status                           # dónde está cada formulario de content/
npm run forms:api -- get inscripcion                  # guarda build/inscripcion.api.json
npm run forms:api -- update inscripcion cambios.json  # aplica un batchUpdate
```

**Solo se cambian los formularios de la edición actual.** Cada edición tiene su carpeta en Google Drive ("PyCampES 2027", etc.), y `drive_folder` en [`edition.toml`](../emails/sender/edition.toml) dice cuál es la actual. `update` se niega a tocar un formulario que no esté dentro de esa carpeta, y falla si el nombre de la carpeta no contiene el `year` de `edition.toml`.

Para una edición nueva:

1. Crea la carpeta "PyCampES <año>" en Google Drive y pon su id en `drive_folder` (y el año en `year`).
2. Copia en ella solo los formularios que hacen falta: en Google Drive, "Hacer una copia" del del año anterior y muévela a la carpeta nueva.
3. Pon el id de edición de cada copia en el campo `form` de su archivo de `content/`, y su enlace público en `edition.toml`.
4. `npm run forms:api -- status` tiene que mostrar ✓ en todos.

La API necesita el id de la URL de edición (`docs.google.com/forms/d/<id>/edit`), no el público con `e/`. No puede crear preguntas de subir archivo: esas se añaden a mano.

## Formato de cada archivo

Es el mismo formato en el que `forms:check` convierte el formulario publicado, para poder compararlos:

- `# Título` del formulario y, si pide el email, `_Pide el email: …_`.
- La descripción, como cita (`> …`).
- Cada pregunta: `**1. Pregunta** _(tipo, obligatoria u opcional)_`, la ayuda como cita y las opciones como lista. Si una opción salta a otra sección: `→ ir a «Sección»`.
- `## Sección` para cada sección nueva y `### Título` para los bloques de título y descripción.
- Al final, `## Mensaje al enviar` y, si lo tiene, `## Mensaje con el formulario cerrado`.

Los datos de `edition.toml` se escriben como `${dates}`, `${price}`, etc. Prettier no toca estos archivos (están en `.prettierignore`), porque el texto tiene que coincidir con el de Google Forms.

Ojo: `forms:check` lee los datos que Google pone en la página pública del formulario, que no son una API documentada. Si un día deja de funcionar, lo más probable es que Google haya cambiado ese formato.
