/* Main App composing the site + Tweaks */

const DEFAULT_TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "#83C340",
  "showStickyBar": true,
  "showMarquee": true,
  "darkOffer": true
}/*EDITMODE-END*/;

const App = () => {
  const [lang, setLang] = React.useState('en');
  const [values, setTweak] = useTweaks(DEFAULT_TWEAKS);

  // Apply accent color dynamically
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', values.accent);
    const hex = values.accent.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      root.style.setProperty('--accent-tint', `rgba(${r},${g},${b},0.10)`);
      // darker variants
      const dark = (v, amt) => Math.max(0, Math.min(255, Math.round(v * amt)));
      root.style.setProperty('--accent-hover', `rgb(${dark(r,0.88)},${dark(g,0.88)},${dark(b,0.88)})`);
      root.style.setProperty('--accent-pressed', `rgb(${dark(r,0.76)},${dark(g,0.76)},${dark(b,0.76)})`);
    }
  }, [values.accent]);

  return (
    <>
      <Topbar lang={lang} setLang={setLang} />
      <Nav />
      <Hero lang={lang} />
      {values.showMarquee && <Marquee />}
      <WhyBroker />
      {values.darkOffer && <Offer />}
      <VersusTable />
      <Process />
      <Calculator />
      <LoanPrograms />
      <AudienceGrid />
      <Testimonials />
      <Guarantee />
      <Founder />
      <Bilingual />
      <Blog />
      <FAQ />
      <FinalCTA />
      <Footer />
      {values.showStickyBar && <StickyBar />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Accent color" value={values.accent} onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Sections" />
        <TweakToggle label="Review marquee" value={values.showMarquee} onChange={(v) => setTweak('showMarquee', v)} />
        <TweakToggle label="Dark offer stack" value={values.darkOffer} onChange={(v) => setTweak('darkOffer', v)} />
        <TweakToggle label="Sticky bottom CTA" value={values.showStickyBar} onChange={(v) => setTweak('showStickyBar', v)} />
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
