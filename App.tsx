import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import TechShowcasePage from './pages/TechShowcasePage';
import DeveloperPage from './pages/DeveloperPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-deepSlate text-white selection:bg-neonBlue selection:text-black">
        <Navbar />
        <main className="flex-grow pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/technology" element={<TechShowcasePage />} />
              <Route path="/developer" element={<DeveloperPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}