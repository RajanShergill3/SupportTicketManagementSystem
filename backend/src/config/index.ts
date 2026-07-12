/**
 * Application configuration loaded from environment variables.
 *
 * dotenv is initialized here so all modules can import `config`
 * without repeating environment setup. Required variables are validated
 * at module load time so misconfiguration fails fast.
 */
import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;

  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const parsePort = (value: string): number => {
  const port = Number.parseInt(value, 10);

  if (Number.isNaN(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid number between 1 and 65535');
  }

  return port;
};

const validateMongoUri = (uri: string): void => {
  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
  }
};

const nodeEnv = getEnv('NODE_ENV', 'development');
const mongodbUri = getEnv('MONGODB_URI');

validateMongoUri(mongodbUri);

export const config = {
  port: parsePort(getEnv('PORT', '3000')),
  nodeEnv,
  mongodbUri,
  isDevelopment: nodeEnv === 'development',
} as const;
