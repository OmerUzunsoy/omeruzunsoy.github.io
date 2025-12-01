import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Construction, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getStoredProjects } from '../utils/projectData';
import ImageWithSkeleton from './ImageWithSkeleton';

const Projects = () => {
    const { t, language } = useLanguage();
    const [projects, setProjects] = useState(() => {
        const all = getStoredProjects();
        const featured = all.filter(p => p.featured === true);
        return featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3);
    });

    useEffect(() => {
        const refresh = () => {
            const all = getStoredProjects();
            const featured = all.filter(p => p.featured === true);
            setProjects(featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3));
        };
        refresh();
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', refresh);
            window.addEventListener('focus', refresh);
            window.addEventListener('projects-updated', refresh);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('storage', refresh);
                window.removeEventListener('focus', refresh);
                window.removeEventListener('projects-updated', refresh);
            }
        };
    }, [language]);

    const fallbackProjects = [
        {
            title: t.projects.items[0].title,
            description: t.projects.items[0].desc,
            category: "React / Tailwind",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
            github: "#",
            download: "#"
        },
        {
            title: t.projects.items[1].title,
            description: t.projects.items[1].desc,
            category: "Next.js / Prisma",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
            github: "#",
            download: "#"
        },
        {
            title: t.projects.items[2].title,
            description: t.projects.items[2].desc,
            category: "HTML / SCSS",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
            github: "#",
            download: "#"
        }
    ];

    const displayProjects = projects.length ? projects : fallbackProjects;

    return (
        <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-6 text-slate-900 dark:text-white">{t.projects.title}</h2>
                    <div className="h-1 w-20 bg-blue-500 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProjects.map((project, index) => {
                        const categoryLabelMap = {
                            web: 'Web',
                            mobile: 'Mobile',
                            desktop: 'Desktop',
                            ai: 'AI/Bot',
                            game: 'Game'
                        };
                        const categoryLabel = categoryLabelMap[project.category] || project.category || 'Project';
                        const projectTitle = language === 'en' && project.titleEn ? project.titleEn : project.title;
                        const projectDesc = language === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
                        const isInDevelopment = project.status === 'Geliştirme';
                        const isBeta = project.status === 'Beta';
                        const isTurkish = language === 'tr';

                        return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className={`bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group relative ${isInDevelopment ? 'ring-2 ring-amber-500/50' : ''}`}
                        >
                            {/* Development Banner */}
                            {isInDevelopment && (
                                <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2 animate-pulse">
                                    <Construction size={14} className="animate-bounce" />
                                    <span>{isTurkish ? 'Geliştirme Aşamasında' : 'In Development'}</span>
                                    <Construction size={14} className="animate-bounce" />
                                </div>
                            )}

                            {/* Beta Badge */}
                            {isBeta && (
                                <div className="absolute top-3 right-3 z-30 bg-purple-600 text-white text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg shadow-purple-600/30">
                                    <FlaskConical size={12} />
                                    <span>BETA</span>
                                </div>
                            )}

                            <div className={`relative h-48 overflow-hidden ${isInDevelopment ? 'mt-8' : ''}`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10" />
                                {isInDevelopment && (
                                    <div className="absolute inset-0 z-20">
                                        <div className="absolute inset-0 opacity-20" style={{
                                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.3) 10px, rgba(251, 191, 36, 0.3) 20px)',
                                        }} />
                                    </div>
                                )}
                                <ImageWithSkeleton
                                    src={project.image}
                                    alt={project.title}
                                    className={`w-full h-full ${isInDevelopment ? 'grayscale-[30%]' : ''}`}
                                />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                                        {categoryLabel}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold font-outfit mb-3 text-slate-900 dark:text-white">{projectTitle}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
                                    {projectDesc}
                                </p>

                                {isInDevelopment ? (
                                    <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                                        <Construction size={16} />
                                        <span className="text-sm font-medium">
                                            {isTurkish ? 'Yakında kullanıma sunulacak' : 'Coming soon'}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={project.download || project.links?.download || "#"}
                                            download
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-base transition-all shadow-lg ${isBeta 
                                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25' 
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                                            }`}
                                        >
                                            <ExternalLink size={20} />
                                            <span>{isBeta ? (isTurkish ? 'Beta İndir' : 'Download Beta') : t.projects.download}</span>
                                        </a>
                                        <a 
                                            href={project.github || project.links?.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                                        >
                                            <Github size={18} />
                                            <span>{t.projects.github}</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/projects"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors shadow-lg shadow-blue-600/20"
                    >
                        <span>{t.projects.viewAll}</span>
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
