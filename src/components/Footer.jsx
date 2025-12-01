import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Heart, Instagram, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    const socialLinks = [
        { icon: Github, href: 'https://github.com/OmerUzunsoy', label: 'GitHub' },
        { icon: Instagram, href: 'https://www.instagram.com/omer_uzunsoy55/', label: 'Instagram' },
        { icon: Twitter, href: 'https://x.com/OmerUzunsoy55', label: 'Twitter' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/ömer-uzunsoy/', label: 'LinkedIn' },
        { icon: Music, href: 'https://open.spotify.com/user/yceg59rz3mgjzasht17ypde1b?si=5a100e908694422b', label: 'Spotify' },
        { icon: Mail, href: 'mailto:uzunsoyomer@gmail.com', label: 'Email' }
    ];

    return (
        <footer className="bg-slate-50 dark:bg-slate-950 py-16 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold font-outfit mb-8 text-slate-900 dark:text-white"
                    >
                        ÖMER<span className="text-blue-600">.</span>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <div className="w-24 h-px bg-slate-200 dark:bg-slate-800 mb-8" />

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <p className="text-slate-600 dark:text-slate-400 mb-2 flex items-center justify-center gap-1">
                            &copy; {new Date().getFullYear()} Ömer Uzunsoy. {t.footer.rights}
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-sm flex items-center justify-center gap-1">
                            {t.footer.tagline} <Heart size={14} className="text-red-500 fill-red-500" />
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
