import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, X, Check, RefreshCw, ArrowRight, AlertTriangle } from 'lucide-react';
import Navbar from './navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

const ARABIC_LETTERS = /^[\u0600-\u06FF\u0020]+$/;
const HAS_FA  = (val) => val.includes('ف');
const HAS_AYN = (val) => val.includes('ع');
const HAS_LAM = (val) => val.includes('ل');

const validateScheme = (val) => {
  if (!val) return "Le schème est obligatoire.";
  if (!ARABIC_LETTERS.test(val)) return "Le schème doit contenir uniquement des caractères arabes.";
  if (!HAS_FA(val))  return "Le schème doit contenir la lettre ف.";
  if (!HAS_AYN(val)) return "Le schème doit contenir la lettre ع.";
  if (!HAS_LAM(val)) return "Le schème doit contenir la lettre ل.";
  return "";
};

const SchemeManager = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState('');

  const [newScheme, setNewScheme] = useState('');
  const [newSchemeError, setNewSchemeError] = useState('');

  const [editingScheme, setEditingScheme] = useState({ old: '', new: '' });
  const [editingSchemeError, setEditingSchemeError] = useState('');

  const [transformData, setTransformData] = useState({ verbe: '', scheme: '' });
  const [transformResult, setTransformResult] = useState('');
  const [showTransformModal, setShowTransformModal] = useState(false);

  const API_BASE_URL = 'http://localhost:8080/api/schemes';

  const fetchSchemes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Erreur lors du chargement des schèmes');
      const data = await response.json();
      setSchemes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchemes(); }, []);

  const handleNewSchemeChange = (val) => {
    setNewScheme(val);
    setNewSchemeError(validateScheme(val));
  };

  const handleEditingSchemeChange = (val) => {
    setEditingScheme(prev => ({ ...prev, new: val }));
    setEditingSchemeError(validateScheme(val));
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    const err = validateScheme(newScheme);
    if (err) { setNewSchemeError(err); return; }
    setError(''); setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/ajouter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheme: newScheme })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setNewScheme('');
        setNewSchemeError('');
        setShowAddModal(false);
        fetchSchemes();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Erreur lors de l'ajout du schème");
    }
  };

  const handleUpdateScheme = async (e) => {
    e.preventDefault();
    const err = validateScheme(editingScheme.new);
    if (err) { setEditingSchemeError(err); return; }
    setError(''); setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/${editingScheme.old}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nouveauScheme: editingScheme.new })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setEditingScheme({ old: '', new: '' });
        setEditingSchemeError('');
        setShowEditModal(false);
        fetchSchemes();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Erreur lors de la modification du schème');
    }
  };

  const openDeleteModal = (schemeName) => { setSchemeToDelete(schemeName); setShowDeleteModal(true); };

  const confirmDelete = async () => {
    setError(''); setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/${schemeToDelete}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        fetchSchemes();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Erreur lors de la suppression du schème');
    } finally {
      setShowDeleteModal(false);
      setSchemeToDelete('');
    }
  };

  const openEditModal = (schemeName) => {
    setEditingScheme({ old: schemeName, new: schemeName });
    setEditingSchemeError('');
    setShowEditModal(true);
  };

  const handleTransformVerbe = async (e) => {
    e.preventDefault();
    setError(''); setTransformResult('');
    try {
      const response = await fetch(`${API_BASE_URL}/transformer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformData)
      });
      const data = await response.json();
      if (response.ok) setTransformResult(data.resultat);
      else setError(data.message);
    } catch {
      setError('Erreur lors de la transformation');
    }
  };

  const SchemeInput = ({ value, onChange, error, placeholder = "Ex: فَعَلَ", disabled = false }) => (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-right text-xl transition-colors ${
          disabled ? 'bg-gray-50 border-gray-200' :
          error ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-[#1F5A68]'
        }`}
        placeholder={placeholder}
        style={{ fontFamily: "'Amiri', serif" }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {!error && value && (
        <p className="text-xs mt-1 text-gray-400 flex gap-2">
          <span className={HAS_FA(value)  ? 'text-green-600 font-bold' : 'text-gray-300'}>ف ✓</span>
          <span className={HAS_AYN(value) ? 'text-green-600 font-bold' : 'text-gray-300'}>ع ✓</span>
          <span className={HAS_LAM(value) ? 'text-green-600 font-bold' : 'text-gray-300'}>ل ✓</span>
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-[#F0F9FA] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1F5A68] mb-4">Gestion des Schèmes</h1>
          <p className="text-gray-600 text-lg">Gérez vos schèmes morphologiques arabes</p>
          <div className="h-1 w-[120px] mx-auto mt-4 rounded-full bg-[#E6D5A8]" />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
            <p className="font-medium">{success}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => { setNewScheme(''); setNewSchemeError(''); setShowAddModal(true); }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Ajouter un Schème
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E6F3F5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-[#E6F3F5] to-[#D1E9EC]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#1F5A68] uppercase tracking-wider">Nom du Schème</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-[#1F5A68] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="2" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center text-[#1F5A68]">
                        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                        <span className="font-medium">Chargement des schèmes...</span>
                      </div>
                    </td>
                  </tr>
                ) : schemes.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="px-6 py-12 text-center text-gray-500">
                      <p className="text-lg">Aucun schème disponible</p>
                      <button onClick={() => setShowAddModal(true)} className="mt-4 inline-flex items-center gap-2 text-[#1F5A68] hover:underline font-semibold">
                        Ajouter le premier schème <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                ) : (
                  schemes.map((scheme, index) => (
                    <tr key={index} className="hover:bg-[#F0F9FA] transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-lg font-semibold text-gray-800" style={{ fontFamily: "'Amiri', serif" }}>{scheme}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button onClick={() => openEditModal(scheme)} className="text-[#1F5A68] hover:text-[#2A6D7D] mr-6 inline-flex items-center gap-1 font-semibold transition-colors">
                          <Edit2 className="w-4 h-4" /> Modifier
                        </button>
                        <button onClick={() => openDeleteModal(scheme)} className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 font-semibold transition-colors">
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border-2 border-[#E6F3F5]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1F5A68]"></div>
            <span className="text-gray-600">Total des schèmes: <strong className="text-[#1F5A68] text-lg">{schemes.length}</strong></span>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#E6F3F5]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1F5A68]">Ajouter un Schème</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddScheme}>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nom du Schème <span className="text-gray-400 font-normal">(doit contenir ف ع ل)</span>
                  </label>
                  <SchemeInput value={newScheme} onChange={handleNewSchemeChange} error={newSchemeError} />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={!!newSchemeError || !newScheme}
                    className="flex-1 bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-5 h-5" /> Ajouter
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#E6F3F5]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1F5A68]">Modifier le Schème</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleUpdateScheme}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Ancien Nom</label>
                  <SchemeInput value={editingScheme.old} onChange={() => {}} disabled />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nouveau Nom <span className="text-gray-400 font-normal">(doit contenir ف ع ل)</span>
                  </label>
                  <SchemeInput value={editingScheme.new} onChange={handleEditingSchemeChange} error={editingSchemeError} />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={!!editingSchemeError || !editingScheme.new}
                    className="flex-1 bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-5 h-5" /> Modifier
                  </button>
                  <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-red-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Confirmer la suppression</h2>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir supprimer le schème suivant ?</p>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-xl font-bold text-red-700 text-center" style={{ fontFamily: "'Amiri', serif" }}>{schemeToDelete}</p>
                </div>
                <p className="text-sm text-gray-500 mt-3">Cette action est irréversible.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 font-semibold">
                  <Trash2 className="w-5 h-5" /> Supprimer
                </button>
                <button onClick={() => { setShowDeleteModal(false); setSchemeToDelete(''); }} className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transform Modal */}
        {showTransformModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#E6F3F5]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1F5A68]">Transformer un Verbe</h2>
                <button onClick={() => { setShowTransformModal(false); setTransformResult(''); setTransformData({ verbe: '', scheme: '' }); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleTransformVerbe}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Verbe</label>
                  <input
                    type="text"
                    value={transformData.verbe}
                    onChange={(e) => setTransformData({ ...transformData, verbe: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1F5A68] text-right text-xl transition-colors"
                    placeholder="Ex: كتب"
                    style={{ fontFamily: "'Amiri', serif" }}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Schème</label>
                  <select
                    value={transformData.scheme}
                    onChange={(e) => setTransformData({ ...transformData, scheme: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1F5A68] text-right text-lg transition-colors"
                    style={{ fontFamily: "'Amiri', serif" }}
                    required
                  >
                    <option value="">Sélectionner un schème</option>
                    {schemes.map((scheme, index) => (
                      <option key={index} value={scheme}>{scheme}</option>
                    ))}
                  </select>
                </div>
                {transformResult && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Résultat :</p>
                    <p className="text-2xl font-bold text-[#1F5A68] text-right" style={{ fontFamily: "'Amiri', serif" }}>{transformResult}</p>
                  </motion.div>
                )}
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold">
                    <RefreshCw className="w-5 h-5" /> Transformer
                  </button>
                  <button type="button" onClick={() => { setShowTransformModal(false); setTransformResult(''); setTransformData({ verbe: '', scheme: '' }); }} className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                    Fermer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default SchemeManager;