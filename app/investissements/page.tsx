"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { Sprout, Search, Filter, TrendingUp, ChevronDown, Users, Calendar, Percent } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function InvestissementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("Tous")

  const categories = ["Tous", "Cultures", "Élevage", "Transformation", "Équipement", "Infrastructure"]

  const projects = [
    {
      id: 1,
      title: "Expansion de la culture de mangues biologiques",
      category: "Cultures",
      location: "Région de Casamance",
      fundingGoal: 15000000,
      fundingCurrent: 9750000,
      investors: 24,
      returnRate: "18-22%",
      duration: "36 mois",
      image: "/mangue.jpg?height=200&width=350",
    },
    {
      id: 2,
      title: "Ferme avicole moderne",
      category: "Élevage",
      location: "Région de Thiès",
      fundingGoal: 8000000,
      fundingCurrent: 6400000,
      investors: 18,
      returnRate: "15-18%",
      duration: "24 mois",
      image: "/fermeavicole.avif?height=200&width=350",
    },
    {
      id: 3,
      title: "Unité de transformation de céréales",
      category: "Transformation",
      location: "Région de Diourbel",
      fundingGoal: 12000000,
      fundingCurrent: 4800000,
      investors: 12,
      returnRate: "16-20%",
      duration: "48 mois",
      image: "/unite.jpg?height=200&width=350",
    },
    {
      id: 4,
      title: "Acquisition de tracteurs et équipements agricoles",
      category: "Équipement",
      location: "Région de Louga",
      fundingGoal: 20000000,
      fundingCurrent: 14000000,
      investors: 32,
      returnRate: "14-17%",
      duration: "60 mois",
      image: "/tracteur.jpeg?height=200&width=350",
    },
    {
      id: 5,
      title: "Construction d'un système d'irrigation",
      category: "Infrastructure",
      location: "Région de Saint-Louis",
      fundingGoal: 25000000,
      fundingCurrent: 17500000,
      investors: 28,
      returnRate: "17-21%",
      duration: "48 mois",
      image: "/irrigation.jpg?height=200&width=350",
    },
    {
      id: 6,
      title: "Plantation d'arbres fruitiers",
      category: "Cultures",
      location: "Région de Fatick",
      fundingGoal: 10000000,
      fundingCurrent: 7000000,
      investors: 15,
      returnRate: "16-19%",
      duration: "36 mois",
      image: "/plantation.jpg?height=200&width=350",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "Tous" || project.category === category
    return matchesSearch && matchesCategory
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Opportunités d&apos;Investissement
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Investissez dans l&apos;agriculture sénégalaise et contribuez au développement du secteur tout en
                  obtenant des rendements attractifs.
                </p>
              </div>
              <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Rechercher des projets..."
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
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={category === cat ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <motion.div
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/connexion`}>
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="text-sm font-medium text-white">{project.category}</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2">{project.title}</h3>
                      <div className="mt-2 text-sm text-gray-500">{project.location}</div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progression</span>
                          <span className="font-medium">
                            {Math.round((project.fundingCurrent / project.fundingGoal) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(project.fundingCurrent / project.fundingGoal) * 100}
                          className="mt-1 h-2 bg-gray-100"
                        />
                        <div className="mt-1 flex items-center justify-between text-sm">
                          <span className="text-gray-500">{(project.fundingCurrent / 1000000).toFixed(1)}M FCFA</span>
                          <span className="text-gray-500">{(project.fundingGoal / 1000000).toFixed(1)}M FCFA</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="rounded-md bg-green-50 p-2">
                          <Percent className="mx-auto h-4 w-4 text-green-600" />
                          <div className="mt-1 font-medium">{project.returnRate}</div>
                          <div className="text-gray-500">Rendement</div>
                        </div>
                        <div className="rounded-md bg-green-50 p-2">
                          <Calendar className="mx-auto h-4 w-4 text-green-600" />
                          <div className="mt-1 font-medium">{project.duration}</div>
                          <div className="text-gray-500">Durée</div>
                        </div>
                        <div className="rounded-md bg-green-50 p-2">
                          <Users className="mx-auto h-4 w-4 text-green-600" />
                          <div className="mt-1 font-medium">{project.investors}</div>
                          <div className="text-gray-500">Investisseurs</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Investir
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            {filteredProjects.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500">Aucun projet ne correspond à votre recherche.</p>
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
