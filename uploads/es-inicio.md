# Inicio (Espanol) — start-mortgage.com/es

*Pagina: `/es` | Plataforma: WordPress + Elementor | Plantilla: Inviz Homepage | SEO: RankMath*

---

## RankMath SEO Settings

**Focus Keyword:** prestamos hipotecarios kissimmee
**Secondary Keywords:** hipoteca en espanol florida, prestamista bilingue kissimmee, corredor hipotecario kissimmee
**Page Title:** Prestamos Hipotecarios en Kissimmee, FL | Servicio Bilingue | START Mortgage
**Meta Description:** Mas de 50 familias ayudadas. 21 dias promedio de cierre. Corredor hipotecario bilingue en Kissimmee, FL. Reserve su sesion de planificacion gratis — sin costo, sin compromiso.
**URL Slug:** /es
**Canonical:** https://start-mortgage.com/es
**Schema Type:** LocalBusiness + WebSite + WebPage (configurar en RankMath > Schema, con `inLanguage: "es"`)

---

## hreflang Implementation

Agregar las siguientes etiquetas `<link>` en el `<head>` de AMBAS paginas:

```html
<!-- En / (homepage en ingles) -->
<link rel="alternate" hreflang="en" href="https://start-mortgage.com/" />
<link rel="alternate" hreflang="es" href="https://start-mortgage.com/es" />
<link rel="alternate" hreflang="x-default" href="https://start-mortgage.com/" />

<!-- En /es (homepage en espanol) -->
<link rel="alternate" hreflang="en" href="https://start-mortgage.com/" />
<link rel="alternate" hreflang="es" href="https://start-mortgage.com/es" />
<link rel="alternate" hreflang="x-default" href="https://start-mortgage.com/" />
```

**Plugin:** Usar WPML, Polylang, o hreflang Tags Lite para manejar esto automaticamente. Si se implementa manualmente, agregar via RankMath > Edit Snippet > Code o codigo personalizado en el `<head>` de Elementor.

---

## Breadcrumb

```
Inicio
```

*(Pagina raiz en espanol — no muestra breadcrumb padre.)*

---

## Elementor Section-by-Section Copy

Cada seccion se mapea a la plantilla Inviz Homepage. Los nombres de seccion hacen referencia tanto al layout de Inviz como al proposito del contenido.

---

### SECCION 1: Header

*Mapea a: Inviz Header — Logo izquierda, navegacion centro, boton CTA derecha*

**Barra de Utilidad Superior (agregar encima del nav):**
(689) 210-3448 | Hablamos Espanol | NMLS# 2718409

**Navegacion:**

```
[START Mortgage Logo]   Nosotros   Como Funciona   Programas ▾   Compradores   Recursos ▾   [Reserva Tu Sesion]
```

**Dropdown Programas:**
- Prestamos FHA -> /loan-programs/fha
- Prestamos Convencionales -> /loan-programs/conventional
- Prestamos VA -> /loan-programs/va
- Prestamos USDA -> /loan-programs/usda
- Ver todos los programas -> /loan-programs

**Dropdown Recursos:**
- Blog -> /blog
- Preguntas Frecuentes -> /faq
- Calculadora Hipotecaria -> /mortgage-calculator
- Resenas -> /reviews
- Agentes de Bienes Raices -> /realtors

**Boton CTA:** Reserva Tu Sesion -> /es/sesion-de-planificacion

**Toggle de idioma:** Agregar toggle visible EN/ES en el header nav que conecte / y /es bidireccionalmente.

---

### SECCION 2: Hero

*Mapea a: Inviz Hero — Layout dividido: titular + subtitulo + 2 CTAs izquierda, imagen derecha. Barra de confianza/logos debajo.*

**H1 (Heading):**
Tu Hogar Comienza Con la Guia Correcta

**Subheadline (Text Editor):**
START Mortgage es el corredor hipotecario bilingue de Kissimmee. Le guiamos paso a paso por todo el proceso — en espanol — para que cierre con claridad, no con confusion.

**Primary CTA (Button):**
Reserva Tu Sesion de Planificacion Gratis
*(Enlaza a /es/sesion-de-planificacion)*

**Secondary CTA (Enlace de texto debajo del boton):**
o Comienza Tu Pre-Aprobacion
*(Enlaza a /es/pre-aprobacion)*

**Linea de apoyo (texto pequeno debajo de CTAs):**
Consulta gratis. Sin revision de credito. Sin compromiso.

**Imagen del Hero:** Foto profesional de Jexayra Rivera (reemplazar foto de empresario de Inviz).

**Barra de Confianza (debajo del hero — reemplaza barra de logos de Inviz):**

| Numero | Etiqueta |
|--------|----------|
| 9+ | Anos de experiencia |
| 21 | Dias promedio de cierre |
| 5.0 | Calificacion de clientes |
| 100% | Servicio bilingue (EN/ES) |

---

### SECCION 3: Seccion de Caracteristicas

*Mapea a: Inviz Features Section — 2 columnas: texto izquierda, 3 imagenes apiladas derecha. 3 tarjetas de caracteristicas debajo.*

**Texto Columna Izquierda:**

**Section Tag (texto pequeno encima del encabezado):**
Por que las familias eligen START Mortgage

**H2:**
Un Corredor Hipotecario Que lo Pone a Usted Primero — No un Banco Que lo Pone en Fila

**Body Copy:**
Los bancos grandes le ofrecen un solo prestamo. Los prestamistas en linea le dan un numero, no un plan. Ninguno se toma el tiempo de explicarle lo que todo significa.

Como corredor hipotecario, comparamos opciones de multiples prestamistas para encontrar lo que mejor funciona para usted. Y le explicamos cada detalle — en el idioma en que usted se siente mas comodo.

Esa es la diferencia START Mortgage.

**Columna Derecha (3 imagenes apiladas):**
- Foto 1: Jexayra en su escritorio revisando documentos
- Foto 2: Jexayra con un cliente (dia de cierre o consulta)
- Foto 3: Familia recibiendo llaves o en la mesa de cierre

**3 Tarjetas de Caracteristicas Debajo:**

**Tarjeta 1:**
**Icono:** Burbuja de dialogo / bilingue
**H3:** Bilingue Desde el Primer Dia
**Body:** Servicio completo en ingles y espanol — no solo traduccion, sino comprension cultural real. Nada se pierde. Nada se siente confuso.

**Tarjeta 2:**
**Icono:** Escudo / marca de verificacion
**H3:** Pre-Aprobaciones Que Se Cumplen
**Body:** No emitimos cartas de pre-aprobacion que no podamos cerrar. Cuando los agentes de bienes raices ven nuestra carta, saben que su oferta es solida.

**Tarjeta 3:**
**Icono:** Reloj / comunicacion
**H3:** Siempre Sabra Donde Esta Su Prestamo
**Body:** Sin desaparecer. Sin jerga. Solo actualizaciones claras y respuestas honestas — en su tiempo, no en el nuestro.

---

### SECCION 4: Ejecutivo / Presentacion

*Mapea a: Inviz Executive/About Section — Texto + puntos + CTA + imagen de fondo.*

**Section Tag (texto pequeno encima del encabezado):**
Conozca a su guia

**H2:**
9 Anos de Experiencia. Una Mision: Que Usted Entienda Todo.

**Body Copy:**
Jexayra Rivera ha ayudado a mas de 50 familias a ser duenas de su casa en dos estados. Nacio en Puerto Rico. Habla espanol e ingles con fluidez. No solo traduce — entiende.

Ella fundo START Mortgage porque cree que usted merece una experiencia hipotecaria basada en honestidad, educacion y cuidado. No en presion. No en jerga. No en confusion.

**Puntos:**
- Servicio bilingue en espanol e ingles
- Mas de 50 familias guiadas a ser propietarias
- Licenciada en Florida con 9+ anos de experiencia

**CTA Button:**
Conozca Mas Sobre Jexayra
*(Enlaza a /about)*

**Imagenes de Fondo / Laterales (3 apiladas):**
- Foto profesional de Jexayra
- Jexayra con un cliente o en la oficina
- Foto casual / comunitaria de Jexayra

---

### SECCION 5: Estadisticas / Contadores

*Mapea a: Inviz Statistics Section — 3 contadores.*

| Valor del Contador | Etiqueta |
|-------------------|----------|
| 50+ | Familias ayudadas |
| 21 | Dias promedio de cierre |
| 9+ | Anos de experiencia |

---

### SECCION 6: Tarjetas de Servicios (Programas de Prestamo)

*Mapea a: Inviz Services Section — Encabezado + cuerpo + 4 tarjetas + boton "More Service".*

**Section Tag:**
Programas de prestamo

**H2:**
Programas Hipotecarios Que Se Ajustan a Su Vida — No al Reves

**Body Copy:**
Como corredor hipotecario, tenemos acceso a multiples prestamistas y programas. Mas opciones para usted. Mas posibilidades de encontrar lo que necesita.

**4 Tarjetas de Servicio:**

| Titulo | Descripcion | Enlace |
|--------|-------------|--------|
| Prestamos FHA | Opciones de pago inicial bajo para compradores de primera vez y personas con credito en desarrollo. | /loan-programs/fha |
| Prestamos Convencionales | Terminos flexibles y tasas competitivas para compradores calificados. | /loan-programs/conventional |
| Prestamos VA | Cero pago inicial para veteranos elegibles, militares activos y conyuges sobrevivientes. | /loan-programs/va |
| Prestamos USDA | Sin pago inicial para viviendas en areas rurales y suburbanas elegibles. | /loan-programs/usda |

**CTA Button:**
Ver Todos los Programas
*(Enlaza a /loan-programs)*

---

### SECCION 7: Formulario de Cita

*Mapea a: Inviz Appointment Section — Encabezado + cuerpo + formulario Nombre/Email/Mensaje + direccion/telefono.*

**H2:**
Listo Para Dar el Primer Paso?

**Body Copy:**
Reserve una sesion de planificacion gratis. Sin costo. Sin compromiso. Solo una conversacion clara sobre sus metas y sus opciones. Le decimos exactamente donde esta usted — y que viene despues.

**Campos del Formulario:**

| Etiqueta | Tipo |
|----------|------|
| Su Nombre | Texto |
| Su Correo | Email |
| Su Telefono | Telefono |

**Boton de Envio:** Reserva Mi Sesion de Planificacion

**Debajo del boton (texto pequeno):**
Consulta gratis. Sin revision de credito. Sin compromiso. Hablamos espanol.

**Info de Contacto (lado derecho del formulario):**
- 112 N Clyde Ave, Kissimmee, FL 34741
- (689) 210-3448
- jexayra.rivera@start-mortgage.com

---

### SECCION 8: Miembros del Equipo (Reutilizado como Tarjetas de Ruta por Audiencia)

*Mapea a: Inviz Team Members Section — 5 tarjetas con fotos, nombres, titulos, bios.*

*Reutilizar: En vez de perfiles de equipo, usar estas tarjetas para dirigir a los visitantes al camino correcto segun su situacion.*

**Section Tag:**
A quien ayudamos

**H2:**
No Importa Su Situacion — Hay un Camino Para Usted

| Titulo | Subtitulo | Descripcion | Enlace |
|--------|-----------|-------------|--------|
| Compradores de Primera Vez | Su primera casa, paso a paso | Es su primera casa? Le guiamos en cada paso para que el proceso se sienta simple, no aterrador. | /first-time-buyers |
| Refinanciamiento | Pagos mas bajos, mejores condiciones | Quiere una mejor tasa o un pago mas bajo? Le mostramos los numeros para que decida con confianza. | /loan-programs |
| Trabajadores Independientes | Su historia de ingresos, entendida | Un banco lo rechazo? Nosotros trabajamos con prestamistas que entienden los ingresos de trabajadores independientes. | /es/sesion-de-planificacion |
| Veteranos y Militares | Su servicio, honrado | Usted sirvio a este pais. Dejenos ayudarle a usar sus beneficios VA para comprar sin pago inicial. | /loan-programs/va |
| Agentes de Bienes Raices | Cierres que se cumplen, siempre | Busca un oficial de prestamos que se comunique, cierre a tiempo y hable espanol? Trabajemos juntos. | /realtors |

**Nota de Imagen:** Reemplazar fotos de rostros con iconos relevantes (casa, dolar, portafolio, bandera, apreton de manos).

---

### SECCION 9: Seccion de Blog

*Mapea a: Inviz Blog Section — 3 tarjetas de blog con imagen, categoria, titulo, "Read More."*

**Section Tag:**
Aprenda antes de actuar

**H2:**
Respuestas Hipotecarias — Escritas Para Personas Reales

| Titulo del Blog | Categoria | Enlace |
|-----------------|-----------|--------|
| Que Es la Pre-Aprobacion Hipotecaria? (Y Por Que la Necesita Antes de Buscar Casa) | Compradores | /blog/what-is-pre-approval |
| 7 Errores de Compradores de Primera Vez (Y Como Evitarlos) | Compradores | /blog/first-time-buyer-mistakes |
| FHA vs. Convencional: Cual Es el Correcto Para Usted? | Programas | /blog/fha-vs-conventional |

**Nota de Imagen:** Reemplazar imagenes de stock financieras con fotos de compra de casa / proceso hipotecario.

---

### SECCION 10: CTA en Espanol (Bloque Bilingue)

*Mapea a: Inviz Newsletter CTA Section — Banner a ancho completo + encabezado + formulario de email.*

*Reutilizar: Reemplazar el formulario de email con un bloque CTA en ingles para visitantes bilingues.*

**H2:**
Also Available in English

**Body Copy:**
Our full website and mortgage services are available in English. If you prefer to continue in English, or want to share this page with someone who speaks English, visit our main site.

**CTA Button:**
Visit English Site
*(Enlaza a /)*

**Texto de apoyo (pequeno):**
All services available in both English and Spanish.

---

### SECCION 11: Bloque Final de CTA

*Mapea a: Seccion adicional de cierre — Ancho completo, fondo fuerte, CTA centrado.*

**Section Tag:**
De el primer paso

**H2:**
Listo Para Dar el Primer Paso Hacia Su Casa?

**Body Copy:**
Reserve una sesion de planificacion gratis. Sin costo. Sin compromiso. Solo una conversacion clara sobre sus metas y sus opciones.

Le decimos exactamente donde esta usted hoy — y que sigue despues.

No le vamos a presionar. No le vamos a juzgar. Le vamos a escuchar, le vamos a explicar y le vamos a guiar.

**Primary CTA Button:**
Reserva Tu Sesion de Planificacion Gratis
*(Enlaza a /es/sesion-de-planificacion)*

**Texto de apoyo:**
O llamenos al (689) 210-3448 — hablamos espanol.

---

### SECCION 12: Footer

*Mapea a: Inviz Footer — 4 columnas + cumplimiento + social + copyright.*

**Columna 1:** Comenzar

| Etiqueta | Enlaza A |
|----------|----------|
| Sesion de Planificacion | /es/sesion-de-planificacion |
| Pre-Aprobacion | /es/pre-aprobacion |
| Programas de Prestamos | /loan-programs |

**Columna 2:** Recursos

| Etiqueta | Enlaza A |
|----------|----------|
| Blog | /blog |
| Calculadora Hipotecaria | /mortgage-calculator |
| Guia Para Compradores | /first-time-buyers |
| Agentes de Bienes Raices | /realtors |

**Columna 3:** Empresa

| Etiqueta | Enlaza A |
|----------|----------|
| Sobre Nosotros | /about |
| Resenas | /reviews |
| Contacto | /contact |
| NMLS Consumer Access | https://nmlsconsumeraccess.org |

**Columna 4:** Contacto

| Info |
|------|
| 112 N Clyde Ave, Kissimmee, FL 34741 |
| (689) 210-3448 |
| jexayra.rivera@start-mortgage.com |

**Compliance Block (required — in English):**

```
Lend Labs LLC d/b/a START Mortgage | NMLS# 2718409
112 N Clyde Ave, Kissimmee, FL 34741
Licensed Mortgage Broker - State of Florida | Equal Housing Opportunity
Jexayra Rivera | Branch Manager | NMLS# 1631454

Lend Labs LLC d/b/a START Mortgage is a licensed mortgage broker and does not
make credit decisions. All loans are originated and funded by approved lending
partners. This is not a commitment to lend. Programs, rates, terms, and
conditions are subject to change without notice. Not all products are available
in all states or for all amounts. Other restrictions and limitations may apply.
NMLS Consumer Access: nmlsconsumeraccess.org
```

**Barra Inferior:**
- Logo de START Mortgage
- Iconos Sociales: Facebook, Instagram
- (c) 2026 START Mortgage. Todos los derechos reservados.

---

## Schema Markup (JSON-LD)

Add via RankMath > Schema or paste into Elementor custom code widget in `<head>`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MortgageBroker",
      "@id": "https://start-mortgage.com/#organization",
      "name": "START Mortgage",
      "legalName": "Lend Labs LLC d/b/a START Mortgage",
      "url": "https://start-mortgage.com",
      "telephone": "+1-689-210-3448",
      "email": "jexayra.rivera@start-mortgage.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "112 N Clyde Ave",
        "addressLocality": "Kissimmee",
        "addressRegion": "FL",
        "postalCode": "34741",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.2919",
        "longitude": "-81.4076"
      },
      "areaServed": {
        "@type": "State",
        "name": "Florida"
      },
      "knowsLanguage": ["en", "es"],
      "sameAs": [
        "https://www.instagram.com/start.mortgage"
      ],
      "employee": {
        "@type": "Person",
        "@id": "https://start-mortgage.com/#jexayra",
        "name": "Jexayra Rivera",
        "jobTitle": "Branch Manager",
        "telephone": "+1-414-544-0273",
        "knowsLanguage": ["en", "es"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://start-mortgage.com/#website",
      "name": "START Mortgage",
      "url": "https://start-mortgage.com",
      "publisher": { "@id": "https://start-mortgage.com/#organization" },
      "inLanguage": ["en", "es"]
    },
    {
      "@type": "WebPage",
      "@id": "https://start-mortgage.com/es",
      "name": "Prestamos Hipotecarios en Kissimmee, FL | Servicio Bilingue | START Mortgage",
      "description": "Mas de 50 familias ayudadas. 21 dias promedio de cierre. Corredor hipotecario bilingue en Kissimmee, FL. Reserve su sesion de planificacion gratis — sin costo, sin compromiso.",
      "isPartOf": { "@id": "https://start-mortgage.com/#website" },
      "about": { "@id": "https://start-mortgage.com/#organization" },
      "inLanguage": "es"
    }
  ]
}
```

---

## Internal Linking Map

| Texto Ancla | Enlaza A | Notas |
|-------------|----------|-------|
| Reserva Tu Sesion de Planificacion Gratis | /es/sesion-de-planificacion | CTA principal — aparece en Secciones 2, 7, 11 |
| Comienza Tu Pre-Aprobacion | /es/pre-aprobacion | CTA secundario |
| Conozca Mas Sobre Jexayra | /about | Seccion 4 |
| Compradores de Primera Vez | /first-time-buyers | Seccion 8 (ingles — actualizar a espanol cuando exista) |
| Refinanciamiento | /loan-programs | Seccion 8 |
| Trabajadores Independientes | /es/sesion-de-planificacion | Seccion 8 |
| Veteranos y Militares | /loan-programs/va | Seccion 8 |
| Agentes de Bienes Raices | /realtors | Seccion 8 |
| Ver Todos los Programas | /loan-programs | Seccion 6 |
| Visit English Site | / | Seccion 10 |

**Nota:** Paginas que enlazan a paginas solo en ingles (como /first-time-buyers, /loan-programs, /reviews) deben actualizarse a versiones en espanol cuando se construyan en fases futuras.

---

## Elementor Notes

- **Plantilla:** Usa plantilla Inviz Homepage. Mapear secciones 1-12 a las secciones correspondientes de Inviz.
- **Un CTA principal por seccion.** "Reserva Tu Sesion de Planificacion Gratis" es la accion principal. Aparece en Secciones 2, 7 y 11.
- **Seccion 10 esta intencionalmente en ingles.** Es el puente "Also Available in English" para hogares bilingues o referidos de idioma mixto.
- **Movil:** CTA del Hero debe ser sticky en movil. Numero de telefono siempre tappable. Agregar distintivo "Hablamos Espanol" cerca del numero de telefono.
- **Imagenes:** Usar fotos reales (Jexayra, oficina, dia de cierre con familias latinas). Evitar fotos de stock. La representacion importa para esta audiencia.
- **Nota cultural de imagenes:** Mostrar familias, no solo individuos. Incluir hogares multigeneracionales cuando sea posible. Esta audiencia frecuentemente toma decisiones de compra como familia.
- **Fuentes:** Mantener texto del cuerpo lo suficientemente grande para legibilidad (16px+ cuerpo, 40px+ H1). El texto en espanol tiende a ser mas largo que en ingles — probar largos de linea en movil.
- **Velocidad:** Comprimir todas las imagenes. Usar lazy load de Elementor. Mantener above-the-fold en menos de 3 segundos.
- **RankMath:** Configurar focus keyword a "prestamos hipotecarios kissimmee." Keywords secundarios: "hipoteca en espanol florida," "prestamista bilingue." Verificar puntaje verde. Agregar enlaces internos segun el mapa de arriba.
- **Toggle de idioma:** Agregar toggle visible EN/ES en el header nav (icono de bandera o enlace de texto) que conecte / y /es bidireccionalmente.
- **Atributo de idioma:** Asegurar que la pagina tenga `lang="es"` en el tag HTML para accesibilidad y SEO.
