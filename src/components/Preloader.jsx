import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Preloader = () => {
    const { t } = useLanguage();

    if (!t || !t.loading) return null;

    const pathVariants = {
        hidden: {
            pathLength: 0,
            opacity: 0
        },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950"
        >
            <div className="relative flex flex-col items-center">
                {/* Hexagon SVG Animation */}
                <svg width="120" height="120" viewBox="0 0 100 100" className="mb-8">
                    <motion.path
                        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathVariants}
                        initial="hidden"
                        animate="visible"
                    />
                    <motion.path
                        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            delay: 0.5
                        }}
                        className="opacity-50 blur-sm"
                    />
                </svg>

                {/* Loading Text with Glitch Effect */}
                <div className="relative">
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white font-outfit font-bold text-xl tracking-[0.5em]"
                    >
                        {t.loading}
                    </motion.div>
                    <motion.div
                        animate={{
                            opacity: [0, 0.5, 0],
                            x: [-2, 2, -2]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute top-0 left-0 text-blue-500 font-outfit font-bold text-xl tracking-[0.5em] mix-blend-screen"
                    >
                        {t.loading}
                    </motion.div>
                    <motion.div
                        animate={{
                            opacity: [0, 0.5, 0],
                            x: [2, -2, 2]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute top-0 left-0 text-purple-500 font-outfit font-bold text-xl tracking-[0.5em] mix-blend-screen"
                    >
                        {t.loading}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
