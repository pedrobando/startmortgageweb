/* Hero, Marquee, Offer stack */
const Hero = ({ lang }) => {
  const copy = {
    en: {
      badge: '24-hour pre-approvals, live now',
      h1a: 'The start of',
      h1b: 'more.',
      h1c: 'Clarity over confusion.',
      sub: 'Boutique bilingual mortgage guidance for Central Florida families. We shop every lender so you get the right loan — not a one-size-fits-all product.',
      cta1: 'Get my 24-hour pre-approval',
      cta2: 'Book a planning session',
      fine1: 'No credit pull',
      fine2: 'Free · No obligation',
      fine3: 'English y Español',
    },
    es: {
      badge: 'Pre-aprobaciones en 24 horas, ahora',
      h1a: 'El comienzo',
      h1b: 'de más.',
      h1c: 'Guía clara, paso a paso.',
      sub: 'Guía boutique y bilingüe para familias de Florida Central. Comparamos cada prestamista para que tú recibas el préstamo correcto — no uno genérico.',
      cta1: 'Mi pre-aprobación en 24 horas',
      cta2: 'Agenda una sesión',
      fine1: 'Sin verificación dura',
      fine2: 'Gratis · Sin compromiso',
      fine3: 'English y Español',
    }
  }[lang];

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="pulse"></span>
              {copy.badge}
            </span>
            <h1 className="hero-h1">
              {copy.h1a} <span className="accent-word">{copy.h1b}</span><br />
              <em>{copy.h1c}</em>
            </h1>
            <p className="hero-sub">{copy.sub}</p>
            <div className="hero-ctas">
              <a href="#apply" className="btn btn-primary btn-lg">
                {copy.cta1}
                <Icon name="arrow-right" size={18} />
              </a>
              <a href="#how" className="btn-link">{copy.cta2}</a>
            </div>
            <div className="hero-fine">
              <span><Icon name="check" size={14} />{copy.fine1}</span>
              <span><Icon name="check" size={14} />{copy.fine2}</span>
              <span><Icon name="check" size={14} />{copy.fine3}</span>
            </div>
            <div className="hero-proof-row">
              <div className="cell">
                <div className="num">24<span className="unit">hr</span></div>
                <div className="lbl">Pre-approvals, typical turnaround</div>
              </div>
              <div className="cell">
                <div className="num">9<span className="unit">+yr</span></div>
                <div className="lbl">Jexayra's industry experience</div>
              </div>
              <div className="cell">
                <div className="num">30<span className="unit">+</span></div>
                <div className="lbl">Wholesale lender partners</div>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <div className="photo" role="img" aria-label="Central Florida family home"></div>
            <div className="scrim"></div>
            <div className="hero-nmls-card">
              <span className="dot"></span>
              <div>
                NMLS <b>#1631454</b>
                <small>Licensed in Florida</small>
              </div>
            </div>
            <div className="hero-floatcard">
              <div className="avatar" aria-hidden="true"></div>
              <div className="body">
                <b>María & Carlos R.</b>
                <small>First home · Kissimmee · Closed in 23 days</small>
                <span className="stars">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = [
    { stars: '★★★★★', quote: 'Made our first home feel doable.', who: 'Ana M.', place: 'Kissimmee' },
    { stars: '★★★★★', quote: 'Closed faster than our agent expected.', who: 'David L.', place: 'Orlando' },
    { stars: '★★★★★', quote: 'Answered in Spanish, every single time.', who: 'Luz P.', place: 'Poinciana' },
    { stars: '★★★★★', quote: 'Saved us $310/mo vs our bank quote.', who: 'Kevin & Jessa', place: 'Saint Cloud' },
    { stars: '★★★★★', quote: 'VA loan, zero down, zero stress.', who: 'Sgt. Ramírez', place: 'Lakeland' },
    { stars: '★★★★★', quote: 'She picked up on a Saturday. Twice.', who: 'The Cordero family', place: 'Haines City' },
    { stars: '★★★★★', quote: 'Self-employed and finally approved.', who: 'Marco V.', place: 'Clermont' },
    { stars: '★★★★★', quote: 'The clearest plan we\'ve ever seen.', who: 'Nikki T.', place: 'Winter Garden' },
  ];
  const track = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((t, i) => (
          <div className="marquee-item" key={i}>
            <span className="stars">{t.stars}</span>
            <span>"{t.quote}"</span>
            <span className="dotsep"></span>
            <b>{t.who}</b>
            <span>· {t.place}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Offer = () => {
  const items = [
    { icon: 'search', title: 'Multi-lender rate shop', desc: 'We request quotes from 30+ wholesale lenders and bring you the best match for your credit profile and property type.', val: 'Value: priceless' },
    { icon: 'zap', title: '24-hour pre-approval letter', desc: 'A real letter your REALTOR® can hand the listing agent — not a guess. Issued within one business day of your intake.', val: 'Value: $0 (it\'s free)' },
    { icon: 'layout-list', title: 'Personalized loan roadmap', desc: 'A step-by-step plan with your target price, monthly payment, down payment needed, and timeline to keys.', val: 'Included' },
    { icon: 'users', title: 'Bilingual guidance', desc: 'Every conversation, document, and milestone available in English or Spanish. Tú eliges — we follow.', val: 'Included' },
    { icon: 'scale', title: 'Side-by-side loan comparison', desc: 'FHA vs Conventional vs VA vs USDA — we model every program you qualify for so you can pick with eyes open.', val: 'Included' },
    { icon: 'message-circle', title: 'One point of contact', desc: 'You work directly with Jexayra. No call center, no handoffs, no "let me transfer you." Text her name, get her.', val: 'Included' },
    { icon: 'calendar-check-2', title: 'Closing-day checklist', desc: 'From locked rate to wire instructions to keys — a dated plan you\'ll actually use, not a PDF that lives in your inbox.', val: 'Included' },
    { icon: 'shield', title: 'Post-close rate watch', desc: 'We monitor rates for 36 months after closing. If refinancing saves you money, you\'ll hear from us first.', val: 'Included' },
  ];
  return (
    <section className="offer" id="offer">
      <div className="wrap offer-inner">
        <div className="offer-head">
          <div>
            <span className="eyebrow-row on-dark"><span className="bar"></span>What you actually get</span>
            <h2>Everything your bank <span className="hl">doesn't do</span>, bundled.</h2>
          </div>
          <p className="lead">Eight things happen when you start with us. The bank does maybe two. Here's the stack, fully itemized — no fine print, no gotchas, no "call for details."</p>
        </div>
        <div className="offer-stack">
          {items.map((it, i) => (
            <div className="offer-item" key={i}>
              <div className="chk"><Icon name="check" size={16} /></div>
              <div className="text">
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
                <span className="val">{it.val}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="offer-footer">
          <div className="offer-total">
            <span className="label">What you pay today</span>
            <span className="strike">$1,495</span>
            <span className="price">$0</span>
          </div>
          <div className="offer-cta-group">
            <a href="#apply" className="btn btn-primary btn-lg">
              Start my pre-approval
              <Icon name="arrow-right" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Hero, Marquee, Offer });
