import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, Download, X, Construction, FlaskConical } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getStoredProjects } from '../utils/projectData';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const ProjectsPage = () => {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [projects, setProjects] = useState(() => getStoredProjects());
    const isTurkish = language === 'tr';

    // Sayfa açıldığında en üste scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const refresh = () => setProjects(getStoredProjects());
        window.addEventListener('focus', refresh);
        window.addEventListener('storage', refresh);
        window.addEventListener('projects-updated', refresh);
        return () => {
            window.removeEventListener('focus', refresh);
            window.removeEventListener('storage', refresh);
            window.removeEventListener('projects-updated', refresh);
        };
    }, []);

    const categories = [
        { id: 'all', name: 'Tümü', nameEn: 'All' },
        { id: 'web', name: 'Web', nameEn: 'Web' },
        { id: 'mobile', name: 'Mobil', nameEn: 'Mobile' },
        { id: 'desktop', name: 'Masaüstü', nameEn: 'Desktop' },
        { id: 'ai', name: 'AI/Bot', nameEn: 'AI/Bot' },
        { id: 'game', name: 'Oyun', nameEn: 'Game' }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = isTurkish
            ? project.title.toLowerCase().includes(searchQuery.toLowerCase())
            : (project.titleEn || project.title).toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-outfit text-slate-900 dark:text-white mb-4">
                        {isTurkish ? 'Tüm Projelerim' : 'All My Projects'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        {isTurkish
                            ? 'Web, mobil, masaüstü ve daha fazlası. Geliştirdiğim tüm projeleri keşfedin.'
                            : 'Web, mobile, desktop and more. Explore all the projects I\'ve built.'}
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder={isTurkish ? 'Proje ara...' : 'Search projects...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                    aria-label={isTurkish ? 'Aramayı temizle' : 'Clear search'}
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
                                    }`}
                            >
                                {isTurkish ? category.name : category.nameEn}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => {
                        const isInDevelopment = project.status === 'Geliştirme';
                        const isBeta = project.status === 'Beta';
                        
                        return (
                        <motion.div
                            key={project.id}
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.12, ease: 'easeOut' }}
                            className={`bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group hover:shadow-2xl transition-all duration-300 relative ${isInDevelopment ? 'ring-2 ring-amber-500/50' : ''}`}
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

                            {/* Project Image */}
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
                                    alt={isTurkish ? project.title : project.titleEn}
                                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${isInDevelopment ? 'grayscale-[30%]' : ''}`}
                                />
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                                        {isTurkish ? project.title : project.titleEn}
                                    </h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                    {isTurkish ? project.description : project.descriptionEn}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs rounded-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions - Only show for published/beta projects */}
                                {isInDevelopment ? (
                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                                            <Construction size={16} />
                                            <span className="text-sm font-medium">
                                                {isTurkish ? 'Yakında kullanıma sunulacak' : 'Coming soon'}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <a
                                            href={project.download}
                                            download
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-base transition-all shadow-lg ${isBeta 
                                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25' 
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                                            }`}
                                        >
                                            <Download size={20} />
                                            <span>{isBeta ? (isTurkish ? 'Beta İndir' : 'Download Beta') : (isTurkish ? 'İndir' : 'Download')}</span>
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                                        >
                                            <Github size={18} />
                                            <span>GitHub</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            {isTurkish ? 'Aradığınız kriterlere uygun proje bulunamadı.' : 'No projects found matching your criteria.'}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
