import React, { useState, useEffect } from 'react';
import { X, Play, Plus, Check, History, Info } from 'lucide-react';

const PreviewModal = ({ show, onClose }) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [inHistory, setInHistory] = useState(false);

  useEffect(() => {
    if (!show) return;
    const watchlist = JSON.parse(localStorage.getItem('binaire_watchlist') || '[]');
    const history = JSON.parse(localStorage.getItem('binaire_history') || '[]');
    setInWatchlist(watchlist.some(s => s.id === show.id));
    setInHistory(history.some(s => s.id === show.id));
    
    // Automatically add to history when opening modal as a feature, 
    // but the prompt says 'Options to save... and add... when clicking'
    // We will provide explicit buttons instead.
  }, [show]);

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('binaire_watchlist') || '[]');
    if (inWatchlist) {
      const updated = watchlist.filter(s => s.id !== show.id);
      localStorage.setItem('binaire_watchlist', JSON.stringify(updated));
      setInWatchlist(false);
    } else {
      watchlist.push(show);
      localStorage.setItem('binaire_watchlist', JSON.stringify(watchlist));
      setInWatchlist(true);
    }
  };

  const toggleHistory = () => {
    const history = JSON.parse(localStorage.getItem('binaire_history') || '[]');
    if (inHistory) {
      const updated = history.filter(s => s.id !== show.id);
      localStorage.setItem('binaire_history', JSON.stringify(updated));
      setInHistory(false);
    } else {
      history.push(show);
      localStorage.setItem('binaire_history', JSON.stringify(history));
      setInHistory(true);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl overflow-y-auto no-scrollbar shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-slide-up border border-outline-variant/20">
        <button 
          onClick={onClose}
          className="fixed md:absolute right-4 top-4 z-20 w-10 h-10 bg-surface-lowest/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-surface-high transition-colors shadow-lg"
        >
          <X size={24} />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative aspect-video w-full">
          <img 
            src={show.image?.original || show.image?.medium} 
            alt={show.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-black/20" />
          
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter drop-shadow-2xl">{show.name}</h2>
              <div className="flex flex-wrap gap-3">
                <button className="btn-primary flex items-center gap-2">
                   <Play size={20} fill="currentColor" />
                   <span>Play</span>
                </button>
                <button 
                  onClick={toggleWatchlist}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all border ${inWatchlist ? 'bg-white text-black border-white' : 'bg-surface-variant/40 border-gray-400 text-white hover:border-white backdrop-blur-md'}`}
                >
                   {inWatchlist ? <Check size={20} /> : <Plus size={20} />}
                   <span>{inWatchlist ? 'Added' : 'My List'}</span>
                </button>
                <button 
                  onClick={toggleHistory}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all border ${inHistory ? 'bg-primary-container text-white border-primary-container' : 'bg-surface-variant/40 border-gray-400 text-white hover:border-white backdrop-blur-md'}`}
                >
                   {inHistory ? <Check size={20} /> : <History size={20} />}
                   <span>{inHistory ? 'Watched' : 'Mark Watched'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-10 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 text-sm font-bold">
               <span className="text-green-500 uppercase tracking-widest">{show.rating?.average ? `${(show.rating.average * 10).toFixed(0)}% Match` : '98% Match'}</span>
               <span className="text-gray-400">{show.premiered?.split('-')[0]}</span>
               <span className="px-1.5 py-0.5 border border-gray-600 text-[10px] rounded uppercase text-gray-400">HD</span>
            </div>
            
            <p className="text-lg text-gray-200 leading-relaxed font-medium">
              {show.summary?.replace(/<[^>]*>?/gm, '')}
            </p>
          </div>

          <div className="space-y-4 text-sm bg-surface-lowest p-6 rounded-xl border border-surface-high">
            <div>
              <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Genres</span>
              <p className="text-gray-300 font-medium">{show.genres?.join(', ') || 'Various'}</p>
            </div>
            <div>
              <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Type</span>
              <p className="text-gray-300 font-medium">{show.type || 'Feature Film'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
