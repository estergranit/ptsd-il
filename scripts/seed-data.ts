// AUTO-GENERATED from ../PTSD.IL/src/data/static/* (see docs/content-model-redesign.md).
// Do not edit by hand - regenerate. Stable keys (slug/id/key/ref/groupKey) are resolved to
// entity ids by scripts/seed.ts at backfill time.
/* eslint-disable */

export interface SeedLanguage { id: string; name: string; direction: string }
export interface SeedCategory { slug: string; name: string; parentSlug?: string }
export interface SeedAudience { key: string; name: string }
export interface SeedAgeGroup { key: string; name: string; min: number; max: number }
export interface SeedCommunity { name: string; description: string | null; location: string | null; meetingType: string | null; organization: string | null; contactUrl: string | null; audienceKeys: string[] }
export interface SeedArticleLink { label: string; url: string }
export interface SeedArticle {
  ref?: string; parentRef?: string; groupKey?: string;
  type: string; langId: string; title: string;
  description?: string | null; content?: string | null; url?: string | null;
  authors?: string | null; year?: string | null; links?: SeedArticleLink[] | null;
  categorySlugs?: string[]; audienceKeys?: string[]; ageGroupKeys?: string[]; sortOrder?: number;
}

export const SEED_LANGUAGES: SeedLanguage[] = [
  {
    "id": "he",
    "name": "עברית",
    "direction": "rtl"
  },
  {
    "id": "ar",
    "name": "العربية",
    "direction": "rtl"
  },
  {
    "id": "en",
    "name": "English",
    "direction": "ltr"
  }
];

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    "slug": "self-help",
    "name": "כלים לעזרה עצמית"
  },
  {
    "slug": "treatment",
    "name": "מסלול טיפול"
  },
  {
    "slug": "rights",
    "name": "זכויות"
  },
  {
    "slug": "ptsd-info",
    "name": "מידע על פוסט-טראומה"
  },
  {
    "slug": "second-circle",
    "name": "המעגל השני"
  },
  {
    "slug": "sources",
    "name": "מקורות"
  },
  {
    "slug": "children",
    "name": "תוכן לילדים"
  },
  {
    "slug": "sleep",
    "name": "שינה",
    "parentSlug": "self-help"
  },
  {
    "slug": "journaling",
    "name": "כתיבה",
    "parentSlug": "self-help"
  },
  {
    "slug": "apps",
    "name": "אפליקציות",
    "parentSlug": "self-help"
  },
  {
    "slug": "complementary",
    "name": "טיפול משלים",
    "parentSlug": "self-help"
  },
  {
    "slug": "research",
    "name": "מחקר",
    "parentSlug": "sources"
  },
  {
    "slug": "clinical",
    "name": "קליני",
    "parentSlug": "sources"
  },
  {
    "slug": "ngo",
    "name": "עמותות",
    "parentSlug": "sources"
  },
  {
    "slug": "international",
    "name": "בינלאומי",
    "parentSlug": "sources"
  },
  {
    "slug": "official",
    "name": "רשמי",
    "parentSlug": "sources"
  }
];

export const SEED_AUDIENCES: SeedAudience[] = [
  {
    "key": "security_forces",
    "name": "כוחות הביטחון"
  },
  {
    "key": "hostilities",
    "name": "נפגעי פעולות איבה"
  },
  {
    "key": "general",
    "name": "כללי"
  },
  {
    "key": "sexual_harassment",
    "name": "נפגעות/י תקיפה מינית"
  },
  {
    "key": "spouses",
    "name": "בני/בנות זוג"
  },
  {
    "key": "parents",
    "name": "הורים"
  },
  {
    "key": "accidents_work",
    "name": "תאונות עבודה"
  }
];

export const SEED_AGE_GROUPS: SeedAgeGroup[] = [
  {
    "key": "0-4",
    "name": "0-4",
    "min": 0,
    "max": 4
  },
  {
    "key": "4-6",
    "name": "4-6",
    "min": 4,
    "max": 6
  },
  {
    "key": "7-10",
    "name": "7-10",
    "min": 7,
    "max": 10
  },
  {
    "key": "10-13",
    "name": "10-13",
    "min": 10,
    "max": 13
  },
  {
    "key": "14-16",
    "name": "14-16",
    "min": 14,
    "max": 16
  },
  {
    "key": "16+",
    "name": "16+",
    "min": 16,
    "max": 120
  }
];

export const SEED_COMMUNITIES: SeedCommunity[] = [
  {
    "name": "נט\"ל - קבוצות תמיכה",
    "description": "קבוצות תמיכה וטיפוליות לנפגעי טראומה ופוסט-טראומה על רקע מלחמה וטרור ולבני משפחותיהם.",
    "location": "center",
    "meetingType": "frontal",
    "organization": "עמותת נט\"ל",
    "contactUrl": "https://www.natal.org.il/תמיכה-וטיפול-נפשי/קבוצות-טיפוליות-וקבוצות-תמיכה/",
    "audienceKeys": [
      "security_forces",
      "hostilities",
      "general"
    ]
  },
  {
    "name": "איגוד מרכזי הסיוע לנפגעות ולנפגעי תקיפה מינית",
    "description": "קווי סיוע ארציים (1202 לנשים, 1203 לגברים) וצ'אט \"קולמילה\", וכן רשת ארצית של מרכזי סיוע אזוריים לנפגעות ולנפגעי תקיפה מינית ומשפחותיהם.",
    "location": "online",
    "meetingType": "hybrid",
    "organization": "איגוד מרכזי הסיוע לנפגעות ולנפגעי תקיפה מינית",
    "contactUrl": "https://www.1202.org.il/",
    "audienceKeys": [
      "sexual_harassment"
    ]
  },
  {
    "name": "נט\"ל - קבוצות לבנות ובני זוג של מתמודדים ומתמודדות",
    "description": "קבוצת תמיכה ייחודית לבני ובנות זוג של נפגעי פוסט-טראומה, ללימוד והתחזקות בהתמודדות המשותפת.",
    "location": "center",
    "meetingType": "frontal",
    "organization": "עמותת נט\"ל",
    "contactUrl": "https://www.natal.org.il/תמיכה-וטיפול-נפשי/קבוצות-טיפוליות-וקבוצות-תמיכה/קבוצות-לבנות-ובני-זוג-של-מתמודדים-ומתמודדות/partners-support-group/",
    "audienceKeys": [
      "spouses"
    ]
  },
  {
    "name": "מרכז חוסן - ירושלים (עמך)",
    "description": "מרכז טיפול ותמיכה נפשית לנפגעי פעולות איבה, טראומה וחרדה ומשפחותיהם - טיפול פרטני, קבוצתי ומשפחתי, בטלפון, בזום או פנים אל פנים.",
    "location": "jerusalem",
    "meetingType": "hybrid",
    "organization": "עמותת עמך",
    "contactUrl": "https://www.amcha.org/",
    "audienceKeys": [
      "hostilities",
      "general"
    ]
  },
  {
    "name": "המעגל - לא לבד - קהילה תומכת למשפחות נפגעי פוסט-טראומה",
    "description": "קהילה תומכת וקבוצות תמיכה למשפחות ולבני/בנות זוג של מתמודדים עם פוסט-טראומה על רקע ביטחוני, ללימוד, חיזוק וליווי בהתמודדות המשפחתית.",
    "location": "center",
    "meetingType": "frontal",
    "organization": "לא לבד",
    "contactUrl": "https://www.hamaagal.co.il/",
    "audienceKeys": [
      "spouses",
      "security_forces"
    ]
  },
  {
    "name": "קבוצות תמיכה לנכי צה\"ל המתמודדים עם פוסט-טראומה",
    "description": "עשרות קבוצות טיפוליות הפתוחות להרשמה ברחבי הארץ לנכי ולנכות צה\"ל המתמודדים עם פוסט-טראומה - מרחב לשיתוף, התחברות והתחזקות. ניתן לסנן קבוצות לפי אזור ונושא.",
    "location": "center",
    "meetingType": "frontal",
    "organization": "אגף השיקום, משרד הביטחון",
    "contactUrl": "https://shikum.mod.gov.il/groups",
    "audienceKeys": [
      "security_forces"
    ]
  },
  {
    "name": "הורים לפצועי 'חרבות ברזל'",
    "description": "קבוצת תמיכה להורים לחיילות ולחיילים שנפצעו במלחמת חרבות ברזל - מרחב לשיתוף, התחברות והתחזקות.",
    "location": "center",
    "meetingType": "frontal",
    "organization": "אגף השיקום, משרד הביטחון",
    "contactUrl": "https://shikum.mod.gov.il/groups/4548",
    "audienceKeys": [
      "parents",
      "security_forces"
    ]
  }
];

export const SEED_ARTICLES: SeedArticle[] = [
  {
    "type": "source",
    "langId": "he",
    "title": "DSM-5 - Diagnostic and Statistical Manual of Mental Disorders",
    "description": "המדריך האבחוני הסטנדרטי לפסיכיאטריה, כולל הגדרות ואבחנות PTSD",
    "content": "<p>המדריך האבחוני הסטנדרטי לפסיכיאטריה, כולל הגדרות ואבחנות PTSD</p>",
    "url": "https://www.psychiatry.org/psychiatrists/practice/dsm",
    "authors": "American Psychiatric Association",
    "year": "2013",
    "categorySlugs": [
      "sources",
      "research"
    ],
    "sortOrder": 0
  },
  {
    "type": "source",
    "langId": "he",
    "title": "PCL-5 - PTSD Checklist for DSM-5",
    "description": "השאלון המשמש לסקירת תסמיני PTSD - פותח על ידי מכון ה-PTSD הלאומי של ה-VA",
    "content": "<p>השאלון המשמש לסקירת תסמיני PTSD - פותח על ידי מכון ה-PTSD הלאומי של ה-VA</p>",
    "url": "https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp",
    "authors": "Weathers, F.W., et al.",
    "year": "2013",
    "categorySlugs": [
      "sources",
      "clinical"
    ],
    "sortOrder": 1
  },
  {
    "type": "source",
    "langId": "he",
    "title": "אתר נט\"ל - הסברה ומידע",
    "description": "מידע ומשאבים לנפגעי טראומה ופוסט-טראומה בישראל",
    "content": "<p>מידע ומשאבים לנפגעי טראומה ופוסט-טראומה בישראל</p>",
    "url": "https://www.natal.org.il",
    "authors": "עמותת נט\"ל",
    "year": "2024",
    "categorySlugs": [
      "sources",
      "ngo"
    ],
    "sortOrder": 2
  },
  {
    "type": "source",
    "langId": "he",
    "title": "PTSD - National Institute of Mental Health",
    "description": "מידע מדעי עדכני על PTSD מהמכון הלאומי האמריקאי לבריאות הנפש",
    "content": "<p>מידע מדעי עדכני על PTSD מהמכון הלאומי האמריקאי לבריאות הנפש</p>",
    "url": "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd",
    "authors": "NIMH",
    "year": "2023",
    "categorySlugs": [
      "sources",
      "international"
    ],
    "sortOrder": 3
  },
  {
    "type": "source",
    "langId": "he",
    "title": "Trauma-Sensitive Yoga",
    "description": "גישת יוגה מותאמת לנפגעי טראומה",
    "content": "<p>גישת יוגה מותאמת לנפגעי טראומה</p>",
    "url": "https://www.traumasensitiveyoga.com",
    "authors": "Emerson, D. & Hopper, E.",
    "year": "2012",
    "categorySlugs": [
      "sources",
      "clinical"
    ],
    "sortOrder": 4
  },
  {
    "type": "source",
    "langId": "he",
    "title": "ביטוח לאומי - זכויות נפגעי עבודה",
    "description": "מידע רשמי על זכויות נפגעי עבודה ונכות",
    "content": "<p>מידע רשמי על זכויות נפגעי עבודה ונכות</p>",
    "url": "https://www.btl.gov.il",
    "authors": "המוסד לביטוח לאומי",
    "year": "2024",
    "categorySlugs": [
      "sources",
      "official"
    ],
    "sortOrder": 5
  },
  {
    "type": "source",
    "langId": "he",
    "title": "אגף השיקום - משרד הביטחון",
    "description": "מידע על זכויות נפגעי כוחות הביטחון ונפגעי פעולות איבה",
    "content": "<p>מידע על זכויות נפגעי כוחות הביטחון ונפגעי פעולות איבה</p>",
    "url": "https://www.idf.il",
    "authors": "משרד הביטחון הישראלי",
    "year": "2024",
    "categorySlugs": [
      "sources",
      "official"
    ],
    "sortOrder": 6
  },
  {
    "ref": "tool-0",
    "type": "tool",
    "langId": "he",
    "title": "ניהול שינה וסדר יום",
    "content": "<ul><li><strong>חשיפה לאור שמש בבוקר</strong> - 10 דקות בחוץ אחרי הקימה מסנכרנת את השעון הביולוגי</li><li><strong>ללא מסכים שעה לפני שינה</strong> - האור הכחול פוגע בייצור מלטונין</li><li><strong>שעת שינה קבועה</strong> - גם בסוף שבוע</li><li><strong>טמפרטורה קרירה בחדר</strong> - 18-20 מעלות אופטימלי לשינה</li><li><strong>אם לא נרדמים תוך 20 דקות</strong> - קומו, עשו משהו שקט, וחזרו למיטה כשמרגישים ישנוניים</li></ul>",
    "categorySlugs": [
      "self-help",
      "sleep"
    ],
    "sortOrder": 0
  },
  {
    "ref": "tool-1",
    "type": "tool",
    "langId": "he",
    "title": "כתיבה פורקת",
    "content": "<p>מחקרים מראים שכתיבה על חוויות מלחיצות מפחיתה את עוצמתן הרגשית ומסייעת לעיבוד הטראומה.</p><p><strong>איך מתחילים:</strong> 15-20 דקות, 3-4 פעמים בשבוע. כתבו על האירוע וכיצד הוא השפיע עליכם - ללא צנזורה.</p><p>אין חובה לשמור את מה שכתבתם.</p><p><strong>טיימינג חשוב:</strong> מומלץ להמתין לפחות חודש-חודשיים מהאירוע הטראומטי לפני תחילת התרגול - כתיבה מיד בסמוך לאירוע עלולה להגביר את המצוקה במקום להפחית אותה.</p>",
    "categorySlugs": [
      "self-help",
      "journaling"
    ],
    "sortOrder": 1
  },
  {
    "ref": "tool-2",
    "type": "tool",
    "langId": "he",
    "title": "אפליקציות מומלצות",
    "content": null,
    "categorySlugs": [
      "self-help",
      "apps"
    ],
    "sortOrder": 2
  },
  {
    "parentRef": "tool-2",
    "type": "app",
    "langId": "he",
    "title": "Breathe2Relax",
    "description": "אפליקציה לתרגילי נשימה סרעפתית, פותחה על ידי גורמי בריאות של משרד ההגנה האמריקאי. חינמית.",
    "url": "https://apps.apple.com/us/app/breathe2relax/id425720246",
    "links": [
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=mil.dha.breathe2relax"
      }
    ],
    "categorySlugs": [
      "self-help",
      "apps"
    ],
    "sortOrder": 0
  },
  {
    "parentRef": "tool-2",
    "type": "app",
    "langId": "he",
    "title": "Calm",
    "description": "מדיטציה מודרכת ושינה. חלקית חינמית - תקופת ניסיון ותכנים בסיסיים חינם, שאר התוכן בתשלום מנוי.",
    "url": "https://apps.apple.com/us/app/calm/id571800810",
    "links": [
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.calm.android"
      }
    ],
    "categorySlugs": [
      "self-help",
      "apps"
    ],
    "sortOrder": 1
  },
  {
    "parentRef": "tool-2",
    "type": "app",
    "langId": "he",
    "title": "Headspace",
    "description": "מדיטציה מודרכת ושינה. חלקית חינמית - תקופת ניסיון ותכנים בסיסיים חינם, שאר התוכן בתשלום מנוי.",
    "url": "https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008",
    "links": [
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=com.getsomeheadspace.android"
      }
    ],
    "categorySlugs": [
      "self-help",
      "apps"
    ],
    "sortOrder": 2
  },
  {
    "parentRef": "tool-2",
    "type": "app",
    "langId": "he",
    "title": "Wysa",
    "description": "צ׳אטבוט בינה מלאכותית לתמיכה נפשית מבוסס CBT ו-DBT. השיחה הבסיסית עם הצ׳אטבוט חינמית, תכנים מורחבים וליווי אנושי בתשלום.",
    "url": "https://apps.apple.com/us/app/wysa-mental-wellbeing-ai/id1166585565",
    "links": [
      {
        "label": "Google Play",
        "url": "https://play.google.com/store/apps/details?id=bot.touchkin"
      }
    ],
    "categorySlugs": [
      "self-help",
      "apps"
    ],
    "sortOrder": 3
  },
  {
    "ref": "tool-3",
    "type": "tool",
    "langId": "he",
    "title": "נשימה-גוף-נפש (BBM)",
    "content": "<p><strong>Breath-Body-Mind (BBM)</strong> היא שיטה המשלבת תרגילי נשימה, תנועה עדינה ומדיטציה, שמטרתה לאזן את מערכת העצבים ולהפחית מתח, חרדה ותסמיני פוסט-טראומה.</p><p><strong>תרגיל בסיסי לניסיון עצמאי - נשימה קוהרנטית:</strong> זהו מרכיב הנשימה המרכזי בבסיס השיטה. שבו בנוחות, גב זקוף:</p><ol><li>שאפו לאט דרך האף במשך כ-6 שניות</li><li>נשפו לאט (דרך האף או הפה) במשך כ-6 שניות נוספות - בלי לעצור בין השאיפה לנשיפה</li><li>המשיכו כך כ-5-10 דקות, בקצב אחיד של כ-5 נשימות בדקה</li></ol><p>זהו רק מרכיב אחד מהשיטה המלאה, שכוללת גם תרגילי תנועה ומדיטציה הנלמדים בסדנאות עם מדריך/ה מוסמך/ת.</p><p><a href=\"https://www.breathbodymindfoundation.org/israel/he/welcome\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300\">BBM Foundation ישראל - מדריכים מוסמכים</a></p>",
    "categorySlugs": [
      "self-help",
      "complementary"
    ],
    "sortOrder": 3
  },
  {
    "ref": "tool-4",
    "type": "tool",
    "langId": "he",
    "title": "יוגה נידרה",
    "content": "<p><strong>יוגה נידרה</strong> היא תרגול מונחה של הרפיה עמוקה, המדמה מצב שבין ערות לשינה. מטרתו לסייע בשיפור השינה, הפחתת חרדה וחיזוק תחושת היציבות הפנימית. ניתן לתרגל אותה עצמאית, בעזרת הקלטה מוקלטת או לפי ההנחיות הבאות.</p><p><strong>איך מתרגלים:</strong></p><ol><li>שכבו על הגב במקום שקט, כרית מתחת לראש ואולי שמיכה קלה - הגוף נוטה להתקרר במהלך התרגול</li><li>עצמו עיניים ותנו לנשימה להיות טבעית. אפשר לקבוע לעצמכם משפט קצר וחיובי לחזור אליו בסוף התרגול (למשל: \"אני בטוח/ה ורגוע/ה\")</li><li>\"סרקו\" את הגוף בתשומת לב, חלק אחרי חלק - מכפות הרגליים ועד קצות הראש - בלי לזוז, רק בתשומת לב</li><li>שימו לב לנשימה עצמה כמה דקות, בלי לשנות אותה</li><li>לקראת הסיום, חזרו למשפט שקבעתם בהתחלה, ואז החזירו את תשומת הלב לאט לגוף ולחדר, ופקחו עיניים בעדינות</li></ol><p>תרגול מלא אורך בדרך כלל 20-30 דקות, אך אפשר גם קצר יותר.</p>",
    "categorySlugs": [
      "self-help",
      "complementary"
    ],
    "sortOrder": 4
  },
  {
    "type": "treatment_step",
    "langId": "he",
    "title": "התחלה עצמאית",
    "content": "<p>הצעד הראשון והנגיש ביותר. כלים שאפשר להתחיל מיד, ללא צורך בתור או תשלום.</p><p>כנס/י לדף \"כלים לעזרה עצמית\" ובחר/י את הכלי הנוח לך. תרגילי נשימה, קרקוע, ניהול שינה - הכל זמין עכשיו.</p>",
    "links": [
      {
        "label": "לכלים לעזרה עצמית",
        "url": "/self-help"
      }
    ],
    "categorySlugs": [
      "treatment"
    ],
    "sortOrder": 1
  },
  {
    "type": "treatment_step",
    "langId": "he",
    "title": "פנייה לקופ\"ח / מרכזי חוסן",
    "content": "<p>הקופות מספקות שירות פסיכולוגי ופסיכיאטרי. מרכזי החוסן מציעים שירות ייחודי לנפגעי פעולות איבה.</p><ol><li>פנה/י לרופא/ה הראשוני/ת בקופ\"ח שלך וביקש/י הפנייה לפסיכולוג/ית</li><li>לנפגעי פעולות איבה - פנה/י למרכז החוסן הקרוב לאזור מגוריך, מתוך רשימת מרכזי החוסן המלאה</li><li>מכבי: 3555 | כללית: 8703* (מוקד בריאות הנפש) | מאוחדת: 3833 | לאומית: 507</li></ol>",
    "links": [
      {
        "label": "רשימת מרכזי החוסן - gov.il",
        "url": "https://www.gov.il/he/Departments/DynamicCollectors/resilience-centers-list?skip=0"
      },
      {
        "label": "מרכזי חוסן - משרד הבריאות",
        "url": "https://me.health.gov.il/mental-health/therapy-rehabilitation/public-care/community-treatment/resilience-center/"
      }
    ],
    "categorySlugs": [
      "treatment"
    ],
    "sortOrder": 2
  },
  {
    "type": "treatment_step",
    "langId": "he",
    "title": "טיפולים ממוקדי טראומה",
    "content": "<p>טיפולים שהוכחו מחקרית כיעילים ביותר ל-PTSD. מנהלים שיחה ישירה עם הטראומה בצורה מובנית ובטוחה. לחצו על כל שיטה כדי לראות איך מתחילים.</p>",
    "links": [
      {
        "label": "אינדקס הפסיכולוגים - הסתדרות הפסיכולוגים בישראל",
        "url": "https://psychologists.org.il/"
      },
      {
        "label": "מטיב - המרכז לפסיכוטראומה",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLSfz5ougCVnY1LFHJhyrBFrlICf2gQivumOzstI3YHor8_y0yg/viewform"
      }
    ],
    "categorySlugs": [
      "treatment"
    ],
    "sortOrder": 3
  },
  {
    "type": "treatment_step",
    "langId": "he",
    "title": "טיפולים גוף-נפש ומשלימים",
    "content": "<p>שיטות מבוססות-גוף שמשלבים לצד פסיכותרפיה - עבודה עדינה עם מערכת העצבים, הנשימה והגוף, כתוספת לטיפול הפסיכולוגי (לא במקומו). לחצו על כל שיטה כדי לראות איך מתחילים.</p>",
    "links": null,
    "categorySlugs": [
      "treatment"
    ],
    "sortOrder": 4
  },
  {
    "type": "treatment_step",
    "langId": "he",
    "title": "טיפול תרופתי",
    "content": "<p>תפקידן העיקרי של תרופות הוא לסייע בוויסות עוצמת התגובות של פוסט-טראומה, ובכך להפוך את הטיפול הפסיכולוגי לאפקטיבי יותר.</p><p>טיפול תרופתי ל-PTSD ניתן רק על ידי פסיכיאטר/ית. התרופות הנפוצות ביותר הן מקבוצת SSRI/SNRI.</p><p><strong>חשוב:</strong> רק לעיתים רחוקות תרופות מספיקות בפני עצמן כטיפול - הן פועלות בצורה הטובה ביותר בשילוב עם טיפול פסיכולוגי ממוקד-טראומה.</p><p>פנה/י לרופא/ה ראשוני/ת לקבלת הפנייה לפסיכיאטר/ית.</p>",
    "links": null,
    "categorySlugs": [
      "treatment"
    ],
    "sortOrder": 5
  },
  {
    "ref": "child-0-4",
    "type": "article",
    "langId": "he",
    "title": "0-4",
    "content": "<p><strong>בגיל הזה, ילדים חשים את הרגשות של ההורה אבל לא מבינים מה קורה.</strong> הם זקוקים לתחושת ביטחון פיזי.</p><ul><li>שמרו על שגרה קבועה ככל האפשר - שינה, אכילה, משחק</li><li>השתמשו בשפה פשוטה מאוד: \"אבא/אמא לא מרגיש/ה טוב לפעמים, אבל זה לא בגללך\"</li><li>אל תציגו פרטים של הטראומה</li></ul>",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 0
  },
  {
    "parentRef": "child-0-4",
    "type": "book",
    "langId": "he",
    "title": "כשאבא עצוב",
    "description": "ספר ציורים קצר על רגשות גדולים של מבוגרים, ממבט של ילד",
    "content": "<p>סיפור פשוט וקצר על ילדה שמזהה שאבא שלה עצוב, ושאלות שעולות לה: האם זה בגללי? האם זה יעבור? המסר המרכזי - הרגשות של אבא הן לא באשמתי, ואני עדיין נאהבת.</p><p><strong>איך להשתמש בספר:</strong></p><ul><li>קראו לאט, עצרו בכל ציור, ותנו לילד/ה לשאול.</li><li>תוך כדי הקריאה, אמרו במפורש: \"כשאני עצוב/ה - זה לא בגללך.\"</li><li>בסיום הציעו חיבוק ארוך. גוף שזוכר ביטחון לפני שמילים יכולות להסביר.</li></ul><p><em>חיפוש מומלץ: ספרי ילדים על רגשות הורים בעברית, גילאי 2-4.</em></p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 0
  },
  {
    "parentRef": "child-0-4",
    "type": "activity",
    "langId": "he",
    "title": "משחק בועות סבון",
    "description": "תרגיל נשימה פשוט בגובה עיניים - מרגיע את שניכם",
    "content": "<p>בועות סבון הן אחד הכלים הכי פשוטים והכי עוצמתיים לוויסות בגיל הזה. הילד/ה לא יודע/ת לעשות \"תרגיל נשימות\" - אבל יודע/ת לנשוף לבועה.</p><p><strong>איך עושים:</strong></p><ol><li>כשהילד/ה (או אתם) במצוקה - הוציאו בקבוקון בועות. שמרו אחד בכל חדר.</li><li>נשפו לאט - הראו דוגמה לבועה גדולה איטית.</li><li>בקשו מהילד/ה לעשות \"בועה ממש ענקית\" - זה דורש נשיפה ארוכה ושקטה, וזה בדיוק מה שמרגיע את מערכת העצבים.</li><li>עקבו אחרי הבועות עד שהן מתפוצצות - זה ממקד את הקשב.</li></ol><p><strong>למה זה עובד:</strong> נשיפה ארוכה מפעילה את העצב הוואגוס, שמרגיע את הגוף. הילד/ה לומד/ת לווסת בלי לדעת שזה מה שקורה.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 1
  },
  {
    "parentRef": "child-0-4",
    "type": "activity",
    "langId": "he",
    "title": "ריטואל \"אני רואה אותך\"",
    "description": "דקה ביום של תשומת לב מלאה - בונה ביטחון עמוק",
    "content": "<p>בגיל הזה, ילדים מודדים את העולם דרך עינינו. אם אנחנו מוצפים או מנותקים, הם מרגישים את זה. ריטואל קצר ויומיומי של \"אני רואה אותך\" בונה ביטחון יציב גם בתקופות סוערות.</p><p><strong>איך עושים:</strong></p><ol><li>פעם ביום, בזמן קבוע (בוקר אחרי השינה, או לפני אמבטיה), שבו בגובה הילד/ה.</li><li>הסתכלו בעיניים. חייכו. אמרו את שמו/ה.</li><li>אמרו דבר אחד ספציפי שאתם רואים: \"ראיתי איך עזרת לחבר במשחק היום.\"</li><li>סיימו במגע - חיבוק, נשיקה למצח, או יד על הראש.</li></ol><p>הדקה הזאת שווה יותר משעות של \"להיות יחד\" כשאתם בטלפון.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 2
  },
  {
    "parentRef": "child-0-4",
    "type": "activity",
    "langId": "he",
    "title": "צנצנת ההרגעה",
    "description": "פרויקט יצירה משותף שגם מרגיע אחר כך",
    "content": "<p>צנצנת זכוכית קטנה עם מים, נוצץ צבעוני (גליטר) וקצת סבון נוזלי. מנערים - והנצנצים נסחפים. מסתכלים איך הם נופלים לאט עד שהמים נרגעים שוב.</p><p><strong>למה זה עובד:</strong></p><ul><li>מטאפורה ויזואלית למחשבות שמתערבלות ואז מתיישבות.</li><li>תורן של 1-2 דקות שמושך את הקשב החוצה מהמצוקה.</li><li>פעולה משותפת ההורה+הילד שיוצרת רגע שקט יחד.</li></ul><p><strong>איך:</strong> מלאו 80% מים פושרים, 20% גליטר וצבע מאכל. הוסיפו טיפת סבון כדי להאט את הנפילה. סגרו חזק וסתמו את המכסה בדבק חם.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 3
  },
  {
    "parentRef": "child-0-4",
    "type": "story",
    "langId": "he",
    "title": "מילים בטוחות לזמני מצוקה",
    "description": "משפטים קצרים לחזור עליהם - תסריט להורה במצוקה",
    "content": "<p>כשאנחנו במצוקה, אנחנו לפעמים מאבדים מילים. כדאי שיהיו לנו כמה משפטים קצרים שאנחנו יודעים בעל פה, שמתאימים לילדים קטנים.</p><p><strong>לרגעים שאני מוצף/ת:</strong></p><ul><li>\"אני אוהב/ת אותך. אני צריך/ה רגע.\"</li><li>\"זה לא בגללך. אני אחזור.\"</li><li>\"בוא/י נחבק חזק.\"</li></ul><p><strong>לרגעים שהילד/ה במצוקה:</strong></p><ul><li>\"אני כאן. אני רואה אותך.\"</li><li>\"זה בסדר לבכות. אני לא הולך/ת לשום מקום.\"</li><li>\"בוא/י ננשום יחד.\"</li></ul><p>תרגלו אותם ברגעים שקטים. אז הם יישלפו מאליהם ברגעים קשים.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 4
  },
  {
    "parentRef": "child-0-4",
    "type": "activity",
    "langId": "he",
    "title": "פינת השקט - מקום קבוע לוויסות",
    "description": "פינה קטנה בבית שאליה הולכים להתאפס - לא לעונש",
    "content": "<p>בניגוד ל\"פינת ענישה\" - \"פינת השקט\" היא מקום ידידותי שגם ההורה וגם הילד/ה יכולים להגיע אליה כשרגוע מדי, או מוצף מדי.</p><p><strong>מה שמים שם:</strong></p><ul><li>שמיכה רכה או כרית גדולה.</li><li>בובת חיבוק או שמיכת מעבר.</li><li>בקבוק בועות.</li><li>צנצנת ההרגעה (ראו פריט נפרד).</li><li>ספר תמונות אחד מועדף.</li></ul><p><strong>איך מציגים את זה לילד:</strong> \"זאת הפינה שלנו לנשימה. אפשר ללכת אליה כשהלב פועם מהר, כשעצוב, או סתם כשרוצים שקט. אני גם אלך לפעמים.\"</p><p>כשהורה משתמש בה לעיני הילד - הילד לומד שזה לגיטימי ובריא.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "0-4"
    ],
    "sortOrder": 5
  },
  {
    "ref": "child-4-6",
    "type": "article",
    "langId": "he",
    "title": "4-6",
    "content": "<p><strong>בגיל זה ילדים מתחילים לשאול שאלות ישירות.</strong> הם מבינים יותר מפני שחשבתם.</p><ul><li>ענו בכנות בצורה מותאמת גיל: \"לפעמים זיכרונות קשים מרגישים ממש אמיתיים\"</li><li>השתמשו בסיפורים ובדמויות מוכרות</li><li>שמרו על שגרת שינה יציבה</li><li>עודדו ציור וביטוי רגשי</li></ul>",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 1
  },
  {
    "parentRef": "child-4-6",
    "type": "book",
    "langId": "he",
    "title": "אבא פוסטמטי",
    "description": "ספר ילדים על אבא שמתמודד עם פוסט-טראומה",
    "content": "<p>ספר ילדים מאויר שמלווה ילדים שגדלים לצד הורה המתמודד עם פוסט-טראומה. הסיפור משתמש בשפה פשוטה ובאיורים חמים כדי לתת לילדים מילים והבנה למה שקורה בבית - בלי לטעון שזה באשמתם, ובלי להפחיד.</p><p><strong>לשימוש כהורה:</strong> אפשר לקרוא יחד, לעצור בכל ציור ולשאול את הילד/ה מה הוא/היא רואה. הספר מציע פתח לשיחה בלי שצריך להמציא את ההסבר לבד.</p>",
    "url": "https://daddypostamaty.com/",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 0
  },
  {
    "parentRef": "child-4-6",
    "type": "book",
    "langId": "he",
    "title": "פוסטי ואני",
    "description": "מגיל 5 ומעלה - סיפור על דמות בשם \"פוסטי\" שמלווה את הילד/ה",
    "content": "<p><strong>מתאים מגיל 5 ומעלה.</strong></p><p>סיפור ילדים על דמות בשם \"פוסטי\" שמלווה את הילד/ה דרך תקופה לא פשוטה במשפחה כשהורה מתמודד עם פוסט-טראומה. הספר עוזר לפתוח שיחה רגישה על רגשות, חששות והאהבה שנשארת בבית גם כשקשה.</p><p><strong>לשימוש כהורה:</strong> אפשר לקרוא לאט, לתת לילד/ה לזהות את הרגשות של פוסטי, ולשאול בעדינות אם גם הוא/היא מרגיש/ה דברים דומים לפעמים.</p>",
    "url": "https://nivbook.co.il/product/%D7%A4%D7%95%D7%A1%D7%98%D7%99-%D7%95%D7%90%D7%A0%D7%99/",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 1
  },
  {
    "parentRef": "child-4-6",
    "type": "story",
    "langId": "he",
    "title": "הדרקון שבתוכנו",
    "description": "אנלוגיה לתגובת הגוף לפחד - שפה לילדים על גוף שמתעורר",
    "content": "<p>סיפור קצר לספר לילד/ה: לכולנו יש \"דרקון\" קטן שגר בבטן. הוא ישן רוב הזמן, אבל כשהוא מרגיש סכנה - הוא מתעורר וגורם ללב להאיץ, לנשימה להיות מהירה, ולגוף להיות מוכן לרוץ או להילחם.</p><p>אצל אבא/אמא - לפעמים הדרקון מתעורר גם כשאין סכנה אמיתית, כי פעם בעבר היה משהו מאוד מפחיד, והדרקון עוד זוכר ושומר. זה לא בגלל הילד/ה.</p><p><strong>איך להשתמש בסיפור:</strong></p><ul><li>ספרו את הסיפור פעם אחת ברוגע, לא תוך כדי משבר.</li><li>הזמינו את הילד/ה לצייר את הדרקון שלו/ה - מה צבעו? איך הוא נראה?</li><li>פתחו שפה משותפת: \"אבא הדרקון התעורר עכשיו, אני יוצא לנשום.\"</li></ul><p>זה נותן לילד/ה כלי להבין מה הוא/היא רואה, בלי להפחיד.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 2
  },
  {
    "parentRef": "child-4-6",
    "type": "activity",
    "langId": "he",
    "title": "מד-הרגשות - כרטיסיות יומיות",
    "description": "דרך פשוטה לילד/ה להראות איך הוא/היא מרגיש/ה היום",
    "content": "<p>ילדים בגיל הזה לא תמיד יודעים לומר במילים מה הם מרגישים. כרטיסיות עם פנים שונות עוזרות.</p><p><strong>איך עושים:</strong></p><ol><li>ציירו (או הדפיסו) 5 כרטיסיות עם פנים: שמח, עצוב, כועס, מפחד, רגוע.</li><li>תלו אותן על דלת המקרר בגובה הילד.</li><li>פעם ביום (למשל בארוחת ערב), כל אחד בוחר את הפנים שלו/ה היום.</li><li>אתם יכולים גם לבחור - \"היום אבא הרגיש כועס בבוקר ורגוע עכשיו.\"</li></ol><p><strong>למה זה עובד:</strong> נורמליזציה. הילד/ה לומד/ת שיש מילים ושמות לרגשות, שהם משתנים, ושגם להורה יש רגשות - כל זה בלי לחץ.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 3
  },
  {
    "parentRef": "child-4-6",
    "type": "activity",
    "langId": "he",
    "title": "משחק \"אני צב\"",
    "description": "כלי לרגעי הצפה - הילד/ה לומד/ת להתכנס פנימה",
    "content": "<p>משחק פשוט שגם הופך לכלי ויסות אמיתי. ההורה אומר: \"צב!\" - והילד/ה (וגם אתם) מתכנפ/ת, מורידים את הראש בין הברכיים, ועוצרים לנשום שלוש נשימות עמוקות.</p><p><strong>איך לבנות את זה:</strong></p><ol><li>תרגלו את זה בתור משחק מצחיק - לא במצוקה.</li><li>הסבירו: \"כשצב מפחד הוא נכנס לקונכייה. גם אנחנו יכולים להיכנס לקונכייה שלנו.\"</li><li>אחרי שזה משחק מוכר - תוכלו להשתמש בו ברגעי הצפה: \"בוא/י נהיה צבים רגע.\"</li></ol><p>הילד/ה מקבל/ת כלי קונקרטי לעצור את עצמו/ה, במקום להגיד \"תירגע/י\" - שלא עוזר.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 4
  },
  {
    "parentRef": "child-4-6",
    "type": "activity",
    "langId": "he",
    "title": "ה\"מקום הבטוח\" בדמיון",
    "description": "תרגיל דמיון מודרך פשוט שעוזר להירדם ולהירגע",
    "content": "<p>תרגיל קצר לזמן השינה, או ברגעים שהילד/ה מבועת/ת.</p><p><strong>איך מדברים אותו:</strong></p><ol><li>\"בוא/י נדמיין מקום שכולו שלך, שאף אחד אחר לא יכול להיכנס אליו אם לא תרצה/י.\"</li><li>\"איך הוא נראה? יער? חוף ים? חדר עם דובי ענק?\"</li><li>\"מה יש שם שעושה לך טוב? מה הריח? מה את/ה שומע/ת?\"</li><li>\"איזה צבע יש שם? מי איתך? (אולי אף אחד - וזה גם בסדר).\"</li><li>\"זה המקום שלך. את/ה יכול/ה להיכנס אליו בעיניים עצומות, מתי שתרצה/י.\"</li></ol><p>חוזרים על אותו תיאור שוב ושוב - זה הופך למקום אמיתי בדמיון של הילד/ה, ועוזר במיוחד בלילות.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 5
  },
  {
    "parentRef": "child-4-6",
    "type": "story",
    "langId": "he",
    "title": "איך מסבירים PTSD לגיל הזה",
    "description": "תסריט הסבר פשוט - בשפה של גיל 4-6",
    "content": "<p>אל תיכנסו לפרטים של הטראומה - הם לא מעבדים את זה. תנו מסגרת:</p><blockquote>\"אבא/אמא עבר/ה פעם משהו מאוד מפחיד. עכשיו, הגוף שלי לפעמים שוכח שזה כבר נגמר, ומפחד גם כשאין סכנה. זה כמו אזעקה ישנה שלפעמים מצלצלת בטעות. זה לא בגללך. אני אוהב/ת אותך מאוד.\"</blockquote><p><strong>שאלות שילדים בגיל הזה ישאלו, ותשובות מומלצות:</strong></p><ul><li><strong>\"אבא, מי הפחיד אותך?\"</strong> - \"זה היה מזמן. אני לא רוצה להיכנס לפרטים, אבל אני בטוח/ה עכשיו.\"</li><li><strong>\"גם אני עוד יהיה ככה?\"</strong> - \"לא. רוב האנשים לא חווים את מה שאני חוויתי, ואני עושה כל מה שצריך כדי שתהיה/י בטוח/ה.\"</li><li><strong>\"זה יעבור?\"</strong> - \"אני עובד/ת על זה עם רופא/ה ועם תרגילים. זה לוקח זמן, אבל אני משתפר/ת.\"</li></ul>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 6
  },
  {
    "parentRef": "child-4-6",
    "type": "activity",
    "langId": "he",
    "title": "יומן ציורים משותף",
    "description": "מחברת קטנה לציורים יומיים - גשר בלי מילים",
    "content": "<p>קנו מחברת ציור קטנה ושני עפרונות צבעוניים. פעם ביום (אפילו רק 5 דקות) - יושבים ביחד וכל אחד מצייר משהו על הדף שלו.</p><p><strong>למה זה חזק:</strong></p><ul><li>לא צריך לדבר - ילדים בגיל הזה לא תמיד יודעים לבטא במילים, אבל יודעים לצייר.</li><li>ההורה במצוקה לא צריך לייצר אנרגיה גבוהה - מספיק להיות נוכח/ת ולצייר.</li><li>אחרי כמה שבועות - יש \"סיפור\" משותף שאפשר לדפדף בו.</li></ul><p>אם הילד/ה מצייר/ת משהו מטריד (חושך, פחד, דמות בוכה) - אל תאיצו לפרש. שאלו: \"ספר/י לי על הציור.\" הקשיבו. לפעמים זאת רק הזמנה לשיחה.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "4-6"
    ],
    "sortOrder": 7
  },
  {
    "ref": "child-7-10",
    "type": "article",
    "langId": "he",
    "title": "7-10",
    "content": "<p><strong>ילדים בגיל זה מבינים יחסי סיבה ותוצאה.</strong> הם עלולים לחוש אחראים.</p><ul><li>הדגישו בצורה ברורה: \"זה לא בגללך\"</li><li>הסבירו בפשטות את מנגנון ה-PTSD: \"המוח של ההורה חושב שיש עוד סכנה\"</li><li>עודדו שאלות ואל תברחו מהן</li><li>שמרו על חיים \"נורמליים\" - בית ספר, חברים, פעילויות</li></ul>",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "7-10"
    ],
    "sortOrder": 2
  },
  {
    "parentRef": "child-7-10",
    "type": "book",
    "langId": "he",
    "title": "אבא פוסטמטי",
    "description": "ספר ילדים על אבא שמתמודד עם פוסט-טראומה",
    "content": "<p>ספר ילדים מאויר שמלווה ילדים שגדלים לצד הורה המתמודד עם פוסט-טראומה. הסיפור משתמש בשפה פשוטה ובאיורים חמים כדי לתת לילדים מילים והבנה למה שקורה בבית - בלי לטעון שזה באשמתם, ובלי להפחיד.</p><p><strong>לשימוש כהורה:</strong> אפשר לקרוא יחד, לעצור בכל ציור ולשאול את הילד/ה מה הוא/היא רואה. הספר מציע פתח לשיחה בלי שצריך להמציא את ההסבר לבד.</p>",
    "url": "https://daddypostamaty.com/",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "7-10"
    ],
    "sortOrder": 0
  },
  {
    "parentRef": "child-7-10",
    "type": "activity",
    "langId": "he",
    "title": "נשימת הבלון",
    "description": "תרגיל נשימה בטנית עם דימוי פשוט - מרגיע את מערכת העצבים",
    "content": "<p>נשימה בטנית (סרעפתית) שולחת אות למוח דרך העצב הוואגוס שהגוף בטוח, ומפעילה את מערכת ההרגעה שלו. הדימוי של בלון בבטן עוזר לילד/ה בגיל הזה להבין ולתרגל את זה בקלות.</p><p><strong>איך עושים:</strong></p><ol><li>שבו או שכבו בנוחות, יד אחת על הבטן.</li><li>\"תדמיין/י שיש בלון בבטן. כשאתה שואף אוויר לאט דרך האף - הבלון מתנפח והיד עולה.\"</li><li>\"עכשיו נשוף לאט דרך הפה, כאילו הבלון מתרוקן לאט לאט.\"</li><li>חזרו על כך 5-6 פעמים, בלי למהר.</li></ol><p>תרגלו את זה ברגעים רגועים, כדי שיהיה קל לשלוף את זה ברגעי מתח.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "7-10"
    ],
    "sortOrder": 1
  },
  {
    "parentRef": "child-7-10",
    "type": "activity",
    "langId": "he",
    "title": "5 חושים - תרגיל קרקוע",
    "description": "מיקוד בחושים כשהכל מרגיש יותר מדי",
    "content": "<p>כשילד/ה מוצף/ת או מוטרד/ת, תרגיל קרקוע פשוט עוזר להחזיר את הקשב לרגע הנוכחי.</p><p><strong>איך עושים:</strong> בקשו מהילד/ה למנות בקול:</p><ul><li>5 דברים שהוא/היא רואה</li><li>4 דברים שהוא/היא יכול/ה לגעת בהם</li><li>3 דברים שהוא/היא שומע/ת</li><li>2 דברים שהוא/היא מריח/ה</li><li>דבר אחד שהוא/היא יכול/ה לטעום</li></ul><p>אפשר להפוך את זה למשחק משותף - גם ההורה סופר/ת בקול.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "7-10"
    ],
    "sortOrder": 2
  },
  {
    "parentRef": "child-7-10",
    "type": "story",
    "langId": "he",
    "title": "לתת שם לדאגה",
    "description": "טכניקה מסיפור טיפולי - להפריד בין הילד/ה לבין הרגש",
    "content": "<p>גישה מוכרת בטיפול בילדים היא להפריד בין הילד/ה לבין הקושי - \"הבעיה היא הבעיה, הילד/ה הוא/היא לא הבעיה.\" זה עוזר לילדים לא להרגיש שהם \"מקולקלים\", אלא שיש להם משהו חיצוני להתמודד איתו.</p><p><strong>איך עושים:</strong> עזרו לילד/ה לתת שם ואולי גם צורה לדאגה שלו/ה - \"מפלצת הדאגה\", \"הענן הכבד\". שאלו: \"מתי מפלצת הדאגה מגיעה? מה עוזר לה ללכת?\" זה נותן שפה משותפת בלי להפחיד.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "7-10"
    ],
    "sortOrder": 3
  },
  {
    "ref": "child-10-13",
    "type": "article",
    "langId": "he",
    "title": "10-13",
    "content": "<p><strong>גיל ביניים - ילדים עלולים \"לקחת על עצמם\" תפקיד ההורה.</strong></p><ul><li>הכירו בתפקידם ובמאמצם, אבל שחררו אותם מאחריות הורית</li><li>הסבירו בצורה יותר מפורטת מה זה PTSD ואיך זה מתבטא</li><li>עודדו פעילות גופנית וחברתית מחוץ לבית</li><li>ספרו להם שאתם מקבלים עזרה</li></ul>",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "10-13"
    ],
    "sortOrder": 3
  },
  {
    "parentRef": "child-10-13",
    "type": "book",
    "langId": "he",
    "title": "אבא פוסטמטי",
    "description": "ספר ילדים על אבא שמתמודד עם פוסט-טראומה",
    "content": "<p>ספר ילדים מאויר שמלווה ילדים שגדלים לצד הורה המתמודד עם פוסט-טראומה. הסיפור משתמש בשפה פשוטה ובאיורים חמים כדי לתת לילדים מילים והבנה למה שקורה בבית - בלי לטעון שזה באשמתם, ובלי להפחיד.</p><p><strong>לשימוש כהורה:</strong> אפשר לקרוא יחד, לעצור בכל ציור ולשאול את הילד/ה מה הוא/היא רואה. הספר מציע פתח לשיחה בלי שצריך להמציא את ההסבר לבד.</p>",
    "url": "https://daddypostamaty.com/",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "10-13"
    ],
    "sortOrder": 0
  },
  {
    "parentRef": "child-10-13",
    "type": "story",
    "langId": "he",
    "title": "\"זה לא התפקיד שלך\"",
    "description": "על ילדים שלוקחים על עצמם תפקיד הורי - ואיך לשחרר אותם ממנו",
    "content": "<p>כשהורה מתמודד עם פוסט-טראומה, ילדים בגיל הזה עלולים להפוך \"להורה הקטן\" - לדאוג לאחים, לנהל את מצב הרוח של ההורה, ולהרגיש אחראים לרווחת המשפחה. זה נקרא לעיתים \"פרנטיפיקציה\", ולעיתים קרובות נראה כלפי חוץ כמו בגרות והתנהלות עצמאית - אבל מתחת לפני השטח יכולים להסתתר חרדה, אשמה ותחושה שהצרכים של הילד/ה עצמו/ה לא חשובים.</p><p><strong>מה עוזר:</strong></p><ul><li>אמרו במפורש: \"התפקיד שלך הוא להיות ילד/ה. אני ההורה, ואני מטפל/ת בעצמי ובבית.\"</li><li>שימו לב אם הילד/ה מוותר/ת על צרכים משלו/ה כדי \"לא להכביד.\"</li><li>תנו לו/ה מרחב לפעילויות ולחברים משלו/ה, בלי תחושת אשמה.</li></ul>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "10-13"
    ],
    "sortOrder": 1
  },
  {
    "parentRef": "child-10-13",
    "type": "activity",
    "langId": "he",
    "title": "מכתב לעצמי",
    "description": "כתיבה חופשית שעוזרת לעבד רגשות מבלי לשתף אף אחד",
    "content": "<p>כתיבה על מה שקורה בבית יכולה לעזור למתבגר/ת בגיל הזה לארגן מחשבות ורגשות, גם בלי לשתף אותם עם אף אחד.</p><p><strong>איך עושים:</strong> הציעו למתבגר/ת לכתוב מכתב לעצמו/ה (שלא חייבים להראות לאף אחד) על איך היום עבר, מה מרגיש קשה, ומה עוזר. אין נכון ולא נכון, ואין חובה לשתף.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "10-13"
    ],
    "sortOrder": 2
  },
  {
    "ref": "child-14-16",
    "type": "article",
    "langId": "he",
    "title": "14-16",
    "content": "<p><strong>מתבגרים צעירים - עלולים לגלות כעס, או ריחוק.</strong></p><ul><li>שקפו בכנות: \"ההורה שלך מתמודד עם PTSD - זה מחלה אמיתית, לא בחירה\"</li><li>הכירו בקשיים שלהם ובאיך שהמצב משפיע עליהם</li><li>עודדו קשר עם מבוגרים אמינים מחוץ לבית</li><li>הציעו אפשרות לתמיכה פסיכולוגית עצמאית</li></ul>",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "14-16"
    ],
    "sortOrder": 4
  },
  {
    "parentRef": "child-14-16",
    "type": "story",
    "langId": "he",
    "title": "כשגם אני נפגע/ת קצת",
    "description": "טראומה משנית אצל מתבגרים - סימנים ומה לעשות איתם",
    "content": "<p>מתבגרים שגדלים לצד הורה עם פוסט-טראומה יכולים לפתח בעצמם תגובות דומות לטראומה - זה נקרא \"טראומטיזציה משנית\" או \"טראומה משנית\", ומוכר בספרות המקצועית כתופעה נפוצה אצל בני משפחה של נפגעי טראומה.</p><p><strong>סימנים לשים לב אליהם:</strong></p><ul><li>מחשבות חוזרות או דאגה מתמשכת מהמצב בבית</li><li>הימנעות ממצבים שמזכירים את המתח בבית</li><li>עצבנות, קשיי שינה, או תחושת ניתוק</li></ul><p><strong>מה עוזר:</strong> לדבר עם מבוגר/ת אמין/ה מחוץ למשפחה - יועץ/ת בית ספר, קרוב משפחה, או איש/אשת מקצוע. זה לא סימן לחולשה - זו תגובה מובנת למצב לא פשוט, וזה בהחלט שווה עזרה משלך, בנפרד מהעזרה שההורה מקבל.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "14-16"
    ],
    "sortOrder": 0
  },
  {
    "ref": "child-16+",
    "type": "article",
    "langId": "he",
    "title": "16+",
    "content": "<p><strong>צעירים בוגרים - יכולים להיות שותפים מלאים יותר בהבנת המצב.</strong></p><ul><li>שתפו ב\"שפת מבוגרים\" תוך כבוד לגבולות</li><li>עודדו לחפש מידע ותמיכה בעצמם</li><li>הכירו בכך שגם הם עלולים לפתח תגובות טראומטיות משניות</li><li>הציעו לפנות יחד לאיש מקצוע</li></ul>",
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "16+"
    ],
    "sortOrder": 5
  },
  {
    "parentRef": "child-16+",
    "type": "story",
    "langId": "he",
    "title": "טראומה משנית - כשההשפעה עוברת גם אליך",
    "description": "מה זה טראומטיזציה משנית ואיך לזהות שגם אתה/את זקוק/ה לתמיכה",
    "content": "<p>לגדול או לחיות לצד הורה עם פוסט-טראומה יכול להשפיע גם על בני המשפחה הבוגרים - תופעה המוכרת כ\"טראומטיזציה משנית\" (secondary traumatization). זה לא אומר שמשהו לא בסדר איתך - זו תגובה מוכרת ומתועדת בספרות המקצועית אצל מי שחי לצד נפגע טראומה.</p><p><strong>סימנים אפשריים:</strong> תחושת דריכות מוגברת, קושי \"לכבות\" דאגה למצב ההורה, נטייה להימנע ממצבים שמזכירים מתחים בבית, תחושת ריחוק רגשי.</p><p><strong>מה אפשר לעשות:</strong> לחפש תמיכה משלך - בין אם דרך שיחה עם פסיכולוג/ית, קבוצת תמיכה למשפחות (ראו בעמוד הקהילות), או שיחה עם חברים קרובים. את/ה לא חייב/ת \"להסתדר לבד\" רק כי אתה/את כבר לא ילד/ה.</p>",
    "url": null,
    "categorySlugs": [
      "children"
    ],
    "ageGroupKeys": [
      "16+"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g1",
    "title": "מה מגיע לחייל שנפגע נפשית בשירות?",
    "content": "<p>חיילים וכוחות ביטחון שנפגעו נפשית עקב השירות זכאים לסיוע מאגף השיקום במשרד הביטחון, בהתאם לאחוזי הנכות שייקבעו:</p><ul><li><strong>קצבת נכות חודשית</strong> - לפי דרגת הנכות שתיקבע</li><li><strong>טיפול רפואי ופסיכולוגי</strong> - ללא תשלום, כולל טיפול פרטני, זוגי, משפחתי וקבוצתי</li><li><strong>שיקום מקצועי</strong> - לימודים והכשרה מקצועית</li><li><strong>סיוע לבני המשפחה</strong> - מימון טיפול נפשי להורים, בני/בנות זוג וילדים</li><li><strong>טיפולי שיניים ממומנים</strong> - מנכות של 20% ומעלה, גם ללא פגיעה מוכרת בשיניים או בלסת</li><li><strong>כלב שירות</strong> - מנכות של 20% ומעלה, בתוספת השתתפות חודשית בעלויות אחזקתו</li><li><strong>ימי הבראה</strong> - שהייה במלון או במעיינות מרפא, לפי מספר הימים שנקבע לך באזור האישי</li><li><strong>קנאביס רפואי</strong> - PTSD הוא כיום האבחנה הפסיכיאטרית היחידה בישראל המאושרת לטיפול בקנאביס; מימון הרישיון והתרופה, לאחר מיצוי טיפולים מקובלים והמלצת הפסיכיאטר/ית המטפל/ת</li><li><strong>סיוע בדיור ובתחבורה</strong> - בהתאם לדרגת הנכות</li></ul><p>היקף הזכויות בפועל תלוי באחוזי הנכות שתקבע הוועדה הרפואית.</p>",
    "links": [
      {
        "label": "זכויות למתמודדים עם פגיעה נפשית - אגף השיקום",
        "url": "https://shikum.mod.gov.il/rights/injury-type/mental"
      },
      {
        "label": "טיפולי שיניים - אגף השיקום",
        "url": "https://shikum.mod.gov.il/medical/treatment/Dental-Care"
      },
      {
        "label": "כלב שירות - אגף השיקום",
        "url": "https://shikum.mod.gov.il/medical/hospitalization/service-dog"
      },
      {
        "label": "הבראה ומלונות - אגף השיקום",
        "url": "https://shikum.mod.gov.il/hotels"
      },
      {
        "label": "רישיון קנאביס רפואי - אגף השיקום",
        "url": "https://shikum.mod.gov.il/medical/Medicine/cannabis-license"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g1",
    "title": "ما الذي يحصل عليه الجندي الذي أُصيب نفسياً أثناء الخدمة؟",
    "content": "<p>يحق للجنود وأفراد قوات الأمن الذين أُصيبوا نفسياً بسبب الخدمة الحصول على مساعدة من إدارة إعادة التأهيل في وزارة الأمن، وفقاً لنسبة العجز التي تُحدَّد:</p><ul><li><strong>راتب عجز شهري</strong> - حسب درجة العجز التي تُحدَّد</li><li><strong>علاج طبي ونفسي</strong> - مجاناً، ويشمل علاجاً فردياً وزوجياً وعائلياً وجماعياً</li><li><strong>تأهيل مهني</strong> - دراسة وتدريب مهني</li><li><strong>مساعدة لأفراد العائلة</strong> - تمويل علاج نفسي للوالدين والزوج/الزوجة والأبناء</li><li><strong>علاج أسنان ممول</strong> - من نسبة عجز 20% فأكثر، حتى دون إصابة معترف بها في الأسنان أو الفك</li><li><strong>كلب خدمة</strong> - من نسبة عجز 20% فأكثر، مع مساهمة شهرية في تكاليف إعالته</li><li><strong>أيام نقاهة</strong> - إقامة في فندق أو في ينابيع علاجية، وفق عدد الأيام المحدد في منطقتك الشخصية</li><li><strong>القنّب الطبي</strong> - اضطراب ما بعد الصدمة هو حالياً التشخيص النفسي الوحيد في إسرائيل المعتمد لعلاج القنّب؛ تمويل الترخيص والدواء بعد استنفاد العلاجات التقليدية وبتوصية من الطبيب النفسي المعالج</li><li><strong>مساعدة في السكن والمواصلات</strong> - حسب درجة العجز</li></ul><p>نطاق الحقوق الفعلي يعتمد على نسبة العجز التي تحددها اللجنة الطبية.</p>",
    "links": [
      {
        "label": "الحقوق للمصابين نفسياً - إدارة إعادة التأهيل",
        "url": "https://shikum.mod.gov.il/rights/injury-type/mental"
      },
      {
        "label": "علاج الأسنان - إدارة إعادة التأهيل",
        "url": "https://shikum.mod.gov.il/medical/treatment/Dental-Care"
      },
      {
        "label": "كلب الخدمة - إدارة إعادة التأهيل",
        "url": "https://shikum.mod.gov.il/medical/hospitalization/service-dog"
      },
      {
        "label": "النقاهة والفنادق - إدارة إعادة التأهيل",
        "url": "https://shikum.mod.gov.il/hotels"
      },
      {
        "label": "ترخيص القنّب الطبي - إدارة إعادة التأهيل",
        "url": "https://shikum.mod.gov.il/medical/Medicine/cannabis-license"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g1",
    "title": "What is a soldier who was psychologically injured in service entitled to?",
    "content": "<p>Soldiers and security-force personnel who were psychologically injured due to their service are entitled to assistance from the Rehabilitation Division of the Ministry of Defense, according to the disability percentage determined:</p><ul><li><strong>Monthly disability allowance</strong> - based on the disability grade determined</li><li><strong>Medical and psychological treatment</strong> - free of charge, including individual, couples, family, and group therapy</li><li><strong>Vocational rehabilitation</strong> - studies and professional training</li><li><strong>Family support</strong> - funding for mental health treatment for parents, spouses, and children</li><li><strong>Funded dental care</strong> - from 20% disability or more, even without a recognized dental/jaw injury</li><li><strong>Service dog</strong> - from 20% disability or more, plus a monthly contribution toward its upkeep</li><li><strong>Recuperation days</strong> - a stay at a hotel or hot springs, per the number of days set in your personal area</li><li><strong>Medical cannabis</strong> - PTSD is currently the only psychiatric diagnosis in Israel approved for cannabis treatment; funding for the license and the cannabis itself, after conventional treatments have been exhausted and with the treating psychiatrist's recommendation</li><li><strong>Housing and transportation assistance</strong> - depending on the disability grade</li></ul><p>The actual scope of rights depends on the disability percentage set by the medical committee.</p>",
    "links": [
      {
        "label": "Rights for those dealing with psychological injury - Rehabilitation Division",
        "url": "https://shikum.mod.gov.il/rights/injury-type/mental"
      },
      {
        "label": "Dental care - Rehabilitation Division",
        "url": "https://shikum.mod.gov.il/medical/treatment/Dental-Care"
      },
      {
        "label": "Service dog - Rehabilitation Division",
        "url": "https://shikum.mod.gov.il/medical/hospitalization/service-dog"
      },
      {
        "label": "Recuperation and hotels - Rehabilitation Division",
        "url": "https://shikum.mod.gov.il/hotels"
      },
      {
        "label": "Medical cannabis license - Rehabilitation Division",
        "url": "https://shikum.mod.gov.il/medical/Medicine/cannabis-license"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g2",
    "title": "איך מתנהל תהליך ההכרה בנכות ממשרד הביטחון?",
    "content": "<p>תהליך ההכרה מתחיל בהגשת \"בקשה להכרה בנכות\" (טופס דיגיטלי) לאגף השיקום.</p><ol><li>קצין/ת תגמולים בוחן/ת את הבקשה ומסייע/ת באיתור מידע רפואי ועובדתי</li><li>במקרים מסוימים - כגון פגיעה חד-משמעית של חייל/ת בשירות חובה - הבקשה עשויה לעבור ב\"מסלול ירוק\" מהיר ישירות לוועדה הרפואית</li><li>בשאר המקרים הבקשה מועברת לבירור קשר סיבתי בין השירות לבין הפגיעה, ורק אם נמצא קשר סיבתי היא מועברת לוועדה</li><li>הוועדה הרפואית קובעת את אחוזי הנכות, שקובעים את היקף הזכויות</li></ol>",
    "links": [
      {
        "label": "הכרה בנכות וועדות רפואיות - אגף השיקום",
        "url": "https://shikum.mod.gov.il/recognition"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g2",
    "title": "كيف تسير عملية الاعتراف بالعجز من وزارة الأمن؟",
    "content": "<p>تبدأ عملية الاعتراف بتقديم \"طلب الاعتراف بالعجز\" (نموذج رقمي) إلى إدارة إعادة التأهيل.</p><ol><li>يفحص ضابط التعويضات الطلب ويساعد في تحديد المعلومات الطبية والوقائعية</li><li>في بعض الحالات - مثل إصابة واضحة لجندي في الخدمة الإلزامية - قد يمر الطلب عبر \"المسار الأخضر\" السريع مباشرة إلى اللجنة الطبية</li><li>في باقي الحالات يُحال الطلب لفحص الصلة السببية بين الخدمة والإصابة، ولا يُحال إلى اللجنة إلا إذا ثبتت الصلة السببية</li><li>تحدد اللجنة الطبية نسبة العجز، التي تحدد بدورها نطاق الحقوق</li></ol>",
    "links": [
      {
        "label": "الاعتراف بالعجز واللجان الطبية - إدارة إعادة التأهيل",
        "url": "https://shikum.mod.gov.il/recognition"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g2",
    "title": "How does the Ministry of Defense disability recognition process work?",
    "content": "<p>The recognition process begins by submitting a \"disability recognition request\" (digital form) to the Rehabilitation Division.</p><ol><li>A benefits officer (katzin tagmulim) reviews the request and helps locate medical and factual information</li><li>In certain cases - such as a clear-cut injury of a conscript soldier during mandatory service - the request may go through a fast \"green track\" directly to the medical committee</li><li>In other cases the request is sent for a causal-link review between the service and the injury, and is only forwarded to a committee if a causal link is found</li><li>The medical committee determines the disability percentage, which determines the scope of rights</li></ol>",
    "links": [
      {
        "label": "Disability recognition and medical committees - Rehabilitation Division",
        "url": "https://shikum.mod.gov.il/recognition"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g3",
    "title": "איך מגישים את הבקשה, וחייבים עורך דין?",
    "content": "<p><a href=\"https://shikum.mod.gov.il/recognition/request/apply\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 mb-3\">מעבר לטופס הדיגיטלי להגשת הבקשה</a></p><p>לא חובה עורך דין. ניתן להגיש את הבקשה באופן עצמאי, וקיימים גופים שמסייעים בהגשה ובהכנה לוועדה הרפואית ללא תשלום:</p><ul><li><strong>בידיים טובות</strong> - מרכז מטעם אגף השיקום (מופעל ע\"י פמי) המסייע במילוי הבקשה ובהכנה לוועדה, כולל ייעוץ וידאו עם רופא מומחה. טלפון: 3757*</li><li><strong>הקליניקה להכרה בנכות צבאית - המכללה האקדמית אונו</strong> - ייעוץ וייצוג משפטי ללא עלות מול משרד הביטחון. טלפון: 03-5311930</li></ul>",
    "links": [
      {
        "label": "טופס דיגיטלי - בקשה להכרה בנכות",
        "url": "https://shikum.mod.gov.il/recognition/request/apply"
      },
      {
        "label": "בידיים טובות - סיוע בהגשת הבקשה",
        "url": "https://shikum.mod.gov.il/ContactUs/goodhands"
      },
      {
        "label": "הקליניקה להכרה בנכות צבאית - המכללה האקדמית אונו",
        "url": "https://www.ono.ac.il/clinical-law/clinic-for-the-recognition-of-military-disability/#4"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g3",
    "title": "كيف أقدم الطلب، وهل يلزمني محامٍ؟",
    "content": "<p><a href=\"https://shikum.mod.gov.il/recognition/request/apply\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 mb-3\">الانتقال إلى النموذج الرقمي لتقديم الطلب</a></p><p>لا يلزم محامٍ. يمكن تقديم الطلب بشكل مستقل، وهناك جهات تساعد في تقديم الطلب والتحضير للجنة الطبية دون أي مقابل:</p><ul><li><strong>\"بيدايم طوفوت\" (أيادٍ طيبة)</strong> - مركز تابع لإدارة إعادة التأهيل (تديره شركة فيمي) يساعد في تعبئة الطلب والتحضير للجنة، بما في ذلك استشارة عبر الفيديو مع طبيب مختص. الهاتف: 3757*</li><li><strong>عيادة الاعتراف بالعجز العسكري - كلية أونو الأكاديمية</strong> - استشارة وتمثيل قانوني مجاني في الإجراءات أمام وزارة الأمن. الهاتف: 03-5311930</li></ul>",
    "links": [
      {
        "label": "النموذج الرقمي - طلب الاعتراف بالعجز",
        "url": "https://shikum.mod.gov.il/recognition/request/apply"
      },
      {
        "label": "\"أيادٍ طيبة\" - المساعدة في تقديم الطلب",
        "url": "https://shikum.mod.gov.il/ContactUs/goodhands"
      },
      {
        "label": "عيادة الاعتراف بالعجز العسكري - كلية أونو الأكاديمية",
        "url": "https://www.ono.ac.il/clinical-law/clinic-for-the-recognition-of-military-disability/#4"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g3",
    "title": "How do I submit the request, and do I need a lawyer?",
    "content": "<p><a href=\"https://shikum.mod.gov.il/recognition/request/apply\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 mb-3\">Go to the digital request form</a></p><p>A lawyer is not required. The request can be submitted independently, and there are organizations that help with submission and preparation for the medical committee free of charge:</p><ul><li><strong>Good Hands (Bidayim Tovot)</strong> - a center run on behalf of the Rehabilitation Division (operated by Femi) that helps fill out the request and prepare for the committee, including video consultation with a specialist physician. Phone: 3757*</li><li><strong>Clinic for the Recognition of Military Disability - Ono Academic College</strong> - free legal consultation and representation in proceedings against the Ministry of Defense. Phone: 03-5311930</li></ul>",
    "links": [
      {
        "label": "Digital form - disability recognition request",
        "url": "https://shikum.mod.gov.il/recognition/request/apply"
      },
      {
        "label": "Good Hands - assistance with submitting the request",
        "url": "https://shikum.mod.gov.il/ContactUs/goodhands"
      },
      {
        "label": "Clinic for the Recognition of Military Disability - Ono Academic College",
        "url": "https://www.ono.ac.il/clinical-law/clinic-for-the-recognition-of-military-disability/#4"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g4",
    "title": "אפשר לקבל טיפול רפואי עוד לפני שהתקבלה ההכרה?",
    "content": "<p>כן. לאחר הגשת בקשה להכרה בפגיעה נפשית, ניתן לקבל אישור לטיפול רפואי ונפשי מאגף השיקום כבר במהלך בירור הבקשה - עוד לפני שהתקבלה החלטה סופית. את היקף הטיפול קובע הרופא המחוזי, ויש לבקש זאת מקצין/ת התגמולים המטפל/ת בתיק.</p>",
    "links": [
      {
        "label": "טיפול רפואי בזמן תהליך ההכרה בנכות",
        "url": "https://shikum.mod.gov.il/recognition/request/medical-care"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g4",
    "title": "هل يمكنني الحصول على علاج طبي قبل صدور الاعتراف؟",
    "content": "<p>نعم. بعد تقديم طلب الاعتراف بإصابة نفسية، يمكن الحصول على موافقة للعلاج الطبي والنفسي من إدارة إعادة التأهيل أثناء فحص الطلب نفسه - قبل صدور القرار النهائي. الطبيب المسؤول عن المنطقة هو من يحدد نطاق العلاج، ويجب طلب ذلك من ضابط التعويضات المسؤول عن الملف.</p>",
    "links": [
      {
        "label": "العلاج الطبي أثناء عملية الاعتراف بالعجز",
        "url": "https://shikum.mod.gov.il/recognition/request/medical-care"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g4",
    "title": "Can I receive medical treatment even before recognition is granted?",
    "content": "<p>Yes. After submitting a recognition request for a psychological injury, approval for medical and mental health treatment from the Rehabilitation Division can be granted while the request is still being reviewed - even before a final decision is made. The scope of treatment is determined by the district physician, and it must be requested from the benefits officer handling the file.</p>",
    "links": [
      {
        "label": "Medical treatment during the disability recognition process",
        "url": "https://shikum.mod.gov.il/recognition/request/medical-care"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g5",
    "title": "אפשר לערער על ההחלטה שהתקבלה?",
    "content": "<p>כן, וקיימים שלושה מסלולים נפרדים:</p><ol><li>על החלטת קצין/ת התגמולים שלא להכיר בפגיעה - ניתן לערער לוועדות הערר שיושבות בבתי משפט השלום, תוך 30 יום מקבלת ההחלטה. משרד המשפטים מעניק סיוע משפטי ללא עלות בהליך ערעור זה, בהתאם לתנאי הזכאות שלו</li><li>על קביעת אחוזי הנכות של הוועדה הרפואית - ניתן לערער לוועדה רפואית עליונה, תוך 45 יום מקבלת ההחלטה (ניתן לבקש הארכה)</li><li>אם המצב הרפואי החמיר לאחר קביעת אחוזי הנכות - ניתן, החל מ-6 חודשים לאחר הקביעה האחרונה, להגיש בקשת \"החמרת מצב\" ולבקש בדיקה מחדש. אם הוועדה מאשרת שחלה החמרה, אחוזי הנכות יעודכנו כלפי מעלה, בתוקף מיום הגשת הבקשה</li></ol>",
    "links": [
      {
        "label": "ערעור על החלטת קצין התגמולים",
        "url": "https://shikum.mod.gov.il/recognition/request/appeal"
      },
      {
        "label": "ערעור על החלטת ועדה רפואית",
        "url": "https://shikum.mod.gov.il/recognition/committee/appeal"
      },
      {
        "label": "החמרת מצב רפואי",
        "url": "https://shikum.mod.gov.il/recognition/worsening"
      },
      {
        "label": "סיוע משפטי חינם - משרד המשפטים",
        "url": "https://www.gov.il/he/service/legal_aid_application"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g5",
    "title": "هل يمكن الاستئناف على القرار الذي صدر؟",
    "content": "<p>نعم، وهناك ثلاثة مسارات منفصلة:</p><ol><li>على قرار ضابط التعويضات بعدم الاعتراف بالإصابة - يمكن الاستئناف أمام لجان الاعتراض التي تنعقد في محاكم الصلح، خلال 30 يوماً من استلام القرار. تمنح وزارة العدل مساعدة قانونية مجانية في إجراء الاستئناف هذا، وفقاً لشروط الأهلية الخاصة بها</li><li>على تحديد نسبة العجز من اللجنة الطبية - يمكن الاستئناف أمام لجنة طبية عليا، خلال 45 يوماً من استلام القرار (يمكن طلب تمديد)</li><li>إذا تدهورت الحالة الطبية بعد تحديد نسبة العجز - يمكن، بعد مرور 6 أشهر على الأقل من آخر تحديد، تقديم طلب \"تفاقم الحالة\" وطلب إعادة الفحص. إذا أقرّت اللجنة بوجود تفاقم، سيتم تحديث نسبة العجز إلى الأعلى، اعتباراً من تاريخ تقديم الطلب</li></ol>",
    "links": [
      {
        "label": "الاستئناف على قرار ضابط التعويضات",
        "url": "https://shikum.mod.gov.il/recognition/request/appeal"
      },
      {
        "label": "الاستئناف على قرار اللجنة الطبية",
        "url": "https://shikum.mod.gov.il/recognition/committee/appeal"
      },
      {
        "label": "تفاقم الحالة الطبية",
        "url": "https://shikum.mod.gov.il/recognition/worsening"
      },
      {
        "label": "مساعدة قانونية مجانية - وزارة العدل",
        "url": "https://www.gov.il/he/service/legal_aid_application"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g5",
    "title": "Can I appeal the decision that was made?",
    "content": "<p>Yes, and there are three separate tracks:</p><ol><li>An appeal against a benefits officer's decision not to recognize the injury goes to appeal committees that sit in the Magistrate Courts, within 30 days of receiving the decision. The Ministry of Justice provides free legal aid for this appeal, subject to its eligibility rules</li><li>An appeal against the disability percentage set by the medical committee goes to an Upper Medical Committee, within 45 days of receiving the decision (an extension can be requested)</li><li>If your medical condition worsens after the disability percentage was set, you can request re-examination (\"worsening of condition\") starting 6 months after the last determination. If the committee finds the condition has worsened, the disability percentage is updated upward, effective from the date the request was filed</li></ol>",
    "links": [
      {
        "label": "Appeal against a benefits officer's decision",
        "url": "https://shikum.mod.gov.il/recognition/request/appeal"
      },
      {
        "label": "Appeal against a medical committee's decision",
        "url": "https://shikum.mod.gov.il/recognition/committee/appeal"
      },
      {
        "label": "Worsening of medical condition",
        "url": "https://shikum.mod.gov.il/recognition/worsening"
      },
      {
        "label": "Free legal aid - Ministry of Justice",
        "url": "https://www.gov.il/he/service/legal_aid_application"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "security_forces"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g6",
    "title": "מה מגיע לנפגע פעולת איבה, ומי אחראי על התגמולים?",
    "content": "<p>בניגוד לתפיסה הרווחת, את התגמולים בפועל <strong>משלם המוסד לביטוח לאומי</strong> ולא משרד הביטחון. עם זאת, לפני שביטוח לאומי יכול לשלם תגמולים, על \"הרשות המאשרת\" במשרד הביטחון לאשר שהאירוע היה אכן פעולת איבה.</p><ul><li>תגמול חודשי לפי דרגת הנכות שתיקבע</li><li>מימון טיפולים רפואיים ופסיכולוגיים</li><li>שיקום מקצועי ולימודים</li></ul><ol><li>הגש/י לביטוח לאומי, תוך שנה מהאירוע, \"הודעה על פגיעה מפעולות איבה ותביעה להכרה\", בצירוף מסמכים רפואיים, אישור משטרה, ושאלון ייעודי על החשיפה לאירוע</li><li>הביטוח הלאומי מעביר את הבקשה לרשות המאשרת במשרד הביטחון, שקובעת אם מדובר בפעולת איבה</li><li>לאחר האישור - ניתן להגיש בביטוח לאומי בקשה לקביעת אחוזי נכות ולתגמולים</li></ol>",
    "links": [
      {
        "label": "נפגעי פעולות איבה - קצבאות והטבות - ביטוח לאומי",
        "url": "https://www.btl.gov.il/benefits/Victims_of_Hostilities/Pages/default.aspx"
      },
      {
        "label": "הגשת תביעה להכרה כנפגע פעולות איבה - ביטוח לאומי",
        "url": "https://www.btl.gov.il/benefits/Victims_of_Hostilities/Casualties_benefits/Pages/HagashatTeviaLehakara.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "hostilities"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g6",
    "title": "ما الذي يستحقه ضحايا الأعمال العدائية، ومن المسؤول عن التعويضات؟",
    "content": "<p>خلافاً للاعتقاد الشائع، فإن <strong>المؤسسة الوطنية للتأمين (التأمين الوطني) هي من تدفع التعويضات فعلياً</strong> وليس وزارة الأمن. مع ذلك، قبل أن يتمكن التأمين الوطني من دفع التعويضات، يجب أن تقر \"الجهة المخوّلة\" في وزارة الأمن بأن الحادث كان فعلاً عملاً عدائياً.</p><ul><li>مخصص شهري حسب درجة العجز التي تُحدَّد</li><li>تمويل العلاجات الطبية والنفسية</li><li>تأهيل مهني ودراسة</li></ul><ol><li>قدّم للتأمين الوطني، خلال سنة من الحادث، \"إخطاراً بإصابة من أعمال عدائية ومطالبة بالاعتراف\"، مع إرفاق وثائق طبية وتأكيد من الشرطة واستبيان خاص حول التعرض للحدث</li><li>يحيل التأمين الوطني الطلب إلى الجهة المخوّلة في وزارة الأمن، التي تقرر إن كان الحادث عملاً عدائياً</li><li>بعد الموافقة - يمكن التقدم للتأمين الوطني بطلب لتحديد نسبة العجز والتعويضات</li></ol>",
    "links": [
      {
        "label": "ضحايا الأعمال العدائية - رواتب ومزايا - التأمين الوطني",
        "url": "https://www.btl.gov.il/benefits/Victims_of_Hostilities/Pages/default.aspx"
      },
      {
        "label": "تقديم مطالبة للاعتراف كضحية أعمال عدائية - التأمين الوطني",
        "url": "https://www.btl.gov.il/benefits/Victims_of_Hostilities/Casualties_benefits/Pages/HagashatTeviaLehakara.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "hostilities"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g6",
    "title": "What is a victim of a hostile act entitled to, and who is responsible for the compensation?",
    "content": "<p>Contrary to common belief, the compensation is actually <strong>paid by the National Insurance Institute</strong>, not the Ministry of Defense. However, before National Insurance can pay compensation, the \"authorizing authority\" at the Ministry of Defense must confirm that the event was indeed a hostile act.</p><ul><li>Monthly benefit according to the disability grade determined</li><li>Funding for medical and psychological treatments</li><li>Vocational rehabilitation and studies</li></ul><ol><li>File a \"notification of injury from hostile acts and claim for recognition\" with National Insurance within one year of the event, attaching medical documents, police confirmation, and a dedicated questionnaire about exposure to the event</li><li>National Insurance forwards the request to the authorizing authority at the Ministry of Defense, which decides whether it was a hostile act</li><li>After approval, a request for determination of disability percentage and compensation can be filed with National Insurance</li></ol>",
    "links": [
      {
        "label": "Victims of hostile acts - benefits - National Insurance",
        "url": "https://www.btl.gov.il/benefits/Victims_of_Hostilities/Pages/default.aspx"
      },
      {
        "label": "Filing a claim for recognition as a victim of hostile acts - National Insurance",
        "url": "https://www.btl.gov.il/benefits/Victims_of_Hostilities/Casualties_benefits/Pages/HagashatTeviaLehakara.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "hostilities"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g7",
    "title": "אילו זכויות עומדות לי כנפגע/ת תקיפה מינית?",
    "content": "<p>זכויות עיקריות לנפגעות ולנפגעי תקיפה מינית:</p><ul><li><strong>נכות כללית מביטוח לאומי</strong> - ניתן להגיש תביעה גם ללא הגשת תלונה במשטרה, וללא הגבלת זמן ממועד הפגיעה. הבקשה נבחנת בפני ועדה רפואית שהוכשרה להתמודדות עם נפגעי תקיפה מינית</li><li><strong>ייצוג וסיוע משפטי חינם</strong> - דרך הסיוע המשפטי של משרד המשפטים, ללא תלות במצב הכלכלי</li><li><strong>ליווי ותמיכה חינם</strong> - מרכזי הסיוע לנפגעות ולנפגעי תקיפה מינית פרוסים בכל הארץ</li></ul><ol><li>פנה/י למרכז הסיוע הקרוב לקבלת ליווי ותמיכה</li><li>לתביעת נכות כללית בביטוח לאומי - מלא/י את טופס 7801 (ניתן להגיש מקוון באתר ביטוח לאומי), או התקשר/י ל-3928* לסיוע במילוי ובהגשה - גם ללא תלונה במשטרה</li><li>לסיוע משפטי חינם - הגש/י בקשה מקוונת באתר משרד המשפטים, או התקשר/י ל-073-3927788</li></ol>",
    "links": [
      {
        "label": "מרכז הסיוע לנפגעות ולנפגעי תקיפה מינית",
        "url": "https://www.1202.org.il/"
      },
      {
        "label": "ביטוח לאומי - נכות כללית לנפגעות ולנפגעי תקיפה מינית",
        "url": "https://www.btl.gov.il/benefits/Disability/Pages/sexual-assault.aspx"
      },
      {
        "label": "טופס 7801 - תביעה לנכות כללית",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/tfasimMkuvanim/Pages/nechutKlalit.aspx"
      },
      {
        "label": "בקשה לסיוע משפטי - משרד המשפטים",
        "url": "https://www.gov.il/he/service/legal_aid_application"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "sexual_harassment"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g7",
    "title": "ما الحقوق المتاحة لي كضحية اعتداء جنسي؟",
    "content": "<p>الحقوق الرئيسية لضحايا الاعتداء الجنسي:</p><ul><li><strong>عجز عام من التأمين الوطني</strong> - يمكن تقديم مطالبة حتى دون تقديم شكوى للشرطة، ودون حد زمني من تاريخ الإصابة. يُفحص الطلب أمام لجنة طبية مدرَّبة للتعامل مع ضحايا الاعتداء الجنسي</li><li><strong>تمثيل ومساعدة قانونية مجانية</strong> - عبر المساعدة القانونية التابعة لوزارة العدل، بغض النظر عن الوضع المادي</li><li><strong>مرافقة ودعم مجاني</strong> - مراكز مساعدة ضحايا الاعتداء الجنسي منتشرة في جميع أنحاء البلاد</li></ul><ol><li>تواصل مع أقرب مركز مساعدة للحصول على المرافقة والدعم</li><li>لمطالبة العجز العام من التأمين الوطني - املأ نموذج 7801 (يمكن التقديم عبر الإنترنت في موقع التأمين الوطني)، أو اتصل بالرقم 3928* للمساعدة في التعبئة والتقديم - حتى دون شكوى للشرطة</li><li>للمساعدة القانونية المجانية - قدّم طلباً عبر الإنترنت في موقع وزارة العدل، أو اتصل بالرقم 073-3927788</li></ol>",
    "links": [
      {
        "label": "مركز مساعدة ضحايا الاعتداء الجنسي",
        "url": "https://www.1202.org.il/"
      },
      {
        "label": "التأمين الوطني - العجز العام لضحايا الاعتداء الجنسي",
        "url": "https://www.btl.gov.il/benefits/Disability/Pages/sexual-assault.aspx"
      },
      {
        "label": "نموذج 7801 - مطالبة عجز عام",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/tfasimMkuvanim/Pages/nechutKlalit.aspx"
      },
      {
        "label": "طلب مساعدة قانونية - وزارة العدل",
        "url": "https://www.gov.il/he/service/legal_aid_application"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "sexual_harassment"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g7",
    "title": "What rights do I have as a victim of sexual assault?",
    "content": "<p>Key rights for victims of sexual assault:</p><ul><li><strong>General disability from National Insurance</strong> - a claim can be filed even without filing a police complaint, and with no time limit from the date of the assault. The claim is reviewed by a medical committee trained to handle sexual assault victims</li><li><strong>Free legal representation and aid</strong> - through the Ministry of Justice's legal aid system, regardless of financial means</li><li><strong>Free accompaniment and support</strong> - sexual assault support centers located throughout the country</li></ul><ol><li>Contact the nearest support center for accompaniment and support</li><li>For a general disability claim with National Insurance - fill out form 7801 (can be submitted online on the National Insurance website), or call 3928* for help filling it out and submitting it - even without a police complaint</li><li>For free legal aid - submit an online application on the Ministry of Justice website, or call 073-3927788</li></ol>",
    "links": [
      {
        "label": "Sexual Assault Support Center",
        "url": "https://www.1202.org.il/"
      },
      {
        "label": "National Insurance - general disability for sexual assault victims",
        "url": "https://www.btl.gov.il/benefits/Disability/Pages/sexual-assault.aspx"
      },
      {
        "label": "Form 7801 - general disability claim",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/tfasimMkuvanim/Pages/nechutKlalit.aspx"
      },
      {
        "label": "Legal aid application - Ministry of Justice",
        "url": "https://www.gov.il/he/service/legal_aid_application"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "sexual_harassment"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g8",
    "title": "נפגעתי בתאונת עבודה - מה מגיע לי?",
    "content": "<p>נפגעי תאונות עבודה זכאים ל:</p><ul><li><strong>דמי פגיעה</strong> - תשלום מביטוח לאומי לתקופה של עד 3 חודשים, בזמן שאינך יכול/ה לעבוד</li><li><strong>טיפול רפואי חינם</strong> - במימון ביטוח לאומי</li><li><strong>קצבת נכות מעבודה</strong> - אם נותרה נכות קבועה, לפי קביעת ועדה רפואית</li></ul><ol><li>קבל/י טיפול רפואי ובקש/י תיעוד של הפגיעה</li><li>הגש/י \"תביעה לתשלום דמי פגיעה והודעה על פגיעה בעבודה\" (טופס 211) לביטוח לאומי, תוך 12 חודשים מהפגיעה - איחור עלול לפגוע בזכאות</li><li>אם נותרה נכות - יש להגיש בנוסף \"תביעה לקביעת דרגת נכות מעבודה\" (טופס 200)</li></ol>",
    "links": [
      {
        "label": "ביטוח לאומי - נפגעי עבודה",
        "url": "https://www.btl.gov.il/benefits/Work_Injury/Pages/default.aspx"
      },
      {
        "label": "טופס 211 - תביעה לתשלום דמי פגיעה",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Work_Disability_and_Dependants_forms/Pages/211%20-%20%D7%AA%D7%91%D7%99%D7%A2%D7%94%20%D7%9C%D7%AA%D7%A9%D7%9C%D7%95%D7%9D%20%D7%93%D7%9E%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%94%20%D7%95%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%A2%D7%9C%20%D7%A4%D7%92%D7%99%D7%A2%D7%94%20%D7%91%D7%A2%D7%91%D7%95%D7%93%D7%94.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "accidents_work"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g8",
    "title": "أُصبت في حادث عمل - ما الذي يحق لي؟",
    "content": "<p>يحق لضحايا حوادث العمل الحصول على:</p><ul><li><strong>بدل إصابة</strong> - دفع من التأمين الوطني لمدة تصل إلى 3 أشهر، خلال فترة عدم القدرة على العمل</li><li><strong>علاج طبي مجاني</strong> - بتمويل من التأمين الوطني</li><li><strong>راتب عجز عن العمل</strong> - إذا نتج عجز دائم، حسب تحديد لجنة طبية</li></ul><ol><li>احصل على علاج طبي واطلب توثيق الإصابة</li><li>قدّم \"مطالبة بدفع بدل الإصابة وإخطار بالإصابة في العمل\" (نموذج 211) للتأمين الوطني، خلال 12 شهراً من الإصابة - التأخير قد يضر بالأهلية</li><li>إذا نتج عجز دائم - يجب تقديم \"مطالبة لتحديد درجة العجز عن العمل\" (نموذج 200) إضافياً</li></ol>",
    "links": [
      {
        "label": "التأمين الوطني - ضحايا حوادث العمل",
        "url": "https://www.btl.gov.il/benefits/Work_Injury/Pages/default.aspx"
      },
      {
        "label": "نموذج 211 - مطالبة بدل إصابة",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Work_Disability_and_Dependants_forms/Pages/211%20-%20%D7%AA%D7%91%D7%99%D7%A2%D7%94%20%D7%9C%D7%AA%D7%A9%D7%9C%D7%95%D7%9D%20%D7%93%D7%9E%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%94%20%D7%95%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%A2%D7%9C%20%D7%A4%D7%92%D7%99%D7%A2%D7%94%20%D7%91%D7%A2%D7%91%D7%95%D7%93%D7%94.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "accidents_work"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g8",
    "title": "I was injured at work - what am I entitled to?",
    "content": "<p>Work accident victims are entitled to:</p><ul><li><strong>Injury benefit</strong> - payment from National Insurance for up to 3 months, during the period of incapacity to work</li><li><strong>Free medical treatment</strong> - funded by National Insurance</li><li><strong>Work disability allowance</strong> - if permanent disability remains, as determined by a medical committee</li></ul><ol><li>Get medical treatment and request documentation of the injury</li><li>File a \"claim for payment of injury benefit and notification of a work injury\" (form 211) with National Insurance, within 12 months of the injury - delay may harm eligibility</li><li>If permanent disability remains, a \"claim for determination of work disability grade\" (form 200) must also be filed</li></ol>",
    "links": [
      {
        "label": "National Insurance - work injury victims",
        "url": "https://www.btl.gov.il/benefits/Work_Injury/Pages/default.aspx"
      },
      {
        "label": "Form 211 - injury benefit claim",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Work_Disability_and_Dependants_forms/Pages/211%20-%20%D7%AA%D7%91%D7%99%D7%A2%D7%94%20%D7%9C%D7%AA%D7%A9%D7%9C%D7%95%D7%9D%20%D7%93%D7%9E%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%94%20%D7%95%D7%94%D7%95%D7%93%D7%A2%D7%94%20%D7%A2%D7%9C%20%D7%A4%D7%92%D7%99%D7%A2%D7%94%20%D7%91%D7%A2%D7%91%D7%95%D7%93%D7%94.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "accidents_work"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g9",
    "title": "איך מגישים תביעה לנכות כללית בביטוח לאומי בעקבות פגיעה נפשית?",
    "content": "<p><strong>שימו לב:</strong> אם נפגעת במהלך שירות בכוחות הביטחון, בפעולת איבה, או בתאונת עבודה - הזכויות שלך מפורטות בקטגוריות הייעודיות למעלה, ולא כאן. הקטגוריה הזו מיועדת למי שאינו מכוסה באף אחד מהמסלולים הייעודיים.</p><p>תהליך הגשת תביעה לנכות כללית בשל פגיעה נפשית:</p><ol><li>אספ/י מסמכים רפואיים: אבחנות, סיכומי טיפול, מכתבי רופאים ופסיכיאטרים</li><li>מלא/י את טופס 7801 - ניתן להגיש מקוון באתר ביטוח לאומי, או להתקשר ל-3928* לסיוע במילוי ובהגשה</li><li>הופע/י בפני ועדה רפואית פסיכיאטרית, שבוחנת בין היתר את חומרת המצב, הטיפול התרופתי, אשפוזים ותפקוד</li></ol><p>הזכאות לקצבה מותנית בקביעת נכות רפואית של <strong>60% לפחות</strong>, או <strong>40% לפחות אם יש כמה ליקויים ואחד מהם 25% לפחות</strong> (עקרת בית: 50%).</p>",
    "links": [
      {
        "label": "ביטוח לאומי - נכות נפשית ונכות כללית",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/NecotNafsitNecotKlalit.aspx"
      },
      {
        "label": "טופס 7801 - תביעה לנכות כללית",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/tfasimMkuvanim/Pages/nechutKlalit.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g9",
    "title": "كيف أتقدم بمطالبة عجز عام في التأمين الوطني بسبب إصابة نفسية؟",
    "content": "<p><strong>تنبيه:</strong> إذا أُصبت أثناء الخدمة في قوات الأمن، أو في عمل عدائي، أو في حادث عمل - فإن حقوقك مفصلة في الفئات المخصصة أعلاه، وليس هنا. هذه الفئة مخصصة لمن لا يشمله أي من المسارات المخصصة.</p><p>إجراءات تقديم مطالبة عجز عام بسبب إصابة نفسية:</p><ol><li>اجمع وثائق طبية: تشخيصات، ملخصات علاج، رسائل من أطباء وأطباء نفسيين</li><li>املأ نموذج 7801 - يمكن التقديم عبر الإنترنت في موقع التأمين الوطني، أو الاتصال بالرقم 3928* للمساعدة في التعبئة والتقديم</li><li>احضر أمام لجنة طبية نفسية، تفحص من بين أمور أخرى شدة الحالة والعلاج الدوائي وحالات دخول المستشفى والأداء الوظيفي</li></ol><p>تعتمد الأهلية للراتب على تحديد عجز طبي بنسبة <strong>60% على الأقل</strong>، أو <strong>40% على الأقل إذا وُجدت عدة إعاقات وكانت إحداها 25% على الأقل</strong> (لربة المنزل: 50%).</p>",
    "links": [
      {
        "label": "التأمين الوطني - العجز النفسي والعجز العام",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/NecotNafsitNecotKlalit.aspx"
      },
      {
        "label": "نموذج 7801 - مطالبة عجز عام",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/tfasimMkuvanim/Pages/nechutKlalit.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g9",
    "title": "How do I file a general disability claim with National Insurance due to a psychological injury?",
    "content": "<p><strong>Note:</strong> if you were injured during security-force service, in a hostile act, or in a work accident - your rights are detailed in the dedicated categories above, not here. This category is for those not covered by any of the dedicated tracks.</p><p>Process for filing a general disability claim due to a psychological injury:</p><ol><li>Gather medical documents: diagnoses, treatment summaries, letters from doctors and psychiatrists</li><li>Fill out form 7801 - can be submitted online on the National Insurance website, or call 3928* for help filling it out and submitting it</li><li>Appear before a psychiatric medical committee, which examines, among other things, the severity of the condition, medication, hospitalizations, and functioning</li></ol><p>Eligibility for the allowance requires a medical disability determination of <strong>at least 60%</strong>, or <strong>at least 40% if there are several impairments with at least one of them rated 25% or more</strong> (50% for homemakers).</p>",
    "links": [
      {
        "label": "National Insurance - psychiatric disability and general disability",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/NecotNafsitNecotKlalit.aspx"
      },
      {
        "label": "Form 7801 - general disability claim",
        "url": "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/tfasimMkuvanim/Pages/nechutKlalit.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g10",
    "title": "מגיע לי שיקום מקצועי מביטוח לאומי בגלל נכות נפשית?",
    "content": "<p>מי שנקבעה לו נכות רפואית משוקללת של <strong>20% לפחות</strong> לצמיתות, זכאי לבדוק זכאות לשיקום מקצועי מביטוח לאומי - גם אם אינו מקבל קצבת נכות. השירות כולל אבחון תעסוקתי, ייעוץ מקצועי, מימון לימודים או הכשרה, וקצבת שיקום בזמן הלימודים.</p>",
    "links": [
      {
        "label": "ביטוח לאומי - שיקום מקצועי ונכות נפשית",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/NecotNafsitShikomMikzoei.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g10",
    "title": "هل يحق لي التأهيل المهني من التأمين الوطني بسبب العجز النفسي؟",
    "content": "<p>من تقرر له عجز طبي مرجّح بنسبة <strong>20% على الأقل</strong> بشكل دائم، يحق له فحص الأهلية للتأهيل المهني من التأمين الوطني - حتى لو لم يكن يتلقى راتب عجز. تشمل الخدمة تقييماً مهنياً، استشارة مهنية، تمويل دراسة أو تدريب، وراتب تأهيل خلال فترة الدراسة.</p>",
    "links": [
      {
        "label": "التأمين الوطني - التأهيل المهني والعجز النفسي",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/NecotNafsitShikomMikzoei.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g10",
    "title": "Am I entitled to vocational rehabilitation from National Insurance due to psychiatric disability?",
    "content": "<p>Anyone determined to have a permanent weighted medical disability of <strong>at least 20%</strong> is entitled to check eligibility for vocational rehabilitation from National Insurance - even if not receiving a disability allowance. The service includes occupational assessment, professional counseling, funding for studies or training, and a rehabilitation allowance during studies.</p>",
    "links": [
      {
        "label": "National Insurance - vocational rehabilitation and psychiatric disability",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/NecotNafsitShikomMikzoei.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g11",
    "title": "מהו סל השיקום למתמודדי נפש, ולמי הוא מגיע?",
    "content": "<p><strong>בשונה מהשיקום המקצועי (בשאלה הקודמת) שמפעיל ביטוח לאומי, סל השיקום ממומן ומופעל ע\"י משרד הבריאות</strong> ומתמקד בתמיכה קהילתית רחבה ולא רק בתעסוקה.</p><p>מי שנקבעה לו נכות נפשית של <strong>40% לפחות</strong> מטעם ביטוח לאומי, זכאי לפנות לוועדת שיקום (מתכנסת בקופות החולים, מרפאות לבריאות הנפש ובתי חולים פסיכיאטריים) לצורך גיבוש תוכנית שיקום בקהילה - בתחומי תעסוקה, דיור, השכלה, פנאי ותמיכה במשפחה. קבלת סל השיקום אינה מבטלת את הזכאות לשיקום מקצועי מביטוח לאומי.</p>",
    "links": [
      {
        "label": "סל שיקום ממשרד הבריאות - ביטוח לאומי",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/SalSIkomMisradBrieot.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g11",
    "title": "ما هي سلة التأهيل لمتعافي الصحة النفسية، ولمن تُقدَّم؟",
    "content": "<p><strong>خلافاً للتأهيل المهني (في السؤال السابق) الذي يديره التأمين الوطني، فإن سلة التأهيل ممولة ومُدارة من قبل وزارة الصحة</strong> وتركز على دعم مجتمعي واسع وليس فقط على التوظيف.</p><p>من تقرر له عجز نفسي بنسبة <strong>40% على الأقل</strong> من قبل التأمين الوطني، يحق له التوجه للجنة تأهيل (تنعقد في صناديق المرضى وعيادات الصحة النفسية والمستشفيات النفسية) لبلورة خطة تأهيل مجتمعي - في مجالات العمل والسكن والتعليم والترفيه ودعم الأسرة. الحصول على سلة التأهيل لا يلغي الأهلية للتأهيل المهني من التأمين الوطني.</p>",
    "links": [
      {
        "label": "سلة التأهيل من وزارة الصحة - التأمين الوطني",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/SalSIkomMisradBrieot.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g11",
    "title": "What is the mental health rehabilitation package, and who is it for?",
    "content": "<p><strong>Unlike vocational rehabilitation (previous question), which is run by National Insurance, the rehabilitation package is funded and run by the Ministry of Health</strong> and focuses on broad community support rather than employment alone.</p><p>Anyone determined by National Insurance to have a psychiatric disability of <strong>at least 40%</strong> is entitled to approach a rehabilitation committee (convened at health funds, mental health clinics, and psychiatric hospitals) to build a community rehabilitation plan - covering employment, housing, education, leisure, and family support. Receiving the rehabilitation package does not cancel eligibility for vocational rehabilitation from National Insurance.</p>",
    "links": [
      {
        "label": "Ministry of Health rehabilitation package - National Insurance",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/SalSIkomMisradBrieot.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g12",
    "title": "מגיעה לי תעודת נכות והנחות בעקבות פגיעה נפשית?",
    "content": "<p>תעודת נכות דיגיטלית מזכה בפטור מתורים ובהנחות (תחבורה ציבורית, מוזיאונים ואתרים):</p><ul><li><strong>נכות של 50% לפחות</strong> - פטור מתורים <strong>וגם</strong> פטור מתשלום עבור מלווה</li><li><strong>נכות של 40% לפחות</strong> - פטור מתורים בלבד</li></ul>",
    "links": [
      {
        "label": "תעודת נכות - ביטוח לאומי",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/teodtneceNefaes.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g12",
    "title": "هل يحق لي الحصول على بطاقة عجز وحسومات بسبب إصابة نفسية؟",
    "content": "<p>بطاقة العجز الرقمية تمنح إعفاءً من الطوابير وحسومات (مواصلات عامة، متاحف ومواقع):</p><ul><li><strong>عجز بنسبة 50% على الأقل</strong> - إعفاء من الطوابير <strong>و</strong> إعفاء من دفع أجرة المرافق</li><li><strong>عجز بنسبة 40% على الأقل</strong> - إعفاء من الطوابير فقط</li></ul>",
    "links": [
      {
        "label": "بطاقة العجز - التأمين الوطني",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/teodtneceNefaes.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g12",
    "title": "Am I entitled to a disability certificate and discounts due to a psychological injury?",
    "content": "<p>A digital disability certificate grants an exemption from queues and various discounts (public transportation, museums, and sites):</p><ul><li><strong>At least 50% disability</strong> - exemption from queues <strong>and</strong> exemption from paying for a companion</li><li><strong>At least 40% disability</strong> - exemption from queues only</li></ul>",
    "links": [
      {
        "label": "Disability certificate - National Insurance",
        "url": "https://www.btl.gov.il/ZcuyotAsdience/MitmoddiNefesh/Pages/teodtneceNefaes.aspx"
      }
    ],
    "categorySlugs": [
      "rights"
    ],
    "audienceKeys": [
      "general"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g13",
    "title": "מהו אירוע טראומטי?",
    "content": "<p>אירוע טראומטי הוא אירוע מסכן חיים או אירוע המאיים באופן קיצוני על שלמות הגוף או הנפש. אירוע כזה מייצר תגובה נורמלית למצב לא נורמלי ומפעיל באופן טבעי ואוטומטי את מערכות ההישרדות של האדם שנאלץ לעבור בפתאומיות משגרה למצב חירום.</p><p>דוגמאות לאירועים טראומטיים: קרב, אירועי טרור, תאונות דרכים, תקיפות ופגיעות מיניות אלימות בתוך קשר זוגי, אסונות טבע.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g13",
    "title": "ما هو الحدث الصادم؟",
    "content": "<p>الحدث الصادم هو حدث يهدد الحياة، أو يشكل تهديداً بالغاً للسلامة الجسدية أو النفسية. مثل هذا الحدث يُنتج استجابة طبيعية لوضع غير طبيعي، ويُفعّل بشكل تلقائي وطبيعي أنظمة البقاء لدى الشخص الذي اضطر للانتقال فجأة من الروتين إلى حالة طوارئ.</p><p>أمثلة على أحداث صادمة: القتال، الهجمات الإرهابية، حوادث الطرق، الاعتداءات والإيذاء الجنسي العنيف داخل العلاقة، والكوارث الطبيعية.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g13",
    "title": "What is a traumatic event?",
    "content": "<p>A traumatic event is one that threatens life, or poses an extreme threat to physical or psychological integrity. Such an event produces a normal reaction to an abnormal situation, and naturally and automatically activates the survival systems of a person forced to shift suddenly from routine to an emergency state.</p><p>Examples of traumatic events: combat, terror attacks, road accidents, violent sexual assault within a relationship, and natural disasters.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g14",
    "title": "מהי פוסט טראומה?",
    "content": "<p>מצב שבו קיימת אי-התאוששות מהתגובה לאירוע הטראומטי - האיום הפסיק להתקיים אך האדם עדיין מגיב כאילו הוא קיים. פוסט טראומה עלולה להתפתח אצל אדם שחווה את האירוע הטראומטי, וגם אצל אדם שהיה עד ראייה, או אדם שנחשף לפרטים הקשים אודות האירוע הטראומטי.</p><p>התגובה יכולה להיות רציפה, או להתעורר כשאדם נחשף לגירויים (טריגרים) שמזכירים את האירוע.</p><p>הביטויים יכולים להיות: קשיים בשינה וסיוטי לילה, רגזנות, התפרצויות, הימנעויות מאנשים וממקומות מסוימים, שינויים במצב הרוח, חרדה ועוד.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g14",
    "title": "ما هو اضطراب ما بعد الصدمة؟",
    "content": "<p>حالة تنعدم فيها القدرة على التعافي من الاستجابة للحدث الصادم - إذ يتوقف التهديد عن الوجود لكن الشخص ما زال يتفاعل كأنه ما زال قائماً. يمكن أن يتطور اضطراب ما بعد الصدمة لدى شخص عاش الحدث الصادم مباشرة، وكذلك لدى شاهد عيان، أو شخص تعرّض لتفاصيل قاسية عن الحدث الصادم.</p><p>يمكن أن تكون الاستجابة مستمرة، أو تظهر عند التعرض لمثيرات (محفزات) تذكّر بالحدث.</p><p>قد تظهر هذه الاستجابة على شكل: صعوبات في النوم وكوابيس، تهيّج، انفجارات غضب، تجنّب أشخاص وأماكن معينة، تغيّرات في المزاج، قلق، وغير ذلك.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g14",
    "title": "What is post-trauma (PTSD)?",
    "content": "<p>A state in which there is a failure to recover from the reaction to a traumatic event - the threat has stopped existing, but the person still reacts as if it does. Post-trauma can develop in a person who experienced the traumatic event directly, as well as in an eyewitness, or someone exposed to difficult details about the traumatic event.</p><p>The reaction can be continuous, or triggered when a person is exposed to reminders (triggers) of the event.</p><p>It can show up as: trouble sleeping and nightmares, irritability, outbursts, avoidance of people and certain places, mood changes, anxiety, and more.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g15",
    "title": "האם ניתן להתאושש מאירוע טראומטי באופן טבעי?",
    "content": "<p>כן - רוב האנשים מתאוששים מאירועים טראומטיים באופן טבעי, בזמן. המוח שלנו מצויד ביכולת עיבוד הטראומה ו\"תיוקה\" כזיכרון עבר.</p><p>עם זאת, אצל חלק מהאנשים, עקב עוצמת האירוע, גורמים ביולוגיים, או היעדר תמיכה - תהליך זה נעצר. הזיכרון נשאר \"חי\" ומפעיל, כאילו האיום עדיין קיים.</p><p>זה לא אומר שמשהו שבור בך - זה אומר שהמוח שלך עדיין מנסה להגן עליך.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g15",
    "title": "هل يمكن التعافي من حدث صادم بشكل طبيعي؟",
    "content": "<p>نعم - يتعافى معظم الناس من الأحداث الصادمة بشكل طبيعي مع مرور الوقت. يمتلك دماغنا القدرة على معالجة الصدمة و\"أرشفتها\" كذكرى من الماضي.</p><p>غير أن بعض الأشخاص، بسبب حدّة الحدث أو عوامل بيولوجية أو غياب الدعم - قد تتوقف هذه العملية. تظل الذاكرة \"حية\" ونشطة، كأن التهديد ما زال قائماً.</p><p>هذا لا يعني أن ثمة خللاً فيك - بل يعني أن دماغك ما زال يحاول حمايتك.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g15",
    "title": "Can you recover from a traumatic event naturally?",
    "content": "<p>Yes - most people recover from traumatic events naturally over time. Our brain is equipped to process trauma and \"file\" it as a past memory.</p><p>For some people, due to the intensity of the event, biological factors, or lack of support, this process stalls. The memory stays \"live\" and active, as if the threat still exists.</p><p>That doesn't mean something is broken in you - it means your brain is still trying to protect you.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g16",
    "title": "איך נראית התאוששות טבעית מטראומה?",
    "content": "<p>אדם שעבר אירוע טראומטי נאלץ לעבור בפתאומיות משגרה למצב חירום, ומגיב בפעולה לא מודעת וללא בחירה. כאשר המוח מזהה שאין יותר איום, הוא מסמן למערכת להחזיר את פעולות השגרה - וברוב המקרים המערכת לבד מייצרת התאוששות טבעית. במצב כזה האדם מאפשר לעצמו בהדרגה לעבד את החוויה שעבר, לחשוב ולדבר על מה שאירע, ולשוב ולתפקד במעגלי חייו השונים - קשרים בין-אישיים, עבודה ופעילויות משמעותיות.</p><p>ברוב המקרים נצפה להתאוששות טבעית אחרי כחודש וחצי - התסמינים יחלפו ונחזור לתפקוד תקין. אם לא חל שיפור, אפשר וכדאי לפנות לטיפול להמשך בירור.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g16",
    "title": "كيف يبدو التعافي الطبيعي من الصدمة؟",
    "content": "<p>الشخص الذي يمر بحدث صادم يضطر للانتقال فجأة من الروتين إلى حالة طوارئ، ويتفاعل باستجابة لا واعية وغير مختارة. حين يدرك الدماغ أن الخطر لم يعد قائماً، يُرسل إشارة للمنظومة لاستعادة سير الروتين - وفي معظم الحالات تُنتج المنظومة تعافياً طبيعياً من تلقاء نفسها. في هذه الحالة، يسمح الشخص لنفسه تدريجياً بمعالجة ما مرّ به، والتفكير والحديث عمّا حدث، والعودة للعمل في مختلف دوائر حياته - العلاقات الشخصية، العمل، والأنشطة ذات المعنى.</p><p>في معظم الحالات، يُتوقع تعافٍ طبيعي بعد نحو شهر ونصف - تزول الأعراض ونعود للأداء الطبيعي. إذا لم يطرأ تحسّن، يُستحسن اللجوء إلى العلاج لمزيد من التقييم.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g16",
    "title": "What does natural recovery from trauma look like?",
    "content": "<p>A person who goes through a traumatic event is forced to shift suddenly from routine to an emergency state, and reacts through an unconscious, unchosen response. Once the brain recognizes the threat is no longer present, it signals the system to resume routine functioning - and in most cases, the system produces natural recovery on its own. The person gradually allows themselves to process what happened, to think and talk about it, and to return to functioning across the different areas of their life - relationships, work, and meaningful activities.</p><p>In most cases, natural recovery is expected after about six weeks - symptoms fade and functioning returns to normal. If there is no improvement, it's worth turning to treatment for further evaluation.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g17",
    "title": "מהן התגובות האופייניות לפוסט-טראומה?",
    "content": "<p>ישנם מספר תחומים שבהם נראה תגובות אופייניות לאחר אירוע טראומטי:</p><ul><li><strong>חודרנות:</strong> זיכרונות ו\"פיסות זיכרון\" הקשורים לאירוע הטראומטי פורצים לתודעה ומשתלטים על כל החוויה ברגע נתון. זה יכול לקרות בסיוטי לילה, בפלאשבקים, או בתגובות לתמונות, צלילים, ריחות או מילים המזכירים את האירוע.</li><li><strong>הימנעות מחוויה או מרגש:</strong> האדם שנפגע נמנע ממקומות, חפצים, מצבים ואנשים המזכירים לו את האירוע, ובנוסף מצמצם מחשבות, דיבור, רגשות ותחושות שמתחברות לטראומה.</li><li><strong>שינויים קוגניטיביים ורגשיים:</strong> האדם הנפגע רואה את עצמו, את זולתו ואת העולם בכלל באור שלילי - חושב על עצמו שהוא חלש, נכשל או פגום. אחרים נראים לו תוקפניים ומתביישים בו, והעולם נתפס כשרירותי, מנוכר או רודפני.</li><li><strong>עוררות יתר:</strong> \"כוננות ספיגה\" תמידית - תחושה שחייבים להיות על המשמר וערוכים לפעולה בכל רגע. מצב זה מפריע כמובן לקשרים, לשינה ולריכוז.</li></ul>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g17",
    "title": "ما هي التفاعلات النموذجية لاضطراب ما بعد الصدمة؟",
    "content": "<p>هناك عدة مجالات تظهر فيها تفاعلات نموذجية بعد حدث صادم:</p><ul><li><strong>الاقتحام:</strong> ذكريات و\"شظايا ذكريات\" مرتبطة بالحدث الصادم تقتحم الوعي وتسيطر على التجربة بأكملها في لحظة معينة. يمكن أن يحدث ذلك في كوابيس الليل أو الفلاشباك أو كردّ فعل على صور أو أصوات أو روائح أو كلمات تذكّر بالحدث.</li><li><strong>تجنّب التجربة أو الشعور:</strong> يتجنّب المصاب الأماكن والأشياء والمواقف والأشخاص التي تذكّره بالحدث، ويقلّص أيضاً الأفكار والحديث والمشاعر والأحاسيس المرتبطة بالصدمة.</li><li><strong>تغيّرات معرفية وعاطفية:</strong> يرى المصاب نفسه والآخرين والعالم ككل بصورة سلبية - يعتقد أنه ضعيف أو فاشل أو معطوب. يبدو له الآخرون عدائيين أو خجلين منه، ويُدرك العالم على أنه عشوائي أو معادٍ أو مطارِد.</li><li><strong>فرط اليقظة:</strong> \"تأهب دائم\" - شعور بضرورة البقاء في حالة حذر واستعداد للفعل في كل لحظة. هذه الحالة تُعيق بطبيعتها العلاقات والنوم والتركيز.</li></ul>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g17",
    "title": "What are the typical reactions to post-trauma?",
    "content": "<p>There are several areas in which typical reactions to a traumatic event can appear:</p><ul><li><strong>Intrusion:</strong> memories and \"fragments of memory\" tied to the traumatic event break into awareness and take over the whole experience in a given moment. This can happen through nightmares, flashbacks, or reactions to images, sounds, smells, or words that recall the event.</li><li><strong>Avoidance of experience or emotion:</strong> the person avoids places, objects, situations, and people that remind them of the event, and also narrows down thoughts, speech, feelings, and sensations connected to the trauma.</li><li><strong>Cognitive and emotional changes:</strong> the affected person sees themselves, others, and the world in general in a negative light - thinking of themselves as weak, a failure, or damaged. Others seem hostile or ashamed of them, and the world feels arbitrary, alienating, or persecutory.</li><li><strong>Hyperarousal:</strong> a constant \"absorbed alertness\" - a feeling of needing to be on guard and ready to act at every moment. This naturally interferes with relationships, sleep, and concentration.</li></ul>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g18",
    "title": "מה קורה לי בגוף כשאני חווה אירוע טראומטי?",
    "content": "<p>בעת חשיפה לאירוע טראומטי המוח מזהה סכנה ומפעיל את \"מנגנון ההישרדות\", שתפקידו להבטיח תגובה ברגעי סכנה. בדרך כלל הפעולה ההישרדותית תהיה \"הילחם\" או \"ברח\". כדי שנוכל לפעול במהירות באחת מהדרכים האלה, הגוף זקוק לאנרגיה פיזית - ולכן תהיה הצפה של הורמונים, הזרמת דם וחמצן לשרירים, דופק מואץ, הזעה ועוד.</p><p>לתגובה זו ערך הישרדותי, אך לעיתים מנגנון ההישרדות עלול \"להיתקע\" גם זמן רב לאחר שהאירוע הסתיים. המוח מתקשה להבדיל בין סכנת חיים ממשית לבין מצוקה פסיכולוגית, ולכן טריגרים כמו ריח, רעש או אור חזק יכולים להפעיל את מערכות הגוף בעוצמה זהה - גם במצבים שאינם דורשים תגובה פיזית.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 5
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g18",
    "title": "ما الذي يحدث لجسدي عند مواجهة حدث صادم؟",
    "content": "<p>عند التعرّض لحدث صادم، يتعرّف الدماغ على الخطر ويُفعّل \"آلية البقاء\" التي مهمتها ضمان الاستجابة في لحظات الخطر. عادة ما يكون رد الفعل البقائي هو \"القتال\" أو \"الهروب\". ولكي نتمكن من التصرف بسرعة بإحدى هاتين الطريقتين، يحتاج الجسم إلى طاقة جسدية - لذلك يحدث فيض من الهرمونات، وتدفق الدم والأكسجين إلى العضلات، وتسارع في النبض، وتعرّق، وغير ذلك.</p><p>لهذه الاستجابة قيمة بقائية، لكن آلية البقاء قد \"تعلق\" أحياناً لفترة طويلة بعد انتهاء الحدث. يجد الدماغ صعوبة في التمييز بين خطر حقيقي على الحياة وبين ضائقة نفسية، ولذلك يمكن لمحفزات مثل رائحة أو ضجيج أو ضوء ساطع أن تُفعّل أنظمة الجسم بالشدة نفسها - حتى في مواقف لا تتطلب استجابة جسدية.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 5
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g18",
    "title": "What happens in my body during a traumatic event?",
    "content": "<p>When exposed to a traumatic event, the brain identifies danger and activates the \"survival mechanism,\" whose role is to ensure a response in moments of danger. Usually the survival action will be to fight or flee. In order to act quickly in one of these ways, the body needs physical energy - so there's a surge of hormones, blood and oxygen flow to the muscles, a faster heartbeat, sweating, and more.</p><p>This response has survival value, but the survival mechanism can sometimes stay \"stuck\" long after the event has ended. The brain has trouble telling the difference between real life-threatening danger and psychological distress, so triggers like a smell, a noise, or bright light can activate the body's systems just as intensely - even in situations that don't call for a physical response.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 5
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g19",
    "title": "ממה זה נובע ואיך זה נוצר?",
    "content": "<p>PTSD יכול להיגרם ממגוון אירועים: מלחמה, פיגועים, תאונות, תקיפה מינית, אלימות, מחלה קשה, ועוד.</p><p>לא כל מי שחווה טראומה יפתח PTSD. גורמי סיכון כוללים: עוצמת האירוע, היסטוריה של טראומה קודמת, חוסר תמיכה חברתית, גנטיקה, ועוד.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 6
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g19",
    "title": "من أين ينشأ اضطراب ما بعد الصدمة وكيف يتطور؟",
    "content": "<p>قد ينجم اضطراب ما بعد الصدمة عن أحداث متنوعة: الحرب، والهجمات، والحوادث، والاعتداء الجنسي، والعنف، والمرض الشديد، وغير ذلك.</p><p>لا يُصاب كل من مرّ بصدمة باضطراب ما بعد الصدمة. تشمل عوامل الخطر: شدة الحدث، وتاريخ الصدمات السابقة، وغياب الدعم الاجتماعي، والعوامل الجينية، وغيرها.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 6
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g19",
    "title": "What causes PTSD and how does it develop?",
    "content": "<p>PTSD can be caused by many events: war, terror attacks, accidents, sexual assault, violence, serious illness, and more.</p><p>Not everyone who experiences trauma develops PTSD. Risk factors include: event intensity, history of prior trauma, lack of social support, genetics, and more.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 6
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g20",
    "title": "איך אזהה שאני מתמודד עם PTSD?",
    "content": "<p>אם מנגנוני ההישרדות ממשיכים לפעול מחוץ להקשרם - כלומר, הגוף מגיב כאילו יש סכנה כשאין - זה יכול להיות סימן ל-PTSD.</p><p>דוגמאות: בהלה קיצונית מרעש, הימנעות ממקומות מסוימים, קשיי שינה, פלאשבקים, תחושת ניתוק מהמציאות.</p><p><a href=\"/questionnaire\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300\">מעבר לשאלון הסקירה שלנו</a></p><p>השאלון שלנו יכול לתת אינדיקציה ראשונית - אבל אבחנה מדויקת מחייבת איש מקצוע.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 7
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g20",
    "title": "كيف أعرف أنني أعاني من اضطراب ما بعد الصدمة؟",
    "content": "<p>إذا استمرت آليات البقاء في العمل خارج سياقها - أي يتفاعل الجسد كأن ثمة خطراً وهو غير موجود - فقد يكون ذلك مؤشراً على اضطراب ما بعد الصدمة.</p><p>أمثلة: فزع شديد من صوت مفاجئ، وتجنّب أماكن معينة، واضطراب النوم، وذكريات مفاجئة، والشعور بالانفصال عن الواقع.</p><p><a href=\"/questionnaire\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300\">الانتقال إلى استبيان الفحص لدينا</a></p><p>يمكن لاستبياننا أن يعطي مؤشراً أولياً - لكن التشخيص الدقيق يستلزم متخصصاً.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 7
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g20",
    "title": "How do I recognize that I am dealing with PTSD?",
    "content": "<p>If survival mechanisms continue outside their context - meaning the body reacts as if there is danger when there isn't - that can be a sign of PTSD.</p><p>Examples: extreme startle from noise, avoiding certain places, sleep problems, flashbacks, feeling detached from reality.</p><p><a href=\"/questionnaire\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300\">Go to our screening questionnaire</a></p><p>Our questionnaire can give an initial indication - but an accurate diagnosis requires a professional.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 7
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g21",
    "title": "האם כל אדם שחווה אירוע טראומתי יפתח פוסט טראומה?",
    "content": "<p>לא כל אדם שחווה אירוע טראומטי יפתח פוסט טראומה. מחקרים מדברים על אחוזים לא גדולים של הפרעה פוסט טראומתית בעקבות אירוע, למעט במצבים של פגיעה באמון הבסיסי בעולם - פגיעות מיניות ופגיעות בילדים - שם הטראומה משאירה חותם עמוק.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 8
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g21",
    "title": "هل كل من يمر بحدث صادم يُصاب باضطراب ما بعد الصدمة؟",
    "content": "<p>لا يُصاب كل من يمر بحدث صادم باضطراب ما بعد الصدمة. تشير الأبحاث إلى نسب منخفضة نسبياً للإصابة باضطراب ما بعد الصدمة عقب حدث صادم، باستثناء الحالات التي تمسّ الثقة الأساسية بالعالم - الإيذاء الجنسي والإيذاء الذي يلحق بالأطفال - حيث تترك الصدمة أثراً عميقاً.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 8
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g21",
    "title": "Does everyone who experiences a traumatic event develop post-trauma?",
    "content": "<p>Not everyone who experiences a traumatic event will develop post-trauma. Research points to a relatively low rate of post-traumatic disorder following an event, except in situations that harm a person's basic trust in the world - sexual abuse and harm to children - where the trauma leaves a deep imprint.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 8
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g22",
    "title": "מה אפשר לעשות כשיש לי התקף חרדה?",
    "content": "<p><a href=\"/calming\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 mb-3\">דף הרגעה אינטראקטיבי עם תרגילים מודרכים</a></p><p>חרדה היא תופעה מרכזית בפוסט-טראומה. היא מלווה בתסמינים פיזיים כמו דפיקות לב מואצות, הזעה, קוצר נשימה, סחרחורות ורעד ועוד - ותסמינים אלה מזינים זה את זה.</p><p>למרות שהתקף חרדה מרגיש כמו סכנת חיים, הוא חולף מעצמו ואינו מסוכן. כמה דברים שעוזרים:</p><ul><li><strong>האטו את הנשימה:</strong> שאפו 4 שניות, עצרו 4, נשפו לאט 6 שניות. זה מכבה את תגובת החירום של הגוף.</li><li><strong>קרקוע:</strong> שימו לב ל-5 דברים שאתם רואים, ו-4 שאתם נוגעים בהם - זה מחזיר אתכם להווה.</li><li><strong>חיוך מאולץ:</strong> כווצו את שרירי הפנים לחיוך רחב, גם אם הוא מרגיש מזויף לחלוטין. פעולה זו משחררת אנדורפינים במוח ומפחיתה את רמת המתח הפיזי.</li><li><strong>הרפיית שרירים פרוגרסיבית (PMR):</strong> כווצו את שרירי כפות הרגליים למשך 5 שניות, ואז שחררו אותם בבת אחת. עברו בהדרגה לכל קבוצות השרירים בגוף (שוקיים, ירכיים, בטן, ידיים, פנים) - ההרפיה הפיזית מאותתת למוח להירגע.</li></ul>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 9
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g22",
    "title": "ماذا أفعل عندما أتعرض لنوبة هلع؟",
    "content": "<p><a href=\"/calming\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 mb-3\">صفحة تهدئة تفاعلية مع تمارين موجّهة</a></p><p>القلق سمة مركزية في اضطراب ما بعد الصدمة. يترافق مع أعراض جسدية مثل تسارع ضربات القلب، والتعرّق، وضيق التنفس، والدوخة، والارتعاش، وغيرها - وهذه الأعراض يغذي بعضها بعضاً.</p><p>على الرغم من أن نوبة الهلع تشعرك وكأنها خطر على الحياة، إلا أنها تزول من تلقاء نفسها وليست خطيرة. إليك ما يساعد:</p><ul><li><strong>أبطئ تنفسك:</strong> استنشق لمدة 4 ثوانٍ، أمسك لمدة 4 ثوانٍ، ثم أخرج الهواء ببطء خلال 6 ثوانٍ. هذا يوقف استجابة الطوارئ في الجسم.</li><li><strong>التأريض:</strong> انتبه إلى 5 أشياء تراها و4 أشياء تلمسها - هذا يعيدك إلى اللحظة الحالية.</li><li><strong>ابتسامة قسرية:</strong> شدّ عضلات وجهك في ابتسامة عريضة، حتى لو شعرت أنها مصطنعة تماماً. هذا الفعل يُطلق الإندورفين في الدماغ ويقلّل من مستوى التوتر الجسدي.</li><li><strong>الاسترخاء العضلي التدريجي (PMR):</strong> شدّ عضلات باطن قدميك لمدة 5 ثوانٍ، ثم أرخِها دفعة واحدة. انتقل تدريجياً إلى كل مجموعات العضلات في الجسم (الساقين، الفخذين، البطن، اليدين، الوجه). الاسترخاء الجسدي يُرسل إشارة للدماغ لكي يهدأ.</li></ul>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 9
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g22",
    "title": "What can I do when I have a panic attack?",
    "content": "<p><a href=\"/calming\" class=\"inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors duration-300 mb-3\">Interactive calming page with guided exercises</a></p><p>Anxiety is a central feature of post-trauma. It comes with physical symptoms like a racing heart, sweating, shortness of breath, dizziness, and trembling, among others - and these symptoms feed on each other.</p><p>Even though a panic attack feels like a life-threatening danger, it passes on its own and is not dangerous. Here is what helps:</p><ul><li><strong>Slow your breathing:</strong> Inhale for 4 seconds, hold for 4, exhale slowly for 6 seconds. This shuts down the body's emergency response.</li><li><strong>Grounding:</strong> Notice 5 things you can see and 4 you can touch - this brings you back to the present moment.</li><li><strong>Forced smile:</strong> Tighten your facial muscles into a wide smile, even if it feels completely fake. This releases endorphins in the brain and lowers physical tension.</li><li><strong>Progressive muscle relaxation (PMR):</strong> Tense the muscles of your feet for 5 seconds, then release them all at once. Gradually move through all the muscle groups in the body (calves, thighs, abdomen, hands, face). The physical relaxation signals the brain to calm down.</li></ul>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 9
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g23",
    "title": "מתי מומלץ לפנות לטיפול?",
    "content": "<p>חשוב לזכור שברוב המקרים מתאוששים גם אחרי חוויות קשות ומציפות - היכולת האנושית לקום אחרי מכה מפתיעה לטובה. הדבר הרצוי אחרי חוויה טראומטית הוא לקחת זמן ולהיעזר בתמיכה הקיימת בסביבה או בקהילה.</p><p>ההפרעה הפוסט-טראומתית היא הפרעה של אי-התאוששות. כל התגובות המיידיות אחרי אירוע מטלטל הן נורמליות - בלבול, חוסר שינה, כעסים, \"טחינה בראש\" של מה שקרה, ניתוקים, כאבים ומיחושים לא מוסברים - הכול טבעי בימים הקרובים אחרי אירוע. מומלץ לפנות להערכה אצל גורם מקצועי אם אין מגמת שיפור כעבור 3-4 שבועות.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 10
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g23",
    "title": "متى يُستحسن اللجوء إلى العلاج؟",
    "content": "<p>من المهم أن نتذكر أن معظم الناس يتعافون حتى بعد تجارب قاسية وصعبة - والقدرة الإنسانية على النهوض بعد الصدمة مدهشة بشكل إيجابي. الأمر المستحسن بعد تجربة صادمة هو أخذ الوقت اللازم والاستعانة بالدعم المتوفر في المحيط أو المجتمع.</p><p>اضطراب ما بعد الصدمة هو اضطراب عدم تعافٍ. جميع ردود الفعل الفورية بعد حدث مروّع طبيعية - الارتباك، قلة النوم، الغضب، \"اجترار\" ما حدث ذهنياً، لحظات انفصال، آلام ووجع غير مفسَّر - كل هذا طبيعي في الأيام التي تلي الحدث. يُنصح باللجوء إلى تقييم مهني إذا لم يطرأ تحسّن خلال 3-4 أسابيع.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 10
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g23",
    "title": "When is it advisable to seek treatment?",
    "content": "<p>It's important to remember that in most cases, people recover even after difficult, overwhelming experiences - the human capacity to get back up after a blow is surprisingly strong. What's recommended after a traumatic experience is to take time and lean on the support available around you or in your community.</p><p>Post-traumatic disorder is a disorder of non-recovery. All the immediate reactions after a shocking event are normal - confusion, lack of sleep, anger, replaying what happened, moments of disconnection, unexplained aches and pains - all of this is natural in the days following an event. It's recommended to seek a professional assessment if there's no improvement after 3-4 weeks.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 10
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g24",
    "title": "מה קורה בטיפול?",
    "content": "<p>בטיפול בטראומה מנסים לעכל את מה שקרה - להפנים שזה אכן קרה, ושהאירוע הטראומטי קרה באופן מפחיד וללא שליטה. כעת, מתמודדים באופן פעיל עם הזיכרונות וההשלכות של האירוע. באופן פרדוקסלי, ברגע שניתן לקבל שהאירוע קרה - ניתן גם להפנים שהאירוע נגמר.</p><p>ישנן שיטות טיפול רבות, ומשותף לכולן שהן שואפות לעשות סדר בכאוס - ליצור ולמצוא רצף ומשמעות באירועים, ולמצוא להם מקום בטוח בסיפור חייו ובזהותו האישית של האדם.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 11
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g24",
    "title": "ماذا يحدث في العلاج؟",
    "content": "<p>في علاج الصدمة، تجري محاولة استيعاب ما حدث - تقبّل أنه حدث بالفعل، وأن الحدث الصادم وقع بطريقة مخيفة وخارجة عن السيطرة. الآن، يتعامل الشخص بشكل فعّال مع الذكريات وتبعات الحدث. وبشكل متناقض ظاهرياً، بمجرد أن يصبح بالإمكان تقبّل أن الحدث وقع، يصبح بالإمكان أيضاً استيعاب أن الحدث قد انتهى.</p><p>هناك طرق علاج عديدة، والقاسم المشترك بينها أنها تسعى لخلق نظام من الفوضى - لإيجاد تسلسل ومعنى للأحداث، ومنحها مكاناً آمناً في قصة حياة الشخص وهويته الشخصية.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 11
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g24",
    "title": "What happens in treatment?",
    "content": "<p>Trauma treatment is about processing what happened - internalizing that it really happened, and that the traumatic event occurred in a frightening, uncontrollable way. Now, the person actively works through the memories and effects of the event. Paradoxically, once it becomes possible to accept that the event happened, it also becomes possible to internalize that the event is over.</p><p>There are many treatment methods, and what they share is an aim to bring order to chaos - to create and find continuity and meaning in the events, and to give them a safe place in the person's life story and personal identity.</p>",
    "categorySlugs": [
      "ptsd-info"
    ],
    "sortOrder": 11
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g25",
    "title": "מה לעשות בזמן התקף או פלאשבק?",
    "content": "<p>קודם כל - נשמו עמוק. לראות מישהו/י קרוב/ה במצב כזה זה מטלטל גם אתכם, וזה לגמרי בסדר. אתם לא צריכים \"להציל\" - אתם צריכים פשוט להיות שם, נוכחים ובטוחים.</p><h3>ארבעה דברים שיכולים לעזור</h3><ol><li><strong>נוכחות:</strong> דברו בקול שקט ובטוח - \"אני כאן. את/ה בטוח/ה. זה יעבור.\"</li><li><strong>מרחב:</strong> אל תחסמו את היציאה. תנו אוויר פיזי, אל תיצמדו.</li><li><strong>שקט:</strong> הנמיכו אורות, סגרו רעשי רקע, הפחיתו גירויים.</li><li><strong>נגיעה:</strong> שאלו לפני - \"אוכל לגעת בידך?\" - וכבדו את התשובה.</li></ol><h3>מה עדיף שלא לעשות</h3><ul><li>אל תתווכחו עם \"המציאות\" שהוא/היא חווה - היא אמיתית לחלוטין מבחינתם.</li><li>אל תנערו או תאחזו בכוח כדי להוציא אותם מזה.</li><li>אל תחשפו את הסיטואציה לאחרים שלא צריך - שמרו על הכבוד.</li></ul><p>אחרי שזה עובר - אל תדרשו הסבר. תנו זמן. לפעמים שתיקה משותפת היא הדבר היקר ביותר.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g25",
    "title": "ماذا تفعل خلال نوبة أو ذكريات مفاجئة؟",
    "content": "<p>أولاً - تنفّس. رؤية شخص قريب في هذه الحالة أمر مزلزل لك أيضاً، وهذا طبيعي تماماً. لست مضطراً أن \"تنقذه\" - فقط أن تكون موجوداً، حاضراً وآمناً.</p><h3>أربعة أمور يمكن أن تساعد</h3><ol><li><strong>الحضور:</strong> تحدّث بصوت هادئ وواثق - \"أنا هنا. أنت بأمان. سيمرّ هذا.\"</li><li><strong>المساحة:</strong> لا تسدّ المخرج. أعطه فضاءً جسدياً، لا تتشبّث.</li><li><strong>الهدوء:</strong> اخفض الإضاءة، أوقف الضوضاء، قلّل المثيرات.</li><li><strong>اللمس:</strong> اسأل قبل أن تلمس - \"هل يمكنني الإمساك بيدك؟\" - واحترم الجواب.</li></ol><h3>ما يُفضّل عدم فعله</h3><ul><li>لا تجادل \"الواقع\" الذي يعيشه - بالنسبة له حقيقي تماماً.</li><li>لا تهزّه أو تمسكه بالقوة لإخراجه من الحالة.</li><li>لا تكشف الموقف لمن لا داعي - احفظ كرامته.</li></ul><p>بعد أن يمرّ - لا تطلب تفسيراً. أعطه وقتاً. أحياناً الصمت المشترك أثمن ما تملك.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g25",
    "title": "What to do during a flashback or panic episode?",
    "content": "<p>First - take a breath. Seeing someone you love in that state shakes you too, and that's completely OK. You don't need to \"save\" them - you just need to be there, present and safe.</p><h3>Four things that can help</h3><ol><li><strong>Presence:</strong> Speak in a quiet, confident voice - \"I'm here. You're safe. This will pass.\"</li><li><strong>Space:</strong> Don't block the exit. Give physical room, don't cling.</li><li><strong>Quiet:</strong> Dim the lights, lower the noise, reduce stimulation.</li><li><strong>Touch:</strong> Ask first - \"Can I hold your hand?\" - and respect the answer.</li></ol><h3>What to avoid</h3><ul><li>Don't argue with the \"reality\" they're experiencing - it's fully real to them.</li><li>Don't shake or grab them to pull them out of it.</li><li>Don't expose the situation to others who don't need to see it.</li></ul><p>After it passes - don't demand an explanation. Give time. Sometimes shared silence is the most precious thing.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 0
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g26",
    "title": "איך לתקשר ביומיום כשהכל מרגיש על קצה הסכין?",
    "content": "<p>תקשורת עם אדם שחי עם פוסט-טראומה היא לפעמים כמו ללכת בשדה מוקשים שאתם לא רואים. זה מתיש, וזה גם ניתן ללמידה. הנה כמה עקרונות שעוזרים.</p><h3>מה כדאי לעשות</h3><ul><li>דברו מ\"אני\" - \"אני מרגיש/ה דאגה\" עדיף על \"את/ה תמיד...\"</li><li>שאלו לפני שאתם מציעים עזרה: \"מה יעזור לך עכשיו?\"</li><li>אשרו את הרגש לפני שמציעים פתרון - \"נשמע שזה ממש קשה.\"</li><li>שמרו על הבטחות קטנות - הן בונות אמון בזמן שגדולות מאיימות.</li></ul><h3>מה עדיף להימנע ממנו</h3><ul><li>אל תגידו \"עזוב, כבר עבר\" - אצלם זה עוד לא עבר.</li><li>אל תאיימו בעזיבה כשיש משבר - גם אם אתם תשושים.</li><li>אל תנסו \"לתקן\" - לפעמים פשוט להיות שם זה כל מה שצריך.</li><li>אל תשוו לאחרים - \"תראה איך X מתמודד\" שורף את הקשר.</li></ul><p>לא חייבים להגיד את הדבר הנכון. אפילו \"אני לא יודע/ת מה להגיד, אבל אני כאן\" - זה יותר ממספיק.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g26",
    "title": "كيف تتواصل في الحياة اليومية حين يبدو كل شيء على حافة السكين؟",
    "content": "<p>التواصل مع شخص يعيش مع اضطراب ما بعد الصدمة يشبه أحياناً السير في حقل ألغام لا تراه. هذا مُنهك، وهو أيضاً مهارة قابلة للتعلم. إليك مبادئ تساعد.</p><h3>ما يُستحسن فعله</h3><ul><li>تحدّث من منظور \"أنا\" - \"أشعر بالقلق\" أفضل من \"أنت دائماً...\"</li><li>اسأل قبل أن تعرض المساعدة: \"ما الذي سيُريحك الآن؟\"</li><li>صادق على المشاعر قبل تقديم الحلول - \"يبدو أن هذا صعب جداً.\"</li><li>حافظ على الوعود الصغيرة - فهي تبني الثقة حين تخيف الكبيرة.</li></ul><h3>ما يُفضّل تجنّبه</h3><ul><li>لا تقل \"تجاهل، لقد مضى\" - بالنسبة له لم يمضِ بعد.</li><li>لا تهدّد بالترك خلال الأزمة - حتى لو كنت منهكاً.</li><li>لا تحاول \"إصلاحه\" - أحياناً مجرد الوجود كافٍ.</li><li>لا تقارنه بالآخرين - \"انظر كيف يتعامل فلان\" يحرق العلاقة.</li></ul><p>لست مضطراً لقول الكلام الصحيح. حتى \"لا أعرف ماذا أقول، لكنني هنا\" - أكثر من كافٍ.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g26",
    "title": "How to communicate day to day, when everything feels like walking on eggshells?",
    "content": "<p>Communicating with someone living with PTSD can feel like walking through a minefield you can't see. It's exhausting, and it's also a skill you can learn. Here are some principles that help.</p><h3>What to do</h3><ul><li>Speak from \"I\" - \"I'm feeling worried\" beats \"you always...\"</li><li>Ask before offering help: \"What would help you right now?\"</li><li>Validate the feeling before offering a solution - \"That sounds really hard.\"</li><li>Keep small promises - they build trust when big ones feel threatening.</li></ul><h3>What to avoid</h3><ul><li>Don't say \"let it go, it's over\" - for them, it isn't.</li><li>Don't threaten to leave during a crisis - even when you're depleted.</li><li>Don't try to \"fix\" them - sometimes just being there is enough.</li><li>Don't compare to others - \"look how X handles it\" burns the relationship.</li></ul><p>You don't have to say the right thing. Even \"I don't know what to say, but I'm here\" - is more than enough.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 1
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g27",
    "title": "איך לזהות סימני מצוקה - ומתי לדאוג ברצינות?",
    "content": "<p>אנשים שחיים עם פוסט-טראומה לא תמיד אומרים שקשה להם. לפעמים הסימנים שקטים. הכרת הסימנים האלה היא לא פרנויה - היא דאגה אמיתית.</p><h3>סימנים יומיומיים לשים אליהם לב</h3><ul><li>נסיגה חברתית - פחות יציאות, פחות תקשורת יזומה.</li><li>שינויים קיצוניים בשינה - יותר מדי, או פחות מדי.</li><li>פרצי זעם או בכי שלא בפרופורציה לטריגר.</li><li>איבוד עניין בדברים שפעם אהבו.</li><li>עלייה בשימוש באלכוהול, סמים, או הימורים.</li></ul><h3>סימנים שדורשים פעולה מיידית</h3><ul><li>דיבור על חוסר תקווה - \"אין לי סיבה\", \"היה עדיף בלעדיי\".</li><li>נתינת חפצים יקרים או \"סגירת חשבונות\".</li><li>שקט פתאומי ורגוע אחרי תקופה קשה - לפעמים זה דגל אדום.</li></ul><aside><strong>אם זיהיתם סימנים מהקטגוריה השנייה - אל תחכו.</strong> התקשרו לערן <strong>1201</strong> (24/7), או למוקד סה\"ר. אם יש סכנה מיידית - מד\"א 101 או מיון פסיכיאטרי.</aside>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g27",
    "title": "كيف تتعرف على علامات الضيق - ومتى تقلق جدياً؟",
    "content": "<p>من يعيش مع اضطراب ما بعد الصدمة لا يقول دائماً إنه يعاني. أحياناً العلامات صامتة. معرفتها ليست بارانويا - بل اهتمام حقيقي.</p><h3>علامات يومية تستحق الانتباه</h3><ul><li>انسحاب اجتماعي - خروج أقل، تواصل مبادر أقل.</li><li>تغيّرات حادة في النوم - كثير جداً أو قليل جداً.</li><li>نوبات غضب أو بكاء غير متناسبة مع المُحفّز.</li><li>فقدان الاهتمام بأشياء كان يحبها.</li><li>زيادة في تعاطي الكحول أو المخدرات أو القمار.</li></ul><h3>علامات تستدعي تحرّكاً فورياً</h3><ul><li>كلام عن اليأس - \"لا سبب لي\"، \"الأفضل لو لم أكن هنا\".</li><li>إعطاء أغراض ثمينة أو \"إنهاء حسابات\".</li><li>هدوء مفاجئ ومطمئن بعد فترة صعبة - أحياناً علامة حمراء.</li></ul><aside><strong>إذا رصدت علامات من الفئة الثانية - لا تنتظر.</strong> اتصل بإيران <strong>1201</strong> (24/7)، أو بمركز سهار. إن كان هناك خطر فوري - نجمة داود الحمراء 101 أو طوارئ نفسية.</aside>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g27",
    "title": "How to recognize signs of distress - and when to seriously worry?",
    "content": "<p>People living with PTSD don't always say when it's hard. Sometimes the signs are quiet. Knowing them isn't paranoia - it's real care.</p><h3>Everyday signs to notice</h3><ul><li>Social withdrawal - going out less, initiating contact less.</li><li>Extreme sleep changes - too much, or too little.</li><li>Outbursts of anger or tears disproportionate to the trigger.</li><li>Loss of interest in things they used to love.</li><li>Increased use of alcohol, drugs, or gambling.</li></ul><h3>Signs that need action now</h3><ul><li>Talk of hopelessness - \"I have no reason,\" \"It would be better without me.\"</li><li>Giving away valuable items or \"wrapping things up.\"</li><li>A sudden calm after a hard period - sometimes a red flag.</li></ul><aside><strong>If you see signs from the second category - don't wait.</strong> Call ERAN <strong>1201</strong> (24/7), or SAHAR online. If there's immediate danger - MDA 101 or a psychiatric ER.</aside>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 2
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g28",
    "title": "איך לדעת אם אני בעצמי מתחיל/ה להישחק או \"להזדהם\" מהטראומה?",
    "content": "<p>זה נקרא טראומה משנית או שחיקת חמלה, וזה לא חולשה - זה תוצאה אנושית של אהבה עמוקה ונשיאה במשא ממושך. אתם לא לבד בזה, ויש על זה שמות כי זה נפוץ.</p><h3>סימנים שכדאי להקשיב להם</h3><ul><li>אתם חולמים את החלומות הקשים <em>שלהם</em>, או נמנעים ממקומות ש<em>הם</em> נמנעים מהם.</li><li>קוצר רוח שלא מאפיין אתכם, עצבנות מתפרצת על קטנות.</li><li>קושי להירדם, או התעוררויות עם תחושת דריכות.</li><li>תחושה שאתם \"על האוטומט\" - מתפקדים אבל לא באמת נוכחים.</li><li>איבוד עניין בדברים שפעם אהבתם, וניתוק רגשי מאנשים אחרים.</li></ul><h3>מה כן לעשות עם זה</h3><ul><li>דברו עם מישהו - מטפל/ת, חבר/ה קרוב/ה, או קבוצת תמיכה לבני משפחה.</li><li>הקפידו על דבר אחד קטן ביום שהוא רק שלכם - הליכה, ספר, מקלחת ארוכה.</li><li>הציבו גבול אחד שאתם מצליחים לשמור - לא הכל בבת אחת.</li><li>זכרו: לטפל בעצמכם זה לא בגידה. זה תנאי להיות שם לטווח ארוך.</li></ul><p>אם אתם קוראים את זה ומזהים את עצמכם - זה כבר צעד ראשון. עכשיו תנו לעצמכם רשות לעצור.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g28",
    "title": "كيف أعرف إن كنت أنا نفسي بدأت أُنهَك أو \"أتأثر\" من صدمته؟",
    "content": "<p>يُسمّى هذا الصدمة الثانوية أو إنهاك الرحمة، وليس ضعفاً - بل نتيجة إنسانية للحب العميق وحمل ثقل طويل. لست وحدك في ذلك، وله أسماء لأنه شائع.</p><h3>علامات تستحق الإصغاء إليها</h3><ul><li>تحلم أحلامه الصعبة <em>هو</em>، أو تتجنّب أماكن يتجنّبها <em>هو</em>.</li><li>قِصَر صبر لا يشبهك، انفعال على أمور صغيرة.</li><li>صعوبة في النوم، أو استيقاظ بشعور تيقّظ.</li><li>إحساس بأنك \"على الأوتوماتيك\" - تؤدّي مهامك بلا حضور حقيقي.</li><li>فقدان اهتمام بأشياء كنت تحبها، وانفصال عاطفي عن الآخرين.</li></ul><h3>ماذا تفعل حيال ذلك</h3><ul><li>تحدّث مع أحد - معالج/ة، صديق/ة مقرّب/ة، أو مجموعة دعم لأفراد العائلة.</li><li>التزم بأمر صغير يومي خاص بك فقط - مشي، كتاب، حمّام طويل.</li><li>ضع حدّاً واحداً تستطيع الحفاظ عليه - لا كل شيء دفعة واحدة.</li><li>تذكّر: العناية بنفسك ليست خيانة. هي شرط لتبقى موجوداً على المدى الطويل.</li></ul><p>إن قرأت هذا وعرفت نفسك - هذه خطوة أولى. الآن أعطِ نفسك إذناً بالتوقّف.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g28",
    "title": "How do I know if I myself am starting to burn out or absorb their trauma?",
    "content": "<p>It's called secondary trauma or compassion fatigue, and it's not weakness - it's a human result of deep love and carrying weight for a long time. You're not alone in this; it has names because it's common.</p><h3>Signs worth listening to</h3><ul><li>You dream <em>their</em> hard dreams, or avoid places <em>they</em> avoid.</li><li>Impatience that isn't like you, snapping at small things.</li><li>Trouble falling asleep, or waking up feeling on alert.</li><li>A sense of being \"on autopilot\" - functioning but not really present.</li><li>Losing interest in things you used to love, emotionally disconnecting from others.</li></ul><h3>What to do about it</h3><ul><li>Talk to someone - a therapist, a close friend, or a family support group.</li><li>Hold one small daily thing that's just yours - a walk, a book, a long shower.</li><li>Set one boundary you can keep - not everything at once.</li><li>Remember: taking care of yourself isn't betrayal. It's how you stay there for the long haul.</li></ul><p>If you're reading this and recognizing yourself - that's already a first step. Now give yourself permission to pause.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 3
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g29",
    "title": "איך להציע פנייה לטיפול בלי שזה ירגיש כמו לחץ או הטפה?",
    "content": "<p>אחת המתסכלות שבסיטואציות: אתם רואים את הכאב, אתם יודעים שטיפול יכול לעזור, והם מסרבים או נמנעים. תזכרו - ההחלטה צריכה להגיע מהם, אבל איך שאתם מדברים על זה כן עושה הבדל.</p><h3>גישות שעוזרות</h3><ul><li><strong>תנרמלו:</strong> \"אנשים שעברו דברים קשים כמו שלך הולכים לטיפול - זה לא סימן לחולשה.\"</li><li><strong>היו ספציפיים, לא כלליים:</strong> \"ראיתי שם של מטפל/ת שמתמחה בזה, רוצה שאשלח לך?\" עדיף על \"אולי תפנה למישהו\".</li><li><strong>הציעו ליווי מעשי:</strong> \"אני יכול/ה לבוא איתך לפגישה ראשונה, או לחכות בחוץ.\"</li><li><strong>הציעו אופציות, לא אולטימטום:</strong> טיפול פסיכולוגי, קבוצת תמיכה, נט\"ל, קו פתוח של ערן.</li></ul><h3>מה עדיף לא לעשות</h3><ul><li>אל תחזרו על זה כל יום - זה הופך לרעש שמתעלמים ממנו.</li><li>אל תאמרו \"אתה צריך עזרה\" - זה נשמע כמו אבחנה, לא כמו דאגה.</li><li>אל תאיימו (\"או שתפנה או ש...\") - זה יצור התנגדות, לא שינוי.</li></ul><p>אם הם לא מוכנים עכשיו - שתלו את הזרע, ותחזרו לזה אחרי שבועיים-שלושה. שינוי אמיתי לוקח זמן.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g29",
    "title": "كيف أقترح اللجوء للعلاج دون أن يبدو ضغطاً أو وعظاً؟",
    "content": "<p>من أكثر المواقف إحباطاً: ترى الألم، تعرف أن العلاج يمكن أن يساعد، وهو يرفض أو يتهرّب. تذكّر - القرار يجب أن يأتي منه، لكن كيف تتحدّث عن ذلك يُحدث فرقاً.</p><h3>أساليب تساعد</h3><ul><li><strong>طبّع الفكرة:</strong> \"الناس الذين مرّوا بأشياء صعبة مثلك يذهبون للعلاج - ليس علامة ضعف.\"</li><li><strong>كن محدّداً، لا عمومياً:</strong> \"وجدت اسم معالج/ة متخصص/ة في هذا، أرسله لك؟\" أفضل من \"ربما تذهب لأحد\".</li><li><strong>اعرض مرافقة عملية:</strong> \"أستطيع أن أرافقك للجلسة الأولى، أو أنتظر في الخارج.\"</li><li><strong>اعرض خيارات، لا إنذاراً:</strong> علاج نفسي، مجموعة دعم، خط مفتوح.</li></ul><h3>ما يُفضّل تجنّبه</h3><ul><li>لا تكرّر هذا كل يوم - يصبح ضجيجاً يُتجاهل.</li><li>لا تقل \"أنت بحاجة لمساعدة\" - يبدو كتشخيص، لا اهتمام.</li><li>لا تهدّد (\"إما أن تذهب أو...\") - يولّد مقاومة، لا تغييراً.</li></ul><p>إن لم يكن جاهزاً الآن - ازرع البذرة، ثم عُد إليها بعد أسبوعين أو ثلاثة. التغيير الحقيقي يأخذ وقتاً.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g29",
    "title": "How to suggest seeking therapy without it feeling like pressure or a lecture?",
    "content": "<p>One of the most frustrating situations: you see the pain, you know therapy could help, and they refuse or avoid. Remember - the decision has to come from them, but how you talk about it does make a difference.</p><h3>Approaches that help</h3><ul><li><strong>Normalize:</strong> \"People who've been through hard things like you do go to therapy - it's not a sign of weakness.\"</li><li><strong>Be specific, not general:</strong> \"I found a therapist who specializes in this - want me to send their info?\" beats \"maybe see someone.\"</li><li><strong>Offer practical accompaniment:</strong> \"I can come with you to the first session, or wait outside.\"</li><li><strong>Offer options, not ultimatums:</strong> psychotherapy, support group, hotline.</li></ul><h3>What to avoid</h3><ul><li>Don't repeat it every day - it becomes noise to ignore.</li><li>Don't say \"you need help\" - it sounds like a diagnosis, not care.</li><li>Don't threaten (\"either you go, or...\") - it creates resistance, not change.</li></ul><p>If they're not ready now - plant the seed, then come back to it in two or three weeks. Real change takes time.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 4
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g30",
    "title": "מה לעשות אחרי ויכוח קשה - איך חוזרים זה לזה?",
    "content": "<p>אחרי ויכוח עם מישהו שחי עם פוסט-טראומה - שניכם פגועים, גם אם הוויכוח התחיל ממשהו \"קטן\". זה לא אומר שהקשר שבור. זה אומר שצריך לתקן בעדינות.</p><h3>בשעות הראשונות אחרי</h3><ul><li>תנו מרחב - לכם ולהם. גם 30 דקות של שתיקה זה בסדר.</li><li>אל תנתחו מי \"צודק\" עכשיו - זה רק יבעיר מחדש.</li><li>אם אתם מרגישים שאתם רותחים - צאו להליכה, שתו מים, נשמו.</li></ul><h3>כשמוכנים לדבר שוב</h3><ul><li>פתחו עם מה שאתם מרגישים, לא עם מה שהוא/היא עשה/תה - \"הרגשתי מבולבל/ת ופגוע/ה.\"</li><li>הקשיבו לפני שאתם מסבירים - אפילו אם זה לא מרגיש הוגן.</li><li>שאלו: \"מה היה הטריגר באמת? מה זה הזכיר לך?\" - לפעמים הוויכוח הוא רק הקצה החיצוני של משהו עמוק יותר.</li><li>אמרו את הדבר הכי חשוב במפורש: \"אני אוהב/ת אותך. אני לא הולך/ת לשום מקום.\"</li></ul><p>לא חייבים לפתור הכל בשיחה אחת. לפעמים תיקון הוא כמה שיחות קטנות לאורך כמה ימים, ולא דרמה אחת גדולה.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 5
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g30",
    "title": "ماذا أفعل بعد شجار صعب - كيف نعود لبعضنا؟",
    "content": "<p>بعد شجار مع شخص يعيش مع اضطراب ما بعد الصدمة - كلاكما مجروح، حتى لو بدأ من أمر \"صغير\". هذا لا يعني أن العلاقة منهارة. يعني أن الترميم يحتاج لطفاً.</p><h3>في الساعات الأولى بعد الشجار</h3><ul><li>أعطِ مساحة - لكَ وله. حتى 30 دقيقة صمت لا بأس بها.</li><li>لا تحلّل من \"المحقّ\" الآن - سيُشعل النار مجدّداً.</li><li>إن شعرت أنك تغلي - اخرج للمشي، اشرب ماءً، تنفّس.</li></ul><h3>حين تستعدّان للحديث ثانيةً</h3><ul><li>افتح بما تشعر به، لا بما فعله - \"شعرت بالارتباك والجرح.\"</li><li>أصغِ قبل أن تشرح - حتى لو لم يبدُ عادلاً.</li><li>اسأل: \"ما كان المُحفّز حقاً؟ بماذا ذكّرك ذلك؟\" - أحياناً الشجار قمّة جبل جليد.</li><li>قل الأهم صراحةً: \"أحبك. لن أذهب لأي مكان.\"</li></ul><p>لستما مضطرَّين لحلّ كل شيء في محادثة واحدة. أحياناً الترميم محادثات صغيرة على مدى أيام، لا دراما واحدة كبيرة.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 5
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g30",
    "title": "What to do after a hard fight - how do you find your way back to each other?",
    "content": "<p>After a fight with someone living with PTSD, both of you are hurt - even if the fight started over something \"small.\" It doesn't mean the relationship is broken. It means repair has to be gentle.</p><h3>In the first hours after</h3><ul><li>Give space - to both of you. Even 30 minutes of silence is fine.</li><li>Don't analyze who was \"right\" now - it will reignite the fire.</li><li>If you're boiling - go for a walk, drink water, breathe.</li></ul><h3>When you're ready to talk again</h3><ul><li>Open with what you feel, not what they did - \"I felt confused and hurt.\"</li><li>Listen before you explain - even if it doesn't feel fair.</li><li>Ask: \"What was the real trigger? What did it remind you of?\" - sometimes the fight is just the visible tip of something deeper.</li><li>Say the most important thing out loud: \"I love you. I'm not going anywhere.\"</li></ul><p>You don't have to fix everything in one conversation. Sometimes repair is several small conversations over a few days, not one big drama.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 5
  },
  {
    "type": "faq",
    "langId": "he",
    "groupKey": "g31",
    "title": "מדריך למניעת שחיקה - איך שומרים על עצמכם לטווח הארוך",
    "content": "<p>אי אפשר למזוג ממיכל ריק. אם אתם לא תשמרו על עצמכם - לא תוכלו לתמוך באף אחד אחר. זה לא אנוכיות. זה תנאי בסיסי.</p><h3>הבסיס היומיומי</h3><ul><li><strong>גבולות ברורים:</strong> גם אהבה גדולה צריכה גבולות. \"אני לא יכול/ה לדבר על זה עכשיו, נחזור לזה מחר\" - זה לגיטימי.</li><li><strong>זמן שהוא רק שלכם:</strong> חברים, ספורט, תחביב, שקט. גם 20 דקות ביום עושות הבדל.</li><li><strong>שינה ואוכל:</strong> בסיסי, אבל ראשון להישחק. שמרו על השגרה.</li></ul><h3>תמיכה רחבה יותר</h3><ul><li><strong>מטפל/ת משלכם</strong> - לא של בן/בת הזוג. מקום שבו אתם המטופלים.</li><li><strong>קבוצת תמיכה לבני משפחה</strong> - לדבר עם אנשים שמכירים את זה מבפנים.</li><li><strong>אדם קרוב אחד</strong> שיודע מה קורה ויכול להחזיק אתכם.</li></ul><h3>סימני אזהרה לשחיקה</h3><ul><li>עצבנות יתר על קטנות.</li><li>ניתוק רגשי - אדישות גם כשמשהו חשוב קורה.</li><li>תשישות שלא עוברת עם מנוחה.</li><li>פנטזיות על \"לברוח\" - לעבודה, לטיול, לחיים אחרים.</li></ul><p>לבקש עזרה זה לא כישלון. זה אומר שאתם רציניים לגבי הקשר ולגבי עצמכם.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 6
  },
  {
    "type": "faq",
    "langId": "ar",
    "groupKey": "g31",
    "title": "دليل لمنع الإرهاق - كيف تحافظ على نفسك على المدى البعيد",
    "content": "<p>لا يمكنك أن تسكب من إناء فارغ. إن لم تعتنِ بنفسك - لن تستطيع دعم أحد. ليست أنانية. هو شرط أساسي.</p><h3>الأساس اليومي</h3><ul><li><strong>حدود واضحة:</strong> حتى الحب الكبير يحتاج حدوداً. \"لا أستطيع التحدّث عن هذا الآن، نعود إليه غداً\" - مشروع.</li><li><strong>وقت خاص بك فقط:</strong> أصدقاء، رياضة، هواية، صمت. حتى 20 دقيقة يومياً تُحدث فرقاً.</li><li><strong>نوم وأكل:</strong> أساسي، لكنه أول ما يُهمَل عند الإرهاق. حافظ على الروتين.</li></ul><h3>دعم أوسع</h3><ul><li><strong>معالج خاص بك</strong> - لا بشريكك. مكان تكون فيه أنت المعالَج.</li><li><strong>مجموعة دعم لأفراد العائلة</strong> - للتحدّث مع من يعرف هذا من الداخل.</li><li><strong>شخص قريب واحد</strong> يعرف ما يحدث ويستطيع احتواءك.</li></ul><h3>علامات تحذير من الإرهاق</h3><ul><li>تهيّج مفرط على أمور صغيرة.</li><li>انفصال عاطفي - لامبالاة حتى عند حدث مهم.</li><li>إرهاق لا يزول مع الراحة.</li><li>أحلام يقظة عن \"الهروب\" - للعمل، لرحلة، لحياة أخرى.</li></ul><p>طلب المساعدة ليس فشلاً. يعني أنك جادّ بشأن العلاقة وبشأن نفسك.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 6
  },
  {
    "type": "faq",
    "langId": "en",
    "groupKey": "g31",
    "title": "Burnout prevention - how to take care of yourself for the long run",
    "content": "<p>You cannot pour from an empty vessel. If you don't take care of yourself - you won't be able to support anyone. This isn't selfishness. It's a basic requirement.</p><h3>The daily basics</h3><ul><li><strong>Clear boundaries:</strong> Even great love needs limits. \"I can't talk about this right now - let's come back to it tomorrow\" is legitimate.</li><li><strong>Time that's just yours:</strong> friends, exercise, a hobby, silence. Even 20 minutes a day makes a difference.</li><li><strong>Sleep and food:</strong> basic, but the first thing to slip when burning out. Protect the routine.</li></ul><h3>Broader support</h3><ul><li><strong>Your own therapist</strong> - not your partner's. A place where you're the patient.</li><li><strong>A family support group</strong> - to talk with people who know this from the inside.</li><li><strong>One close person</strong> who knows what's going on and can hold you.</li></ul><h3>Warning signs of burnout</h3><ul><li>Excessive irritability at small things.</li><li>Emotional disconnection - feeling flat even when something important happens.</li><li>Exhaustion that doesn't lift with rest.</li><li>Fantasies of \"escaping\" - to work, to a trip, to a different life.</li></ul><p>Asking for help isn't failure. It means you're serious about the relationship and about yourself.</p>",
    "categorySlugs": [
      "second-circle"
    ],
    "sortOrder": 6
  }
];
