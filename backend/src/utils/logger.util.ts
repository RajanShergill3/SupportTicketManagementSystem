/**
 * Lightweight application logger.
 *
 * Provides structured console output without external dependencies.
 * Sensitive values are redacted before logging.
 */
type LogLevel = 'info' | 'warn' | 'error';

const SENSITIVE_PATTERNS: RegExp[] = [
  /mongodb(\+srv)?:\/\/[^@\s]+@/gi,
  /(password|secret|token|api[_-]?key)\s*[:=]\s*\S+/gi,
];

const redactSensitive = (value: string): string => {
  let result = value;

  for (const pattern of SENSITIVE_PATTERNS) {
    result = result.replace(pattern, (match) => {
      if (match.toLowerCase().startsWith('mongodb')) {
        return match.includes('@') ? 'mongodb://****:****@' : 'mongodb://****';
      }

      return match.split(/[:=]/)[0] + '=****';
    });
  }

  return result;
};

const formatArgs = (args: unknown[]): unknown[] => {
  return args.map((arg) => {
    if (typeof arg === 'string') {
      return redactSensitive(arg);
    }

    if (arg instanceof Error) {
      return redactSensitive(arg.message);
    }

    return arg;
  });
};

const write = (level: LogLevel, message: string, args: unknown[]): void => {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${redactSensitive(message)}`;
  const formattedArgs = formatArgs(args);

  if (level === 'info') {
    console.log(formattedMessage, ...formattedArgs);
    return;
  }

  if (level === 'warn') {
    console.warn(formattedMessage, ...formattedArgs);
    return;
  }

  console.error(formattedMessage, ...formattedArgs);
};

export const logger = {
  info: (message: string, ...args: unknown[]): void => write('info', message, args),
  warn: (message: string, ...args: unknown[]): void => write('warn', message, args),
  error: (message: string, ...args: unknown[]): void => write('error', message, args),
};
