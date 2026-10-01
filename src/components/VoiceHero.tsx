import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Mic, Sparkles, Volume2, Radio } from 'lucide-react';
import { speakText, stopSpeaking, createSpeechRecognizer } from '../utils/speech';

interface VoiceHeroProps {
  currentLang: Language;
  onSchemeSelectByVoice: (schemeId: string) => void;
  onOpenDocScanner: () => void;
}

export const VoiceHero: React.FC<VoiceHeroProps> = ({
  currentLang,
  onSchemeSelectByVoice,
  onOpenDocScanner: _onOpenDocScanner,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [sakhiReply, setSakhiReply] = useState('');
  const [statusMessage, setStatusMessage] = useState(t.micHelpText);

  useEffect(() => {
    setStatusMessage(t.micHelpText);
  }, [currentLang, t.micHelpText]);

  // Handle user speech recognition
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      setStatusMessage(t.micHelpText);
      return;
    }

    stopSpeaking();
    setIsSpeaking(false);
    setIsListening(true);
    setStatusMessage(t.micListeningText);
    setUserTranscript('');

    const recognizer = createSpeechRecognizer(
      currentLang,
      (transcript) => {
        setIsListening(false);
        setUserTranscript(transcript);
        processVoiceCommand(transcript);
      },
      (err) => {
        setIsListening(false);
        console.warn('Voice input error, using simulated voice assistant:', err);
        // Fallback simulation for offline / mic permission block
        simulateVoiceDetection();
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer.isSupported) {
      recognizer.start();
    } else {
      // Automatic polite fallback if browser doesn't have mic permission
      simulateVoiceDetection();
    }
  };

  // Process voice input and match scheme
  const processVoiceCommand = (text: string) => {
    setStatusMessage(t.micProcessingText);
    const lower = text.toLowerCase();

    let matchedScheme = 'pm-vishwakarma-tailor';
    let voiceReply = '';

    if (lower.includes('tailor') || lower.includes('silai') || lower.includes('தையல்') || lower.includes('కుట్టు') || lower.includes('ಹೊಲಿಗೆ') || lower.includes('সেলাই')) {
      matchedScheme = 'pm-vishwakarma-tailor';
      voiceReply = currentLang === 'ta' 
        ? 'தையல் இயந்திரத்திற்கு ₹15,000 மானியம் மற்றும் 5 நாள் இலவச பயிற்சி உள்ளது அக்கா! உங்கள் விண்ணப்ப சீட்டை தயார் செய்கிறேன்.'
        : currentLang === 'hi'
        ? 'सिलाई मशीन के लिए ₹15,000 की सरकारी सहायता और 5 दिन की मुफ्त ट्रेनिंग उपलब्ध है बहन! मैं आपके लिए आवेदन पर्ची तैयार कर रही हूँ।'
        : currentLang === 'te'
        ? 'కుట్టు మిషన్ కోసం ₹15,000 ఉచిత గ్రాంట్ మరియు 5 రోజుల శిక్షణ ఉంది అక్కా! మీ దరఖాస్తు టోకెన్ తెరుస్తున్నాను.'
        : 'Under PM Vishwakarma, you get ₹15,000 for a free sewing machine and ₹500 daily stipend during 5-day training. Preparing your token.';
    } else if (lower.includes('baby') || lower.includes('pregnant') || lower.includes('गर्भवती') || lower.includes('கர்ப்பிணி') || lower.includes('గర్భిణీ') || lower.includes('matru') || lower.includes('6000') || lower.includes('६०००')) {
      matchedScheme = 'pm-matru-vandana';
      voiceReply = currentLang === 'ta'
        ? 'தாய்மை நல திட்டத்தில் கர்ப்பிணி பெண்களுக்கு ₹6,000 நேரடியாக வங்கிக் கணக்கில் கிடைக்கும் அக்கா!'
        : currentLang === 'hi'
        ? 'गर्भवती महिलाओं के लिए ₹6,000 सीधे बैंक खाते में मिलेंगे बहन! ममता कार्ड और आधार से यह तुरंत मिल जाता है।'
        : 'Under PM Matru Vandana, pregnant mothers receive ₹6,000 direct bank transfer for nutrition.';
    } else if (lower.includes('loan') || lower.includes('shg') || lower.includes('समूह') || lower.includes('சுயஉதவி') || lower.includes('సంఘం') || lower.includes('lakhpati') || lower.includes('லட்சாதிபதி')) {
      matchedScheme = 'lakhpati-didi-shg';
      voiceReply = currentLang === 'ta'
        ? 'லட்சாதிபதி சகோதரி திட்டத்தில் மகளிர் சுயஉதவி குழுக்களுக்கு ₹1 லட்சம் முதல் ₹5 லட்சம் வரை பிணையில்லா கடன் கிடைக்கிறது அக்கா!'
        : 'Under Lakhpati Didi, you get up to ₹5 Lakh collateral-free loan for your own business.';
    } else if (lower.includes('gas') || lower.includes('cylinder') || lower.includes('गैस') || lower.includes('எரிவாயு') || lower.includes('సిలిండర్') || lower.includes('ujjwala')) {
      matchedScheme = 'pm-ujjwala-gas';
      voiceReply = currentLang === 'ta'
        ? 'உஜ்வாலா திட்டத்தில் இலவச கேஸ் அடுப்பும், சிலிண்டரும் உடனே கிடைக்கும் அக்கா!'
        : 'Under PM Ujjwala, you receive a free gas stove and cylinder delivered to your doorstep.';
    } else {
      matchedScheme = 'pm-vishwakarma-tailor';
      voiceReply = currentLang === 'ta'
        ? 'உங்கள் குரலை கேட்டேன் அக்கா. பெண்களுக்கான மிக முக்கிய திட்டமான தையல் இயந்திர திட்ட விவரங்களை காட்டுகிறேன்.'
        : 'I heard you sister! Showing you the most recommended scheme for self-employment.';
    }

    setSakhiReply(voiceReply);
    setIsSpeaking(true);
    speakText(voiceReply, currentLang, () => {
      setIsSpeaking(false);
      onSchemeSelectByVoice(matchedScheme);
    });
  };

  // Friendly simulation if mic hardware is unavailable or in noisy demo hall
  const simulateVoiceDetection = () => {
    setTimeout(() => {
      const sample = t.queryExamples[0];
      setUserTranscript(sample);
      processVoiceCommand(sample);
    }, 1800);
  };

  const handleChipClick = (query: string) => {
    setUserTranscript(query);
    processVoiceCommand(query);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent p-6 sm:p-10 border border-rose-200/80 dark:border-rose-950 shadow-xl backdrop-blur-sm">
      
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-rose-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        
        {/* Zero-Tech Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 text-xs sm:text-sm font-bold border border-rose-300 dark:border-rose-800 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-rose-600 animate-spin" />
          <span>{t.zeroTechNeeded} • {t.noEnglishRequired}</span>
        </div>

        {/* Compassionate Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
          {t.welcomeGreeting}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-8">
          {t.tagline}
        </p>

        {/* GIANT PULSATING MICROPHONE BUTTON (Zero-Friction Voice Action) */}
        <div className="relative my-4 flex flex-col items-center">
          
          {/* Pulsing ripples when listening */}
          {isListening && (
            <div className="absolute inset-0 -m-6 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
          )}

          <button
            onClick={handleToggleVoice}
            className={`group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none select-none ${
              isListening
                ? 'bg-rose-600 text-white scale-110 shadow-rose-600/50 ring-8 ring-rose-400/40 animate-pulse'
                : isSpeaking
                ? 'bg-amber-500 text-white scale-105 shadow-amber-500/50 ring-8 ring-amber-300/40'
                : 'bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-500 text-white hover:scale-105 shadow-rose-600/40 ring-4 ring-rose-200 dark:ring-rose-900'
            }`}
            aria-label="Tap to speak"
          >
            {isListening ? (
              <>
                <Radio className="w-12 h-12 animate-pulse mb-1" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Listening</span>
              </>
            ) : isSpeaking ? (
              <>
                <Volume2 className="w-12 h-12 animate-bounce mb-1" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider">Speaking</span>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12 sm:w-14 sm:h-14 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-black uppercase tracking-wider">Tap & Speak</span>
              </>
            )}
          </button>

          {/* Current Status Message */}
          <div className="mt-5 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isListening ? 'bg-rose-500 animate-ping' : isSpeaking ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
              {statusMessage}
            </span>
          </div>

          {/* User Transcript & Sakhi Voice Audio Bubble */}
          {(userTranscript || sakhiReply) && (
            <div className="mt-4 w-full max-w-lg p-4 rounded-2xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-slate-700 shadow-md text-left transition-all">
              {userTranscript && (
                <div className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 mb-2">
                  <span className="font-bold text-rose-600">You said:</span>
                  <span className="italic font-medium">"{userTranscript}"</span>
                </div>
              )}
              {sakhiReply && (
                <div className="text-sm text-emerald-700 dark:text-emerald-300 flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-emerald-600">Sakhi:</span>
                  <span>{sakhiReply}</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Quick One-Touch Voice Chips (For Zero-Tech / Hesitant Users) */}
        <div className="mt-8 w-full">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            {t.quickQuestionsTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {t.queryExamples.map((query, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(query)}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-all shadow-sm flex items-center gap-2"
              >
                <Mic className="w-3.5 h-3.5 text-rose-500" />
                <span>{query}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
