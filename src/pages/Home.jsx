import React, { useState, useEffect, useCallback } from 'react';
import { fetchShows } from '../services/api';
import { Play, Info } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import PreviewModal from '../components/PreviewModal';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [heroShow, setHeroShow] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // useInView for clean lazy loading (prevents memory leaks vs global event listeners)
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '400px',
  });

  useEffect(() => {
    loadInitialShows();
  }, []);

  const loadInitialShows = async () => {
    setLoading(true);
    const data = await fetchShows(0);
    setShows(data);
    if (data.length > 0) {
      setHeroShow(data[Math.floor(Math.random() * Math.min(10, data.length))]);
    }
    setPage(1);
    setLoading(false);
  };

  const loadMoreShows = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newShows = await fetchShows(page);
    setShows(prev => {
      // To strictly avoid memory leaks & extreme DOM size for 10k items,
      // in a real app we'd use react-window. Here we only keep recent pages.
      const updated = [...prev, ...newShows];
      if (updated.length > 500) {
        return updated.slice(updated.length - 500); // Retain max 500 items in DOM
      }
      return updated;
    });
    setPage(prev => prev + 1);
    setLoading(false);
  }, [loading, page]);

  useEffect(() => {
    if (inView) {
      loadMoreShows();
    }
  }, [inView, loadMoreShows]);

  const handleOpenModal = useCallback((show) => {
    setSelectedShow(show);
  }, []);

  return (
    <div className={`bg-surface min-h-screen overflow-x-hidden ${selectedShow ? 'h-screen overflow-hidden' : ''}`}>
      {/* Featured Hero Section */}
      {heroShow && (
        <div className="relative h-[90vh] min-h-[600px] w-full flex items-center px-6 lg:px-[4%]">
          <div 
            className="absolute inset-0 bg-cover bg-top animate-fade-in transition-opacity duration-1000"
            style={{ backgroundImage: `url(${heroShow.image?.original || heroShow.image?.medium})` }}
          />
          <div className="absolute inset-0 hero-scrim" />
          <div className="absolute inset-0 hero-mask hidden lg:block" />
          
          <div className="relative z-10 max-w-2xl animate-slide-up pl-12 lg:pl-0">
             <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-primary-container rounded-sm flex items-center justify-center text-[10px] font-black shadow-[0_0_15px_rgba(229,9,20,0.4)]">B</span>
                <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">Original Feature</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
                {heroShow.name}
             </h1>
             <p className="text-lg md:text-xl text-gray-200/90 line-clamp-3 mb-8 font-medium leading-relaxed max-w-lg drop-shadow-md">
                {heroShow.summary?.replace(/<[^>]*>?/gm, '')}
             </p>
             <div className="flex items-center gap-4">
                <button className="btn-primary flex items-center gap-2 group">
                   <Play size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                   <span>Play Now</span>
                </button>
                <button 
                  onClick={() => setSelectedShow(heroShow)}
                  className="btn-secondary flex items-center gap-2 group"
                >
                   <Info size={20} className="group-hover:scale-110 transition-transform" />
                   <span>More Information</span>
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Media Grid */}
      <div className="px-6 lg:px-[4%] -mt-32 relative z-20 pb-32 pl-12 lg:pl-[4%]">
        <div className="flex items-end justify-between mb-8">
           <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Trending Now</span>
           </h2>
           <button className="text-[10px] font-black tracking-widest text-gray-400 hover:text-white transition uppercase border-b border-gray-800 pb-1">View All</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12">
          {shows.map((show, index) => (
            <MovieCard 
              key={`${show.id}-${index}`} 
              show={show} 
              onOpenModal={handleOpenModal} 
            />
          ))}
        </div>

        {/* Intersection Observer target block */}
        <div ref={loadMoreRef} className="h-20 w-full mt-10">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-surface-high border-t-primary-container rounded-full animate-spin shadow-[0_0_15px_rgba(229,9,20,0.5)]" />
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedShow && (
        <PreviewModal 
          show={selectedShow} 
          onClose={() => setSelectedShow(null)} 
        />
      )}
    </div>
  );
};

export default Home;
