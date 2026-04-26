/* Calculator, Loan programs grid, Testimonials, Guarantee, Founder, Bilingual, Blog, FAQ */

const Calculator = () => {
  const [price, setPrice] = useState(385000);
  const [down, setDown] = useState(5);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);

  const downAmt = Math.round(price * down / 100);
  const principal = price - downAmt;
  const r = rate / 100 / 12;
  const n = term * 12;
  const pi = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const tax = (price * 0.0115) / 12;
  const ins = (price * 0.004) / 12;
  const pmi = down < 20 ? (principal * 0.007) / 12 : 0;
  const total = pi + tax + ins + pmi;

  const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  const fmt2 = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <section className="sec" id="calc">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>Payment calculator</span>
            <h2>See your monthly payment before you talk to anyone.</h2>
          </div>
          <p>Move the sliders. We'll show you principal, interest, taxes, insurance, and PMI — the full PITI, not a headline rate dressed up to look cheap.</p>
        </div>
        <div className="calc">
          <div className="calc-left">
            <h3>Run the numbers</h3>
            <p>Defaults are Central Florida averages. Adjust to fit.</p>

            <div className="calc-field">
              <label>Home price <span className="val">${fmt(price)}</span></label>
              <input type="range" min="150000" max="950000" step="5000" value={price}
                onChange={(e) => setPrice(+e.target.value)} />
              <div className="range-marks"><span>$150k</span><span>$950k</span></div>
            </div>

            <div className="calc-field">
              <label>Down payment <span className="val">{down}% · ${fmt(downAmt)}</span></label>
              <input type="range" min="0" max="25" step="0.5" value={down}
                onChange={(e) => setDown(+e.target.value)} />
              <div className="range-marks"><span>0%</span><span>3.5% FHA</span><span>25%</span></div>
            </div>

            <div className="calc-field">
              <label>Interest rate <span className="val">{rate.toFixed(2)}%</span></label>
              <input type="range" min="4.5" max="8.5" step="0.125" value={rate}
                onChange={(e) => setRate(+e.target.value)} />
              <div className="range-marks"><span>4.50%</span><span>8.50%</span></div>
            </div>

            <div className="calc-field">
              <label>Loan term <span className="val">{term} years</span></label>
              <input type="range" min="10" max="30" step="5" value={term}
                onChange={(e) => setTerm(+e.target.value)} />
              <div className="range-marks"><span>10 yr</span><span>30 yr</span></div>
            </div>
          </div>

          <div className="calc-right">
            <div className="lbl">Estimated monthly payment</div>
            <div className="calc-result">
              ${fmt2(total)}<span className="per">/mo</span>
            </div>
            <p className="calc-subresult">Principal, interest, taxes, insurance{down < 20 ? ', and PMI' : ''}.</p>

            <div className="calc-breakdown">
              <div className="cell">
                <div className="lbl">Principal & interest</div>
                <div className="v">${fmt2(pi)}</div>
              </div>
              <div className="cell">
                <div className="lbl">Taxes & insurance</div>
                <div className="v">${fmt2(tax + ins)}</div>
              </div>
              <div className="cell" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 20, paddingTop: 20 }}>
                <div className="lbl">Down payment</div>
                <div className="v">${fmt(downAmt)}</div>
              </div>
              <div className="cell" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 20, paddingTop: 20, paddingLeft: 20 }}>
                <div className="lbl">PMI {down >= 20 && '(none)'}</div>
                <div className="v">${fmt2(pmi)}</div>
              </div>
            </div>

            <div className="calc-cta">
              <a href="#apply" className="btn btn-primary btn-lg">
                Lock this in with a 24-hour pre-approval
                <Icon name="arrow-right" size={16} />
              </a>
            </div>
            <p className="calc-fine">Estimate only. Actual payment depends on final rate, property tax rate, HOA, and insurance quote. Subject to credit approval.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const LoanPrograms = () => {
  const loans = [
    { badge: 'CONVENTIONAL', title: 'Conventional', down: '3%', downLbl: 'min down', feat: ['3% down for first-time buyers', 'Drop PMI at 20% equity', 'Up to $806,500 loan amount (FL)', '15, 20, or 30-year terms'], featured: false },
    { badge: 'FHA', title: 'FHA', down: '3.5%', downLbl: 'min down', feat: ['580+ FICO eligible', 'Flexible debt-to-income', 'Gift funds allowed for down', 'Great for first-time buyers'], featured: true, tag: 'Most popular' },
    { badge: 'VA', title: 'VA', down: '$0', downLbl: 'down', feat: ['No down payment required', 'No monthly mortgage insurance', 'Competitive rates, every time', 'Service members + veterans'], featured: false },
    { badge: 'USDA', title: 'USDA', down: '$0', downLbl: 'down', feat: ['$0 down on eligible properties', 'Rural Central Florida areas', 'Below-market rates', 'Income-limit guided'], featured: false },
  ];
  return (
    <section className="sec sec-alt" id="loans">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>Loan programs</span>
            <h2>Every major program, modeled side by side.</h2>
          </div>
          <p>We don't push one program. We model every path you qualify for, then explain the trade-offs in plain language so you can pick with confidence.</p>
        </div>
        <div className="loans-grid">
          {loans.map((l, i) => (
            <a href="#apply" className={`loan-card ${l.featured ? 'featured' : ''}`} key={i}>
              {l.tag && <span className="tag">{l.tag}</span>}
              <span className="badge">{l.badge}</span>
              <h3>{l.title}</h3>
              <p className="down"><b>{l.down}</b> {l.downLbl}</p>
              <ul>
                {l.feat.map((f, k) => (
                  <li key={k}><Icon name="check" size={14} />{f}</li>
                ))}
              </ul>
              <span className="foot">See if I qualify <Icon name="arrow-right" size={14} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const cards = [
    { q: 'We thought we couldn\'t afford Kissimmee. Jexayra showed us two programs our bank never mentioned. We closed in 26 days.', name: 'Ana & Luis M.', detail: 'First home · Kissimmee, FL', initials: 'AM' },
    { q: 'Self-employed two years. Three other lenders told us no. Jexayra said "let me look" and came back with a yes.', name: 'Marco V.', detail: 'Self-employed · Clermont, FL', initials: 'MV' },
    { q: 'She answered our texts en Español at 9 pm on a Sunday when the listing agent needed proof of funds.', name: 'Cordero Family', detail: 'Move-up · Poinciana, FL', initials: 'CF' },
    { q: 'VA loan, $0 down, rate lock in two days. I\'ve never had a smoother closing in three moves.', name: 'Sgt. R. Ramírez', detail: 'VA · Lakeland, FL', initials: 'SR' },
    { q: 'Refi saved us $317/month. She called me — I didn\'t call her. That\'s the difference.', name: 'Nikki T.', detail: 'Refinance · Winter Garden', initials: 'NT' },
    { q: 'As a REALTOR®, I trust Jexayra with my clients. Pre-approvals are real, closings are on time.', name: 'David L., REALTOR®', detail: 'Keller Williams · Orlando', initials: 'DL' },
  ];
  return (
    <section className="sec" id="reviews">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>What families say</span>
            <h2>Keys earned, families home.</h2>
          </div>
          <p>We'd rather show you our work than talk about it. Here's what Central Florida buyers and REALTORS® have written about working with START.</p>
        </div>

        <div className="testimonial-hero">
          <div className="img" aria-hidden="true"></div>
          <div className="content">
            <div className="stars">★★★★★</div>
            <blockquote>
              "We walked into our bank first. We walked out after they said it would take two weeks. Jexayra had our pre-approval in 18 hours, modeled three loan programs for us, and closed 23 days after we went under contract. Our kids picked their rooms before our bank even called us back."
            </blockquote>
            <cite>
              <b>The Rivera Family</b>
              First-time buyers · Saint Cloud, FL · Closed March 2026
            </cite>
          </div>
        </div>

        <div className="testimonial-grid">
          {cards.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">★★★★★</div>
              <p>"{t.q}"</p>
              <cite>
                <div className="av">{t.initials}</div>
                <div className="txt">
                  <b>{t.name}</b>
                  <span>{t.detail}</span>
                </div>
              </cite>
            </div>
          ))}
        </div>

        <div className="review-meta-bar">
          <div className="left">
            <div className="score">4.9</div>
            <div>
              <div className="stars">★★★★★</div>
              <div className="txt"><b>Based on 127 verified reviews</b><br />Google · Zillow · Facebook · Experience.com</div>
            </div>
          </div>
          <a href="#" className="btn-link">Read all reviews <Icon name="arrow-right" size={14} /></a>
        </div>
      </div>
    </section>
  );
};

const Guarantee = () => (
  <section className="sec sec-alt">
    <div className="wrap">
      <div className="guarantee">
        <div className="seal">
          <div className="seal-ring">
            <Icon name="shield-check" size={56} />
          </div>
          <span className="rot-text">People before files · Always</span>
        </div>
        <div>
          <span className="eyebrow-row"><span className="bar"></span>Our promise to you</span>
          <h2>If we don't earn your trust in 15 minutes, we don't earn your file.</h2>
          <p>A mortgage is the biggest financial decision most families ever make. You deserve a broker who treats it like it matters. Here's what we promise every single client:</p>
          <ul className="promise-list">
            <li><Icon name="check" size={16} />24-hour pre-approval or we tell you why</li>
            <li><Icon name="check" size={16} />Rate quote in writing, never over the phone only</li>
            <li><Icon name="check" size={16} />One point of contact, start to close</li>
            <li><Icon name="check" size={16} />Plain-language explanations, cada vez</li>
            <li><Icon name="check" size={16} />Response within 4 business hours</li>
            <li><Icon name="check" size={16} />No pressure, no "act now" tactics, ever</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Founder = () => (
  <section className="sec" id="about">
    <div className="wrap">
      <div className="founder">
        <div className="founder-img">
          <div className="sig-card">
            <div className="name">Jexayra Rivera</div>
            <div className="role">Founder · Mortgage Broker</div>
            <div className="nmls">NMLS# 1631454</div>
          </div>
        </div>
        <div className="founder-body">
          <span className="eyebrow-row"><span className="bar"></span>Meet the founder</span>
          <h2>Nine years of "yes" after other lenders said no.</h2>
          <p className="lead">Jexayra Rivera started START after nearly a decade watching families walk out of big banks with a "sorry, not this time." She built a boutique brokerage for a reason: the file that looks complicated to a call-center underwriter is often the file that deserves the most care.</p>
          <p>Born and raised between Puerto Rico and Central Florida, she serves her community the way her abuela taught her — familia primero. That means answering on weekends. That means explaining PMI in Spanish until it makes sense. That means telling you when a loan is <em>not</em> right for you, even when it closes.</p>
          <div className="founder-stats">
            <div className="cell">
              <div className="num">9<span className="unit">+yr</span></div>
              <div className="lbl">In the mortgage industry</div>
            </div>
            <div className="cell">
              <div className="num">2<span className="unit"></span></div>
              <div className="lbl">Languages spoken, fluently</div>
            </div>
            <div className="cell">
              <div className="num">1<span className="unit"></span></div>
              <div className="lbl">Point of contact, always</div>
            </div>
          </div>
          <a href="#apply" className="btn btn-dark btn-lg">
            Book a 15-min call with Jexayra
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Bilingual = () => (
  <section className="bilingual">
    <div className="wrap">
      <div className="bilingual-grid">
        <div className="bilingual-copy">
          <span className="eyebrow-row"><span className="bar"></span>English y Español</span>
          <h2>Tu familia primero. Tu expediente después.</h2>
          <p className="lead">Working with START means you never have to translate a mortgage document for your parents, ever again. We speak both — all the way through.</p>
          <a href="#apply" className="btn btn-dark btn-lg">
            Empieza tu pre-aprobación
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
        <div className="bilingual-split">
          <div className="lang-col">
            <h4>English <span className="flag">EN</span></h4>
            <p>"We'll walk you through every form, every milestone, and every decision — in plain English, not mortgage jargon. Texts, calls, and documents, all in your language of choice."</p>
          </div>
          <div className="divider"></div>
          <div className="lang-col">
            <h4>Español <span className="flag">ES</span></h4>
            <p>"Mira, la casa primero es una decisión de familia. Aquí no vas a leer documentos en inglés solo. Te explicamos todo paso a paso, en español puertorriqueño, como familia."</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Blog = () => {
  const posts = [
    { cat: 'Pre-approval', date: 'Apr 2026', read: '5 min', title: 'What is pre-approval (and why you need it before you house-hunt)', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80' },
    { cat: 'First-time buyers', date: 'Mar 2026', read: '7 min', title: 'How much house can I actually afford? A Central Florida guide.', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80' },
    { cat: 'Loan programs', date: 'Mar 2026', read: '6 min', title: 'FHA vs. Conventional: which loan wins for first-time buyers?', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80' },
  ];
  return (
    <section className="sec sec-alt" id="blog">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow-row"><span className="bar"></span>Learn before you borrow</span>
            <h2>Plain-language guides for smarter buyers.</h2>
          </div>
          <p>No clickbait, no jargon. Real answers to the questions Central Florida buyers ask us most often.</p>
        </div>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <a href="#" className="blog-card" key={i}>
              <div className="img" style={{ backgroundImage: `url(${p.img})` }}></div>
              <div className="body">
                <div className="meta">
                  <span className="cat">{p.cat}</span>
                  <span className="dot"></span>
                  <span>{p.date}</span>
                  <span className="dot"></span>
                  <span>{p.read}</span>
                </div>
                <h3>{p.title}</h3>
                <span className="read">Read guide <Icon name="arrow-right" size={14} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const items = [
    { q: 'How is a mortgage broker different from a bank?', a: 'A bank sells you the loan it has. A broker shops 30+ wholesale lenders to find the loan that fits you. We are licensed under Lend Labs LLC NMLS# 2718409 dba START Mortgage NMLS# 2821608 and we are compensated by the lender, not by you, in most programs.' },
    { q: 'How fast can I actually get pre-approved?', a: 'Most pre-approvals go out within 24 hours of a complete intake. That includes your income documentation, a soft credit pull, and a short conversation about your goals. If something makes the file slower (we\'ll tell you what), we say so upfront.' },
    { q: 'Do you pull my credit at the planning session?', a: 'No. The 15-minute planning session is a conversation. If you decide to move forward to pre-approval, we do a soft pull first and only do a hard pull when you\'re ready to shop seriously.' },
    { q: 'Do you work with self-employed borrowers?', a: 'Yes. We have bank-statement, 1099, P&L, and asset-depletion programs through our wholesale partners. If your tax return shows less than your real income (common for self-employed), we likely have a program for you.' },
    { q: 'Can I do all of this in Spanish?', a: 'Sí, completamente. Jexayra y el equipo hablan español puertorriqueño. Todos los documentos, llamadas, mensajes y explicaciones están disponibles en inglés o en español — tú eliges.' },
    { q: 'What do I pay you?', a: 'In most scenarios, lender-paid compensation — which means you don\'t write us a check. When borrower-paid compensation makes sense (better rate), we show you both sides in writing so you can choose. Never a surprise.' },
    { q: 'Is this a commitment to lend?', a: 'No. A pre-approval is not a commitment to lend. Final approval is subject to credit, property appraisal, title review, and wholesale lender underwriting. We\'ll walk you through every condition before you rely on it.' },
  ];
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="faq-wrap">
          <div className="faq-aside">
            <span className="eyebrow-row"><span className="bar"></span>Frequently asked</span>
            <h2>The questions buyers actually ask.</h2>
            <p>Straight answers. If your question isn't here, text or call — we'll answer it the same day.</p>
            <div className="contact-card">
              <div className="lbl">Talk to Jexayra</div>
              <a href="tel:+14075551234">(407) 555-1234</a>
              <small>Mon–Sat · 8am–8pm ET · English y Español</small>
            </div>
          </div>
          <div className="faq-list">
            {items.map((it, i) => (
              <details className="faq-item" key={i} open={i === 0}>
                <summary>
                  <span style={{ display: 'flex', gap: 16, alignItems: 'baseline', flex: 1 }}>
                    <span className="q-mark">Q/0{i + 1}</span>
                    <span>{it.q}</span>
                  </span>
                  <span className="plus">+</span>
                </summary>
                <p className="answer">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Calculator, LoanPrograms, Testimonials, Guarantee, Founder, Bilingual, Blog, FAQ });
