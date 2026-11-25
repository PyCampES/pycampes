# Emails de PyCamp España

Archivo de todos los emails que enviamos (o preparamos) en MailerLite, exportado en noviembre de 2026 antes de migrar de plataforma.

Cada email está en dos formatos:

- **`.html`**: el email final tal cual se renderiza, con las imágenes descargadas en [`images/`](images/) (ya no dependen del CDN de MailerLite).
- **`.md`**: el contenido en texto, con los metadatos (asunto, remitente, fecha, estadísticas) en el encabezado. Es el formato pensado para leer, editar y reutilizar el copy.

Las versiones listas para pegar en Sender.net (HTML personalizado) están en [`sender/`](sender/). Se generan con [`sender/build.py`](sender/build.py) a partir de los emails exportados: cambia el enlace de baja por el de Sender, quita lo específico de MailerLite y usa imágenes publicadas por la web en `https://pycamp.es/<año>/emails/` (archivos en [`public/emails/`](../../public/emails/)).

El flujo automático de inscripción y pago (bienvenida → inscrito → pagado) está documentado en [flujo-inscripcion.md](flujo-inscripcion.md).

## Pendiente

El copy de los emails de los flujos de pago ("Inscritos NO pagados" y "Pagados") no se llegó a escribir: solo está la estructura del flujo. Ver [flujo-inscripcion.md](flujo-inscripcion.md#estado-del-copy-de-los-flujos).

## Índice

### Automations

- [Email de bienvenida](automations/email-de-bienvenida-bienvenida.md) ([HTML](automations/email-de-bienvenida-bienvenida.html)): «Bienvenido a la comunidad PyCamp España 👋»
- [Inscritos NO pagados: Haz el pago](automations/inscritos-no-pagados-haz-el-pago.md) ([HTML](automations/inscritos-no-pagados-haz-el-pago.html)): «Haz el pago» (solo la plantilla, sin copy propio)

### Borradores

- [Qué es el PyCamp](drafts/que-es-el-pycamp.md) ([HTML](drafts/que-es-el-pycamp.html)): (sin asunto todavía)

### Campañas

Una por tipo, numeradas en el orden en que se envían a lo largo de una edición. De cada tipo se conserva la versión más reciente (o la más reutilizable); el año de la versión y la fecha original están en el encabezado de cada `.md`.

| # | Campaña | Cuándo | A quién | Asunto | Versión |
|---|---|---|---|---|---|
| 01 | [Anuncio de fecha y lugar](campaigns/01-anuncio-fecha-y-lugar.md) ([HTML](campaigns/01-anuncio-fecha-y-lugar.html)) | Al confirmar venue (meses antes) | Toda la newsletter | El PyCamp 🏕️ 2023 ya se siente | 2023 |
| 02 | [Apertura de entradas para PyCampistas anteriores](campaigns/02-apertura-entradas-pycampistas-anteriores.md) ([HTML](campaigns/02-apertura-entradas-pycampistas-anteriores.html)) | ~1 semana antes de la apertura general | Grupos *Asistentes YYYY* | ¡Ya están disponibles las entradas! 🎟️ | 2026 |
| 03 | [Apertura de entradas](campaigns/03-apertura-entradas.md) ([HTML](campaigns/03-apertura-entradas.html)) | Apertura general (febrero) | Toda la newsletter | ¡Ya están disponibles las entradas! 🎟️ | 2026 |
| 04 | [Recordatorio de entradas](campaigns/04-recordatorio-entradas.md) ([HTML](campaigns/04-recordatorio-entradas.html)) | Semanas después de la apertura | Toda la newsletter | ¡Ya falta poco para el PyCamp España 2025! 🏕️ | 2025 |
| 05 | [Camisetas](campaigns/05-camisetas.md) ([HTML](campaigns/05-camisetas.html)) | ~2 meses antes | Asistentes | ¡Consigue tu camiseta de PyCamp España antes del 12 de marzo! | 2024 |
| 06 | [Proponé un proyecto](campaigns/06-propone-un-proyecto.md) ([HTML](campaigns/06-propone-un-proyecto.html)) | ~1 mes antes | Asistentes | Proponé un proyecto para programar juntos 👪 | 2026 |
| 07 | [¿Qué llevo?](campaigns/07-que-llevo.md) ([HTML](campaigns/07-que-llevo.html)) | ~1 semana antes | Asistentes | ¿Qué debo llevar al PyCamp? | 2026 |
| 08 | [Proponé un proyecto (recordatorio)](campaigns/08-propone-un-proyecto-recordatorio.md) ([HTML](campaigns/08-propone-un-proyecto-recordatorio.html)) | ~5 días antes | Asistentes | Proponé un proyecto para programar juntos 👪 | 2026 |
| 09 | [Información PyBus](campaigns/09-informacion-pybus.md) ([HTML](campaigns/09-informacion-pybus.html)) | ~5 días antes | Asistentes | PyBus 🚌: información importante | 2026 |
| 10 | [¡Mañana es el gran día!](campaigns/10-manana-es-el-gran-dia.md) ([HTML](campaigns/10-manana-es-el-gran-dia.html)) | El día antes | Asistentes | ¡Mañana 🗓️ es el gran día! | 2023 |
