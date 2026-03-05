
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, 
  X, 
  ShieldCheck,
  Clock,
  Users,
  Zap,
  Check,
  ArrowRight,
  Star,
  Calendar,
  Scale,
  Lock,
  ChevronLeft,
  MapPin,
  Mail,
  ChevronDown,
  Plus,
  Minus,
  TrendingUp,
  Target,
  Globe,
  Settings,
  Briefcase,
  Monitor,
  Rocket
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import { Service } from './types';

// FAQ Data
const FAQS = [
  { q: "Kann ich zwischen den Paketen wechseln?", a: "Ja. Viele starten mit Backoffice Sorglos und upgraden nach 2–3 Monaten zu Rundum Sorglos, wenn sie sehen, dass es funktioniert. Sie zahlen dann nur die Differenz." },
  { q: "Was passiert, wenn ich Urlaub nehme oder eine Woche weniger Stunden brauche?", a: "Kein Problem. Die Pakete sind monatlich anpassbar. Brauchen Sie eine Woche 20h, die nächste 50h – wir stellen um." },
  { q: "Wie schnell sehe ich erste Ergebnisse?", a: "Backoffice Sorglos: sofort (ab Woche 1 weniger Stress). Webpräsenz Modern: 3–6 Monate (SEO braucht Zeit). Rundum Sorglos: progressiv – erste kleine Gewinne schon in Woche 2, große Effekte ab Woche 4." },
  { q: "Kann ich monatlich kündigen oder bin ich gebunden?", a: "Sie können jederzeit kündigen – nach einer initialen Laufzeit von 3 Monaten mit monatlicher Kündigung. Danach können Sie jederzeit raus, aber ehrlich: Nach 3 Monaten wollen die meisten sowieso nicht mehr raus." },
  { q: "Was ist, wenn mir doch noch ein Feature aus einem anderen Paket gefällt?", a: "Wir machen gerne Custom-Pakete. Kontaktieren Sie uns für ein Gespräch – wir finden eine Lösung." },
  { q: "Wie läuft die Kommunikation? Bin ich an Zeitzonen gebunden?", a: "Nein. Wir sind in der Schweiz, arbeiten in Schweizer Zeitzonen. E-Mails, Slack, Telefon – wie es passt. Ihr Tempo, unser Rhythmus." }
];

const PACKAGES = [
  {
    id: 'p1',
    name: 'BACKOFFICE SORGLOS',
    target: 'Für den gestressten Einzelunternehmer',
    image: 'https://images.unsplash.com/photo-1483058712562-4d969137d886?q=80&w=1000&auto=format&fit=crop',
    description: 'Ihre externe Verwaltungsabteilung. E-Mails, Termine, Rechnungen – alles täglich bis 10 Uhr erledigt.',
    price: 'CHF 2.900–4.900/Monat',
    hours: '15–40 Stunden/Monat',
    aha: 'Sie öffnen morgens die E-Mails und sehen: bereits gelesen, kategorisiert, teilweise beantwortet. Ihr Tag beginnt organisiert.',
    features: [
      'Proaktives E-Mail-Management (täglich bis 10 Uhr)',
      'Kalender- & Terminplanung',
      'Offerten & Rechnungserstellung',
      'Vorbereitende Buchhaltung & Belegmanagement',
      'Telefonisches Nachfassen bei Kunden',
      'CRM-Stammdatenpflege'
    ],
    notIn: ['Vertriebsprozesse / Lead-Gen', 'Website-Betreuung', 'Projekt-Koordination'],
    accent: 'border-white/10'
  },
  {
    id: 'p2',
    name: 'WEBPRÄSENZ MODERN',
    target: 'Für das KMU, das digital durchstarten will',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    description: 'Website-Relaunch + monatliche Betreuung + SEO-Wachstum. Alles aus einer Hand.',
    price: 'ab CHF 5.900/Monat',
    setup: 'Relaunch: CHF 8.000–15.000 (einmalig)',
    hours: '20–35 Stunden/Monat',
    popular: true,
    aha: 'Nach 3–4 Monaten finden neue Kunden Sie über Google. Ihre Website lädt schnell und sieht am Handy top aus.',
    features: [
      'Website-Redesign oder Relaunch',
      'SEO-Grundoptimierung (On-Page & Performance)',
      'Monatliche Content-Pflege',
      'Monitoring & monatliche Reports',
      'Google Business Profil Optimierung',
      'Koordination technischer Partner'
    ],
    notIn: ['Bezahlte Ads (optional zubuchbar)', 'Hochleistungs-SEO (Linkaufbau)', 'App-Programmierung'],
    accent: 'border-[#0ea5e9]/50 bg-[#0ea5e9]/5'
  },
  {
    id: 'p3',
    name: 'RUNDUM SORGLOS',
    target: 'Für die Geschäftsleitung, die alles abgeben will',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    description: 'Backoffice + Vertrieb + Website + Strategie. Wir sind Ihre externe Geschäftsleitung.',
    price: 'CHF 10.900–15.900/Monat',
    hours: '50–80 Stunden/Monat',
    guarantee: 'Erste 4 Wochen sind Optimierungsphase – wir verfeinern kostenlos.',
    aha: 'Nach 4 Wochen ist Ihre Inbox leer, neue Kunden kommen rein und die Strategie stimmt wieder. Sie fokussieren auf Ihr Kerngeschäft.',
    features: [
      'Alles aus Paket 1 + 2',
      'Lead-Akquisition & Vertriebs-Support',
      'Professionelle Erstansprache (LinkedIn/Telefon)',
      'Projekt- & Prozessmanagement',
      'Monatliche Strategie-Calls',
      'Datengetriebene Optimierungsvorschläge'
    ],
    notIn: ['Sales-Positionen besetzen', 'Werbebudget (Ads)', 'Produktentwicklung'],
    accent: 'border-[#ef4444]/30'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'blog' | 'sitemap'>('home');
  const [legalView, setLegalView] = useState<'impressum' | 'datenschutz' | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { damping: 40, stiffness: 250, mass: 0.1, restDelta: 0.001 });
  const translateY = useTransform(smoothY, (y) => -y);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateHeight = useCallback(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    if (contentRef.current) ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [updateHeight, view, selectedBlogPost, openFaq]);

  const scrollToSection = (id: string) => {
    setView('home');
    setLegalView(null);
    setSelectedBlogPost(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = element.offsetTop - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#ef4444] bg-[#080808] font-sans">
      <CustomCursor />
      <FluidBackground />
      <AIChat onScrollToSection={scrollToSection} />
      
      {/* Scroll-Dummy to make scrolling work with fixed container */}
      <div style={{ height: contentHeight }} className="pointer-events-none w-px absolute top-0 left-0" />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -120 }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-12 lg:px-24 py-8 mix-blend-difference"
      >
        <div onClick={() => { setView('home'); setLegalView(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-heading text-xl md:text-2xl font-bold tracking-tighter cursor-pointer">
          OFFICE<span className="text-[#0ea5e9]">HELFER</span>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-widest uppercase">
          {['Leistungen', 'Pakete', 'Vorteile', 'Prozess', 'Über uns'].map((label) => (
            <button key={label} onClick={() => scrollToSection(label.toLowerCase().replace(' ', '-'))} className="hover:text-[#ef4444] transition-colors bg-transparent border-none text-white uppercase tracking-widest">
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollToSection('termin')} className="border border-white/50 px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-[8px] hover:bg-[#ef4444] hover:border-[#ef4444] transition-all text-white bg-transparent">
          Termin buchen
        </button>
      </motion.nav>

      {/* Legal Overlays - Fixed and on top of everything */}
      <AnimatePresence>
        {legalView && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setLegalView(null)} />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative max-w-3xl w-full bg-[#0a0a0a] border border-white/10 p-12 rounded-[32px] overflow-y-auto max-h-[85vh] shadow-2xl"
            >
              <button onClick={() => setLegalView(null)} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors">
                <X className="w-8 h-8" />
              </button>
              {legalView === 'impressum' ? (
                <div className="space-y-8">
                  <h2 className="text-4xl font-heading font-bold uppercase text-[#ef4444]">Impressum</h2>
                  <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm md:text-base">
                    <p><strong>OfficeHelfer Schweiz</strong></p>
                    <p>Geschäftsleitung: Ajdin Elkaz</p>
                    <p>8000 Zürich, Schweiz</p>
                    <p>E-Mail: <span className="text-white font-bold">info@officehelfer.ch</span></p>
                    <p>UID: CHE-XXX.XXX.XXX (In Bearbeitung)</p>
                    <p className="pt-6 border-t border-white/5">Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <h2 className="text-4xl font-heading font-bold uppercase text-[#0ea5e9]">Datenschutz</h2>
                  <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm md:text-base">
                    <p>Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, DSG Schweiz).</p>
                    <p><strong>Datenerfassung auf unserer Website:</strong> Beim Besuch unserer Website werden Cookies gesetzt und Nutzungsdaten anonymisiert erfasst, um unsere Dienstleistungen zu verbessern.</p>
                    <p><strong>Kommunikation:</strong> Wenn Sie uns per E-Mail oder über den Chat kontaktieren, werden Ihre Daten zur Bearbeitung der Anfrage gespeichert.</p>
                    <p><strong>Ihre Rechte:</strong> Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer gespeicherten Daten.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div ref={contentRef} style={{ y: translateY }} className="fixed top-0 left-0 w-full will-change-transform transform-gpu">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {/* HERO SEKTION */}
              <header id="top" className="relative h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" alt="Office Background" className="w-full h-full object-cover opacity-20 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
                </div>
                
                <div className="z-10 max-w-7xl relative">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex justify-center">
                    <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[#0ea5e9] font-mono text-[10px] uppercase tracking-widest">
                      Swiss Quality Assistance
                    </span>
                  </motion.div>
                  <h1 className="text-[9vw] md:text-[6.5vw] leading-[0.9] font-black tracking-tighter mb-10">
                    <GradientText text="IHR EXTERNES BACKOFFICE" as="span" /><br/>
                    <span className="text-white">WÄCHST MIT IHNEN.</span>
                  </h1>
                  <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto text-white/70 leading-relaxed mb-12">
                    Ob Sie nur die E-Mails vom Hals haben wollen oder endlich online stärker werden möchten – wir haben das richtige Paket für Ihren Weg.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => scrollToSection('pakete')} className="bg-[#ef4444] text-white px-10 py-5 rounded-[12px] font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all shadow-2xl shadow-[#ef4444]/20">
                      Zum richtigen Paket
                    </button>
                    <button onClick={() => scrollToSection('über-uns')} className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-[12px] font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-md">
                      Wer steckt dahinter?
                    </button>
                  </div>
                </div>
              </header>

              {/* DREI WEGE SEKTION */}
              <section id="leistungen" className="relative py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" alt="Modern Architecture" className="w-full h-full object-cover opacity-10 grayscale fixed" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
                </div>
                
                <div className="max-w-4xl mx-auto relative z-10">
                  <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase mb-12 leading-tight">
                    Drei Wege. Ein Ziel: Ihre volle Konzentration auf das, <span className="text-[#0ea5e9]">was zählt.</span>
                  </h2>
                  <div className="space-y-8 text-lg text-gray-400 font-light leading-relaxed">
                    <p>OfficeHelfer Schweiz ist kein klassisches Sekretariat, sondern Ihr strategischer Wachstumspartner. Egal ob Sie ein Einzelunternehmer sind, der administriert statt verkauft, oder ein KMU, das endlich skalieren möchte – wir haben die Lösung.</p>
                    <p>Drei Pakete. Drei Einstiegspunkte. Ein Versprechen: Swiss Quality, Schweizerdeutsch, auf Augenhöhe. Keine Überraschungen, keine versteckten Kosten – nur ehrlich, transparent, nachvollziehbar.</p>
                    <p>Geführt von Ajdin Elkaz stellen wir sicher, dass nicht nur die Prozesse passen, sondern auch die Kommunikation. Wir wachsen mit Ihnen – viele Kunden starten mit Paket 1 und upgraden später zu Paket 3. Das ist normal. Das ist gewünscht.</p>
                  </div>
                </div>
              </section>

              {/* PAKETE SEKTION */}
              <section id="pakete" className="py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase opacity-10">PAKETE</h2>
                    <p className="text-[#ef4444] font-mono uppercase tracking-[0.4em] -mt-8 relative z-10 text-sm">Unsere Lösungen für Ihren Erfolg</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {PACKAGES.map((pkg) => (
                      <motion.div key={pkg.id} whileHover={{ y: -15 }} className={`relative group border rounded-[24px] overflow-hidden backdrop-blur-md flex flex-col h-full transition-all ${pkg.accent}`}>
                        {pkg.popular && (
                          <div className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest z-20 flex items-center gap-2">
                            <Star className="w-3 h-3 fill-white" /> Beliebteste Wahl
                          </div>
                        )}
                        
                        <div className="h-48 overflow-hidden relative">
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        </div>

                        <div className="p-8 md:p-10 flex flex-col flex-1">
                          <div className="mb-10">
                            <span className="text-[10px] font-mono text-[#0ea5e9] uppercase tracking-widest mb-4 block">{pkg.target}</span>
                            <h3 className="text-2xl font-heading font-bold mb-4 leading-none tracking-tighter">{pkg.name}</h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">{pkg.description}</p>
                            <div className="text-2xl font-mono font-black text-white">{pkg.price}</div>
                            {pkg.setup && <div className="text-xs text-[#ef4444] font-mono mt-1 uppercase">{pkg.setup}</div>}
                            <div className="mt-4 text-xs font-mono text-white/40 uppercase tracking-widest">{pkg.hours}</div>
                          </div>

                          <div className="flex-1 space-y-12">
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Kernleistungen:</h4>
                              <ul className="space-y-4">
                                {pkg.features.map((f, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm font-light text-gray-300">
                                    <Check className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /> <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                              <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#0ea5e9] mb-3">Der Aha-Moment:</h5>
                              <p className="text-xs italic text-gray-400 leading-relaxed">"{pkg.aha}"</p>
                            </div>
                          </div>

                          <button onClick={() => scrollToSection('termin')} className="w-full mt-12 py-5 bg-[#ef4444] text-white font-bold uppercase tracking-widest text-xs rounded-[12px] hover:bg-white hover:text-black transition-all">
                            Jetzt buchen
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* WARUM OFFICEHELFER SEKTION */}
              <section id="vorteile" className="py-32 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl md:text-6xl font-heading font-black mb-20 leading-tight">
                    WARUM WIR, NICHT IRGENDEINE <br/> <span className="text-[#ef4444]">BILLIG-AGENTUR?</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                      { icon: Globe, title: 'Swiss Quality & Schweizerdeutsch', desc: 'Wir verstehen den Schweizer Markt, sprechen Ihren Dialekt und kennen die Standards. Kommunikation auf Augenhöhe.' },
                      { icon: Settings, title: 'Ausfallsicherheit durch Prozesse', desc: 'Wir arbeiten mit dokumentierten Prozessen. Wenn jemand Urlaub hat, läuft der Laden weiter. Wissen ist nicht an Personen gebunden.' },
                      { icon: Scale, title: 'Kosteneffizienz ohne Überraschungen', desc: 'Keine Sozialabgaben, keine Büromiete. Sie zahlen für Ergebnisse, nicht für Anwesenheit. Transparente Fixpreise.' },
                      { icon: TrendingUp, title: 'Messbare Resultate & Transparenz', desc: 'Wöchentliche Reports und monatliche Dashboards. Sie sehen genau, was wir erreicht haben. Keine Blackbox.' },
                      { icon: Target, title: 'Spezialisiert auf Ihre Branche', desc: 'Erfahrung mit Architekten, Handwerkern und KMU. Wir kennen Ihre Pain Points und Ihren Rhythmus.' }
                    ].map((v, i) => (
                      <div key={i} className="group space-y-6 p-10 bg-white/5 border border-white/10 rounded-[32px] hover:bg-[#0ea5e9]/5 transition-all">
                        <div className="w-14 h-14 bg-[#ef4444] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <v.icon className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-tighter">{v.title}</h4>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* DER PROZESS SEKTION */}
              <section id="prozess" className="py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl md:text-7xl font-heading font-black mb-24 text-center">SO WERDEN SIE TEIL DER <br/> <span className="text-[#0ea5e9]">OFFICEHELFER FAMILIE</span></h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0" />
                    {[
                      { step: '01', icon: Briefcase, title: 'Analyse (1. Woche)', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=400&auto=format&fit=crop', desc: 'Kostenloses 30-Minuten-Gespräch. Wir klären Ihre Schmerz-Punkte und empfehlen das passende Paket.' },
                      { step: '02', icon: Monitor, title: 'Setup (2. Woche)', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop', desc: 'Dokumentation Ihrer Prozesse und Einrichtung der technischen Anbindungen (E-Mail, CRM, Cloud).' },
                      { step: '03', icon: Rocket, title: 'Go-Live (ab 3. Woche)', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&auto=format&fit=crop', desc: 'Wir übernehmen! Sie erhalten wöchentliche Reports und monatliche Optimierungs-Calls.' }
                    ].map((step, i) => (
                      <div key={i} className="relative group z-10 bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all">
                           <img src={step.image} className="w-full h-full object-cover" alt={step.title} />
                        </div>
                        <div className="text-5xl font-black text-[#ef4444]/20 mb-6">{step.step}</div>
                        <h4 className="text-xl font-bold uppercase mb-4 flex items-center gap-3">
                          <step.icon className="w-6 h-6 text-[#0ea5e9]" /> {step.title}
                        </h4>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-20 p-8 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-2xl text-center backdrop-blur-md">
                    <p className="text-sm font-bold uppercase tracking-widest text-white">
                      Garantie: Die ersten 4 Wochen sind Optimierungsphase – wir verfeinern völlig kostenlos, bis alles perfekt läuft.
                    </p>
                  </div>
                </div>
              </section>

              {/* ÜBER UNS SEKTION */}
              <section id="über-uns" className="py-32 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-10">
                    <div>
                      <span className="text-[#0ea5e9] font-mono text-[10px] uppercase tracking-[0.4em] block mb-4">Der Gründer</span>
                      <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter leading-none mb-10">WER STECKT <br/><span className="text-[#ef4444]">DAHINTER?</span></h2>
                    </div>
                    <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                      <p>OfficeHelfer Schweiz wurde gegründet von <strong>Ajdin Elkaz</strong> – mit über 10 Jahren Erfahrung in Backoffice, Prozess-Optimierung und KMU-Unterstützung. Nicht aus akademischen Büchern, sondern aus der echten Praxis.</p>
                      <p>Die Mission: Schweizer Unternehmern wieder Zeit zurückgeben. Weg von der Admin-Drudgerei, hin zu echtem Wachstum.</p>
                      <p>Wir sind nicht perfekt. Aber wir sind zuverlässig, transparent und ständig daran, besser zu werden. Unser Ziel ist es, dass Sie wieder weniger „im“ und mehr „am“ Unternehmen arbeiten können.</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 bg-[#111] shadow-2xl relative group">
                      <img src="https://lh3.googleusercontent.com/d/1uyDLOlbScHFs7RAkS7bDdmmHJNPmhZKS" alt="Ajdin Elkaz" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                         <span className="text-[#0ea5e9] font-mono text-xs uppercase tracking-widest mb-2">Geschäftsleitung</span>
                         <h4 className="text-2xl font-heading font-bold uppercase">Ajdin Elkaz</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ SEKTION */}
              <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a]">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl font-heading font-bold uppercase text-center mb-20">Ihre Fragen. <span className="text-[#ef4444]">Unsere Antworten.</span></h2>
                  <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-8 flex justify-between items-center text-left hover:bg-white/5 transition-colors">
                          <span className="font-bold text-lg">{faq.q}</span>
                          {openFaq === i ? <Minus className="w-5 h-5 text-[#ef4444]" /> : <Plus className="w-5 h-5 text-[#0ea5e9]" />}
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-gray-400 font-light leading-relaxed">
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TERMIN SEKTION */}
              <section id="termin" className="py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop" alt="Meeting" className="w-full h-full object-cover opacity-5 grayscale" />
                </div>
                
                <div className="max-w-7xl mx-auto text-center relative z-10">
                  <h2 className="text-4xl md:text-7xl font-heading font-black uppercase mb-8">BEREIT FÜR DIE <br/> <span className="text-[#ef4444]">VERÄNDERUNG?</span></h2>
                  <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-16">Finden Sie das richtige Paket, oder sind Sie noch unsicher? Buchen Sie Ihr kostenloses 30-Minuten-Gespräch.</p>
                  <div className="relative w-full rounded-[32px] overflow-hidden border border-white/10 bg-[#111] min-h-[700px] shadow-2xl">
                    <iframe src="https://calendly.com/aelkaz/15-min-meeting?background_color=0a0a0a&text_color=ffffff&primary_color=ef4444" width="100%" height="700" frameBorder="0" title="Calendly" />
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                  <div className="space-y-8">
                    <div className="font-heading text-3xl font-bold tracking-tighter">OFFICE<span className="text-[#0ea5e9]">HELFER</span></div>
                    <p className="text-gray-400 text-sm font-light">Schweizer Backoffice-Partner für KMU, Architekten und Handwerksbetriebe.</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-3 text-white"><Mail className="w-4 h-4 text-[#ef4444]" /> info@officehelfer.ch</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold uppercase text-[10px] tracking-widest text-white mb-8">Navigation</h4>
                    <ul className="space-y-4 text-sm text-gray-500 uppercase tracking-widest font-bold">
                      <li onClick={() => scrollToSection('top')} className="cursor-pointer hover:text-white transition-colors list-none">Home</li>
                      <li onClick={() => scrollToSection('pakete')} className="cursor-pointer hover:text-white transition-colors list-none">Pakete</li>
                      <li onClick={() => scrollToSection('über-uns')} className="cursor-pointer hover:text-white transition-colors list-none">Über uns</li>
                      <li onClick={() => scrollToSection('termin')} className="cursor-pointer hover:text-white transition-colors list-none">Kontakt</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold uppercase text-[10px] tracking-widest text-white mb-8">Rechtliches</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li onClick={() => setLegalView('impressum')} className="cursor-pointer hover:text-white transition-colors list-none">Impressum</li>
                      <li onClick={() => setLegalView('datenschutz')} className="cursor-pointer hover:text-white transition-colors list-none">Datenschutz</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold uppercase text-[10px] tracking-widest text-white mb-8">Service</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-mono">Montag - Freitag<br/>08:00 - 18:00 Uhr<br/>Schweizer Zeit</p>
                  </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-widest">
                  © 2025 OfficeHelfer Schweiz ● Geschäftsleitung: Ajdin Elkaz ● All rights reserved.
                </div>
              </footer>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
