# Directo CRM

Mini CRM para llevar seguimiento de clientes que compran por marketplaces y convertirlos a compra directa.

Funciona de dos formas:

- **Modo local:** guarda los datos en el navegador con `localStorage` usando la clave `directo-crm-v3`.
- **Modo Supabase:** activa login real con Supabase Auth y guarda los clientes en Supabase Database con Row Level Security.

La app sigue siendo estática y se puede publicar en GitHub Pages.

## Uso online

GitHub Pages:

https://carlosf2003.github.io/directo-crm/

Si `supabase-config.js` está vacío, la web muestra modo local. Si configuras Supabase, aparece pantalla de login y sincronización.

## Uso local

Abre `index.html` o `outputs/crm-marketplaces.html` con el navegador.

En Windows también puedes usar:

`outputs/Directo CRM Windows.bat`

En macOS también puedes usar:

`outputs/Directo CRM.app`

## Funciones principales

- Listado, agenda y pipeline Kanban.
- Historial de actividad por cliente.
- Actividad rápida desde listado, agenda y pipeline.
- Score comercial, clientes calientes y última actividad.
- Acciones rápidas: llamar, Outlook, WhatsApp, copiar datos y abrir web.
- Campos comerciales ampliados: CIF, web, ciudad, provincia, tipo, ticket, margen, probabilidad, comercial y motivo de pérdida.
- KPIs comerciales, valor ponderado, valor por estado, top clientes y top score.
- Importación flexible de JSON y CSV de marketplaces.
- Exportación JSON, CSV, Excel y seguimiento comercial.
- Datos demo ficticios para enseñar el CRM.
- Informe imprimible desde el navegador.
- Borrado completo de datos locales o de los datos del usuario conectado en Supabase.

Los botones de correo abren Outlook Web con destinatario, asunto y cuerpo preparados. La app no envía correos automáticamente porque sigue siendo frontend estático.

## Modo local

En modo local, los datos solo existen en el navegador/equipo donde se usan. Otra persona que abra el enlace público no ve tus datos locales ni puede modificarlos, salvo que use tu mismo navegador y perfil.

Haz copias con `Copia JSON` antes de cambiar de equipo o limpiar navegador.

## Activar Supabase

1. Crea un proyecto en Supabase.
2. En Supabase, entra en **Authentication > Providers > Email** y activa email/password.
3. Abre el editor SQL de Supabase.
4. Ejecuta completo el archivo `supabase-schema.sql`.
5. Copia `supabase-config.example.js` como `supabase-config.js`.
6. Rellena:

```js
window.DIRECTO_CRM_SUPABASE = {
  url: "https://tu-proyecto.supabase.co",
  anonKey: "tu-anon-key-publica"
};
```

La `anonKey` es pública por diseño en Supabase. No subas nunca una `service_role key`, contraseñas, `.env` ni claves privadas.

Si publicas desde `/docs` en GitHub Pages, actualiza también `docs/supabase-config.js`.

## Seguridad

La seguridad real está en `supabase-schema.sql`, no en el frontend. Ese SQL activa RLS y crea políticas para que cada usuario autenticado solo pueda leer, crear, editar y borrar sus propios leads.

No uses datos reales en Supabase hasta haber ejecutado las políticas RLS.

## Migrar datos locales a Supabase

Al iniciar sesión, si el navegador tiene datos en `directo-crm-v3`, el CRM pregunta:

- `fusionar`: une datos locales y nube evitando duplicados por ID, email, pedido marketplace o empresa/teléfono.
- `reemplazar`: sube los datos locales y deja la nube igual que el navegador.
- `descargar`: descarga una copia JSON de la nube y mantiene lo local como backup.
- `ignorar`: no migra en ese momento.

El CRM no borra automáticamente `localStorage` después de migrar.

## Probar login

1. Configura Supabase y ejecuta `supabase-schema.sql`.
2. Abre la app.
3. Crea una cuenta con email y contraseña.
4. Crea un cliente, edítalo, añade actividad y cambia estado.
5. Cierra sesión y vuelve a entrar.
6. Comprueba que los datos siguen ahí.
7. Crea otro usuario y verifica que no ve los datos del primero.

## Publicación en GitHub Pages

El proyecto mantiene `index.html` y `docs/index.html` sincronizados. Si GitHub Pages publica desde `/docs`, la versión pública sale de `docs/index.html`.

Archivos importantes:

- `index.html`
- `docs/index.html`
- `supabase-config.js`
- `docs/supabase-config.js`
- `supabase-config.example.js`
- `supabase-schema.sql`
- `.nojekyll`
- `docs/.nojekyll`

## Canales incluidos

- Amazon
- PC Componentes
- LEEDS FRIO
- ManoMano
- Marketplace otro
- Referido
- Web propia

## Limitaciones pendientes

- Sin backend propio: las operaciones de datos dependen de Supabase JS y RLS.
- Sin envío masivo real de emails desde el CRM: abre Outlook Web para preparar correos.
- El modo local no sincroniza entre equipos.
- Si configuras Supabase en un repositorio público, la anon key será visible; esto es correcto, pero RLS debe estar bien aplicado.
