import { useState, useEffect } from 'react';
import type { Language, Scheme } from './types';
import { Header } from './components/Header';
import { VoiceHero } from './components/VoiceHero';
import { SchemeCard } from './components/SchemeCard';
import { ApplicationModal } from './components/ApplicationModal';
import { CSCLocator } from './components/CSCLocator';
import { JuryDashboard } from './components/JuryDashboard';
import { SCHEMES } from './data/schemes';
import { TRANSLATIONS } from './data/translations';
import { speakText } from './utils/speech';
import { ShieldCheck, Scissors, PhoneCall } from 'lucide-react';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ta');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'user' | 'jury'>('user');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [modalType, setModalType] = useState<'apply' | 'eligibility' | null>(null);
  const [highlightSchemeId, setHighlightSchemeId] = useState<string | null>(null);
  const [showHelpline, setShowHelpline] = useState(false);

  const t = TRANSLATIONS[currentLang];

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Scroll to highlighted scheme
  useEffect(() => {
    if (highlightSchemeId) {
      const el = document.getElementById(`scheme-${highlightSchemeId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-rose-500', 'ring-offset-2');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-rose-500', 'ring-offset-2');
        }, 3000);
      }
    }
  }, [highlightSchemeId]);

  const handleVoiceSchemeSelect = (schemeId: string) => {
    setHighlightSchemeId(schemeId);
    setTimeout(() => setHighlightSchemeId(null), 4000);
  };

  const handleCheckEligibility = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setModalType('eligibility');
    speakText(
      currentLang === 'hi' ? `${scheme.name[currentLang]} के लिए पात्रता जाँच शुरू हो रही है।` :
      currentLang === 'ta' ? `${scheme.name[currentLang]} திட்டத்திற்கான தகுதி சரிபார்ப்பு தொடங்குகிறது.` :
      `Starting eligibility check for ${scheme.name['en']}.`,
      currentLang
    );
  };

  const handleInstantApply = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setModalType('apply');
  };

  const handleCloseModal = () => {
    setSelectedScheme(null);
    setModalType(null);
  };

  if (viewMode === 'jury') {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <JuryDashboard currentLang={currentLang} onBack={() => setViewMode('user')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">

      {/* Sticky Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(d => !d)}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(v => v === 'user' ? 'jury' : 'user')}
        onOpenHelpline={() => setShowHelpline(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Voice Hero Section */}
        <VoiceHero
          currentLang={currentLang}
          onSchemeSelectByVoice={handleVoiceSchemeSelect}
          onOpenDocScanner={() => {}}
        />

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: ShieldCheck, text: t.freeServiceTag, color: 'emerald' },
            { icon: PhoneCall, text: t.noEnglishRequired, color: 'blue' },
            { icon: Scissors, text: t.zeroTechNeeded, color: 'rose' },
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} className={`flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-bold text-slate-700 dark:text-slate-200`}>
              <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Schemes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{t.popularSchemesTitle}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {currentLang === 'hi' ? 'आवाज़ या एक उंगली से पात्रता जाँचें और तुरंत रसीद पाएं' :
                 currentLang === 'ta' ? 'குரல் அல்லது ஒரு விரல் தொட்டு தகுதி பாருங்கள், உடனே ரசீது பெறுங்கள்' :
                 'Check eligibility by voice or one tap, get instant Seva Patra receipt'}
              </p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-extrabold border border-rose-200 dark:border-rose-800">
              {SCHEMES.length} Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                id={`scheme-${scheme.id}`}
                className="transition-all duration-500 rounded-3xl"
              >
                <SchemeCard
                  scheme={scheme}
                  currentLang={currentLang}
                  onCheckEligibility={handleCheckEligibility}
                  onInstantApply={handleInstantApply}
                />
              </div>
            ))}
          </div>
        </section>

        {/* How Sakhi AI Works (Simple 3-step visual for non-tech users) */}
        <section className="rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 p-8 sm:p-10 text-white shadow-xl shadow-rose-600/20">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8">
            {currentLang === 'hi' ? 'सखी AI कैसे काम करती है? (केवल 3 आसान कदम)' :
             currentLang === 'ta' ? 'சகி AI எப்படி செயல்படுகிறது? (3 எளிய படிகள்)' :
             'How Sakhi AI Works (Zero Digital Knowledge Needed)'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { emoji: '🎤', step: t.stepCheck, desc: currentLang === 'hi' ? 'माइक दबाएं और अपनी ज़रूरत बताएं। कोई टाइपिंग नहीं।' : currentLang === 'ta' ? 'மைக் அழுத்தி உங்கள் தேவை சொல்லுங்கள். தட்டச்சு தேவையில்லை.' : 'Tap mic and speak your need. No typing. No reading.' },
              { emoji: '📋', step: t.stepDocs, desc: currentLang === 'hi' ? 'सखी AI आपको बताएगी — सिर्फ 3 आसान कागज़ात चाहिए।' : currentLang === 'ta' ? 'சகி மூன்று எளிய ஆவணங்கள் மட்டும் என்று கூறும்.' : 'Sakhi checks eligibility and tells which 3 simple documents are needed.' },
              { emoji: '🎉', step: t.stepApply, desc: currentLang === 'hi' ? 'तुरंत आपकी सेवा पर्ची तैयार। CSC केंद्र पर दिखाएं।' : currentLang === 'ta' ? 'உடனடியாக விண்ணப்ப ரசீது தயார். இ-சேவை மையத்தில் காட்டுங்கள்.' : 'Instant digital Seva Patra receipt generated. Show at any CSC centre.' },
            ].map(({ emoji, step, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl mb-4 shadow-inner border border-white/30">
                  {emoji}
                </div>
                <p className="text-lg font-black mb-2">{step}</p>
                <p className="text-sm text-white/85 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CSC Locator */}
        <CSCLocator currentLang={currentLang} />

      </main>

      {/* Application / Eligibility Modal */}
      {selectedScheme && (modalType === 'apply' || modalType === 'eligibility') && (
        <ApplicationModal
          scheme={selectedScheme}
          currentLang={currentLang}
          onClose={handleCloseModal}
        />
      )}

      {/* Emergency Helpline 181 Modal */}
      {showHelpline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowHelpline(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-rose-200 dark:border-rose-900" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-4">📞</div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">181 Helpline</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{t.tollFreeHelpline}</p>
            <p className="text-xs text-slate-400 mb-6">24×7 | Domestic Violence | Legal Aid | Scheme Assistance</p>
            <a
              href="tel:181"
              className="block w-full py-4 rounded-2xl bg-rose-600 text-white font-black text-xl shadow-lg shadow-rose-600/30 hover:bg-rose-700 transition-colors"
            >
              Dial 181 (Free)
            </a>
            <button onClick={() => setShowHelpline(false)} className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-2xl">🌸</span>
            <span className="font-black text-xl text-slate-900 dark:text-white">Sakhi AI</span>
            <span className="text-sm text-slate-400">•</span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Built at HackArena 2026 • Dr. MGR University</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Powered by Web Speech API + Browser Voice Recognition. Works fully offline for rural areas. 
            Zero English required. Zero digital literacy needed. One voice. One tap. One life changed.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {['React + Vite', 'Tailwind CSS', 'Recharts', 'Web Speech API', 'TypeScript', '100% Open Source'].map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
