# Pre-Approval — start-mortgage.com

*Page: `/pre-approval` | Platform: WordPress + Elementor | Template: Inviz Contact | SEO: RankMath*

---

## 301 Redirect Required

```
/your-home-journey-starts-with-pre-approval/ → /pre-approval (301 permanent redirect)
```

Add via RankMath > Redirections or server-level .htaccess / Redirection plugin. Verify after launch that the old URL resolves correctly.

---

## RankMath SEO Settings

**Focus Keyword:** mortgage pre approval kissimmee
**Page Title:** Mortgage Pre-Approval in Kissimmee, FL | START Mortgage
**Meta Description:** Get pre-approved for a mortgage in Kissimmee with START Mortgage. 24-hour turnaround. We compare multiple lenders and only issue letters we can close. Start today.
**URL Slug:** pre-approval
**Schema Type:** Service + FAQPage + BreadcrumbList (configure in RankMath > Schema)

---

## Breadcrumb

```
Home > Pre-Approval
```

*(Rendered via RankMath breadcrumb shortcode or Elementor breadcrumb widget. Schema markup handled in JSON-LD below.)*

---

## Elementor Section-by-Section Copy (Inviz Contact Template)

---

### SECTION 1: Hero

**Layout:** Two columns. Text left (60%), pre-approval form or CTA right (40%). On mobile, text stacks above form. Sticky CTA button on mobile. Full-width background image (real photo — Jexayra reviewing documents with someone, or a family at a kitchen table). Clean, warm tones.

**Section Tag (small text above heading):**
Mortgage pre-approval

**H1 (Heading):**
Know What You Can Afford Before You Start Looking

**Subheadline (Text Editor):**
A pre-approval shows sellers you are serious. It tells you your real budget. And it puts you ahead of other buyers. Most letters are ready within 24 hours.

**Body Copy:**
Over 50 families have used this exact process to buy their homes. Here is what makes our pre-approval different:

**We do not issue pre-approval letters we cannot close.**

Some lenders hand out letters like flyers. Then the deal falls apart in underwriting. The seller moves on. You lose the home.

We verify everything upfront. When you get a letter from START Mortgage, it means something. Realtors know it. Sellers trust it. And you can make your offer with confidence.

**Primary CTA (Button):**
Start Your Pre-Approval

*(Triggers popup application form. Will be replaced by LendingPad application when available.)*

**Secondary CTA (Text link below button):**
Not sure yet? [Book a free planning session first](/planning-session)

**Supporting line (small text below CTAs):**
Free. No obligation. Subject to credit approval.

---

### SECTION 2: Appointment Form

**Layout:** Form sits in the right column of the hero section (desktop) or stacks below on mobile. White card with light shadow. Matches Inviz Contact template appointment form section.

**Form Heading (H3):**
Start Your Pre-Approval

**Form Fields (Elementor Pro Form widget):**

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Name | Text | Yes | Your name |
| Email | Email | Yes | Your email |
| Phone | Phone | Yes | Your phone number |
| Message | Textarea | No | Tell us about your home buying goals |

**Submit Button:**
Start My Pre-Approval

**Below form (small text):**
We review your application and reach out within one business day. Subject to credit approval.

**Form Settings:**
- Send to: jexayra.rivera@start-mortgage.com
- Subject line: "New Pre-Approval Request: [Name]"
- Redirect after submit: /pre-approval (same page with success message)
- Success message: "We got your request! We will reach out within one business day to walk you through the next steps."

**Elementor Note:** All "Start Your Pre-Approval" buttons should use the same Elementor popup trigger ID so they can be updated in one place. If popup fails to load, button should link to /planning-session as a fallback. When LendingPad is ready, swap the popup trigger for the LendingPad application link or embed.

---

### SECTION 3: Contact Info Cards (3 Cards)

**Layout:** Three columns with icons. Light gray background. Clean, easy to scan. Matches Inviz Contact template "Direct Contact Info" section.

**Section Tag (small text above heading):**
Questions before you apply?

**H2:**
We Are Here to Help

**Card 1:**
**Icon:** Phone
**H3:** Call or Text
**Text:** [(689) 210-3448](tel:6892103448)
Monday - Friday, 9am - 6pm
Saturday by appointment

**Card 2:**
**Icon:** Envelope
**H3:** Email
**Text:** [jexayra.rivera@start-mortgage.com](mailto:jexayra.rivera@start-mortgage.com)
We reply within one business day.

**Card 3:**
**Icon:** Map pin
**H3:** Visit Our Office
**Text:**
112 N Clyde Ave
Kissimmee, FL 34741

---

### SECTION 4: Google Maps Embed

**Layout:** Full-width section. Text left, Google Maps embed right. Map stacks below on mobile. Matches Inviz Contact template office location section.

**H2:**
Find Us in Kissimmee

**Body Copy (Text Editor):**
Our office is in downtown Kissimmee. Stop by during business hours or call to set up a time.

**Address:**
112 N Clyde Ave
Kissimmee, FL 34741

**Hours:**
Monday - Friday: 9am - 6pm
Saturday: By appointment
Sunday: Closed

**Google Maps Embed:**
*(Use Elementor Google Maps widget or embed code. Center on 112 N Clyde Ave, Kissimmee, FL 34741. Zoom level 15.)*

```
Embed placeholder:
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!...112+N+Clyde+Ave+Kissimmee+FL+34741..." width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
```

---

### SECTION 5: FAQ Accordion (5 Items)

**Layout:** Accordion widget (Elementor Toggle or Accordion). Clean, single-column. Used for FAQPage schema. Matches Inviz Contact template FAQ section.

**Section Tag:**
Common questions

**H2:**
Mortgage Pre-Approval: Your Questions Answered

**Q: Does pre-approval hurt my credit?**
A: We do run a credit check as part of the pre-approval process. This is called a "hard inquiry" and may cause a small, temporary dip in your score — usually just a few points. If you shop for rates with multiple lenders within a 14-to-45-day window, credit bureaus typically count those inquiries as one.

**Q: How long is a pre-approval valid?**
A: Most pre-approval letters are valid for 60 to 90 days. If yours expires before you find a home, we can usually renew it quickly — as long as your financial situation has not changed much.

**Q: What is the difference between pre-qualification and pre-approval?**
A: A pre-qualification is a rough estimate based on what you tell us. A pre-approval is a verified review of your income, credit, and finances. Sellers take pre-approvals seriously. A pre-qualification does not carry the same weight.

**Q: What if I get denied?**
A: That is okay. It does not mean "never" — it usually means "not yet." We explain exactly what needs to change and give you a clear plan to get there. Many people come back in a few months, ready to go.

**Q: Can I get pre-approved in Spanish?**
A: Yes. Jexayra is fluent in English and Spanish. The entire process — from application to approval letter — can be done in the language you are most comfortable with.

---

### SECTION 6: CTA + Email Form (Final CTA Block)

**Layout:** Full-width, bold background. Centered text. High contrast CTA button. Matches Inviz Contact template final CTA section. Repurpose the Inviz email form as a final conversion CTA.

**H2:**
Ready to Find Out What You Can Afford?

**Body Copy:**
Start your pre-approval today. It is free. There is no obligation. And most letters are ready within 24 hours.

We walk you through every step — in English or Spanish.

As a mortgage broker, we compare options from multiple lenders. That means more programs and better fit for your situation — not a one-size-fits-all option from a single bank.

**Primary CTA Button:**
Start Your Pre-Approval

*(Triggers popup application form)*

**Supporting text:**
Or call us at **(689) 210-3448** | Hablamos Espanol

**Secondary link (text, below supporting text):**
Not sure yet? [Book a free planning session](/planning-session)

---

### SECTION 7: Compliance Block + Footer

**Layout:** Small text, light gray background. Left-aligned.

```
Lend Labs LLC d/b/a START Mortgage | NMLS# 2718409
Jexayra Rivera | Branch Manager | NMLS# 1631454
112 N Clyde Ave, Kissimmee, FL 34741
Licensed Mortgage Broker — State of Florida | Equal Housing Opportunity

Lend Labs LLC d/b/a START Mortgage is a licensed mortgage broker and does not make
credit decisions. All loans are originated and funded by approved lending partners.
This is not a commitment to lend. Programs, rates, terms, and conditions are subject
to change without notice. Not all products are available in all states or for all
amounts. Other restrictions and limitations may apply.

NMLS Consumer Access: nmlsconsumeraccess.org
```

*(Use site-wide footer per site-architecture.md spec.)*

---

## Schema Markup (JSON-LD)

Add via RankMath > Schema or paste into Elementor custom code widget in `<head>`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://start-mortgage.com/pre-approval/#service",
      "name": "Mortgage Pre-Approval",
      "description": "Get pre-approved for a mortgage in Kissimmee, FL. START Mortgage reviews your finances, compares options from multiple lenders, and issues pre-approval letters that close. Most letters ready within 24 hours.",
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
      "availableLanguage": ["en", "es"],
      "serviceType": "Mortgage Pre-Approval",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free mortgage pre-approval application"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://start-mortgage.com/pre-approval/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does mortgage pre-approval hurt my credit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We do run a credit check as part of the pre-approval process. This is called a hard inquiry and may cause a small, temporary dip in your score — usually just a few points. If you shop for rates with multiple lenders within a 14-to-45-day window, credit bureaus typically count those inquiries as one."
          }
        },
        {
          "@type": "Question",
          "name": "How long is a mortgage pre-approval valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most pre-approval letters are valid for 60 to 90 days. If yours expires before you find a home, we can usually renew it quickly as long as your financial situation has not changed much."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between pre-qualification and pre-approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A pre-qualification is a rough estimate based on what you tell us. A pre-approval is a verified review of your income, credit, and finances. Sellers take pre-approvals seriously. A pre-qualification does not carry the same weight."
          }
        },
        {
          "@type": "Question",
          "name": "What if I get denied for pre-approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That is okay. It does not mean never — it usually means not yet. We explain exactly what needs to change and give you a clear plan to get there. Many people come back in a few months, ready to go."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get pre-approved for a mortgage in Spanish?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Jexayra is fluent in English and Spanish. The entire process — from application to approval letter — can be done in the language you are most comfortable with."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://start-mortgage.com/pre-approval/#breadcrumb",
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
          "name": "Pre-Approval",
          "item": "https://start-mortgage.com/pre-approval"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://start-mortgage.com/pre-approval",
      "name": "Mortgage Pre-Approval in Kissimmee, FL | START Mortgage",
      "description": "Get pre-approved for a mortgage in Kissimmee with START Mortgage. 24-hour turnaround. We compare multiple lenders and only issue letters we can close.",
      "isPartOf": { "@id": "https://start-mortgage.com/#website" },
      "about": { "@id": "https://start-mortgage.com/pre-approval/#service" },
      "breadcrumb": { "@id": "https://start-mortgage.com/pre-approval/#breadcrumb" },
      "inLanguage": "en"
    }
  ]
}
```

---

## Internal Linking Map (for this page)

| Anchor Text | Links To |
|-------------|----------|
| Start Your Pre-Approval | Popup form (current) / LendingPad (future) |
| Book a free planning session | /planning-session |
| NMLS Consumer Access | https://nmlsconsumeraccess.org (external, opens in new tab) |

**Pages that should link TO this page:**

| From Page | Suggested Anchor Text |
|-----------|----------------------|
| Homepage | Start Your Pre-Approval |
| /how-it-works (Step 3) | Get pre-approved |
| /first-time-buyers | Get pre-approved before you shop |
| /loan-programs (all) | Start your pre-approval |
| /realtors | My pre-approvals close |
| /loan-programs/fha | Get pre-approved for an FHA loan |
| /loan-programs/conventional | Get pre-approved for a conventional loan |
| /loan-programs/va | Get pre-approved for a VA loan |
| /loan-programs/usda | Get pre-approved for a USDA loan |
| /planning-session | Ready for pre-approval? Start here |
| Blog posts (mortgage process) | Start your pre-approval |

---

## Elementor Implementation Notes

- **Template:** Uses Inviz Contact template. Map sections 1-7 above to the corresponding Inviz Contact template sections (Hero, Appointment Form, Contact Info Cards, Google Maps, FAQ Accordion, CTA + Email Form, Footer).
- **Primary CTA:** "Start Your Pre-Approval" is the main action. It appears in Sections 1, 2, and 6.
- **Secondary CTA:** "Book a free planning session" appears as a text link only — never as a competing button in the same section.
- **One CTA per section.** Do not stack multiple buttons.
- **Mobile:** Hero CTA should be sticky on mobile. Phone number always tappable.
- **Images:** Use real photos (Jexayra, real situations with permission, office). Avoid stock photos.
- **Fonts:** Body text 16px minimum. H1 at 40px+. H2 at 28-32px.
- **Speed:** Compress all images. Use Elementor lazy load. Lazy-load Google Maps embed. Above-the-fold under 3 seconds.
- **Pre-Approval Form (Popup):** Current state is a popup form triggered by button clicks. Future state: LendingPad replaces the popup. All "Start Your Pre-Approval" buttons should use the same Elementor popup trigger ID so they can be updated in one place. If popup fails to load, button should link to /planning-session as a fallback.
- **Accordion FAQ:** Use Elementor Accordion or Toggle widget. Set first item to closed (do not auto-open). Ensure FAQ content matches the FAQPage schema markup exactly.
- **RankMath:** Set focus keyword to "mortgage pre approval kissimmee." Verify green SEO score. Add schema via RankMath > Schema > Custom Schema (paste JSON-LD above) or via Elementor custom code widget in page `<head>`. Enable breadcrumbs via RankMath > General > Breadcrumbs.
- **301 redirect:** Configure `/your-home-journey-starts-with-pre-approval/` to 301 redirect to `/pre-approval` in WordPress.
- **Phone numbers:** Make all phone numbers click-to-call with `tel:` links.
- **Tracking:** Add conversion event on form submission (for GA4 and any paid ad pixels).
- **Accessibility:** All form fields must have proper labels. Map embed must have a descriptive title attribute.
