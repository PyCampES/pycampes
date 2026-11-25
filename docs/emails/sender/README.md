# Emails automáticos en Sender.net

Los emails que envían los workflows de Sender se escriben aquí, en Markdown, y se convierten a HTML con un diseño común.

| Archivo                          | Qué es                                                                                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`content/`](content/)           | Un email por archivo. Arriba, entre líneas `---`: asunto (`subject`), texto de vista previa (`preheader`), workflow, cuándo se envía (`trigger`) y motivo del pie (`reason`). Debajo, el texto en Markdown. |
| [`edition.toml`](edition.toml)   | Datos de la edición (año, fechas, lugar, precio, enlaces). En los textos se usan como `${price}`, `${dates}`, etc.                                                                                          |
| [`template.mjml`](template.mjml) | Diseño común en [MJML](https://documentation.mjml.io/): cabecera con el logo, estilos y pie.                                                                                                                |
| [`build.mjs`](build.mjs)         | Genera el HTML.                                                                                                                                                                                             |
| [`html/`](html/)                 | Resultado: el HTML que se pega en Sender. **No se edita a mano.**                                                                                                                                           |

## Editar un email

1. Cambia el texto en `content/` o los datos en `edition.toml`.
2. Genera el HTML desde la raíz del repositorio:

   ```
   npm run emails
   ```

   Avisa si queda algún dato `POR DEFINIR` en `edition.toml`.

3. En Sender, abre el paso del workflow que envía ese email, elige _Custom HTML_ y pega el contenido del archivo de `html/`. Si cambiaste el asunto, cámbialo también ahí.

Convenciones del texto:

- Una línea con solo `[[Texto del botón]](https://...)` se convierte en un botón.
- Una cita (`> ...`) se muestra como un recuadro destacado. Se usa para el cupón.
- Las etiquetas de Sender se escriben tal cual: `{{cupon}}` (el cupón de cada persona), `{{firstname}}`, etc.
- Un texto que solo debe aparecer cuando ciertos datos de `edition.toml` ya están definidos va entre `<!-- if dates venue -->` y `<!-- endif -->`, con una alternativa opcional tras `<!-- else -->`. Por ejemplo, la bienvenida muestra las fechas y el lugar de la próxima edición cuando están definidos, y si no, el texto genérico.

Las imágenes están en [`public/emails/`](../../../public/emails/) y la web las publica en `https://pycamp.es/<año>/emails/`.

Los emails de los **workflows** (00 a 06) hay que pegarlos a mano en Sender: su API permite cambiar el asunto, pero no el contenido de un email ya creado (lo probamos en noviembre de 2026). Las **campañas** (07 a 12) sí se suben solas, con `npm run emails:schedule` (ver más abajo).

## Cuando se confirmen las fechas de la edición

1. Completa los datos `POR DEFINIR` de `edition.toml`.
2. `npm run emails` para regenerar el HTML.
3. En Sender, pega el HTML nuevo en cada email de los workflows: `00-bienvenida` (pasa a mostrar las fechas y el lugar) y los de _Inscritos sin pagar_ y _Pagados_.
4. `npm run emails:schedule -- --apply` para programar las campañas antes y después del evento.

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

Plazo total para comprar la entrada: 10 días (3 + 3 + 4). Si cambia, actualiza también los días en `edition.toml`.

1. **Disparador:** _Subscriber field updated_ → **Estado** es igual a `Inscrito`.
2. **Email:** `01-haz-el-pago`.
3. **Espera:** 3 días.
4. **Condición:** ¿Estado es igual a `Pagado`? **Sí** → fin. **No** → sigue.
5. **Email:** `02-recordatorio-pago`.
6. **Espera:** 3 días.
7. **Condición:** ¿Estado es igual a `Pagado`? **Sí** → fin. **No** → sigue.
8. **Email:** `03-ultimo-aviso`.
9. **Espera:** 4 días.
10. **Condición:** ¿Estado es igual a `Pagado`? **Sí** → fin. **No** → sigue.
11. **Acción:** actualizar el campo **Estado** a `Vencido`. Así se ve en la lista quién perdió la plaza y hay que anular su cupón en pretix.
12. **Email:** `04-reserva-vencida`.

### Pagados

1. **Disparador:** _Subscriber field updated_ → **Estado** es igual a `Pagado`.
2. **Email:** `05-plaza-confirmada`.
3. **Espera:** 1 día.
4. **Email:** `06-grupo-telegram`.

Además, conviene añadir a cada persona que paga al grupo **Asistentes <año>**, que se usa para los emails previos al evento (¿Qué llevo?, PyBus, etc.) y para la preventa del año siguiente.

## Campañas antes y después del evento

Estos emails no dependen de cada persona sino de la fecha del evento, así que son **campañas programadas** al grupo **Asistentes <año>** (por eso, al marcar a alguien como `Pagado`, hay que añadirlo a ese grupo).

| Email                                 | Cuándo                          |
| ------------------------------------- | ------------------------------- |
| `07-propone-un-proyecto`              | 30 días antes, 10:00            |
| `08-que-llevo`                        | 7 días antes, 10:00             |
| `09-propone-un-proyecto-recordatorio` | 5 días antes, 18:00             |
| `10-informacion-pybus`                | 4 días antes, 10:00             |
| `11-manana-es-el-gran-dia`            | 1 día antes, 10:00              |
| `12-gracias`                          | 2 días después del final, 10:00 |

El momento de cada una está en su encabezado (`days_before_event` o `days_after_event` y `send_time`) y se calcula a partir de `event_start` y `event_end` de `edition.toml`.

Se crean y programan en Sender con un comando, sin copiar nada a mano:

```
npm run emails:schedule              # muestra el plan; no cambia nada
npm run emails:schedule -- --apply   # crea y programa las campañas
```

- Necesita `SENDER_NET_API_TOKEN` en el entorno (_Settings → API access tokens_ en Sender).
- No hace nada si queda algún dato `POR DEFINIR` o faltan las fechas del evento.
- Se salta las campañas que ya existen en Sender (mismo título, por ejemplo `PyCamp 2027 · 08-que-llevo`) y las que tendrían que haberse enviado ya. Se puede ejecutar más de una vez.
- Si cambias un texto **después** de programarlas, borra esa campaña en Sender (_Campaigns_) y vuelve a ejecutar el comando.
- La hora se interpreta en la zona horaria de la cuenta de Sender: comprueba que sea Madrid.

## Proceso de inscripción

Se hace a mano en el panel de Sender (_Subscribers_), persona por persona:

1. La persona se inscribe en el formulario de Google del PyCamp.
2. Búscala en Sender. Si no está, créala con su email (y su nombre, si lo tienes) y guárdala **sin** rellenar el Estado.
3. Rellena su **Cupón** con un código de pretix sin usar y su **Año** con el de la edición. **Guarda.**
4. Edítala otra vez y cambia su **Estado** a `Inscrito`. **Guarda.** → empieza el workflow _Inscritos sin pagar_ y le llega «Haz el pago» con su código.
5. Cuando su compra aparezca en pretix, cambia su **Estado** a `Pagado` y añádela al grupo **Asistentes <año>** → sale del workflow anterior y empieza _Pagados_.

Por qué en dos pasos (3 y 4): el workflow se dispara cuando el Estado _cambia_. Si el cupón se carga después, el email sale con el código vacío; y si se crea la persona ya con el Estado puesto, puede que Sender no lo cuente como un cambio y no se envíe nada.

Si alguien deja vencer la reserva, el workflow pone su Estado en `Vencido`: anula su cupón en pretix para que no se pueda usar.

## Probar un email antes de activarlo

Los **emails de prueba** de Sender (_Send test email_) **no reemplazan las etiquetas**: muestran `{{cupon}}` tal cual. Para ver un email como lo recibirá alguien, haz el recorrido completo con una dirección de prueba (por ejemplo `info+prueba@pycamp.es`, que llega al Gmail del PyCamp): créala, ponle un cupón de prueba y cambia su Estado. Después bórrala.
