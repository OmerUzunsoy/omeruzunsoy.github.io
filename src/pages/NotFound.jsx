import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const isTurkish = language === 'tr';

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 shadow-xl max-w-3xl mx-auto text-center"
                >
                    <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {isTurkish ? 'Sayfa Bulunamadı' : 'Page Not Found'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        {isTurkish
                            ? 'Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.'
                            : 'The page you are looking for might have been moved or never existed.'}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20 w-full sm:w-auto"
                        >
                            {isTurkish ? 'Ana Sayfaya Dön' : 'Go Home'}
                        </button>
                        <button
                            onClick={() => navigate('/projects')}
                            className="px-6 py-3 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto"
                        >
                            {isTurkish ? 'Projeleri Gör' : 'View Projects'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
