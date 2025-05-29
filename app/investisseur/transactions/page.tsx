// pages/dashboard/investor/transactions.js
"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
// import {
//   Menu, X, Home, TrendingUp, ChartBar, Users,
//   CreditCard, MessageSquare, LogOut,
//   Search, Download, ArrowUpRight, ArrowDownLeft,
//   Calendar, ChevronDown
// } from 'lucide-react';

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
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  ChevronDown,
} from "lucide-react";

import Image from "next/image";

export default function TransactionsDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // 'all', 'investments', 'withdrawals'
  const [timeFilter] = useState("all"); // 'all', 'month', 'quarter', 'year'

  const transactionSummary = {
    totalInvested: 3000000,
    totalWithdrawn: 780000,
    pendingReturns: 420000,
    activeInvestments: 7,
  };

  const transactionHistory = [
    {
      id: "TR-2025-04-15",
      date: "15 avril 2025",
      type: "investment",
      projectTitle: "Culture biologique de mangues",
      farmer: "Fatou Ndiaye",
      amount: 250000,
      status: "completed",
      image: "/images/cce5f204-1026-49bb-9755-620600ea7386_1-scaled.jpg",
    },
    {
      id: "TR-2025-04-10",
      date: "10 avril 2025",
      type: "withdrawal",
      amount: 180000,
      status: "completed",
    },
    {
      id: "TR-2025-03-28",
      date: "28 mars 2025",
      type: "investment",
      projectTitle: "Projet d'élevage avicole",
      farmer: "Ibrahim Diop",
      amount: 350000,
      status: "completed",
      image:
        "/images/article_cote_divoire_eleveur_ivoirien_de_poulet_de_chair-poulet_credit_programme_dappui_a_la_production_avicole_nationale850.jpg",
    },
    {
      id: "TR-2025-03-15",
      date: "15 mars 2025",
      type: "return",
      projectTitle: "Riziculture dans la Vallée du Fleuve",
      amount: 75000,
      status: "completed",
    },
    {
      id: "TR-2025-02-22",
      date: "22 février 2025",
      type: "investment",
      projectTitle: "Production de mil et sorgho",
      farmer: "Amadou Sow",
      amount: 200000,
      status: "completed",
      image: "/images/mere.jpg",
    },
    {
      id: "TR-2025-02-10",
      date: "10 février 2025",
      type: "withdrawal",
      amount: 100000,
      status: "completed",
    },
    {
      id: "TR-2025-01-05",
      date: "5 janvier 2025",
      type: "investment",
      projectTitle: "Ferme aquaponique moderne",
      image: "/images/ferme.jpeg",
      farmer: "Marie Sène",
      amount: 400000,
      status: "completed",
    },
    {
      id: "TR-2025-01-02",
      date: "2 janvier 2025",
      type: "return",
      projectTitle: "Maraîchage bio à Thiès",
      amount: 95000,
      status: "pending",
    },
  ];

  // Format currency in CFA Francs
  const formatCurrency = (amount: string | number | bigint) => {
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  // Filter transactions based on selected view mode
  const filteredTransactions = transactionHistory.filter((transaction) => {
    if (viewMode === "all") return true;
    if (viewMode === "investments") return transaction.type === "investment";
    if (viewMode === "withdrawals") return transaction.type === "withdrawal";
    if (viewMode === "returns") return transaction.type === "return";
    return true;
  });

  // Get transaction style and icon based on type
  const getTransactionTypeInfo = (type: string) => {
    switch (type) {
      case "investment":
        return {
          icon: <ArrowUpRight className="text-green-500" size={20} />,
          badgeClass: "bg-green-100 text-green-800",
          label: "Investissement",
        };
      case "withdrawal":
        return {
          icon: <ArrowDownLeft className="text-red-500" size={20} />,
          badgeClass: "bg-red-100 text-red-800",
          label: "Retrait",
        };
      case "return":
        return {
          icon: <ArrowDownLeft className="text-blue-500" size={20} />,
          badgeClass: "bg-blue-100 text-blue-800",
          label: "Rendement",
        };
      default:
        return {
          icon: <CreditCard className="text-gray-500" size={20} />,
          badgeClass: "bg-gray-100 text-gray-800",
          label: "Transaction",
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>Transactions - SunuAgri Sénégal</title>
        <meta
          name="description"
          content="Gérez vos transactions sur SunuAgri Sénégal"
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
                className="flex items-center p-2 rounded-md hover:bg-green-700"
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
                className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600"
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
                <Link
                  href="/"
                  className="flex items-center p-2 rounded-md hover:bg-green-700"
                >
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
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden mr-4"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                Transactions
              </h2>
            </div>
            {/* <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="search" 
                  placeholder="Rechercher une transaction..." 
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div> */}
          </div>
        </header>

        {/* Transactions Content */}
        <main className="p-6">
          {/* Transaction Summary */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Aperçu financier
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Total investi
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(transactionSummary.totalInvested)}
                </p>
                <p className="text-sm text-gray-500">
                  {transactionSummary.activeInvestments} investissements actifs
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Total retiré
                </h4>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(transactionSummary.totalWithdrawn)}
                </p>
                <p className="text-sm text-gray-500">Sur l&apos;année 2025</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Rendements en attente
                </h4>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(transactionSummary.pendingReturns)}
                </p>
                <p className="text-sm text-gray-500">
                  À percevoir prochainement
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">
                  Solde disponible
                </h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(1200000)}
                </p>
                <p className="text-sm text-gray-500">
                  Pour de nouveaux investissements
                </p>
              </div>
            </div>
          </section>

          {/* Transaction Filters */}
          <section className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                {/* Boutons de filtre principal */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setViewMode("all")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      viewMode === "all"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Toutes
                  </button>
                  <button
                    onClick={() => setViewMode("investments")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      viewMode === "investments"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Investissements
                  </button>
                  <button
                    onClick={() => setViewMode("withdrawals")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      viewMode === "withdrawals"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Retraits
                  </button>
                  <button
                    onClick={() => setViewMode("returns")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      viewMode === "returns"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Rendements
                  </button>
                </div>

                {/* Filtres de date et export */}
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="relative w-full sm:w-auto">
                    <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {timeFilter === "all"
                          ? "Toute période"
                          : timeFilter === "month"
                          ? "Ce mois"
                          : timeFilter === "quarter"
                          ? "Ce trimestre"
                          : "Cette année"}
                      </span>
                      <ChevronDown size={16} className="ml-2 flex-shrink-0" />
                    </button>
                    {/* Dropdown menu would go here */}
                  </div>

                  <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                    <Download size={16} className="mr-2 flex-shrink-0" />
                    <span>Exporter</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Transaction History */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Historique des transactions
            </h3>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID & Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Détails
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => {
                      const typeInfo = getTransactionTypeInfo(transaction.type);

                      return (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.id}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.date}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {transaction.type === "investment" ? (
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 mr-3">
                                  {transaction.image && (
                                    <Image
                                      src={transaction.image}
                                      alt={transaction.projectTitle}
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {transaction.projectTitle}
                                  </div>
                                  {transaction.farmer && (
                                    <div className="text-sm text-gray-500">
                                      Agriculteur: {transaction.farmer}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : transaction.type === "return" ? (
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  Rendement
                                </div>
                                {transaction.projectTitle && (
                                  <div className="text-sm text-gray-500">
                                    Projet: {transaction.projectTitle}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.type === "withdrawal"
                                  ? "Retrait vers compte bancaire"
                                  : "Transaction"}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`mr-2 flex-shrink-0`}>
                                {typeInfo.icon}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${typeInfo.badgeClass}`}
                              >
                                {typeInfo.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm font-medium ${
                                transaction.type === "investment" ||
                                transaction.type === "withdrawal"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {transaction.type === "investment" ||
                              transaction.type === "withdrawal"
                                ? `- ${formatCurrency(transaction.amount)}`
                                : `+ ${formatCurrency(transaction.amount)}`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {transaction.status === "completed"
                                ? "Complétée"
                                : "En attente"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination would go here */}
              <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">1</span> à{" "}
                    <span className="font-medium">
                      {filteredTransactions.length}
                    </span>{" "}
                    sur{" "}
                    <span className="font-medium">
                      {transactionHistory.length}
                    </span>{" "}
                    résultats
                  </div>
                  <div className="flex items-center space-x-2">
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
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
