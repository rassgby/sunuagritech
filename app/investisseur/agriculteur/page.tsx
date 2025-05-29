// pages/dashboard/investor/farmers.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    Menu, X, Home, TrendingUp, ChartBar, Users,
    CreditCard, LogOut,
    Search, Filter, Star, MapPin, Briefcase,
    MessageCircle, ChevronDown, Check
} from 'lucide-react';

// J'ai enleve le composant MessageSquare car il n'est pas utilisé dans le code
// import {
//     Menu, X, Home, TrendingUp, ChartBar, Users,
//     CreditCard, MessageSquare, LogOut,
//     Search, Filter, Star, MapPin, Briefcase,
//     MessageCircle, ChevronDown, Check
// } from 'lucide-react';


export default function FarmersDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filterRegion, setFilterRegion] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy] = useState('recommended'); // 'recommended', 'rating', 'projects'

    // Sample data for regions
    const regions = [
        { id: 'dakar', name: 'Dakar' },
        { id: 'thies', name: 'Thiès' },
        { id: 'saint-louis', name: 'Saint-Louis' },
        { id: 'ziguinchor', name: 'Ziguinchor' },
        { id: 'kaolack', name: 'Kaolack' },
        { id: 'louga', name: 'Louga' },
        { id: 'fatick', name: 'Fatick' },
        { id: 'kedougou', name: 'Kédougou' }
    ];

    // Sample data for categories
    const categories = [
        { id: 'maraichage', name: 'Maraîchage' },
        { id: 'cereales', name: 'Céréales' },
        { id: 'elevage', name: 'Élevage' },
        { id: 'transformation', name: 'Transformation' },
        { id: 'irrigation', name: 'Irrigation' },
        { id: 'bio', name: 'Agriculture Biologique' }
    ];

    // Sample data for farmers
    const farmers = [
        {
            id: 1,
            name: "Fatou Ndiaye",
            photo: "/images/farmer1.jpg",
            region: "Ziguinchor",
            specialization: "Agriculture biologique",
            yearsExperience: 8,
            activeProjects: 2,
            completedProjects: 5,
            bio: "Spécialiste en culture biologique de mangues et agrumes avec certification bio. Engagée dans l'agriculture durable depuis plus de 8 ans.",
            rating: 4.8,
            reviewCount: 27,
            verified: true,
            categories: ["Maraîchage", "Agriculture Biologique"],
            currentProject: {
                title: "Culture biologique de mangues",
                progress: 65,
                funding: 520000,
                goal: 800000
            }
        },
        {
            id: 2,
            name: "Ibrahima Fall",
            photo: "/images/farmer2.jpg",
            region: "Thiès",
            specialization: "Élevage avicole",
            yearsExperience: 12,
            activeProjects: 1,
            completedProjects: 8,
            bio: "Expert en élevage avicole moderne avec des techniques respectueuses de l'environnement. Formation en agronomie et plusieurs certifications internationales.",
            rating: 4.9,
            reviewCount: 36,
            verified: true,
            categories: ["Élevage"],
            currentProject: {
                title: "Projet d'élevage avicole",
                progress: 70,
                funding: 840000,
                goal: 1200000
            }
        },
        {
            id: 3,
            name: "Seydina Goudiaby",
            photo: "/images/farmer3.jpg",
            region: "Kaolack",
            specialization: "Culture céréalière",
            yearsExperience: 15,
            activeProjects: 1,
            completedProjects: 10,
            bio: "Cultivateur de céréales traditionnelles avec des techniques modernes pour augmenter le rendement. Spécialiste du mil et du sorgho adaptés au climat sénégalais.",
            rating: 4.7,
            reviewCount: 42,
            verified: true,
            categories: ["Céréales"],
            currentProject: {
                title: "Production de mil et sorgho",
                progress: 60,
                funding: 390000,
                goal: 650000
            }
        },
        {
            id: 4,
            name: "Fatou Ngom",
            photo: "/images/farmer4.jpg",
            region: "Saint-Louis",
            specialization: "Aquaponie",
            yearsExperience: 6,
            activeProjects: 1,
            completedProjects: 3,
            bio: "Pionnière dans le domaine de l'aquaponie au Sénégal. Combine la culture de légumes et l'élevage de poissons dans un système durable et économe en eau.",
            rating: 4.6,
            reviewCount: 18,
            verified: true,
            categories: ["Maraîchage", "Irrigation"],
            currentProject: {
                title: "Ferme aquaponique moderne",
                progress: 45,
                funding: 380000,
                goal: 850000
            }
        },
        {
            id: 5,
            name: "Mandicou Ba",
            photo: "/images/farmer5.jpg",
            region: "Dakar",
            specialization: "Agriculture urbaine",
            yearsExperience: 5,
            activeProjects: 2,
            completedProjects: 4,
            bio: "Spécialiste de l'agriculture urbaine et périurbaine. Développe des solutions innovantes pour produire des aliments de qualité en zone urbaine avec peu d'espace.",
            rating: 4.5,
            reviewCount: 23,
            verified: true,
            categories: ["Maraîchage", "Transformation"],
            currentProject: {
                title: "Jardins urbains verticaux",
                progress: 30,
                funding: 210000,
                goal: 700000
            }
        },
        {
            id: 6,
            name: "Aïda Faye",
            photo: "/images/farmer6.jpg",
            region: "Louga",
            specialization: "Arboriculture",
            yearsExperience: 10,
            activeProjects: 1,
            completedProjects: 7,
            bio: "Experte en arboriculture fruitière adaptée aux régions sahéliennes. Travaille sur des variétés résistantes à la sécheresse et économes en eau.",
            rating: 4.7,
            reviewCount: 29,
            verified: true,
            categories: ["Agriculture Biologique"],
            currentProject: {
                title: "Verger d'agrumes résistants",
                progress: 55,
                funding: 440000,
                goal: 800000
            }
        }
    ];

    // Filter farmers based on selected criteria
    const filteredFarmers = farmers.filter(farmer => {
        // Filter by region
        if (filterRegion !== 'all' && farmer.region.toLowerCase() !== filterRegion) {
            return false;
        }

        // Filter by category
        if (filterCategory !== 'all' && !farmer.categories.some(cat => cat.toLowerCase().includes(filterCategory))) {
            return false;
        }

        return true;
    });

    // Sort farmers based on selected sorting option
    const sortedFarmers = [...filteredFarmers].sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        } else if (sortBy === 'projects') {
            return (b.activeProjects + b.completedProjects) - (a.activeProjects + a.completedProjects);
        } else {
            // Default: recommended (combination of rating and experience)
            return (b.rating * 0.7 + b.yearsExperience * 0.3) - (a.rating * 0.7 + a.yearsExperience * 0.3);
        }
    });

    // Format currency in CFA Francs
    // interface Farmer {
    //     id: number;
    //     name: string;
    //     photo: string;
    //     region: string;
    //     specialization: string;
    //     yearsExperience: number;
    //     activeProjects: number;
    //     completedProjects: number;
    //     bio: string;
    //     rating: number;
    //     reviewCount: number;
    //     verified: boolean;
    //     categories: string[];
    //     currentProject?: CurrentProject;
    // }

    // interface CurrentProject {
    //     title: string;
    //     progress: number;
    //     funding: number;
    //     goal: number;
    // }

    // interface Region {
    //     id: string;
    //     name: string;
    // }

    // interface Category {
    //     id: string;
    //     name: string;
    // }

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Head>
                <title>Agriculteurs - SunuAgri Sénégal</title>
                <meta name="description" content="Découvrez et soutenez les agriculteurs sur SunuAgri Sénégal" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}>
                <div className="flex items-center justify-between p-4 border-b border-green-700">
                    <h1 className="text-xl font-bold">SunuAgri</h1>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/investisseur" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                <Home className="mr-3" size={20} />
                                <span>Tableau de bord</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/investisseur/projet" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                <TrendingUp className="mr-3" size={20} />
                                <span>Projets</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/investisseur/portefeuille" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                <ChartBar className="mr-3" size={20} />
                                <span>Mon portefeuille</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/investisseur/agriculteur" className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600">
                                <Users className="mr-3" size={20} />
                                <span>Agriculteurs</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/investisseur/transactions" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                <CreditCard className="mr-3" size={20} />
                                <span>Transactions</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/investisseur/message" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                <MessageSquare className="mr-3" size={20} />
                                <span>Messages</span>
                            </Link>
                        </li> */}
                    </ul>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
                        <ul className="space-y-2">
                            {/* <li>
                                <Link href="/investisseur/settings" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                    <Settings className="mr-3" size={20} />
                                    <span>Paramètres</span>
                                </Link>
                            </li> */}
                            <li>
                                <Link href="/" className="flex items-center p-2 rounded-md hover:bg-green-700">
                                    <LogOut className="mr-3" size={20} />
                                    <span>Déconnexion</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <header className="bg-white shadow">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4">
                                <Menu size={24} />
                            </button>
                            <h2 className="text-xl font-semibold text-gray-800">Agriculteurs</h2>
                        </div>
                        {/* <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Rechercher un agriculteur..."
                                    className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>
                        </div> */}
                    </div>
                </header>

                {/* Farmers Content */}
                <main className="p-6">
                    {/* Filters Section */}
                    <section className="mb-8">
                        <div className="bg-white p-5 rounded-lg shadow">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4 md:mb-0">Trouver des agriculteurs</h3>

                                <div className="flex flex-wrap gap-2">
                                    {/* Sort dropdown */}
                                    <div className="relative">
                                        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                                            <Filter size={16} className="mr-2" />
                                            <span>Trier par: {
                                                sortBy === 'recommended' ? 'Recommandés' :
                                                    sortBy === 'rating' ? 'Évaluation' :
                                                        'Projets'
                                            }</span>
                                            <ChevronDown size={16} className="ml-2" />
                                        </button>
                                        {/* Dropdown menu would go here */}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Region filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setFilterRegion('all')}
                                            className={`px-3 py-1.5 rounded-full text-sm ${filterRegion === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Toutes
                                        </button>
                                        {regions.map(region => (
                                            <button
                                                key={region.id}
                                                onClick={() => setFilterRegion(region.id)}
                                                className={`px-3 py-1.5 rounded-full text-sm ${filterRegion === region.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {region.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Category filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setFilterCategory('all')}
                                            className={`px-3 py-1.5 rounded-full text-sm ${filterCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Toutes
                                        </button>
                                        {categories.map(category => (
                                            <button
                                                key={category.id}
                                                onClick={() => setFilterCategory(category.id)}
                                                className={`px-3 py-1.5 rounded-full text-sm ${filterCategory === category.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Farmers List */}
                    <section className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            {filteredFarmers.length} agriculteur{filteredFarmers.length > 1 ? 's' : ''} trouvé{filteredFarmers.length > 1 ? 's' : ''}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedFarmers.map(farmer => (
                                <div key={farmer.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    {/* Farmer Header */}
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center">
                                            <div className="relative mr-4">
                                                {/* <Image 
                          src={farmer.photo || "/api/placeholder/64/64"} 
                          alt={farmer.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover w-16 h-16"
                        /> */}
                                                {/* {farmer.verified && (
                          <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full p-0.5">
                            <Check size={14} className="text-white" />
                          </div>
                        )} */}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-black/75">{farmer.name}</h4>

                                                <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full p-0.5">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                                    <MapPin size={14} className="mr-1" />
                                                    {farmer.region}
                                                </div>
                                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                                    <Briefcase size={14} className="mr-1" />
                                                    {farmer.specialization}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Farmer Rating & Experience */}
                                    <div className="flex border-b border-gray-100">
                                        <div className="flex-1 p-3 text-center border-r border-gray-100">
                                            <div className="flex items-center justify-center">
                                                <Star size={16} className="text-yellow-500 mr-1" />
                                                <span className="font-medium text-black/75">{farmer.rating}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{farmer.reviewCount} avis</div>
                                        </div>
                                        <div className="flex-1 p-3 text-center">
                                            <div className="font-medium text-black/75">{farmer.yearsExperience} ans</div>
                                            <div className="text-xs text-gray-500 mt-1">d&apos;expérience</div>
                                        </div>
                                    </div>

                                    {/* Farmer Bio */}
                                    <div className="p-4 border-b border-gray-100">
                                        <p className="text-sm text-gray-600 line-clamp-3">{farmer.bio}</p>
                                    </div>

                                    {/* Current Project */}
                                    {farmer.currentProject && (
                                        <div className="p-4 border-b border-gray-100">
                                            <h5 className="text-sm font-medium text-gray-700 mb-2">Projet en cours</h5>
                                            <div className="text-sm font-medium text-black/75 mb-1">{farmer.currentProject.title}</div>
                                            <div className="mb-3">
                                                <div className="flex justify-between text-xs text-black/75 mb-1">
                                                    <span>{formatCurrency(farmer.currentProject.funding)}</span>
                                                    <span>{farmer.currentProject.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-green-500 h-2 rounded-full"
                                                        style={{ width: `${farmer.currentProject.progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>Objectif: {formatCurrency(farmer.currentProject.goal)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="p-4 flex space-x-2">
                                        <Link
                                            href={`/dashboard/investor/farmers/${farmer.id}`}
                                            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium"
                                        >
                                            Voir le profil
                                        </Link>
                                        <button
                                            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-green-600 p-2 rounded-md"
                                        >
                                            <MessageCircle size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show if no farmers match filters */}
                        {filteredFarmers.length === 0 && (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <Users size={64} className="mx-auto text-gray-300 mb-4" />
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Aucun agriculteur trouvé</h4>
                                <p className="text-gray-500">Essayez de modifier vos filtres pour voir plus de résultats.</p>
                                <button
                                    onClick={() => {
                                        setFilterRegion('all');
                                        setFilterCategory('all');
                                    }}
                                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Pagination */}
                    {filteredFarmers.length > 0 && (
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center space-x-1">
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                    Précédent
                                </button>
                                <button className="px-3 py-1 border border-gray-300 bg-green-50 text-green-600 font-medium rounded-md text-sm hover:bg-green-100">
                                    1
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                    2
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                    3
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Featured Agricultural Resources */}
                    <section>
                        <div className="bg-white p-5 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Ressources pour investisseurs</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                                    <h4 className="font-medium text-black/75 mb-2">Guide d&apos;investissement rural</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Comment évaluer le potentiel d&apos;un agriculteur et son projet avant d&apos;investir
                                    </p>
                                    <Link href="/dashboard/investor/resources/guide" className="text-green-600 text-sm hover:underline">
                                        Télécharger le guide →
                                    </Link>
                                </div>

                                <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                                    <h4 className="font-medium text-black/75 mb-2">Comprendre l&apos;agriculture au Sénégal</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Les spécificités régionales et les cultures adaptées à chaque zone
                                    </p>
                                    <Link href="/dashboard/investor/resources/regions" className="text-green-600 text-sm hover:underline">
                                        En savoir plus →
                                    </Link>
                                </div>

                                <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                                    <h4 className="font-medium text-black/75 mb-2">Webinaire: Rencontrez nos agriculteurs</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Participez à notre prochain webinaire le 28 avril pour rencontrer nos agriculteurs vedettes
                                    </p>
                                    <Link href="/dashboard/investor/events/webinar" className="text-green-600 text-sm hover:underline">
                                        S&apos;inscrire →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}