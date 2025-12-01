import defaultProjects from '../constants/defaultProjects';

const placeholderImage = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800';

export const normalizeProject = (project) => ({
    ...project,
    titleEn: project.titleEn || project.title || 'Project',
    description: project.description || 'Açıklama yakında.',
    descriptionEn: project.descriptionEn || 'Description coming soon.',
    category: (project.category || 'web').toString().toLowerCase(),
    tags: Array.isArray(project.tags) && project.tags.length ? project.tags : [(project.category || 'Genel')],
    image: project.image || placeholderImage,
    github: project.github || '#',
    download: project.download || '#',
    status: project.status || 'Yayında',
    featured: project.featured === true,
    lastUpdate: project.lastUpdate || new Date().toISOString().split('T')[0]
});

export const getStoredProjects = () => {
    // Admin panel kaldırıldı - direkt defaultProjects kullan
    return defaultProjects.map(normalizeProject);
};

export const persistProjects = (projects) => {
    // Admin panel kaldırıldı - artık localStorage kullanmıyoruz
};
