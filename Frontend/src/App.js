import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";

import Header from './pages/Header';
import Fonction from "./pages/Fonnctionnalité";
import RacinesUpload from "./pages/RacinesUpload";
import SchemeManager from "./pages/shema";
import Quiz from "./pages/Quiz";

/* ================= Layout ================= */
const Layout = () => {
  return (
    <div>
     
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

/* ================= Router ================= */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Route par défaut - page d'accueil */}
      <Route index element={<RacinesUpload />} /> {/* ou une autre page d'accueil */}
      
      {/* Vos autres routes */}
      <Route path="Accueil" element={<Header />} />
      <Route path="Dérivation" element={<Fonction />} />
      <Route path="Schéma" element={<SchemeManager />} />
      <Route path="racines" element={<RacinesUpload />} />
       <Route path="Quiz" element={<Quiz />} />
      
      {/* Redirection optionnelle pour les routes inexistantes */}
      <Route path="*" element={<div>Page non trouvée</div>} />
    </Route>
  )
);

/* ================= Fonction pour changer le favicon ================= */
const changeFavicon = (src) => {
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach(link => link.remove());
  
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = src;
  document.head.appendChild(link);
  
  setTimeout(() => {
    link.href = src + '?v=' + new Date().getTime();
  }, 100);
};

/* ================= App ================= */
function App() {
  useEffect(() => {
    // Titre adapté au projet
    document.title = "جذور - Moteur Morphologique Arabe";
    
    // Favicon - Livre ouvert (📖) en version icône
    changeFavicon('https://cdn-icons-png.flaticon.com/512/2232/2232688.png');
    
  }, []);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;