# Pre-Aprobacion — start-mortgage.com/es/pre-aprobacion

*Pagina: `/es/pre-aprobacion` | Plataforma: WordPress + Elementor | Plantilla: Inviz Contact | SEO: RankMath*

---

## RankMath SEO Settings

**Focus Keyword:** pre aprobacion hipotecaria kissimmee
**Secondary Keywords:** como obtener pre aprobacion, pre aprobacion en espanol, carta de pre aprobacion florida
**Page Title:** Pre-Aprobacion Hipotecaria en Kissimmee, FL | START Mortgage
**Meta Description:** Obtenga su pre-aprobacion hipotecaria en Kissimmee con START Mortgage. Servicio en espanol, comparamos multiples prestamistas, y solo emitimos cartas que podemos cerrar. Comience hoy.
**URL Slug:** pre-aprobacion (bajo /es/)
**Canonical:** https://start-mortgage.com/es/pre-aprobacion
**Schema Type:** Service + FAQPage + BreadcrumbList (configurar en RankMath > Schema, con inLanguage: "es")

---

## hreflang Implementation

Agregar en el `<head>` de AMBAS paginas:

```html
<!-- En /pre-approval (ingles) -->
<link rel="alternate" hreflang="en" href="https://start-mortgage.com/pre-approval/" />
<link rel="alternate" hreflang="es" href="https://start-mortgage.com/es/pre-aprobacion/" />
<link rel="alternate" hreflang="x-default" href="https://start-mortgage.com/pre-approval/" />

<!-- En /es/pre-aprobacion (espanol) -->
<link rel="alternate" hreflang="en" href="https://start-mortgage.com/pre-approval/" />
<link rel="alternate" hreflang="es" href="https://start-mortgage.com/es/pre-aprobacion/" />
<link rel="alternate" hreflang="x-default" href="https://start-mortgage.com/pre-approval/" />
```

---

## Breadcrumb

```
Inicio > Pre-Aprobacion
```

*(Renderizado via RankMath breadcrumb shortcode o Elementor breadcrumb widget. Schema manejado en JSON-LD abajo.)*

---

## Elementor Section-by-Section Copy

Cada seccion se mapea a la plantilla Inviz Contact. Los nombres de seccion hacen referencia tanto al layout de Inviz como al proposito del contenido.

---

### SECCION 1: Hero (Encima del Pliegue)

*Mapea a: Inviz Contact Hero — Dos columnas: texto izquierda (60%), formulario/embed derecha (40%). En movil, texto arriba y formulario debajo.*

**Section Tag (texto pequeno sobre el encabezado):**
Pre-aprobacion hipotecaria

**H1 (Heading):**
Sepa Exactamente Cuanto Puede Pagar Antes de Buscar Casa

**Subheadline (Text Editor):**
Una pre-aprobacion le dice su presupuesto real, le demuestra a los vendedores que usted va en serio, y le da ventaja sobre otros compradores. Le explicamos todo paso a paso — en espanol.

**Primary CTA (Button):**
Comienza Tu Pre-Aprobacion

*(Activa formulario popup de aplicacion. Placeholder: formulario popup actual. Sera reemplazado por LendingPad cuando este disponible.)*

**Secondary CTA (Enlace de texto debajo del boton):**
o Reserva Tu Sesion de Planificacion para hablarlo primero
*(Enlaza a /es/sesion-de-planificacion)*

**Linea de apoyo (texto pequeno debajo de los CTAs):**
Gratis. Sin compromiso. Sujeto a aprobacion de credito.

---

### SECCION 2: Formulario de Aplicacion

*Mapea a: Inviz Contact — Appointment Form. Formulario en columna derecha del hero (desktop) o apilado debajo en movil. Tarjeta blanca con sombra ligera.*

**Encabezado del Formulario (H3):**
Comience Su Pre-Aprobacion

**Campos del Formulario (Elementor Pro Form widget):**

| Campo | Tipo | Requerido | Placeholder |
|-------|------|-----------|-------------|
| Nombre | Texto | Si | Su nombre completo |
| Correo | Email | Si | Su correo electronico |
| Telefono | Telefono | Si | Su numero de telefono |
| Mensaje | Textarea | No | Cuentenos sobre su situacion o lo que busca |

**Boton de Envio:**
Enviar Mi Solicitud

**Debajo del formulario (texto pequeno):**
Respondemos dentro de un dia habil. Generalmente el mismo dia.

**Configuracion del Formulario:**
- Enviar a: jexayra.rivera@start-mortgage.com
- Asunto: "Nueva Solicitud de Pre-Aprobacion: [Nombre]"
- Redirigir despues de enviar: /es/pre-aprobacion (misma pagina con mensaje de exito)
- Mensaje de exito: "Recibimos su solicitud. Le contactaremos dentro de un dia habil para los siguientes pasos."

**Nota Elementor:** Si el widget de LendingPad esta activo, reemplazar este formulario con la aplicacion embebida. Mantener el formulario como respaldo.

---

### SECCION 3: Por Que la Pre-Aprobacion Es Importante

*Mapea a: Inviz Contact — Seccion de contenido debajo del hero. Dos columnas: texto izquierda, imagen derecha.*

**Section Tag:**
Por que importa

**H2:**
La Pre-Aprobacion Le Da Poder en un Mercado Competitivo

**Body Copy (Text Editor):**
Tal vez ha escuchado que necesita una "pre-aprobacion" para comprar casa. Pero, que significa eso?

Una pre-aprobacion es una revision de sus finanzas — sus ingresos, su credito, sus ahorros — para determinar cuanto puede pagar por una casa. No es una promesa. Es una verificacion real, respaldada por numeros.

**Con una carta de pre-aprobacion, usted:**

- **Conoce su presupuesto real** — nada de adivinanzas ni sorpresas de ultimo momento
- **Le demuestra al vendedor que es un comprador serio** — su oferta tiene mas peso
- **Le da confianza a su agente de bienes raices** — puede negociar sabiendo que su financiamiento es solido
- **Se mueve mas rapido cuando encuentra la casa correcta** — ya lleva un paso adelante

Sin una pre-aprobacion, la mayoria de los agentes de bienes raices no le mostraran casas. Y en un mercado donde las buenas casas se venden rapido, estar listo hace la diferencia.

---

### SECCION 4: Pre-Aprobacion vs. Pre-Calificacion

*Mapea a: Inviz Contact — Seccion informativa. Comparacion en dos columnas o tabla.*

**Section Tag:**
Conozca la diferencia

**H2:**
Pre-Aprobacion y Pre-Calificacion No Son lo Mismo

**Body Copy (intro):**
Estos dos terminos suenan parecidos. Pero no lo son. Aqui le explicamos la diferencia en palabras simples.

**Comparacion (tabla de Elementor o tarjetas en dos columnas):**

| | Pre-Calificacion | Pre-Aprobacion |
|---|---|---|
| **Que es** | Un estimado basado en lo que usted nos dice | Una revision verificada de sus ingresos, credito y finanzas |
| **Documentos necesarios** | Ninguno | Talones de pago, declaraciones de impuestos, estados de cuenta |
| **Revision de credito** | Generalmente no | Si — con su permiso |
| **Como lo ve el vendedor** | "Tal vez pueda pagar esto" | "Si puede pagar esto — los numeros lo confirman" |
| **Cuanto toma** | Unos minutos | Generalmente 24-48 horas |
| **Fuerza de su oferta** | Debil | Fuerte |

**Body Copy (debajo de la tabla):**
Una pre-calificacion es una conversacion. Una pre-aprobacion es una prueba. Nosotros le ayudamos a obtener la prueba.

**CTA (Button):**
Comienza Tu Pre-Aprobacion
*(Activa formulario popup de aplicacion)*

---

### SECCION 5: Que Necesita (Lista de Documentos)

*Mapea a: Inviz Contact — Seccion de informacion adicional. Columna unica con checklist.*

**Section Tag:**
Que tener listo

**H2:**
Lista Sencilla: Documentos Para Su Pre-Aprobacion

**Body Copy (intro):**
No necesita tener todo perfecto antes de empezar. Pero tener estos documentos listos nos ayuda a avanzar mas rapido. Los requisitos varian segun su situacion — Jexayra le explicara lo que necesita en su caso.

**Checklist (Elementor icon list con iconos de checkmark):**

- Talones de pago recientes (ultimos 30 dias)
- Formularios W-2 o 1099 (ultimos 2 anos)
- Declaraciones de impuestos federales (ultimos 2 anos)
- Estados de cuenta bancarios (ultimos 2 meses)
- Identificacion con foto emitida por el gobierno (licencia de conducir o pasaporte)
- Numero de Seguro Social o ITIN (para revision de credito, con su permiso)

**Body Copy (debajo de la lista):**

**Trabaja por cuenta propia?** No hay problema. Trabajamos con prestamistas que aceptan estados de cuenta bancarios y documentacion alternativa de ingresos. Traiga lo que tenga — nosotros le guiamos desde ahi.

**No tiene numero de Seguro Social?** Algunos de nuestros socios prestamistas ofrecen programas para compradores que usan ITIN (Numero de Identificacion Personal del Contribuyente). Jexayra le explicara las opciones para su situacion.

**No esta seguro de que documentos necesita?** Cada situacion es diferente. Comience la solicitud y le diremos que hace falta.

---

### SECCION 6: Por Que Nuestra Pre-Aprobacion Es Diferente

*Mapea a: Inviz Contact — Seccion de diferenciacion. Texto izquierda, imagen derecha.*

**Section Tag:**
La diferencia START

**H2:**
No Emitimos Pre-Aprobaciones Que No Podemos Cerrar

**Body Copy (Text Editor):**
Esto es lo mas importante que debe saber sobre como trabajamos.

Algunos prestamistas entregan cartas de pre-aprobacion como si fueran volantes. Le aprueban en papel — y despues el trato se cae. El vendedor se va con otro comprador. Su agente pierde la confianza. Usted pierde la casa.

**Nosotros lo hacemos diferente.**

Antes de emitir una carta, revisamos su situacion financiera completa. Verificamos ingresos. Revisamos su credito. Nos aseguramos de que los numeros funcionen — no solo en papel, sino hasta el cierre.

**Cuando usted recibe una carta de START Mortgage, significa algo.** Los agentes de bienes raices en Central Florida lo saben. Los vendedores lo saben. Y usted puede hacer su oferta con confianza.

**Como corredor hipotecario, comparamos opciones de multiples prestamistas.** No estamos limitados a los programas de un solo banco. Encontramos la opcion correcta para su situacion.

**Servicio completamente en espanol.** No va a tener que adivinar lo que dice un documento. Jexayra habla su idioma y le explica cada paso con claridad.

---

### SECCION 7: El Proceso — Como Funciona

*Mapea a: Inviz Contact — Seccion de pasos. Pasos numerados con linea de tiempo.*

**Section Tag:**
Como funciona

**H2:**
De la Solicitud a Su Carta de Pre-Aprobacion — 4 Pasos Sencillos

**Paso 1 — Envie Su Solicitud**
Llene una solicitud corta en linea. Toma unos 15 minutos. Le preguntamos sobre sus ingresos, su empleo y el tipo de casa que busca. Puede hacerlo todo en espanol.

**Paso 2 — Revisamos Sus Finanzas**
Revisamos su credito, ingresos y documentos. Sin juicios — solo un panorama claro de donde esta usted. Si falta algo, se lo decimos de inmediato.

**Paso 3 — Le Conectamos Con el Prestamista Correcto**
Como corredor, comparamos opciones de multiples socios prestamistas. Encontramos el programa y la tasa que se ajustan a sus metas — no solo lo que es mas facil para nosotros.

**Paso 4 — Recibe Su Carta de Pre-Aprobacion**
Una vez que todo se verifica, emitimos su carta. La mayoria estan listas en 24-48 horas. Despues, usted esta listo para buscar casas y hacer ofertas fuertes.

**Body Copy (debajo de los pasos):**
Tiene preguntas antes de aplicar? Para eso es nuestra sesion de planificacion gratis. Sin costo. Sin presion. Solo respuestas — en espanol.

**CTA (Enlace de texto):**
Reserva Tu Sesion de Planificacion -> /es/sesion-de-planificacion

---

### SECCION 8: Programas de Prestamo Disponibles

*Mapea a: Inviz Contact — Seccion de servicios. Cuadricula de 4 tarjetas.*

**Section Tag:**
Programas de prestamo

**H2:**
Pre-Aprobacion Disponible Para Todos los Programas Principales

**Body Copy (intro):**
Trabajamos con multiples prestamistas, lo que significa mas programas y mas opciones para usted.

**Cuatro Tarjetas:**

**Tarjeta 1: Prestamos FHA**
Opciones de pago inicial bajo desde 3.5%. Popular entre compradores de primera vez.
[Mas Informacion -> /loan-programs/fha]

**Tarjeta 2: Prestamos Convencionales**
Terminos flexibles y tasas competitivas para compradores con buen credito.
[Mas Informacion -> /loan-programs/conventional]

**Tarjeta 3: Prestamos VA**
Cero pago inicial para veteranos elegibles, militares activos y conyuges sobrevivientes.
[Mas Informacion -> /loan-programs/va]

**Tarjeta 4: Prestamos USDA**
Sin pago inicial para casas en areas rurales y suburbanas elegibles de Central Florida.
[Mas Informacion -> /loan-programs/usda]

**CTA (enlace de texto):**
Ver Todos los Programas de Prestamo -> /loan-programs

---

### SECCION 9: Testimonios

*Mapea a: Inviz Contact — Seccion de prueba social. Carrusel o tarjetas en 3 columnas.*

**Section Tag:**
Lo que dicen nuestros clientes

**H2:**
Familias Confian en Nosotros Para la Decision Financiera Mas Grande de Su Vida

**Testimonio 1:**
> "Jexayra fue sumamente agradable para trabajar. Me educo sobre como prepararme para ser propietario mucho antes de que empezaramos a trabajar juntos. Definitivamente la recomendaria."

**Testimonio 2:**
> "Durante el proceso de comprar nuestra nueva casa, Jexayra nos ayudo en todo momento, siempre nos mantuvo informados de lo que estaba pasando y nos explico cada detalle. La recomendaria a cualquier persona que quiera comprar una casa."

**Testimonio 3:**
> "Estuvo muy pendiente de todo y nos mantuvo informados durante todo el proceso."

**CTA (enlace de texto):**
Leer Mas Resenas -> /reviews

---

### SECCION 10: Preguntas Frecuentes (Acordeon)

*Mapea a: Inviz Contact — FAQ Section. Widget de Acordeon de Elementor.*

**Section Tag:**
Preguntas frecuentes

**H2:**
Pre-Aprobacion Hipotecaria: Sus Preguntas Respondidas

**P: Cuanto tiempo toma una pre-aprobacion?**
R: La mayoria estan listas en 24-48 horas despues de recibir sus documentos. Algunas toman mas si necesitamos papeles adicionales — pero le mantenemos informado en cada paso.

**P: La pre-aprobacion afecta mi credito?**
R: Si, hacemos una revision de credito como parte del proceso. Esto se llama una "consulta fuerte" y puede causar una baja temporal y pequena en su puntaje — generalmente unos pocos puntos. Si compara tasas con varios prestamistas dentro de 14 a 45 dias, las agencias de credito normalmente cuentan esas consultas como una sola.

**P: Cuanto tiempo dura la pre-aprobacion?**
R: La mayoria de las cartas son validas por 60-90 dias. Si vence antes de encontrar casa, generalmente podemos renovarla rapido — siempre y cuando su situacion financiera no haya cambiado mucho.

**P: La pre-aprobacion es lo mismo que la aprobacion final?**
R: No. La pre-aprobacion significa que revisamos sus finanzas y que es probable que califique. La aprobacion final ocurre despues de seleccionar una propiedad, hacer la tasacion, y pasar por la verificacion completa del prestamista. Como verificamos todo desde el principio, nuestras pre-aprobaciones son solidas.

**P: Que pasa si no me dan la pre-aprobacion?**
R: Esta bien. No significa "nunca" — generalmente significa "todavia no." Le explicamos que necesita cambiar y le damos un plan claro. Muchos clientes regresan en unos meses, listos para avanzar. Tambien lo podemos conectar con un socio de reparacion de credito.

---

### SECCION 11: Bloque Final de CTA

*Mapea a: Inviz Contact — CTA final. Ancho completo, fondo llamativo, centrado.*

**H2:**
Listo Para Saber Cuanto Puede Pagar?

**Body Copy:**
Comience su pre-aprobacion hoy. Es gratis, no hay compromiso, y la mayoria de las cartas estan listas en 24-48 horas.

Le guiamos paso a paso — todo en espanol.

**Primary CTA Button:**
Comienza Tu Pre-Aprobacion
*(Activa formulario popup de aplicacion)*

**Texto de apoyo:**
O llamenos al (689) 210-3448 | Hablamos espanol

---

### FOOTER

*(Usar el footer general del sitio — ver es-inicio.md para la especificacion completa del footer y bloque de cumplimiento.)*

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

Subject to credit approval.

NMLS Consumer Access: nmlsconsumeraccess.org
```

---

## Schema Markup (JSON-LD)

Add via RankMath > Schema or paste into Elementor custom code widget in `<head>`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://start-mortgage.com/es/pre-aprobacion/#service",
      "name": "Mortgage Pre-Approval",
      "description": "Get pre-approved for a mortgage in Kissimmee, FL. START Mortgage reviews your finances, compares lenders, and issues pre-approval letters that close. Full service in Spanish.",
      "provider": {
        "@type": "MortgageBroker",
        "@id": "https://start-mortgage.com/#organization",
        "name": "START Mortgage",
        "legalName": "Lend Labs LLC d/b/a START Mortgage",
        "url": "https://start-mortgage.com",
        "telephone": "+1-689-210-3448",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "112 N Clyde Ave",
          "addressLocality": "Kissimmee",
          "addressRegion": "FL",
          "postalCode": "34741",
          "addressCountry": "US"
        }
      },
      "areaServed": {
        "@type": "State",
        "name": "Florida"
      },
      "serviceType": "Mortgage Pre-Approval",
      "availableLanguage": ["es", "en"],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free mortgage pre-approval application"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://start-mortgage.com/es/pre-aprobacion/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does a mortgage pre-approval take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most pre-approvals are ready within 24-48 hours after we receive your documents. Some take longer if we need additional paperwork, but we keep you informed at every step."
          }
        },
        {
          "@type": "Question",
          "name": "Does pre-approval affect my credit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we run a credit check as part of the pre-approval process. This is a hard inquiry and may cause a small, temporary dip in your score — usually just a few points. If you are comparing rates with multiple lenders within a 14-45 day window, credit bureaus typically count those inquiries as one."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a pre-approval last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most pre-approval letters are valid for 60-90 days. If yours expires before you find a home, we can usually renew it quickly as long as your financial situation has not changed significantly."
          }
        },
        {
          "@type": "Question",
          "name": "Is pre-approval the same as final approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Pre-approval means we reviewed your finances and you are likely to qualify. Final approval happens after a property is selected, appraised, and your file passes full lender underwriting. Because we verify everything upfront, our pre-approvals are solid and reliable."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I do not get pre-approved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That is okay. It does not mean never — it usually means not yet. We explain exactly what needs to change and give you a clear plan to get there. Many of our clients come back in a few months, ready to move forward."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://start-mortgage.com/es/pre-aprobacion/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://start-mortgage.com/es/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pre-Aprobacion",
          "item": "https://start-mortgage.com/es/pre-aprobacion/"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://start-mortgage.com/es/pre-aprobacion/",
      "name": "Pre-Aprobacion Hipotecaria en Kissimmee, FL | START Mortgage",
      "description": "Obtenga su pre-aprobacion hipotecaria en Kissimmee con START Mortgage. Servicio en espanol, comparamos multiples prestamistas, y solo emitimos cartas que podemos cerrar. Comience hoy.",
      "isPartOf": { "@id": "https://start-mortgage.com/#website" },
      "about": { "@id": "https://start-mortgage.com/es/pre-aprobacion/#service" },
      "breadcrumb": { "@id": "https://start-mortgage.com/es/pre-aprobacion/#breadcrumb" },
      "inLanguage": "es"
    }
  ]
}
```

---

## Internal Linking Map

| Texto Ancla | Enlaza A |
|-------------|----------|
| Comienza Tu Pre-Aprobacion | Formulario popup (actual) / LendingPad (futuro) |
| Reserva Tu Sesion de Planificacion | /es/sesion-de-planificacion |
| Mas Informacion (FHA) | /loan-programs/fha |
| Mas Informacion (Convencional) | /loan-programs/conventional |
| Mas Informacion (VA) | /loan-programs/va |
| Mas Informacion (USDA) | /loan-programs/usda |
| Ver Todos los Programas de Prestamo | /loan-programs |
| Leer Mas Resenas | /reviews |

**Paginas que deben enlazar A esta pagina:**

| Desde Pagina | Texto Ancla Sugerido |
|--------------|---------------------|
| /es (Inicio espanol) | Comienza Tu Pre-Aprobacion |
| /es/como-funciona | Obtenga su pre-aprobacion |
| /es/sesion-de-planificacion | Comience su pre-aprobacion |
| /pre-approval (ingles) | hreflang alternate (automatico) |
| /first-time-buyers | Pre-aprobacion en espanol |
| /loan-programs (todos) | Comience su pre-aprobacion |

---

## Elementor Notes

- **Plantilla:** Usa plantilla Inviz Contact. Mapear secciones al layout de Contact (Hero con formulario, contenido informativo, FAQ, CTA final).
- **Un CTA principal por seccion.** "Comienza Tu Pre-Aprobacion" es la accion principal. Aparece en Secciones 1, 4 y 11.
- **CTA secundario** (Reserva Tu Sesion de Planificacion) aparece como enlace de texto solamente — nunca como boton que compita en la misma seccion.
- **Formulario de Pre-Aprobacion:** Todos los botones "Comienza Tu Pre-Aprobacion" deben usar el mismo ID de popup de Elementor para actualizar en un solo lugar. Fallback: enlazar a /es/sesion-de-planificacion si el popup falla.
- **Movil:** CTA del Hero debe ser sticky en movil. Numero de telefono siempre tappable.
- **Imagenes:** Usar fotos reales (Jexayra, clientes reales con permiso, oficina). Evitar fotos de stock.
- **Fuentes:** Texto del cuerpo minimo 16px. H1 a 40px+. H2 a 28-32px.
- **Velocidad:** Comprimir imagenes. Lazy load de Elementor. Above-the-fold en menos de 3 segundos.
- **FAQ Acordeon:** Usar widget de Accordion o Toggle. Primer item cerrado. Contenido del FAQ debe coincidir exactamente con el schema FAQPage.
- **RankMath:** Focus keyword "pre aprobacion hipotecaria kissimmee." Verificar puntaje verde.
- **Atributo de idioma:** Asegurar `lang="es"` en el tag HTML.
