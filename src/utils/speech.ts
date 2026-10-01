import type { Language } from '../types';

export const LANGUAGE_LOCALES: Record<Language, string> = {
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
  en: 'en-IN',
};

// Real Web SpeechSynthesis helper
export function speakText(text: string, lang: Language, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    if (onEnd) onEnd();
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANGUAGE_LOCALES[lang] || 'hi-IN';
  utterance.rate = 0.9; // Slower, clear speed for rural elder/mother comprehension
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const targetLocale = LANGUAGE_LOCALES[lang];
  const matchedVoice = voices.find(v => v.lang === targetLocale || v.lang.replace('_', '-').startsWith(targetLocale.slice(0, 2)));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis error', e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser speech recognition interface
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

export function createSpeechRecognizer(
  lang: Language,
  onResult: (transcript: string) => void,
  onError: (err: any) => void,
  onEnd: () => void
): { start: () => void; stop: () => void; isSupported: boolean } {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      start: () => {
        onError('Speech recognition not supported in this browser.');
      },
      stop: () => {},
      isSupported: false,
    };
  }

  const recognition: SpeechRecognitionInstance = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = LANGUAGE_LOCALES[lang] || 'hi-IN';

  recognition.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error', event);
    onError(event);
  };

  recognition.onend = () => {
    onEnd();
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (err) {
        console.warn('Recognition start error', err);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {}
    },
    isSupported: true,
  };
}
