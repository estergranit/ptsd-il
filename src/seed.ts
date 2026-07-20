import * as bcrypt from 'bcryptjs';
import { DataSource } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import { User, UserRoles } from './entities/users/user.entity.ts';

/******************************************************************************************************/

const ADMIN = {
  firstName: process.env.SEED_ADMIN_FIRST_NAME ?? 'Site',
  lastName: process.env.SEED_ADMIN_LAST_NAME ?? 'Admin',
  email: process.env.SEED_ADMIN_EMAIL ?? 'admin@ptsd-il.local',
  password: process.env.SEED_ADMIN_PASSWORD ?? 'Admin@local123!',
} as const;

/******************************************************************************************************/

async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const usersRepo = app.get(DataSource).getRepository(User);

    const existing = await usersRepo.findOne({ where: { email: ADMIN.email } });
    if (existing) {
      console.log(`Admin '${ADMIN.email}' already exists, skipping.`);
      return;
    }

    const admin = await usersRepo.save(
      usersRepo.create({
        firstName: ADMIN.firstName,
        lastName: ADMIN.lastName,
        email: ADMIN.email,
        password: await bcrypt.hash(ADMIN.password, 10),
        roles: [UserRoles.ADMIN],
      }),
    );

    console.log(`Created admin '${admin.email}' (id: ${admin.id}).`);
  } finally {
    await app.close();
  }
}

/******************************************************************************************************/

await seed();
