import { DataSource, IsNull } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.ts';
import { User, UserRoles } from '../src/entities/users/user.entity.ts';
import { Language } from '../src/entities/langueges/language.entity.ts';
import { Category } from '../src/entities/categories/category.entity.ts';
import { Audience } from '../src/entities/audiences/audiences.entity.ts';
import { AgeGroup } from '../src/entities/age-groups/age-group.entity.ts';
import { Community } from '../src/entities/communities/community.entity.ts';
import { Article } from '../src/entities/articles/articles.entity.ts';
import {
  SEED_AGE_GROUPS,
  SEED_ARTICLES,
  SEED_AUDIENCES,
  SEED_CATEGORIES,
  SEED_COMMUNITIES,
  SEED_LANGUAGES,
  type SeedArticle,
} from './seed-data.ts';

/******************************************************************************************************/

const USERS = [
  {
    firstName: process.env.SEED_ADMIN_FIRST_NAME ?? 'Site',
    lastName: process.env.SEED_ADMIN_LAST_NAME ?? 'Admin',
    email: process.env.SEED_ADMIN_EMAIL ?? 'admin@ptsd-il.local',
    roles: [UserRoles.ADMIN],
  },
  {
    firstName: process.env.SEED_MODERATOR_FIRST_NAME ?? 'Site',
    lastName: process.env.SEED_MODERATOR_LAST_NAME ?? 'Moderator',
    email: process.env.SEED_MODERATOR_EMAIL ?? 'moderator@ptsd-il.local',
    roles: [UserRoles.MODERATOR],
  },
  {
    firstName: process.env.SEED_MASTERADMIN_FIRST_NAME ?? 'Site',
    lastName: process.env.SEED_MASTERADMIN_LAST_NAME ?? 'Masteradmin',
    email: process.env.SEED_MASTERADMIN_EMAIL ?? 'masteradmin@ptsd-il.local',
    roles: [UserRoles.MASTERADMIN],
  },
] as const;

/******************************************************************************************************/

async function seedUsers(dataSource: DataSource): Promise<void> {
  const usersRepo = dataSource.getRepository(User);

  for (const user of USERS) {
    const existing = await usersRepo.findOne({ where: { email: user.email } });
    if (existing) {
      console.log(`User '${user.email}' already exists, skipping.`);
      continue;
    }

    const created = await usersRepo.save(
      usersRepo.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: [...user.roles],
      }),
    );

    console.log(`Created user '${created.email}' (id: ${created.id}).`);
  }
}

async function seedLanguages(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Language);
  for (const lang of SEED_LANGUAGES) {
    const existing = await repo.findOne({ where: { id: lang.id } });
    if (existing) {
      continue;
    }
    await repo.save(repo.create({ ...lang, isActive: true }));
  }
  console.log(`Languages: ${SEED_LANGUAGES.length} ensured.`);
}

// Returns slug -> Category. Parents first (self-referential parentId).
async function seedCategories(dataSource: DataSource): Promise<Map<string, Category>> {
  const repo = dataSource.getRepository(Category);
  const bySlug = new Map<string, Category>();

  const ensure = async (slug: string, name: string, parentId: string | null): Promise<void> => {
    let category = await repo.findOne({ where: { slug } });
    if (!category) {
      category = await repo.save(repo.create({ slug, name, parentId }));
    }
    bySlug.set(slug, category);
  };

  for (const c of SEED_CATEGORIES.filter((c) => !c.parentSlug)) {
    await ensure(c.slug, c.name, null);
  }
  for (const c of SEED_CATEGORIES.filter((c) => c.parentSlug)) {
    const parent = bySlug.get(c.parentSlug!);
    await ensure(c.slug, c.name, parent?.id ?? null);
  }

  console.log(`Categories: ${bySlug.size} ensured.`);
  return bySlug;
}

// Returns seed key -> Audience (matched on slug, the natural key).
async function seedAudiences(dataSource: DataSource): Promise<Map<string, Audience>> {
  const repo = dataSource.getRepository(Audience);
  const byKey = new Map<string, Audience>();

  for (const a of SEED_AUDIENCES) {
    const slug = a.key.replaceAll('_', '-');
    let audience = await repo.findOne({ where: { slug } });
    if (!audience) {
      audience = await repo.save(repo.create({ slug, name: a.name }));
    }
    byKey.set(a.key, audience);
  }

  console.log(`Audiences: ${byKey.size} ensured.`);
  return byKey;
}

// Returns seed key (range string) -> AgeGroup.
async function seedAgeGroups(dataSource: DataSource): Promise<Map<string, AgeGroup>> {
  const repo = dataSource.getRepository(AgeGroup);
  const byKey = new Map<string, AgeGroup>();

  for (const a of SEED_AGE_GROUPS) {
    const slug = a.key.replaceAll('_', '-');
    let ageGroup = await repo.findOne({ where: { slug } });
    if (!ageGroup) {
      ageGroup = await repo.save(repo.create({ slug, name: a.name, min: a.min, max: a.max }));
    }
    byKey.set(a.key, ageGroup);
  }

  console.log(`Age groups: ${byKey.size} ensured.`);
  return byKey;
}

async function seedCommunities(
  dataSource: DataSource,
  audiencesByKey: Map<string, Audience>,
): Promise<void> {
  const repo = dataSource.getRepository(Community);
  let created = 0;

  for (const c of SEED_COMMUNITIES) {
    const existing = await repo.findOne({ where: { name: c.name } });
    if (existing) {
      continue;
    }
    const community = repo.create({
      name: c.name,
      description: c.description,
      location: c.location,
      meetingType: c.meetingType,
      organization: c.organization,
      contactUrl: c.contactUrl,
      langId: c.langId ?? 'he',
      targetAudiences: c.audienceKeys
        .map((key) => audiencesByKey.get(key))
        .filter((a): a is Audience => Boolean(a)),
    });
    await repo.save(community);
    created += 1;
  }

  console.log(`Communities: ${created} created (${SEED_COMMUNITIES.length} total).`);
}

async function seedArticles(
  dataSource: DataSource,
  categoriesBySlug: Map<string, Category>,
  audiencesByKey: Map<string, Audience>,
  ageGroupsByKey: Map<string, AgeGroup>,
): Promise<void> {
  const repo = dataSource.getRepository(Article);

  // Stable groupKey -> one generated uuid, so translations of the same item share a groupId.
  const groupIdByKey = new Map<string, string>();
  const groupId = (key: string | undefined): string => {
    if (!key) {
      return randomUUID();
    }
    let id = groupIdByKey.get(key);
    if (!id) {
      id = randomUUID();
      groupIdByKey.set(key, id);
    }
    return id;
  };

  const refToId = new Map<string, string>();
  let created = 0;

  const upsert = async (seed: SeedArticle, parentId: string | null): Promise<void> => {
    // Natural key includes parentId: the same resource (e.g. a story) legitimately appears as
    // a separate child under several parents (age-group guidelines).
    const existing = await repo.findOne({
      where: { title: seed.title, langId: seed.langId, parentId: parentId ?? IsNull() },
    });
    if (existing) {
      if (seed.ref) {
        refToId.set(seed.ref, existing.id);
      }
      return;
    }

    const article = repo.create({
      type: seed.type,
      langId: seed.langId,
      groupId: groupId(seed.groupKey),
      title: seed.title,
      description: seed.description ?? null,
      content: seed.content ?? null,
      url: seed.url ?? null,
      authors: seed.authors ?? null,
      year: seed.year ?? null,
      links: seed.links ?? null,
      parentId,
      sortOrder: seed.sortOrder ?? 0,
      categories: (seed.categorySlugs ?? [])
        .map((slug) => categoriesBySlug.get(slug))
        .filter((c): c is Category => Boolean(c)),
      audiences: (seed.audienceKeys ?? [])
        .map((key) => audiencesByKey.get(key))
        .filter((a): a is Audience => Boolean(a)),
      ageGroups: (seed.ageGroupKeys ?? [])
        .map((key) => ageGroupsByKey.get(key))
        .filter((a): a is AgeGroup => Boolean(a)),
    });

    const saved = await repo.save(article);
    created += 1;
    if (seed.ref) {
      refToId.set(seed.ref, saved.id);
    }
  };

  // Pass 1: parents / standalone (no parentRef). Pass 2: children.
  for (const seed of SEED_ARTICLES.filter((s) => !s.parentRef)) {
    await upsert(seed, null);
  }
  for (const seed of SEED_ARTICLES.filter((s) => s.parentRef)) {
    await upsert(seed, refToId.get(seed.parentRef!) ?? null);
  }

  console.log(`Articles: ${created} created (${SEED_ARTICLES.length} total).`);
}

/******************************************************************************************************/

async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const dataSource = app.get(DataSource);

    await seedUsers(dataSource);
    await seedLanguages(dataSource);
    const categoriesBySlug = await seedCategories(dataSource);
    const audiencesByKey = await seedAudiences(dataSource);
    const ageGroupsByKey = await seedAgeGroups(dataSource);
    await seedCommunities(dataSource, audiencesByKey);
    await seedArticles(dataSource, categoriesBySlug, audiencesByKey, ageGroupsByKey);

    console.log('Backfill complete.');
  } finally {
    await app.close();
  }
}

/******************************************************************************************************/

await seed();
