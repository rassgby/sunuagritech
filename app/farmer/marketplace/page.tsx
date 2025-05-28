'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    Menu, X, Home, TrendingUp, Cloud, Layers,
    ShoppingBag, MessageSquare, LogOut,
    Search, ChevronDown, Filter, MapPin, Star, TrendingDown,
    ShoppingCart, AlertCircle, Truck, Calendar, ChevronRight
} from 'lucide-react';

// Types pour le marché
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    unit: string;
    seller: string;
    rating: number;
    image: string;
    category: string;
    inStock: boolean;
    discountPercentage?: number;
    trend?: "up" | "down";
    priceChange?: string;
}

interface UpcomingEvent {
    id: number;
    name: string;
    description: string;
    date: string;
    organizer: string;
    location: string;
}

interface Category {
    id: number;
    name: string;
    count: number;
}

interface Location {
    id: number;
    name: string;
    count: number;
}

interface MarketData {
    featuredProducts: Product[];
    trendingProducts: Product[];
    upcomingDeals: UpcomingEvent[];
    categories: Category[];
    locations: Location[];
}

// Données simulées pour le marché
const initialMarketData: MarketData = {
    featuredProducts: [
        {
            id: 1,
            name: "Semences de maïs",
            description: "Variété résistante à la sécheresse",
            price: 5000,
            unit: "kg",
            seller: "AgriSemences SA",
            rating: 4.8,
            image: "semencem",
            category: "semences",
            inStock: true,
            discountPercentage: 10
        },
        {
            id: 2,
            name: "Engrais organique",
            description: "Engrais naturel pour cultures maraîchères",
            price: 12000,
            unit: "sac de 25kg",
            seller: "EcoFarm Solutions",
            rating: 4.5,
            image: "/images/mere.jpg",
            category: "engrais",
            inStock: true,
            discountPercentage: 0
        },
        {
            id: 3,
            name: "Système d'irrigation goutte-à-goutte",
            description: "Kit complet pour 1 hectare",
            price: 150000,
            unit: "kit",
            seller: "HydroTech Sénégal",
            rating: 4.9,
            image: "drip_irrigation",
            category: "équipement",
            inStock: true,
            discountPercentage: 15
        }
    ],
    trendingProducts: [
        {
            id: 4,
            name: "Semences de tomates",
            description: "Variété adaptée au climat sénégalais",
            price: 3500,
            unit: "100g",
            seller: "BioSemences",
            rating: 4.7,
            image: "tomato_seeds",
            category: "semences",
            inStock: true,
            trend: "up",
            priceChange: "+8%"
        },
        {
            id: 5,
            name: "Insecticide naturel",
            description: "À base de neem, sans produits chimiques",
            price: 8000,
            unit: "litre",
            seller: "NaturaBio",
            rating: 4.3,
            image: "natural_insecticide",
            category: "protection",
            inStock: true,
            trend: "up",
            priceChange: "+5%"
        },
        {
            id: 6,
            name: "Oignons rouges",
            description: "Sac de 50kg, récolte récente",
            price: 25000,
            unit: "sac de 50kg",
            seller: "CoopAgri Thiès",
            rating: 4.6,
            image: "red_onions",
            category: "produits",
            inStock: false,
            trend: "down",
            priceChange: "-10%"
        }
    ],
    upcomingDeals: [
        {
            id: 7,
            name: "Grande vente de semences",
            description: "Réductions sur toutes les semences de légumes",
            date: "1-5 mai 2025",
            organizer: "Association des Producteurs",
            location: "Marché central de Thiès"
        },
        {
            id: 8,
            name: "Foire agricole annuelle",
            description: "Équipements, intrants et formations",
            date: "15-18 mai 2025",
            organizer: "Ministère de l'Agriculture",
            location: "CICES, Dakar"
        }
    ],
    categories: [
        { id: 1, name: "Semences", count: 45 },
        { id: 2, name: "Engrais", count: 23 },
        { id: 3, name: "Protection des cultures", count: 18 },
        { id: 4, name: "Équipements", count: 34 },
        { id: 5, name: "Outils", count: 27 },
        { id: 6, name: "Irrigation", count: 15 },
        { id: 7, name: "Produits agricoles", count: 56 },
        { id: 8, name: "Services", count: 12 }
    ],
    locations: [
        { id: 1, name: "Thiès", count: 120 },
        { id: 2, name: "Dakar", count: 187 },
        { id: 3, name: "Saint-Louis", count: 78 },
        { id: 4, name: "Kaolack", count: 65 },
        { id: 5, name: "Diourbel", count: 42 },
        { id: 6, name: "Ziguinchor", count: 36 }
    ]
};

// Composant de carte produit
interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
                {/* Emplacement pour l'image - dans un vrai produit, on utiliserait une vraie image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>

                {/* Badge pour réduction */}
                {product.discountPercentage && product.discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discountPercentage}%
                    </div>
                )}

                {/* Badge pour tendance */}
                {product.trend === "up" && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {product.priceChange}
                    </div>
                )}

                {product.trend === "down" && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        {product.priceChange}
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mb-2">{product.description}</p>

                <div className="flex items-center justify-between mb-3">
                    <div>
                        <span className="text-xl font-bold text-gray-900">{product.price} FCFA</span>
                        <span className="text-xs text-gray-500">/{product.unit}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.seller}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700 transition-colors flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Ajouter
                    </button>
                    <button className="bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded hover:bg-gray-200 transition-colors">
                        Détails
                    </button>
                </div>

                {!product.inStock && (
                    <div className="mt-2 flex items-center text-xs text-red-500">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Rupture de stock
                    </div>
                )}
            </div>
        </div>
    );
};

// Composant d'événement à venir
const UpcomingEvent = ({ event }: { event: UpcomingEvent }) => {
    return (
        <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg text-gray-900">{event.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{event.description}</p>
            <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Truck className="h-4 w-4 text-green-500 mr-2" />
                    <span>{event.organizer}</span>
                </div>
                <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-green-500 mr-2" />
                    <span>{event.location}</span>
                </div>
            </div>
            <div className="mt-4">
                <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                    En savoir plus
                    <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>
        </div>
    );
};

export default function FarmerMarketplace() {
    // États
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [marketData] = useState<MarketData>(initialMarketData);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [cart] = useState<Product[]>([]);

    // Fonction pour simuler une recherche
    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (searchQuery.trim() === '') return;

        setSearchLoading(true);

        // Simuler un délai de chargement
        setTimeout(() => {
            // Dans une application réelle, nous ferions une requête API ici
            setSearchLoading(false);
        }, 800);
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
                            <Link href="/farmer/projet" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Layers className="mr-4 h-6 w-6" />
                                Mes projets
                            </Link>
                            <Link href="/farmer/weather" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <Cloud className="mr-4 h-6 w-6" />
                                Météo
                            </Link>
                            <Link href="/farmer/marketplace" className="bg-green-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <ShoppingBag className="mr-4 h-6 w-6" />
                                Marché
                            </Link>
                            <Link href="/farmer/messages" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <MessageSquare className="mr-4 h-6 w-6" />
                                Messages
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
                            <Link href="/farmer/projet" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Layers className="mr-3 h-6 w-6" />
                                Mes projets
                            </Link>
                            <Link href="/farmer/weather" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <Cloud className="mr-3 h-6 w-6" />
                                Météo
                            </Link>
                            <Link href="/farmer/marketplace" className="bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <ShoppingBag className="mr-3 h-6 w-6" />
                                Marché
                            </Link>
                            <Link href="/farmer/messages" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <MessageSquare className="mr-3 h-6 w-6" />
                                Messages
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
                                <h1 className="text-2xl font-semibold text-gray-900">Marché Agricole</h1>
                                <div className="flex items-center space-x-4">
                                    <button className="relative bg-white p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <ShoppingCart className="h-6 w-6" />
                                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                            {cart.length}
                                        </span>
                                    </button>
                                    <button className="bg-white p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <MessageSquare className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {/* Barre de recherche */}
                            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                                <div className="p-4">
                                    <form onSubmit={handleSearch} className="relative">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <div className="flex-1 relative rounded-md">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Search className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="Rechercher des produits, semences, équipements..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                {searchLoading && (
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                        <div className="h-4 w-4 border-t-2 border-r-2 border-green-500 rounded-full animate-spin"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    onClick={() => setShowFilters(!showFilters)}
                                                >
                                                    <Filter className="h-5 w-5 mr-2 text-gray-400" />
                                                    Filtres
                                                    <ChevronDown className={`h-4 w-4 ml-1 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    Rechercher
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    {/* Filtres étendus */}
                                    {showFilters && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-black/60">
                                            <div>
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 text-black/50">
                                                    Catégorie
                                                </label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md text-black/60"
                                                    value={categoryFilter}
                                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                                >
                                                    <option value="">Toutes les catégories</option>
                                                    {marketData.categories.map(category => (
                                                        <option key={category.id} value={category.id.toString()}>
                                                            {category.name} ({category.count})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                    Localisation
                                                </label>
                                                <select
                                                    id="location"
                                                    name="location"
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                                    value={locationFilter}
                                                    onChange={(e) => setLocationFilter(e.target.value)}
                                                >
                                                    <option value="">Toutes les localisations</option>
                                                    {marketData.locations.map(location => (
                                                        <option key={location.id} value={location.id.toString()}>
                                                            {location.name} ({location.count})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                    Prix (FCFA)
                                                </label>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        name="min-price"
                                                        id="min-price"
                                                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Min"
                                                    />
                                                    <span className="text-gray-500">à</span>
                                                    <input
                                                        type="number"
                                                        name="max-price"
                                                        id="max-price"
                                                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="Max"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Disponibilité
                                                </label>
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="in-stock"
                                                            name="availability"
                                                            type="radio"
                                                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                                        />
                                                        <label htmlFor="in-stock" className="ml-3 block text-sm text-gray-700">
                                                            En stock uniquement
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="all-products"
                                                            name="availability"
                                                            type="radio"
                                                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                                                            defaultChecked
                                                        />
                                                        <label htmlFor="all-products" className="ml-3 block text-sm text-gray-700">
                                                            Tous les produits
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Notation
                                                </label>
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="rating-4"
                                                            name="rating"
                                                            type="checkbox"
                                                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="rating-4" className="ml-3 flex items-center text-sm text-gray-700">
                                                            <div className="flex">
                                                                {[1, 2, 3, 4].map(star => (
                                                                    <Star key={star} className="h-4 w-4 text-yellow-400" />
                                                                ))}
                                                            </div>
                                                            <span className="ml-1">et plus</span>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="rating-3"
                                                            name="rating"
                                                            type="checkbox"
                                                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="rating-3" className="ml-3 flex items-center text-sm text-gray-700">
                                                            <div className="flex">
                                                                {[1, 2, 3].map(star => (
                                                                    <Star key={star} className="h-4 w-4 text-yellow-400" />
                                                                ))}
                                                                <Star className="h-4 w-4 text-gray-300" />
                                                            </div>
                                                            <span className="ml-1">et plus</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Options supplémentaires
                                                </label>
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="discounted"
                                                            name="discounted"
                                                            type="checkbox"
                                                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="discounted" className="ml-3 block text-sm text-gray-700">
                                                            Produits en promotion
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="trending"
                                                            name="trending"
                                                            type="checkbox"
                                                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="trending" className="ml-3 block text-sm text-gray-700">
                                                            Produits populaires
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Produits en vedette */}
                            <div className="mt-6">
                                <h2 className="text-lg font-medium text-gray-900">Produits en vedette</h2>
                                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {marketData.featuredProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>

                            {/* Produits tendance */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Produits tendance</h2>
                                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                        Voir tout
                                    </button>
                                </div>
                                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {marketData.trendingProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>

                            {/* Section événements à venir */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Événements à venir</h2>
                                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                        Voir le calendrier
                                    </button>
                                </div>
                                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 text-black/60">
                                    {marketData.upcomingDeals.map(event => (
                                        <UpcomingEvent key={event.id} event={event} />
                                    ))}
                                </div>
                            </div>

                            {/* Section des catégories populaires */}
                            <div className="mt-8">
                                <h2 className="text-lg font-medium text-gray-900">Catégories populaires</h2>
                                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                    {marketData.categories.slice(0, 6).map(category => (
                                        <div key={category.id} className="bg-white shadow overflow-hidden rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="h-12 w-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                                {/* Ici on pourrait ajouter des icônes spécifiques pour chaque catégorie */}
                                                <ShoppingBag className="h-6 w-6 text-green-600" />
                                            </div>
                                            <h3 className="text-center text-sm font-medium text-gray-900">{category.name}</h3>
                                            <p className="text-center text-xs text-gray-500 mt-1">{category.count} produits</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section des vendeurs populaires */}
                            <div className="mt-8 mb-6">
                                <h2 className="text-lg font-medium text-gray-900">Vendeurs recommandés</h2>
                                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="bg-white shadow overflow-hidden rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-bold">AS</span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-900">AgriSemences SA</h3>
                                                <div className="flex items-center mt-1">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <Star key={star} className="h-3 w-3 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                    <span className="ml-1 text-xs text-gray-500">(124 avis)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-500">Fournisseur de semences de qualité depuis 2010, spécialiste en variétés adaptées au climat sahélien.</p>
                                        <div className="mt-4">
                                            <button className="w-full bg-green-50 text-green-700 text-sm py-2 px-3 rounded hover:bg-green-100 transition-colors">
                                                Voir la boutique
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow overflow-hidden rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-bold">HT</span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-900">HydroTech Sénégal</h3>
                                                <div className="flex items-center mt-1">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4].map(star => (
                                                            <Star key={star} className="h-3 w-3 text-yellow-400" />
                                                        ))}
                                                        <Star className="h-3 w-3 text-gray-300" />
                                                    </div>
                                                    <span className="ml-1 text-xs text-gray-500">(89 avis)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-500">Solutions d&apos;irrigation innovantes et durables pour optimiser l&apos;utilisation de l&apos;eau dans l&apos;agriculture.</p>
                                        <div className="mt-4">
                                            <button className="w-full bg-green-50 text-green-700 text-sm py-2 px-3 rounded hover:bg-green-100 transition-colors">
                                                Voir la boutique
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow overflow-hidden rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 font-bold">CA</span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-900">CoopAgri Thiès</h3>
                                                <div className="flex items-center mt-1">
                                                    <div className="flex">
                                                        {[1, 2, 3, 4].map(star => (
                                                            <Star key={star} className="h-3 w-3 text-yellow-400" />
                                                        ))}
                                                        <Star className="h-3 w-3 text-gray-300" />
                                                    </div>
                                                    <span className="ml-1 text-xs text-gray-500">(76 avis)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-500">Coopérative agricole offrant des produits frais et de qualité directement des producteurs de la région de Thiès.</p>
                                        <div className="mt-4">
                                            <button className="w-full bg-green-50 text-green-700 text-sm py-2 px-3 rounded hover:bg-green-100 transition-colors">
                                                Voir la boutique
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pagination pour la navigation */}
                            <div className="mt-8 mb-12 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Précédent</a>
                                    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Suivant</a>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Affichage de <span className="font-medium">1</span> à <span className="font-medium">12</span> sur <span className="font-medium">97</span> résultats
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                <span className="sr-only">Précédent</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                            <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">1</a>
                                            <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                                            <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                            <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                                            <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                                <span className="sr-only">Suivant</span>
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <footer className="mt-8 bg-white shadow rounded-lg p-6">
                                <div className="mt-6 text-center text-xs text-gray-500">
                                    © 2025 SunuAgri. Tous droits réservés.
                                </div>
                            </footer>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}