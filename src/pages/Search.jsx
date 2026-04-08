import React, { useState, useEffect, useCallback } from 'react';
import { searchShowsByQuery } from '../services/api';
import { Search as SearchIcon, X } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import PreviewModal from '../components/PreviewModal';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) performSearch();
      else setResults([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    const data = await searchShowsByQuery(query);
    setResults(data || []);
    setLoading(false);
  };

  const handleOpenModal = useCallback((show) => {
    setSelectedShow(show);
  }, []);

  return (
    <div className={`pt-24 pl-12 lg:pl-[4%] pr-[4%] min-h-screen bg-surface ${selectedShow ? 'h-screen overflow-hidden' : ''}`}>
      <div className="flex flex-col items-center mb-16 animate-fade-in">
        <div className="relative w-full max-w-3xl">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
          <input 
            type="text" 
            placeholder="Search by ID, name, or release year..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border-none rounded-full py-5 pl-16 pr-16 text-xl text-white outline-none focus:ring-1 focus:ring-primary shadow-[0_0_15px_rgba(255,180,170,0.05)] focus:shadow-[0_0_20px_rgba(229,9,20,0.1)] transition-all duration-300 placeholder:text-gray-600 font-medium"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-surface-high rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>
        {query && !loading && (
          <p className="mt-8 text-gray-500 font-bold tracking-widest text-[10px] uppercase">
            Showing results for <span className="text-white">"{query}"</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12 pb-24">
        {results.map((show) => (
          <MovieCard 
            key={show.id} 
            show={show} 
            onOpenModal={handleOpenModal} 
          />
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <div className="w-10 h-10 border-4 border-surface-high border-t-primary-container rounded-full animate-spin shadow-[0_0_15px_rgba(229,9,20,0.5)]" />
        </div>
      )}
      
      {!loading && query && results.length === 0 && (
         <div className="flex flex-col items-center justify-center mt-20 text-gray-500 animate-fade-in px-4 text-center">
            <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
              <SearchIcon size={40} className="opacity-20" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">No matches found</h3>
            <p className="max-w-xs text-sm font-medium">Your search for "{query}" did not return any records in the Binaire library.</p>
         </div>
      )}

      {!query && (
         <div className="flex flex-col items-center justify-center mt-32 text-gray-600 opacity-20">
            <h3 className="text-2xl font-black uppercase tracking-[0.4em]">Search Binaire</h3>
         </div>
      )}

      {selectedShow && (
        <PreviewModal 
          show={selectedShow} 
          onClose={() => setSelectedShow(null)} 
        />
      )}
    </div>
  );
};

export default Search;
