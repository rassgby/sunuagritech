"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  TrendingUp,
  Cloud,
  Layers,
  ShoppingBag,
  MessageSquare,
  LogOut,
  Sun,
  CloudRain,
  Wind,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Filter,
  ChevronDown,
  Plus,
  Thermometer,
} from "lucide-react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getProjects } from "@/app/services/projects";
import { getFullWeather } from "@/app/services/weatherService";
import { useRouter } from "next/navigation";
import { ProjectWithUser } from "@/types/project";

// Composant pour afficher les détails d'un projet
const ProjectDetails = ({
  project,
  onClose,
}: {
  project: ProjectWithUser;
  onClose: () => void;
}) => {
  const [amount, setAmount] = useState("");

  const investInProject = () => {
    if (!amount || isNaN(parseInt(amount))) return;

    const investmentAmount = parseInt(amount);
    const newFunding = project.currentFunding + investmentAmount;
    const newProgress = Math.min(
      100,
      Math.round((newFunding / project.fundingGoal) * 100)
    );
    const newStatus = newProgress === 100 ? "financé" : "en cours";
    const newDaysLeft = newProgress === 100 ? 0 : project.daysLeft;

    const newNotification = {
      id: Date.now(),
      text: `Vous avez investi ${investmentAmount.toLocaleString()} FCFA dans votre projet "${
        project.projectName
      }"`,
      time: "À l'instant",
      type: "investment",
      read: false,
    };
    // setNotifications([newNotification, ...notifications]);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Détails du projet
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900">
            {project.projectName}
          </h2>
          <p className="mt-2 text-gray-600">{project.description}</p>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progression</span>
              <span>{project.progress}%</span>
            </div>
            <div className="mt-1 relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100">
                <div
                  style={{ width: `${project.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Objectif</div>
              <div className="text-lg font-semibold">
                {project.fundingGoal.toLocaleString()} FCFA
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Financé</div>
              <div className="text-lg font-semibold">
                {project.currentFunding.toLocaleString()} FCFA
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Statut</div>
              <div className="text-lg font-semibold capitalize">
                {project.status}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Jours restants</div>
              <div className="text-lg font-semibold">{project.daysLeft}</div>
            </div>
          </div>

          {project.status === "en cours" && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Investir dans ce projet
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500"
                  placeholder="Montant en FCFA"
                />
                <button
                  onClick={investInProject}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Investir
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour afficher la condition météo
const WeatherIcon = ({
  condition,
  size = "md",
}: {
  condition: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClass =
    size === "sm" ? "h-5 w-5" : size === "lg" ? "h-12 w-12" : "h-6 w-6";

  if (condition === "Clear") {
    return <Sun className={`${sizeClass} text-yellow-500`} />;
  } else if (condition === "Rain") {
    return <CloudRain className={`${sizeClass} text-blue-500`} />;
  } else {
    return <Cloud className={`${sizeClass} text-gray-400`} />;
  }
};

// Composant principal
export default function FarmerDashboard() {
  // États pour les données
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectWithUser[]>([]);
  type WeatherData = {
    current: {
      temp: number;
      condition: string;
      windSpeed: number;
      humidity: number;
    };
    forecast: Array<{
      day: string;
      condition: string;
      maxTemp: number;
    }>;
    hourlyData: Array<{
      hour: string;
      temp: number;
      humidity: number;
    }>;
  };
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  type MarketplaceItem = {
    id: number;
    name: string;
    quantity: string;
    price: number;
    status: string;
    img: string;
  };
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(
    []
  );
  type Notification = {
    id: number;
    text: string;
    time: string;
    type: string;
    read: boolean;
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [weatherView, setWeatherView] = useState("forecast");
  const [marketplaceView, setMarketplaceView] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithUser | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [unreadCount] = useState(0);
  const [activityFilter, setActivityFilter] = useState("all");
  const [showWeatherAlert, setShowWeatherAlert] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("Dakar");
  const [userName, setUserName] = useState("Aucun utilisateur");
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        if (result) {
          setProjects(
            result.map((project: any) => ({
              id: project.id,
              projectName: project.project_name,
              description: project.description,
              fundingGoal: project.budget,
              currentFunding: project.currentFunding || 0,
              progress: project.progress || 0,
              daysLeft: project.daysLeft || 0,
              status: project.status || "en cours",
              user: project.user
                ? {
                    name: project.user.name || "Unknown",
                    phoneNumber: project.user.phoneNumber || "",
                  }
                : null,
              location: project.location || "",
              projectType: project.project_type,
            }))
          );
        } else {
          console.error("Error fetching projects: No data received");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const data = await getFullWeather(selectedLocation); // Remplacez 'Thiès' par la ville souhaitée
        // Adapt the data to match WeatherData type if needed
        setWeatherData({
          current: {
            temp: data.current.temperature ?? 0,
            condition: data.current.description ?? "",
            windSpeed: data.current.windSpeed ?? 0,
            humidity: data.current.humidity ?? 0,
          },
          forecast: data.forecast ?? [],
          hourlyData: (data as any).hourlyData ?? [],
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Récupérer le nom de l'utilisateur connecté depuis le localStorage
    const fetchUserName = () => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    fetchProjects();
    fetchWeatherData();
    fetchUserName();
  }, []);

  // Fonction pour simuler un rafraîchissement des données
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simuler une légère modification aléatoire de la température
      if (
        weatherData &&
        typeof weatherData === "object" &&
        !Array.isArray(weatherData)
      ) {
        if (
          typeof weatherData === "object" &&
          weatherData !== null &&
          typeof weatherData.current === "object" &&
          weatherData.current !== null
        ) {
          const updatedWeather = {
            ...weatherData,
            current: { ...weatherData.current },
          };
          updatedWeather.current.temp =
            Math.round(
              (weatherData.current.temp + (Math.random() * 2 - 1)) * 10
            ) / 10;
          setWeatherData(updatedWeather);
        }
      }

      // Simuler un nouvel investissement
      if (Math.random() > 0.5) {
        const randomProject = projects.find((p) => p.status === "en cours");
        if (randomProject) {
          const investment = Math.round(Math.random() * 100000);
          const newFunding = randomProject.currentFunding + investment;
          const newProgress = Math.round(
            (newFunding / randomProject.fundingGoal) * 100
          );

          // Mettre à jour le projet
          setProjects(
            projects.map((p) =>
              p.id === randomProject.id
                ? { ...p, currentFunding: newFunding, progress: newProgress }
                : p
            )
          );

          // Ajouter une notification
          const newNotification = {
            id: Date.now(),
            text: `Nouvel investissement de ${investment.toLocaleString()} FCFA pour votre projet "${
              randomProject.projectName
            }"`,
            time: "À l'instant",
            type: "investment",
            read: false,
          };
          setNotifications([newNotification, ...notifications]);
        }
      }

      setIsRefreshing(false);
    }, 1500);
  };

  // Fonction pour marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Fonction pour ajouter un nouveau produit
  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.quantity || !newProduct.price) return;

    const product = {
      id: Date.now(),
      name: newProduct.name,
      quantity: `${newProduct.quantity} kg`,
      price: parseInt(newProduct.price),
      status: "Disponible",
      img: "/api/placeholder/64/64",
    };

    setMarketplaceItems([...marketplaceItems, product]);
    setNewProduct({ name: "", quantity: "", price: "" });
    setShowNewProductForm(false);
  };

  // Fonction pour filtrer les produits du marché
  const filteredMarketplaceItems = marketplaceItems.filter((item) => {
    if (marketplaceView === "all") return true;
    if (marketplaceView === "available") return item.status === "Disponible";
    if (marketplaceView === "reserved") return item.status === "Réservé";
    return true;
  });

  // Définir les activités fictives initiales
  const activities = [
    {
      id: 1,
      type: "investment",
      title: "Investissement reçu",
      date: "Il y a 2 heures",
      description:
        "Votre projet 'Riziculture 2024' a reçu un nouvel investissement.",
    },
    {
      id: 2,
      type: "weather",
      title: "Alerte météo",
      date: "Il y a 1 jour",
      description: "Des pluies sont prévues jeudi.",
    },
    {
      id: 3,
      type: "marketplace",
      title: "Produit vendu",
      date: "Il y a 3 jours",
      description: "Vous avez vendu 50 kg de maïs sur le marché.",
    },
  ];

  // Fonction pour filtrer les activités
  const filteredActivities = activities.filter((activity) => {
    if (activityFilter === "all") return true;
    return activity.type === activityFilter;
  });

  if (!weatherData) {
    return <div>Chargement des données météorologiques...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
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
              <Link
                href="/farmer"
                className="bg-green-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <Home className="mr-4 h-6 w-6" />
                Tableau de bord
              </Link>
              <Link
                href="/farmer/projet"
                className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <Layers className="mr-4 h-6 w-6" />
                Mes projets
              </Link>
              <Link
                href="/farmer/weather"
                className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <Cloud className="mr-4 h-6 w-6" />
                Météo
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-green-700 p-4">
            <Link href="/" className="flex items-center">
              <div className="ml-3">
                <p className="text-base font-medium text-white">{userName}</p>
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
              <Link
                href="/farmer"
                className="bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Home className="mr-3 h-6 w-6" />
                Tableau de bord
              </Link>
              <Link
                href="/farmer/projet"
                className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Layers className="mr-3 h-6 w-6" />
                Mes projets
              </Link>
              <Link
                href="/farmer/weather"
                className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <Cloud className="mr-3 h-6 w-6" />
                Météo
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-green-700 p-4">
            <Link href="/" className="flex items-center group">
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{userName}</p>
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
                <h1 className="text-2xl font-semibold text-gray-900">
                  Tableau de bord
                </h1>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={refreshData}
                    className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={isRefreshing}
                  >
                    <RefreshCw
                      className={`h-6 w-6 ${
                        isRefreshing ? "animate-spin text-green-500" : ""
                      }`}
                    />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <span className="sr-only">Voir les notifications</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                      )}
                    </button>

                    {/* Notifications dropdown */}
                    {notificationsOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-700">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-green-600 hover:text-green-800"
                            >
                              Marquer tout comme lu
                            </button>
                          )}
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                                  !notification.read ? "bg-green-50" : ""
                                }`}
                              >
                                <p className="text-sm text-gray-700">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-6 text-center text-gray-500">
                              <p>Aucune notification</p>
                            </div>
                          )}
                        </div>
                        <div className="px-4 py-2 border-t border-gray-200">
                          <Link
                            href="/dashboard/farmer/notifications"
                            className="text-xs text-green-600 hover:text-green-800"
                          >
                            Voir toutes les notifications
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                {/* Alerte Météo */}
                {showWeatherAlert && (
                  <div className="rounded-md bg-yellow-50 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Alerte météo
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Des fortes pluies sont prévues jeudi, prenez les
                            mesures nécessaires pour protéger vos cultures
                            sensibles.
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                          <button
                            type="button"
                            onClick={() => setShowWeatherAlert(false)}
                            className="inline-flex bg-yellow-50 rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <span className="sr-only">Fermer</span>
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Statistiques */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Projets financés
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {
                                  projects.filter((p) => p.status === "financé")
                                    .length
                                }
                              </div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <span className="sr-only">Augmenté de</span>
                                33.3%
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Produits sur le marché
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {marketplaceItems.length}
                              </div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <span className="sr-only">Augmenté de</span>
                                20%
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                          <Sun className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Température actuelle
                            </dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">
                                {weatherData.current.temp}°C
                              </div>
                              <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-500">
                                <span>{weatherData.current.condition}</span>
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mes projets */}
                <div className="bg-white shadow rounded-lg mb-6">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Mes projets
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={() => {}}
                        >
                          <Filter className="-ml-0.5 mr-2 h-4 w-4" />
                          Trier
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Par défaut
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Par progression
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Par jours restants
                            </button>
                          </div>
                        </div>
                      </div>
                      <Link href="/farmer/new-projet">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Plus className="-ml-0.5 mr-2 h-4 w-4" />
                          Nouveau projet
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-white overflow-hidden shadow rounded-lg border"
                        >
                          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              {project.projectName}
                            </h3>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                project.status === "financé"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {project.status === "financé"
                                ? "Financé"
                                : `${project.daysLeft} jours restants`}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                            <p className="text-sm text-gray-500 mb-4">
                              {project.description}
                            </p>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <div className="text-gray-500">Progression</div>
                              <div className="text-gray-900 font-medium">
                                {project.progress}%
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div>
                                <span className="text-gray-500 text-sm">
                                  Objectif:{" "}
                                </span>
                                <span className="text-gray-900 font-medium">
                                  {project.fundingGoal} FCFA
                                </span>
                              </div>
                              <button
                                onClick={() => setSelectedProject(project)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Voir détails
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid de 2 colonnes pour Météo et Activités récentes */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Météo */}
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Météo
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          className={`px-3 py-1 text-sm font-medium rounded-md ${
                            weatherView === "forecast"
                              ? "bg-green-600 text-white"
                              : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => setWeatherView("forecast")}
                        >
                          Prévisions
                        </button>
                        <button
                          className={`px-3 py-1 text-sm font-medium rounded-md ${
                            weatherView === "hourly"
                              ? "bg-green-600 text-white"
                              : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => setWeatherView("hourly")}
                        >
                          Horaire
                        </button>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-50">
                          <WeatherIcon
                            condition={weatherData.current.condition}
                            size="lg"
                          />
                        </div>
                        <div className="ml-5">
                          <div className="text-3xl font-bold text-black/60">
                            {weatherData.current.temp}°C
                          </div>
                          <div className="text-gray-500">
                            {weatherData.current.condition}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <div className="flex items-center text-gray-500 mb-2">
                            <Wind className="h-5 w-5 mr-1" />
                            <span>{weatherData.current.windSpeed} km/h</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Thermometer className="h-5 w-5 mr-1" />
                            <span>
                              {weatherData.current.humidity}% humidité
                            </span>
                          </div>
                        </div>
                      </div>

                      {weatherView === "forecast" ? (
                        <div className="grid grid-cols-5 gap-2">
                          {weatherData.forecast.map((day, index) => (
                            <div key={index} className="text-center">
                              <div className="text-gray-500 mb-2">
                                {day.day}
                              </div>
                              <div className="flex justify-center mb-1">
                                <WeatherIcon condition={day.condition} />
                              </div>
                              <div className="font-medium text-black/65">
                                {day.maxTemp}°C
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={weatherData.hourlyData}
                              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="hour" />
                              <YAxis
                                yAxisId="left"
                                orientation="left"
                                stroke="#2563EB"
                              />
                              <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#10B981"
                              />
                              <Tooltip />
                              <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="temp"
                                stroke="#2563EB"
                                name="Température (°C)"
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="humidity"
                                stroke="#10B981"
                                name="Humidité (%)"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Activités récentes */}
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Activités récentes
                      </h3>
                      <div className="relative">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Filter className="-ml-0.5 mr-1 h-4 w-4" />
                          Filtrer
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 hidden">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <button
                              onClick={() => setActivityFilter("all")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Toutes les activités
                            </button>
                            <button
                              onClick={() => setActivityFilter("investment")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Investissements
                            </button>
                            <button
                              onClick={() => setActivityFilter("weather")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Alertes météo
                            </button>
                            <button
                              onClick={() => setActivityFilter("marketplace")}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Marché
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {filteredActivities.map((activity, index) => (
                            <li key={activity.id}>
                              <div className="relative pb-8">
                                {index !== filteredActivities.length - 1 ? (
                                  <span
                                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <div className="relative flex items-start space-x-3">
                                  <div>
                                    <div
                                      className={`relative p-2 rounded-full flex items-center justify-center ${
                                        activity.type === "investment"
                                          ? "bg-green-100"
                                          : activity.type === "weather"
                                          ? "bg-blue-100"
                                          : activity.type === "marketplace"
                                          ? "bg-purple-100"
                                          : "bg-yellow-100"
                                      }`}
                                    >
                                      {activity.type === "investment" && (
                                        <TrendingUp className="h-5 w-5 text-green-600" />
                                      )}
                                      {activity.type === "weather" && (
                                        <Cloud className="h-5 w-5 text-blue-600" />
                                      )}
                                      {activity.type === "marketplace" && (
                                        <ShoppingBag className="h-5 w-5 text-purple-600" />
                                      )}
                                      {activity.type === "project" && (
                                        <Layers className="h-5 w-5 text-yellow-600" />
                                      )}
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">
                                        {activity.title}
                                      </div>
                                      <p className="mt-0.5 text-sm text-gray-500">
                                        {activity.date}
                                      </p>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-700">
                                      <p>{activity.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <Link
                          href="/dashboard/farmer/activities"
                          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Voir toutes les activités
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marché */}
                <div className="bg-white shadow rounded-lg mt-6">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Marché
                      </h3>

                      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                        {/* Boutons de filtre */}
                        <div className="flex space-x-1">
                          <button
                            className={`px-3 py-1 text-sm font-medium rounded-md ${
                              marketplaceView === "all"
                                ? "bg-green-600 text-white"
                                : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                            onClick={() => setMarketplaceView("all")}
                          >
                            Tous
                          </button>
                          <button
                            className={`px-3 py-1 text-sm font-medium rounded-md ${
                              marketplaceView === "available"
                                ? "bg-green-600 text-white"
                                : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                            onClick={() => setMarketplaceView("available")}
                          >
                            Disponibles
                          </button>
                          <button
                            className={`px-3 py-1 text-sm font-medium rounded-md ${
                              marketplaceView === "reserved"
                                ? "bg-green-600 text-white"
                                : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                            }`}
                            onClick={() => setMarketplaceView("reserved")}
                          >
                            Réservés
                          </button>
                        </div>

                        {/* Bouton Ajouter */}
                        <button
                          onClick={() =>
                            setShowNewProductForm(!showNewProductForm)
                          }
                          className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Plus className="-ml-0.5 mr-2 h-4 w-4" />
                          Ajouter un produit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Formulaire d'ajout */}
                  {showNewProductForm && (
                    <div className="px-4 py-3 bg-gray-50 sm:px-6">
                      <div className="space-y-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:space-y-0">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="productName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nom du produit
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="productName"
                              id="productName"
                              value={newProduct.name}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  name: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-1">
                          <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Quantité (kg)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="quantity"
                              id="quantity"
                              value={newProduct.quantity}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  quantity: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-1">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Prix (FCFA)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={newProduct.price}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  price: e.target.value,
                                })
                              }
                              className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 sm:col-span-2 sm:flex-row sm:items-end sm:justify-end sm:space-y-0 sm:space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowNewProductForm(false)}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={addNewProduct}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tableau - Version mobile avec cards */}
                  <div className="sm:hidden">
                    <div className="px-4 py-3 divide-y divide-gray-200">
                      {filteredMarketplaceItems.map((item) => (
                        <div key={item.id} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {item.quantity} kg •{" "}
                                {item.price.toLocaleString()} FCFA
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.status === "Disponible"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {item.status}
                              </span>
                              <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                                Modifier
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tableau - Version desktop */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Produit
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Quantité
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Prix
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Statut
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredMarketplaceItems.map((item) => (
                          <tr key={item.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.price.toLocaleString()} FCFA
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.status === "Disponible"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button className="text-green-600 hover:text-green-900">
                                Modifier
                                <span className="sr-only">, {item.name}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-gray-50 text-center sm:text-right sm:px-6">
                    <Link
                      href="/dashboard/farmer/marketplace"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Voir tous les produits
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
