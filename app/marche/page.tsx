"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import { Sprout, Search, Filter, ShoppingBag, ChevronDown, Star } from "lucide-react"

export default function MarchePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("Tous")

  const categories = ["Tous", "Fruits", "Légumes", "Céréales", "Produits laitiers", "Viande"]

  const products = [
    {
      id: 1,
      name: "Mangues",
      category: "Fruits",
      price: 1500,
      unit: "kg",
      rating: 4.8,
      reviews: 24,
      location: "Région de Casamance",
      image: "/mangue.jpg?height=200&width=200",
    },
    {
      id: 2,
      name: "Tomates",
      category: "Légumes",
      price: 800,
      unit: "kg",
      rating: 4.5,
      reviews: 18,
      location: "Région de Thiès",
      image: "/Tomate.jpg?height=200&width=200",
    },
    {
      id: 3,
      name: "Mil",
      category: "Céréales",
      price: 500,
      unit: "kg",
      rating: 4.7,
      reviews: 32,
      location: "Région de Diourbel",
      image: "/mil.png?height=200&width=200",
    },
    {
      id: 4,
      name: "Lait frais",
      category: "Produits laitiers",
      price: 1200,
      unit: "L",
      rating: 4.9,
      reviews: 15,
      location: "Région de Saint-Louis",
      image: "/lait.jpg?height=200&width=200",
    },
    {
      id: 5,
      name: "Poulet fermier",
      category: "Viande",
      price: 3500,
      unit: "unité",
      rating: 4.6,
      reviews: 27,
      location: "Région de Fatick",
      image: "/poulet.jpg?height=200&width=200",
    },
    {
      id: 6,
      name: "Oignons",
      category: "Légumes",
      price: 700,
      unit: "kg",
      rating: 4.4,
      reviews: 21,
      location: "Région de Louga",
      image: "/oignons.jpg?height=200&width=200",
    },
    {
      id: 7,
      name: "Bananes",
      category: "Fruits",
      price: 1000,
      unit: "kg",
      rating: 4.7,
      reviews: 19,
      location: "Région de Ziguinchor",
      image: "/banane.png?height=200&width=200",
    },
    {
      id: 8,
      name: "Riz local",
      category: "Céréales",
      price: 600,
      unit: "kg",
      rating: 4.8,
      reviews: 36,
      location: "Région de Casamance",
      image: "/riz.png?height=200&width=200",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "Tous" || product.category === category
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Marché Agricole</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez et achetez des produits frais directement auprès des agriculteurs sénégalais.
                </p>
              </div>
              <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Rechercher des produits..."
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
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/connexion`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <span className="text-sm text-gray-500">{product.category}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews} avis)</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">{product.location}</div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="font-bold text-green-600">
                          {product.price} FCFA<span className="text-xs font-normal">/{product.unit}</span>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Acheter
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            {filteredProducts.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500">Aucun produit ne correspond à votre recherche.</p>
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
