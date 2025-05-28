"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {registerUser} from "@/app/services/users";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
    phoneNumber: ''
    // La région a été supprimée
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, userType: type }));
    setStep(2);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await registerUser(formData);
      if (result.status === 201) {
        setIsSuccess(true);
        setMessage('Inscription réussie ! Redirection...');
        setTimeout(() => router.push('/connexion'), 1500);
      } else if (result.status === 409) {
      setIsSuccess(false);
      setMessage("L'utilisateur existe déjà !");
      setTimeout(() => window.location.reload(), 3000); 
      } else {
        setIsSuccess(false);
        setMessage(result.data?.message || result.data?.error || 'Échec de l\'inscription');
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setIsSuccess(false);
      setMessage("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  // Vérification du mot de passe
  const isPasswordStrong = () => {
    const hasMinLength = formData.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSpecial = /[^A-Za-z0-9]/.test(formData.password);

    return hasMinLength && hasUpperCase && hasNumber && hasSpecial;
  };

  // Validation du formulaire (sans la région)
  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.includes('@') &&
      formData.phoneNumber.trim() !== '' &&
      isPasswordStrong()
    );
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Barre de navigation simple */}
      <nav className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <span className="flex items-center gap-2">
              <span className="text-green-600 text-2xl">🌱</span>
              <span className="text-green-700 font-bold text-xl">SunuAgri</span>
            </span>
          </Link>
          <Link href="/connexion">
            <span className="text-green-600 font-medium">Connexion</span>
          </Link>
        </div>
      </nav>

      {/* Contenu principal centré */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Étape 1 : Choix du type d'utilisateur */}
          {step === 1 && (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center text-green-700 mb-8">
                Bienvenue sur SunuAgri
              </h1>

              <p className="text-center text-gray-600 mb-8">
                Rejoignez notre communauté et participez au développement agricole du Sénégal
              </p>

              <h2 className="text-lg font-medium text-gray-700 mb-4 text-center">
                Je suis :
              </h2>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => handleUserTypeSelect('agriculteur')}
                  className="w-full p-4 flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition"
                >
                  <span className="text-2xl">👨‍🌾</span>
                  <div className="text-left">
                    <div className="font-medium text-green-800">Agriculteur</div>
                    <div className="text-sm text-gray-600">Je cultive la terre et produis des denrées</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleUserTypeSelect('investisseur')}
                  className="w-full p-4 flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition"
                >
                  <span className="text-2xl">💼</span>
                  <div className="text-left">
                    <div className="font-medium text-blue-800">Investisseur</div>
                    <div className="text-sm text-gray-600">Je finance des projets agricoles et liées</div>
                  </div>
                </button>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                Déjà inscrit ? <Link href="/connexion"><span className="text-green-600 font-medium">Se connecter</span></Link>
              </div>
            </div>
          )}

          {/* Étape 2 : Formulaire d'inscription */}
          {step === 2 && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setStep(1)}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    ← Retour
                  </button>
                  <h1 className="text-xl font-bold text-green-700">
                    {formData.userType === 'agriculteur' ? 'Inscription Agriculteur' : 'Inscription Investisseur'}
                  </h1>
                </div>

                <div className="bg-green-50 rounded-lg p-2 mb-4 flex items-center">
                  <span className="text-xl mr-2">
                    {formData.userType === 'agriculteur' ? '👨‍🌾' : '💼'}
                  </span>
                  <span className="text-sm text-gray-700">
                    {formData.userType === 'agriculteur'
                      ? "Inscrivez-vous pour trouver des financements pour vos projets"
                      : "Inscrivez-vous pour découvrir des projets agricoles à financer"}
                  </span>
                </div>
              </div>

              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg text-black/75 border focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="Prénom et Nom"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-black/75 rounded-lg border focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="votre.email@exemple.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-black/75 rounded-lg border focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    placeholder="77 123 45 67"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-black/75 rounded-lg border focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    placeholder="8 caractères minimum"
                    required
                  />

                  {formData.password && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className={`text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ 8 caractères min.
                      </div>
                      <div className={`text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ 1 majuscule
                      </div>
                      <div className={`text-xs ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ 1 chiffre
                      </div>
                      <div className={`text-xs ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        ✓ 1 caractère spécial
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isFormValid()}
                  className={`w-full py-3 mt-2 font-medium text-white bg-green-600 rounded-lg 
                    ${isLoading || !isFormValid() ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-700'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement...
                    </span>
                  ) : "Créer mon compte"}
                </button>

                <div className="text-xs text-center text-gray-500 mt-4">
                  En vous inscrivant, vous acceptez nos{' '}
                  <Link href="/conditions"><span className="text-green-600">Conditions d&apos;utilisation</span></Link>{' '}
                  et notre{' '}
                  <Link href="/confidentialite"><span className="text-green-600">Politique de confidentialité</span></Link>.
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Pied de page minimaliste */}
      <footer className="bg-white py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SunuAgri Sénégal
      </footer>
    </div>
  );
}
