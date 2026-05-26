import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Nom du projet */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold" style={{ color: '#1F5A68' }}>
              جذور
            </Link>
            <span className="ml-2 text-sm text-gray-500 hidden sm:inline">
              | Moteur Morphologique
            </span>
          </div>

          {/* Liens de navigation */}
          <div className="flex space-x-8">
            <Link
              to="/Accueil"
              className="text-gray-700 hover:text-[#1F5A68] transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/racines"
              className="text-gray-700 hover:text-[#1F5A68] transition-colors duration-200 font-medium"
            >
              Arbre
            </Link>
             <Link
              to="/Schéma"
              className="text-gray-700 hover:text-[#1F5A68] transition-colors duration-200 font-medium"
            >
              Schéma
            </Link>
            <Link
              to="/Dérivation"
              className="text-gray-700 hover:text-[#1F5A68] transition-colors duration-200 font-medium"
            >
              Dérivation
            </Link>
             <Link
              to="/Quiz"
              className="text-gray-700 hover:text-[#1F5A68] transition-colors duration-200 font-medium"
            >
              Quiz
            </Link>
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;