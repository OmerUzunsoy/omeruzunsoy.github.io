import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, EyeOff, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FeedbackForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const { t } = useLanguage();

    // Initialize with a safe default or empty string, then update when t is available
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        message: ''
    });

    // Update category when translations are loaded
    useEffect(() => {
        if (t && t.contact && t.contact.form && t.contact.form.categories) {
            setFormData(prev => ({
                ...prev,
                category: t.contact.form.categories.website
            }));
        }
    }, [t]);

    const categories = t?.contact?.form?.categories ? [
        t.contact.form.categories.website,
        t.contact.form.categories.mobile,
        t.contact.form.categories.game,
        t.contact.form.categories.desktop,
        t.contact.form.categories.ai,
        t.contact.form.categories.other
    ] : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 dark:from-blue-900/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-slate-900 dark:text-white">{t.contact.title}</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            {t.contact.subtitle}
                        </p>
                    </motion.div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setIsAnonymous(!isAnonymous)}
                                            className={`text-sm flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${isAnonymous
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                                                }`}
                                        >
                                            {isAnonymous ? <EyeOff size={16} /> : <User size={16} />}
                                            <span>{isAnonymous ? t.contact.form.cancelAnonymous : t.contact.form.anonymous}</span>
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {!isAnonymous && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="grid md:grid-cols-2 gap-6"
                                            >
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t.contact.form.name}</label>
                                                    <input
                                                        type="text"
                                                        required={!isAnonymous}
                                                        placeholder={t.contact.form.namePlaceholder}
                                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t.contact.form.email}</label>
                                                    <input
                                                        type="email"
                                                        required={!isAnonymous}
                                                        placeholder={t.contact.form.emailPlaceholder}
                                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t.contact.form.category}</label>
                                        <select
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t.contact.form.message}</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder={t.contact.form.messagePlaceholder}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
                                    >
                                        <span>{t.contact.form.send}</span>
                                        <Send size={20} />
                                    </button>

                                    <p className="text-xs text-center text-slate-500 mt-4">
                                        {t.contact.form.note}
                                    </p>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.contact.success.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">
                                        {t.contact.success.desc}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedbackForm;
