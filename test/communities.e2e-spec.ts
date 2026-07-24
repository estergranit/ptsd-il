/* eslint-disable @typescript-eslint/no-floating-promises */

import assert from 'node:assert/strict';
import { after, suite, test } from 'node:test';

import { USERS } from './utilities/configuration.ts';
import { randomString, validateUnauthenticated } from './utilities/functions.ts';
import { HttpClient } from './utilities/http-client.ts';

/******************************************************************************************************/

const PATH = '/communities';
const ADMIN_PATH = '/admin/communities';
const UNKNOWN_ID = '00000000-0000-0000-0000-000000000000';

// Snapshot of the real production data from ../PTSD.IL/src/data/static/communities.js
// (STATIC_COMMUNITIES), field-mapped to the backend Community schema:
//   description_he -> description, meeting_type -> meetingType, contact_url -> contactUrl.
// NOTE (gap): the frontend `id` (slug) and `target_audience[]` have no place in the
// backend CreateCommunity schema and are intentionally dropped. `location` is a free
// string here but a fixed enum on the frontend.
const STATIC_COMMUNITIES = [
  {
    name: 'נט"ל - קבוצות תמיכה',
    description:
      'קבוצות תמיכה וטיפוליות לנפגעי טראומה ופוסט-טראומה על רקע מלחמה וטרור ולבני משפחותיהם.',
    location: 'center',
    meetingType: 'frontal',
    organization: 'עמותת נט"ל',
    contactUrl:
      'https://www.natal.org.il/תמיכה-וטיפול-נפשי/קבוצות-טיפוליות-וקבוצות-תמיכה/',
  },
  {
    name: 'איגוד מרכזי הסיוע לנפגעות ולנפגעי תקיפה מינית',
    description:
      'קווי סיוע ארציים (1202 לנשים, 1203 לגברים) וצ\'אט "קולמילה", וכן רשת ארצית של מרכזי סיוע אזוריים לנפגעות ולנפגעי תקיפה מינית ומשפחותיהם.',
    location: 'online',
    meetingType: 'hybrid',
    organization: 'איגוד מרכזי הסיוע לנפגעות ולנפגעי תקיפה מינית',
    contactUrl: 'https://www.1202.org.il/',
  },
  {
    name: 'נט"ל - קבוצות לבנות ובני זוג של מתמודדים ומתמודדות',
    description:
      'קבוצת תמיכה ייחודית לבני ובנות זוג של נפגעי פוסט-טראומה, ללימוד והתחזקות בהתמודדות המשותפת.',
    location: 'center',
    meetingType: 'frontal',
    organization: 'עמותת נט"ל',
    contactUrl:
      'https://www.natal.org.il/תמיכה-וטיפול-נפשי/קבוצות-טיפוליות-וקבוצות-תמיכה/קבוצות-לבנות-ובני-זוג-של-מתמודדים-ומתמודדות/partners-support-group/',
  },
  {
    name: 'מרכז חוסן - ירושלים (עמך)',
    description:
      'מרכז טיפול ותמיכה נפשית לנפגעי פעולות איבה, טראומה וחרדה ומשפחותיהם - טיפול פרטני, קבוצתי ומשפחתי, בטלפון, בזום או פנים אל פנים.',
    location: 'jerusalem',
    meetingType: 'hybrid',
    organization: 'עמותת עמך',
    contactUrl: 'https://www.amcha.org/',
  },
  {
    name: 'המעגל - לא לבד - קהילה תומכת למשפחות נפגעי פוסט-טראומה',
    description:
      'קהילה תומכת וקבוצות תמיכה למשפחות ולבני/בנות זוג של מתמודדים עם פוסט-טראומה על רקע ביטחוני, ללימוד, חיזוק וליווי בהתמודדות המשפחתית.',
    location: 'center',
    meetingType: 'frontal',
    organization: 'לא לבד',
    contactUrl: 'https://www.hamaagal.co.il/',
  },
  {
    name: 'קבוצות תמיכה לנכי צה"ל המתמודדים עם פוסט-טראומה',
    description:
      'עשרות קבוצות טיפוליות הפתוחות להרשמה ברחבי הארץ לנכי ולנכות צה"ל המתמודדים עם פוסט-טראומה - מרחב לשיתוף, התחברות והתחזקות. ניתן לסנן קבוצות לפי אזור ונושא.',
    location: 'center',
    meetingType: 'frontal',
    organization: 'אגף השיקום, משרד הביטחון',
    contactUrl: 'https://shikum.mod.gov.il/groups',
  },
  {
    name: "הורים לפצועי 'חרבות ברזל'",
    description:
      'קבוצת תמיכה להורים לחיילות ולחיילים שנפצעו במלחמת חרבות ברזל - מרחב לשיתוף, התחברות והתחזקות.',
    location: 'center',
    meetingType: 'frontal',
    organization: 'אגף השיקום, משרד הביטחון',
    contactUrl: 'https://shikum.mod.gov.il/groups/4548',
  },
] as const;

type CommunityOverrides = Record<string, unknown>;

function generateCommunity(overrides: CommunityOverrides = {}) {
  return {
    name: `E2E ${randomString(8)}`,
    description: 'Created in e2e test',
    isActive: true,
    langId: 'he',
    ...overrides,
  };
}

async function createCommunity(
  httpClient: HttpClient,
  token: string,
  createdIds: string[],
  overrides: CommunityOverrides = {},
) {
  const body = generateCommunity(overrides);

  const response = await httpClient.post({
    path: ADMIN_PATH,
    token,
    expectedStatusCode: 201,
    options: { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } },
  });

  const created = (await response!.json()) as { id: string; name: string };
  createdIds.push(created.id);

  return { body, created };
}

/******************************************************************************************************/

suite('Communities integration tests', () => {
  const { admin, moderator } = USERS;
  const httpClient = new HttpClient();
  const createdIds: string[] = [];

  after(async () => {
    await Promise.all(
      createdIds.map((id) => {
        return httpClient.delete({
          path: `${ADMIN_PATH}/${id}`,
          token: admin.token,
          expectedStatusCode: 200,
          dropBody: true,
        });
      }),
    );
  });

  suite('Read', () => {
    test('Valid - list returns array', async () => {
      const response = await httpClient.get({ path: PATH, token: 'none', expectedStatusCode: 200 });
      const body = (await response!.json()) as unknown;

      assert.ok(Array.isArray(body));
    });

    test('Valid - detail by id', async () => {
      const { created } = await createCommunity(httpClient, moderator.token, createdIds);

      const response = await httpClient.get({
        path: `${PATH}/${created.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { id: string };

      assert.strictEqual(body.id, created.id);
    });

    test('Invalid - unknown id returns 404', async () => {
      await httpClient.get({
        path: `${PATH}/${UNKNOWN_ID}`,
        token: 'none',
        expectedStatusCode: 404,
        dropBody: true,
      });
    });
  });

  suite('Create', () => {
    test('Valid - moderator creates', async () => {
      const { body, created } = await createCommunity(httpClient, moderator.token, createdIds);

      assert.strictEqual(created.name, body.name);
    });

    test('Invalid - missing authorization token', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: 'none',
        expectedStatusCode: 401,
        options: {
          body: JSON.stringify({ name: 'Test Community' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Invalid - unauthenticated', async () => {
      await validateUnauthenticated({
        httpClient,
        path: ADMIN_PATH,
        method: 'post',
        body: { name: 'Test Community' },
      });
    });

    test('Invalid - bad contactUrl', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ name: 'Test', contactUrl: 'not-a-url' }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });
  });

  suite('Update', () => {
    test('Valid - moderator updates', async () => {
      const { created } = await createCommunity(httpClient, moderator.token, createdIds);

      const response = await httpClient.put({
        path: `${ADMIN_PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 200,
        options: {
          body: JSON.stringify({ name: 'E2E Test Community Updated' }),
          headers: { 'content-type': 'application/json' },
        },
      });
      const body = (await response!.json()) as { name: string };

      assert.strictEqual(body.name, 'E2E Test Community Updated');
    });
  });

  suite('Delete', () => {
    test('Invalid - moderator cannot delete', async () => {
      const { created } = await createCommunity(httpClient, moderator.token, createdIds);

      await httpClient.delete({
        path: `${ADMIN_PATH}/${created.id}`,
        token: moderator.token,
        expectedStatusCode: 403,
        dropBody: true,
      });
    });
  });

  suite('Static data (PTSD.IL)', () => {
    for (const community of STATIC_COMMUNITIES) {
      test(`Valid - accepts real community '${community.name}'`, async () => {
        const response = await httpClient.post({
          path: ADMIN_PATH,
          token: admin.token,
          expectedStatusCode: 201,
          options: {
            body: JSON.stringify({ ...community, langId: 'he' }),
            headers: { 'content-type': 'application/json' },
          },
        });

        const created = (await response!.json()) as { id: string; name: string };
        createdIds.push(created.id);

        assert.strictEqual(created.name, community.name);
      });
    }
  });

  suite('Multi-language', () => {
    test('Valid - create persists langId and auto-generates groupId', async () => {
      const { created } = await createCommunity(httpClient, admin.token, createdIds);

      const response = await httpClient.get({
        path: `${PATH}/${created.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { langId: string; groupId: string | null };

      assert.strictEqual(body.langId, 'he');
      assert.ok(body.groupId);
    });

    test('Invalid - missing langId returns 422', async () => {
      await httpClient.post({
        path: ADMIN_PATH,
        token: admin.token,
        expectedStatusCode: 422,
        options: {
          body: JSON.stringify({ name: `E2E ${randomString(8)}` }),
          headers: { 'content-type': 'application/json' },
        },
        dropBody: true,
      });
    });

    test('Valid - create with explicit langId', async () => {
      const { created } = await createCommunity(httpClient, admin.token, createdIds, {
        langId: 'ar',
      });

      const response = await httpClient.get({
        path: `${PATH}/${created.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { langId: string };

      assert.strictEqual(body.langId, 'ar');
    });

    test('Valid - list filtered by langId', async () => {
      await createCommunity(httpClient, admin.token, createdIds, { langId: 'en' });

      const response = await httpClient.get({
        path: `${PATH}?langId=en`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { langId: string }[];

      assert.ok(Array.isArray(body));
      assert.ok(body.every((c) => {return c.langId === 'en'}));
    });

    test('Valid - admin group route returns translation set', async () => {
      // create he row, capture its groupId, then create ar sibling sharing it
      const { created: he } = await createCommunity(httpClient, admin.token, createdIds);

      const heDetail = await httpClient.get({
        path: `${PATH}/${he.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const { groupId } = (await heDetail!.json()) as { groupId: string };

      await createCommunity(httpClient, admin.token, createdIds, { langId: 'ar', groupId });

      const response = await httpClient.get({
        path: `${ADMIN_PATH}/group/${groupId}`,
        token: admin.token,
        expectedStatusCode: 200,
      });
      const body = (await response!.json()) as { groupId: string; langId: string }[];

      assert.strictEqual(body.length, 2);
      assert.ok(body.every((c) => {return c.groupId === groupId}));
    });

    test('Invalid - group route requires auth', async () => {
      await httpClient.get({
        path: `${ADMIN_PATH}/group/${UNKNOWN_ID}`,
        token: 'none',
        expectedStatusCode: 401,
        dropBody: true,
      });
    });
  });

  suite('Filter by audience', () => {
    test('Valid - list filtered by audienceId and audienceSlug', async () => {
      const audRes = await httpClient.get({
        path: '/audiences',
        token: 'none',
        expectedStatusCode: 200,
      });
      const audiences = (await audRes!.json()) as { id: string; slug: string }[];
      const [audience] = audiences;
      assert.ok(audience, 'seed must provide at least one audience');

      const { created } = await createCommunity(httpClient, admin.token, createdIds, {
        audienceIds: [audience.id],
      });

      const byId = await httpClient.get({
        path: `${PATH}?audienceId=${audience.id}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const byIdBody = (await byId!.json()) as { id: string }[];
      assert.ok(byIdBody.some((c) => {return c.id === created.id}));

      const bySlug = await httpClient.get({
        path: `${PATH}?audienceSlug=${audience.slug}`,
        token: 'none',
        expectedStatusCode: 200,
      });
      const bySlugBody = (await bySlug!.json()) as { id: string }[];
      assert.ok(bySlugBody.some((c) => {return c.id === created.id}));
    });

    test('Invalid - malformed audienceSlug returns 422', async () => {
      await httpClient.get({
        path: `${PATH}?audienceSlug=Bad_Slug`,
        token: 'none',
        expectedStatusCode: 422,
        dropBody: true,
      });
    });
  });
});
