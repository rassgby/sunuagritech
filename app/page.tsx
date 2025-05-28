"use client";

import { useEffect } from "react";
import router from "next/router";
import Header from "@/components/header";
import Link from "next/link";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  Sprout,
  ShoppingBag,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Users,
  Check,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const handleClick = () => {
  //   router.push("/app/marche");
  // };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-green-50/30 to-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <MarketplaceSection />
        <InvestmentSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
      {/* Fond avec motif */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23166534' fillOpacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-2">
                <Sprout className="mr-1 h-3.5 w-3.5" />
                <span>Agriculture Sénégalaise</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-800">
                Cultivons <span className="italic">ensemble</span> l&apos;avenir
              </h1>
              <p className="max-w-[600px] text-gray-600 text-lg md:text-xl leading-relaxed">
                Une plateforme innovante qui réunit agriculteurs, investisseurs
                et acheteurs pour révolutionner l&apos;agriculture au Sénégal.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/inscription"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 text-white shadow-lg hover:shadow-green-200/50 active:shadow-green-300/60 transition-all duration-300 h-14 px-8 rounded-full flex items-center justify-center font-medium text-base w-full max-w-sm mx-auto"
              >
                Rejoindre la Plateforme
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Button
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 h-12 px-6 rounded-full"
              >
                En Savoir Plus
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-green-100">
                <span className="text-2xl font-bold text-green-700">5K+</span>
                <span className="text-xs text-gray-500">Agriculteurs</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-green-100">
                <span className="text-2xl font-bold text-green-700">₣2M</span>
                <span className="text-xs text-gray-500">Investis</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-green-100">
                <span className="text-2xl font-bold text-green-700">12</span>
                <span className="text-xs text-gray-500">Régions</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-full blur-3xl opacity-30 transform -rotate-6"></div>
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-green-100">
              <img
                src="/test.jpeg?height=500&width=500"
                width={1200}
                height={1200}
                alt="Agriculture au Sénégal"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <p className="font-medium">Cultures durables au Sénégal</p>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 h-16 w-16 rounded-full flex items-center justify-center shadow-lg">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 h-12 w-12 rounded-full flex items-center justify-center shadow-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 relative">
      {/* Motif d'arrière-plan */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fillRule='evenodd'%3E%3Cg fill='%23166534' fillOpacity='0.2'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zm18.34 20L40 38.59v1.41h-1.41L18.34 19.66l1.41-1.41 1.41 1.41zM20 0l2.83 2.83-1.41 1.41L18.59 1.41 17.17 0H20zM0 17.17l1.41-1.41 2.83 2.83-1.41 1.41L0 18.59v-1.42zM37.17 0L40 2.83v1.41l-2.83-2.83L37.17 0zm-1.41 37.17l-2.83 2.83h-1.41l2.83-2.83 1.41 1.41z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-2">
              <span>Nos Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800">
              Une Plateforme Complète
            </h2>
            <p className="text-gray-600 md:text-lg max-w-[800px] mx-auto">
              Nous offrons des solutions innovantes et personnalisées pour tous
              les acteurs de l&apos;agriculture sénégalaise.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/10 rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-300"></div>
            <div className="relative flex flex-col h-full p-6 bg-white rounded-2xl border border-green-100 shadow-lg shadow-green-100/20 group-hover:shadow-xl group-hover:shadow-green-100/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md w-14 h-14 flex items-center justify-center mb-4">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-800">
                Pour les Agriculteurs
              </h3>
              <p className="text-gray-600 flex-grow">
                Accédez à des investissements, vendez vos produits directement
                et connectez-vous avec d&apos;autres agriculteurs pour partager
                vos connaissances.
              </p>

              <ul className="mt-5 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Accès à des financements</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Vente directe aux consommateurs</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Formations et ressources</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-800 hover:bg-green-50 p-0 h-auto font-medium"
                >
                  En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/10 rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-300"></div>
            <div className="relative flex flex-col h-full p-6 bg-white rounded-2xl border border-green-100 shadow-lg shadow-green-100/20 group-hover:shadow-xl group-hover:shadow-green-100/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-xl shadow-md w-14 h-14 flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-800">
                Pour les Investisseurs
              </h3>
              <p className="text-gray-600 flex-grow">
                Découvrez des opportunités d&apos;investissement dans
                l&apos;agriculture sénégalaise avec des rendements attractifs et
                un impact social positif.
              </p>

              <ul className="mt-5 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Rendements compétitifs</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Diversification de portefeuille</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Impact social et environnemental</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-800 hover:bg-green-50 p-0 h-auto font-medium"
                >
                  En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/10 rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-300"></div>
            <div className="relative flex flex-col h-full p-6 bg-white rounded-2xl border border-green-100 shadow-lg shadow-green-100/20 group-hover:shadow-xl group-hover:shadow-green-100/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-xl shadow-md w-14 h-14 flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-800">
                Pour les Acheteurs
              </h3>
              <p className="text-gray-600 flex-grow">
                Achetez directement auprès des producteurs locaux et accédez à
                des produits frais, de qualité et traçables.
              </p>

              <ul className="mt-5 space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Produits frais et locaux</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Traçabilité complète</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Livraison rapide</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-800 hover:bg-green-50 p-0 h-auto font-medium"
                >
                  En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MarketplaceSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  function handleClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    router.push("/marche");
  }
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Motif décoratif */}
      <div className="absolute top-0 right-0 h-72 w-72 bg-yellow-400/10 rounded-full blur-3xl -mr-32 -mt-32 z-0"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-green-400/10 rounded-full blur-3xl -ml-32 -mb-32 z-0"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
          className="grid gap-12 lg:grid-cols-2 items-center"
        >
          <div className="flex flex-col justify-center space-y-5">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-2">
                <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                <span>Marché Digital</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800">
                Achetez et Vendez des Produits Agricoles
              </h2>
              <p className="text-gray-600 md:text-lg leading-relaxed">
                Notre plateforme de marché révolutionne le commerce agricole en
                permettant aux agriculteurs de vendre directement leurs produits
                et aux acheteurs de trouver des produits frais, locaux et de
                qualité.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/marche"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 text-white shadow-lg hover:shadow-green-200/50 active:shadow-green-300/60 transition-all duration-300 h-14 px-8 rounded-full flex items-center justify-center font-medium text-base w-full max-w-sm mx-auto"
              >
                Explorer le Marché
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Produits Frais
                  </h3>
                  <p className="text-sm text-gray-600">
                    Du producteur au consommateur en un temps record
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Prix Équitables
                  </h3>
                  <p className="text-sm text-gray-600">
                    Rémunération juste pour les agriculteurs
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Livraison Rapide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Système logistique optimisé pour votre satisfaction
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Qualité Garantie
                  </h3>
                  <p className="text-sm text-gray-600">
                    Contrôle qualité rigoureux sur tous les produits
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="relative flex items-center justify-center"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, delay: 0.2 },
              },
            }}
          >
            <div className="grid grid-cols-12 grid-rows-12 gap-4 relative">
              <div className="col-span-7 row-span-7 col-start-1 row-start-1 transform hover:scale-[1.03] transition-transform duration-300">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="/Goyave.jpg?height=300&width=300"
                    width={300}
                    height={300}
                    alt="Produits agricoles"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Fruits tropicaux</p>
                  </div>
                </div>
              </div>

              <div className="col-span-5 row-span-5 col-start-8 row-start-1 transform hover:scale-[1.03] transition-transform duration-300">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="/legumes.jpg?height=200&width=200"
                    width={200}
                    height={200}
                    alt="Produits agricoles"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Légumes frais</p>
                  </div>
                </div>
              </div>

              <div className="col-span-5 row-span-5 col-start-8 row-start-6 transform hover:scale-[1.03] transition-transform duration-300">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="/floco.webp?height=200&width=200"
                    width={200}
                    height={200}
                    alt="Produits agricoles"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Céréales bio</p>
                  </div>
                </div>
              </div>

              <div className="col-span-7 row-span-5 col-start-1 row-start-8 transform hover:scale-[1.03] transition-transform duration-300">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <img
                    src="/AGRO5.jpg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Produits agricoles"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-medium text-sm">Produits transformés</p>
                  </div>
                </div>
              </div>

              {/* Badge décoratif */}
              <div className="absolute -top-6 -right-6 bg-white h-24 w-24 rounded-full flex items-center justify-center shadow-lg border-4 border-green-100 z-10">
                <div className="text-center">
                  <p className="font-bold text-green-700 text-xl">100%</p>
                  <p className="text-xs text-green-600 font-medium">Local</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function InvestmentSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
          className="grid gap-12 lg:grid-cols-2 items-center"
        >
          <motion.div
            className="relative order-2 lg:order-1"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, delay: 0.2 },
              },
            }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-100 to-green-50 rounded-3xl rotate-1"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
                <img
                  src="/agriculture.jpg?height=500&width=800"
                  width={800}
                  height={1100}
                  alt="Investissement agricole"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center rounded-full bg-green-700/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white mb-2 w-fit">
                    <TrendingUp className="mr-1 h-3.5 w-3.5" />
                    <span>Taux de rendement 15-20%</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    Projets d&apos;investissement agricole
                  </h3>
                  <p className="text-sm text-green-50">
                    Diversifiez votre portefeuille avec des investissements à
                    impact positif
                  </p>
                </div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-lg p-4 shadow-lg border border-green-100">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">
                      Investisseurs actifs
                    </p>
                    <p className="font-bold text-green-700">1,250+</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -left-12 bg-yellow-400 rounded-lg py-2 px-4 shadow-lg transform -rotate-12">
                <p className="font-bold text-white text-lg">+18%</p>
                <p className="text-xs text-yellow-100">Rdt. moy.</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center space-y-5 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-2">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                <span>Investissements</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800">
                Investissez dans l&apos;Agriculture Sénégalaise
              </h2>
              <p className="text-gray-600 md:text-lg leading-relaxed">
                Découvrez des opportunités d&apos;investissement dans des
                projets agricoles prometteurs au Sénégal et contribuez au
                développement durable du secteur tout en obtenant des rendements
                attractifs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full">
                Voir les Opportunités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-6">
              <div className="bg-white rounded-xl p-5 shadow-md border border-green-100 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-green-800 mb-1">
                    Rendements Attractifs
                  </h3>
                  <p className="text-gray-600">
                    Des rendements moyens de 15-20% sur les projets agricoles,
                    bien supérieurs aux placements financiers traditionnels.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-green-100 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-gradient-to-br from-green-500 to-green-600 p-3 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-green-800 mb-1">
                    Impact Social
                  </h3>
                  <p className="text-gray-600">
                    Contribuez au développement des communautés rurales et à la
                    création d&apos;emplois tout en générant des rendements
                    financiers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23166534' fillOpacity='0.15' fillRule='evenodd'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            className="space-y-3 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-2">
              <span>Témoignages</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-800">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-gray-600 md:text-lg">
              Découvrez les expériences inspirantes de nos agriculteurs,
              investisseurs et acheteurs.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-300/5 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-md border border-green-100 group-hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;Grâce à SunuAgri, j&apos;ai pu vendre mes produits
                  directement aux consommateurs et augmenter mes revenus de 30%.
                  La plateforme a véritablement changé ma façon de faire des
                  affaires.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100">
                <img
                  src="/placeholder.svg?height=56&width=56"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-green-100 shadow-sm"
                  alt="Avatar"
                />
                <div>
                  <p className="font-bold text-green-800">Amadou Diop</p>
                  <p className="text-sm text-gray-500">
                    Agriculteur, Région de Thiès
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-300/5 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-md border border-green-100 group-hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;J&apos;ai investi dans plusieurs projets agricoles via
                  la plateforme et les rendements ont dépassé mes attentes. Le
                  processus est transparent, sécurisé et l&apos;impact sur les
                  communautés locales est remarquable.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100">
                <img
                  src="/placeholder.svg?height=56&width=56"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-green-100 shadow-sm"
                  alt="Avatar"
                />
                <div>
                  <p className="font-bold text-green-800">Fatou Ndiaye</p>
                  <p className="text-sm text-gray-500">Investisseuse, Dakar</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-300/5 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-md border border-green-100 group-hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;En tant que restaurateur, je trouve sur SunuAgri des
                  produits frais de qualité supérieure. La livraison est rapide,
                  les prix sont compétitifs et mes clients apprécient la qualité
                  des plats préparés avec ces ingrédients locaux.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100">
                <img
                  src="/placeholder.svg?height=56&width=56"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-green-100 shadow-sm"
                  alt="Avatar"
                />
                <div>
                  <p className="font-bold text-green-800">Moussa Sow</p>
                  <p className="text-sm text-gray-500">
                    Restaurateur, Saint-Louis
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"></div>

      {/* Motifs décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white mb-2">
              <span>Rejoignez-nous</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Rejoignez SunuAgri Aujourd&apos;hui
            </h2>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              Que vous soyez agriculteur, investisseur ou acheteur, notre
              plateforme vous offre des opportunités uniques pour développer
              votre activité et contribuer à l'essor de l'agriculture
              sénégalaise.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button className="bg-white text-green-700 hover:bg-green-50 shadow-lg hover:shadow-green-700/20 transition-all duration-300 h-12 px-8 rounded-full text-base font-medium">
              S&apos;inscrire Maintenant
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 text-white shadow-lg hover:shadow-green-200/50 active:shadow-green-300/60 transition-all duration-300 h-14 px-8 rounded-full flex items-center justify-center font-medium text-base w-full max-w-sm mx-auto"
            >
              En Savoir Plus
            </Button>
          </motion.div>

          {/* Statistiques */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-white">
                5000+
              </p>
              <p className="text-green-100 text-sm">Agriculteurs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-white">
                1200+
              </p>
              <p className="text-green-100 text-sm">Investisseurs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-white">
                3800+
              </p>
              <p className="text-green-100 text-sm">Acheteurs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-white">
                14
              </p>
              <p className="text-green-100 text-sm">Régions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative w-full py-12 md:py-16 bg-gradient-to-br from-green-800 to-green-900 text-green-50 overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-green-400 to-green-500 p-1.5 rounded-full">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SunuAgri</span>
            </div>
            <p className="text-green-200 text-sm">
              Connecter les agriculteurs, les investisseurs et les acheteurs
              pour développer l&apos;agriculture au Sénégal et assurer sa
              durabilité.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.2 15h-2v-6h2v6zm-1-6.9c-.647 0-1.1-.453-1.1-1.1 0-.647.453-1.1 1.1-1.1.647 0 1.1.453 1.1 1.1 0 .647-.453 1.1-1.1 1.1zM16 17h-2v-3.2c0-.8-.2-1.4-1.2-1.4-.8 0-1.2.6-1.2 1.4V17h-2v-6h2v.8c.4-.6.8-.8 1.8-.8 1.6 0 2.6 1 2.6 3v3z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-green-300 hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white border-b border-green-700/50 pb-2">
              Liens Rapides
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/marche"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Marché
                </Link>
              </li>
              <li>
                <Link
                  href="/investissements"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Investissements
                </Link>
              </li>
              <li>
                <Link
                  href="/agriculteurs"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Agriculteurs
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />À Propos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white border-b border-green-700/50 pb-2">
              Ressources
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-green-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white border-b border-green-700/50 pb-2">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 text-green-300 mt-0.5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-green-100">
                  123 Rue Principale, Dakar, Sénégal
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 text-green-300 mt-0.5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-green-100">+221 78 532 98 46</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 text-green-300 mt-0.5"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="16" rx="2" width="20" x="2" y="4" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-green-100">lumyotech@gmail.com</span>
              </li>
            </ul>

            <div className="pt-4">
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-md backdrop-blur-sm">
                Contactez-nous
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-green-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-green-200">
            © {new Date().getFullYear()} SunuAgri. Tous droits réservés.
          </p>
          <div className="flex gap-5 text-sm text-green-200">
            <Link href="#" className="hover:text-white transition-colors">
              Conditions d&apos;utilisation
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
