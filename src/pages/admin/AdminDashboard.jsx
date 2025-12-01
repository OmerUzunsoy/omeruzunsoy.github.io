import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Plus, Edit, Trash2, X, LogOut, FolderOpen, 
    Construction, FlaskConical, CheckCircle, Home,
    Settings, LayoutDashboard, Package, Eye, EyeOff,
    Save, Image, Tag, Link as LinkIcon, FileText,
    ChevronRight, Menu, Search, RefreshCw, Star,
    Download, Upload, Palette, Moon, Sun, Monitor,
    Bell, BellOff, Database, HardDrive, Clock, Activity,
    Zap, TrendingUp, Calendar, ExternalLink, Copy, Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import defaultProjects from '../../constants/defaultProjects';
import { getStoredProjects, normalizeProject, persistProjects } from '../../utils/projectData';

const AdminDashboard = () => {
    const { language } = useLanguage();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        titleEn: '',
        description: '',
        descriptionEn: '',
        category: 'web',
        status: 'Yayında',
        featured: false,
        tags: '',
        github: '',
        download: '',
        image: ''
    });
    const [projects, setProjects] = useState([]);
    const [projectsLoaded, setProjectsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [feedback, setFeedback] = useState({ type: '', message: '' });
    const [formError, setFormError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [notifications, setNotifications] = useState(true);
    const [copiedId, setCopiedId] = useState(null);
    const isTurkish = language === 'tr';

    const categoryOptions = [
        { value: 'web', label: 'Web', color: 'bg-blue-500' },
        { value: 'mobile', label: isTurkish ? 'Mobil' : 'Mobile', color: 'bg-green-500' },
        { value: 'desktop', label: isTurkish ? 'Masaüstü' : 'Desktop', color: 'bg-purple-500' },
        { value: 'ai', label: 'AI', color: 'bg-pink-500' },
        { value: 'game', label: isTurkish ? 'Oyun' : 'Game', color: 'bg-orange-500' }
    ];

    const statusOptions = [
        { value: 'Yayında', label: isTurkish ? 'Yayında' : 'Published', icon: CheckCircle, color: 'text-green-500' },
        { value: 'Geliştirme', label: isTurkish ? 'Geliştirme' : 'Development', icon: Construction, color: 'text-amber-500' },
        { value: 'Beta', label: 'Beta', icon: FlaskConical, color: 'text-purple-500' }
    ];

    // Auth check
    useEffect(() => {
        const isAuthed = localStorage.getItem('admin-auth') === 'true';
        if (!isAuthed) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Load projects
    useEffect(() => {
        setProjects(getStoredProjects());
        setProjectsLoaded(true);
    }, []);

    // Persist projects
    useEffect(() => {
        if (projectsLoaded) {
            persistProjects(projects);
            window.dispatchEvent(new Event('projects-updated'));
        }
    }, [projects, projectsLoaded]);

    // Auto-hide feedback
    useEffect(() => {
        if (feedback.message) {
            const timer = setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    const showFeedback = (type, message) => {
        setFeedback({ type, message });
    };

    const handleLogout = () => {
        localStorage.removeItem('admin-auth');
        navigate('/admin/login');
    };

    const handleAddProject = () => {
        setEditingProject(null);
        setFormData({
            title: '', titleEn: '', description: '', descriptionEn: '',
            category: 'web', status: 'Yayında', featured: false, tags: '', github: '', download: '', image: ''
        });
        setShowModal(true);
        setFormError('');
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title || '',
            titleEn: project.titleEn || '',
            description: project.description || '',
            descriptionEn: project.descriptionEn || '',
            category: project.category || 'web',
            status: project.status || 'Yayında',
            featured: project.featured === true,
            tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
            github: project.github || '',
            download: project.download || '',
            image: project.image || ''
        });
        setShowModal(true);
        setFormError('');
    };

    const handleDeleteProject = (id) => {
        if (deleteConfirm === id) {
            setProjects(prev => prev.filter(p => p.id !== id));
            showFeedback('success', isTurkish ? 'Proje silindi!' : 'Project deleted!');
            setDeleteConfirm(null);
        } else {
            setDeleteConfirm(id);
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    const handleSaveProject = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setFormError('');

        const trimmedTitle = formData.title.trim();
        const trimmedDesc = formData.description.trim();

        if (trimmedTitle.length < 3) {
            setFormError(isTurkish ? 'Proje adı en az 3 karakter olmalı.' : 'Title must be at least 3 characters.');
            setIsSaving(false);
            return;
        }
        if (trimmedDesc.length < 10) {
            setFormError(isTurkish ? 'Açıklama en az 10 karakter olmalı.' : 'Description must be at least 10 characters.');
            setIsSaving(false);
            return;
        }

        const parsedTags = formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
        const today = new Date().toISOString().split('T')[0];

        const payload = {
            title: trimmedTitle,
            titleEn: formData.titleEn.trim() || trimmedTitle,
            description: trimmedDesc,
            descriptionEn: formData.descriptionEn.trim() || trimmedDesc,
            category: formData.category,
            status: formData.status,
            featured: formData.featured,
            tags: parsedTags.length > 0 ? parsedTags : [formData.category],
            github: formData.github.trim() || '#',
            download: formData.download.trim() || '#',
            image: formData.image.trim() || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
            lastUpdate: today
        };

        if (editingProject) {
            setProjects(prev => prev.map(p => 
                p.id === editingProject.id ? normalizeProject({ ...p, ...payload }) : p
            ));
            showFeedback('success', isTurkish ? 'Proje güncellendi!' : 'Project updated!');
        } else {
            const nextId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
            setProjects(prev => [...prev, normalizeProject({ ...payload, id: nextId })]);
            showFeedback('success', isTurkish ? 'Yeni proje eklendi!' : 'New project added!');
        }

        setShowModal(false);
        setEditingProject(null);
        setIsSaving(false);
    };

    const handleStatusChange = (id, status) => {
        const today = new Date().toISOString().split('T')[0];
        setProjects(prev => prev.map(p => 
            p.id === id ? normalizeProject({ ...p, status, lastUpdate: today }) : p
        ));
        showFeedback('success', isTurkish ? 'Durum güncellendi!' : 'Status updated!');
    };

    const MAX_FEATURED = 3;
    const featuredCount = projects.filter(p => p.featured === true).length;
    const remainingFeatured = MAX_FEATURED - featuredCount;

    const handleFeaturedToggle = (id) => {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        // Eğer zaten öne çıkan ise, kaldır
        if (project.featured) {
            setProjects(prev => prev.map(p => 
                p.id === id ? normalizeProject({ ...p, featured: false }) : p
            ));
            showFeedback('success', isTurkish ? 'Öne çıkandan kaldırıldı!' : 'Removed from featured!');
            return;
        }

        // Eğer limit dolduysa hata ver
        if (featuredCount >= MAX_FEATURED) {
            showFeedback('error', isTurkish 
                ? `Maksimum ${MAX_FEATURED} proje öne çıkarılabilir! Önce birini kaldırın.` 
                : `Maximum ${MAX_FEATURED} projects can be featured! Remove one first.`
            );
            return;
        }

        // Öne çıkan yap
        setProjects(prev => prev.map(p => 
            p.id === id ? normalizeProject({ ...p, featured: true }) : p
        ));
        showFeedback('success', isTurkish ? 'Öne çıkan yapıldı!' : 'Added to featured!');
    };

    const handleResetData = () => {
        if (!window.confirm(isTurkish ? 'Tüm projeler varsayılana sıfırlanacak. Emin misiniz?' : 'All projects will be reset to default. Are you sure?')) {
            return;
        }
        const resetProjects = defaultProjects.map(normalizeProject);
        localStorage.setItem('admin-projects', JSON.stringify(resetProjects));
        setProjects(resetProjects);
        showFeedback('success', isTurkish ? 'Veriler sıfırlandı!' : 'Data reset!');
        window.dispatchEvent(new Event('projects-updated'));
    };

    // Stats
    const stats = {
        total: projects.length,
        published: projects.filter(p => p.status === 'Yayında').length,
        development: projects.filter(p => p.status === 'Geliştirme').length,
        beta: projects.filter(p => p.status === 'Beta').length,
        featured: projects.filter(p => p.featured === true).length
    };

    // Filtered projects
    const filteredProjects = projects.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const getStatusIcon = (status) => {
        const opt = statusOptions.find(o => o.value === status);
        return opt ? <opt.icon size={14} className={opt.color} /> : null;
    };

    const getStatusBadge = (status) => {
        if (status === 'Yayında') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        if (status === 'Geliştirme') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    };

    const getCategoryColor = (cat) => {
        return categoryOptions.find(c => c.value === cat)?.color || 'bg-slate-500';
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 260 : 72 }}
                className="fixed left-0 top-0 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col"
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
                    {sidebarOpen && (
                        <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="font-bold text-lg text-slate-900 dark:text-white"
                        >
                            Admin Panel
                        </motion.span>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Menu size={20} className="text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-3 space-y-1">
                    <button
                        onClick={() => setActiveSection('dashboard')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            activeSection === 'dashboard' 
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <LayoutDashboard size={20} />
                        {sidebarOpen && <span className="font-medium">{isTurkish ? 'Panel' : 'Dashboard'}</span>}
                    </button>
                    <button
                        onClick={() => setActiveSection('projects')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            activeSection === 'projects' 
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <Package size={20} />
                        {sidebarOpen && <span className="font-medium">{isTurkish ? 'Projeler' : 'Projects'}</span>}
                    </button>
                    <button
                        onClick={() => setActiveSection('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            activeSection === 'settings' 
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                    >
                        <Settings size={20} />
                        {sidebarOpen && <span className="font-medium">{isTurkish ? 'Ayarlar' : 'Settings'}</span>}
                    </button>
                </nav>

                {/* Bottom Actions */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <Link
                        to="/"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Home size={20} />
                        {sidebarOpen && <span className="font-medium">{isTurkish ? 'Siteye Git' : 'Go to Site'}</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span className="font-medium">{isTurkish ? 'Çıkış Yap' : 'Logout'}</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[260px]' : 'ml-[72px]'}`}>
                {/* Top Bar */}
                <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{isTurkish ? 'Admin' : 'Admin'}</span>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 dark:text-white font-medium">
                            {activeSection === 'dashboard' && (isTurkish ? 'Panel' : 'Dashboard')}
                            {activeSection === 'projects' && (isTurkish ? 'Projeler' : 'Projects')}
                            {activeSection === 'settings' && (isTurkish ? 'Ayarlar' : 'Settings')}
                        </span>
                    </div>
                    
                    {/* Feedback Toast */}
                    <AnimatePresence>
                        {feedback.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    feedback.type === 'success' 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                            >
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>

                <div className="p-6">
                    {/* Dashboard Section */}
                    {activeSection === 'dashboard' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {isTurkish ? 'Hoş Geldiniz! 👋' : 'Welcome! 👋'}
                                </h1>
                                <p className="text-slate-500">
                                    {isTurkish ? 'Projelerinizi buradan yönetebilirsiniz.' : 'You can manage your projects from here.'}
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <FolderOpen className="text-blue-600" size={22} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
                                            <p className="text-xs text-slate-500">{isTurkish ? 'Toplam Proje' : 'Total'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                            <CheckCircle className="text-green-600" size={22} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                                            <p className="text-xs text-slate-500">{isTurkish ? 'Yayında' : 'Published'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                            <Construction className="text-amber-600" size={22} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-amber-600">{stats.development}</p>
                                            <p className="text-xs text-slate-500">{isTurkish ? 'Geliştirme' : 'Dev'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                            <Star className="text-amber-500" size={22} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-amber-500">{stats.featured}</p>
                                            <p className="text-xs text-slate-500">{isTurkish ? 'Öne Çıkan' : 'Featured'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Projects */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <h2 className="font-semibold text-slate-900 dark:text-white">
                                        {isTurkish ? 'Son Projeler' : 'Recent Projects'}
                                    </h2>
                                    <button
                                        onClick={() => setActiveSection('projects')}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {isTurkish ? 'Tümünü Gör' : 'View All'}
                                    </button>
                                </div>
                                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {projects.slice(0, 5).map(project => (
                                        <motion.div 
                                            key={project.id} 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                                        >
                                            <div className="relative">
                                                <img 
                                                    src={project.image} 
                                                    alt={project.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                {project.featured && (
                                                    <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5">
                                                        <Star size={10} className="text-white fill-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                                                    {project.title}
                                                </p>
                                                <p className="text-xs text-slate-500">{project.lastUpdate}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusBadge(project.status)}`}>
                                                {getStatusIcon(project.status)}
                                                {statusOptions.find(s => s.value === project.status)?.label}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="font-semibold text-slate-900 dark:text-white mb-4">
                                    {isTurkish ? 'Hızlı İşlemler' : 'Quick Actions'}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <button
                                        onClick={handleAddProject}
                                        className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                                    >
                                        <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg group-hover:scale-110 transition-transform">
                                            <Plus size={20} className="text-blue-600" />
                                        </div>
                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            {isTurkish ? 'Yeni Proje' : 'New Project'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('projects')}
                                        className="flex flex-col items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                                    >
                                        <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg group-hover:scale-110 transition-transform">
                                            <Package size={20} className="text-purple-600" />
                                        </div>
                                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                            {isTurkish ? 'Tüm Projeler' : 'All Projects'}
                                        </span>
                                    </button>
                                    <Link
                                        to="/"
                                        className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
                                    >
                                        <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg group-hover:scale-110 transition-transform">
                                            <Eye size={20} className="text-green-600" />
                                        </div>
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                            {isTurkish ? 'Siteyi Gör' : 'View Site'}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={() => setActiveSection('settings')}
                                        className="flex flex-col items-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors group"
                                    >
                                        <div className="p-2 bg-amber-100 dark:bg-amber-800/50 rounded-lg group-hover:scale-110 transition-transform">
                                            <Settings size={20} className="text-amber-600" />
                                        </div>
                                        <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                                            {isTurkish ? 'Ayarlar' : 'Settings'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Projects Section */}
                    {activeSection === 'projects' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {isTurkish ? 'Projeler' : 'Projects'}
                                    </h1>
                                    <p className="text-slate-500 text-sm">
                                        {isTurkish ? `${projects.length} proje bulundu` : `${projects.length} projects found`}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Featured Stars Indicator */}
                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(MAX_FEATURED)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={18} 
                                                    className={`transition-all duration-300 ${
                                                        i < remainingFeatured 
                                                            ? 'text-amber-400 fill-amber-400' 
                                                            : 'text-slate-300 dark:text-slate-600'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium text-amber-700 dark:text-amber-400 ml-1">
                                            x{remainingFeatured}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleAddProject}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        <Plus size={18} />
                                        <span>{isTurkish ? 'Yeni Proje' : 'New Project'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-3">
                                <div className="relative flex-1 min-w-[200px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder={isTurkish ? 'Proje ara...' : 'Search projects...'}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
                                >
                                    <option value="all">{isTurkish ? 'Tüm Durumlar' : 'All Status'}</option>
                                    {statusOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Projects Table */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-50 dark:bg-slate-900">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    {isTurkish ? 'Proje' : 'Project'}
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    {isTurkish ? 'Kategori' : 'Category'}
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    {isTurkish ? 'Durum' : 'Status'}
                                                </th>
                                                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    <Star size={14} className="inline" />
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    {isTurkish ? 'Tarih' : 'Date'}
                                                </th>
                                                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    {isTurkish ? 'İşlemler' : 'Actions'}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                            {filteredProjects.map(project => (
                                                <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <img 
                                                                src={project.image} 
                                                                alt={project.title}
                                                                className="w-10 h-10 rounded-lg object-cover"
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                                                                    {project.title}
                                                                </p>
                                                                <p className="text-xs text-slate-500 truncate max-w-[200px]">
                                                                    {project.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white ${getCategoryColor(project.category)}`}>
                                                            {categoryOptions.find(c => c.value === project.category)?.label || project.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <select
                                                            value={project.status}
                                                            onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                                            className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${getStatusBadge(project.status)}`}
                                                        >
                                                            {statusOptions.map(opt => (
                                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            onClick={() => handleFeaturedToggle(project.id)}
                                                            className={`p-1.5 rounded-lg transition-colors ${
                                                                project.featured 
                                                                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500' 
                                                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-300'
                                                            }`}
                                                            title={isTurkish ? 'Öne Çıkan' : 'Featured'}
                                                        >
                                                            <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
                                                        </button>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-slate-500">
                                                        {project.lastUpdate}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={() => handleEditProject(project)}
                                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-blue-600 transition-colors"
                                                                title={isTurkish ? 'Düzenle' : 'Edit'}
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProject(project.id)}
                                                                className={`p-2 rounded-lg transition-colors ${
                                                                    deleteConfirm === project.id 
                                                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                                                                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-red-500'
                                                                }`}
                                                                title={deleteConfirm === project.id ? (isTurkish ? 'Onaylamak için tekrar tıkla' : 'Click again to confirm') : (isTurkish ? 'Sil' : 'Delete')}
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredProjects.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="px-4 py-12 text-center">
                                                        <FolderOpen size={40} className="mx-auto mb-3 text-slate-300" />
                                                        <p className="text-slate-500">
                                                            {isTurkish ? 'Proje bulunamadı.' : 'No projects found.'}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Settings Section */}
                    {activeSection === 'settings' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {isTurkish ? 'Ayarlar' : 'Settings'}
                            </h1>

                            {/* Appearance Settings */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <Palette className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {isTurkish ? 'Görünüm' : 'Appearance'}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {isTurkish ? 'Tema ve görsel tercihler' : 'Theme and visual preferences'}
                                        </p>
                                    </div>
                                </div>

                                {/* Theme Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                        {isTurkish ? 'Tema Seçimi' : 'Theme Selection'}
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                theme === 'light' 
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                            }`}
                                        >
                                            <Sun size={24} className={theme === 'light' ? 'text-blue-500' : 'text-slate-400'} />
                                            <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {isTurkish ? 'Açık' : 'Light'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                theme === 'dark' 
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                            }`}
                                        >
                                            <Moon size={24} className={theme === 'dark' ? 'text-blue-500' : 'text-slate-400'} />
                                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {isTurkish ? 'Koyu' : 'Dark'}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => setTheme('system')}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                theme === 'system' 
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                            }`}
                                        >
                                            <Monitor size={24} className={theme === 'system' ? 'text-blue-500' : 'text-slate-400'} />
                                            <span className={`text-sm font-medium ${theme === 'system' ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {isTurkish ? 'Sistem' : 'System'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Notifications Toggle */}
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-3">
                                        {notifications ? <Bell size={20} className="text-slate-600 dark:text-slate-400" /> : <BellOff size={20} className="text-slate-400" />}
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {isTurkish ? 'Bildirimler' : 'Notifications'}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {isTurkish ? 'İşlem bildirimlerini göster' : 'Show action notifications'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(!notifications)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                            notifications ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                                        }`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                            notifications ? 'translate-x-6' : ''
                                        }`} />
                                    </button>
                                </div>
                            </div>

                            {/* Data Management */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Database className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {isTurkish ? 'Veri Yönetimi' : 'Data Management'}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {isTurkish ? 'Projeleri dışa/içe aktar' : 'Export/Import projects'}
                                        </p>
                                    </div>
                                </div>

                                {/* Export */}
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Download size={20} className="text-green-600" />
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {isTurkish ? 'Verileri Dışa Aktar' : 'Export Data'}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {isTurkish ? 'JSON formatında indir' : 'Download as JSON'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const data = JSON.stringify(projects, null, 2);
                                            const blob = new Blob([data], { type: 'application/json' });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `projects-backup-${new Date().toISOString().split('T')[0]}.json`;
                                            a.click();
                                            URL.revokeObjectURL(url);
                                            showFeedback('success', isTurkish ? 'Veriler indirildi!' : 'Data exported!');
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                                    >
                                        <Download size={16} />
                                        <span>{isTurkish ? 'İndir' : 'Export'}</span>
                                    </button>
                                </div>

                                {/* Import */}
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Upload size={20} className="text-blue-600" />
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {isTurkish ? 'Verileri İçe Aktar' : 'Import Data'}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {isTurkish ? 'JSON dosyasından yükle' : 'Load from JSON file'}
                                            </p>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer">
                                        <Upload size={16} />
                                        <span>{isTurkish ? 'Yükle' : 'Import'}</span>
                                        <input
                                            type="file"
                                            accept=".json"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        try {
                                                            const imported = JSON.parse(event.target.result);
                                                            if (Array.isArray(imported)) {
                                                                const normalized = imported.map(normalizeProject);
                                                                setProjects(normalized);
                                                                persistProjects(normalized);
                                                                showFeedback('success', isTurkish ? `${normalized.length} proje yüklendi!` : `${normalized.length} projects imported!`);
                                                            }
                                                        } catch {
                                                            showFeedback('error', isTurkish ? 'Geçersiz dosya formatı!' : 'Invalid file format!');
                                                        }
                                                    };
                                                    reader.readAsText(file);
                                                }
                                                e.target.value = '';
                                            }}
                                        />
                                    </label>
                                </div>

                                {/* Reset */}
                                <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800">
                                    <div className="flex items-center gap-3">
                                        <RefreshCw size={20} className="text-amber-600" />
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {isTurkish ? 'Verileri Sıfırla' : 'Reset Data'}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {isTurkish ? 'Varsayılan projelere dön' : 'Restore default projects'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleResetData}
                                        className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                                    >
                                        <RefreshCw size={16} />
                                        <span>{isTurkish ? 'Sıfırla' : 'Reset'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* System Info */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                                        <Activity className="text-cyan-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {isTurkish ? 'Sistem Bilgisi' : 'System Info'}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {isTurkish ? 'Uygulama durumu ve istatistikler' : 'Application status and statistics'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                                        <HardDrive size={24} className="mx-auto mb-2 text-slate-400" />
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            {(JSON.stringify(projects).length / 1024).toFixed(1)} KB
                                        </p>
                                        <p className="text-xs text-slate-500">{isTurkish ? 'Depolama' : 'Storage'}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                                        <Package size={24} className="mx-auto mb-2 text-blue-500" />
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{projects.length}</p>
                                        <p className="text-xs text-slate-500">{isTurkish ? 'Proje' : 'Projects'}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                                        <Star size={24} className="mx-auto mb-2 text-amber-500" />
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{stats.featured}</p>
                                        <p className="text-xs text-slate-500">{isTurkish ? 'Öne Çıkan' : 'Featured'}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
                                        <Calendar size={24} className="mx-auto mb-2 text-green-500" />
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            {new Date().toLocaleDateString(isTurkish ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-xs text-slate-500">{isTurkish ? 'Bugün' : 'Today'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                        <Zap className="text-indigo-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {isTurkish ? 'Hızlı Bağlantılar' : 'Quick Links'}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {isTurkish ? 'Sık kullanılan sayfalar' : 'Frequently used pages'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        to="/"
                                        className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <Home size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{isTurkish ? 'Ana Sayfa' : 'Homepage'}</span>
                                        <ExternalLink size={14} className="ml-auto text-slate-300" />
                                    </Link>
                                    <Link
                                        to="/projects"
                                        className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <FolderOpen size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{isTurkish ? 'Projeler' : 'Projects'}</span>
                                        <ExternalLink size={14} className="ml-auto text-slate-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Account */}
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-red-200 dark:border-red-900/50 p-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                        <LogOut className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {isTurkish ? 'Hesap' : 'Account'}
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            {isTurkish ? 'Oturumu sonlandır' : 'End your session'}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span>{isTurkish ? 'Çıkış Yap' : 'Logout'}</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Project Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {editingProject 
                                        ? (isTurkish ? 'Proje Düzenle' : 'Edit Project')
                                        : (isTurkish ? 'Yeni Proje' : 'New Project')
                                    }
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSaveProject} className="p-5 space-y-4">
                                {formError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                                        {formError}
                                    </div>
                                )}

                                {/* Title TR */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        <FileText size={14} className="inline mr-1" />
                                        {isTurkish ? 'Proje Adı (TR)' : 'Project Name (TR)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* Title EN */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        <FileText size={14} className="inline mr-1" />
                                        {isTurkish ? 'Proje Adı (EN)' : 'Project Name (EN)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.titleEn}
                                        onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder={isTurkish ? 'Boş bırakılırsa TR kullanılır' : 'Leave empty to use TR'}
                                    />
                                </div>

                                {/* Description TR */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isTurkish ? 'Açıklama (TR)' : 'Description (TR)'}
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        rows={2}
                                        required
                                    />
                                </div>

                                {/* Description EN */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isTurkish ? 'Açıklama (EN)' : 'Description (EN)'}
                                    </label>
                                    <textarea
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        rows={2}
                                        placeholder={isTurkish ? 'Boş bırakılırsa TR kullanılır' : 'Leave empty to use TR'}
                                    />
                                </div>

                                {/* Category & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isTurkish ? 'Kategori' : 'Category'}
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        >
                                            {categoryOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isTurkish ? 'Durum' : 'Status'}
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        >
                                            {statusOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Featured Toggle */}
                                <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${
                                            formData.featured ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                                        }`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                            formData.featured ? 'translate-x-6' : ''
                                        }`} />
                                    </button>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
                                            <Star size={14} className={formData.featured ? 'text-amber-500' : 'text-slate-400'} fill={formData.featured ? 'currentColor' : 'none'} />
                                            {isTurkish ? 'Öne Çıkan Proje' : 'Featured Project'}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {isTurkish ? 'Ana sayfada gösterilir' : 'Shown on homepage'}
                                        </p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        <Tag size={14} className="inline mr-1" />
                                        {isTurkish ? 'Etiketler (virgülle ayırın)' : 'Tags (comma separated)'}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="React, Tailwind, Node.js"
                                    />
                                </div>

                                {/* Links */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            <LinkIcon size={14} className="inline mr-1" />
                                            GitHub
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.github}
                                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            <LinkIcon size={14} className="inline mr-1" />
                                            {isTurkish ? 'İndirme' : 'Download'}
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.download}
                                            onChange={(e) => setFormData({ ...formData, download: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        <Image size={14} className="inline mr-1" />
                                        {isTurkish ? 'Görsel URL' : 'Image URL'}
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                    {formData.image && (
                                        <img 
                                            src={formData.image} 
                                            alt="Preview" 
                                            className="mt-2 w-full h-32 object-cover rounded-lg"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        {isTurkish ? 'İptal' : 'Cancel'}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                                    >
                                        <Save size={16} />
                                        <span>{isSaving ? (isTurkish ? 'Kaydediliyor...' : 'Saving...') : (isTurkish ? 'Kaydet' : 'Save')}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;