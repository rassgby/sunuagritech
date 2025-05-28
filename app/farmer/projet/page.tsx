'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Menu, X, Home,  Cloud, Layers, LogOut } from 'lucide-react';
import { getProjects } from '@/app/services/projects';
import { useRouter } from 'next/navigation';
import { ProjectWithUser } from '@/app/types/project';
import ProjectDetailsModal from '@/app/farmer/detail/page';
import Nav from '@/app/components/farmer/nav';

export default function InvestorProjects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: "Utilisateur inconnu" });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        if (result) {
          setProjects(result.map((project: any) => ({
            id: project.id,
            image: project.image,
            projectName: project.project_name,
            user: project.user ? {
              name: project.user.name || "Unknown",
              phoneNumber: project.user.phoneNumber || ""
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const toggleLike = (id: string) => {
    console.log(`Toggled like for project ${id}`);
  };

  const handleDetailsClick = (id: string) => {
    setSelectedProjectId(id);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
  };

  if (loading) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">

      <Nav />
      {/* Mobile sidebar */}
      {/* <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? "" : "hidden"}`}>
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
              <Link href="/farmer" className="bg-green-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <Home className="mr-4 h-6 w-6" />
                Tableau de bord
              </Link>
              <Link href="farmer/projet" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
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
                <p className="text-base font-medium text-white">{currentUser.name}</p>
                <div className="flex items-center text-sm font-medium text-green-200 group-hover:text-white">
                  <LogOut className="mr-1 h-4 w-4" />
                  Se déconnecter
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Static sidebar for desktop */}
      {/* <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-green-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-white font-bold text-xl">SunuAgri</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link href="/farmer" className="bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
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
      </div> */}

      {/* Main Content */}
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

        {/* Projects Content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Liste des projets</h1>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="relative">
                        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                          <span className="text-gray-700 text-xl font-semibold">{project.projectName}</span>
                        </div>
                        <button
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow"
                          onClick={() => toggleLike(project.id)}
                        >
                          <Heart
                            size={20}
                            className="text-gray-400 hover:text-red-500"
                          />
                        </button>
                        <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                          {project.projectType}
                        </div>
                      </div>
                      <div className="p-4">
            
                        <p className="font-semibold text-black/75 mb-2">
                          Localisation: {project.location}
                        </p>
                        <div className="mb-3">
                          <div className="font-semibold text-black/75 mt-1">
                            <span>Budget: {formatCurrency(project.budget)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDetailsClick(project.id)}
                            className="block flex-1 text-center bg-white border border-green-600 hover:bg-green-50 text-green-600 py-2 rounded-md font-medium"
                          >
                            Détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Project Details Modal */}
      {selectedProjectId && <ProjectDetailsModal projectId={selectedProjectId} onClose={closeModal} />}
    </div>
  );
}
