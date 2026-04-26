/* Nav, Topbar, Footer, Sticky bar, Final CTA */
const { useState, useEffect, useRef } = React;

const Icon = ({ name, size = 20, stroke = 1.5, style, ...rest }) => {
  return (
    <i data-lucide={name}
       style={{ width: size, height: size, strokeWidth: stroke, display: 'inline-flex', ...style }}
       {...rest} />
  );
};

// One shared, debounced lucide pass — avoids N createIcons calls per render.
let __lucideScheduled = false;
function scheduleLucide() {
  if (__lucideScheduled) return;
  __lucideScheduled = true;
  requestAnimationFrame(() => {
    __lucideScheduled = false;
    if (window.lucide) {
      try { window.lucide.createIcons({ nameAttr: 'data-lucide' }); } catch (e) {}
    }
  });
}
// Observe DOM for new <i data-lucide> and rescan in batches.
if (typeof window !== 'undefined' && !window.__lucideObserverInstalled) {
  window.__lucideObserverInstalled = true;
  window.addEventListener('DOMContentLoaded', scheduleLucide);
  new MutationObserver((muts) => {
    for (const m of muts) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1 && (node.matches?.('[data-lucide]') || node.querySelector?.('[data-lucide]'))) {
          scheduleLucide();
          return;
        }
      }
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
}

const Topbar = ({ lang, setLang }) => (
  <div className="topbar">
    <div className="wrap">
      <div className="topbar-inner">
        <div className="topbar-left">
          <span><span className="dot"></span>Now serving Central Florida</span>
          <span className="hide-sm">Kissimmee · Orlando · Poinciana · Lakeland · Saint Cloud</span>
        </div>
        <div className="topbar-right">
          <a href="tel:+14075551234"><Icon name="phone" size={12} /> (407) 555-1234</a>
          <span className="pipe">·</span>
          <a href="mailto:hello@startmortgage.com" className="hide-sm">hello@startmortgage.com</a>
          <span className="pipe hide-sm">·</span>
          <div className="lang-toggle">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <span style={{ opacity: 0.3 }}>/</span>
            <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Nav = () => {
  const [loansOpen, setLoansOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="wrap">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="START Mortgage">
            <img src="design-system/logo-wordmark-black.png" alt="START Mortgage" />
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <details onToggle={(e) => setLoansOpen(e.target.open)}>
              <summary>Loan programs</summary>
              {loansOpen && (
                <div className="dropdown">
                  <a href="#loans">Conventional <small>3% down · flexible terms</small></a>
                  <a href="#loans">FHA <small>3.5% down · lower credit ok</small></a>
                  <a href="#loans">VA <small>$0 down for veterans</small></a>
                  <a href="#loans">USDA <small>$0 down · rural Florida</small></a>
                  <div className="divider"></div>
                  <a href="#loans" className="see-all">See all programs →</a>
                </div>
              )}
            </details>
            <a href="#audiences">Who we help</a>
            <a href="#reviews">Reviews</a>
            <a href="#realtors">REALTORS®</a>
            <a href="#blog">Learn</a>
          </div>
          <div className="nav-actions">
            <a href="tel:+14075551234" className="nav-phone">
              <Icon name="phone" size={16} />
              (407) 555-1234
            </a>
            <a href="#apply" className="btn btn-primary">
              Start pre-approval
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const StickyBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-bar ${show ? 'show' : ''}`}>
      <div className="msg">
        <span className="pulse"></span>
        <span>
          Get pre-approved in 24 hours.
          <small>Free · No obligation · Soft credit check</small>
        </span>
      </div>
      <a href="#apply" className="btn btn-primary">Start now <Icon name="arrow-right" size={14} /></a>
    </div>
  );
};

const FinalCTA = () => (
  <section className="final-cta" id="apply">
    <div className="wrap inner">
      <span className="eyebrow-row on-dark" style={{ justifyContent: 'center', display: 'inline-flex' }}>
        <span className="bar"></span> The start of more <span className="bar"></span>
      </span>
      <h2>Your keys are closer than you think.</h2>
      <p>Start with a 15-minute conversation. No credit pull. No pressure. Just a clear plan built around your goals, your timeline, and your family.</p>
      <div className="ctas">
        <a href="#apply" className="btn btn-primary btn-lg">
          Get my 24-hour pre-approval
          <Icon name="arrow-right" size={18} />
        </a>
        <a href="tel:+14075551234" className="btn btn-outline btn-lg ghost-btn">
          <Icon name="phone" size={16} />
          Call (407) 555-1234
        </a>
      </div>
      <p className="hint">Free · No obligation · Bilingual · NMLS# 1631454</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="design-system/logo-wordmark-black.png" alt="START Mortgage" />
          <p>Boutique bilingual mortgage guidance for Central Florida families. Broker, not lender — which means we shop every lender to find your match.</p>
          <div className="contact-lines">
            <div><a href="tel:+14075551234">(407) 555-1234</a></div>
            <div><a href="mailto:hello@startmortgage.com">hello@startmortgage.com</a></div>
            <div>112 N Clyde Ave, Kissimmee, FL 34741</div>
          </div>
        </div>
        <div>
          <h5>Loan programs</h5>
          <ul>
            <li><a href="#loans">Conventional</a></li>
            <li><a href="#loans">FHA</a></li>
            <li><a href="#loans">VA</a></li>
            <li><a href="#loans">USDA</a></li>
            <li><a href="#loans">Bank-statement</a></li>
          </ul>
        </div>
        <div>
          <h5>Who we help</h5>
          <ul>
            <li><a href="#audiences">First-time buyers</a></li>
            <li><a href="#audiences">Move-up buyers</a></li>
            <li><a href="#audiences">Refinance</a></li>
            <li><a href="#audiences">Self-employed</a></li>
            <li><a href="#audiences">Familias bilingües</a></li>
          </ul>
        </div>
        <div>
          <h5>Learn</h5>
          <ul>
            <li><a href="#blog">Pre-approval guide</a></li>
            <li><a href="#blog">How much can I afford?</a></li>
            <li><a href="#blog">FHA vs Conventional</a></li>
            <li><a href="#blog">Closing timeline</a></li>
            <li><a href="#blog">Credit readiness</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#about">About Jexayra</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#realtors">REALTORS®</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="compliance-block">
        <div className="ehl">
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 4 L4 12 L4 28 L28 28 L28 12 Z" />
            <path d="M10 28 L10 18 L22 18 L22 28" />
            <path d="M13 22 L19 22" />
            <path d="M13 14 L16 12 L19 14" />
          </svg>
          <span>Equal Housing Lender</span>
        </div>
        <div className="copy">
          <b>Important disclosures</b>
          Jexayra Rivera NMLS# 1631454 · Lend Labs LLC NMLS# 2718409 dba START Mortgage NMLS# 2821608. START Mortgage is a licensed mortgage broker, not a lender. We are licensed in the State of Florida.
          <div className="legal">
            All loans subject to credit approval and property appraisal. Rates and terms vary based on loan program, credit profile, loan-to-value, debt-to-income, and property type. Pre-approval is not a commitment to lend. This is not an offer to extend consumer credit as defined by Section 1026.2 of Regulation Z. Equal Housing Lender.
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 Lend Labs LLC dba START Mortgage. All rights reserved.  ·  <a href="#">Privacy</a>  ·  <a href="#">Terms</a>  ·  <a href="#">Licensing</a>  ·  <a href="#">NMLS Consumer Access</a></div>
        <div className="social">
          <a href="#" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 8a3 3 0 0 0-2-2c-2-.5-8-.5-8-.5s-6 0-8 .5a3 3 0 0 0-2 2 30 30 0 0 0-.5 4 30 30 0 0 0 .5 4 3 3 0 0 0 2 2c2 .5 8 .5 8 .5s6 0 8-.5a3 3 0 0 0 2-2 30 30 0 0 0 .5-4 30 30 0 0 0-.5-4z"/>
              <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Icon, Topbar, Nav, StickyBar, FinalCTA, Footer });
