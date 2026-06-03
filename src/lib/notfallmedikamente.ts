export interface NotfallMedikament {
  name: string;
  wirkstoff: string;
  indikation: string;
  dosierung: string;
  applikation: string;
  maxDosis: string;
  hinweise: string;
  kategorie: string;
}

export const notfallMedikamente: NotfallMedikament[] = [
  { name: 'Adrenalin (Suprarenin®)', wirkstoff: 'Epinephrin', indikation: 'Anaphylaxie, Reanimation, Asthmaanfall (schwer)', dosierung: 'Rea: 1 mg i.v. alle 3-5 min. Anaphylaxie: 0,3-0,5 mg i.m.', applikation: 'i.v. / i.m. / endotracheal', maxDosis: '3 mg (Rea)', hinweise: 'Nicht mit Bikarbonat mischen.', kategorie: 'Reanimation' },
  { name: 'Amiodaron (Cordarex®)', wirkstoff: 'Amiodaron', indikation: 'Kammerflimmern, VT, Vorhofflimmern', dosierung: 'Rea: 300 mg i.v. Bolus, ggf. 150 mg nach 5 min', applikation: 'i.v. über ZVK bevorzugt', maxDosis: '2,2 g / 24 h', hinweise: 'Nur mit 5% Glucose verdünnen!', kategorie: 'Antiarrhythmikum' },
  { name: 'Atropin (Atropinsulfat)', wirkstoff: 'Atropinsulfat', indikation: 'Bradykardie, AV-Block', dosierung: '0,5-1 mg i.v., alle 3-5 min wiederholen', applikation: 'i.v.', maxDosis: '3 mg', hinweise: 'Bei Dosen < 0,5 mg paradoxe Bradykardie möglich.', kategorie: 'Parasympatholytikum' },
  { name: 'Furosemid (Lasix®)', wirkstoff: 'Furosemid', indikation: 'Lungenödem, Hypertonie, Hyperkaliämie', dosierung: '20-80 mg i.v., ggf. wiederholen', applikation: 'i.v. (langsam!)', maxDosis: '1.000 mg / 24 h', hinweise: 'Otototoxizität bei Bolusgabe > 4 mg/min.', kategorie: 'Diuretikum' },
  { name: 'Morphin (Morphinsulfat)', wirkstoff: 'Morphinsulfat', indikation: 'ACS, starke Schmerzen, Lungenödem', dosierung: '2-5 mg i.v., titrierend alle 5-10 min', applikation: 'i.v. / s.c.', maxDosis: 'Nach Wirkung titrieren', hinweise: 'Atemdepression! Naloxon bereithalten.', kategorie: 'Analgetikum' },
  { name: 'Midazolam (Dormicum®)', wirkstoff: 'Midazolam', indikation: 'Status epilepticus, Sedierung', dosierung: '5-10 mg i.v./i.m. Notfall: 10 mg bukkal/nasal', applikation: 'i.v. / i.m. / bukkal / nasal', maxDosis: '15 mg', hinweise: 'Atemdepression! Nur unter Monitoring.', kategorie: 'Benzodiazepin' },
  { name: 'Naloxon (Narcanti®)', wirkstoff: 'Naloxon', indikation: 'Opioid-Überdosierung', dosierung: '0,4-2 mg i.v., alle 2-3 min', applikation: 'i.v. / i.m. / s.c. / nasal', maxDosis: '10 mg', hinweise: 'Kurze HWZ! Rebound möglich.', kategorie: 'Antidot' },
  { name: 'Urapidil (Ebrantil®)', wirkstoff: 'Urapidil', indikation: 'Hypertensive Krise', dosierung: '10-50 mg i.v. langsam', applikation: 'i.v.', maxDosis: '50 mg Bolus', hinweise: 'Cave zerebrale Ischämie.', kategorie: 'Antihypertensivum' },
  { name: 'Metoprolol (Beloc®)', wirkstoff: 'Metoprolol', indikation: 'ACS, SVT', dosierung: '5 mg i.v. alle 5 min bis max 15 mg', applikation: 'i.v.', maxDosis: '15 mg i.v.', hinweise: 'Nicht bei Asthma/COPD.', kategorie: 'Betablocker' },
  { name: 'Prednisolon (Solu-Decortin®)', wirkstoff: 'Prednisolon', indikation: 'Anaphylaxie, Asthmaanfall', dosierung: '100-250 mg i.v.', applikation: 'i.v.', maxDosis: '1.000 mg', hinweise: 'Wirkungseintritt nach 30-60 min.', kategorie: 'Kortikosteroid' },
  { name: 'Clemastin (Tavegil®)', wirkstoff: 'Clemastin', indikation: 'Anaphylaxie, allergische Reaktion', dosierung: '2 mg i.v.', applikation: 'i.v. langsam', maxDosis: '4 mg', hinweise: 'Cave: i.v. schnell → Blutdruckabfall.', kategorie: 'Antihistaminikum' },
  { name: 'Diazepam (Valium®)', wirkstoff: 'Diazepam', indikation: 'Status epilepticus, Panik', dosierung: '5-10 mg i.v., ggf. nach 10 min', applikation: 'i.v. / rektal', maxDosis: '30 mg', hinweise: 'Rektaliole Kinder: 5-10 mg.', kategorie: 'Benzodiazepin' },
  { name: 'Butylscopolamin (Buscopan®)', wirkstoff: 'Butylscopolamin', indikation: 'Kolik, Spasmen', dosierung: '20-40 mg i.v.', applikation: 'i.v. / i.m.', maxDosis: '100 mg / 24 h', hinweise: 'Anticholinerg: Mundtrockenheit.', kategorie: 'Spasmolytikum' },
  { name: 'Metamizol (Novalgin®)', wirkstoff: 'Metamizol', indikation: 'Starke Schmerzen, Koliken', dosierung: '1-2,5 g i.v. als Kurzinfusion', applikation: 'i.v. / p.o.', maxDosis: '5 g / 24 h', hinweise: 'Agranulozytose-Risiko! Cave: RR-Abfall.', kategorie: 'Analgetikum' },
  { name: 'Nitroglycerin (Perlinganit®)', wirkstoff: 'Glyceroltrinitrat', indikation: 'ACS, Lungenödem', dosierung: '1-2 Hübe sublingual', applikation: 's.l. / i.v.', maxDosis: 'Nach RR titrieren', hinweise: 'Nicht bei RR < 90 mmHg.', kategorie: 'Vasodilatator' },
  { name: 'ASS (Aspirin®)', wirkstoff: 'Acetylsalicylsäure', indikation: 'ACS, akuter Myokardinfarkt', dosierung: '250-500 mg i.v. oder 300 mg p.o.', applikation: 'i.v. / p.o.', maxDosis: '500 mg', hinweise: 'Bei ACS immer geben.', kategorie: 'Thrombozytenhemmer' },
  { name: 'Heparin (unfraktioniert)', wirkstoff: 'Heparin-Natrium', indikation: 'ACS, Lungenembolie', dosierung: 'ACS: 5.000 IE i.v. Bolus', applikation: 'i.v. / s.c.', maxDosis: 'Nach PTT', hinweise: 'HIT-Risiko, aPTT-Kontrolle.', kategorie: 'Antikoagulans' },
  { name: '10% Calciumgluconat', wirkstoff: 'Calciumgluconat', indikation: 'Hyperkaliämie, Hypokalzämie', dosierung: '10-30 ml langsam i.v.', applikation: 'i.v. (langsam!)', maxDosis: '30 ml', hinweise: 'Nicht mit Bikarbonat mischen.', kategorie: 'Elektrolyt' },
];
