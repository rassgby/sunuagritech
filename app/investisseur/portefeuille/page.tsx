// pages/dashboard/investor/portfolio/index.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    Menu, X, Home, TrendingUp, ChartBar, Users,
    CreditCard, LogOut,
    Search, Download, ArrowUp, ArrowDown, Info, PieChart, LineChart
} from 'lucide-react';

// J'ai commenté cette ligne car j'ai enlevé Messages dans la sidebar
// import {
//     Menu, X, Home, TrendingUp, ChartBar, Users,
//     CreditCard, MessageSquare, LogOut,
//     Search, Download, ArrowUp, ArrowDown, Info, PieChart, LineChart
// } from 'lucide-react';
import Image from 'next/image';

export default function InvestorPortfolio() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('investments');

    // Mock data for portfolio
    const portfolioSummary = {
        totalInvested: 3000000,
        availableBalance: 450000,
        totalEarnings: 450000,
        totalReturn: 15,
        activeProjects: 7,
        completedProjects: 4,
        yearToDateReturn: 8.5,
    };

    const portfolioAllocation = [
        { category: "Maraîchage", amount: 1200000, percentage: 40, color: "bg-green-500" },
        { category: "Élevage", amount: 750000, percentage: 25, color: "bg-blue-500" },
        { category: "Céréales", amount: 600000, percentage: 20, color: "bg-yellow-500" },
        { category: "Transformation", amount: 300000, percentage: 10, color: "bg-purple-500" },
        { category: "Irrigation", amount: 150000, percentage: 5, color: "bg-red-500" }
    ];

    const investments = [
        {
            id: 1,
            title: "Culture biologique de mangues",
            farmer: "Fatou Ndiaye",
            location: "Région de Ziguinchor",
            investmentDate: "15/02/2025",
            amount: 500000,
            status: "En cours",
            roi: 15,
            progress: 65,
            maturityDate: "15/08/2025",
            image: "/images/moringa.jpg"
        },
        {
            id: 2,
            title: "Projet d'élevage avicole",
            farmer: "Ibrahim Diop",
            location: "Région de Thiès",
            investmentDate: "03/03/2025",
            amount: 750000,
            status: "En cours",
            roi: 18,
            progress: 40,
            maturityDate: "03/09/2025",
            image: "/images/article_cote_divoire_eleveur_ivoirien_de_poulet_de_chair-poulet_credit_programme_dappui_a_la_production_avicole_nationale850.jpg"
        },
        {
            id: 3,
            title: "Production de mil et sorgho",
            farmer: "Amadou Sow",
            location: "Région de Kaolack",
            investmentDate: "22/01/2025",
            amount: 450000,
            status: "En cours",
            roi: 12,
            progress: 80,
            maturityDate: "22/07/2025",
            image: "/images/mere.jpg"
        },
        {
            id: 4,
            title: "Culture hydroponique de légumes",
            farmer: "Mariama Diallo",
            location: "Région de Dakar",
            investmentDate: "05/12/2024",
            amount: 600000,
            status: "En cours",
            roi: 20,
            progress: 50,
            maturityDate: "05/06/2025",
            image: "/images/hidro.jpg"
        }
    ];

    const transactions = [
        {
            id: 101,
            type: "Investissement",
            project: "Culture biologique de mangues",
            date: "15/02/2025",
            amount: -500000,
            status: "Complété"
        },
        {
            id: 102,
            type: "Dépôt",
            project: null,
            date: "10/02/2025",
            amount: 1000000,
            status: "Complété"
        },
        {
            id: 103,
            type: "Investissement",
            project: "Projet d'élevage avicole",
            date: "03/03/2025",
            amount: -750000,
            status: "Complété"
        },
        {
            id: 104,
            type: "Retour sur investissement",
            project: "Riziculture en Casamance",
            date: "01/03/2025",
            amount: 270000,
            status: "Complété"
        },
        {
            id: 105,
            type: "Investissement",
            project: "Production de mil et sorgho",
            date: "22/01/2025",
            amount: -450000,
            status: "Complété"
        }
    ];

    const completedProjects = [
        {
            id: 201,
            title: "Riziculture en Casamance",
            farmer: "Sophie Mendy",
            date: "05/09/2024 - 01/03/2025",
            investedAmount: 600000,
            returnedAmount: 720000,
            roi: 20,
            image: "/images/rice.jpg"
        },
        {
            id: 202,
            title: "Production de tomates sous serre",
            farmer: "Omar Seck",
            date: "10/07/2024 - 10/01/2025",
            investedAmount: 450000,
            returnedAmount: 517500,
            roi: 15,
            image: "/images/tomatoes.jpg"
        }
    ];

    // Format currency in CFA Francs
    // interface PortfolioSummary {
    //     totalInvested: number;
    //     availableBalance: number;
    //     totalEarnings: number;
    //     totalReturn: number;
    //     activeProjects: number;
    //     completedProjects: number;
    //     yearToDateReturn: number;
    // }

    // interface PortfolioAllocation {
    //     category: string;
    //     amount: number;
    //     percentage: number;
    //     color: string;
    // }

    // interface Investment {
    //     id: number;
    //     title: string;
    //     farmer: string;
    //     location: string;
    //     investmentDate: string;
    //     amount: number;
    //     status: string;
    //     roi: number;
    //     progress: number;
    //     maturityDate: string;
    //     image: string;
    // }

    // interface Transaction {
    //     id: number;
    //     type: string;
    //     project: string | null;
    //     date: string;
    //     amount: number;
    //     status: string;
    // }

    // interface CompletedProject {
    //     id: number;
    //     title: string;
    //     farmer: string;
    //     date: string;
    //     investedAmount: number;
    //     returnedAmount: number;
    //     roi: number;
    //     image: string;
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
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}>
                <div className="flex items-center justify-between p-4 border-b border-green-700">
                    <h1 className="text-xl font-bold">AgriTech</h1>
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
                            <Link href="/investisseur/portefeuille" className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600">
                                <ChartBar className="mr-3" size={20} />
                                <span>Mon portefeuille</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/investisseur/agriculteur" className="flex items-center p-2 rounded-md hover:bg-green-700">
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
                            <h2 className="text-xl font-semibold text-gray-800">Mon portefeuille</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center text-green-600 hover:text-green-700">
                                <Download size={18} className="mr-1" />
                                <span className="text-sm">Rapport PDF</span>
                            </button>
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Rechercher..."
                                    className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Portfolio Content */}
                <main className="p-6">
                    {/* Portfolio Summary */}
                    <section className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-gray-500">Total investi</h4>
                                <p className="text-2xl font-bold text-gray-800">{formatCurrency(portfolioSummary.totalInvested)}</p>
                                <p className="text-sm text-gray-500">{portfolioSummary.activeProjects} projets actifs</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-gray-500">Solde disponible</h4>
                                <p className="text-2xl font-bold text-blue-600">{formatCurrency(portfolioSummary.availableBalance)}</p>
                                <div className="flex items-center mt-1">
                                    <button className="text-xs text-white bg-green-600 hover:bg-green-700 rounded px-2 py-1 mr-1">Déposer</button>
                                    <button className="text-xs text-white bg-blue-600 hover:bg-blue-700 rounded px-2 py-1">Retirer</button>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-gray-500">Rendement total</h4>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolioSummary.totalEarnings)}</p>
                                <div className="flex items-center text-sm text-green-600">
                                    <ArrowUp size={14} className="mr-1" />
                                    <span>{portfolioSummary.totalReturn}% sur investissement</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow">
                                <h4 className="text-sm font-medium text-gray-500">Performance 2025</h4>
                                <p className="text-2xl font-bold text-gray-800">{portfolioSummary.yearToDateReturn}%</p>
                                <div className="flex items-center text-sm text-green-600">
                                    <ArrowUp size={14} className="mr-1" />
                                    <span>+2.3% depuis le dernier mois</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Portfolio Allocation Chart */}
                    <section className="mb-8 bg-white p-5 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Répartition du portefeuille</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-2">
                                {/* Simplified pie chart representation */}
                                <div className="relative h-64 flex items-center justify-center">
                                    <PieChart size={200} className="text-gray-400" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500">Total investi</p>
                                            <p className="text-xl font-bold text-black/75">{formatCurrency(portfolioSummary.totalInvested)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="space-y-4">
                                    {portfolioAllocation.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                                                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`${item.color} h-2 rounded-full`}
                                                        style={{ width: `${item.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="ml-4 text-sm font-medium">{formatCurrency(item.amount)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-center text-green-600 hover:text-green-700">
                                        <Info size={16} className="mr-2" />
                                        <span className="text-sm">Diversification recommandée: Augmentez vos investissements en irrigation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Portfolio Details Tabs */}
                    <section className="mb-8">
                        <div className="border-b border-gray-200 mb-6">
                            <ul className="flex flex-wrap -mb-px">
                                <li className="mr-2">
                                    <button
                                        className={`inline-block py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'investments'
                                                ? 'border-green-600 text-green-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        onClick={() => setActiveTab('investments')}
                                    >
                                        Investissements en cours
                                    </button>
                                </li>
                                <li className="mr-2">
                                    <button
                                        className={`inline-block py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'completed'
                                                ? 'border-green-600 text-green-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        onClick={() => setActiveTab('completed')}
                                    >
                                        Projets terminés
                                    </button>
                                </li>
                                <li className="mr-2">
                                    <button
                                        className={`inline-block py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'transactions'
                                                ? 'border-green-600 text-green-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        onClick={() => setActiveTab('transactions')}
                                    >
                                        Historique des transactions
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`inline-block py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'performance'
                                                ? 'border-green-600 text-green-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                        onClick={() => setActiveTab('performance')}
                                    >
                                        Performance
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Active Investments Tab */}
                        {activeTab === 'investments' && (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d&apos;investissement</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI attendu</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progression</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de maturité</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {investments.map((investment) => (
                                                <tr key={investment.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <Image
                                                                    width={40}
                                                                    height={40}
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    src={investment.image}
                                                                    alt={investment.title}
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{investment.title}</div>
                                                                <div className="text-sm text-gray-500">{investment.farmer} • {investment.location}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investment.investmentDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(investment.amount)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {investment.roi}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                                                            <div
                                                                className="bg-green-500 h-2 rounded-full"
                                                                style={{ width: `${investment.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">{investment.progress}%</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{investment.maturityDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link href={`/dashboard/investor/portfolio/${investment.id}`} className="text-green-600 hover:text-green-900">
                                                            Détails
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Completed Projects Tab */}
                        {activeTab === 'completed' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {completedProjects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    width={120}
                                                    height={120}
                                                    className="h-32 w-32 object-cover"
                                                    src={project.image}
                                                    alt={project.title}
                                                />
                                            </div>
                                            <div className="p-4 flex-1">
                                                <h4 className="font-medium text-gray-900">{project.title}</h4>
                                                <p className="text-sm text-gray-500 mb-2">Par {project.farmer}</p>
                                                <p className="text-sm text-gray-600 mb-2">{project.date}</p>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Montant investi</p>
                                                        <p className="font-medium">{formatCurrency(project.investedAmount)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Montant retourné</p>
                                                        <p className="font-medium text-green-600">{formatCurrency(project.returnedAmount)}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-2 flex items-center text-sm">
                                                    <ArrowUp size={14} className="text-green-600 mr-1" />
                                                    <span className="text-green-600 font-medium">Rendement: {project.roi}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Transactions Tab */}
                        {activeTab === 'transactions' && (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {transactions.map((transaction) => (
                                                <tr key={transaction.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'Investissement'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : transaction.type === 'Retour sur investissement'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {transaction.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {transaction.project || '—'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <span className={transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}>
                                                            {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {transaction.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Performance Tab */}
                        {activeTab === 'performance' && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-medium text-gray-900">Performance du portefeuille</h4>
                                    <select className="border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                        <option>Derniers 6 mois</option>
                                        <option>Dernière année</option>
                                        <option>Depuis le début</option>
                                    </select>
                                </div>

                                <div className="h-64 relative flex items-center justify-center">
                                    <LineChart size={300} className="text-gray-400" />
                                    <div className="absolute top-0 left-0 right-0 text-center">
                                        <p className="text-sm text-gray-500">Graphique de performance (représentatif)</p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">ROI moyen</h5>
                                        <p className="text-2xl font-bold text-gray-900">15.4%</p>
                                        <div className="flex items-center text-sm text-green-600 mt-1">
                                            <ArrowUp size={14} className="mr-1" />
                                            <span>+2.1% mois précédent</span>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Meilleure performance</h5>
                                        <p className="text-2xl font-bold text-gray-900">20%</p>
                                        <p className="text-sm text-gray-500 mt-1">Projet hydroponique</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-gray-500 mb-1">Diversification</h5>
                                        <p className="text-2xl font-bold text-gray-900">5 catégories</p>
                                        <p className="text-sm text-gray-500 mt-1">Score: Bon</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-medium text-gray-900 mb-4">Performance par catégorie</h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant investi</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI moyen</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {portfolioAllocation.map((category) => (
                                                    <tr key={category.category} className="hover:bg-gray-50">
                                                        <td className="px-4 py-3 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                                                                <span className="text-sm font-medium text-gray-900">{category.category}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                            {formatCurrency(category.amount)}
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                            {Math.floor(Math.random() * 10) + 10}%
                                                        </td>
                                                        <td className="px-4 py-3 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                {Math.random() > 0.3 ? (
                                                                    <ArrowUp size={14} className="text-green-600 mr-1" />
                                                                ) : (
                                                                    <ArrowDown size={14} className="text-red-600 mr-1" />
                                                                )}
                                                                <span className={Math.random() > 0.3 ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                                                                    {Math.random() > 0.3 ? "+" : "-"}{(Math.random() * 5 + 1).toFixed(1)}%
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-green-600">
                                            <Info size={16} className="mr-2" />
                                            <span className="text-sm">Recommandation: Augmentez vos investissements dans les projets d&apos;irrigation qui montrent une forte performance.</span>
                                        </div>
                                        <button className="text-sm text-white bg-green-600 hover:bg-green-700 rounded px-4 py-2">
                                            Voir l&apos;analyse complète
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Investment Opportunities */}
                    <section className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Opportunités d&apos;investissement recommandées</h3>
                            <Link href="/dashboard/investor/projects" className="text-sm text-green-600 hover:text-green-700">
                                Voir tout
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                                <div className="relative h-40">
                                    <Image
                                        src="/images/moringa.jpg"
                                        fill
                                        className="object-cover"
                                        alt="Projet de culture de moringa"
                                    />
                                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-semibold">
                                        Nouveau
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium text-gray-900 mb-1">Culture de moringa bio</h4>
                                    <p className="text-sm text-gray-500 mb-3">Par Moussa Diallo • Région de Thiès</p>

                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="text-gray-500">Objectif de financement:</span>
                                        <span className="font-medium text-black/75">{formatCurrency(2500000)}</span>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1 text-black/75">
                                            <span>65% financé</span>
                                            <span>{formatCurrency(1625000)} / {formatCurrency(2500000)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm mb-4">
                                        <span className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                            <span className="text-gray-500">ROI estimé:</span>
                                        </span>
                                        <span className="font-medium text-green-600">18%</span>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                                        Investir maintenant
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                                <div className="relative h-40">
                                    <Image
                                        src="/images/irrigation.jpg"
                                        fill
                                        className="object-cover"
                                        alt="Projet d'irrigation"
                                    />
                                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-semibold">
                                        Populaire
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium text-gray-900 mb-1">Système d&apos;irrigation goutte à goutte</h4>
                                    <p className="text-sm text-gray-500 mb-3">Par Aissatou Sow • Région de Saint-Louis</p>

                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="text-gray-500">Objectif de financement:</span>
                                        <span className="font-medium text-black/75">{formatCurrency(3000000)}</span>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1 text-black/75">
                                            <span>82% financé</span>
                                            <span>{formatCurrency(2460000)} / {formatCurrency(3000000)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm mb-4">
                                        <span className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                            <span className="text-gray-500">ROI estimé:</span>
                                        </span>
                                        <span className="font-medium text-green-600">22%</span>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                                        Investir maintenant
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                                <div className="relative h-40">
                                    <Image
                                        src="/images/maraichage.jpg"
                                        fill
                                        className="object-cover"
                                        alt="Projet maraîchage"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium text-gray-900 mb-1">Maraîchage communautaire</h4>
                                    <p className="text-sm text-gray-500 mb-3">Par Coopérative Femmes de Fatick • Fatick</p>

                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="text-gray-500">Objectif de financement:</span>
                                        <span className="font-medium text-black/75">{formatCurrency(1800000)}</span>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1 text-black/75">
                                            <span>45% financé</span>
                                            <span>{formatCurrency(810000)} / {formatCurrency(1800000)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm mb-4">
                                        <span className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                            <span className="text-gray-500">ROI estimé:</span>
                                        </span>
                                        <span className="font-medium text-green-600">15%</span>
                                    </div>

                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                                        Investir maintenant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="mt-12 pt-8 border-t border-gray-200">
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-4">Resources d&apos;investissement</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Guide de l&apos;investisseur</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Stratégies de diversification</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">FAQ pour investisseurs</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Webinaires et formations</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-4">Support</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Centre d&apos;aide</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Contacter un conseiller</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Signaler un problème</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-4">Legal</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Conditions d&apos;utilisation</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Politique de confidentialité</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-green-600">Mentions légales</a></li>
                                </ul>
                            </div>
                        </div> */}

                        {/* <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                            <p>&copy; 2025 AgriTech. Tous droits réservés.</p>
                        </div> */}
                    </footer>
                </main>
            </div>
        </div>
    );
}