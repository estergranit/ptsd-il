/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { after, before, suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { randomString } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/
//
// Loads real static content from ../PTSD.IL/src/data/static/* as backend Articles.
// The Article entity is a generic bilingual content block (header + content html +
// langId + category/audience/ageGroup tags + sortOrder + groupId), so most of the
// frontend content datasets map onto it. This suite proves the real data is accepted.
//
// Mapping used (per dataset):
//   self_help_tools   -> header=title_he,  content=content_he,                 category=self-help
//   treatment_steps   -> header=title_he,  content=description+how_to_start,    category=treatment, sortOrder=step_number
//   children          -> header=age label, content=guidelines,                 category=children,  ageGroupIds=[range]
//   rights_faqs       -> header=q,          content=a(+steps),                  category=rights,    audienceIds=[key]
//   ptsd_info_faqs    -> header=q,          content=a,                          category=ptsd-info
//   second_circle     -> header=q,          content=intro,                      category=second-circle
//   sources           -> header=title,      content=description+authors+year+url, category=sources
//
// GAPS (reported, not covered here):
//   - questionnaire: PCL-5 scoring/scale/question arrays - not prose, no Article fit.
//   - communities: covered in communities.e2e-spec.ts as its own entity.
//   - lossy fields flattened into `content` html: rights links[]/steps, sources url/year/authors,
//     treatment links[]/methods, children resources[], second_circle sections structure.
//
/******************************************************************************************************/

const PATH = '/articles';
const ADMIN_PATH = '/admin/articles';

const ADMIN_LANGUAGES = '/admin/languages';
const ADMIN_CATEGORIES = '/admin/categories';
const ADMIN_AUDIENCES = '/admin/audiences';
const ADMIN_AGE_GROUPS = '/admin/age-groups';

/******************************************************************************************************/

suite('Articles static-data (PTSD.IL)', () => {
  const { admin } = USERS;
  const httpClient = new HttpClient();

  const createdArticleIds: string[] = [];
  const createdCategoryIds: string[] = [];
  const createdAudienceIds: string[] = [];
  const createdAgeGroupIds: string[] = [];
  const createdLanguageIds: string[] = [];

  // Resolved in before() - the uuid/id references real Articles need.
  const ref = {
    langHe: '',
    catSelfHelp: '',
    catTreatment: '',
    catChildren: '',
    catRights: '',
    catPtsdInfo: '',
    catSecondCircle: '',
    catSources: '',
    audSecurityForces: '',
    ageGroup04: '',
    ageGroup46: '',
  };

  async function seedLanguage(name: string): Promise<string> {
    const id = randomString(5);
    const response = await httpClient.post({
      path: ADMIN_LANGUAGES,
      token: admin.token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify({ id, name, direction: 'rtl', isActive: true }),
        headers: { 'content-type': 'application/json' },
      },
    });
    const created = (await response!.json()) as { id: string };
    createdLanguageIds.push(created.id);
    return created.id;
  }

  async function seedCategory(name: string): Promise<string> {
    const response = await httpClient.post({
      path: ADMIN_CATEGORIES,
      token: admin.token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify({ slug: randomString(10), name }),
        headers: { 'content-type': 'application/json' },
      },
    });
    const created = (await response!.json()) as { id: string };
    createdCategoryIds.push(created.id);
    return created.id;
  }

  async function seedAudience(name: string): Promise<string> {
    const response = await httpClient.post({
      path: ADMIN_AUDIENCES,
      token: admin.token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify({ slug: randomString(10), name }),
        headers: { 'content-type': 'application/json' },
      },
    });
    const created = (await response!.json()) as { id: string };
    createdAudienceIds.push(created.id);
    return created.id;
  }

  async function seedAgeGroup(name: string, min: number, max: number): Promise<string> {
    const response = await httpClient.post({
      path: ADMIN_AGE_GROUPS,
      token: admin.token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify({ slug: randomString(10), name, min, max }),
        headers: { 'content-type': 'application/json' },
      },
    });
    const created = (await response!.json()) as { id: string };
    createdAgeGroupIds.push(created.id);
    return created.id;
  }

  async function createArticle(body: Record<string, unknown>) {
    const response = await httpClient.post({
      path: ADMIN_PATH,
      token: admin.token,
      expectedStatusCode: 201,
      options: {
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
      },
    });
    const created = (await response!.json()) as { id: string; title: string };
    createdArticleIds.push(created.id);
    return created;
  }

  before(async () => {
    ref.langHe = await seedLanguage('עברית');

    ref.catSelfHelp = await seedCategory('כלים לעזרה עצמית');
    ref.catTreatment = await seedCategory('מסלול טיפול');
    ref.catChildren = await seedCategory('תוכן לילדים');
    ref.catRights = await seedCategory('זכויות');
    ref.catPtsdInfo = await seedCategory('מידע על פוסט-טראומה');
    ref.catSecondCircle = await seedCategory('המעגל השני');
    ref.catSources = await seedCategory('מקורות');

    ref.audSecurityForces = await seedAudience('כוחות הביטחון');

    ref.ageGroup04 = await seedAgeGroup('0-4', 0, 4);
    ref.ageGroup46 = await seedAgeGroup('4-6', 4, 6);
  });

  after(async () => {
    // Order matters: articles first (their m2m join rows + langId FK reference the rest).
    const deleteAll = (path: string, ids: string[]) => {
      return Promise.all(
        ids.map((id) => {
          return httpClient.delete({
            path: `${path}/${id}`,
            token: admin.token,
            expectedStatusCode: 200,
            dropBody: true,
          });
        }),
      );
    };

    await deleteAll(ADMIN_PATH, createdArticleIds);
    await Promise.all([
      deleteAll(ADMIN_AGE_GROUPS, createdAgeGroupIds),
      deleteAll(ADMIN_AUDIENCES, createdAudienceIds),
      deleteAll(ADMIN_CATEGORIES, createdCategoryIds),
    ]);
    await deleteAll(ADMIN_LANGUAGES, createdLanguageIds);
  });

  /****************************************************************************************************/

  suite('self_help_tools', () => {
    let sleepToolId = '';

    test("accepts 'ניהול שינה וסדר יום' (type=tool)", async () => {
      const created = await createArticle({
        type: 'tool',
        langId: ref.langHe,
        title: 'ניהול שינה וסדר יום',
        content:
          '<ul><li><strong>חשיפה לאור שמש בבוקר</strong> - 10 דקות בחוץ אחרי הקימה מסנכרנת את השעון הביולוגי</li><li><strong>ללא מסכים שעה לפני שינה</strong> - האור הכחול פוגע בייצור מלטונין</li><li><strong>שעת שינה קבועה</strong> - גם בסוף שבוע</li></ul>',
        categoryIds: [ref.catSelfHelp],
        sortOrder: 0,
      });
      assert.strictEqual(created.title, 'ניהול שינה וסדר יום');
      sleepToolId = created.id;
    });

    test("accepts 'כתיבה פורקת' (type=tool)", async () => {
      await createArticle({
        type: 'tool',
        langId: ref.langHe,
        title: 'כתיבה פורקת',
        content:
          '<p>מחקרים מראים שכתיבה על חוויות מלחיצות מפחיתה את עוצמתן הרגשית ומסייעת לעיבוד הטראומה.</p><p><strong>איך מתחילים:</strong> 15-20 דקות, 3-4 פעמים בשבוע.</p>',
        categoryIds: [ref.catSelfHelp],
        sortOrder: 1,
      });
    });

    test('accepts an app as a child of a tool (type=app, url + parentId)', async () => {
      await createArticle({
        type: 'app',
        langId: ref.langHe,
        title: 'Breathe2Relax',
        description:
          'אפליקציה לתרגילי נשימה סרעפתית, פותחה על ידי גורמי בריאות של משרד ההגנה האמריקאי. חינמית.',
        url: 'https://apps.apple.com/us/app/breathe2relax/id425720246',
        parentId: sleepToolId,
        categoryIds: [ref.catSelfHelp],
      });
    });
  });

  suite('treatment_steps', () => {
    test("accepts step 1 'התחלה עצמאית' (type=treatment_step)", async () => {
      await createArticle({
        type: 'treatment_step',
        langId: ref.langHe,
        title: 'התחלה עצמאית',
        content:
          '<p>הצעד הראשון והנגיש ביותר. כלים שאפשר להתחיל מיד, ללא צורך בתור או תשלום.</p><p>כנס/י לדף "כלים לעזרה עצמית" ובחר/י את הכלי הנוח לך.</p>',
        categoryIds: [ref.catTreatment],
        sortOrder: 1,
        links: [{ label: 'לכלים לעזרה עצמית', url: 'https://ptsd.il/self-help' }],
      });
    });

    test("accepts step 2 'פנייה לקופ\"ח / מרכזי חוסן' (links[])", async () => {
      await createArticle({
        type: 'treatment_step',
        langId: ref.langHe,
        title: 'פנייה לקופ"ח / מרכזי חוסן',
        content:
          '<p>הקופות מספקות שירות פסיכולוגי ופסיכיאטרי. מרכזי החוסן מציעים שירות ייחודי לנפגעי פעולות איבה.</p><ol><li>פנה/י לרופא/ה הראשוני/ת בקופ"ח שלך וביקש/י הפנייה לפסיכולוג/ית</li></ol>',
        categoryIds: [ref.catTreatment],
        sortOrder: 2,
        links: [
          {
            label: 'רשימת מרכזי החוסן - gov.il',
            url: 'https://www.gov.il/he/Departments/DynamicCollectors/resilience-centers-list?skip=0',
          },
        ],
      });
    });
  });

  suite('children', () => {
    let guideline04Id = '';

    test("accepts age range '0-4' guideline", async () => {
      const created = await createArticle({
        langId: ref.langHe,
        title: '0-4',
        content:
          '<p><strong>בגיל הזה, ילדים חשים את הרגשות של ההורה אבל לא מבינים מה קורה.</strong> הם זקוקים לתחושת ביטחון פיזי.</p><ul><li>שמרו על שגרה קבועה ככל האפשר</li></ul>',
        categoryIds: [ref.catChildren],
        ageGroupIds: [ref.ageGroup04],
      });
      guideline04Id = created.id;
    });

    test("accepts age range '4-6' guideline", async () => {
      await createArticle({
        langId: ref.langHe,
        title: '4-6',
        content:
          '<p><strong>בגיל זה ילדים מתחילים לשאול שאלות ישירות.</strong> הם מבינים יותר מפני שחשבתם.</p><ul><li>ענו בכנות בצורה מותאמת גיל</li></ul>',
        categoryIds: [ref.catChildren],
        ageGroupIds: [ref.ageGroup46],
      });
    });

    // Real children books are offline recommendations: content, no url. Exercises parentId
    // and the url-exempt path of the per-type refine.
    test('accepts a book resource as a child of the 0-4 guideline (type=book, parentId, no url)', async () => {
      await createArticle({
        type: 'book',
        langId: ref.langHe,
        title: 'כשאבא עצוב',
        description: 'ספר ציורים קצר על רגשות גדולים של מבוגרים, ממבט של ילד',
        content:
          '<p>סיפור פשוט וקצר על ילדה שמזהה שאבא שלה עצוב. המסר המרכזי - הרגשות של אבא הן לא באשמתי, ואני עדיין נאהבת.</p>',
        parentId: guideline04Id,
        categoryIds: [ref.catChildren],
        ageGroupIds: [ref.ageGroup04],
      });
    });
  });

  suite('rights_faqs', () => {
    test("accepts 'מה מגיע לחייל שנפגע נפשית בשירות?' (type=faq, links[])", async () => {
      await createArticle({
        type: 'faq',
        langId: ref.langHe,
        title: 'מה מגיע לחייל שנפגע נפשית בשירות?',
        content:
          '<p>חיילים וכוחות ביטחון שנפגעו נפשית עקב השירות זכאים לסיוע מאגף השיקום במשרד הביטחון.</p><ul><li><strong>קצבת נכות חודשית</strong></li><li><strong>טיפול רפואי ופסיכולוגי</strong> - ללא תשלום</li></ul>',
        categoryIds: [ref.catRights],
        audienceIds: [ref.audSecurityForces],
        links: [
          {
            label: 'זכויות למתמודדים עם פגיעה נפשית - אגף השיקום',
            url: 'https://shikum.mod.gov.il/rights/injury-type/mental',
          },
        ],
      });
    });

    test("accepts 'איך מתנהל תהליך ההכרה בנכות?' (type=faq)", async () => {
      await createArticle({
        type: 'faq',
        langId: ref.langHe,
        title: 'איך מתנהל תהליך ההכרה בנכות ממשרד הביטחון?',
        content:
          '<p>תהליך ההכרה מתחיל בהגשת "בקשה להכרה בנכות" (טופס דיגיטלי) לאגף השיקום.</p><ol><li>קצין/ת תגמולים בוחן/ת את הבקשה</li><li>הוועדה הרפואית קובעת את אחוזי הנכות</li></ol>',
        categoryIds: [ref.catRights],
        audienceIds: [ref.audSecurityForces],
        links: [
          {
            label: 'הכרה בנכות וועדות רפואיות - אגף השיקום',
            url: 'https://shikum.mod.gov.il/recognition',
          },
        ],
      });
    });
  });

  suite('ptsd_info_faqs', () => {
    test("accepts 'מהו אירוע טראומטי?' (type=faq)", async () => {
      await createArticle({
        type: 'faq',
        langId: ref.langHe,
        title: 'מהו אירוע טראומטי?',
        content:
          '<p>אירוע טראומטי הוא אירוע מסכן חיים או אירוע המאיים באופן קיצוני על שלמות הגוף או הנפש.</p>',
        categoryIds: [ref.catPtsdInfo],
      });
    });

    test("accepts 'מהי פוסט טראומה?' (type=faq)", async () => {
      await createArticle({
        type: 'faq',
        langId: ref.langHe,
        title: 'מהי פוסט טראומה?',
        content:
          '<p>מצב שבו קיימת אי-התאוששות מהתגובה לאירוע הטראומטי - האיום הפסיק להתקיים אך האדם עדיין מגיב כאילו הוא קיים.</p>',
        categoryIds: [ref.catPtsdInfo],
      });
    });
  });

  suite('second_circle_tools', () => {
    test("accepts 'מה לעשות בזמן התקף או פלאשבק?' (type=faq)", async () => {
      await createArticle({
        type: 'faq',
        langId: ref.langHe,
        title: 'מה לעשות בזמן התקף או פלאשבק?',
        content:
          '<p>קודם כל - נשמו עמוק. לראות מישהו/י קרוב/ה במצב כזה זה מטלטל גם אתכם, וזה לגמרי בסדר.</p>',
        categoryIds: [ref.catSecondCircle],
      });
    });

    test("accepts 'איך לתקשר ביומיום?' (type=faq)", async () => {
      await createArticle({
        type: 'faq',
        langId: ref.langHe,
        title: 'איך לתקשר ביומיום כשהכל מרגיש על קצה הסכין?',
        content:
          '<p>תקשורת עם אדם שחי עם פוסט-טראומה היא לפעמים כמו ללכת בשדה מוקשים שאתם לא רואים. זה מתיש, וזה גם ניתן ללמידה.</p>',
        categoryIds: [ref.catSecondCircle],
      });
    });
  });

  suite('sources', () => {
    test("accepts 'DSM-5' (type=source, url + authors + year)", async () => {
      await createArticle({
        type: 'source',
        langId: ref.langHe,
        title: 'DSM-5 - Diagnostic and Statistical Manual of Mental Disorders',
        description: 'המדריך האבחוני הסטנדרטי לפסיכיאטריה, כולל הגדרות ואבחנות PTSD',
        url: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        authors: 'American Psychiatric Association',
        year: '2013',
        categoryIds: [ref.catSources],
      });
    });

    test("accepts 'PCL-5' (type=source)", async () => {
      await createArticle({
        type: 'source',
        langId: ref.langHe,
        title: 'PCL-5 - PTSD Checklist for DSM-5',
        description: 'השאלון המשמש לסקירת תסמיני PTSD - פותח על ידי מכון ה-PTSD הלאומי של ה-VA',
        url: 'https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp',
        authors: 'Weathers, F.W., et al.',
        year: '2013',
        categoryIds: [ref.catSources],
      });
    });
  });

  /****************************************************************************************************/

  suite('Read back', () => {
    test('published list is a non-empty array', async () => {
      const response = await httpClient.get({ path: PATH, token: 'none', expectedStatusCode: 200 });
      const body = (await response!.json()) as unknown[];

      assert.ok(Array.isArray(body));
      assert.ok(body.length >= createdArticleIds.length);
    });

    test('filter by category returns only that category (self_help_tools)', async () => {
      const response = await httpClient.get({
        path: `${PATH}?categoryId=${ref.catSelfHelp}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { categories: { id: string }[] }[];

      assert.ok(Array.isArray(body));
      assert.ok(body.length >= 2);
      for (const article of body) {
        assert.ok(article.categories.some((category) => { return category.id === ref.catSelfHelp }));
      }
    });

    test('filter by type returns only that type (type=source)', async () => {
      const response = await httpClient.get({
        path: `${PATH}?type=source`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { type: string; url: string | null }[];

      assert.ok(Array.isArray(body));
      assert.ok(body.length >= 2);
      for (const article of body) {
        assert.strictEqual(article.type, 'source');
      }
    });

    test('filter by parentId returns children (app under the sleep tool)', async () => {
      const parents = (await (
        await httpClient.get({ path: `${PATH}?type=tool`, token: 'none', expectedStatusCode: 200 })
      )!.json()) as { id: string; title: string }[];
      const sleepTool = parents.find((article) => { return article.title === 'ניהול שינה וסדר יום' });
      assert.ok(sleepTool);

      const response = await httpClient.get({
        path: `${PATH}?parentId=${sleepTool.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const children = (await response!.json()) as { parentId: string; type: string }[];

      assert.ok(children.length >= 1);
      for (const child of children) {
        assert.strictEqual(child.parentId, sleepTool.id);
      }
    });
  });

  suite('Per-type validation', () => {
    test('rejects type=source without url (422)', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ type: 'source', langId: ref.langHe, title: 'No URL source' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('rejects unknown type (422)', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ type: 'not-a-type', langId: ref.langHe, title: 'Bad type' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });
});
