import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose, title, fileUrl }) => {
  if (!isOpen) return null;

  // Function to handle download from within the modal
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = title.replace(/\s+/g, '_') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Google Docs Viewer URL generator
  // This is more reliable for embedding than raw PDF links which browsers might force-download or block
  const getViewerUrl = (url: string) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[85vh] rounded-2xl flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-t-2xl">
          <div className="flex flex-col">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4 max-w-md">{title}</h3>
             <span className="text-xs text-gray-500 dark:text-gray-400">Preview Mode</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-maroon-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
          {fileUrl && fileUrl !== '#' ? (
            <iframe 
              src={getViewerUrl(fileUrl)} 
              className="w-full h-full border-0" 
              title="PDF Viewer"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>Preview not available for this mock item.</p>
                <p className="text-sm">In a real app, this would load the PDF file.</p>
             </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            If preview fails to load, please use the download button.
          </span>
          <div className="flex gap-3 ml-auto">
             <a 
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-900 shadow-sm shadow-maroon-900/20 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;