// pages/dashboard/investor/messages.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    Menu, X, Home, TrendingUp, ChartBar, Users,
    CreditCard, MessageSquare, LogOut,
    Search, Send, Check, ChevronLeft,
    Phone, Video, Info, Paperclip, Image as ImageIcon,
    Smile, Star
} from 'lucide-react';
import Image from 'next/image';

export default function MessagesDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    // Sample data for conversations
    const conversations = [
        {
            id: 1,
            participant: {
                id: 1,
                name: "Fatou Ndiaye",
                photo: "/images/personne.jpg",
                role: "Agriculteur",
                isOnline: true,
                verified: true,
            },
            lastMessage: {
                text: "Merci pour votre intérêt dans mon projet de culture biologique. Je serais ravi de vous donner plus de détails.",
                time: "12:45",
                isRead: true,
                sender: "them"
            },
            unreadCount: 0,
            pinned: true
        },
        {
            id: 2,
            participant: {
                id: 2,
                name: "Ibrahim Diop",
                photo: "/images/personne.jpg",
                role: "Agriculteur",
                isOnline: false,
                verified: true,
            },
            lastMessage: {
                text: "J'ai ajouté de nouvelles photos de mon projet d'élevage avicole. N'hésitez pas à les consulter.",
                time: "10:32",
                isRead: false,
                sender: "them"
            },
            unreadCount: 1,
            pinned: false
        },
        {
            id: 3,
            participant: {
                id: 5,
                name: "Ousmane Mbaye",
                photo: "/images/personne.jpg",
                role: "Agriculteur",
                isOnline: true,
                verified: true,
            },
            lastMessage: {
                text: "Concernant votre question sur le système d'irrigation que j'utilise dans mes jardins urbains...",
                time: "Hier",
                isRead: true,
                sender: "them"
            },
            unreadCount: 0,
            pinned: false
        },
        {
            id: 4,
            participant: {
                id: 3,
                name: "Amadou Sow",
                photo: "/images/personne.jpg",
                role: "Agriculteur",
                isOnline: false,
                verified: true,
            },
            lastMessage: {
                text: "Je vous remercie pour votre investissement. Le projet avance bien, et la récolte est prévue pour le mois prochain.",
                time: "Hier",
                isRead: true,
                sender: "them"
            },
            unreadCount: 0,
            pinned: false
        },
        {
            id: 5,
            participant: {
                id: 10,
                name: "Support AgriTech",
                photo: "/images/personne.jpg",
                role: "Support",
                isOnline: true,
                verified: true,
            },
            lastMessage: {
                text: "Comment pouvons-nous vous aider avec votre expérience d'investissement sur AgriTech?",
                time: "3 jours",
                isRead: true,
                sender: "them"
            },
            unreadCount: 0,
            pinned: false
        },
        {
            id: 6,
            participant: {
                id: 4,
                name: "Marie Sène",
                photo: "/images/personne.jpg",
                role: "Agriculteur",
                isOnline: false,
                verified: true,
            },
            lastMessage: {
                text: "Quand pourriez-vous visiter ma ferme aquaponique? Ce serait un plaisir de vous accueillir.",
                time: "5 jours",
                isRead: true,
                sender: "them"
            },
            unreadCount: 0,
            pinned: false
        }
    ];

    // Sample conversation messages for demonstration purposes
    const messageHistory: Record<number, { id: string; text: string; time: string; sender: string; }[]> = {
        1: [
            {
                id: 'm1',
                text: "Bonjour ! J'ai remarqué votre profil et votre projet de culture biologique m'intéresse beaucoup.",
                time: "Hier, 14:30",
                sender: "me"
            },
            {
                id: 'm2',
                text: "Bonjour ! Je vous remercie pour votre intérêt. Mon projet de culture biologique de mangues vise à développer une exploitation respectueuse de l'environnement avec des techniques durables.",
                time: "Hier, 15:12",
                sender: "them"
            },
            {
                id: 'm3',
                text: "Cela semble très prometteur. Pouvez-vous me donner plus de détails sur les pratiques durables que vous comptez mettre en place?",
                time: "Hier, 15:45",
                sender: "me"
            },
            {
                id: 'm4',
                text: "Bien sûr! Nous utilisons des méthodes de compostage naturel, un système d'irrigation goutte-à-goutte économe en eau, et nous favorisons la biodiversité avec des haies et des fleurs pour attirer les pollinisateurs. De plus, nous n'utilisons aucun pesticide chimique.",
                time: "Hier, 16:20",
                sender: "them"
            },
            {
                id: 'm5',
                text: "Très impressionnant. Et quel est le rendement prévu pour votre exploitation?",
                time: "Hier, 17:05",
                sender: "me"
            },
            {
                id: 'm6',
                text: "Merci pour votre intérêt dans mon projet de culture biologique. Pour la première année, nous prévoyons environ 2 tonnes/hectare, mais ce rendement devrait augmenter à 5 tonnes/hectare d'ici la troisième année. Je serais ravi de vous donner plus de détails.",
                time: "Aujourd'hui, 12:45",
                sender: "them"
            }
        ],
        2: [
            {
                id: 'm1',
                text: "Bonjour Ibrahim, j'ai vu que vous aviez un projet d'élevage avicole intéressant.",
                time: "Il y a 3 jours, 09:15",
                sender: "me"
            },
            {
                id: 'm2',
                text: "Bonjour! Oui, mon projet vise à créer un élevage avicole moderne et respectueux de l'environnement. Avez-vous des questions spécifiques?",
                time: "Il y a 3 jours, 10:25",
                sender: "them"
            },
            {
                id: 'm3',
                text: "Je serais intéressé de connaître la race de poulets que vous élevez et vos installations.",
                time: "Il y a 3 jours, 11:42",
                sender: "me"
            },
            {
                id: 'm4',
                text: "Nous élevons principalement des poulets de race locale améliorée, plus résistants aux conditions locales. Nos installations comprennent des poulaillers ventilés naturellement avec accès à des parcours extérieurs ombragés.",
                time: "Il y a 2 jours, 08:30",
                sender: "them"
            },
            {
                id: 'm5',
                text: "J'ai ajouté de nouvelles photos de mon projet d'élevage avicole. N'hésitez pas à les consulter.",
                time: "Aujourd'hui, 10:32",
                sender: "them"
            }
        ],
        3: [
            {
                id: 'm1',
                text: "Bonjour Ousmane, j'ai vu que vous aviez un projet d'agriculture urbaine intéressant.",
                time: "Il y a 2 jours, 14:15",
                sender: "me"
            },
            {
                id: 'm2',
                text: "Bonjour! Oui, mon projet vise à créer un jardin urbain durable avec des techniques d'agriculture biologique. Avez-vous des questions spécifiques",
                time: "Il y a 2 jours, 15:25",
                sender: "them"
            },
            {
                id: 'm3',
                text: "Je serais intéressé de connaître les types de cultures que vous effectuez et vos méthodes d'irrigation.",
                time: "Il y a 2 jours, 16:42",
                sender: "me"
            },
            {
                id: 'm4',
                text: "Nous cultivons principalement des légumes-feuilles et des herbes aromatiques. Nous utilisons un système d'irrigation goutte-à-goutte pour économiser l'eau et favoriser la croissance des plantes.",
                time: "Il y a 1 jour, 08:30",
                sender: "them"
            },
            {
                id: 'm5',
                text: "Concernant votre question sur le système d'irrigation que j'utilise dans mes jardins urbains, je peux vous dire que nous avons mis en place un système de goutte-à-goutte qui permet d'économiser l'eau tout en assurant une irrigation efficace.",
                time: "Aujourd'hui, 10:32",
                sender: "them"
            }
        ],
        4: [
            {
                id: 'm1',
                text: "Bonjour Amadou, j'ai vu que vous aviez un projet de culture de mil.",
                time: "Il y a 5 jours, 09:15",
                sender: "me"
            },
            {
                id: 'm2',
                text: "Bonjour! Oui, mon projet vise à créer une exploitation de mil durable. Avez-vous des questions spécifiques?",
                time: "Il y a 5 jours, 10:25",
                sender: "them"
            },
            {
                id: 'm3',
                text: "Je serais intéressé de connaître vos méthodes de culture et vos rendements prévus.",
                time: "Il y a 5 jours, 11:42",
                sender: "me"
            },
            {
                id: 'm4',
                text: "Nous utilisons des méthodes de culture traditionnelles et modernes pour maximiser le rendement. Nous prévoyons un rendement d'environ 1,5 tonne/hectare.",
                time: "Il y a 4 jours, 08:30",
                sender: "them"
            },
            {
                id: 'm5',
                text: "Je vous remercie pour votre investissement. Le projet avance bien, et la récolte est prévue pour le mois prochain.",
                time: "Hier, 10:32",
                sender: "them"
            },
            {
                id: 'm6',
                text: "Merci pour votre soutien! Je vous tiendrai informé des progrès.",
                time: "Aujourd'hui, 12:45",
                sender: "them"
            }
        ],
        5: [
            {
                id: 'm1',
                text: "Bonjour, j'ai besoin d'aide avec mon compte AgriTech.",
                time: "Il y a 3 jours, 09:15",
                sender: "me"
            },
            {
                id: 'm2',
                text: "Bonjour! Comment pouvons-nous vous aider avec votre expérience d'investissement sur AgriTech?",
                time: "Il y a 3 jours, 10:25",
                sender: "them"
            },
            {
                id: 'm3',
                text: "Je ne parviens pas à accéder à mon tableau de bord.",
                time: "Il y a 3 jours, 11:42",
                sender: "me"
            },
            {
                id: 'm4',
                text: "Nous allons vérifier cela pour vous. Pouvez-vous nous donner plus de détails sur le problème?",
                time: "Il y a 2 jours, 08:30",
                sender: "them"
            },
            {
                id: 'm5',
                text: "Je reçois un message d'erreur lorsque j'essaie de me connecter.",
                time: "Hier, 10:32",
                sender: "me"
            },
            {
                id: 'm6',
                text: "Nous avons résolu le problème. Vous devriez pouvoir vous connecter maintenant.",
                time: "Aujourd'hui, 12:45",
                sender: "them"
            }
        ],
        6: [
            {
                id: 'm1',
                text: "Bonjour Marie, j'ai vu que vous aviez un projet d'aquaponie.",
                time: "Il y a 5 jours, 09:15",
                sender: "me"
            }
            ,
            {
                id: 'm2',
                text: "Bonjour! Oui, mon projet vise à créer une ferme aquaponique durable. Avez-vous des questions spécifiques?",
                time: "Il y a 5 jours, 10:25",
                sender: "them"
            },
            {
                id: 'm3',
                text: "Je serais intéressé de connaître vos méthodes de culture et vos rendements prévus.",
                time: "Il y a 5 jours, 11:42",
                sender: "me"
            },
            {
                id: 'm4',
                text: "Nous utilisons des méthodes de culture aquaponique pour maximiser le rendement. Nous prévoyons un rendement d'environ 2 tonnes/hectare.",
                time: "Il y a 4 jours, 08:30",
                sender: "them"
            },
            {
                id: 'm5',
                text: "Quand pourriez-vous visiter ma ferme aquaponique? Ce serait un plaisir de vous accueillir.",
                time: "Hier, 10:32",
                sender: "them"
            },
            {
                id: 'm6',
                text: "Je suis disponible la semaine prochaine. Quel jour vous conviendrait le mieux?",
                time: "Aujourd'hui, 12:45",
                sender: "me"
            },
            {
                id: 'm7',
                text: "Je suis disponible le mercredi ou le jeudi. Que préférez-vous?",
                time: "Aujourd'hui, 13:00",
                sender: "them"
            },
            {
                id: 'm8',
                text: "Le mercredi me convient parfaitement. À quelle heure devrais-je venir?",
                time: "Aujourd'hui, 13:15",
                sender: "me"
            },
            {
                id: 'm9',
                text: "À 10h00 serait parfait. Je vous attendrai avec impatience.",
                time: "Aujourd'hui, 13:30",
                sender: "them"
            },
            {
                id: 'm10',
                text: "Merci beaucoup! J'ai hâte de vous rencontrer.",
                time: "Aujourd'hui, 13:45",
                sender: "me"
            }

        ]
    };

    // Filter conversations based on search term
    const filteredConversations = conversations.filter(conv =>
        conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (!message.trim()) return;

        // Here you would typically send the message to your backend
        // For this demo, we'll just clear the input
        setMessage('');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Head>
                <title>Messages - AgriTech Sénégal</title>
                <meta name="description" content="Communiquez avec les agriculteurs sur AgriTech Sénégal" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                        <li>
                            <Link href="/investisseur/message" className="flex items-center p-2 rounded-md bg-green-700 hover:bg-green-600">
                                <MessageSquare className="mr-3" size={20} />
                                <span>Messages</span>
                            </Link>
                        </li>
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
            <div className="flex-1 flex overflow-hidden">
                {/* Top Navigation - Mobile Only */}
                <div className="md:hidden absolute top-0 left-0 right-0 bg-white shadow z-10">
                    <div className="flex items-center justify-between p-4">
                        <button onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
                        <div className="w-6"></div> {/* Empty div for flex spacing */}
                    </div>
                </div>

                {/* Conversations List */}
                <div className={`w-full md:w-80 border-r border-gray-200 bg-white flex flex-col ${selectedConversation ? 'hidden md:flex' : ''}`}>
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
                        <div className="relative">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Rechercher des messages..."
                                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map(conv => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv.id)}
                                    className={`p-3 border-b border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 ${conv.pinned ? 'bg-green-50' : ''
                                        }`}
                                >
                                    <div className="relative mr-3">
                                        <Image
                                            src={conv.participant.photo || "/api/placeholder/48/48"}
                                            alt={conv.participant.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover w-12 h-12"
                                        />
                                        {conv.participant.isOnline && (
                                            <div className="absolute right-0 bottom-0 bg-green-500 rounded-full w-3 h-3 border-2 border-white"></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-medium text-black/75 truncate">{conv.participant.name}</h4>
                                            <span className="text-xs text-gray-500">{conv.lastMessage.time}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-medium text-black/75' : 'text-gray-500'}`}>
                                                {conv.lastMessage.sender === 'me' ? 'Vous: ' : ''}
                                                {conv.lastMessage.text}
                                            </p>

                                            {conv.unreadCount > 0 && (
                                                <span className="ml-2 bg-green-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                                    {conv.unreadCount}
                                                </span>
                                            )}

                                            {conv.pinned && (
                                                <Star size={14} className="text-green-600 ml-1 flex-shrink-0" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-6 text-gray-500">
                                Aucune conversation trouvée
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                {selectedConversation ? (
                    <div className="flex-1 flex flex-col bg-gray-50">
                        {/* Chat Header */}
                        <div className="bg-white p-3 border-b border-gray-200 flex items-center shadow-sm">
                            <button
                                onClick={() => setSelectedConversation(null)}
                                className="md:hidden mr-2"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="relative mr-3">
                                {/* <Image 
                  src={conversations.find(c => c.id === selectedConversation)?.participant.photo || "/api/placeholder/40/40"}
                  alt={conversations.find(c => c.id === selectedConversation)?.participant.name || 'Participant'}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                /> */}
                                {conversations.find(c => c.id === selectedConversation)?.participant.isOnline && (
                                    <div className="absolute right-0 bottom-0 bg-green-500 rounded-full w-2.5 h-2.5 border-2 border-white"></div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center">
                                    <h4 className="font-medium text-black/75">
                                        {conversations.find(c => c.id === selectedConversation)?.participant.name}
                                    </h4>
                                    {conversations.find(c => c.id === selectedConversation)?.participant.verified && (
                                        <Check size={16} className="text-green-500 ml-1" />
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                    {conversations.find(c => c.id === selectedConversation)?.participant.isOnline
                                        ? 'En ligne'
                                        : 'Vu dernièrement il y a 3h'}
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <Phone size={20} className="text-gray-600" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <Video size={20} className="text-gray-600" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <Info size={20} className="text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                {messageHistory[selectedConversation]?.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.sender === 'me'
                                                ? 'bg-green-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-700 rounded-bl-none shadow-sm'
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                            <div
                                                className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'
                                                    }`}
                                            >
                                                {msg.time}
                                                {msg.sender === 'me' && (
                                                    <span className="ml-1">
                                                        {conversations.find(c => c.id === selectedConversation)?.lastMessage.isRead
                                                            ? <Check size={14} className="inline" />
                                                            : ''}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="bg-white p-3 border-t border-gray-200">
                            <div className="flex items-end space-x-2">
                                <div className="flex items-center space-x-1">
                                    <button className="p-2 rounded-full hover:bg-gray-100">
                                        <Paperclip size={20} className="text-gray-600" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-gray-100">
                                        <ImageIcon size={20} className="text-gray-600" />
                                    </button>
                                    <button className="p-2 rounded-full hover:bg-gray-100">
                                        <Smile size={20} className="text-gray-600" />
                                    </button>
                                </div>

                                <div className="flex-1 relative">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Écrivez votre message..."
                                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                        rows={1}
                                        style={{ minHeight: '44px', maxHeight: '120px' }}
                                    />
                                </div>

                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className={`p-3 rounded-full ${message.trim()
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
                        <div className="text-center p-8">
                            <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
                                <MessageSquare size={48} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-700 mb-2">Vos messages</h3>
                            <p className="text-gray-500 max-w-md mb-6">
                                Sélectionnez une conversation dans la liste pour commencer à discuter avec un agriculteur ou contacter notre équipe de support.
                            </p>
                            <Link
                                href="/dashboard/investor/farmers"
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 inline-flex items-center"
                            >
                                <Users size={18} className="mr-2" />
                                Explorer les agriculteurs
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}