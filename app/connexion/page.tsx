'use client';

import { ChangeEvent, FormEvent, useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/auth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [shouldReload, setShouldReload] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser(formData.email, formData.password);
      if (result.status === 200) {
        setIsSuccess(true);
        setMessage('Connexion réussie !');
        storeAuthData(result.data.access_token, result.data.userId, result.data.user_type, result.data.user_name);

        setTimeout(() => {
          const userType = localStorage.getItem('userType');
          if (userType === 'investisseur') {
            router.push('/investisseur');
          } else if (userType === 'agriculteur') {
            router.push('/farmer');
          } else {
            router.push('/dashboard');
          }
        }, 1000);
      } else if (result.status === 403) {
        setIsSuccess(false);
        setMessage("Email ou mot de passe incorrect !");
        setTimeout(() => window.location.reload(), 3000);
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (error: any) {
      console.error(error);
      setIsSuccess(false);
      setMessage(error?.response?.data?.message || error?.message || 'Email ou mot de passe incorrect');
      setShouldReload(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldReload) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [shouldReload]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200">
      <Head>
        <title>Connexion | SunuAgri</title>
        <meta name="description" content="Connectez-vous à votre compte SunuAgri pour accéder à votre espace personnel." />
      </Head>

      {/* Navigation avec effet de verre */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm py-4 px-6 md:px-12">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <span className="text-green-600 text-2xl">🌱</span>
            <span className="text-green-700 font-bold text-xl">SunuAgri</span>
          </Link>

          <Link href="/inscription">
            <button className="hidden md:block bg-white text-green-700 border-2 border-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-600 hover:text-white transition-colors">
              S&apos;inscrire
            </button>
          </Link>
        </div>
      </nav>

      {/* Contenu principal - Formulaire centré */}
      <main className="container mx-auto px-4 py-12 md:py-16 flex justify-center">
        <div className="w-full max-w-md">
          {/* Formulaire de connexion */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-green-700 mb-2">
                Connexion
              </h2>
              <p className="text-gray-500">
                Accédez à votre espace personnel SunuAgri
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 text-center rounded-lg flex items-center justify-center gap-2
                  ${isSuccess
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'}`
                }
              >
                <span className={isSuccess ? 'text-green-500' : 'text-red-500'}>
                  {isSuccess ? '✓' : '✗'}
                </span>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-800"
                    placeholder="exemple@domaine.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <Link href="/mot-de-passe-oublie">
                    <span className="text-sm text-green-600 hover:text-green-800">
                      Mot de passe oublié?
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 text-gray-800"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Vous n&apos;avez pas de compte ?
                <Link href="/inscription">
                  <span className="ml-1 text-green-600 hover:text-green-800 font-semibold">
                    S&apos;inscrire maintenant
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="mt-16 py-12 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="font-bold text-xl">SunuAgri</span>
              </div>
              <p className="text-green-200 mb-4">Cultivons ensemble l&apos;avenir durable du Sénégal</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-green-200 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-green-200 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link href="/about" className="text-green-200 hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/services" className="text-green-200 hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/blog" className="text-green-200 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/financement" className="text-green-200 hover:text-white transition-colors">Financement agricole</Link></li>
                <li><Link href="/marketplace" className="text-green-200 hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/formation" className="text-green-200 hover:text-white transition-colors">Formation</Link></li>
                <li><Link href="/technologie" className="text-green-200 hover:text-white transition-colors">Solutions technologiques</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-green-200">info@sunuagri-senegal.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-green-200">+221 77 766 67 33</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-green-200">Dakar, Sénégal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-300 text-sm mb-4 md:mb-0">
              <Link href="/privacy" className="text-green-300 hover:text-white">Politique de confidentialité</Link>
              <Link href="/terms" className="text-green-300 hover:text-white">Conditions d&apos;utilisation</Link>
              <Link href="/cookies" className="text-green-300 hover:text-white">Cookies</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export type UserData = {
    name: string;
    email: string;
    password: string;
    userType: string;
    phoneNumber: string;
};

export type UserLoginData = {
    email: string;
    password: string
}


export const storeAuthData = (token: string, userId: string, userType: string, userName: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', userName);
  }
};

