import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { BRANCHES, YEARS, SEMESTERS, RESOURCE_TYPES, FilterState } from '../types';
import MaterialCard from '../components/MaterialCard';
import { Search, Filter, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { materials } = useData();
  const [filters, setFilters] = useState<FilterState>({
    branch: '',
    year: '',
    semester: '',
    type: '',
    search: ''
  });

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => {
      // Only show approved materials in student dashboard
      if (!m.isApproved) return false;

      const matchBranch = filters.branch ? m.branch === filters.branch : true;
      const matchYear = filters.year ? m.year === filters.year : true;
      const matchSem = filters.semester ? m.semester === filters.semester : true;
      const matchType = filters.type ? m.type === filters.type : true;
      const matchSearch = filters.search 
        ? m.title.toLowerCase().includes(filters.search.toLowerCase()) || 
          m.subject.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return matchBranch && matchYear && matchSem && matchType && matchSearch;
    });
  }, [materials, filters]);

  const clearFilters = () => {
    setFilters({ branch: '', year: '', semester: '', type: '', search: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors duration-300">
      {/* Filter Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30 transition-colors duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
           {/* Search & Filters Row */}
           <div className="flex flex-col md:flex-row gap-3 mb-3">
             <div className="relative flex-grow">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
               <input 
                 type="text" 
                 placeholder="Search by subject or title..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                 value={filters.search}
                 onChange={(e) => setFilters({...filters, search: e.target.value})}
               />
             </div>
             
             {/* Dropdowns - Stacked on mobile, row on desktop */}
             <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                <select 
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-maroon-500 transition-colors min-w-[140px]"
                  value={filters.branch}
                  onChange={(e) => setFilters({...filters, branch: e.target.value})}
                >
                  <option value="">All Branches</option>
                  {BRANCHES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
                <select 
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-maroon-500 transition-colors min-w-[120px]"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
             </div>
           </div>

           {/* Detailed Filters - Semester Pills */}
           <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-1 flex items-center">
                <Filter className="w-4 h-4 mr-1" /> Sem:
              </span>
              
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-grow no-scrollbar">
                 {SEMESTERS.slice(0, 8).map(sem => (
                    <button
                      key={sem}
                      onClick={() => setFilters(prev => ({...prev, semester: prev.semester === sem ? '' : sem}))}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                        filters.semester === sem 
                        ? 'bg-maroon-800 text-white border-maroon-800 dark:bg-maroon-700 dark:border-maroon-700' 
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      {sem}
                    </button>
                 ))}
              </div>

              {(filters.branch || filters.year || filters.semester || filters.type || filters.search) && (
                <button 
                  onClick={clearFilters}
                  className="ml-auto text-xs sm:text-sm text-maroon-600 dark:text-maroon-400 hover:text-maroon-800 dark:hover:text-maroon-300 flex items-center transition-colors whitespace-nowrap"
                >
                  <X className="w-4 h-4 mr-1" /> Clear
                </button>
              )}
           </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Study Materials</h2>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{filteredMaterials.length} results</span>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed transition-colors px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No materials found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button onClick={clearFilters} className="mt-4 text-maroon-600 dark:text-gold-500 font-medium hover:text-maroon-800 dark:hover:text-gold-400">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;