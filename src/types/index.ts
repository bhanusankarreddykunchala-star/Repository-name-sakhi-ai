export type Language = 'hi' | 'ta' | 'te' | 'kn' | 'bn' | 'en';

export interface Scheme {
  id: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  benefit: Record<Language, string>;
  badge: Record<Language, string>;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: Record<Language, string>;
  audioPrompt: Record<Language, string>;
  documentsRequired: Record<Language, string[]>;
  steps: Record<Language, string[]>;
  financialBenefit: string;
  category: 'skill' | 'maternity' | 'finance' | 'housing' | 'agriculture';
  popularity: number;
}

export interface BeneficiaryApplication {
  applicationId: string;
  name: string;
  schemeId: string;
  schemeName: string;
  benefitAmount: string;
  village: string;
  district: string;
  state: string;
  phone: string;
  aadhaarLast4: string;
  date: string;
  status: 'Approved' | 'Verified' | 'Pending Biometrics';
  cscCenter: string;
}

export interface CscCenter {
  id: string;
  name: string;
  vleName: string;
  distance: string;
  address: string;
  phone: string;
  workingHours: string;
  rating: number;
}
