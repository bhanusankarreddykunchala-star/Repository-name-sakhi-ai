import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CSC_CENTRES } from '../data/schemes';
import { MapPin, Phone, Clock, Star, PhoneCall } from 'lucide-react';

interface CSCLocatorProps {
  currentLang: Language;
}

export const CSCLocator: React.FC<CSCLocatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t.cscLocatorTitle}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {currentLang === 'hi' ? 'यहाँ जाकर बिना मोबाइल के भी आवेदन करें — पूरी तरह मुफ्त सहायता' :
             currentLang === 'ta' ? 'இங்கு சென்று, மொபைல் இல்லாமலும் விண்ணப்பிக்கலாம் — முற்றிலும் இலவசம்' :
             'Visit in person for full assisted application — Zero cost, Zero tech needed'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {CSC_CENTRES.map((centre) => (
          <div key={centre.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-blue-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            
            {/* Rating */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(centre.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                ))}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1">{centre.rating}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                {centre.distance}
              </span>
            </div>

            <h3 className="font-black text-slate-900 dark:text-white text-sm leading-snug mb-1">{centre.name}</h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mb-3">{centre.vleName}</p>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{centre.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold">{centre.workingHours}</span>
              </div>
            </div>

            <a
              href={`tel:${centre.phone}`}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-extrabold hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{centre.phone}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Emergency Helpline Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 p-5 text-white shadow-lg shadow-rose-600/25">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="flex items-center justify-between gap-4 flex-wrap relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-lg">181 — {t.tollFreeHelpline}</p>
              <p className="text-sm text-white/80">
                {currentLang === 'hi' ? '24x7 मुफ्त सहायता • घरेलू हिंसा • कानूनी मदद' :
                 currentLang === 'ta' ? '24x7 இலவச உதவி • குடும்ப வன்முறை • சட்ட உதவி' :
                 '24×7 Free • Domestic Violence • Legal Aid • Scheme Help'}
              </p>
            </div>
          </div>
          <a
            href="tel:181"
            className="px-6 py-3 rounded-2xl bg-white text-rose-600 font-black text-lg shadow-md hover:bg-rose-50 transition-colors"
          >
            📞 Dial 181
          </a>
        </div>
      </div>
    </div>
  );
};
