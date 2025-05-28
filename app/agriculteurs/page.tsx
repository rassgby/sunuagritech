"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { Sprout, Search, Filter, ChevronDown, MapPin, Phone, Mail } from "lucide-react"

export default function AgriculteursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("Toutes")

  const regions = ["Toutes", "Dakar", "Thiès", "Saint-Louis", "Casamance", "Diourbel", "Fatick", "Louga"]

  const farmers = [
    {
      id: 1,
      name: "Amadou Diop",
      region: "Thiès",
      specialties: ["Maraîchage", "Arboriculture"],
      experience: "15 ans",
      phone: "+221 XX XXX XX XX",
      email: "amadou.diop@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Fatou Ndiaye",
      region: "Dakar",
      specialties: ["Agriculture urbaine", "Hydroponie"],
      experience: "8 ans",
      phone: "+221 XX XXX XX XX",
      email: "fatou.ndiaye@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "Moussa Sow",
      region: "Saint-Louis",
      specialties: ["Riziculture", "Élevage"],
      experience: "20 ans",
      phone: "+221 XX XXX XX XX",
      email: "moussa.sow@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Aïda Mbaye",
      region: "Casamance",
      specialties: ["Cultures fruitières", "Transformation"],
      experience: "12 ans",
      phone: "+221 XX XXX XX XX",
      email: "aida.mbaye@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      name: "Ibrahima Fall",
      region: "Diourbel",
      specialties: ["Céréales", "Arachide"],
      experience: "18 ans",
      phone: "+221 XX XXX XX XX",
      email: "ibrahima.fall@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      name: "Mariama Diallo",
      region: "Fatick",
      specialties: ["Aviculture", "Maraîchage"],
      experience: "10 ans",
      phone: "+221 XX XXX XX XX",
      email: "mariama.diallo@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 7,
      name: "Ousmane Gueye",
      region: "Louga",
      specialties: ["Élevage bovin", "Fourrage"],
      experience: "25 ans",
      phone: "+221 XX XXX XX XX",
      email: "ousmane.gueye@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 8,
      name: "Coumba Sarr",
      region: "Thiès",
      specialties: ["Agriculture biologique", "Permaculture"],
      experience: "7 ans",
      phone: "+221 XX XXX XX XX",
      email: "coumba.sarr@example.com",
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRegion = region === "Toutes" || farmer.region === region
    return matchesSearch && matchesRegion
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nos Agriculteurs</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez les agriculteurs sénégalais qui font partie de notre réseau et entrez en contact avec eux.
                </p>
              </div>
              <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Rechercher par nom ou spécialité..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrer
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {regions.map((reg) => (
                <Button
                  key={reg}
                  variant={region === reg ? "default" : "outline"}
                  className={region === reg ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setRegion(reg)}
                >
                  {reg}
                </Button>
              ))}
            </div>
            <motion.div
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredFarmers.map((farmer) => (
                <motion.div
                  key={farmer.id}
                  className="flex flex-col items-center rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={farmer.image || "/placeholder.svg"}
                    alt={farmer.name}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{farmer.name}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {farmer.region}
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {farmer.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <span className="font-medium">Expérience:</span> {farmer.experience}
                  </div>
                  <div className="mt-6 w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      {farmer.phone}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      {farmer.email}
                    </Button>
                  </div>
                  <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">Contacter</Button>
                </motion.div>
              ))}
            </motion.div>
            {filteredFarmers.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500">Aucun agriculteur ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-green-900 text-green-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">SunuAgri</span>
            </div>
            <div className="text-right text-sm text-green-300">
              © {new Date().getFullYear()} SunuAgri. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
