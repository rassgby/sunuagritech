import { useState, useEffect } from "react";
import { Home, Layers, Cloud, LogOut, X, User } from "lucide-react";

export default function Nav() {
  const [userName, setUserName] = useState("Aucun utilisateur");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserName = () => {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };
    fetchUserName();
  }, []);

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`
        fixed inset-0 flex z-40 md:hidden transition-all duration-300 ease-out
        ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div
          className={`
            fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300
            ${sidebarOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setSidebarOpen(false)}
        />
        <div className={`
          relative flex-1 flex flex-col max-w-xs w-full 
          bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900
          backdrop-blur-xl border-r border-emerald-700/30 shadow-2xl
          transform transition-all duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 hover:scale-110"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fermer la sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-8 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-6 mb-8">
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-white font-bold text-2xl tracking-wide">SunuAgri</span>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mt-1" />
                </div>
              </div>
            </div>
            <nav className="mt-5 px-4 space-y-2">
              <a
                href="/farmer"
                className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-white group flex items-center px-4 py-3 text-base font-medium rounded-xl shadow-lg backdrop-blur-sm border border-emerald-400/30 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center rounded-lg p-2 mr-4 bg-gradient-to-r from-emerald-400 to-green-400 shadow-lg">
                  <Home className="h-5 w-5 text-white" />
                </div>
                Tableau de bord
                <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </a>
              <a
                href="/farmer/projet"
                className="text-emerald-100 hover:bg-white/10 hover:text-white group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-1 hover:shadow-md hover:backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-lg p-2 mr-4 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Layers className="h-5 w-5 text-emerald-200" />
                </div>
                Mes projets
              </a>
              <a
                href="/farmer/weather"
                className="text-emerald-100 hover:bg-white/10 hover:text-white group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-1 hover:shadow-md hover:backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-lg p-2 mr-4 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Cloud className="h-5 w-5 text-emerald-200" />
                </div>
                Météo
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 border-t border-emerald-700/50 p-6">
            <a href="/" className="flex items-center group">
              <div className="flex items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-emerald-700/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group-hover:shadow-lg w-full">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-base font-semibold text-white">{userName}</p>
                  <div className="flex items-center text-sm text-emerald-200 group-hover:text-white transition-colors duration-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 backdrop-blur-xl border-r border-emerald-700/30 shadow-2xl">
          <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-12">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-white font-bold text-3xl tracking-wide">SunuAgri</span>
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mt-2" />
                </div>
              </div>
            </div>
            <nav className="mt-5 flex-1 px-4 space-y-2">
              <a
                href="/farmer"
                className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl shadow-lg backdrop-blur-sm border border-emerald-400/30 transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center rounded-lg p-2 mr-3 bg-gradient-to-r from-emerald-400 to-green-400 shadow-lg">
                  <Home className="h-5 w-5 text-white" />
                </div>
                Tableau de bord
                <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </a>
              <a
                href="/farmer/projet"
                className="text-emerald-100 hover:bg-white/10 hover:text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-1 hover:shadow-md hover:backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-lg p-2 mr-3 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Layers className="h-5 w-5 text-emerald-200" />
                </div>
                Mes projets
              </a>
              <a
                href="/farmer/weather"
                className="text-emerald-100 hover:bg-white/10 hover:text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-1 hover:shadow-md hover:backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-lg p-2 mr-3 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Cloud className="h-5 w-5 text-emerald-200" />
                </div>
                Météo
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 border-t border-emerald-700/50 p-6">
            <a href="/" className="flex items-center group">
              <div className="flex items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-emerald-700/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group-hover:shadow-lg w-full">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-lg">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-white">{userName}</p>
                  <div className="flex items-center text-sm text-emerald-200 group-hover:text-white transition-colors duration-300 mt-1">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}