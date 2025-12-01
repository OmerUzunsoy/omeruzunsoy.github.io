import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Code size={32} />,
            title: t.about.features.dev.title,
            description: t.about.features.dev.desc
        },
        {
            icon: <Palette size={32} />,
            title: t.about.features.design.title,
            description: t.about.features.design.desc
        },
        {
            icon: <Zap size={32} />,
            title: t.about.features.anim.title,
            description: t.about.features.anim.desc
        }
    ];

    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-6 text-slate-900 dark:text-white">{t.about.title}</h2>
                    <div className="h-1 w-20 bg-blue-500 rounded-full mb-8" />
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                        {t.about.description}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 dark:hover:bg-slate-800/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
                        >
                            <div className="mb-6 text-blue-600 dark:text-blue-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-outfit mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
