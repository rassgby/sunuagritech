'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Menu, X, Home, Cloud, Layers,
    ShoppingBag, MessageSquare, LogOut,
    Search, Phone, Video, Users, Send, Check, CheckCheck,
    Paperclip, Smile, MoreVertical, Filter, Trash, Download, Mail, MapPin, FileText
} from 'lucide-react';

// Types pour la messagerie
interface Contact {
    id: number;
    name: string;
    avatar: string | null;
    status: 'online' | 'offline' | 'away';
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isTyping?: boolean;
    role: string;
}

interface Message {
    id: number;
    senderId: number;
    text: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    attachments?: {
        type: 'image' | 'document' | 'audio';
        url: string;
        name?: string;
    }[];
}

// Données simulées pour les contacts
const initialContacts: Contact[] = [
    {
        id: 1,
        name: "Moussa Diallo",
        avatar: null,
        status: 'online',
        lastMessage: "Bonjour, avez-vous des semences de tomates disponibles?",
        lastMessageTime: "10:24",
        unreadCount: 2,
        role: "Fournisseur d'intrants"
    },
    {
        id: 2,
        name: "Fatou Sow",
        avatar: null,
        status: 'offline',
        lastMessage: "Merci pour l'information sur les engrais biologiques.",
        lastMessageTime: "Hier",
        unreadCount: 0,
        role: "Conseillère agricole"
    },
    {
        id: 3,
        name: "AgriSemences SA",
        avatar: null,
        status: 'online',
        lastMessage: "Votre commande #4587 est en cours de préparation.",
        lastMessageTime: "12:05",
        unreadCount: 1,
        isTyping: true,
        role: "Fournisseur"
    },
    {
        id: 4,
        name: "Ibrahim Ndiaye",
        avatar: null,
        status: 'away',
        lastMessage: "Je serai disponible demain pour la livraison des produits.",
        lastMessageTime: "Lun",
        unreadCount: 0,
        role: "Transporteur"
    },
    {
        id: 5,
        name: "Coopérative de Thiès",
        avatar: null,
        status: 'online',
        lastMessage: "Nous avons une nouvelle offre sur les semences de maïs.",
        lastMessageTime: "Mar",
        unreadCount: 0,
        role: "Coopérative"
    },
    {
        id: 6,
        name: "Mamadou Seck",
        avatar: null,
        status: 'offline',
        lastMessage: "Pouvez-vous me dire plus sur votre projet de culture?",
        lastMessageTime: "03/04",
        unreadCount: 0,
        role: "Agriculteur"
    },
    {
        id: 7,
        name: "Support SunuAgri",
        avatar: null,
        status: 'online',
        lastMessage: "N'hésitez pas à nous contacter si vous avez d'autres questions!",
        lastMessageTime: "28/03",
        unreadCount: 0,
        role: "Support technique"
    },
    {
        id: 8,
        name: "HydroTech Sénégal",
        avatar: null,
        status: 'online',
        lastMessage: "Votre système d'irrigation sera livré la semaine prochaine.",
        lastMessageTime: "25/03",
        unreadCount: 0,
        role: "Fournisseur d'équipements"
    }
];

// Données simulées pour les messages d'une conversation
const initialMessages: Message[] = [
    {
        id: 1,
        senderId: 1,
        text: "Bonjour Amadou, j'espère que vous allez bien. Je cherche des semences de tomates adaptées au climat de la région de Thiès.",
        timestamp: "10:10",
        status: 'read'
    },
    {
        id: 2,
        senderId: 0, // L'utilisateur actuel
        text: "Bonjour Moussa! Oui, je vais bien, merci. Je cultive principalement des tomates Roma et des Marmande qui sont très bien adaptées à notre climat.",
        timestamp: "10:15",
        status: 'read'
    },
    {
        id: 3,
        senderId: 1,
        text: "Excellent! Avez-vous des semences disponibles actuellement? Je prévois de planter sur environ un demi-hectare.",
        timestamp: "10:20",
        status: 'read'
    },
    {
        id: 4,
        senderId: 0,
        text: "Je n'en ai pas en ce moment, mais je peux vous recommander AgriSemences SA. Ils ont un très bon stock et leurs semences sont certifiées.",
        timestamp: "10:22",
        status: 'delivered'
    },
    {
        id: 5,
        senderId: 1,
        text: "Parfait, merci pour cette information! Avez-vous leur contact?",
        timestamp: "10:24",
        status: 'delivered'
    },
    {
        id: 6,
        senderId: 1,
        text: "Et utilisez-vous un type particulier d'engrais pour vos cultures de tomates?",
        timestamp: "10:24",
        status: 'sent'
    }
];

// Composant pour la bulle de statut
const StatusBubble = ({ status }: { status: string }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'offline': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };
    
    return (
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${getStatusColor()}`}></span>
    );
};

// Composant pour un contact dans la liste
const ContactItem = ({ contact, active, onClick }: { contact: Contact, active: boolean, onClick: () => void }) => {
    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };
    
    return (
        <div 
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 relative ${active ? 'bg-green-50' : ''}`}
            onClick={onClick}
        >
            <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    {contact.avatar ? (
                        <Image width="200" height="100" src={contact.avatar} alt={contact.name} className="w-full h-full rounded-full" />
                    ) : (
                        getInitials(contact.name)
                    )}
                </div>
                <span className={`absolute right-0 bottom-0 block h-3 w-3 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-green-500' : 
                    contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></span>
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500 truncate">
                        {contact.isTyping ? (
                            <span className="text-green-600 italic">En train d&apos;écrire...</span>
                        ) : (
                            contact.lastMessage
                        )}
                    </p>
                    {contact.unreadCount > 0 && (
                        <span className="bg-green-500 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                            {contact.unreadCount}
                        </span>
                    )}
                </div>
                <div className="mt-1">
                    <span className="text-xs text-gray-400">{contact.role}</span>
                </div>
            </div>
        </div>
    );
};

// Composant pour un message
const MessageBubble = ({ message, isOwn }: { message: Message, isOwn: boolean }) => {
    return (
        <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-xs sm:max-w-md ${
                isOwn ? 'bg-green-100 text-gray-800' : 'bg-gray-100 text-gray-800'
            }`}>
                <p className="text-sm">{message.text}</p>
                <div className="mt-1 flex items-center justify-end">
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    {isOwn && (
                        <span className="ml-1">
                            {message.status === 'sent' && <Check className="h-3 w-3 text-gray-400" />}
                            {message.status === 'delivered' && <CheckCheck className="h-3 w-3 text-gray-400" />}
                            {message.status === 'read' && <CheckCheck className="h-3 w-3 text-green-500" />}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function FarmerMessages() {
    // États
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [contacts] = useState<Contact[]>(initialContacts);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [activeContactId, setActiveContactId] = useState<number>(1);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showContactInfo, setShowContactInfo] = useState(false);
    
    const activeContact = contacts.find(contact => contact.id === activeContactId);
    
    // Filtrer les contacts en fonction de la recherche
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Fonction pour envoyer un message
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageText.trim() === '') return;
        
        const newMessage: Message = {
            id: messages.length + 1,
            senderId: 0, // L'utilisateur actuel
            text: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };
        
        setMessages([...messages, newMessage]);
        setMessageText('');
        
        // Simuler une réponse après un délai
        setTimeout(() => {
            // Changer le statut du message envoyé à 'delivered'
            setMessages(prevMessages => 
                prevMessages.map(msg => 
                    msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                )
            );
        }, 1000);
    };
    
    // Effet pour faire défiler vers le bas lorsque de nouveaux messages arrivent
    useEffect(() => {
        const chatContainer = document.getElementById('chat-messages');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

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
                            <Link href="/farmer/marketplace" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                                <ShoppingBag className="mr-4 h-6 w-6" />
                                Marché
                            </Link>
                            <Link href="/farmer/messages" className="bg-green-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
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
                            <Link href="/farmer/marketplace" className="text-green-100 hover:bg-green-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                <ShoppingBag className="mr-3 h-6 w-6" />
                                Marché
                            </Link>
                            <Link href="/farmer/messages" className="bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
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

                <main className="flex-1 overflow-hidden">
                    <div className="h-screen flex flex-col">
                        <div className="py-2">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
                            </div>
                        </div>
                        
                        <div className="flex-1 flex overflow-hidden">
                            {/* Panneau des contacts */}
                            <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col border-r border-gray-200 bg-white">
                                <div className="p-4 border-b border-gray-200">
                                    <form className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                            placeholder="Rechercher des contacts..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </form>
                                </div>
                                
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-700">Contacts récents</span>
                                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                            {contacts.filter(c => c.unreadCount > 0).length}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <Filter className="h-4 w-4" />
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <Users className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
                                    {filteredContacts.map(contact => (
                                        <ContactItem 
                                            key={contact.id}
                                            contact={contact}
                                            active={contact.id === activeContactId}
                                            onClick={() => setActiveContactId(contact.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            {/* Zone de chat */}
                            <div className="hidden lg:flex lg:w-2/3 xl:w-3/4 flex-col bg-white">
                                {activeContact ? (
                                    <>
                                        {/* En-tête du chat */}
                                        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                                                    {activeContact.avatar ? (
                                                        <Image width="100" height="100" src={activeContact.avatar} alt={activeContact.name} className="w-full h-full rounded-full"/>
                                                    ) : (
                                                        activeContact.name.split(' ').map(word => word[0]).join('').toUpperCase()
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-gray-900">{activeContact.name}</h3>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <StatusBubble status={activeContact.status} />
                                                        <span className="ml-1">
                                                            {activeContact.status === 'online' ? 'En ligne' : 
                                                             activeContact.status === 'away' ? 'Absent' : 'Hors ligne'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3">
                                                <button className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100">
                                                    <Phone className="h-5 w-5" />
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100">
                                                    <Video className="h-5 w-5" />
                                                </button>
                                                <button 
                                                    className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100"
                                                    onClick={() => setShowContactInfo(!showContactInfo)}
                                                >
                                                    <MoreVertical className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Conteneur des messages */}
                                        <div id="chat-messages" className="flex-1 p-4 overflow-y-auto bg-gray-50">
                                            {messages.map(message => (
                                                <MessageBubble 
                                                    key={message.id}
                                                    message={message}
                                                    isOwn={message.senderId === 0}
                                                />
                                            ))}
                                        </div>
                                        
                                        {/* Zone de saisie */}
                                        <div className="p-3 border-t border-gray-200">
                                            <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                                                <div className="flex space-x-1">
                                                    <button type="button" className="text-gray-400 hover:text-gray-600 rounded-full p-2 hover:bg-gray-100">
                                                        <Paperclip className="h-5 w-5" />
                                                    </button>
                                                    <button type="button" className="text-gray-400 hover:text-gray-600 rounded-full p-2 hover:bg-gray-100">
                                                        <Image src="/placeholder-image.jpg" alt="Placeholder image" className="h-5 w-5" width={20} height={20} />
                                                    </button>
                                                </div>
                                                
                                                <div className="flex-1 relative">
                                                    <textarea
                                                        rows={1}
                                                        className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-none"
                                                        placeholder="Tapez votre message..."
                                                        value={messageText}
                                                        onChange={(e) => setMessageText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault();
                                                                handleSendMessage(e);
                                                            }
                                                        }}
                                                    ></textarea>
                                                    <button type="button" className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600">
                                                        <Smile className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                
                                                <button
                                                    type="submit"
                                                    className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    <Send className="h-5 w-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </>
                                ) : (
                                    // État vide lorsqu'aucune conversation n'est sélectionnée
                                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                                        <MessageSquare className="h-16 w-16 text-gray-300" />
                                        <h3 className="mt-4 text-lg font-medium text-gray-900">Vos messages</h3>
                                        <p className="mt-1 text-sm text-gray-500">Sélectionnez un contact pour commencer à discuter</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Panneau d'information du contact - visible uniquement si showContactInfo est true */}
                            {showContactInfo && activeContact && (
                                <div className="hidden xl:block w-1/4 border-l border-gray-200 bg-white overflow-y-auto">
                                    <div className="p-6">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-600 font-semibold text-xl">
                                                {activeContact.avatar ? (
                                                    <Image width="100" height="100" src={activeContact.avatar} alt={activeContact.name} className="w-full h-full rounded-full"/>
                                                ) : (
                                                    activeContact.name.split(' ').map(word => word[0]).join('').toUpperCase()
                                                )}
                                            </div>
                                            <h3 className="mt-4 text-lg font-medium text-gray-900">{activeContact.name}</h3>
                                            <p className="text-sm text-gray-500">{activeContact.role}</p>
                                            
                                            <div className="flex items-center justify-center mt-2">
                                                <StatusBubble status={activeContact.status} />
                                                <span className="ml-1 text-sm text-gray-500">
                                                    {activeContact.status === 'online' ? 'En ligne' : 
                                                     activeContact.status === 'away' ? 'Absent' : 'Hors ligne'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                            <h4 className="text-sm font-medium text-gray-900">Informations de contact</h4>
                                            
                                            <div className="mt-4 space-y-4">
                                                <div className="flex">
                                                    <Phone className="h-5 w-5 text-gray-400" />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">Téléphone</p>
                                                        <p className="text-sm text-gray-500">+221 77 123 45 67</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                                        <p className="text-sm text-gray-500">{activeContact.name.toLowerCase().replace(' ', '.') + '@example.com'}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex">
                                                    <MapPin className="h-5 w-5 text-gray-400" />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">Localisation</p>
                                                        <p className="text-sm text-gray-500">Région de Thiès, Sénégal</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                            <h4 className="text-sm font-medium text-gray-900">Fichiers partagés</h4>
                                            
                                            <div className="mt-4 space-y-3">
                                                <div className="flex items-center p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                                                    <div className="flex-shrink-0 bg-gray-100 p-2 rounded">
                                                        <FileText className="h-5 w-5 text-gray-500" />
                                                    </div>
                                                    <div className="ml-3 flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">Guide_culture_tomates.pdf</p>
                                                        <p className="text-xs text-gray-500">5.2MB · 10 avril 2025</p>
                                                    </div>
                                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                                        <Download className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                
                                                <div className="flex items-center p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                                                    <div className="flex-shrink-0 bg-gray-100 p-2 rounded">
                                                        <Image src="/placeholder-image.jpg" alt="Placeholder image" className="h-5 w-5 text-gray-500" width={20} height={20} />
                                                    </div>
                                                    <div className="ml-3 flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">Photo_champ_tomates.jpg</p>
                                                        <p className="text-xs text-gray-500">1.8MB · 8 avril 2025</p>
                                                    </div>
                                                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                                                        <Download className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-6 border-t border-gray-200 pt-6">
                                            <div className="flex">
                                                <button className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    <Trash className="h-5 w-5 mr-2" />
                                                    Supprimer la conversation
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* État vide pour mobile - affiché lorsqu'aucun contact n'est sélectionné */}
                            <div className="lg:hidden flex-1 flex flex-col items-center justify-center bg-gray-50">
                                <MessageSquare className="h-16 w-16 text-gray-300" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">Vos messages</h3>
                                <p className="mt-1 text-sm text-gray-500">Sélectionnez un contact pour commencer à discuter</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}