import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = ['about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 150;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }

            // At top of page
            if (window.scrollY < 100) {
                setActiveSection('');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const location = useLocation();
    const isHome = location.pathname === '/';

    const navLinks = isHome ? [
        { name: t.nav.about, href: '#about', type: 'anchor', section: 'about' },
        { name: t.nav.skills, href: '#skills', type: 'anchor', section: 'skills' },
        { name: t.nav.projects, href: '#projects', type: 'anchor', section: 'projects' },
        { name: t.nav.contact, href: '#contact', type: 'anchor', section: 'contact' },
    ] : [
        { name: t.nav.home, href: '/', type: 'route' },
        { name: t.nav.allProjects, href: '/projects', type: 'route' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
            }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold font-outfit tracking-tighter text-slate-900 dark:text-white"
                    >
                        ÖMER<span className="text-blue-600">.</span>
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-medium transition-colors relative ${
                                    location.pathname === link.href 
                                        ? 'text-blue-600 dark:text-blue-400' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
                                }`}
                            >
                                {link.name}
                                {location.pathname === link.href && (
                                    <motion.div 
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                    />
                                )}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors relative ${
                                    activeSection === link.section 
                                        ? 'text-blue-600 dark:text-blue-400' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white'
                                }`}
                            >
                                {link.name}
                                {activeSection === link.section && (
                                    <motion.div 
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        )
                    ))}

                    <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-6">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                            aria-label={theme === 'dark' ? (t?.nav?.lightMode || 'Light mode') : (t?.nav?.darkMode || 'Dark mode')}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-slate-500"
                            aria-label={t?.nav?.switchLanguage || 'Switch language'}
                        >
                            <Globe size={16} />
                            <span className="text-sm font-medium uppercase">{language}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-900 dark:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                link.type === 'route' ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
