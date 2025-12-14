import React, { useState } from 'react';
import { Material } from '../types';
import { FileText, Download, Heart, Calendar, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';
import PdfViewerModal from './PdfViewerModal';

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const { toggleLike, downloadMaterial, isMaterialLiked } = useData();
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const isLiked = isMaterialLiked(material.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    downloadMaterial(material);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(material.id);
  };

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsViewerOpen(true);
  };

  // Helper to determine type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Notes': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'PYQ': return 'bg-gold-100 text-gold-900 dark:bg-gold-900/50 dark:text-gold-200';
      case 'Assignment': return 'bg-maroon-100 text-maroon-800 dark:bg-maroon-900/50 dark:text-maroon-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-maroon-200 dark:hover:border-maroon-900 transition-all duration-300 flex flex-col h-full group">
        <div className="p-5 flex-1">
          <div className="flex justify-between items-start mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
              {material.type}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
               <Calendar className="w-3 h-3 mr-1" />
               {new Date(material.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-maroon-800 dark:group-hover:text-gold-500 transition-colors">
            {material.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {material.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded border border-gray-100 dark:border-gray-600">{material.branch}</span>
            <span className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded border border-gray-100 dark:border-gray-600">{material.semester}</span>
            <span className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded border border-gray-100 dark:border-gray-600">{material.subject}</span>
          </div>
        </div>

        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
             <button onClick={handleLike} className="flex items-center hover:text-maroon-600 dark:hover:text-maroon-400 transition-colors space-x-1 group/like">
               <Heart 
                 className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-maroon-600 text-maroon-600 dark:text-maroon-500 scale-110' : 'group-hover/like:text-maroon-600'}`} 
               />
               <span className={`${isLiked ? 'text-maroon-600 dark:text-maroon-500' : ''}`}>{material.likes}</span>
             </button>
             <div className="flex items-center space-x-1">
               <Download className="w-4 h-4" />
               <span>{material.downloads}</span>
             </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleView}
              className="flex items-center px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-medium transition-colors"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              View
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center px-3 py-1.5 rounded-lg bg-maroon-50 dark:bg-maroon-900/30 text-maroon-800 dark:text-gold-500 hover:bg-maroon-100 dark:hover:bg-maroon-900/50 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </button>
          </div>
        </div>
      </div>

      <PdfViewerModal 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        title={material.title}
        fileUrl={material.fileUrl}
      />
    </>
  );
};

export default MaterialCard;