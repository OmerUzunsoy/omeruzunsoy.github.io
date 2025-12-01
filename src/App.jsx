import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let readyFired = false;
    const finish = () => {
      if (!readyFired) {
        readyFired = true;
        setLoading(false);
      }
    };

    const minimalDelay = setTimeout(finish, 800); // short minimum to avoid flash
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    return () => {
      clearTimeout(minimalDelay);
      window.removeEventListener('load', finish);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AnimatePresence>
            {loading && <Preloader />}
          </AnimatePresence>
          {!loading && (
            <>
              <ScrollProgress />
              <BackToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </>
          )}
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
