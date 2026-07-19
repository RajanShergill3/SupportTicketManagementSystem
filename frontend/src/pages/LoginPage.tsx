import { type FormEvent, useState } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Button, Card, Checkbox, PasswordInput, TextInput } from '@/components/ui';
import { APP_VERSION } from '@/config/constants';
import { isValidEmail } from '@/utils/validation';

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const INITIAL_FORM_ERROR = '';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(INITIAL_FORM_ERROR);
  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({});

  const validateForm = (): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(INITIAL_FORM_ERROR);

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-100 via-white to-primary-50">
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Card>
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                Support Ticket Management System
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600">
                Sign in to manage support tickets and team workflows.
              </p>
            </div>

            {formError ? (
              <div className="mb-6">
                <ErrorMessage message={formError} />
              </div>
            ) : null}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <TextInput
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@company.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={fieldErrors.email}
                disabled={isLoading}
              />

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={fieldErrors.password}
                disabled={isLoading}
              />

              <div className="flex items-center justify-between gap-4">
                <Checkbox
                  id="remember-me"
                  name="rememberMe"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none focus:underline"
                  onClick={() => setFormError('Forgot password is not available yet.')}
                >
                  Forgot password?
                </button>
              </div>

              <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                Login
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <footer className="px-4 py-4 text-center text-xs text-slate-500">
        Support Ticket Management System v{APP_VERSION}
      </footer>
    </div>
  );
}
