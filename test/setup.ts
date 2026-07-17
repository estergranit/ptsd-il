process.env['PORT'] ??= '3001';
process.env['DATABASE_URL'] ??= 'postgresql://postgres:postgres@localhost:5432/ptsd_il_test';
process.env['JWT_SECRET'] ??= 'e2e-test-jwt-secret';
process.env['JWT_EXPIRES_IN'] ??= '1h';
process.env['NODE_ENV'] = 'test';
