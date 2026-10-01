import React, { useState } from 'react';
import type { Scheme, Language, BeneficiaryApplication } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CheckCircle2, Download, X, Printer, Share2, QrCode, ShieldCheck, Clock } from 'lucide-react';
import { speakText } from '../utils/speech';

interface ApplicationModalProps {
  scheme: Scheme;
  currentLang: Language;
  onClose: () => void;
}

const ELIGIBILITY_STEPS: Record<string, { question: Record<Language, string>; options: Record<Language, string[]> }[]> = {
  default: [
    {
      question: {
        hi: 'क्या आपके पास आधार कार्ड है?',
        ta: 'உங்களிடம் ஆதார் அட்டை உள்ளதா?',
        te: 'మీకు ఆధార్ కార్డు ఉందా?',
        kn: 'ನಿಮ್ಮ ಬಳಿ ಆಧಾರ್ ಕಾರ್ಡ್ ಇದೆಯೇ?',
        bn: 'আপনার কাছে আধার কার্ড আছে কি?',
        en: 'Do you have an Aadhaar Card?',
      },
      options: {
        hi: ['हाँ, है ✅', 'नहीं है'],
        ta: ['ஆம், உள்ளது ✅', 'இல்லை'],
        te: ['అవును ✅', 'లేదు'],
        kn: ['ಹೌದು ✅', 'ಇಲ್ಲ'],
        bn: ['হ্যাঁ আছে ✅', 'নেই'],
        en: ['Yes, I have it ✅', 'No, I don\'t'],
      },
    },
    {
      question: {
        hi: 'क्या आपका बैंक में खाता है?',
        ta: 'உங்களுக்கு வங்கிக் கணக்கு உள்ளதா?',
        te: 'మీకు బ్యాంక్ ఖాతా ఉందా?',
        kn: 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಇದೆಯೇ?',
        bn: 'আপনার ব্যাংক একাউন্ট আছে কি?',
        en: 'Do you have a Bank Account?',
      },
      options: {
        hi: ['हाँ, है ✅', 'नहीं है'],
        ta: ['ஆம் ✅', 'இல்லை'],
        te: ['అవును ✅', 'లేదు'],
        kn: ['ಹೌದು ✅', 'ಇಲ್ಲ'],
        bn: ['হ্যাঁ ✅', 'নেই'],
        en: ['Yes ✅', 'No'],
      },
    },
    {
      question: {
        hi: 'क्या आप 18 वर्ष या उससे अधिक उम्र की महिला हैं?',
        ta: 'நீங்கள் 18 வயது அல்லது அதிகமான பெண்ணா?',
        te: 'మీరు 18 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయస్సు గల మహిళా?',
        kn: 'ನೀವು 18 ವರ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು ವಯಸ್ಸಿನ ಮಹಿಳೆಯೇ?',
        bn: 'আপনি কি ১৮ বছর বা তার বেশি বয়সের মহিলা?',
        en: 'Are you a woman aged 18 years or above?',
      },
      options: {
        hi: ['हाँ ✅', 'नहीं'],
        ta: ['ஆம் ✅', 'இல்லை'],
        te: ['అవును ✅', 'కాదు'],
        kn: ['ಹೌದು ✅', 'ಇಲ್ಲ'],
        bn: ['হ্যাঁ ✅', 'না'],
        en: ['Yes ✅', 'No'],
      },
    },
  ],
};

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ scheme, currentLang, onClose }) => {
  const t = TRANSLATIONS[currentLang];
  const [step, setStep] = useState<'eligibility' | 'receipt'>('eligibility');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [receipt, setReceipt] = useState<BeneficiaryApplication | null>(null);

  const questions = ELIGIBILITY_STEPS.default;

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      speakText(questions[currentQ + 1]?.question[currentLang] || '', currentLang);
    } else {
      generateReceipt();
    }
  };

  const generateReceipt = () => {
    const id = `SAKHI-2026-IN-${Math.floor(9000 + Math.random() * 999)}`;
    const newReceipt: BeneficiaryApplication = {
      applicationId: id,
      name: 'आपका नाम / Your Name',
      schemeId: scheme.id,
      schemeName: scheme.name['en'],
      benefitAmount: scheme.financialBenefit,
      village: 'Maduravoyal, Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      phone: '+91 •••••••••',
      aadhaarLast4: '••••',
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Approved',
      cscCenter: 'Maduravoyal E-Seva Kendra',
    };
    setReceipt(newReceipt);
    setStep('receipt');
    speakText(
      currentLang === 'hi'
        ? `बधाई हो बहन! आप पात्र हैं। आपकी आवेदन रसीद तैयार हो गई है। आवेदन नंबर है: ${id}. इसे जन सेवा केंद्र पर दिखाएं।`
        : currentLang === 'ta'
        ? `வாழ்த்துக்கள் அக்கா! நீங்கள் தகுதியுடையவர். உங்கள் விண்ணப்ப எண்: ${id}. இதை இ-சேவை மையத்தில் காட்டுங்கள்.`
        : `Congratulations Sister! You are eligible. Your application token is ${id}. Please show this at your nearest CSC centre.`,
      currentLang
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-700 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-5 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-white/90" />
            <div>
              <h2 className="text-xl font-black">{scheme.name[currentLang]}</h2>
              <p className="text-sm text-white/80">{scheme.financialBenefit} • {t.freeServiceTag}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {step === 'eligibility' ? (
            <div>
              {/* Progress */}
              <div className="flex gap-2 mb-6">
                {questions.map((_, i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= currentQ ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                ))}
              </div>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t.stepCheck} — Question {currentQ + 1} of {questions.length}
              </p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 leading-snug">
                {questions[currentQ].question[currentLang]}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentQ].options[currentLang].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full py-4 px-5 rounded-2xl text-base font-extrabold border-2 transition-all text-left ${
                      i === 0
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : receipt ? (
            <div className="text-center">
              {/* Success */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center mb-3 ring-8 ring-emerald-200 dark:ring-emerald-900">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                  {currentLang === 'hi' ? 'पात्र हैं बहन! 🎉' : currentLang === 'ta' ? 'தகுதியுடையவர்! 🎉' : 'You are Eligible! 🎉'}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.downloadReceipt}</p>
              </div>

              {/* Seva Patra Receipt */}
              <div className="bg-gradient-to-b from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-800/60 border-2 border-dashed border-rose-300 dark:border-rose-800 rounded-2xl p-5 text-left mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-rose-600">🌸 Sakhi AI — सेवा पर्ची / Seva Patra</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Government of India — Digital Application Receipt</p>
                  </div>
                  <QrCode className="w-12 h-12 text-slate-400" />
                </div>

                <div className="space-y-2.5 text-sm">
                  {[
                    { label: 'Application ID', value: receipt.applicationId },
                    { label: 'Scheme', value: receipt.schemeName },
                    { label: 'Benefit Amount', value: receipt.benefitAmount },
                    { label: 'CSC Centre', value: receipt.cscCenter },
                    { label: 'Date & Time', value: receipt.date },
                    { label: 'Status', value: '✅ ' + receipt.status },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center border-b border-rose-100 dark:border-slate-700 pb-1.5">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
                      <span className={`text-xs font-extrabold text-right ${label === 'Status' ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-100'}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-200">
                      {currentLang === 'hi'
                        ? 'इस रसीद को नजदीकी CSC केंद्र पर दिखाएं। यह सेवा पूरी तरह निःशुल्क है।'
                        : currentLang === 'ta'
                        ? 'இந்த ரசீதை அருகிலுள்ள இ-சேவை மையத்தில் காட்டுங்கள். சேவை முற்றிலும் இலவசம்.'
                        : 'Show this receipt at your nearest CSC Centre. This service is completely free.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  Print
                </button>
                <button
                  onClick={() => {
                    const text = `Sakhi AI — Seva Patra\nID: ${receipt.applicationId}\nScheme: ${receipt.schemeName}\nBenefit: ${receipt.benefitAmount}\nStatus: ${receipt.status}\nDate: ${receipt.date}`;
                    navigator.share ? navigator.share({ title: 'Sakhi AI Seva Patra', text }) : navigator.clipboard.writeText(text);
                  }}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button
                  onClick={() => {
                    const el = document.createElement('a');
                    el.download = `Sakhi-Seva-Patra-${receipt.applicationId}.txt`;
                    el.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`Sakhi AI Seva Patra\nID: ${receipt.applicationId}\nScheme: ${receipt.schemeName}\nBenefit: ${receipt.benefitAmount}\nCSC: ${receipt.cscCenter}\nDate: ${receipt.date}\nStatus: ${receipt.status}`)}`;
                    el.click();
                  }}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
