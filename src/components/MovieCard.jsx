import React from 'react';
import { Play, Plus, ChevronDown } from 'lucide-react';

const MovieCard = React.memo(({ show, onOpenModal }) => {
  return (
    <div 
      className="group relative flex flex-col gap-3 cursor-pointer"
      onClick={() => onOpenModal(show)}
    >
      {/* Card Thumbnail */}
      <div className="relative aspect-[2/3] rounded-netflix overflow-hidden bg-surface-container transition-all duration-500 shadow-xl group-hover:shadow-primary-container/20 group-hover:-translate-y-2">
        <img 
          src={show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'} 
          alt={show.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy" 
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
           <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition">
                 <Play size={18} fill="currentColor" />
              </button>
              <button className="w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center text-white hover:border-white transition backdrop-blur-sm">
                 <Plus size={18} />
              </button>
              <button className="w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center text-white hover:border-white transition backdrop-blur-sm ml-auto">
                 <ChevronDown size={18} />
              </button>
           </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="px-1">
        <h4 className="text-[14px] font-bold truncate group-hover:text-primary-container transition-colors tracking-tight">{show.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
           <span className="text-[10px] text-green-500 font-black uppercase">{show.rating?.average ? `${(show.rating.average * 10).toFixed(0)}% Match` : '98% Match'}</span>
           <span className="text-[10px] text-gray-500">{show.premiered?.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
