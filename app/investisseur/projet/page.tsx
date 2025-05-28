'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu, X, Home, TrendingUp, ChartBar, Users,
  CreditCard, LogOut,
  Search, Filter, MapPin, User, AlertCircle, Phone
} from 'lucide-react';
import Image from 'next/image';
import { getAllProjects } from '@/app/services/projects';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import ProjectDetailsModal from '@/app/farmer/detail/page';

export default function InvestorProjects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentUser, setCurrentUser] = useState({ name: "Utilisateur inconnu" });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);



  interface Project {
    id: string;
    image?: string;
    projectName: string;
    user: {
      phone_number: string;
      name: string 
} | null;
    location: string;
    budget: number;
    projectType: string;
    liked: boolean;
    createdAt?: string;
    description?: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
     const fetchProjects = async () => {
       try {
         const result = await getAllProjects();
         if (result) {
           setProjects(result.map((project: any) => ({
             id: project.id,
             image: project.image,
             projectName: project.project_name,
             user: project.user ? {
               name: project.user.name || "Unknown",
               phone_number: project.user.phone_number || ""
             } : null,
             location: project.location || "",
             budget: project.budget || 0,
             projectType: project.project_type,
           })));
         } else {
           console.error("Error fetching projects: No data received");
         }
       } catch (error) {
         console.error("Error fetching projects:", error);
       } finally {
         setLoading(false);
       }
     };
 
     // Récupérer le nom de l'utilisateur connecté depuis le localStorage
     const fetchCurrentUser = () => {
      const userName = localStorage.getItem('userName');
      if (userName) {
        setCurrentUser({ name: userName });
      }
    };
 
     fetchProjects();
     fetchCurrentUser();
   }, []);


  const handleDetailsClick = (id: string) => {
    setSelectedProjectId(id);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
  };

  // Filter and sort projects when any filter changes
  useEffect(() => {
    let result = [...projects];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      );
    }

    // Apply project type filter
    if (selectedType) {
      result = result.filter(project => project.projectType === selectedType);
    }

    // Apply sorting
    switch(sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime());
        break;
      case 'budget-high':
        result.sort((a, b) => b.budget - a.budget);
        break;
      case 'budget-low':
        result.sort((a, b) => a.budget - b.budget);
        break;
      default:
        break;
    }

    setFilteredProjects(result);
  }, [searchTerm, selectedType, sortBy, projects]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get unique project types for filter dropdown
  const projectTypes = [...new Set(projects.map(project => project.projectType))];

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSortBy('newest');
    setFilterOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>Projets disponibles | SunuAgri Sénégal</title>
        <meta name="description" content="Découvrez et investissez dans des projets agricoles au Sénégal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar - Unchanged as requested */}
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
              <Link href="/investisseur" className="flex items-center p-2 rounded-md  hover:bg-green-600">
                <Home className="mr-3" size={20} />
                <span>Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link href="/investisseur/projet" className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-700">
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
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-700">
            <ul className="space-y-2">
              <li>
                <div className="flex items-center p-2 rounded-md">{currentUser.name}</div>
                <Link href="/" className="flex items-center p-2 rounded-md hover:bg-green-700">
                  <LogOut className="mr-3" size={20} />
                  <span>Déconnexion</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content - Improved */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4">
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Projets à financer</h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 pl-10 pr-4 rounded-full text-black/75 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Filter size={20} className={`text-gray-600 ${selectedType || sortBy !== 'newest' ? 'text-green-600' : ''}`} />
                {(selectedType || sortBy !== 'newest') && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="p-4 bg-white border-t border-gray-100 shadow-md animate-fadeIn">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-700">Filtres</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Réinitialiser
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de projet</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Tous les types</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="newest">Plus récents</option>
                    <option value="oldest">Plus anciens</option>
                    <option value="budget-high">Budget (décroissant)</option>
                    <option value="budget-low">Budget (croissant)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Projects Content */}
        <main className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <p>{error}</p>
            </div>
          )}

          {/* Projects Header */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedType && <span className="text-gray-600 text-base ml-2">({selectedType})</span>}
              </h3>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
                    <div className="w-full h-52 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                      <div className="flex space-x-2">
                        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full p-4 inline-flex mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun projet trouvé</h3>
                <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Afficher tous les projets
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
                    <div className="relative">
                      {project.image ? (
                        <Image
                          width={500}
                          height={300}
                          src={project.image}
                          alt={project.projectName}
                          className="w-full h-52 object-cover"
                        />
                      ) : (
                        <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
                          <TrendingUp size={36} className="text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full shadow-sm">
                        {project.projectType}
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">{project.projectName}</h4>

                      <div className="text-gray-600 text-sm mb-2 flex items-center">
                        <User className="h-4 w-4 mr-1.5 text-gray-500 flex-shrink-0" />
                        {project.user ? (
                          <span className="truncate">{project.user.name}</span>
                        ) : (
                          <span className="italic">Utilisateur inconnu</span>
                        )}
                      </div>

                       <div className="text-gray-600 text-sm mb-2 flex items-center">
                        <Phone className="h-4 w-4 mr-1.5 text-gray-500 flex-shrink-0" />
                        {project.user ? (
                          <span className="truncate">{project.user.phone_number}</span>
                        ) : (
                          <span className="italic">Numero inconnu</span>
                        )}
                      </div>
                      
                      <div className="text-gray-600 text-sm mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-1.5 text-gray-500 flex-shrink-0" />
                        <span className="truncate">{project.location}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex items-center mb-1">
                          <span className="text-lg font-semibold text-green-600">{formatCurrency(project.budget)}</span>
                        </div>
          
                      </div>

                      <div className="flex space-x-2">
                       <button
                            onClick={() => handleDetailsClick(project.id)}
                            className="block flex-1 text-center bg-white border border-green-600 hover:bg-green-50 text-green-600 py-2 rounded-md font-medium"
                          >
                            Voir détails
                          </button>
                        <button
                          className="block flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium text-sm transition-colors"
                        >
                          Investir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      {/* Project Details Modal */}
      {selectedProjectId && <ProjectDetailsModal projectId={selectedProjectId} onClose={closeModal} />}
    </div>
  );
}
