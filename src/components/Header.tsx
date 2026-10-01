import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Volume2, Moon, Sun, BarChart3, Users, PhoneCall } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  viewMode: 'user' | 'jury';
  onToggleViewMode: () => void;
  onOpenHelpline: () => void;
}

const LANGUAGES: { code: Language; label: string; script: string }[] = [
  { code: 'ta', label: 'தமிழ்', script: 'Tamil' },
  { code: 'hi', label: 'हिन्दी', script: 'Hindi' },
  { code: 'te', label: 'తెలుగు', script: 'Telugu' },
  { code: 'kn', label: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'bn', label: 'বাংলা', script: 'Bengali' },
  { code: 'en', label: 'English', script: 'English' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  viewMode,
  onToggleViewMode,
  onOpenHelpline,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleSpeakWelcome = () => {
    speakText(t.welcomeGreeting, currentLang);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-rose-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => viewMode === 'jury' && onToggleViewMode()}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/25 ring-2 ring-rose-200 dark:ring-rose-900">
              <span className="text-2xl" role="img" aria-label="Sakhi">🌸</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                  Sakhi AI
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-800">
                  सखी / சகி
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center: Language Selector Pills */}
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  stopSpeaking();
                  onLanguageChange(lang.code);
                  speakText(TRANSLATIONS[lang.code].welcomeGreeting, lang.code);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  currentLang === lang.code
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
                }`}
                title={lang.script}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Audio Speak Button */}
            <button
              onClick={handleSpeakWelcome}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 font-semibold text-xs transition-colors"
              title="Listen in your language"
            >
              <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="hidden sm:inline">{t.listenBtn}</span>
            </button>

            {/* Helpline 181 Dial */}
            <button
              onClick={onOpenHelpline}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-semibold text-xs transition-colors"
              title="Emergency Women Helpline"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">181</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Switch to Jury / Civic Dashboard Button (The Killer Feature) */}
            <button
              onClick={onToggleViewMode}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                viewMode === 'jury'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-100 dark:to-slate-200 text-white dark:text-slate-900 hover:opacity-95'
              }`}
            >
              {viewMode === 'jury' ? (
                <>
                  <Users className="w-4 h-4" />
                  <span>{t.userPortalBtn}</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 text-amber-300 dark:text-amber-600" />
                  <span>{t.civicDashboardBtn}</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Language Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                stopSpeaking();
                onLanguageChange(lang.code);
                speakText(TRANSLATIONS[lang.code].welcomeGreeting, lang.code);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                currentLang === lang.code
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
