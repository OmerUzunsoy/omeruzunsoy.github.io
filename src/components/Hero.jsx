import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/40 dark:bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/40 dark:bg-blue-600/30 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-cyan-500/20 dark:bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-500" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] z-0" />

            <div className="container mx-auto px-6 z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-8 border border-blue-200 dark:border-blue-800"
                >
                    <Sparkles size={16} />
                    <span>{t.hero.greeting}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold font-outfit mb-6 text-slate-900 dark:text-white"
                >
                    {t.hero.title}
                    <br />
                    <span className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[size:200%] animate-gradient">{t.hero.subtitle}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    {t.hero.description}
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors shadow-lg shadow-blue-600/25 flex items-center gap-2 group"
                    >
                        <span>{t.hero.cta}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>

                    <motion.a
                        href="/cv.pdf"
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-full font-bold transition-all flex items-center gap-2 group shadow-lg shadow-slate-200/50 dark:shadow-none"
                    >
                        <Download size={20} className="group-hover:animate-bounce" />
                        <span>{t.hero.cv}</span>
                    </motion.a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="text-slate-400 dark:text-slate-500" size={32} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
