# Formularios de Google Forms

Los textos de los formularios (inscripción, becas, pre-inscripción, proyectos y feedback) se guardan aquí, con los datos de la edición tomados del mismo [`edition.toml`](../emails/sender/edition.toml) que usan los emails. Estos archivos mandan: se cambian aquí y `npm run forms:api -- sync` actualiza el formulario de Google Forms con la API. Lo único que sigue siendo a mano en la web de Google Forms es el mensaje al enviar, el de formulario cerrado, las preguntas de subir archivo y las imágenes.

| Archivo                  | Qué es                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [`content/`](content/)   | Un formulario por archivo: un encabezado entre líneas `---` con el id del formulario y, debajo, sus textos y preguntas.       |
| [`forms.mjs`](forms.mjs) | Genera los textos con los datos de `edition.toml` y los compara con los formularios publicados.                               |
| [`api.mjs`](api.mjs)     | Lee y cambia los formularios con la API de Google Forms.                                                                      |
| [`sync.mjs`](sync.mjs)   | Compara un archivo de `content/` con el formulario y calcula los cambios para la API.                                         |
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
2. Desde la raíz del repositorio, compara con el formulario de Google Forms (no cambia nada):

   ```
   npm run forms:api -- sync inscripcion
   ```

   Muestra las diferencias palabra por palabra (en rojo, lo que hay ahora; en verde, cómo quedaría), la lista de cambios y lo que hay que hacer a mano, y guarda las peticiones para la API en `build/inscripcion.sync.json`. Se niega si el texto todavía tiene datos `POR DEFINIR` de `edition.toml`.

3. Si está bien, aplícalo:

   ```
   npm run forms:api -- update inscripcion docs/forms/build/inscripcion.sync.json
   ```

   Las preguntas existentes se cambian en su sitio, sin borrarlas, para que no pierdan sus respuestas. Si el cambio borra algo (una pregunta que ya no está en `content/`), `sync` lo marca con `BORRA` y `update` solo lo hace con `--con-borrados`. Si alguien cambió el formulario después del `sync`, `update` falla: vuelve a ejecutar `sync`.

4. Los mensajes al enviar y de formulario cerrado no están en la API: cópialos a mano y compruébalo todo con:

   ```
   npm run forms:check -- inscripcion
   ```

   Muestra las diferencias con el formulario publicado: en rojo, lo que falta poner en Google Forms; en verde, lo que sobra.

Un formulario cerrado no muestra sus preguntas en la página pública: para comprobarlo hay que abrirlo un momento. Solo se leen los textos y las preguntas, nunca las respuestas.

## Editar desde la API de Google Forms

[`api.mjs`](api.mjs) lee y cambia los formularios con la API oficial (no necesita que el formulario esté abierto). Usa un cliente OAuth propio de tipo "Desktop app", guardado en `~/.config/pycamp/google-credentials.json`, fuera del repositorio.

```
npm run forms:api -- login                            # autorizar (una vez)
npm run forms:api -- status                           # dónde está cada formulario de content/
npm run forms:api -- get inscripcion                  # guarda build/inscripcion.api.json
npm run forms:api -- sync inscripcion                 # compara content/ con el formulario
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
