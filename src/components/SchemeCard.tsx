import React, { useState } from 'react';
import type { Scheme, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Volume2, VolumeX, CheckCircle, ArrowRight, Sparkles, Scissors, Heart, Coins, Flame, Milk } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

interface SchemeCardProps {
  scheme: Scheme;
  currentLang: Language;
  onCheckEligibility: (scheme: Scheme) => void;
  onInstantApply: (scheme: Scheme) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  currentLang,
  onCheckEligibility,
  onInstantApply,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isPlaying, setIsPlaying] = useState(false);

  const handleListenAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const textToSpeak = `${scheme.name[currentLang]}. ${scheme.audioPrompt[currentLang]}`;
    speakText(textToSpeak, currentLang, () => {
      setIsPlaying(false);
    });
  };

  const getIcon = () => {
    switch (scheme.icon) {
      case 'Scissors':
        return <Scissors className="w-8 h-8 text-rose-600" />;
      case 'Heart':
        return <Heart className="w-8 h-8 text-amber-600 fill-amber-100 dark:fill-amber-900/30" />;
      case 'Coins':
        return <Coins className="w-8 h-8 text-emerald-600" />;
      case 'Flame':
        return <Flame className="w-8 h-8 text-blue-600" />;
      case 'Milk':
        return <Milk className="w-8 h-8 text-teal-600" />;
      default:
        return <Sparkles className="w-8 h-8 text-rose-600" />;
    }
  };

  return (
    <div className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${scheme.bgColor} ${scheme.borderColor}`}>
      
      {/* Top Row: Icon + Badge + Audio Listen Button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border border-slate-100 dark:border-slate-700">
            {getIcon()}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm">
              {scheme.badge[currentLang]}
            </span>

            {/* Listen Audio Guide Button */}
            <button
              onClick={handleListenAudio}
              className={`p-2.5 rounded-full transition-all duration-200 shadow-md ${
                isPlaying
                  ? 'bg-rose-600 text-white animate-bounce ring-4 ring-rose-300 dark:ring-rose-800'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 border border-slate-200 dark:border-slate-700'
              }`}
              title={isPlaying ? t.stopAudio : t.listenBtn}
              aria-label="Listen audio readout"
            >
              {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-rose-600" />}
            </button>
          </div>
        </div>

        {/* Scheme Name */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug mb-2">
          {scheme.name[currentLang]}
        </h3>

        {/* Highlight Benefit */}
        <div className="inline-block mb-3 px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700">
          <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
            {scheme.subtitle[currentLang]}
          </span>
        </div>

        {/* Description in Simple Mother Tongue */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          {scheme.description[currentLang]}
        </p>

        {/* Documents Required (Checklist) */}
        <div className="mb-6 p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
            आवश्यक कागज़ात (Only 3 Simple Documents):
          </span>
          <div className="space-y-1.5">
            {scheme.documentsRequired[currentLang].map((doc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons for Zero-Tech User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => onCheckEligibility(scheme)}
          className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-sm border-2 border-slate-200 dark:border-slate-600 shadow-sm transition-all text-center flex items-center justify-center gap-2"
        >
          <span>{t.checkEligibilityBtn}</span>
        </button>

        <button
          onClick={() => onInstantApply(scheme)}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-700 hover:to-pink-700 text-white font-black text-sm shadow-lg shadow-rose-600/30 transition-all text-center flex items-center justify-center gap-2 group"
        >
          <span>{t.instantApplyBtn}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
