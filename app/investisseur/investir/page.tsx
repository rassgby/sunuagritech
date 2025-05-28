'use client';
import { useState } from 'react';
// J'ai commenté cette ligne car j'ai enlevé le composant "MessageSquare" de la sidebar
// import { ChevronLeft, Users, Leaf, Calendar, DollarSign, X, Home, TrendingUp, ChartBar, CreditCard, MessageSquare, LogOut, Menu } from 'lucide-react';
import { ChevronLeft, Users, Leaf, Calendar, DollarSign, X, Home, TrendingUp, ChartBar, CreditCard, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


export default function ProjectDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Données fictives du projet (simulant les données qui viendraient d'une API)
  const projectData = {
    id: 1,
    title: "Culture biologique de mangues",
    farmer: "Fatou Ndiaye",
    region: "Ziguinchor",
    amountRaised: 520000,
    targetAmount: 800000,
    daysLeft: 12,
    riskLevel: "Modéré",
    roi: "15%",
    fundingPercentage: 65,
    description: "Ce projet vise à développer une culture biologique de mangues dans la région de Ziguinchor. La ferme utilisera des techniques durables et écologiques pour produire des mangues de haute qualité tout en préservant les ressources naturelles locales.",
    imageUrl: "/images/casamance.jpeg",
    socialImpact: {
      jobs: 5,
      farmers: 3,
      communities: 1
    },
    environmentalImpact: {
      hectares: 2.5,
      waterSaved: "30%",
      carbonReduction: "20 tonnes/an"
    },
    updates: [
      {
        date: "15/04/2025",
        title: "Plantation terminée",
        content: "Toutes les plantations ont été réalisées avec succès. Les premiers fruits sont attendus dans 3 mois."
      },
      {
        date: "20/03/2025",
        title: "Préparation du terrain",
        content: "Le terrain a été préparé avec des engrais biologiques et le système d'irrigation est en place."
      }
    ]
  };

  // Fonction de retour à la page précédente
  const goBack = () => {
    // Dans Next.js, ceci pourrait être remplacé par useRouter().back()
    console.log("Retour à la liste des projets");
  };

  // Fonction pour investir dans le projet
  const invest = () => {
    console.log("Investir dans le projet");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - maintenant avec position fixe */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <h1 className="text-xl font-bold">AgriTech</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col h-full">
          <div className="flex-grow p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Link href="/investisseur" className="flex items-center p-2 rounded-md hover:bg-green-700">
                  <Home className="mr-3" size={20} />
                  <span>Tableau de bord</span>
                </Link>
              </li>
              <li>
                <Link href="/investisseur/projet" className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600">
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
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
            <ul className="space-y-2">
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

      {/* Main Content - avec padding-left pour compenser la largeur de la sidebar sur desktop */}
      <div className="flex-1 overflow-y-auto md:pl-64">
        {/* Header de la page avec bouton de menu responsive */}
        <header className="sticky top-0 bg-white shadow z-40">
          <div className="container mx-auto px-4 py-4 flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 md:hidden"
            >
              <Menu className="w-5 h-5 text-black/75" />
            </button>
            <button 
              onClick={goBack} 
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5 text-black/75" />
            </button>
            <h1 className="text-xl font-bold text-black/75">Détails du projet</h1>
          </div>
        </header>

        {/* Contenu */}
        <div className="flex flex-col">
          {/* Image principale */}
          <div className="relative w-full h-64 md:h-96">
            <Image 
              width={800}
              height={400}
              src={projectData.imageUrl} 
              alt={projectData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenu principal */}
          <div className="container mx-auto px-4 py-6">
            {/* Titre et informations de base */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-black/75">{projectData.title}</h2>
              <p className="text-gray-600">
                Par {projectData.farmer} • Région de {projectData.region}
              </p>
            </div>

            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-black/75">{projectData.amountRaised} F CFA</span>
                <span className="text-gray-600">Objectif: {projectData.targetAmount} F CFA</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${projectData.fundingPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600">{projectData.fundingPercentage}% financé</span>
                <span className="text-gray-600">{projectData.daysLeft} jours restants</span>
              </div>
            </div>

            {/* Grille d'informations clés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center text-green-600 mb-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span className="font-medium">Rendement</span>
                </div>
                <p className="text-xl font-bold text-black/75">{projectData.roi}</p>
                <p className="text-sm text-gray-500">Risque: {projectData.riskLevel}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center text-blue-600 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-medium">Échéance</span>
                </div>
                <p className="text-xl font-bold text-black/75">{projectData.daysLeft} jours</p>
                <p className="text-sm text-gray-500">Clôture le 17/05/2025</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center text-orange-600 mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-medium">Impact social</span>
                </div>
                <p className="text-xl font-bold text-black/75">{projectData.socialImpact.farmers} agriculteurs</p>
                <p className="text-sm text-gray-500">{projectData.socialImpact.jobs} emplois créés</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center text-teal-600 mb-2">
                  <Leaf className="w-5 h-5 mr-2" />
                  <span className="font-medium">Impact environnemental</span>
                </div>
                <p className="text-xl font-bold text-black/75">{projectData.environmentalImpact.hectares} hectares</p>
                <p className="text-sm text-gray-500">Agriculture durable</p>
              </div>
            </div>

            {/* Description du projet */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-bold mb-4 text-black/75">Description du projet</h3>
              <p className="text-gray-700 mb-4">{projectData.description}</p>
              
              <h4 className="font-bold mt-6 mb-2 text-black/75">Impact social</h4>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                <li>Soutien à {projectData.socialImpact.farmers} agriculteurs locaux</li>
                <li>Création de {projectData.socialImpact.jobs} emplois directs</li>
                <li>Amélioration de la sécurité alimentaire locale</li>
              </ul>
              
              <h4 className="font-bold mt-6 mb-2 text-black/75">Impact environnemental</h4>
              <ul className="list-disc list-inside text-gray-700">
                <li>Exploitation de {projectData.environmentalImpact.hectares} hectares de manière durable</li>
                <li>Réduction de la consommation d&apos;eau de {projectData.environmentalImpact.waterSaved}</li>
                <li>Réduction des émissions de carbone de {projectData.environmentalImpact.carbonReduction}</li>
              </ul>
            </div>

            {/* Mises à jour du projet */}
            <div className="bg-white p-6 rounded-lg shadow mb-24 md:mb-8">
              <h3 className="text-lg font-bold mb-4 text-black/75">Mises à jour</h3>
              
              {projectData.updates.map((update, index) => (
                <div key={index} className={`pb-4 ${index < projectData.updates.length - 1 ? 'border-b border-gray-200 mb-4' : ''}`}>
                  <div className="flex items-center mb-2">
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                      {update.date}
                    </span>
                    <h4 className="font-bold text-black/75">{update.title}</h4>
                  </div>
                  <p className="text-gray-700">{update.content}</p>
                </div>
              ))}
            </div>

            {/* Bouton d'investissement */}
            <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-gray-200 p-4 md:static md:border-0 md:p-0 md:bg-transparent z-40 md:pb-6">
              <button 
                onClick={invest}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Investir maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

