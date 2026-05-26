import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from './navbar';
import Footer from './Footer';

const isValidArabicRoot = (val) => /^[\u0600-\u06FF]{3}$/.test(val);
const isArabicOnly = (val) => /^[\u0600-\u06FF]+$/.test(val);

const FieldInput = ({ label, value, onChange, placeholder, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-right text-xl transition-colors ${
        error ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#1F5A68]'
      }`}
      style={{ fontFamily: "'Amiri', serif" }}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const About = () => {
  const [schemas, setSchemas] = useState([]);
  const [racine, setRacine] = useState("");
  const [racineError, setRacineError] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [loading, setLoading] = useState(false);

  const [motValider, setMotValider] = useState("");
  const [motValiderError, setMotValiderError] = useState("");
  const [racineValider, setRacineValider] = useState("");
  const [racineValiderError, setRacineValiderError] = useState("");
  const [resultatValidation, setResultatValidation] = useState(null);
  const [loadingValidation, setLoadingValidation] = useState(false);

  useEffect(() => { fetchSchemas(); }, []);

  const fetchSchemas = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/schemes');
      const data = await response.json();
      setSchemas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erreur chargement schèmes:', err);
      setSchemas([]);
    }
  };

  const handleRacineChange = (val) => {
    setRacine(val);
    if (!val) setRacineError("La racine est obligatoire.");
    else if (!isArabicOnly(val)) setRacineError("La racine doit contenir uniquement des caractères arabes.");
    else if (val.length !== 3) setRacineError(`3 lettres requises`);
    else setRacineError("");
  };

  const handleMotValiderChange = (val) => {
    setMotValider(val);
    setResultatValidation(null);
    if (!val) setMotValiderError("Le mot est obligatoire.");
    else if (!isArabicOnly(val)) setMotValiderError("Le mot doit contenir uniquement des caractères arabes.");
    else setMotValiderError("");
  };

  const handleRacineValiderChange = (val) => {
    setRacineValider(val);
    setResultatValidation(null);
    if (!val) setRacineValiderError("La racine est obligatoire.");
    else if (!isArabicOnly(val)) setRacineValiderError("La racine doit contenir uniquement des caractères arabes.");
    else if (val.length !== 3) setRacineValiderError(`3 lettres requises (actuellement : ${val.length}).`);
    else setRacineValiderError("");
  };

  const handleSchemaToggle = (schema) => {
    setSelectedSchemas(prev =>
      prev.includes(schema) ? prev.filter(s => s !== schema) : [...prev, schema]
    );
  };

  const handleGenerer = async () => {
    if (!isValidArabicRoot(racine) || selectedSchemas.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/schemes/transformer-multiple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verbe: racine, schemes: selectedSchemas })
      });
      const data = await response.json();
      setResultats(data.resultats || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
    setLoading(false);
  };

  const handleValider = async () => {
    if (!isArabicOnly(motValider) || !motValider || !isValidArabicRoot(racineValider)) return;
    setLoadingValidation(true);
    try {
      const response = await fetch('http://localhost:8080/api/schemes/validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mot: motValider, racine: racineValider })
      });
      const data = await response.json();
      setResultatValidation(data.appartient);
    } catch (err) {
      console.error('Erreur validation:', err);
    }
    setLoadingValidation(false);
  };

  const canGenerer = isValidArabicRoot(racine) && selectedSchemas.length > 0;
  const canValider = motValider && isArabicOnly(motValider) && isValidArabicRoot(racineValider);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-[#F0F9FA] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1F5A68] mb-4">Génération morphologique</h1>
          <p className="text-gray-600 text-lg">Générez des dérivés arabes à partir d'une racine</p>
        </div>

        {/* Section Génération */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">

          <div>
            <h2 className="text-2xl font-bold text-[#1F5A68] mb-4">Comment ça marche ?</h2>
            <p className="text-gray-700 mb-4">Génération dynamique de mots dérivés à partir :</p>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start gap-2 p-3 bg-white rounded-lg border-l-4 border-[#1F5A68]">
                <CheckCircle className="text-[#1F5A68] mt-1 flex-shrink-0" size={20} />
                <span>d'une racine donnée (جذر)</span>
              </li>
              <li className="flex items-start gap-2 p-3 bg-white rounded-lg border-l-4 border-[#1F5A68]">
                <CheckCircle className="text-[#1F5A68] mt-1 flex-shrink-0" size={20} />
                <span>d'un ou plusieurs schèmes sélectionnés (أوزان)</span>
              </li>
            </ul>
            <button className="inline-flex items-center gap-2 text-[#1F5A68] font-semibold border-b-2 border-[#1F5A68] pb-1">
              Essayer <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#E6F3F5]">

            <FieldInput
              label="Racine (3 lettres arabes)"
              value={racine}
              onChange={handleRacineChange}
              placeholder="Ex: كتب"
              error={racineError}
            />

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Schèmes ({schemas.length} disponibles)
              </label>
              {schemas.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Chargement des schèmes...</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {schemas.map((schema, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSchemas.includes(schema)
                          ? 'bg-[#E6F3F5] border-[#1F5A68]'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSchemas.includes(schema)}
                        onChange={() => handleSchemaToggle(schema)}
                        className="w-4 h-4 text-[#1F5A68] focus:ring-[#1F5A68]"
                      />
                      <span className="text-lg" style={{ fontFamily: "'Amiri', serif" }}>{schema}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleGenerer}
              disabled={loading || !canGenerer}
              className="w-full bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white py-3 rounded-lg hover:shadow-lg transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Génération en cours...' : 'Générer'}
            </button>

            {resultats.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} /> Résultats ({resultats.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resultats.map((mot, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white text-[#1F5A68] rounded-full font-bold text-lg border-2 border-green-200"
                      style={{ fontFamily: "'Amiri', serif" }}
                    >
                      {mot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Validation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="bg-[#E6F3F5] p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-[#1F5A68] mb-4 text-center">Vérifier un mot</h3>

            <FieldInput
              label="Mot à vérifier (arabe)"
              value={motValider}
              onChange={handleMotValiderChange}
              placeholder="Ex: كاتب"
              error={motValiderError}
            />

            <FieldInput
              label="Racine (3 lettres arabes)"
              value={racineValider}
              onChange={handleRacineValiderChange}
              placeholder="Ex: كتب"
              error={racineValiderError}
            />

            <button
              onClick={handleValider}
              disabled={loadingValidation || !canValider}
              className="w-full bg-[#1F5A68] text-white py-2 rounded-lg hover:bg-[#15444F] transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingValidation ? 'Vérification...' : 'Vérifier'}
            </button>

            {resultatValidation !== null && (
              <div className={`p-3 rounded-lg border ${resultatValidation ? 'bg-white border-green-200' : 'bg-red-50 border-red-200'}`}>
                {resultatValidation ? (
                  <p className="text-green-600 font-semibold flex items-center gap-2">
                    <CheckCircle size={18} />
                    ✅ OUI —{" "}
                    <span style={{ fontFamily: "'Amiri', serif" }}>{motValider}</span>
                    {" "}appartient à la racine{" "}
                    <span style={{ fontFamily: "'Amiri', serif" }}>{racineValider}</span>
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold flex items-center gap-2">
                    ❌ NON — Ce mot n'appartient pas à cette racine
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1F5A68] mb-4">Validation morphologique</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-[#1F5A68] mt-1 flex-shrink-0" size={18} />
                <span>Vérification de l'appartenance d'un mot à une racine</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-[#1F5A68] mt-1 flex-shrink-0" size={18} />
                <span>Décomposition et identification du schème</span>
              </li>
            </ul>
            <button className="inline-flex items-center gap-2 text-[#1F5A68] font-semibold border-b-2 border-[#1F5A68] pb-1">
              <ArrowLeft size={18} /> Tester
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;