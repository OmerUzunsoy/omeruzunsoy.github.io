import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
    Code2,
    Smartphone,
    Monitor,
    Globe,
    Database,
    Terminal,
    Cpu,
    Layers
} from 'lucide-react';

const Skills = () => {
    const { t } = useLanguage();

    const skillCategories = [
        {
            title: t.skills.languages,
            icon: <Code2 className="text-blue-500" size={24} />,
            skills: ["JavaScript", "Python", "Java", "C#", "SQL", "HTML/CSS"]
        },
        {
            title: t.skills.frameworks,
            icon: <Layers className="text-purple-500" size={24} />,
            skills: ["React", "Node.js", "Tailwind CSS", "Next.js", "Android SDK", ".NET"]
        },
        {
            title: t.skills.tools,
            icon: <Terminal className="text-green-500" size={24} />,
            skills: ["Git", "VS Code", "Android Studio", "Figma", "Docker", "Firebase"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4 text-slate-900 dark:text-white">
                        {t.skills.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.skills.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                                    {category.title}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, idx) => (
                                    <motion.span
                                        key={idx}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
