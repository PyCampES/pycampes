# Emails automáticos en Sender.net

Los emails que envían los workflows de Sender se escriben aquí, en Markdown, y se convierten a HTML con un diseño común.

Qué hacer en cada momento de la edición, en orden: [`docs/checklist-edicion.md`](../checklist-edicion.md).

| Archivo                          | Qué es                                                                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`content/`](content/)           | Un email por archivo: un encabezado entre líneas `---` y, debajo, el texto en Markdown. Ver [El encabezado de cada email](#el-encabezado-de-cada-email).             |
| [`edition.toml`](edition.toml)   | Datos de la edición (año, fechas, lugar, precio, enlaces). En los textos se usan como `${price}`, `${dates}`, etc.                                                   |
| [`template.mjml`](template.mjml) | Diseño común en [MJML](https://documentation.mjml.io/): cabecera con el logo, estilos y pie.                                                                         |
| [`build.mjs`](build.mjs)         | Genera el HTML.                                                                                                                                                      |
| `html/`                          | Resultado: el HTML que se pega en Sender. Lo genera `npm run emails` y **no se guarda en el repositorio** (está en `.gitignore`): se genera cada vez que hace falta. |

## El encabezado de cada email

Está agrupado en tres bloques, separados por una línea en blanco y un comentario `#`:

| Bloque                              | Campos                                                                                                                                                                                                   | Dónde se usa                                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Lo que ve quien recibe el email** | `subject` (asunto), `preheader` (texto de vista previa en la bandeja de entrada), `reason` (motivo del pie, encima de «Darme de baja»), `image` (opcional: imagen antes del título, de `public/emails/`) | En el email. En los workflows, Sender usa el asunto que se escribe en el paso del workflow: hay que copiarlo a mano. |
| **Cuándo y a quién se envía**       | `audience` (grupo o segmento de Sender), `days_before_event` o `days_after_event`, `send_time`                                                                                                           | Solo en las campañas (01 a 03d y 10 a 16); lo usa `npm run emails:schedule`. No aparece en el email.                 |
| **Documentación interna**           | `workflow`, `trigger`                                                                                                                                                                                    | Solo para el equipo: en qué workflow se pega el email y cuándo se envía. No aparece en el email.                     |

Los valores van entre comillas y pueden usar datos de `edition.toml`, como `${year}`.

## Editar un email

1. Cambia el texto en `content/` o los datos en `edition.toml`.
2. Genera el HTML desde la raíz del repositorio:

   ```
   npm run emails
   ```

   Avisa si queda algún dato `POR DEFINIR` en `edition.toml`. Para ver todos los emails en el navegador, abre `html/index.html`: es solo local, no se publica.

3. En Sender, abre el paso del workflow que envía ese email, elige _Custom HTML_ y pega el contenido del archivo recién generado en `html/`. Si cambiaste el asunto, cámbialo también ahí.

Convenciones del texto:

- Una línea con solo `[[Texto del botón]](https://...)` se convierte en un botón.
- Una cita (`> ...`) se muestra como un recuadro destacado. Se usa para el cupón.
- Las etiquetas de Sender se escriben tal cual: `{{cupon}}` (el cupón de cada persona), `{{firstname}}`, etc.
- Un texto que solo debe aparecer cuando ciertos datos de `edition.toml` ya están definidos va entre `<!-- if dates venue -->` y `<!-- endif -->`, con una alternativa opcional tras `<!-- else -->`. Por ejemplo, la bienvenida muestra las fechas y el lugar de la próxima edición cuando están definidos, y si no, el texto genérico.

Las imágenes están en [`public/emails/`](../../public/emails/) y la web las publica en `https://pycamp.es/<año>/emails/`.

Los emails de los **workflows** (00 y 04 a 09) hay que pegarlos a mano en Sender: su API permite cambiar el asunto, pero no el contenido de un email ya creado (lo probamos en noviembre de 2026). Las **campañas** (01 a 03d y 10 a 16) sí se suben solas, con `npm run emails:schedule` (ver más abajo).

## Cuando se confirmen las fechas de la edición

1. Completa los datos `POR DEFINIR` de `edition.toml`.
2. `npm run emails` para regenerar el HTML.
3. En Sender, pega el HTML nuevo en cada email de los workflows: `00-bienvenida` (pasa a mostrar las fechas y el lugar) y los de _Inscritos sin pagar_ y _Pagados_.
4. Crea en Sender el segmento de quienes no se inscribieron (ver [Journey «No inscritos»](#journey-no-inscritos-03a-a-03d)).
5. `npm run emails:schedule -- --apply`: crea en Sender las campañas manuales como borradores y programa las demás, siempre que sus datos ya estén completos.
6. Revisa en Sender el borrador del anuncio `01-anuncio-fecha-y-lugar` y envíalo (_Send_) a la Newsletter. Se envía una sola vez por edición.

## Datos de cada persona en Sender

| Campo  | Etiqueta     | Valores                                              |
| ------ | ------------ | ---------------------------------------------------- |
| Estado | `{{estado}}` | `Inscrito`, `Pagado`, `Vencido`                      |
| Año    | `{{ano}}`    | Año de la edición, por ejemplo `2027`                |
| Cupón  | `{{cupon}}`  | Código personal de pretix.eu para comprar la entrada |

**Importante:** el cupón se carga **antes** de cambiar el estado a `Inscrito`, porque ese cambio envía el email con el código. Si se hace al revés, el email sale con el código vacío.

## Workflows

Los workflows se crean a mano en Sender (_Automation_): su API no permite crearlos ni editarlos.

### Bienvenida (activo)

- **Disparador:** _Subscriber joins a group_ → **Newsletter**.
- **Email:** `00-bienvenida`.

### Inscritos sin pagar

Plazo total para comprar la entrada: 7 días (3 + 3 + 1). Si cambia, actualiza también los días en `edition.toml`.

1. **Disparador:** _Subscriber field updated_ → **Estado** es igual a `Inscrito`.
2. **Email:** `04-haz-el-pago`.
3. **Espera:** 3 días.
4. **Condición:** ¿Estado es igual a `Pagado`? **Sí** → fin. **No** → sigue.
5. **Email:** `05-recordatorio-pago`.
6. **Espera:** 3 días.
7. **Condición:** ¿Estado es igual a `Pagado`? **Sí** → fin. **No** → sigue.
8. **Email:** `06-ultimo-aviso`.
9. **Espera:** 1 día.
10. **Condición:** ¿Estado es igual a `Pagado`? **Sí** → fin. **No** → sigue.
11. **Acción:** actualizar el campo **Estado** a `Vencido`. Así se ve en la lista quién perdió la plaza y hay que anular su cupón en pretix.
12. **Email:** `07-reserva-vencida`.

### Pagados

1. **Disparador:** _Subscriber field updated_ → **Estado** es igual a `Pagado`.
2. **Email:** `08-plaza-confirmada`.
3. **Espera:** 1 día.
4. **Email:** `09-grupo-telegram`.

Además, conviene añadir a cada persona que paga al grupo **Asistentes AAAA**, que se usa para los emails previos al evento (¿Qué llevo?, PyBus, etc.) y para la preventa del año siguiente.

## Campañas

Las campañas son los emails que no dependen de cada persona sino de la edición. Se crean en Sender con un comando, sin copiar nada a mano.

| Email                                   | A quién                                                          | Cuándo                                          |
| --------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| `01-anuncio-fecha-y-lugar`              | Newsletter                                                       | A mano, al confirmar fecha y lugar con el venue |
| `02-inscripcion-pycampistas-anteriores` | Asistentes de ediciones anteriores (`previous_attendees_groups`) | A mano, al abrir la inscripción (preventa)      |
| `03-inscripcion-abierta`                | Newsletter                                                       | A mano, unos días después de la preventa        |
| `03a-testimonios`                       | No inscritos AAAA (segmento)                                     | 85 días antes, 10:00                            |
| `03b-proyectos-y-fotos`                 | No inscritos AAAA (segmento)                                     | 70 días antes, 10:00                            |
| `03c-dudas`                             | No inscritos AAAA (segmento)                                     | 55 días antes, 10:00                            |
| `03d-ultimas-plazas`                    | No inscritos AAAA (segmento)                                     | 40 días antes, 18:00                            |
| `10-camisetas`                          | Asistentes AAAA                                                  | A mano, con tiempo para encargar las camisetas  |
| `11-propone-un-proyecto`                | Asistentes AAAA                                                  | 30 días antes, 10:00                            |
| `12-informacion-pybus`                  | Asistentes AAAA                                                  | 21 días antes, 10:00                            |
| `13-que-llevo`                          | Asistentes AAAA                                                  | 7 días antes, 10:00                             |
| `14-propone-un-proyecto-recordatorio`   | Asistentes AAAA                                                  | 5 días antes, 18:00                             |
| `15-manana-es-el-gran-dia`              | Asistentes AAAA                                                  | 1 día antes, 10:00                              |
| `16-gracias`                            | Asistentes AAAA                                                  | 2 días después del final, 10:00                 |

- **Las manuales** (sin fecha en su encabezado) se crean como **borrador**: se revisan en Sender y se envían con _Send_ cuando toca.
- **Las demás** se programan solas: el momento sale de su encabezado (`days_before_event` o `days_after_event` y `send_time`) y de `event_start` y `event_end` de `edition.toml`.
- Las que van a **Asistentes AAAA** necesitan que, al marcar a alguien como `Pagado`, se le añada a ese grupo.
- `audience` puede tener varios grupos o segmentos separados por comas. La preventa usa `previous_attendees_groups` de `edition.toml`: al cerrar cada edición, añade ahí su grupo.
- Las campañas de inscripción (02 y 03) no se crean hasta que `registration_form_url` esté definido. Si `scholarships_form_url` está definido, muestran también el botón de becas.

```
npm run emails:schedule              # muestra el plan; no cambia nada
npm run emails:schedule -- --apply   # crea el anuncio como borrador y programa las demás
```

- Necesita `SENDER_NET_API_TOKEN` en el entorno (_Settings → API access tokens_ en Sender).
- Se salta, avisando, las campañas que ya existen en Sender (mismo título, por ejemplo `PyCamp 2027 · 09-que-llevo`), las que todavía tienen datos `POR DEFINIR`, las programadas si faltan las fechas del evento y las que tendrían que haberse enviado ya. Se puede ejecutar varias veces a medida que se completan los datos de la edición.
- Si cambias un texto **después** de crearla en Sender, borra esa campaña en Sender (_Campaigns_) y vuelve a ejecutar el comando.
- La hora se interpreta en la zona horaria de la cuenta de Sender: comprueba que sea Madrid.

### Journey «No inscritos» (03a a 03d)

Después de la apertura (`03`), a quien está en la Newsletter y todavía no se inscribió le llegan cuatro emails más, uno cada 15 días: testimonios, proyectos y fotos, dudas frecuentes y, por último, el cierre de la inscripción (`registration_deadline` de `edition.toml`). Es el journey que diseñamos con Olga en FigJam (_Pycamp - Flows_).

Se envían a un **segmento** de Sender, no a un grupo, porque tienen que dejar fuera a quien se va inscribiendo. Antes de ejecutar `npm run emails:schedule -- --apply`, créalo a mano en Sender (_Subscribers → Segments_):

- **Nombre:** el de `not_registered_segment` en `edition.toml` (por ejemplo `No inscritos 2027`).
- **Condiciones:** está en el grupo **Newsletter** _y_ el campo **Estado** está vacío.

Sender evalúa el segmento en el momento del envío, así que cada email le llega solo a quien todavía no tiene Estado. Quien rellenó el formulario pero todavía no tiene su cupón cargado sí lo recibe; por eso los emails incluyen una línea para esos casos.

Las fechas salen de `days_before_event` y están pensadas para el puente de mayo (la apertura sale unos 100 días antes del evento). Si la edición es en Semana Santa y la inscripción abre más tarde, las que ya hayan pasado se saltan solas: conviene acortar los días. Si se agotan las plazas, borra en Sender las campañas que falten.

**Al cerrar cada edición**, vacía el campo Estado de todo el mundo (o el segmento del año siguiente dejaría fuera a quien vino este año).

## Proceso de inscripción

Se hace a mano en el panel de Sender (_Subscribers_), persona por persona:

1. La persona se inscribe en el formulario de Google del PyCamp.
2. Búscala en Sender. Si no está, créala con su email (y su nombre, si lo tienes) y guárdala **sin** rellenar el Estado.
3. Rellena su **Cupón** con un código de pretix sin usar y su **Año** con el de la edición. **Guarda.**
4. Edítala otra vez y cambia su **Estado** a `Inscrito`. **Guarda.** → empieza el workflow _Inscritos sin pagar_ y le llega «Haz el pago» con su código.
5. Cuando su compra aparezca en pretix, cambia su **Estado** a `Pagado` y añádela al grupo **Asistentes AAAA** → sale del workflow anterior y empieza _Pagados_.

Por qué en dos pasos (3 y 4): el workflow se dispara cuando el Estado _cambia_. Si el cupón se carga después, el email sale con el código vacío; y si se crea la persona ya con el Estado puesto, puede que Sender no lo cuente como un cambio y no se envíe nada.

Si alguien deja vencer la reserva, el workflow pone su Estado en `Vencido`: anula su cupón en pretix para que no se pueda usar.

## Probar un email antes de activarlo

Los **emails de prueba** de Sender (_Send test email_) **no reemplazan las etiquetas**: muestran `{{cupon}}` tal cual. Para ver un email como lo recibirá alguien, haz el recorrido completo con una dirección de prueba (por ejemplo `info+prueba@pycamp.es`, que llega al Gmail del PyCamp): créala, ponle un cupón de prueba y cambia su Estado. Después bórrala.
