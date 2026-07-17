type Configuration = ReturnType<typeof configuration>;

const REQUIRED_ENVIRONMENT_VRIABLES = [
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
];

function configuration() {
  const errorMessages: string[] = [];

  checkEnvironmentVariablesExist(errorMessages);
  const configurations = {
    server: {
      port: isNumber({
        key: 'PORT',
        value: process.env.PORT,
        errorMessages,
      }),
    },
    database: {
      url: process.env.DATABASE_URL as string,
    },
    jwt: {
      secret: process.env.JWT_SECRET as string,
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    },
  }

  if (errorMessages.length > 0) {
    throw new TypeError(
      `Invalid environment variables: ${errorMessages.join(',')}`
    );
  }

  return configurations;
}

function checkEnvironmentVariablesExist(errorMessages: string[]) {
  for (const environmentVariableKey of REQUIRED_ENVIRONMENT_VRIABLES) {
    if (!process.env[environmentVariableKey]) {
      errorMessages.push(
        `Missing environment variable '${environmentVariableKey}'`,
      );
    }
  }
  return errorMessages;
}

function isNumber(parameters: {
    key: string;
    value: unknown;
    errorMessages: string[];
  }) {
  const { key, value, errorMessages } = parameters;
  
  const valueAsNumber = Number(value);
    if (Number.isNaN(valueAsNumber) || !Number.isSafeInteger(valueAsNumber)) {
        errorMessages.push(`* '${key}' must be a number`);
        return Number.NEGATIVE_INFINITY;
    }

  return valueAsNumber;
}

// function isString(parameters: {
//   key: string;
//   value: unknown;
//   errorMessages: string[];
// }) {
//   const { key, value, errorMessages } = parameters;

//   if (typeof value !== 'string') {
//     errorMessages.push(`* '${key}' must be a string`);
//     return '';
//   }

//   if (value.length === 0) {
//     errorMessages.push(`* '${key}' must not be empty`);
//     return '';
//   }

//   return value;
// }

// function isArray(parameters: {
//   key: string;
//   value: unknown;
//   errorMessages: string[]
// }) {
//   const { key, value, errorMessages } = parameters;

//   const valueAsArray = isString({ key, value, errorMessages }).split(',');

//   if (!Array.isArray(valueAsArray)) {
//     errorMessages.push(`* '${key}' must be an array`);
//     return [];
//   }

//   const isStringArray = valueAsArray.every((value) => {
//     return typeof value === 'string';
//   });
//   if (!isStringArray) {
//     errorMessages.push(`* '${key}' must be a string array`);
//     return [];
//   }

//   return valueAsArray.map((value) => {
//     return value.trim();
//   });
// }

export { configuration, type Configuration };
