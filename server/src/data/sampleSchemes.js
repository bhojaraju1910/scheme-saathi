export const SAMPLE_SCHEMES = [
  {
    code: 'PM_KISAN',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'agriculture',
    name: {
      en: 'PM Kisan Samman Nidhi',
      hi: 'प्रधानमंत्री किसान सम्मान निधि',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ'
    },
    shortDescription: {
      en: 'Income support of ₹6,000 per year in three 4-monthly installments directly transferred to farmer accounts.',
      hi: 'किसानों के बैंक खातों में ₹6,000 प्रति वर्ष की तीन चार-मासिक किस्तों में सीधी आय सहायता।',
      kn: 'ರೈತರ ಖಾತೆಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ನಂತೆ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ನೇರ ಆರ್ಥಿಕ ನೆರವು ನೀಡುವ ಯೋಜನೆ.'
    },
    benefits: {
      en: '₹6,000 annually paid in 3 equal installments of ₹2,000 directly via Direct Benefit Transfer (DBT).',
      hi: 'डीबीटी के माध्यम से ₹2,000 की तीन समान किस्तों में सालाना ₹6,000 की आर्थिक सहायता।',
      kn: 'ನೇರ ನಗದು ವರ್ಗಾವಣೆ (ಡಿಬಿಟಿ) ಮೂಲಕ ತಲಾ ₹2,000 ದಂತೆ ವರ್ಷಕ್ಕೆ ಮೂರು ಕಂತುಗಳಲ್ಲಿ ಒಟ್ಟು ₹6,000.'
    },
    documentsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Land Ownership Proof / RTC / Khatian', hi: 'भूमि स्वामित्व प्रमाण (खतौनी/भूलेख)', kn: 'ಜಮೀನಿನ ಪಹಣಿ / ಆರ್.ಟಿ.ಸಿ' },
      { en: 'Bank Account Passbook (Aadhaar linked)', hi: 'आधार से जुड़ा बैंक खाता पासबुक', kn: 'ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆ ಪುಸ್ತಕ' }
    ],
    portalUrl: 'https://pmkisan.gov.in',
    minAge: 18,
    maxAge: null,
    maxIncome: 300000,
    genders: [],
    castes: [],
    occupations: ['farmer'],
    disabilityRequired: false
  },
  {
    code: 'PM_JAY',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'healthcare',
    name: {
      en: 'Ayushman Bharat (PM-JAY)',
      hi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
      kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ (ಪಿಎಂ-ಜೈ)'
    },
    shortDescription: {
      en: 'The world\'s largest health assurance scheme providing up to ₹5 lakh cashless healthcare coverage per family annually.',
      hi: 'प्रति परिवार प्रति वर्ष ₹5 लाख तक का कैशलेस स्वास्थ्य सुरक्षा प्रदान करने वाली विश्व की सबसे बड़ी स्वास्थ्य योजना।',
      kn: 'ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವಾರ್ಷಿಕ ₹5 ಲಕ್ಷದವರೆಗೆ ನಗದು ರಹಿತ ಆರೋಗ್ಯ ಚಿಕಿತ್ಸೆ ಒದಗಿಸುವ ವಿಶ್ವದ ಅತಿ ದೊಡ್ಡ ಆರೋಗ್ಯ ಯೋಜನೆ.'
    },
    benefits: {
      en: 'Cashless treatment covering secondary and tertiary care hospitalization up to ₹5,00,000 per year per family.',
      hi: 'प्रति परिवार प्रति वर्ष ₹5,00,000 तक माध्यमिक और तृतीयक देखभाल अस्पताल में भर्ती का कैशलेस उपचार।',
      kn: 'ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವರ್ಷಕ್ಕೆ ₹5,00,000 ವರೆಗೆ ದ್ವಿತೀಯ ಮತ್ತು ತೃತೀಯ ಹಂತದ ಆಸ್ಪತ್ರೆ ಚಿಕಿತ್ಸೆ ವೆಚ್ಚ ಉಚಿತ.'
    },
    documentsRequired: [
      { en: 'Aadhaar Card or Ration Card', hi: 'आधार कार्ड या राशन कार्ड', kn: 'ಆಧಾರ್ ಅಥವಾ ಪಡಿತರ ಚೀಟಿ (ರೇಷನ್ ಕಾರ್ಡ್)' },
      { en: 'Family Identity Proof', hi: 'पारिवारिक पहचान प्रमाण', kn: 'ಕುಟುಂಬ ಗುರುತಿನ ಚೀಟಿ' },
      { en: 'Income Certificate (if BPL)', hi: 'आय प्रमाण पत्र', kn: 'ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ' }
    ],
    portalUrl: 'https://pmjay.gov.in',
    minAge: null,
    maxAge: null,
    maxIncome: 250000,
    genders: [],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'PMAY_GRAMIN_URBAN',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'housing',
    name: {
      en: 'Pradhan Mantri Awas Yojana (PMAY)',
      hi: 'प्रधानमंत्री आवास योजना (PMAY)',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ'
    },
    shortDescription: {
      en: 'Financial assistance and interest subsidies for constructing pucca homes for homeless and low-income families.',
      hi: 'बेघर और कम आय वाले परिवारों के लिए पक्के मकान के निर्माण हेतु वित्तीय सहायता और ब्याज सब्सिडी।',
      kn: 'ವಸತಿ ರಹಿತ ಮತ್ತು ಕಡಿಮೆ ಆದಾಯ ಹೊಂದಿರುವ ಬಡ ಕುಟುಂಬಗಳಿಗೆ ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ಸಬ್ಸಿಡಿ ಮತ್ತು ಆರ್ಥಿಕ ನೆರವು.'
    },
    benefits: {
      en: 'Financial grant of ₹1.20 lakh to ₹2.67 lakh interest subsidy for building a durable pucca house.',
      hi: 'पक्के मकान निर्माण हेतु ₹1.20 लाख की सहायता अथवा ₹2.67 लाख तक की होम लोन ब्याज सब्सिडी।',
      kn: 'ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಾಣಕ್ಕೆ ₹1.20 ಲಕ್ಷ ನೇರ ಧನಸಹಾಯ ಅಥವಾ ₹2.67 ಲಕ್ಷದವರೆಗೆ ಗೃಹ ಸಾಲ ಬಡ್ಡಿ ಸಬ್ಸಿಡಿ.'
    },
    documentsRequired: [
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Income Certificate / BPL Certificate', hi: 'आय प्रमाण पत्र / बीपीएल कार्ड', kn: 'ಆದಾಯ / ಬಿಪಿಎಲ್ ಪ್ರಮಾಣ ಪತ್ರ' },
      { en: 'Land / Site Ownership Document', hi: 'जमीन / प्लॉट का दस्तावेज', kn: 'ನಿವೇಶನದ ಮಾಲೀಕತ್ವದ ದಾಖಲೆ' },
      { en: 'Bank Account Details', hi: 'बैंक पासबुक', kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್' }
    ],
    portalUrl: 'https://pmaymis.gov.in',
    minAge: 18,
    maxAge: 70,
    maxIncome: 600000,
    genders: [],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'SUKANYA_SAMRIDDHI',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'financial_inclusion',
    name: {
      en: 'Sukanya Samriddhi Yojana (SSY)',
      hi: 'सुकन्या समृद्धि योजना',
      kn: 'ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ'
    },
    shortDescription: {
      en: 'High-interest, tax-free small savings initiative for the future education and welfare of girl children under 10.',
      hi: '10 वर्ष से कम आयु की बालिकाओं की शिक्षा और भविष्य की सुरक्षा हेतु उच्च ब्याज दर वाली कर-मुक्त बचत योजना।',
      kn: '10 ವರ್ಷದೊಳಗಿನ ಹೆಣ್ಣು ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ಭವಿಷ್ಯದ ಸುರಕ್ಷತೆಗಾಗಿ ಗರಿಷ್ಠ ಬಡ್ಡಿ ನೀಡುವ ತೆರಿಗೆ ಮುಕ್ತ ಉಳಿತಾಯ ಯೋಜನೆ.'
    },
    benefits: {
      en: 'Guaranteed 8.2% annual compounded interest, 100% tax exemption under Section 80C, matures at age 21.',
      hi: 'वार्षिक 8.2% चक्रवृद्धि ब्याज दर, धारा 80C के तहत पूर्ण कर छूट, 21 वर्ष की आयु पर परिपक्वता।',
      kn: 'ವಾರ್ಷಿಕ 8.2% ಚಕ್ರಬಡ್ಡಿ, ಆದಾಯ ತೆರಿಗೆ ಕಾಯ್ದೆ 80C ಅಡಿಯಲ್ಲಿ ಸಂಪೂರ್ಣ ತೆರಿಗೆ ವಿನಾಯಿತಿ.'
    },
    documentsRequired: [
      { en: 'Birth Certificate of Girl Child', hi: 'बालिका का जन्म प्रमाण पत्र', kn: 'ಹೆಣ್ಣು ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣ ಪತ್ರ' },
      { en: 'Parent / Legal Guardian Aadhaar Card', hi: 'माता-पिता/अभिभावक का आधार कार्ड', kn: 'ಪೋಷಕರ ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Address & Identity Proof', hi: 'निवास प्रमाण पत्र', kn: 'ವಿಳಾಸ ದೃಢೀಕರಣ ಪತ್ರ' }
    ],
    portalUrl: 'https://www.indiapost.gov.in',
    minAge: 0,
    maxAge: 10,
    maxIncome: null,
    genders: ['female'],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'PM_UJJWALA_2',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'women_empowerment',
    name: {
      en: 'Pradhan Mantri Ujjwala Yojana 2.0',
      hi: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
      kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಉಜ್ವಲ ಯೋಜನೆ 2.0'
    },
    shortDescription: {
      en: 'Deposit-free LPG cooking gas connections with free first cylinder and stove to adult women of low-income families.',
      hi: 'कम आय वाले परिवारों की वयस्क महिलाओं को बिना सुरक्षा जमा के मुफ्त एलपीजी गैस कनेक्शन, पहला सिलेंडर और चूल्हा।',
      kn: 'ಕಡಿಮೆ ಆದಾಯದ ಕುಟುಂಬಗಳ ವಯಸ್ಕ ಮಹಿಳೆಯರಿಗೆ ಠೇವಣಿ ರಹಿತ ಉಚಿತ ಎಲ್‌ಪಿಜಿ ಅಡುಗೆ ಅನಿಲ ಸಂಪರ್ಕ, ಉಚಿತ ಸಿಲಿಂಡರ್ ಮತ್ತು ಒಲೆ.'
    },
    benefits: {
      en: 'Free LPG connection, security deposit waiver, completely free first 14.2kg refill cylinder and hotplate stove.',
      hi: 'मुफ्त एलपीजी कनेक्शन, सुरक्षा जमा माफी, पहला रिफिल सिलेंडर और गैस चूल्हा बिल्कुल मुफ्त।',
      kn: 'ಉಚಿತ ಅನಿಲ ಸಂಪರ್ಕ, ಯಾವುದೇ ಠೇವಣಿ ಇಲ್ಲ, ಮೊದಲ ಸಿಲಿಂಡರ್ ಮತ್ತು ಒಲೆ ಸಂಪೂರ್ಣ ಉಚಿತ.'
    },
    documentsRequired: [
      { en: 'BPL Ration Card or SECC Proof', hi: 'बीपीएल राशन कार्ड', kn: 'ಬಿಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿ' },
      { en: 'Woman Applicant Aadhaar Card', hi: 'महिला आवेदक का आधार कार्ड', kn: 'ಮಹಿಳಾ ಅರ್ಜಿದಾರರ ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Bank Passbook with Aadhaar seeding', hi: 'आधार से लिंक बैंक पासबुक', kn: 'ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್' }
    ],
    portalUrl: 'https://www.pmuy.gov.in',
    minAge: 18,
    maxAge: null,
    maxIncome: 250000,
    genders: ['female'],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'PM_SVANIDHI',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'employment',
    name: {
      en: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
      hi: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
      kn: 'ಪಿಎಂ ಸ್ವನಿಧಿ (ಬೀದಿ ವ್ಯಾಪಾರಿಗಳ ಸ್ವಾವಲಂಬನೆ ನಿಧಿ)'
    },
    shortDescription: {
      en: 'Micro-credit working capital loan facility for urban and rural street vendors to kickstart and expand businesses.',
      hi: 'शहरी और ग्रामीण रेहड़ी-पटरी विक्रेताओं के लिए कारोबार विस्तार हेतु रियायती कार्यशील पूंजी ऋण योजना।',
      kn: 'ಬೀದಿ ವ್ಯಾಪಾರಿಗಳು ತಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಪುನರಾರಂಭಿಸಲು ಮತ್ತು ವಿಸ್ತರಿಸಲು ಸಾಲ ಸೌಲಭ್ಯ ಒದಗಿಸುವ ಕಿರು ಸಾಲ ಯೋಜನೆ.'
    },
    benefits: {
      en: 'Collateral-free working capital loans of ₹10,000, ₹20,000, and ₹50,000 with 7% interest subsidy & cashback on digital transactions.',
      hi: 'बिना गारंटी ₹10,000, ₹20,000 और ₹50,000 तक का सस्ता कर्ज, 7% ब्याज सब्सिडी और डिजिटल लेनदेन पर कैशबैक।',
      kn: 'ಯಾವುದೇ ಜಾಮೀನು ಇಲ್ಲದೆ ₹10,000 ದಿಂದ ₹50,000 ವರೆಗೆ ಸಾಲ, ಶೇ. 7 ರಷ್ಟು ಬಡ್ಡಿ ಸಬ್ಸಿಡಿ ಮತ್ತು ಡಿಜಿಟಲ್ ಪಾವತಿಗೆ ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್.'
    },
    documentsRequired: [
      { en: 'Vending Certificate / Vendor ID Card from ULB', hi: 'नगर निकाय द्वारा जारी वेंडिंग प्रमाणपत्र या आईडी कार्ड', kn: 'ಸ್ಥಳೀಯ ಸಂಸ್ಥೆಯ ಬೀದಿ ವ್ಯಾಪಾರಿ ಗುರುತಿನ ಚೀಟಿ' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Bank Account Passbook', hi: 'बैंक खाता विवरण', kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್' }
    ],
    portalUrl: 'https://pmsvanidhi.mohua.gov.in',
    minAge: 18,
    maxAge: 65,
    maxIncome: null,
    genders: [],
    castes: [],
    occupations: ['street_vendor'],
    disabilityRequired: false
  },
  {
    code: 'PM_VISHWAKARMA',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'employment',
    name: {
      en: 'PM Vishwakarma Scheme',
      hi: 'पीएम विश्वकर्मा योजना',
      kn: 'ಪಿಎಂ ವಿಶ್ವಕರ್ಮ ಯೋಜನೆ'
    },
    shortDescription: {
      en: 'Holistic end-to-end support for traditional artisans, carpenters, goldsmiths, cobblers, and sculptors.',
      hi: 'पारंपरिक कारीगरों, बढ़ई, लोहार, सुनार, कुम्हार और मूर्तिकारों के समग्र उत्थान हेतु व्यापक सरकारी सहायता।',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕರ್ಮಿಗಳು, ಬಡಗಿಗಳು, ಕಮ್ಮಾರರು, ಶಿಲ್ಪಿಗಳಿಗೆ ಉಪಕರಣ, ತರಬೇತಿ ಮತ್ತು ಸಾಲ ನೀಡುವ ಸಮಗ್ರ ಯೋಜನೆ.'
    },
    benefits: {
      en: 'Vishwakarma ID card, skill training stipend (₹500/day), ₹15,000 modern toolkit grant, and collateral-free enterprise loan up to ₹3 lakh at 5% interest.',
      hi: 'विश्वकर्मा आईडी कार्ड, ₹500/दिन वजीफे के साथ कौशल प्रशिक्षण, ₹15,000 का आधुनिक टूलकिट अनुदान और 5% ब्याज पर ₹3 लाख तक का ऋण।',
      kn: 'ವಿಶ್ವಕರ್ಮ ಪ್ರಮಾಣಪತ್ರ, ದಿನಕ್ಕೆ ₹500 ಶಿಷ್ಯವೇತನದೊಂದಿಗೆ ಉಚಿತ ತರಬೇತಿ, ₹15,000 ಮೌಲ್ಯದ ಟೂಲ್‌ಕಿಟ್ ಮತ್ತು ಶೇ 5 ಬಡ್ಡಿಯಲ್ಲಿ ₹3 ಲಕ್ಷ ಸಾಲ.'
    },
    documentsRequired: [
      { en: 'Aadhaar Card & Active Mobile Number', hi: 'आधार कार्ड एवं मोबाइल नंबर', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' },
      { en: 'Bank Account Passbook', hi: 'बैंक खाता पासबुक', kn: 'ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ' },
      { en: 'Traditional Trade Proof or Self-Declaration', hi: 'पारंपरिक शिल्प कार्य का प्रमाण / स्व-घोषणा', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಸುಬಿನ ಪುರಾವೆ / ಸ್ವಯಂ ಘೋಷಣೆ' }
    ],
    portalUrl: 'https://pmvishwakarma.gov.in',
    minAge: 18,
    maxAge: 65,
    maxIncome: null,
    genders: [],
    castes: [],
    occupations: ['artisan'],
    disabilityRequired: false
  },
  {
    code: 'IGNOAPS_OLD_AGE',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'social_welfare',
    name: {
      en: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
      hi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
      kn: 'ಇಂದಿರಾ ಗಾಂಧಿ ರಾಷ್ಟ್ರೀಯ ವೃದ್ಧಾಪ್ಯ ಪಿಂಚಣಿ ಯೋಜನೆ'
    },
    shortDescription: {
      en: 'Social security monthly pension for impoverished elderly senior citizens aged 60 and above living below poverty line.',
      hi: 'गरीबी रेखा से नीचे रहने वाले 60 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिकों के लिए मासिक वृद्धावस्था पेंशन।',
      kn: 'ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗಿರುವ 60 ವರ್ಷ ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಯಸ್ಸಿನ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಮಾಸಿಕ ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಪಿಂಚಣಿ.'
    },
    benefits: {
      en: 'Monthly pension of ₹500 to ₹1,500 transferred directly into the pensioner\'s bank account.',
      hi: 'मासिक ₹500 से ₹1,500 की वित्तीय पेंशन सीधे लाभार्थी के बैंक खाते में।',
      kn: 'ಪ್ರತಿ ತಿಂಗಳು ₹500 ರಿಂದ ₹1,500 ವರೆಗೆ ಪಿಂಚಣಿ ಹಣ ನೇರವಾಗಿ ಫಲಾನುಭವಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ.'
    },
    documentsRequired: [
      { en: 'Age Verification Proof (Aadhaar / Voter ID)', hi: 'आयु प्रमाण पत्र (आधार / मतदाता पहचान पत्र)', kn: 'ವಯಸ್ಸಿನ ಪುರಾವೆ (ಆಧಾರ್ / ವೋಟರ್ ಐಡಿ)' },
      { en: 'BPL Card / Income Certificate', hi: 'बीपीएल राशन कार्ड / आय प्रमाण पत्र', kn: 'ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ / ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ' },
      { en: 'Bank Passbook', hi: 'बैंक पासबुक', kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್' }
    ],
    portalUrl: 'https://nsap.nic.in',
    minAge: 60,
    maxAge: null,
    maxIncome: 150000,
    genders: [],
    castes: [],
    occupations: ['retired', 'daily_wage', 'unemployed'],
    disabilityRequired: false
  },
  {
    code: 'POST_MATRIC_SCHOLARSHIP',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'education',
    name: {
      en: 'Post-Matric Scholarship for SC/ST/OBC Students',
      hi: 'अनुसूचित जाति/जनजाति/ओबीसी छात्रों हेतु पोस्ट-मैट्रिक छात्रवृत्ति',
      kn: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ / ಪಂಗಡ / ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ'
    },
    shortDescription: {
      en: 'Complete course fee reimbursement and monthly maintenance support for underprivileged students pursuing higher education.',
      hi: 'उच्च शिक्षा ग्रहण कर रहे वंचित वर्ग के मेधावी विद्यार्थियों के लिए संपूर्ण शिक्षण शुल्क प्रतिपूर्ति और मासिक भत्ता।',
      kn: 'ಉನ್ನತ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿರುವ ಬಡ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಂಪೂರ್ಣ ಕಾಲೇಜು ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ಮಾಸಿಕ ನಿರ್ವಹಣಾ ಭತ್ಯೆ.'
    },
    benefits: {
      en: '100% compulsory tuition and examination fee reimbursement plus ₹1,200/month living allowance.',
      hi: 'शत-प्रतिशत अनिवार्य शिक्षण शुल्क की प्रतिपूर्ति एवं ₹1,200 प्रति माह तक निर्वाह भत्ता।',
      kn: 'ಶೇ 100 ರಷ್ಟು ಕಾಲೇಜು ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ತಿಂಗಳಿಗೆ ₹1,200 ವರೆಗೆ ನಿರ್ವಹಣಾ ವೆಚ್ಚ.'
    },
    documentsRequired: [
      { en: 'Valid Caste Certificate (SC/ST/OBC)', hi: 'सक्षम प्राधिकारी द्वारा जारी जाति प्रमाण पत्र', kn: 'ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರ (SC/ST/OBC)' },
      { en: 'Annual Family Income Certificate (< ₹2.5 Lakh)', hi: 'पारिवारिक वार्षिक आय प्रमाण पत्र', kn: 'ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ (₹2.5 ಲಕ್ಷದೊಳಗೆ)' },
      { en: 'College Admission Receipt & Previous Year Marksheet', hi: 'कॉलेज प्रवेश रसीद एवं पूर्व अंकतालिका', kn: 'ಪ್ರವೇಶ ರಶೀದಿ ಮತ್ತು ಹಿಂದಿನ ವರ್ಷದ ಅಂಕಪಟ್ಟಿ' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್' }
    ],
    portalUrl: 'https://scholarships.gov.in',
    minAge: 15,
    maxAge: 35,
    maxIncome: 250000,
    genders: [],
    castes: ['sc', 'st', 'obc'],
    occupations: ['student'],
    disabilityRequired: false
  },
  {
    code: 'DIVYANGJAN_SWAVALAMBAN',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'social_welfare',
    name: {
      en: 'Divyangjan Swavalamban Scheme (NHFDC)',
      hi: 'दिव्यांगजन स्वावलंबन योजना',
      kn: 'ದಿವ್ಯಾಂಗಜನ ಸ್ವಾವಲಂಬನ ಯೋಜನೆ'
    },
    shortDescription: {
      en: 'Low-interest financial assistance and assistive support for persons with disabilities for self-employment and education.',
      hi: 'दिव्यांग व्यक्तियों को स्वरोजगार, उच्च अध्ययन और सहायक उपकरणों हेतु रियायती ब्याज पर वित्तीय सहायता।',
      kn: 'ವಿಕಲಾಂಗ ವ್ಯಕ್ತಿಗಳಿಗೆ ಸ್ವಾವಲಂಬಿ ಬದುಕು, ಶಿಕ್ಷಣ ಮತ್ತು ಸ್ವಯಂ ಉದ್ಯೋಗಕ್ಕಾಗಿ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಸಾಲ ಮತ್ತು ನೆರವು.'
    },
    benefits: {
      en: 'Concessional loans up to ₹50 Lakh at 5% to 8% interest rate, with up to ₹10,000 rebate on timely repayments.',
      hi: '5% से 8% की रियायती ब्याज दर पर ₹50 लाख तक का ऋण और समय पर पुनर्भुगतान पर विशेष ब्याज छूट।',
      kn: 'ಶೇಕಡಾ 5 ರಿಂದ 8 ರಷ್ಟು ಕಡಿಮೆ ಬಡ್ಡಿದರದಲ್ಲಿ ₹50 ಲಕ್ಷದವರೆಗೆ ಸಾಲ ಸೌಲಭ್ಯ ಮತ್ತು ಸಹಾಯಧನ.'
    },
    documentsRequired: [
      { en: 'UDID Card / Disability Certificate (>40%)', hi: 'यूडीआईडी कार्ड / 40% से अधिक दिव्यांगता प्रमाण पत्र', kn: 'ಯುಡಿಐಡಿ ಕಾರ್ಡ್ / ಶೇ. 40 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಅಂಗವಿಕಲತೆ ಪ್ರಮಾಣ ಪತ್ರ' },
      { en: 'Aadhaar Card', hi: 'आधार कार्ड', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Business / Project Proposal & Bank Passbook', hi: 'व्यवसाय योजना एवं बैंक पासबुक', kn: 'ವ್ಯಾಪಾರ ಯೋಜನೆ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್' }
    ],
    portalUrl: 'http://www.nhfdc.nic.in',
    minAge: 18,
    maxAge: 65,
    maxIncome: null,
    genders: [],
    castes: [],
    occupations: [],
    disabilityRequired: true
  },
  {
    code: 'GRUHA_LAKSHMI_KA',
    level: 'state',
    applicableStates: ['Karnataka'],
    category: 'women_empowerment',
    name: {
      en: 'Gruha Lakshmi Scheme (Karnataka)',
      hi: 'गृह लक्ष्मी योजना (कर्नाटक)',
      kn: 'ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)'
    },
    shortDescription: {
      en: 'Guaranteed direct monthly financial assistance of ₹2,000 to the woman head of household across Karnataka.',
      hi: 'कर्नाटक के प्रत्येक परिवार की महिला मुखिया को प्रतिमाह ₹2,000 की सीधी वित्तीय गारंटी सहायता।',
      kn: 'ಕರ್ನಾಟಕದ ಪ್ರತಿಯೊಂದು ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ಮಾಸಿಕ ₹2,000 ನೇರ ಆರ್ಥಿಕ ನೆರವು ನೀಡುವ ಗ್ಯಾರಂಟಿ ಯೋಜನೆ.'
    },
    benefits: {
      en: '₹2,000 every month transferred unconditionally via DBT directly into the bank account of the female head of family.',
      hi: 'परिवार की महिला मुखिया के बैंक खाते में सीधे ₹2,000 प्रति माह डीबीटी के जरिए ट्रांसफर।',
      kn: 'ಕುಟುಂಬದ ಮಹಿಳಾ ಯಜಮಾನಿಯ ಖಾತೆಗೆ ಪ್ರತಿ ತಿಂಗಳು ₹2,000 ನೇರ ನಗದು ವರ್ಗಾವಣೆ (ಡಿಬಿಟಿ).'
    },
    documentsRequired: [
      { en: 'Karnataka Ration Card (BPL / Antyodaya / APL)', hi: 'कर्नाटक राशन कार्ड (बीपीएल / अंत्योदय / एपीएल)', kn: 'ಪಡಿತರ ಚೀಟಿ (ಬಿಪಿಎಲ್ / ಅಂತ್ಯೋದಯ / ಎಪಿಎಲ್ ಕಾರ್ಡ್)' },
      { en: 'Aadhaar Card of Woman Head & Husband', hi: 'महिला मुखिया एवं पति का आधार कार्ड', kn: 'ಮನೆಯ ಯಜಮಾನಿ ಮತ್ತು ಪತಿಯ ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Aadhaar-seeded Bank Account Passbook', hi: 'आधार से लिंक बैंक पासबुक', kn: 'ಆಧಾರ್ ಜೋಡಣೆಯಾಗಿರುವ ಬ್ಯಾಂಕ್ ಖಾತೆ ಪುಸ್ತಕ' }
    ],
    portalUrl: 'https://sevasindhugs.karnataka.gov.in',
    minAge: 18,
    maxAge: null,
    maxIncome: null,
    genders: ['female'],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'YUVA_NIDHI_KA',
    level: 'state',
    applicableStates: ['Karnataka'],
    category: 'employment',
    name: {
      en: 'Yuva Nidhi Scheme (Karnataka)',
      hi: 'युवा निधि योजना (कर्नाटक)',
      kn: 'ಯುವ ನಿಧಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)'
    },
    shortDescription: {
      en: 'Unemployment monthly allowance for educated youth (degree & diploma holders) seeking employment in Karnataka.',
      hi: 'कर्नाटक के शिक्षित बेरोजगार स्नातकों और डिप्लोमा धारकों को नौकरी खोज के दौरान मासिक वित्तीय संबल।',
      kn: 'ಕರ್ನಾಟಕದ ನಿರುದ್ಯೋಗಿ ಪದವೀಧರರು ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದ ಯುವಕ-ಯುವತಿಯರಿಗೆ ಮಾಸಿಕ ನಿರುದ್ಯೋಗ ಭತ್ಯೆ.'
    },
    benefits: {
      en: '₹3,000/month for degree graduates and ₹1,500/month for diploma holders for up to 24 months via DBT.',
      hi: 'स्नातक पास युवाओं को ₹3,000 प्रति माह तथा डिप्लोमा धारकों को ₹1,500 प्रति माह 2 वर्ष तक।',
      kn: 'ಪದವೀಧರರಿಗೆ ಮಾಸಿಕ ₹3,000 ಮತ್ತು ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದವರಿಗೆ ಮಾಸಿಕ ₹1,500 ರಂತೆ ಗರಿಷ್ಠ 2 ವರ್ಷಗಳವರೆಗೆ ಭತ್ಯೆ.'
    },
    documentsRequired: [
      { en: 'Degree / Diploma Passing Certificate & Marks Cards', hi: 'डिग्री/डिप्लोमा उत्तीर्ण अंकतालिका', kn: 'ಪದವಿ / ಡಿಪ್ಲೊಮಾ ಅಂಕಪಟ್ಟಿ ಮತ್ತು ಉತ್ತೀರ್ಣ ಪ್ರಮಾಣ ಪತ್ರ' },
      { en: 'Karnataka Domicile Proof (Study Certificate of 7+ years in Karnataka)', hi: 'कर्नाटक अधिवास प्रमाण पत्र (7 वर्ष का अध्ययन प्रमाण)', kn: 'ಕರ್ನಾಟಕದ ವಾಸಸ್ಥಳ ದೃಢೀಕರಣ (7 ವರ್ಷಗಳ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ)' },
      { en: 'Aadhaar Card & Bank Account', hi: 'आधार कार्ड एवं बैंक पासबुक', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್' }
    ],
    portalUrl: 'https://sevasindhugs.karnataka.gov.in',
    minAge: 18,
    maxAge: 35,
    maxIncome: null,
    genders: [],
    castes: [],
    occupations: ['unemployed', 'student'],
    disabilityRequired: false
  },
  {
    code: 'GRUHA_JYOTHI_KA',
    level: 'state',
    applicableStates: ['Karnataka'],
    category: 'social_welfare',
    name: {
      en: 'Gruha Jyothi Scheme (Karnataka)',
      hi: 'गृह ज्योति योजना (कर्नाटक)',
      kn: 'ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)'
    },
    shortDescription: {
      en: 'Free domestic electricity up to 200 units every month for all residential domestic households in Karnataka.',
      hi: 'कर्नाटक के सभी घरेलू बिजली उपभोक्ताओं के लिए प्रतिमाह 200 यूनिट तक मुफ्त बिजली।',
      kn: 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಗೃಹಬಳಕೆ ವಿದ್ಯುತ್ ಗ್ರಾಹಕರಿಗೆ ತಿಂಗಳಿಗೆ ಗರಿಷ್ಠ 200 ಯೂನಿಟ್‌ಗಳವರೆಗೆ ಉಚಿತ ವಿದ್ಯುತ್.'
    },
    benefits: {
      en: 'Zero electricity bill for domestic consumption within individual entitled average limit up to 200 units.',
      hi: '200 यूनिट तक के मासिक घरेलू बिजली उपभोग पर शून्य बिजली बिल।',
      kn: 'ತಿಂಗಳಿಗೆ 200 ಯೂನಿಟ್‌ವರೆಗಿನ ಗೃಹಬಳಕೆಯ ವಿದ್ಯುತ್ ಸಂಪೂರ್ಣ ಉಚಿತ (ಶೂನ್ಯ ಬಿಲ್).'
    },
    documentsRequired: [
      { en: 'Electricity Consumer Account ID (Account ID in BESCOM/MESCOM/etc.)', hi: 'बिजली उपभोक्ता खाता संख्या (अकाउंट आईडी)', kn: 'ವಿದ್ಯುತ್ ಗ್ರಾಹಕರ ಖಾತೆ ಸಂಖ್ಯೆ (ಅಕೌಂಟ್ ಐಡಿ)' },
      { en: 'Aadhaar Card of Consumer / Occupant', hi: 'उपभोक्ता का आधार कार्ड', kn: 'ಗ್ರಾಹಕರ / ಮನೆಯವರ ಆಧಾರ್ ಕಾರ್ಡ್' },
      { en: 'Rental Agreement / Voter ID for tenants', hi: 'किराया अनुबंध या मतदाता पहचान पत्र', kn: 'ಬಾಡಿಗೆ ಕರಾರು ಒಪ್ಪಂದ ಅಥವಾ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ' }
    ],
    portalUrl: 'https://sevasindhugs.karnataka.gov.in',
    minAge: 18,
    maxAge: null,
    maxIncome: null,
    genders: [],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'MAJHI_LADKI_BAHIN_MH',
    level: 'state',
    applicableStates: ['Maharashtra'],
    category: 'women_empowerment',
    name: {
      en: 'Mukhyamantri Majhi Ladki Bahin Yojana (Maharashtra)',
      hi: 'मुख्यमंत्री माझी लाडकी बहीण योजना (महाराष्ट्र)',
      kn: 'ಮುಖ್ಯಮಂತ್ರಿ ಮಾಝಿ ಲಾಡ್ಕಿ ಬಹಿನ್ ಯೋಜನೆ (ಮಹಾರಾಷ್ಟ್ರ)'
    },
    shortDescription: {
      en: 'Direct monthly financial aid of ₹1,500 to underprivileged married, widowed, and destitute women aged 21 to 65 in Maharashtra.',
      hi: 'महाराष्ट्र की 21 से 65 वर्ष आयु वर्ग की आर्थिक रूप से कमजोर पात्र महिलाओं को प्रतिमाह ₹1,500 की सीधी सहायता।',
      kn: 'ಮಹಾರಾಷ್ಟ್ರದ 21 ರಿಂದ 65 ವರ್ಷ ವಯಸ್ಸಿನ ಬಡ ಮಹಿಳೆಯರಿಗೆ ಮಾಸಿಕ ₹1,500 ನೇರ ಆರ್ಥಿಕ ಸಹಾಯ ನೀಡುವ ಯೋಜನೆ.'
    },
    benefits: {
      en: 'Direct deposit of ₹1,500 per month into beneficiary bank account for self-reliance and nutritional security.',
      hi: 'स्वावलंबन और पोषण सुरक्षा हेतु लाभार्थी के बैंक खाते में ₹1,500 प्रति माह सीधे जमा।',
      kn: 'ಮಹಿಳೆಯರ ಆರ್ಥಿಕ ಸ್ವಾತಂತ್ರ್ಯ ಮತ್ತು ಕುಟುಂಬ ಪೋಷಣೆಗಾಗಿ ಪ್ರತಿ ತಿಂಗಳು ₹1,500 ನೇರ ಜಮೆ.'
    },
    documentsRequired: [
      { en: 'Maharashtra Domicile Certificate or 15-Year Ration Card', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र / 15 वर्ष पुराना राशन कार्ड', kn: 'ಮಹಾರಾಷ್ಟ್ರ ವಾಸಸ್ಥಳ ದೃಢೀಕರಣ ಪತ್ರ / ರೇಷನ್ ಕಾರ್ಡ್' },
      { en: 'Income Certificate (Family income < ₹2.5 Lakh/yr)', hi: 'आय प्रमाण पत्र (सालाना आय ₹2.5 लाख से कम)', kn: 'ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ (ವಾರ್ಷಿಕ ಆದಾಯ ₹2.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)' },
      { en: 'Aadhaar Card & Bank Passbook', hi: 'आधार कार्ड एवं बैंक पासबुक', kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆ ಪುಸ್ತಕ' }
    ],
    portalUrl: 'https://ladakibahin.maharashtra.gov.in',
    minAge: 21,
    maxAge: 65,
    maxIncome: 250000,
    genders: ['female'],
    castes: [],
    occupations: [],
    disabilityRequired: false
  },
  {
    code: 'STAND_UP_INDIA',
    level: 'central',
    applicableStates: ['ALL'],
    category: 'financial_inclusion',
    name: {
      en: 'Stand-Up India Scheme',
      hi: 'स्टैंड-अप इंडिया योजना',
      kn: 'ಸ್ಟ್ಯಾಂಡ್-ಅಪ್ ಇಂಡಿಯಾ ಯೋಜನೆ'
    },
    shortDescription: {
      en: 'Bank loans between ₹10 lakh and ₹1 crore to promote entrepreneurship among SC, ST, and Women borrowers for greenfield enterprises.',
      hi: 'अनुसूचित जाति, अनुसूचित जनजाति और महिला उद्यमियों को नए उद्यम शुरू करने हेतु ₹10 लाख से ₹1 करोड़ तक बैंक ऋण।',
      kn: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ, ಪರಿಶಿಷ್ಟ ಪಂಗಡ ಮತ್ತು ಮಹಿಳಾ ಉದ್ಯಮಿಗಳಿಗೆ ಹೊಸ ಉದ್ಯಮ ಸ್ಥಾಪಿಸಲು ₹10 ಲಕ್ಷದಿಂದ ₹1 ಕೋಟಿವರೆಗೆ ಬ್ಯಾಂಕ್ ಸಾಲ.'
    },
    benefits: {
      en: 'Composite bank loans from ₹10 Lakh up to ₹1 Crore with lowest commercial rates and handholding support.',
      hi: '₹10 लाख से ₹1 करोड़ तक का समग्र बैंक ऋण, रियायती ब्याज दरें और मेंटरशिप सहायता।',
      kn: '₹10 ಲಕ್ಷದಿಂದ ₹1 ಕೋಟಿವರೆಗಿನ ಸಂಯೋಜಿತ ಬ್ಯಾಂಕ್ ಸಾಲ, ಉದ್ಯಮ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ರಿಯಾಯಿತಿ ಬಡ್ಡಿದರ.'
    },
    documentsRequired: [
      { en: 'Identity Proof (Aadhaar / Voter ID)', hi: 'पहचान प्रमाण पत्र', kn: 'ಗುರುತಿನ ಚೀಟಿ (ಆಧಾರ್ / ವೋಟರ್ ಐಡಿ)' },
      { en: 'Caste Certificate (for SC/ST applicants)', hi: 'जाति प्रमाण पत्र (अ.जा./अ.ज.जा. हेतु)', kn: 'ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರ (SC/ST ಅರ್ಜಿದಾರರಿಗೆ)' },
      { en: 'Detailed Project Report (DPR) for new business', hi: 'नई परियोजना की विस्तृत व्यवसाय रिपोर्ट', kn: 'ಹೊಸ ಉದ್ಯಮದ ಪ್ರಾಜೆಕ್ಟ್ ವರದಿ' },
      { en: 'Pan Card & Bank Account Statement', hi: 'पैन कार्ड एवं 6 माह का बैंक विवरण', kn: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್' }
    ],
    portalUrl: 'https://www.standupmitra.in',
    minAge: 18,
    maxAge: null,
    maxIncome: null,
    genders: ['female'],
    castes: ['sc', 'st'],
    occupations: ['entrepreneur', 'artisan', 'salaried', 'unemployed'],
    disabilityRequired: false
  }
];
