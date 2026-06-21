# Directo CRM

Mini CRM para llevar seguimiento de clientes que compran por marketplaces y convertirlos a compra directa.

## Aviso de datos

Los datos se guardan en el navegador de cada equipo mediante localStorage. Haz copias de seguridad periódicas. Para datos sensibles, varios usuarios o control de acceso real, se recomienda una versión con login y base de datos.

## Uso online

Abre la URL pública de GitHub Pages:

https://carlosf2003.github.io/directo-crm/

## Uso local

Abre `index.html` o `outputs/crm-marketplaces.html` con el navegador.

En Windows también puedes usar:

`outputs/Directo CRM Windows.bat`

En macOS también puedes usar:

`outputs/Directo CRM.app`

## Datos

Los datos se guardan en el navegador del equipo donde se usa la app. No se sincronizan solos entre ordenadores.

Para mover datos o hacer copia de seguridad:

- `JSON`: copia completa para importar de nuevo en el CRM.
- `Excel`: exportación legible para trabajar en Excel.
- `CSV`: exportación compatible con hojas de cálculo.
- `Seguimiento`: CSV comercial con score, próxima acción, última actividad y última nota.
- `Borrar datos`: elimina todos los clientes guardados en ese navegador.

La `X` del listado solo limpia filtros; no borra clientes.

El importador acepta CSV separado por comas o por punto y coma, y salta filas vacías antes de los encabezados.

## Funciones principales

- Listado, agenda y pipeline Kanban.
- Historial de actividad por cliente.
- Actividad rápida desde listado, agenda y pipeline.
- Score comercial, clientes calientes y última actividad.
- Acciones rápidas: llamar, Outlook, WhatsApp, copiar datos y abrir web.
- Campos comerciales ampliados: CIF, web, ciudad, provincia, tipo, ticket, margen, probabilidad, comercial y motivo de pérdida.
- KPIs comerciales, valor ponderado, valor por estado, top clientes y top score.
- Importación flexible de CSV de marketplaces.
- Datos demo ficticios para enseñar el CRM.
- Informe imprimible desde el navegador.

Los botones de correo abren Outlook Web con destinatario, asunto y cuerpo preparados. La app no envía correos automáticamente porque sigue siendo 100% estática.

## Canales incluidos

- Amazon
- PC Componentes
- LEEDS FRIO
- ManoMano
- Marketplace otro
- Referido
- Web propia
