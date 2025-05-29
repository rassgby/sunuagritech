"use client";
import { useState, useEffect } from "react";
import {
  BarChart3,
  ChevronLeft,
  User,
  Phone,
  X,
  CreditCard,
  Home,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  LogOut,
  Menu,
} from "lucide-react";

export default function InvestmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("mobile");
  const [showSuccess, setShowSuccess] = useState(false);

  const project = {
    title: "Culture de tomates bio",
    farmer: "Amadou korka DIALLO",
    phone: "777666733",
    location: "Ferme écologique de la vallée verte, région centrale",
    amount: "30 000 F CFA",
    category: "Agriculture",
    duration: "6 mois",
    expectedReturn: "15%",
    investors: 12,
    funded: 65,
    description:
      "Projet de culture biologique de tomates dans la vallée verte. Production estimée à 2 tonnes avec des techniques agricoles durables et respectueuses de l'environnement.",
    riskLevel: "Moyen",
    minInvestment: 5000,
    maxInvestment: 50000,
  };

  // Fermer la sidebar quand on clique à l'extérieur sur mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatAmount = (amount: string | number) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount));
  };

  const handleInvestment = () => {
    const amount = parseInt(investmentAmount);
    if (
      investmentAmount &&
      amount >= project.minInvestment &&
      amount <= project.maxInvestment
    ) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setInvestmentAmount("");
      }, 3000);
    }
  };

  const handleAmountChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    // Permettre seulement les nombres
    if (value === "" || /^\d+$/.test(value)) {
      setInvestmentAmount(value);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setInvestmentAmount(amount.toString());
  };

  const isValidAmount = () => {
    const amount = parseInt(investmentAmount);
    return (
      investmentAmount &&
      amount >= project.minInvestment &&
      amount <= project.maxInvestment
    );
  };

  const getButtonText = () => {
    if (!investmentAmount) {
      return "Entrez un montant";
    }
    const amount = parseInt(investmentAmount);
    if (amount < project.minInvestment) {
      return `Minimum ${formatAmount(project.minInvestment)} F CFA`;
    }
    if (amount > project.maxInvestment) {
      return `Maximum ${formatAmount(project.maxInvestment)} F CFA`;
    }
    return `Investir ${formatAmount(investmentAmount)} F CFA`;
  };

  // Écran de succès
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Investissement réussi !
          </h2>
          <p className="text-gray-600 mb-6">
            Votre investissement de {formatAmount(investmentAmount)} F CFA a été
            confirmé.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h1 className="text-xl font-bold">SunuAgri</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col h-full">
          <div className="flex-grow p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <a
                  href="/investisseur"
                  className="flex items-center p-2 rounded-md hover:bg-green-700"
                >
                  <Home className="mr-3" size={20} />
                  <span>Tableau de bord</span>
                </a>
              </li>
              <li>
                <a
                  href="/investisseur/projet"
                  className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600"
                >
                  <TrendingUp className="mr-3" size={20} />
                  <span>Projets</span>
                </a>
              </li>
              <li>
                <a
                  href="/investisseur/portefeuille"
                  className="flex items-center p-2 rounded-md hover:bg-green-700"
                >
                  <BarChart3 className="mr-3" size={20} />
                  <span>Mon portefeuille</span>
                </a>
              </li>
              <li>
                <a
                  href="/investisseur/agriculteur"
                  className="flex items-center p-2 rounded-md hover:bg-green-700"
                >
                  <Users className="mr-3" size={20} />
                  <span>Agriculteurs</span>
                </a>
              </li>
              <li>
                <a
                  href="/investisseur/transactions"
                  className="flex items-center p-2 rounded-md hover:bg-green-700"
                >
                  <CreditCard className="mr-3" size={20} />
                  <span>Transactions</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="flex items-center p-2 rounded-md hover:bg-green-700"
                >
                  <LogOut className="mr-3" size={20} />
                  <span>Déconnexion</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header fixe */}
        <div className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-30 md:left-64">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <a
                  href="/investisseur/projet"
                  className="text-green-700 hover:text-green-900 mr-3"
                >
                  <ChevronLeft className="w-5 h-5" />
                </a>
                <h1 className="text-xl font-semibold text-gray-900">
                  Investir
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu scrollable avec marge pour le header fixe */}
        <div className="flex-1 overflow-auto pt-16">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
            {/* Project Overview */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-2">
                    {project.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h2>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {project.amount}
                  </div>
                  <div className="text-sm text-gray-500">
                    Objectif de financement
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base">
                      {project.farmer}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base">
                      {project.phone}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900 text-sm sm:text-base">
                      {project.location}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base">
                      Durée: {project.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base">
                      Retour estimé: {project.expectedReturn}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-900 text-sm sm:text-base">
                      {project.investors} investisseurs
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progression du financement</span>
                  <span>{project.funded}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(project.funded, 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Investment Form */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
                Faire un investissement
              </h3>

              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant d'investissement (F CFA)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      inputMode="numeric"
                      value={investmentAmount}
                      onChange={handleAmountChange}
                      placeholder={`Min: ${formatAmount(
                        project.minInvestment
                      )} F CFA`}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 mt-1 gap-1">
                    <span>
                      Minimum: {formatAmount(project.minInvestment)} F CFA
                    </span>
                    <span>
                      Maximum: {formatAmount(project.maxInvestment)} F CFA
                    </span>
                  </div>
                  {investmentAmount &&
                    parseInt(investmentAmount) > project.maxInvestment && (
                      <div className="text-red-500 text-sm mt-1">
                        Le montant dépasse le maximum autorisé
                      </div>
                    )}
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montants suggérés
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[5000, 10000, 25000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleQuickAmount(amount)}
                        className="py-2 px-2 sm:px-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-sm font-medium"
                      >
                        {formatAmount(amount)} F
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Méthode de paiement
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="mobile"
                        checked={selectedPayment === "mobile"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          Paiement mobile
                        </div>
                        <div className="text-sm text-gray-500">
                          Orange Money, Wave, Free Money
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={selectedPayment === "bank"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 flex-shrink-0"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          Virement bancaire
                        </div>
                        <div className="text-sm text-gray-500">
                          Transfert depuis votre compte bancaire
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Risk Warning */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium text-amber-800 mb-1">
                        Avertissement sur les risques
                      </div>
                      <div className="text-amber-700">
                        Tout investissement comporte des risques. Le niveau de
                        risque de ce projet est évalué comme{" "}
                        <strong>{project.riskLevel}</strong>. Veuillez investir
                        de manière responsable et ne jamais investir plus que ce
                        que vous pouvez vous permettre de perdre.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Summary */}
                {isValidAmount() && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">
                      Résumé de votre investissement
                    </h4>
                    <div className="space-y-1 text-sm text-green-800">
                      <div className="flex justify-between">
                        <span>Montant investi:</span>
                        <span className="font-medium">
                          {formatAmount(investmentAmount)} F CFA
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retour estimé ({project.expectedReturn}):</span>
                        <span className="font-medium">
                          +
                          {formatAmount(
                            Math.round(parseInt(investmentAmount) * 0.15)
                          )}{" "}
                          F CFA
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total estimé:</span>
                        <span className="font-semibold">
                          {formatAmount(
                            parseInt(investmentAmount) +
                              Math.round(parseInt(investmentAmount) * 0.15)
                          )}{" "}
                          F CFA
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Investment Button */}
                <button
                  onClick={handleInvestment}
                  disabled={!isValidAmount()}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base sm:text-lg"
                >
                  {getButtonText()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}