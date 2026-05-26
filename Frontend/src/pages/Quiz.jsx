import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Star } from 'lucide-react';
import Navbar from './navbar';
import Footer from './Footer';

const quizData = [
  {
    racine: "كتب",
    scheme: "مَفْعُول",
    question: "كتب + مَفْعُول = ?",
    choices: ["كَاتِب", "مَكْتُوب", "كِتَابَة", "كُتَيِّب"],
    answer: "مَكْتُوب",
    meaning: "écrit / lettre"
  },
  {
    racine: "درس",
    scheme: "فَاعِل",
    question: "درس + فَاعِل = ?",
    choices: ["مَدْرَسَة", "دَرَّاس", "دَارِس", "مَدْرُوس"],
    answer: "دَارِس",
    meaning: "celui qui étudie"
  },
  {
    racine: "قرأ",
    scheme: "مَفْعُول",
    question: "قرأ + مَفْعُول = ?",
    choices: ["قَارِئ", "قِرَاءَة", "مَقْرُوء", "قَرَّاء"],
    answer: "مَقْرُوء",
    meaning: "ce qui est lu"
  },
  {
    racine: "فتح",
    scheme: "فَاعِل",
    question: "فتح + فَاعِل = ?",
    choices: ["مَفْتُوح", "فَتَّاح", "فَاتِح", "فِتَاح"],
    answer: "فَاتِح",
    meaning: "celui qui ouvre / conquérant"
  },
  {
    racine: "علم",
    scheme: "فَعَّال",
    question: "علم + فَعَّال = ?",
    choices: ["عَالِم", "مَعْلُوم", "عَلَّام", "عِلْم"],
    answer: "عَلَّام",
    meaning: "très savant"
  },
  {
    racine: "نصر",
    scheme: "مَفْعُول",
    question: "نصر + مَفْعُول = ?",
    choices: ["نَاصِر", "مَنْصُور", "نَصَّار", "نُصْرَة"],
    answer: "مَنْصُور",
    meaning: "victorieux / aidé"
  },
  {
    racine: "خرج",
    scheme: "فَاعِل",
    question: "خرج + فَاعِل = ?",
    choices: ["مَخْرَج", "خُرُوج", "خَارِج", "مَخْرُوج"],
    answer: "خَارِج",
    meaning: "celui qui sort / extérieur"
  },
  {
    racine: "سمع",
    scheme: "فَعَّال",
    question: "سمع + فَعَّال = ?",
    choices: ["سَامِع", "مَسْمُوع", "سَمَّاع", "سَمَاع"],
    answer: "سَمَّاع",
    meaning: "qui écoute beaucoup"
  },
  {
    racine: "حكم",
    scheme: "مَفْعُول",
    question: "حكم + مَفْعُول = ?",
    choices: ["حَاكِم", "مَحْكُوم", "حَكِيم", "حُكْم"],
    answer: "مَحْكُوم",
    meaning: "gouverné / condamné"
  },
  {
    racine: "عمل",
    scheme: "فَاعِل",
    question: "عمل + فَاعِل = ?",
    choices: ["مَعْمُول", "عَمَّال", "عَامِل", "عَمَل"],
    answer: "عَامِل",
    meaning: "travailleur / ouvrier"
  },
  {
    racine: "رسل",
    scheme: "مَفْعُول",
    question: "رسل + مَفْعُول = ?",
    choices: ["رَاسِل", "رَسُول", "مُرْسَل", "رِسَالَة"],
    answer: "مُرْسَل",
    meaning: "envoyé / messager"
  },
  {
    racine: "صنع",
    scheme: "فَعَّال",
    question: "صنع + فَعَّال = ?",
    choices: ["صَانِع", "مَصْنُوع", "صَنَّاع", "مَصْنَع"],
    answer: "صَنَّاع",
    meaning: "artisan expert"
  },
  {
    racine: "جلس",
    scheme: "فَاعِل",
    question: "جلس + فَاعِل = ?",
    choices: ["مَجْلِس", "جَلَّاس", "مَجْلُوس", "جَالِس"],
    answer: "جَالِس",
    meaning: "assis / celui qui est assis"
  },
  {
    racine: "ضرب",
    scheme: "مَفْعُول",
    question: "ضرب + مَفْعُول = ?",
    choices: ["ضَارِب", "ضَرَّاب", "مَضْرُوب", "ضَرْب"],
    answer: "مَضْرُوب",
    meaning: "frappé / battu"
  },
  {
    racine: "حمل",
    scheme: "فَاعِل",
    question: "حمل + فَاعِل = ?",
    choices: ["مَحْمُول", "حَمَّال", "حَامِل", "حِمْل"],
    answer: "حَامِل",
    meaning: "porteur / enceinte"
  },
  {
    racine: "سكن",
    scheme: "مَفْعُول",
    question: "سكن + مَفْعُول = ?",
    choices: ["سَاكِن", "مَسْكُون", "سَكَّان", "مَسْكَن"],
    answer: "مَسْكُون",
    meaning: "habité / hanté"
  },
  {
    racine: "شرح",
    scheme: "فَعَّال",
    question: "شرح + فَعَّال = ?",
    choices: ["شَارِح", "مَشْرُوح", "شَرَّاح", "شَرْح"],
    answer: "شَرَّاح",
    meaning: "grand commentateur"
  },
  {
    racine: "رجع",
    scheme: "فَاعِل",
    question: "رجع + فَاعِل = ?",
    choices: ["مَرْجِع", "رَجَّاع", "مَرْجُوع", "رَاجِع"],
    answer: "رَاجِع",
    meaning: "celui qui revient / réviseur"
  },
  {
    racine: "قتل",
    scheme: "مَفْعُول",
    question: "قتل + مَفْعُول = ?",
    choices: ["قَاتِل", "قَتَّال", "مَقْتُول", "قِتَال"],
    answer: "مَقْتُول",
    meaning: "tué / victime"
  },
  {
    racine: "وصل",
    scheme: "فَاعِل",
    question: "وصل + فَاعِل = ?",
    choices: ["مَوْصُول", "وَصَّال", "وَاصِل", "وُصُول"],
    answer: "وَاصِل",
    meaning: "celui qui arrive / connecté"
  },
];

const TOTAL = quizData.length;

const ScoreBar = ({ score, total }) => {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
      <motion.div
        className="h-2 rounded-full bg-gradient-to-r from-[#1F5A68] to-[#4A9DAD]"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
};

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = quizData[current];

  const handleSelect = (choice) => {
    if (confirmed) return;
    setSelected(choice);
  };

  const handleConfirm = () => {
    if (!selected) return;
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: q.question, correct, selected, answer: q.answer }]);
    setConfirmed(true);
  };

  const handleNext = () => {
    if (current + 1 >= TOTAL) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setDone(false);
    setAnswers([]);
  };

  const getChoiceStyle = (choice) => {
    if (!confirmed) {
      return selected === choice
        ? 'border-[#1F5A68] bg-[#E6F3F5] shadow-md scale-[1.02]'
        : 'border-gray-200 bg-white hover:border-[#1F5A68] hover:bg-[#F0F9FA] hover:scale-[1.01]';
    }
    if (choice === q.answer) return 'border-green-400 bg-green-50';
    if (choice === selected && choice !== q.answer) return 'border-red-400 bg-red-50';
    return 'border-gray-200 bg-gray-50 opacity-60';
  };

  const getRating = () => {
    const pct = score / TOTAL;
    if (pct === 1) return { label: "Parfait !", icon: "🏆", color: "text-yellow-500" };
    if (pct >= 0.8) return { label: "Excellent !", icon: "⭐", color: "text-[#1F5A68]" };
    if (pct >= 0.6) return { label: "Bien joué !", icon: "👍", color: "text-blue-500" };
    if (pct >= 0.4) return { label: "Continuez !", icon: "💪", color: "text-orange-500" };
    return { label: "À retravailler", icon: "📚", color: "text-red-500" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EE] to-[#E8F4F7]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-[#1F5A68] text-white text-xs font-bold px-4 py-1 rounded-full mb-3 tracking-widest uppercase">
              Quiz Morphologique
            </span>
            <h1 className="text-3xl font-bold text-[#1F5A68] mb-1" style={{ fontFamily: "'Amiri', serif" }}>
              اختبر معلوماتك
            </h1>
            <p className="text-gray-500 text-sm">Trouvez le mot dérivé selon le schème indiqué</p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                  <span>Question {current + 1} / {TOTAL}</span>
                  <span className="font-bold text-[#1F5A68]">Score : {score}</span>
                </div>
                <ScoreBar score={current} total={TOTAL} />
              </div>

              {/* Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#E6F3F5] overflow-hidden">

                {/* Scheme + Root banner */}
                <div className="bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] px-8 py-6 text-center">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="text-center">
                      <p className="text-[#A8D5DE] text-xs font-semibold uppercase tracking-widest mb-1">Racine</p>
                      <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Amiri', serif" }}>
                        {q.racine}
                      </span>
                    </div>
                    <div className="text-white text-2xl font-bold">+</div>
                    <div className="text-center">
                      <p className="text-[#A8D5DE] text-xs font-semibold uppercase tracking-widest mb-1">Schème</p>
                      <span className="text-4xl font-bold text-[#E6D5A8]" style={{ fontFamily: "'Amiri', serif" }}>
                        {q.scheme}
                      </span>
                    </div>
                    <div className="text-white text-2xl font-bold">=</div>
                    <div className="text-center">
                      <p className="text-[#A8D5DE] text-xs font-semibold uppercase tracking-widest mb-1">Résultat</p>
                      <span className="text-4xl font-bold text-white opacity-30" style={{ fontFamily: "'Amiri', serif" }}>
                        ???
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6">
                  <p className="text-center text-gray-500 text-sm mb-5 font-semibold">
                    Sélectionnez le bon dérivé :
                  </p>

                  {/* Choices */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {q.choices.map((choice, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleSelect(choice)}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${getChoiceStyle(choice)}`}
                      >
                        {confirmed && choice === q.answer && (
                          <CheckCircle className="absolute top-2 right-2 text-green-500 w-4 h-4" />
                        )}
                        {confirmed && choice === selected && choice !== q.answer && (
                          <XCircle className="absolute top-2 right-2 text-red-500 w-4 h-4" />
                        )}
                        <span className="text-2xl font-bold text-[#1F5A68]" style={{ fontFamily: "'Amiri', serif" }}>
                          {choice}
                        </span>
                        {!confirmed && selected === choice && (
                          <span className="text-xs text-[#1F5A68] mt-1 font-semibold">Sélectionné</span>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Feedback */}
                  <AnimatePresence>
                    {confirmed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mb-4 p-4 rounded-xl border-2 ${selected === q.answer ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
                      >
                        <div className="flex items-start gap-3">
                          {selected === q.answer
                            ? <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                            : <XCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                          }
                          <div>
                            <p className={`font-bold text-sm ${selected === q.answer ? 'text-green-700' : 'text-red-700'}`}>
                              {selected === q.answer ? '✅ Bonne réponse !' : `❌ Incorrect — La bonne réponse est : ${q.answer}`}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              <span className="font-semibold" style={{ fontFamily: "'Amiri', serif" }}>{q.answer}</span>
                              {' '}signifie « {q.meaning} »
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {!confirmed ? (
                      <button
                        onClick={handleConfirm}
                        disabled={!selected}
                        className="flex-1 bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Valider ma réponse
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex-1 bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        {current + 1 >= TOTAL ? 'Voir les résultats' : 'Question suivante'}
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Result Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-[#E6F3F5] overflow-hidden">
                <div className="bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] px-8 py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-6xl mb-3"
                  >
                    {getRating().icon}
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-1">{getRating().label}</h2>
                  <p className="text-[#A8D5DE] text-sm">Quiz terminé</p>
                </div>

                <div className="px-8 py-6">
                  {/* Score circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full border-4 border-[#1F5A68] flex flex-col items-center justify-center bg-[#F0F9FA]">
                      <span className="text-3xl font-bold text-[#1F5A68]">{score}</span>
                      <span className="text-xs text-gray-400">/ {TOTAL}</span>
                    </div>
                  </div>

                  <ScoreBar score={score} total={TOTAL} />
                  <p className="text-center text-sm text-gray-500 mb-6">{Math.round((score / TOTAL) * 100)}% de bonnes réponses</p>

                  {/* Answer review */}
                  <div className="space-y-2 max-h-60 overflow-y-auto mb-6 pr-1">
                    {answers.map((a, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-4 py-2 rounded-xl text-sm border ${a.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                      >
                        <span className="text-gray-500 font-mono text-xs">Q{i + 1}</span>
                        <span className="font-bold" style={{ fontFamily: "'Amiri', serif" }}>
                          {a.correct ? a.answer : <><s className="text-red-400">{a.selected}</s> → {a.answer}</>}
                        </span>
                        {a.correct
                          ? <CheckCircle className="text-green-500 w-4 h-4" />
                          : <XCircle className="text-red-500 w-4 h-4" />
                        }
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleRestart}
                    className="w-full bg-gradient-to-r from-[#1F5A68] to-[#2A6D7D] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} />
                    Recommencer le quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;