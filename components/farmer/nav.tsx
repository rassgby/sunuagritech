"use client";
import { useState, useEffect } from "react";
import { Home, Layers, Cloud, LogOut, X } from "lucide-react";

export default function Nav() { // Changé de FarmerNav à Nav
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Aucun utilisateur");

  // Utilisation de useEffect pour éviter les erreurs SSR
  useEffect(() => {
    const fetchUserName = () => {
      if (typeof window !== 'undefined') { // Protection SSR
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
          setUserName(storedUserName);
        }
      }
    };
    
    fetchUserName();
  }, []);

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-800 to-green-900 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <span className="text-2xl font-bold text-white">SunuAgri</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:text-green-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <a
            href="/farmer"
            className="flex items-center px-4 py-3 bg-green-900 text-white rounded-xl font-medium"
          >
            <Home className="mr-3 h-5 w-5" />
            Tableau de bord
          </a>
          <a
            href="/farmer/projet"
            className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 rounded-xl transition-colors"
          >
            <Layers className="mr-3 h-5 w-5" />
            Mes projets
          </a>
          <a
            href="/farmer/weather"
            className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 rounded-xl transition-colors"
          >
            <Cloud className="mr-3 h-5 w-5" />
            Météo
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">{userName}</p>
              <p className="text-green-200 text-sm">Agriculteur</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex-1 flex flex-col bg-gradient-to-b from-green-800 to-green-900 shadow-xl">
          <div className="flex items-center h-16 px-6 border-b border-green-700">
            <span className="text-2xl font-bold text-white">SunuAgri</span>
          </div>

          <nav className="flex-1 mt-6 px-4 space-y-2">
            <a
              href="/farmer"
              className="flex items-center px-4 py-3 bg-green-900 text-white rounded-xl font-medium shadow-lg"
            >
              <Home className="mr-3 h-5 w-5" />
              Tableau de bord
            </a>
            <a
              href="/farmer/projet"
              className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 rounded-xl transition-all duration-200"
            >
              <Layers className="mr-3 h-5 w-5" />
              Mes projets
            </a>
            <a
              href="/farmer/weather"
              className="flex items-center px-4 py-3 text-green-100 hover:bg-green-700 rounded-xl transition-all duration-200"
            >
              <Cloud className="mr-3 h-5 w-5" />
              Météo
            </a>
          </nav>

          <div className="p-4 border-t border-green-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  </span>
              </div>
              <div className="ml-3">
                <p className="text-white font-semibold">{userName}</p>
                <p className="text-green-200 text-sm">Agriculteur certifié</p>
              </div>
              <LogOut className="ml-auto h-5 w-5 text-green-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}