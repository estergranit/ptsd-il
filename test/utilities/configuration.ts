import { createHmac } from 'node:crypto';

/******************************************************************************************************/

type UserType = keyof typeof USERS;
type User = { email: string; token: string };

/******************************************************************************************************/

const API_BASE_URL = `${process.env.SERVER_URL ?? 'http://localhost:3000'}/api`;

// Local password login is gone (Google OAuth only). Google's flow cannot run headless in e2e,
// so the harness mints JWTs directly with the server's JWT_SECRET, matching the shape the
// server issues ({ sub, email, roles }). JWT_SECRET must be present in the test process env.
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be set for e2e tests (run with --env-file .env)');
}

const TOKEN_TTL_SECONDS = 3_600;

const USERS = {
  admin: {
    email: process.env.TEST_ADMIN_EMAIL ?? 'admin@ptsd-il.local',
    roles: ['admin'],
  },
  moderator: {
    email: process.env.TEST_MODERATOR_EMAIL ?? 'moderator@ptsd-il.local',
    roles: ['moderator'],
  },
  masteradmin: {
    email: process.env.TEST_MASTERADMIN_EMAIL ?? 'masteradmin@ptsd-il.local',
    roles: ['masteradmin'],
  },
} as const;

/******************************************************************************************************/

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

interface SeededUser {
  id: string;
  email: string | null;
  roles: string[];
}

function base64Url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function signToken(payload: JwtPayload): string {
  const now = Math.floor(Date.now() / 1_000);
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64Url(
    JSON.stringify({ ...payload, iat: now, exp: now + TOKEN_TTL_SECONDS }),
  );
  const signature = base64Url(
    createHmac('sha256', JWT_SECRET!).update(`${header}.${body}`).digest(),
  );
  return `${header}.${body}.${signature}`;
}

async function generateUsersTokens(): Promise<Record<UserType, User>> {
  // Bootstrap: a masteradmin-role token (arbitrary sub) is enough to list users, since the
  // roles guard authorizes by role, not by id. Use it to resolve each seeded user's real id.
  const bootstrap = signToken({
    sub: 'e2e-bootstrap',
    email: USERS.masteradmin.email,
    roles: ['masteradmin'],
  });

  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: { authorization: `Bearer ${bootstrap}` },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to list users for token setup (${response.status}): ${text}`);
  }
  const seeded = (await response.json()) as SeededUser[];

  const entries = (Object.keys(USERS) as UserType[]).map((type) => {
    const { email, roles } = USERS[type];
    const user = seeded.find((candidate) => {
      return candidate.email === email;
    });
    if (!user) {
      throw new Error(`Seeded user '${email}' not found; run the seed before e2e tests`);
    }
    const token = signToken({ sub: user.id, email, roles: [...roles] });
    return [type, { email, token }] as const;
  });

  return Object.fromEntries(entries) as Record<UserType, User>;
}

/******************************************************************************************************/

const users = await generateUsersTokens();

/******************************************************************************************************/

export { API_BASE_URL, users as USERS, type User, type UserType };
