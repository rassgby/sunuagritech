"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Save, Calendar, MapPin, Droplets, Sun, PlusCircle, X, Home, Layers, Cloud, ShoppingBag, MessageSquare, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { createProject } from '@/app/services/projects';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
    const [currentUser, setCurrentUser] = useState({ name: "Utilisateur inconnu" });
    const [formData, setFormData] = useState({
        projectName: '',
        projectType: '',
        startDate: '',
        endDate: '',
        budget: '',
        location: '',
        description: '',
        objectives: [''],
        risks: [''],
        weatherAlerts: false,
        irrigationSystem: false,
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState("Aucun utilisateur");
    const router = useRouter();

    const fetchUserName = () => {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
        fetchUserName();
    }, []);

    const projectTypes = [
        "Culture biologique",
        "Élevage",
        "Agroforesterie",
        "Système d'irrigation",
        "Formation agricole",
        "Transformation agroalimentaire",
        "Autre"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (field: string, index: number, value: string) => {
        const newArray = [...formData[field as keyof typeof formData] as string[]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field: 'objectives' | 'risks') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const fetchCurrentUser = () => {
      const userName = localStorage.getItem('userName');
      if (userName) {
        setCurrentUser({ name: userName });
      }
    };

    const removeArrayItem = (field: string, index: number) => {
        if ((formData[field as keyof typeof formData] as string[]).length > 1) {
            const newArray = [...(formData[field as keyof typeof formData] as string[])];
            newArray.splice(index, 1);
            setFormData(prev => ({ ...prev, [field]: newArray }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async () => {
    try {
        if (!userId) {
            throw new Error("Utilisateur non authentifié");
        }

        const token = localStorage.getItem('token');
        console.log("Token:", token);

        // Formater les données selon le modèle attendu par le backend
        const formattedData = {
            project_name: formData.projectName,
            project_type: formData.projectType,
            start_date: new Date(formData.startDate).toISOString(),
            end_date: new Date(formData.endDate).toISOString(),
            budget: Number(formData.budget),
            location: formData.location,
            description: formData.description,
            objectives: formData.objectives,
            risks: formData.risks,
            weather_alerts: formData.weatherAlerts,
            irrigation_system: formData.irrigationSystem
        };

        console.log("Project Data:", formattedData);

        // Passer les données du formulaire à createProject
        const result = await createProject(formattedData);
        if (result.status === 201) {
            alert('Projet créé avec succès !');
            router.push('/farmer/projet');
        } else {
            alert(`Échec de la création du projet: ${result.data?.message || 'Erreur inconnue'}`);
        }
    } catch (error) {
        console.error("Erreur lors de la création du projet :", error);
        let errorMessage = "Une erreur est survenue lors de la création du projet.";
        if (typeof error === "object" && error !== null) {
            if ("response" in error && typeof (error as any).response?.data?.message === "string") {
                errorMessage = `Une erreur est survenue lors de la création du projet: ${(error as any).response.data.message}`;
            } else if ("message" in error && typeof (error as any).message === "string") {
                errorMessage = `Une erreur est survenue lors de la création du projet: ${(error as any).message}`;
            }
        }
        alert(errorMessage);
    }
};

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
                            <Link href="/farmer/projet" className="bg-green-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Layers className="mr-4 h-6 w-6" />
                                Mes projets
                            </Link>
                            <Link href="/farmer/weather" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Cloud className="mr-4 h-6 w-6" />
                                Météo
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-green-700 p-4">
                        <Link href="/" className="flex items-center">
                            <div className="ml-3">
                                <p className="text-base font-medium text-white">Amadou Korka Diallo</p>
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
                            <Link href="/farmer/projet" className="bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Layers className="mr-3 h-6 w-6" />
                                Mes projets
                            </Link>
                            <Link href="/farmer/weather" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Cloud className="mr-3 h-6 w-6" />
                                Météo
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-green-700 p-4">
                        <Link href="/" className="flex items-center group">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{currentUser.name}</p>
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

                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/farmer/" className="text-green-700 hover:text-green-900 mr-3">
                                <ChevronLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-900">Nouveau projet</h1>
                        </div>

                        {/* Save button - hide on small screens */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer
                        </button>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="bg-white shadow rounded-lg">
                            <div className="p-4 sm:p-6">
                                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                    {/* Informations de base */}
                                    <div className="col-span-1">
                                        <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
                                        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                                                    Nom du projet *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="projectName"
                                                    id="projectName"
                                                    required
                                                    value={formData.projectName}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 text-black/75"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                    <span className="text-red-500 mr-1">*</span>
                                                    Type de projet
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="projectType"
                                                        name="projectType"
                                                        required
                                                        value={formData.projectType}
                                                        onChange={handleChange}
                                                        className="appearance-none mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    >
                                                        <option value="" disabled className="text-gray-500">Sélectionner un type</option>
                                                        {projectTypes.map((type, index) => (
                                                            <option key={index} value={type} className="text-gray-900">{type}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                {!formData.projectType && (
                                                    <p className="mt-1 text-xs text-gray-500">Veuillez sélectionner le type qui correspond le mieux à votre projet</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates et budget */}
                                    <div className="col-span-1">
                                        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            <div>
                                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Date de début *
                                                </label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    id="startDate"
                                                    required
                                                    value={formData.startDate}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Date de fin *
                                                </label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    id="endDate"
                                                    required
                                                    value={formData.endDate}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>

                                            <div className="sm:col-span-2 lg:col-span-1">
                                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                                                    Budget (FCFA) *
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        type="number"
                                                        name="budget"
                                                        id="budget"
                                                        required
                                                        value={formData.budget}
                                                        onChange={handleChange}
                                                        className="block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 pr-16"
                                                        placeholder="0"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">FCFA</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Localisation */}
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            Localisation
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                            placeholder="Région, ville ou coordonnées GPS"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description du projet *
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            required
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                            placeholder="Décrivez votre projet agricole..."
                                        />
                                    </div>

                                    {/* Objectifs */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Objectifs du projet
                                        </label>
                                        {formData.objectives.map((objective, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <input
                                                    type="text"
                                                    value={objective}
                                                    onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                                                    className="block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                    placeholder={`Objectif ${index + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('objectives', index)}
                                                    className="ml-2 text-red-600 hover:text-red-800"
                                                    aria-label="Supprimer l'objectif"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem('objectives')}
                                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            <PlusCircle className="w-4 h-4 mr-1" />
                                            Ajouter un objectif
                                        </button>
                                    </div>

                                    {/* Risques */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Risques potentiels
                                        </label>
                                        {formData.risks.map((risk, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <input
                                                    type="text"
                                                    value={risk}
                                                    onChange={(e) => handleArrayChange('risks', index, e.target.value)}
                                                    className="block w-full border text-black/75 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                                    placeholder={`Risque ${index + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('risks', index)}
                                                    className="ml-2 text-red-600 hover:text-red-800"
                                                    aria-label="Supprimer le risque"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem('risks')}
                                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            <PlusCircle className="w-4 h-4 mr-1" />
                                            Ajouter un risque
                                        </button>
                                    </div>
                                </div>

                                {/* Options météo et irrigation - facultatives */}
                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Options supplémentaires</h2>
                                    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="weatherAlerts"
                                                    name="weatherAlerts"
                                                    type="checkbox"
                                                    checked={formData.weatherAlerts}
                                                    onChange={handleCheckboxChange}
                                                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="weatherAlerts" className="font-medium text-gray-700 flex items-center">
                                                    <Sun className="w-4 h-4 mr-1 text-yellow-500" />
                                                    Activer les alertes météo
                                                </label>
                                                <p className="text-gray-500">Recevez des notifications en cas d&apos;événements météorologiques importants</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="irrigationSystem"
                                                    name="irrigationSystem"
                                                    type="checkbox"
                                                    checked={formData.irrigationSystem}
                                                    onChange={handleCheckboxChange}
                                                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="irrigationSystem" className="font-medium text-gray-700 flex items-center">
                                                    <Droplets className="w-4 h-4 mr-1 text-blue-500" />
                                                    Intégrer un système d&apos;irrigation
                                                </label>
                                                <p className="text-gray-500">Connectez votre système d&apos;irrigation pour un suivi en temps réel</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons d'action */}
                                <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 order-2 sm:order-1"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 order-1 sm:order-2"
                                    >
                                        Créer le projet
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
