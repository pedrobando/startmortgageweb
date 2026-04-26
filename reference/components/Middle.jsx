/* Why-Broker value cards, VS table, Process roadmap, Audience grid */

const WhyBroker = () => {
  const cards = [
    { icon: 'git-branch', title: 'Broker, not lender', desc: 'Banks only sell what they have. As a broker, we shop 30+ wholesale lenders to match the loan to you — your credit, your property, your plan.', chip: 'Up to 0.5% lower rate on average' },
    { icon: 'clock', title: '24-hour pre-approval', desc: 'Not a guess. A real letter your agent can hand to the listing side the same day you find the house worth fighting for.', chip: 'Issued within 1 business day' },
    { icon: 'heart-handshake', title: 'Boutique, not bureaucracy', desc: 'You call, we answer. No ticket number, no handoff, no "a specialist will reach out." Direct access to Jexayra from intake to closing.', chip: 'One point of contact, start to keys' },
  ];
  return (
    <section className="sec" id="why">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>Proof. Promise. Plan.</span>
            <h2>Three reasons buyers pick us over their bank.</h2>
          </div>
          <p>Most buyers walk into their bank because it's familiar. Familiar isn't the same as right. Here's what changes when you work with a broker who treats your file like it matters.</p>
        </div>
        <div className="why-grid">
          {cards.map((c, i) => (
            <div className="why-card" key={i}>
              <div className="icon"><Icon name={c.icon} size={24} /></div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="chip"><span className="dot"></span>{c.chip}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VersusTable = () => {
  const bank = [
    'One lender, one rate sheet, take it or leave it',
    'Pre-approval takes 5–10 business days',
    'Hand-offs: one person for intake, another for underwriting, another for close',
    'No one calls you back on a Saturday',
    'English only unless you ask twice',
    'If your file is complex, "we can\'t help you"',
  ];
  const start = [
    '30+ wholesale lenders quoted, best match wins',
    'Pre-approval in 24 hours, letter in hand',
    'One person, start to keys. Her name is Jexayra.',
    'Evenings and weekends, because life doesn\'t pause',
    'English y Español, no second ask',
    'Self-employed, bank-statement, ITIN, VA, FHA — bring it',
  ];
  return (
    <section className="sec sec-alt" id="compare">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow-row" style={{ justifyContent: 'center' }}><span className="bar"></span>The difference, line by line <span className="bar"></span></span>
          <h2>Your bank vs. START Mortgage.</h2>
          <p>Not a hypothetical. This is what changes when you hire a broker who represents <em>you</em>, not a balance sheet.</p>
        </div>
        <div className="vs">
          <div className="vs-col bank">
            <h3>Your bank</h3>
            <small>What most buyers start with</small>
            <ul>
              {bank.map((b, i) => (
                <li key={i}><Icon name="x" size={18} />{b}</li>
              ))}
            </ul>
          </div>
          <div className="vs-col start">
            <h3>START Mortgage</h3>
            <small>Boutique bilingual brokerage · Kissimmee, FL</small>
            <ul>
              {start.map((s, i) => (
                <li key={i}><Icon name="check" size={18} />{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { n: '01', title: 'The planning session', body: 'A free 15-minute conversation. We learn your goal, your timeline, and what you\'re working with. No credit pull, no pressure.', meta: '15 min · free' },
    { n: '02', title: 'Your pre-approval', body: 'We review income, assets, and credit; you get a real pre-approval letter within 24 hours. The kind your agent can hand a listing side without flinching.', meta: '24 hours' },
    { n: '03', title: 'Your loan roadmap', body: 'We model every program you qualify for — FHA, Conventional, VA, USDA — and compare them side by side. You pick the one that fits your life, not the one that pays the most.', meta: 'Side-by-side' },
    { n: '04', title: 'House hunting (with backup)', body: 'You shop with confidence. We stay on call for updated pre-approval letters, payment scenarios, and "can we afford this one?" texts at 9 pm.', meta: 'On-call' },
    { n: '05', title: 'Under contract → close', body: 'Locked rate, ordered appraisal, scheduled close. You get a dated checklist and one person (Jexayra) steering the ship to clear-to-close.', meta: '21–30 days typical' },
    { n: '06', title: 'After the keys', body: 'We watch rates for the next 36 months. If a refi saves you money, you\'ll hear from us before the algorithm does.', meta: '36-mo watch' },
  ];
  return (
    <section className="sec" id="how">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>How it works</span>
            <h2>Six steps. One person. Zero guesswork.</h2>
          </div>
          <p>You won't wonder "what happens next" at any point in this process. That's the whole point of working with a boutique broker — the plan is clear on day one.</p>
        </div>
        <div className="process-list">
          {steps.map((s) => (
            <div className="process-row" key={s.n}>
              <div className="process-num">{s.n} /</div>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-body">{s.body}</p>
              <span className="process-meta">{s.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AudienceGrid = () => {
  const cards = [
    { icon: 'key-round', title: 'First-time buyers', desc: 'Down payment as low as 3%. FHA and Conventional options. We explain it like you\'re family.' },
    { icon: 'move-up-right', title: 'Move-up buyers', desc: 'Sell, buy, or bridge the gap. We coordinate timelines so you don\'t own two homes or none.' },
    { icon: 'refresh-ccw', title: 'Refinance', desc: 'Lower rate, cash out, or drop PMI. We model break-even so you only refi when it actually wins.' },
    { icon: 'briefcase', title: 'Self-employed', desc: 'Bank-statement, 1099, and P&L loan programs. We speak tax return, without judgment.' },
    { icon: 'shield-check', title: 'VA & FHA eligible', desc: 'VA $0 down for service members. FHA 3.5% down with flexible credit. We honor both.' },
  ];
  return (
    <section className="sec sec-alt" id="audiences">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>Who we help</span>
            <h2>Built for the way Central Florida actually buys.</h2>
          </div>
          <p>Different buyers need different plans. Pick the path closest to yours — we\'ll take it from there.</p>
        </div>
        <div className="audience-grid">
          {cards.map((c, i) => (
            <a href="#apply" className="aud-card" key={i}>
              <div className="icon"><Icon name={c.icon} size={20} /></div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
              <span className="arrow">Get started <Icon name="arrow-right" size={12} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { WhyBroker, VersusTable, Process, AudienceGrid });
