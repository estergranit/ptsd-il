type UserType = keyof typeof USERS;
type User = Awaited<ReturnType<typeof generateUsersTokens>>['admin'];

/******************************************************************************************************/

const API_BASE_URL = `${process.env.SERVER_URL ?? 'http://localhost:3000'}/api`;

const USERS = {
  admin: {
    email: process.env.TEST_ADMIN_EMAIL ?? 'admin@ptsd-il.local',
    password: process.env.TEST_ADMIN_PASSWORD ?? 'Admin@local123!',
  },
  moderator: {
    email: process.env.TEST_MODERATOR_EMAIL ?? 'moderator@ptsd-il.local',
    password: process.env.TEST_MODERATOR_PASSWORD ?? 'Mod@local123!',
  },
  masteradmin: {
    email: process.env.TEST_MASTERADMIN_EMAIL ?? 'masteradmin@ptsd-il.local',
    password: process.env.TEST_MASTERADMIN_PASSWORD ?? 'Master@local123!',
  },
} as const;

/******************************************************************************************************/

async function generateUsersTokens() {
  const users = await Promise.all(
    Object.values(USERS).map(async (details) => {
      return {
        email: details.email,
        token: await getUserToken(details),
      };
    }),
  );

  return Object.fromEntries(
    Object.keys(USERS).map((user, index) => {
      return [user, users[index]];
    }),
  ) as Record<UserType, { email: string; token: string }>;
}

async function getUserToken(configurations: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email: configurations.email,
      password: configurations.password,
    }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Login failed (${response.status}) for ${configurations.email}: ${text}`);
  }

  const data = (await response.json()) as { accessToken?: string; [key: string]: unknown };
  const token = data.accessToken;
  if (!token) {
    throw new Error(`accessToken missing for user ${configurations.email}`);
  }

  return token;
}

/******************************************************************************************************/

const users = await generateUsersTokens();

/******************************************************************************************************/

export { API_BASE_URL, users as USERS, type User, type UserType };
