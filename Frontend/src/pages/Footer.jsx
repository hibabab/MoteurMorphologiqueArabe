const Footer = () => {
  return (  // <-- Il manquait le return !
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <h3 className="text-xl font-bold">Moteur Morphologique Arabe</h3>
          <p className="text-gray-400 text-sm mt-1">© 2026 Tous droits réservés</p>
          Projet de développement d'un moteur morphologique pour la langue arabe
        </div>
      </div>
    </footer>
  );
};

export default Footer;