'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  TrendingUp,
  Cloud,
  Layers,
  ShoppingBag,
  MessageSquare,
  LogOut,
  User,
  Settings,
  Bell,
  BarChart3,
  Calendar,
  HelpCircle
} from 'lucide-react';

interface NavProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ sidebarOpen = false, setSidebarOpen }) => {
  const router = useRouter();
  const [userName] = useState("Agriculteur");

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard/farmer', icon: Home, current: true },
    { name: 'Mes projets', href: '/dashboard/farmer/projects', icon: Layers, current: false },
    { name: 'Investissements', href: '/dashboard/farmer/investments', icon: TrendingUp, current: false },
    { name: 'Marché', href: '/dashboard/farmer/marketplace', icon: ShoppingBag, current: false },
    { name: 'Météo', href: '/dashboard/farmer/weather', icon: Cloud, current: false },
    { name: 'Activités', href: '/dashboard/farmer/activities', icon: BarChart3, current: false },
    { name: 'Messages', href: '/dashboard/farmer/messages', icon: MessageSquare, current: false },
    { name: 'Calendrier', href: '/dashboard/farmer/calendar', icon: Calendar, current: false },
  ];

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    router.push('/auth/login');
  };

  return (
    <>
      {/* Sidebar pour desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">AgriConnect</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    item.current
                      ? 'bg-green-50 border-r-4 border-green-600 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Section utilisateur */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {userName}
                </p>
                <p className="text-xs font-medium text-gray-500">Agriculteur</p>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <Settings className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Se déconnecter"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen?.(false)} />
          
          {/* Sidebar mobile */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen?.(false)}
              >
                <span className="sr-only">Fermer la sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              {/* Logo mobile */}
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="ml-2 text-xl font-semibold text-gray-900">AgriConnect</span>
                </div>
              </div>

              {/* Navigation mobile */}
              <nav className="mt-8 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                      item.current
                        ? 'bg-green-50 border-r-4 border-green-600 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen?.(false)}
                  >
                    <item.icon
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${
                        item.current ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Section utilisateur mobile */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-base font-medium text-gray-700">
                    {userName}
                  </p>
                  <p className="text-sm font-medium text-gray-500">Agriculteur</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500"
                    title="Se déconnecter"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;