import React, { useState, useEffect } from "react";
import Navbar from './navbar';
import Footer from './Footer';

const RacinesUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [racines, setRacines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRacines();
  }, []);

  const fetchRacines = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/racines');
      const data = await response.json();
      setRacines(data);
    } catch (err) {
      console.error('Erreur lors du chargement des racines', err);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const content = await file.text();
      const response = await fetch('http://localhost:8080/api/racines/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: content
      });

      const result = await response.json();
      setMessage({ type: 'success', text: `${result.nouvelles_racines} racines ajoutées` });
      setFile(null);
      
      fetchRacines();
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'upload' });
    }
    setUploading(false);
  };

  const filteredRacines = racines.filter(r => {
    // Gestion du HashMap: derives est un objet {mot: count}
    const derivesObj = r.derives || {};
    const derivesKeys = Object.keys(derivesObj);
    
    return (
      r.racine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      derivesKeys.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8">
          
          {/* SECTION UPLOAD */}
          <div className="bg-white rounded-xl p-8 border">
            <h2 className="text-lg font-medium text-gray-700 mb-6">
              📤 Importer des racines
            </h2>
            
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              {!file ? (
                <>
                  <div className="text-4xl mb-4">📄</div>
                  <label className="px-6 py-2 bg-[#1F5A68] text-white rounded-lg cursor-pointer inline-block hover:bg-[#15444F]">
                    Choisir un fichier
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".txt"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">✅</div>
                  <p className="font-medium mb-4">{file.name}</p>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={handleUpload}
                      disabled={uploading}
                      className="px-6 py-2 bg-[#1F5A68] text-white rounded-lg hover:bg-[#15444F] disabled:opacity-50"
                    >
                      {uploading ? 'En cours...' : 'Importer'}
                    </button>
                    <button 
                      onClick={() => setFile(null)}
                      className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Annuler
                    </button>
                  </div>
                </>
              )}
            </div>

            {message && (
              <div className={`mt-4 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}
          </div>

          {/* SECTION LISTE DES RACINES */}
          <div className="bg-white rounded-xl p-8 border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-700">
                📚 Liste des racines ({filteredRacines.length})
              </h2>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div className="mb-6">
              <input 
                type="text"
                placeholder="🔍 Rechercher une racine ou un dérivé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F5A68] focus:border-transparent"
              />
            </div>

            {/* LISTE */}
            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Chargement...
              </div>
            ) : filteredRacines.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'Aucune racine trouvée' : 'Aucune racine disponible'}
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredRacines.map((item, index) => {
                  // Convertir l'objet HashMap en array de [mot, count]
                  const derivesObj = item.derives || {};
                  const derivesEntries = Object.entries(derivesObj);
                  
                  return (
                    <div 
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-semibold text-[#1F5A68] text-lg min-w-[80px]">
                          {item.racine}
                        </span>
                        <div className="flex-1">
                          {derivesEntries.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {derivesEntries.map(([derive, count], idx) => (
                                <span 
                                  key={idx}
                                  className="px-3 py-1 bg-[#E6F3F5] text-[#1F5A68] text-sm rounded-full flex items-center gap-1"
                                >
                                  <span>{derive}</span>
                                  {count > 1 && (
                                    <span className="bg-[#1F5A68] text-white text-xs px-1.5 py-0.5 rounded-full">
                                      {count}
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm italic">
                              Aucun dérivé
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RacinesUpload;
