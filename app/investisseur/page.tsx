// pages/dashboard/investor/index.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  TrendingUp,
  ChartBar,
  Users,
  CreditCard,
  LogOut,
  Search,
  Filter,
  Heart,
} from "lucide-react";

import Image from "next/image";

export default function InvestorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const portfolioSummary = {
    totalInvested: 3000000,
    activeProjects: 7,
    expectedReturn: 3600000,
    averageROI: 20,
    impact: {
      farmers: 15,
      hectares: 12.5,
      jobs: 35,
    },
  };

  const projectCategories = [
    { name: "Maraîchage", count: 24 },
    { name: "Céréales", count: 18 },
    { name: "Élevage", count: 15 },
    { name: "Transformation", count: 12 },
    { name: "Irrigation", count: 9 },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Culture biologique de mangues",
      farmer: "Fatou Ndiaye",
      location: "Région de Ziguinchor",
      fundingGoal: 800000,
      currentFunding: 520000,
      progress: 65,
      remainingDays: 12,
      riskLevel: "Modéré",
      expectedROI: 15,
      image: "/images/cce5f204-1026-49bb-9755-620600ea7386_1-scaled.jpg",
    },
    {
      id: 2,
      title: "Projet d'élevage avicole",
      farmer: "Ibrahim Diop",
      location: "Région de Thiès",
      fundingGoal: 1200000,
      currentFunding: 840000,
      progress: 70,
      remainingDays: 8,
      riskLevel: "Faible",
      expectedROI: 18,
      image:
        "/images/article_cote_divoire_eleveur_ivoirien_de_poulet_de_chair-poulet_credit_programme_dappui_a_la_production_avicole_nationale850.jpg",
    },
    {
      id: 3,
      title: "Production de mil et sorgho",
      farmer: "Amadou Sow",
      location: "Région de Kaolack",
      fundingGoal: 650000,
      currentFunding: 390000,
      progress: 60,
      remainingDays: 15,
      riskLevel: "Modéré",
      expectedROI: 12,
      image: "/images/mere.jpg",
    },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const [userName, setUserName] = useState("Aucun utilisateur");

  useEffect(() => {
    const fetchUserName = () => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };
    fetchUserName();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>SunuAgri Sénégal - Plateforme de Microfinancement</title>
        <meta
          name="description"
          content="Connecter agriculteurs, investisseurs et marchés au Sénégal"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h1 className="text-xl font-bold">SunuAgri</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/investisseur"
                className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600"
              >
                <Home className="mr-3" size={20} />
                <span>Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link
                href="/investisseur/projet"
                className="flex items-center p-2 rounded-md hover:bg-green-700"
              >
                <TrendingUp className="mr-3" size={20} />
                <span>Projets</span>
              </Link>
            </li>
            <li>
              <Link
                href="/investisseur/portefeuille"
                className="flex items-center p-2 rounded-md hover:bg-green-700"
              >
                <ChartBar className="mr-3" size={20} />
                <span>Mon portefeuille</span>
              </Link>
            </li>
            <li>
              <Link
                href="/investisseur/agriculteur"
                className="flex items-center p-2 rounded-md hover:bg-green-700"
              >
                <Users className="mr-3" size={20} />
                <span>Agriculteurs</span>
              </Link>
            </li>
            <li>
              <Link
                href="/investisseur/transactions"
                className="flex items-center p-2 rounded-md hover:bg-green-700"
              >
                <CreditCard className="mr-3" size={20} />
                <span>Transactions</span>
              </Link>
            </li>
            {/* <li>
              <Link href="/investisseur/message" className="flex items-center p-2 rounded-md hover:bg-green-700">
                <MessageSquare className="mr-3" size={20} />
                <span>Messages</span>
              </Link>
            </li>     */}
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center">
                  <div className="ml-3">
                    <p className="text-base font-medium text-white">
                      {userName}
                    </p>
                    <p className="text-sm font-medium text-green-200 group-hover:text-white">
                      Se déconnecter
                    </p>
                  </div>
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
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden mr-4"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                Investisseur
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <input 
                  type="search" 
                  placeholder="Rechercher..." 
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">M. Diallo</span>
              </div> */}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Portfolio Summary */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Résumé du portefeuille
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Total investi
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(portfolioSummary.totalInvested)}
                </p>
                <p className="text-sm text-gray-500">
                  {portfolioSummary.activeProjects} projets actifs
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Rendement attendu
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(portfolioSummary.expectedReturn)}
                </p>
                <p className="text-sm text-gray-500">
                  ROI moyen de {portfolioSummary.averageROI}%
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Impact social
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {portfolioSummary.impact.farmers} agriculteurs
                </p>
                <p className="text-sm text-gray-500">
                  {portfolioSummary.impact.jobs} emplois créés
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Impact environnemental
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {portfolioSummary.impact.hectares} hectares
                </p>
                <p className="text-sm text-gray-500">Agriculture durable</p>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Projets en vedette
              </h3>
              <Link
                href="/dashboard/investor/projects"
                className="text-green-600 hover:underline text-sm font-medium"
              >
                Voir tous les projets
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      width={500}
                      height={300}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow">
                      <Heart
                        size={20}
                        className="text-gray-400 hover:text-red-500"
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-black/75 mb-1">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Par {project.farmer} • {project.location}
                    </p>

                    <div className="mb-3">
                      <div className="flex justify-between text-black/75 mb-1">
                        <span>{formatCurrency(project.currentFunding)}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          Objectif: {formatCurrency(project.fundingGoal)}
                        </span>
                        <span>{project.remainingDays} jours restants</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-black/75 text-xs rounded-full">
                        Risque: {project.riskLevel}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        ROI: {project.expectedROI}%
                      </span>
                    </div>

                    {/* <Link 
                      href={`/dashboard/investor/projects/${project.id}`}
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
                    >
                      Investir maintenant
                    </Link> */}
                    <Link
                      href={`/investisseur/investir`}
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium"
                    >
                      Investir maintenant
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories and Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Catégories de projets
                </h3>
                <ul className="space-y-3">
                  {projectCategories.map((category, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {category.count} projets
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href="/dashboard/investor/projects"
                    className="flex justify-center items-center text-green-600 hover:text-green-800"
                  >
                    <Filter size={16} className="mr-2" />
                    <span>Filtrer par catégorie</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Opportunities */}
            <div className="lg:col-span-2">
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Opportunités recommandées
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border border-green-100 rounded-lg bg-green-50">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-black/75">
                          Investissez dans l&rsquo;agriculture biologique
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Les projets d&rsquo;agriculture biologique offrent un
                          rendement moyen de 18% avec un impact environnemental
                          positif.
                        </p>
                      </div>
                      <ChartBar className="text-green-500" size={24} />
                    </div>
                    <div className="mt-3">
                      <Link
                        href="/dashboard/investor/opportunities/organic"
                        className="text-green-600 hover:underline text-sm"
                      >
                        Explorer les projets bio →
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-black/75">
                          Diversifiez votre portefeuille
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Réduisez les risques en investissant dans différents
                          types de cultures et régions.
                        </p>
                      </div>
                      <TrendingUp className="text-blue-500" size={24} />
                    </div>
                    <div className="mt-3">
                      <Link
                        href="/dashboard/investor/portfolio/diversify"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Conseils de diversification →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
