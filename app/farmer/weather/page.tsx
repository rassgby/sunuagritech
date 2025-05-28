'use client';
import { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import {
    Menu, X, Home, Cloud, Layers, LogOut,
    Sun, CloudRain, Wind, Droplets, AlertTriangle,
    RefreshCw
} from 'lucide-react';
import { getFullWeather } from '@/app/services/weatherService';

// Fonction pour obtenir l'icône météo correspondante
interface WeatherIconProps {
    iconName: string;
}

const getWeatherIcon = (iconName: WeatherIconProps['iconName']): JSX.Element => {
    switch (iconName) {
        case '01d':
        case '01n':
            return <Sun className="h-10 w-10 text-yellow-500" />;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return <Cloud className="h-10 w-10 text-gray-400" />;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
            return <CloudRain className="h-10 w-10 text-blue-500" />;
        case '11d':
        case '11n':
            return (
                <div className="h-10 w-10 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
                        <polyline points="13 11 9 17 15 17 11 23"></polyline>
                    </svg>
                </div>
            );
        default:
            return <Cloud className="h-10 w-10 text-gray-400" />;
    }
};

type WeatherData = {
    current: {
        icon: string;
        temperature: number;
        condition: string;
        humidity: number;
        windSpeed: number;
        rainChance: number;
        uvIndex: number;
    };
    forecast: Array<{
        day: string;
        date: string;
        icon: string;
        maxTemp: number;
        minTemp: number;
        rainChance: number;
    }>;
};

export default function FarmerWeather() {
    // États
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedLocation, setSelectedLocation] = useState("Thiès");
    const [selectedTab, setSelectedTab] = useState("forecast");
    const [userName, setUserName] = useState("Aucun utilisateur");

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const rawData = await getFullWeather(selectedLocation);
                // Adapt rawData to match WeatherData type
                const adaptedData: WeatherData = {
                    current: {
                        icon: rawData.current.icon,
                        temperature: rawData.current.temperature,
                        condition: rawData.current.description ?? "",
                        humidity: rawData.current.humidity,
                        windSpeed: rawData.current.windSpeed,
                        rainChance: (typeof (rawData.current as any).rainChance === 'number'
                            ? (rawData.current as any).rainChance
                            : 0),
                        uvIndex: (rawData.current as any).uvIndex ?? 0,
                    },
                    forecast: Array.isArray(rawData.forecast)
                        ? rawData.forecast.map((f) => ({
                            day: f.day,
                            date: f.date,
                            icon: f.icon,
                            maxTemp: f.maxTemp,
                            minTemp: f.minTemp,
                            rainChance: f.rainChance ?? 0,
                        }))
                        : [],
                };
                setWeatherData(adaptedData);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeatherData();
        fetchUserName();
    }, [selectedLocation]);

    // Fonction pour simuler un rafraîchissement des données météo
    const refreshWeatherData = () => {
        setIsRefreshing(true);

        setTimeout(() => {
            setIsRefreshing(false);
            setAlertMessage('Données météorologiques actualisées avec succès.');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }, 1000);
    };

    const fetchUserName = () => {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };
    // Fonction pour changer la localisation
    const changeLocation = (location: string) => {
        setSelectedLocation(location);
    };

    if (!weatherData) {
        return <div>Chargement des données météorologiques...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? "" : "hidden"}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-green-800">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Fermer la sidebar</span>
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <span className="text-white font-bold text-xl">SunuAgri</span>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {/* Sidebar Navigation Items */}
                            <Link href="/farmer" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Home className="mr-4 h-6 w-6" />
                                Tableau de bord
                            </Link>
                            <Link href="/farmer/projet" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Layers className="mr-4 h-6 w-6" />
                                Mes projets
                            </Link>
                            <Link href="/farmer/weather" className="bg-green-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Cloud className="mr-4 h-6 w-6" />
                                Météo
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-green-700 p-4">
                        <Link href="/" className="flex items-center">
                            <div className="ml-3">
                                <p className="text-base font-medium text-white">{userName}</p>
                                <p className="text-sm font-medium text-green-200 group-hover:text-white">
                                    Se déconnecter
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-green-800">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <span className="text-white font-bold text-xl">SunuAgri</span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            <Link href="/farmer" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Home className="mr-3 h-6 w-6" />
                                Tableau de bord
                            </Link>
                            <Link href="/farmer/projet" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Layers className="mr-3 h-6 w-6" />
                                Mes projets
                            </Link>
                            <Link href="/farmer/weather" className="bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Cloud className="mr-3 h-6 w-6" />
                                Météo
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-green-700 p-4">
                        <Link href="/" className="flex items-center group">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">Amadou Korka Diallo</p>
                                <div className="flex items-center text-sm font-medium text-green-200 group-hover:text-white">
                                    <LogOut className="mr-1 h-4 w-4" />
                                    Se déconnecter
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="md:pl-64 flex flex-col flex-1">
                <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Ouvrir la sidebar</span>
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold text-gray-900">Météo</h1>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={refreshWeatherData}
                                        className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        disabled={isRefreshing}
                                    >
                                        <RefreshCw className={`h-6 w-6 ${isRefreshing ? 'animate-spin text-green-500' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {/* Alerte */}
                            {showAlert && (
                                <div className="rounded-md bg-green-50 p-4 mt-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">
                                                {alertMessage}
                                            </p>
                                        </div>
                                        <div className="ml-auto pl-3">
                                            <div className="-mx-1.5 -my-1.5">
                                                <button onClick={() => setShowAlert(false)} className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                    <span className="sr-only">Fermer</span>
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sélecteur de localisation */}
                            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Météo pour l&apos;agriculture</h3>
                                            <div className="ml-4 sm:mr-0">
                                                <span className="text-sm text-gray-500">Aujourd&apos;hui, {new Date().toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 sm:mt-0 bg-black/10 sm:bg-white rounded-md shadow-sm">
                                            <label htmlFor="location" className="sr-only">Localisation</label>
                                            <select
                                                id="location"
                                                name="location"
                                                className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md text-black/65"
                                                value={selectedLocation}
                                                onChange={(e) => changeLocation(e.target.value)}
                                            >
                                                <option value="Thiès">Thiès</option>
                                                <option value="Dakar">Dakar</option>
                                                <option value="Saint-Louis">Saint-Louis</option>
                                                <option value="Kaolack">Kaolack</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditions météo actuelles */}
                                <div className="border-t border-gray-200">
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        {getWeatherIcon(weatherData.current.icon)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">
                                                            {selectedLocation}, Sénégal
                                                        </p>
                                                        <p className="text-3xl font-bold text-gray-900">
                                                            {weatherData.current.temperature}°C
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {weatherData.current.condition}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex items-center">
                                                            <Droplets className="h-5 w-5 text-gray-400 mr-2" />
                                                            <span className="text-sm font-medium text-gray-500">Humidité</span>
                                                        </div>
                                                        <p className="mt-1 text-lg font-semibold text-gray-900">{weatherData.current.humidity}%</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex items-center">
                                                            <Wind className="h-5 w-5 text-gray-400 mr-2" />
                                                            <span className="text-sm font-medium text-gray-500">Vent</span>
                                                        </div>
                                                        <p className="mt-1 text-lg font-semibold text-gray-900">{weatherData.current.windSpeed} km/h</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex items-center">
                                                            <CloudRain className="h-5 w-5 text-gray-400 mr-2" />
                                                            <span className="text-sm font-medium text-gray-500">Pluie</span>
                                                        </div>
                                                        <p className="mt-1 text-lg font-semibold text-gray-900">{weatherData.current.rainChance}%</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex items-center">
                                                            <Sun className="h-5 w-5 text-gray-400 mr-2" />
                                                            <span className="text-sm font-medium text-gray-500">UV</span>
                                                        </div>
                                                        <p className="mt-1 text-lg font-semibold text-gray-900">Indice {weatherData.current.uvIndex}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Onglets */}
                            <div className="bg-white shadow rounded-lg mt-6">
                                <div className="border-b border-gray-200">
                                    <nav className="flex">
                                        <button
                                            onClick={() => setSelectedTab("forecast")}
                                            className={`px-4 py-4 text-center text-sm font-medium ${selectedTab === "forecast"
                                                    ? "border-b-2 border-green-500 text-green-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                                } flex-1`}
                                        >
                                            Prévisions
                                        </button>
                                        <button
                                            onClick={() => setSelectedTab("agricultural")}
                                            className={`px-4 py-4 text-center text-sm font-medium ${selectedTab === "agricultural"
                                                    ? "border-b-2 border-green-500 text-green-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                                } flex-1`}
                                        >
                                            Conseils Agricoles
                                        </button>
                                        <button
                                            onClick={() => setSelectedTab("rainfall")}
                                            className={`px-4 py-4 text-center text-sm font-medium ${selectedTab === "rainfall"
                                                    ? "border-b-2 border-green-500 text-green-600"
                                                    : "text-gray-500 hover:text-gray-700"
                                                } flex-1`}
                                        >
                                            Précipitations
                                        </button>
                                    </nav>
                                </div>

                                {/* Contenu des onglets */}
                                <div className="p-4">
                                    {/* Prévisions sur 7 jours */}
                                    {selectedTab === "forecast" && (
                                        <div className="overflow-x-auto">
                                            <div className="inline-block min-w-full">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                                                    {weatherData.forecast.map((day, index) => (
                                                        <div key={index} className="bg-white rounded-lg border p-4 text-center">
                                                            <div className="font-medium text-gray-900">{day.day}</div>
                                                            <div className="text-xs text-gray-500">{day.date}</div>
                                                            <div className="flex justify-center my-2">
                                                                {getWeatherIcon(day.icon)}
                                                            </div>
                                                            <div className="mt-2">
                                                                <span className="text-gray-900 font-medium">{day.maxTemp}°</span>
                                                                <span className="text-gray-500 mx-1">/</span>
                                                                <span className="text-gray-500">{day.minTemp}°</span>
                                                            </div>
                                                            <div className="mt-2 flex items-center justify-center text-xs">
                                                                <CloudRain className="h-3 w-3 text-blue-500 mr-1" />
                                                                <span>{day.rainChance}%</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Conseils agricoles */}
                                    {selectedTab === "agricultural" && (
                                        <div className="space-y-4">
                                            {/* Ajoutez ici vos conseils agricoles */}
                                        </div>
                                    )}

                                    {/* Données pluviométriques */}
                                    {selectedTab === "rainfall" && (
                                        <div>
                                            {/* Ajoutez ici vos données pluviométriques */}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section des alertes météo spéciales */}
                            <div className="mt-6 bg-white shadow rounded-lg p-4">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Alertes météo spéciales</h2>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                <span className="font-medium">Alerte chaleur</span> - Températures élevées prévues pour les 3 prochains jours. Prévoyez des mesures pour protéger vos cultures sensibles.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <CloudRain className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-blue-700">
                                                <span className="font-medium">Prévision à long terme</span> - Précipitations supérieures à la moyenne attendues pour la saison des pluies cette année. Planifiez vos cultures en conséquence.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section des conseils personnalisés */}
                            <div className="mt-6 bg-white shadow rounded-lg p-4 mb-8">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Conseils personnalisés pour vos cultures</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900">Maïs (Parcelle Nord)</h3>
                                        <ul className="mt-2 space-y-2 text-sm">
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                                                <span className="ml-2 text-black/65">Irrigation recommandée: 25mm sur les 3 prochains jours</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                                                <span className="ml-2 text-black/65">Risque de stress thermique: élevé</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                                                <span className="ml-2 text-black/65">Traitement préventif contre les pucerons recommandé</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-medium text-gray-900">Tomates (Parcelle Est)</h3>
                                        <ul className="mt-2 space-y-2 text-sm">
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                                                <span className="ml-2 text-black/65">Irrigation recommandée: 15mm tous les deux jours</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                                                <span className="ml-2 text-black/65">Risque de mildiou: modéré (surveillance conseillée)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-5 w-5 text-green-500">•</span>
                                                <span className="ml-2 text-black/65">Fenêtre de récolte optimale: 25-27 avril</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Voir tous mes conseils personnalisés
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
