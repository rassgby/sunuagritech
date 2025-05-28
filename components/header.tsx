import { useState } from "react";
import Link from "next/link";
import { Menu, Sprout, X, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-green-100 shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-1.5 rounded-full">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
              SunuAgri
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/marche"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Marché
            </Link>
            <Link
              href="/investissements"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Investissements
            </Link>
            <Link
              href="/agriculteurs"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Agriculteurs
            </Link>
            <Link
              href="/a-propos"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              À Propos
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/connexion"
              className="px-6 py-2.5 text-green-700 font-medium rounded-lg border border-green-200 hover:text-green-800 hover:bg-green-50 hover:border-green-300 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-sm"
            >
              Se Connecter
            </Link>
            <Link
              href="/inscription"
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-0.5"
            >
              S&apos;inscrire
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-16 px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center justify-between border-b border-gray-100 py-3 text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/marche"
                className="flex items-center justify-between border-b border-gray-100 py-3 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Marché
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/investissements"
                className="flex items-center justify-between border-b border-gray-100 py-3 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Investissements
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/agriculteurs"
                className="flex items-center justify-between border-b border-gray-100 py-3 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Agriculteurs
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/a-propos"
                className="flex items-center justify-between border-b border-gray-100 py-3 text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
                <ChevronRight className="h-5 w-5" />
              </Link>
              <div className="mt-6 flex flex-col space-y-4 px-4">
                <Link
                  href="/connexion"
                  className="w-full py-3 px-6 text-center font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200"
                >
                  Se Connecter
                </Link>
                <Link
                  href="/inscription"
                  className="w-full py-3 px-6 text-center font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 shadow-lg transition-all duration-200"
                >
                  S&apos;inscrire
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
