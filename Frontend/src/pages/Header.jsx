import React from "react";

import { motion } from "framer-motion";
import Navbar from './navbar';
import Footer from './Footer';

import accImage from '../assets/acc.jpg';

function Accueil() {
  const objectifs = [
    {
      id: 1,
      titre: "Analyse Morphologique",
      description: "Décomposer les mots arabes en racines et schèmes pour comprendre leur structure"
    },
    {
      id: 2,
      titre: "Dérivation Arabe",
      description: "Identifier les patterns de déviation des mots à partir des racines trilitères"
    },
    {
      id: 3,
      titre: "Traitement Automatique",
      description: "Développer un moteur performant pour l'analyse morphologique de l'arabe"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== NAVBAR TOUT EN HAUT ===== */}

      <Navbar />

      {/* Hero Section avec Image */}
      <section className="relative h-[500px]" style={{ backgroundColor: '#1F5A68' }}>
        <div className="absolute inset-0">
          <img
            src={accImage}
            alt="Manuscrit arabe ancien - poésie"
            className="w-full h-full object-cover opacity-30" />
          {/* Overlay avec motif géométrique islamique */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #FFFFFF 0px, #FFFFFF 2px, transparent 2px, transparent 8px)',
              backgroundSize: '20px 20px'
            }}>
          </div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          {/* Élément décoratif supérieur */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 0.8 }}
            className="h-1 mb-8 rounded-full"
            style={{ backgroundColor: '#E6D5A8' }} />

          {/* Première phrase - style calligraphique */}
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight"
            style={{
              fontFamily: "'Amiri', 'Scheherazade New', 'Traditional Arabic', 'Noto Naskh Arabic', serif",
              fontWeight: 700,
              textShadow: '4px 4px 8px rgba(0,0,0,0.3)',
              letterSpacing: '2px'
            }}
          >
            تحيـا الأمـة
          </motion.h1>

          {/* Élément décoratif central */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-1 mb-6 rounded-full"
            style={{ backgroundColor: '#B8D8DC' }} />

          {/* Deuxième phrase - style calligraphique avec effet */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center"
            style={{
              fontFamily: "'Amiri', 'Scheherazade New', 'Traditional Arabic', 'Noto Naskh Arabic', serif",
              fontWeight: 600,
              textShadow: '3px 3px 6px rgba(0,0,0,0.2)',
              color: '#E6D5A8',
              letterSpacing: '1px'
            }}
          >
            بإحيـاء لغتهـا
          </motion.h2>

          {/* Élément décoratif inférieur */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '180px' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-0.5 mt-10 rounded-full"
            style={{ backgroundColor: '#E6D5A8' }} />

          {/* Sous-titre français subtil */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-sm md:text-base text-gray-200 mt-8 tracking-widest uppercase"
          >
            ~ MOTEUR MORPHOLOGIQUE ARABE ~
          </motion.p>
        </div>
      </section>

      {/* Section Grand Div App */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#E6F3F5] to-[#D1E9EC] rounded-3xl p-10 shadow-lg" style={{ borderColor: '#B8D8DC', borderWidth: '1px' }}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#1F5A68' }}>
              À propos du projet
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
                  alt="Analyse linguistique"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover" />
              </div>
              <div className="md:w-1/2 space-y-4">
                <p className="text-lg text-gray-700">
                  Notre projet vise à créer un moteur morphologique complet pour la langue arabe,
                  capable d'analyser et de dériver les mots selon les règles de la morphologie arabe traditionnelle.
                </p>
                <p className="text-lg text-gray-700">
                  Ce moteur permettra de traiter automatiquement les textes arabes et d'en extraire
                  les informations morphologiques essentielles.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 Grilles Objectifs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nos Objectifs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {objectifs.map((obj) => (
              <motion.div
                key={obj.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: obj.id * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: '#E6F3F5' }}>
                  <span className="text-2xl font-bold" style={{ color: '#1F5A68' }}>{obj.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">
                  {obj.titre}
                </h3>
                <p className="text-gray-600 text-center">
                  {obj.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <Footer />
    </div>
  );
}

export default Accueil;