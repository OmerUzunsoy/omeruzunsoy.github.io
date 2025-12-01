import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithSkeleton = ({ src, alt, className = '', skeletonClassName = '', style = {} }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Varsayılan stil: Görseli yakınlaştır ve sağ altı kırp (AI ibaresini gizle)
    const imageStyle = {
        objectPosition: 'center top',
        transform: 'scale(1.15)',
        ...style
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Skeleton */}
            {!isLoaded && !hasError && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 ${skeletonClassName}`}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            )}

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${!isLoaded ? 'opacity-0' : 'opacity-100'}`}
                style={imageStyle}
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: isLoaded ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
            />

            {/* Error State */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default ImageWithSkeleton;
