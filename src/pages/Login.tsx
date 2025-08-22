import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { Mail, LockKeyhole } from 'lucide-react';
import { loginApi } from '../lib/API/apiLogin'; // your API call
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  // const { t } = useLanguage();

  const t = (key: string, vars?: Record<string, any>) => {
  if (vars) {
    // If there’s only one variable, return its value
    const values = Object.values(vars);
    if (values.length === 1) {
      return String(values[0]);
    }
    // Otherwise show key + values
    return `${key} ${JSON.stringify(vars)}`;
  }
  return key;
};
  const { toast } = useToast();
  const { setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validateLoginForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      errors.email = t('emailRequired');
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = t('invalidEmailFormat');
    }

    if (!formData.password.trim()) {
      errors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('passwordMinLength');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      toast({
        title: t('loginFailed'),
        description: t('pleaseCorrectErrors'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginApi(formData.email, formData.password);

      if (data.token) {
        localStorage.setItem('token', data.token); // save token
        setIsLoggedIn(true);
      }

      toast({
        title: t('loginSuccess'),
        description: t('welcomeBack'),
      });

      navigate('/'); // go to homepage

    } catch (err) {
      toast({
        title: t('loginFailed'),
        description: err,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center">
                <LockKeyhole className="h-7 w-7 mr-3" />
                {t('login')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('enterEmailAddress')}
                    aria-invalid={validationErrors.email ? "true" : "false"}
                    aria-describedby="email-error"
                    disabled={isLoading}
                  />
                  {validationErrors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-semibold flex items-center">
                    <LockKeyhole className="h-4 w-4 mr-2" />
                    {t('password')}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t('enterYourPassword')}
                    aria-invalid={validationErrors.password ? "true" : "false"}
                    aria-describedby="password-error"
                    disabled={isLoading}
                  />
                  {validationErrors.password && (
                    <p id="password-error" className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
                  {isLoading ? t('signingIn') + '...' : t('signIn')}
                </Button>
                <p className="text-center text-sm text-gray-600">
                  {t('dontHaveAccount')} <Link to="/signup" className="text-teal-600 hover:underline font-medium hover:text-teal-700">{t('registerHere')}</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
