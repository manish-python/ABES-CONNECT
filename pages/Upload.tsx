import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BRANCHES, YEARS, SEMESTERS, RESOURCE_TYPES } from '../types';
import { UploadCloud, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload: React.FC = () => {
  const { addMaterial, user } = useData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    branch: 'CSE',
    year: '1st Year',
    semester: 'Sem 1',
    type: 'Notes' as any,
    file: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Limit file size to 2MB for Local Storage demo purposes
      if (file.size > 2 * 1024 * 1024) {
        setError('For this demo, file size must be under 2MB to save to browser storage.');
        return;
      }
      setError('');
      setFormData({ ...formData, file: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!formData.file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    
    // Convert File to Base64 to simulate "Hosting" for the demo
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64String = reader.result as string;

      // Simulate network delay
      setTimeout(() => {
        try {
          addMaterial({
            title: formData.title,
            description: formData.description,
            subject: formData.subject,
            branch: formData.branch,
            year: formData.year,
            semester: formData.semester,
            type: formData.type,
            fileUrl: base64String, // Save the actual file data
            uploadedBy: user.id,
            uploaderName: user.name,
            size: `${(formData.file!.size / 1024 / 1024).toFixed(2)} MB`
          });
          setLoading(false);
          setSuccess(true);
          
          // Redirect after showing success message
          setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
          console.error(err);
          setLoading(false);
          setError("Storage quota exceeded. Please try a smaller file or clear some existing materials.");
        }
      }, 1500);
    };

    reader.onerror = () => {
      setLoading(false);
      setError("Failed to read file.");
    };

    reader.readAsDataURL(formData.file);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Upload Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your material has been submitted and is pending admin approval. Thank you for contributing!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Material</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Share your notes and help the community grow.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                required
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                placeholder="e.g., Data Structures Unit 1 Notes"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch</label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              >
                {BRANCHES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                value={formData.semester}
                onChange={(e) => setFormData({...formData, semester: e.target.value})}
              >
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resource Type</label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              >
                {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                required
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                placeholder="e.g., Operating Systems"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                placeholder="Briefly describe what this file contains..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Upload</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="space-y-1 text-center">
                  {formData.file ? (
                    <div className="flex flex-col items-center">
                       <File className="mx-auto h-12 w-12 text-maroon-600" />
                       <p className="text-sm text-gray-900 dark:text-white font-medium mt-2">{formData.file.name}</p>
                       <p className="text-xs text-gray-500 mt-1">
                         {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                       </p>
                       <button 
                        type="button" 
                        onClick={() => setFormData({...formData, file: null})}
                        className="text-xs text-red-500 dark:text-red-400 mt-2 hover:underline"
                       >
                         Remove
                       </button>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-maroon-700 dark:text-gold-500 hover:text-maroon-800 dark:hover:text-gold-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-maroon-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" required />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX up to 2MB (Demo Limit)</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end border-t border-gray-100 dark:border-gray-700">
             <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="mr-3 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={loading}
               className={`px-6 py-2 bg-maroon-800 text-white text-sm font-medium rounded-lg hover:bg-maroon-900 dark:hover:bg-maroon-700 shadow-sm transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
             >
               {loading ? 'Uploading...' : 'Submit Material'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;