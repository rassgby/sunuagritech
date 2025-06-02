"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sprout, ChevronRight, CheckCircle2 } from "lucide-react"

export default function AProposPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">SunuAgri</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-green-600">
              Accueil
            </Link>
            <Link href="/marche" className="font-medium transition-colors hover:text-green-600">
              Marché
            </Link>
            <Link href="/investissements" className="font-medium transition-colors hover:text-green-600">
              Investissements
            </Link>
            <Link href="/agriculteurs" className="font-medium transition-colors hover:text-green-600">
              Agriculteurs
            </Link>
            <Link href="/a-propos" className="font-medium text-green-600">
              À Propos
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:flex">
              Se Connecter
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">S&apos;inscrire</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                    À Propos de Nous
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre Mission</h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    SunuAgri a été créé avec une vision claire : transformer le secteur agricole au Sénégal en
                    connectant tous les acteurs de la chaîne de valeur sur une plateforme unique.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500">
                    Notre objectif est de créer un écosystème agricole dynamique et inclusif qui favorise la croissance
                    économique, la sécurité alimentaire et le développement durable au Sénégal.
                  </p>
                  <p className="text-gray-500">
                    Nous croyons fermement que l&apos;agriculture est la clé du développement économique du Sénégal, et
                    nous nous engageons à soutenir les agriculteurs, les investisseurs et les acheteurs dans leur
                    parcours.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Rejoindre Notre Équipe
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Contactez-Nous</Button>
                </div>
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Notre équipe"
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Nos Valeurs</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ce qui nous guide</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nos valeurs fondamentales définissent notre approche et notre engagement envers tous nos partenaires.
                </p>
              </div>
            </div>
            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Transparence</h3>
                <p className="text-center text-gray-500">
                  Nous croyons en une communication ouverte et honnête avec tous nos partenaires, garantissant que
                  chaque transaction est transparente et équitable.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-center text-gray-500">
                  Nous recherchons constamment de nouvelles façons d&apos;améliorer notre plateforme et de soutenir le
                  secteur agricole avec des solutions technologiques modernes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Durabilité</h3>
                <p className="text-center text-gray-500">
                  Nous nous engageons à promouvoir des pratiques agricoles durables qui préservent l&apos;environnement
                  et assurent la viabilité à long terme du secteur.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center justify-center order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Notre histoire"
                  className="rounded-lg object-cover"
                />
              </motion.div>
              <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                    Notre Histoire
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Comment tout a commencé
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    SunuAgri est né de la vision d&apos;un groupe d&apos;entrepreneurs passionnés par
                    l&apos;agriculture et le développement économique du Sénégal.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500">
                    En 2025, notre équipe fondatrice a identifié les défis majeurs auxquels sont confrontés les
                    agriculteurs sénégalais : accès limité aux marchés, difficultés de financement et manque de
                    connexion avec les acheteurs potentiels.
                  </p>
                  <p className="text-gray-500">
                    Après des mois de recherche et de développement, nous avons lancé SunuAgri avec la mission de
                    créer une plateforme qui réunit tous les acteurs de la chaîne de valeur agricole.
                  </p>
                  <p className="text-gray-500">
                    Aujourd&apos;hui, nous sommes fiers de soutenir des milliers d&apos;agriculteurs,
                    d&apos;investisseurs et d&apos;acheteurs à travers le Sénégal, contribuant ainsi au développement
                    durable du secteur agricole.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  Notre Équipe
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Les visages derrière SunuAgri</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Notre équipe diversifiée et passionnée travaille chaque jour pour améliorer l&apos;expérience de nos
                  utilisateurs.
                </p>
              </div>
            </div>
            <motion.div
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Membre de l'équipe"
                  className="rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold">Seydina M.R GOUDIABY</h3>
                  {/* <p className="text-sm text-gray-500">Fondateur & PDG</p> */}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Membre de l'équipe"
                  className="rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold">Amadou Korka DIALLO</h3>
                  {/* <p className="text-sm text-gray-500">Directrice des Opérations</p> */}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Membre de l'équipe"
                  className="rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold">Ababacar KOUDOUL</h3>
                  {/* <p className="text-sm text-gray-500">Directeur Technique</p> */}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  width={200}
                  height={200}
                  alt="Membre de l'équipe"
                  className="rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold">Adolph Amadou GALLAND</h3>
                  {/* <p className="text-sm text-gray-500">Directeur Technique</p> */}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                  Rejoignez-nous dans cette aventure
                </h2>
                <p className="max-w-[900px] text-green-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Que vous soyez agriculteur, investisseur ou acheteur, nous vous invitons à faire partie de notre
                  communauté.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button className="bg-white text-green-600 hover:bg-green-50">
                  S&apos;inscrire Maintenant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-green-700">
                  En Savoir Plus
                </Button>
              </motion.div>
            </div>
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
