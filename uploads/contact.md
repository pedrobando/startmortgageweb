# Contact Page — start-mortgage.com/contact

*Page: `/contact` | Platform: WordPress + Elementor | Template: Inviz Contact | SEO: RankMath*

---

## 301 Redirect Required

```
/connect-with-jexayra/ → /contact (301 permanent redirect)
```

Configure in RankMath > Redirections or via `.htaccess` / WordPress plugin.

---

## RankMath SEO Settings

**Focus Keyword:** contact mortgage broker kissimmee
**Page Title:** Contact START Mortgage | Kissimmee, FL Mortgage Broker
**Meta Description:** Get in touch with START Mortgage in Kissimmee, FL. Call, text, or send a message. Bilingual service in English and Spanish. (689) 210-3448.
**URL Slug:** /contact
**Schema Type:** LocalBusiness + BreadcrumbList + FAQPage (configure in RankMath > Schema)

---

## Breadcrumb

Home > Contact

---

## Elementor Section-by-Section Copy (Inviz Contact Template)

---

### SECTION 1: Hero — "Contact" Heading + Subheading + Body

**Layout:** Full-width hero. Clean, warm background. Centered or left-aligned text. No form in this section — form is in Section 2.

**H1:**
Let's Talk

**Subheadline:**
Have a question? Ready to get started? We're here — in English or Spanish.

**Body Copy:**
Whether you're buying your first home, looking to refinance, or just have a question — we'd love to hear from you. Reach out however works for you. We respond within one business day. Usually sooner.

---

### SECTION 2: Appointment Form — Heading + Name/Email/Message Form

**Layout:** White card with light shadow. Centered on page or right-aligned in a two-column layout. Form sits below the hero on mobile.

**Form Heading (H2):**
Send Us a Message

**Form Fields (Elementor Pro Form widget):**

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Name | Text | Yes | Your name |
| Email | Email | Yes | Your email |
| Phone | Phone | No | Your phone number |
| How can we help? | Dropdown | Yes | Select one... |
| Message | Textarea | No | Tell us a little about your situation |

**Dropdown Options (How can we help?):**
- Select one...
- Buying a home
- Refinancing
- Realtor partnership
- Credit questions
- Other

**Submit Button:**
Send Message

**Below form (small text):**
We respond within one business day. Usually sooner.

**Form Settings:**
- Send to: jexayra.rivera@start-mortgage.com
- Subject line: "New Contact Form: [Name]"
- Redirect after submit: /contact (same page with success message)
- Success message: "Thank you! We got your message and will be in touch soon."

---

### SECTION 3: Contact Info Cards (3 Cards) — Email, Phone, Address

**Layout:** Three cards in a row on desktop, stacking on mobile. Each card has an icon, heading, and contact detail. Light gray or white background.

**Section Tag:**
Reach us directly

**H2:**
We're Easy to Reach

**Card 1 — Phone**
- Icon: Phone
- H3: Call or Text
- Text: [(689) 210-3448](tel:6892103448)
- Supporting: Monday–Friday, 9am–6pm | Saturday by appointment

**Card 2 — Email**
- Icon: Envelope
- H3: Email
- Text: [jexayra.rivera@start-mortgage.com](mailto:jexayra.rivera@start-mortgage.com)
- Supporting: We reply within one business day.

**Card 3 — Office**
- Icon: Map Pin
- H3: Visit Our Office
- Text: 112 N Clyde Ave, Kissimmee, FL 34741
- Supporting: Se habla espanol. Bilingual service available.

---

### SECTION 4: Google Maps Embed

**Layout:** Full-width section. Address and hours on the left, Google Maps embed on the right. Map stacks below on mobile.

**H2:**
Find Us in Kissimmee

**Body Copy:**
Our office is in downtown Kissimmee. Stop by during business hours or call to set up a time.

**Address:**
112 N Clyde Ave
Kissimmee, FL 34741

**Hours:**
Monday–Friday: 9am–6pm
Saturday: By appointment
Sunday: Closed

**Google Maps Embed:**
*(Use Elementor Google Maps widget or embed code. Center on 112 N Clyde Ave, Kissimmee, FL 34741. Zoom level 15.)*

```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!...112+N+Clyde+Ave+Kissimmee+FL+34741..."
  width="100%"
  height="400"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  title="START Mortgage office location at 112 N Clyde Ave, Kissimmee, FL 34741">
</iframe>
```

---

### SECTION 5: FAQ Accordion (5 Items)

**Layout:** Accordion widget. Each question expands to show the answer. Clean, minimal styling.

**Section Tag:**
Common questions

**H2:**
Questions About Getting in Touch

**Q: What's the fastest way to reach you?**
A: Call or text us at [(689) 210-3448](tel:6892103448). For non-urgent questions, send us a message through the form above or email [jexayra.rivera@start-mortgage.com](mailto:jexayra.rivera@start-mortgage.com).

**Q: Do I need an appointment to visit your office?**
A: We recommend calling ahead so we can make sure someone is available for you. Walk-ins are welcome during business hours, but an appointment means you'll get our full attention.

**Q: Can I get help in Spanish?**
A: Yes. The entire process — from your first call to closing day — is available in Spanish. Documents, explanations, calls, everything. Nothing gets lost in translation.

**Q: I'm not ready to apply yet. Can I still reach out?**
A: Absolutely. Most people start with a question, not an application. Reach out whenever you're ready — even if that's just to ask one thing. No pressure. No commitment.

**Q: How quickly do you respond to messages?**
A: We respond within one business day. Most messages get a reply the same day. If your question is urgent, call or text us directly for the fastest response.

---

### SECTION 6: CTA + Email Form

**Layout:** Full-width, bold accent background. Centered text. High-contrast CTA button. Optional email subscription form below.

**H2:**
Ready to Take the First Step?

**Body Copy:**
Book a free planning session and we'll talk about your goals, your timeline, and your options. No cost. No pressure. Just a clear conversation about what's possible.

**Primary CTA Button:**
Book Your Free Planning Session → /planning-session

**Supporting text:**
Or call [(689) 210-3448](tel:6892103448) | Hablo Espanol

**Email Form (optional):**
- Heading: Get homeownership tips in your inbox
- Field: Email address
- Button: Subscribe
- Note: Market updates and homebuying insights. No spam. Unsubscribe anytime.

---

### SECTION 7: Footer

**Standard site footer. Includes:**

```
Lend Labs LLC d/b/a START Mortgage | NMLS# 2718409
Jexayra Rivera, Branch Manager | NMLS# 1631454
112 N Clyde Ave, Kissimmee, FL 34741
Licensed Mortgage Broker – State of Florida
Equal Housing Opportunity

Lend Labs LLC d/b/a START Mortgage is a licensed mortgage broker and does not make
credit decisions. All loans are originated and funded by approved lending partners.
This is not a commitment to lend. Programs, rates, terms, and conditions are subject
to change without notice. Not all products are available in all states or for all
amounts. Other restrictions and limitations may apply.

NMLS Consumer Access: nmlsconsumeraccess.org
```

---

## Schema Markup (JSON-LD)

Add via RankMath > Schema or Elementor custom code widget in `<head>`:

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
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "18:00",
          "description": "By appointment only"
        }
      ],
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
        "email": "jexayra.rivera@start-mortgage.com",
        "knowsLanguage": ["en", "es"]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What's the fastest way to reach START Mortgage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Call or text us at (689) 210-3448. For non-urgent questions, send us a message through the contact form or email jexayra.rivera@start-mortgage.com."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an appointment to visit the START Mortgage office?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We recommend calling ahead so we can make sure someone is available for you. Walk-ins are welcome during business hours, but an appointment means you'll get our full attention."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get mortgage help in Spanish?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The entire process — from your first call to closing day — is available in Spanish. Documents, explanations, calls, everything."
          }
        },
        {
          "@type": "Question",
          "name": "I'm not ready to apply yet. Can I still reach out?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Most people start with a question, not an application. Reach out whenever you're ready — even if that's just to ask one thing. No pressure. No commitment."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly does START Mortgage respond to messages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We respond within one business day. Most messages get a reply the same day. If your question is urgent, call or text us directly for the fastest response."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://start-mortgage.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://start-mortgage.com/contact"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://start-mortgage.com/contact",
      "name": "Contact START Mortgage | Kissimmee, FL Mortgage Broker",
      "description": "Get in touch with START Mortgage in Kissimmee, FL. Call, text, or send a message. Bilingual service in English and Spanish. (689) 210-3448.",
      "isPartOf": { "@id": "https://start-mortgage.com/#website" },
      "about": { "@id": "https://start-mortgage.com/#organization" },
      "inLanguage": "en"
    }
  ]
}
```

---

## Internal Linking Map

| Anchor Text | Links To |
|-------------|----------|
| Book Your Free Planning Session | /planning-session |
| (689) 210-3448 | tel:6892103448 |
| jexayra.rivera@start-mortgage.com | mailto:jexayra.rivera@start-mortgage.com |
| nmlsconsumeraccess.org | https://nmlsconsumeraccess.org |

**Pages that should link TO this page:**
- Homepage footer and header nav
- All pages (via site navigation)
- Blog posts (contact reference)

**This page should link OUT to:**
- /planning-session (CTA in Section 6)
- tel:6892103448 (phone number throughout)
- mailto:jexayra.rivera@start-mortgage.com (email throughout)

---

## Elementor Notes

- **Template:** Inviz Contact template. Map each section above to the corresponding Inviz section in order.
- **Primary CTA:** Submit contact form (Section 2). This is the main action on this page.
- **Secondary CTA:** Call/text (689) 210-3448 — visible in hero, contact cards, and final CTA.
- **This is NOT the primary conversion page.** The /planning-session page handles mortgage consultations. This page serves general inquiries, press, partnerships, and people who aren't ready to book yet.
- **Phone number:** Must be tappable on mobile (`tel:` link). Appears in hero, Card 1, and final CTA.
- **Form routing:** Configure Elementor form to send submissions to jexayra.rivera@start-mortgage.com. Consider integrating with FollowUpBoss CRM.
- **Google Maps:** Lazy-load the embed for page speed. Add a descriptive `title` attribute for accessibility.
- **FAQ Accordion:** Use Elementor accordion or toggle widget. The FAQPage schema above handles rich snippets independently.
- **Mobile:** Form stacks below hero text. Contact cards stack vertically. Map stacks below address. All CTAs full-width.
- **Images:** Use a photo of the Kissimmee office or Jexayra if available. Avoid stock photos.
- **Speed:** Lazy-load Google Maps. Compress all images. Keep above-the-fold load under 3 seconds.
- **Accessibility:** All form fields must have proper labels. Map embed must have a descriptive title attribute. Phone links must use `tel:` protocol.
- **RankMath:** Focus keyword "contact mortgage broker kissimmee." Verify green score.
