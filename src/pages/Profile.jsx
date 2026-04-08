import React, { useState, useEffect } from 'react';
import { User, History, List, LogOut } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import PreviewModal from '../components/PreviewModal';
import { signOutUser } from '../services/firebase';

const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    // Load lists from localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('binaire_watchlist') || '[]');
    const savedHistory = JSON.parse(localStorage.getItem('binaire_history') || '[]');
    setWatchlist(savedWatchlist);
    setHistory(savedHistory);
  }, [selectedShow]); // Refresh when modal closes in case they changed it

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const displayedList = activeTab === 'watchlist' ? watchlist : history;

  return (
    <div className={`pt-24 pl-12 lg:pl-[4%] pr-[4%] min-h-screen bg-surface ${selectedShow ? 'h-screen overflow-hidden' : ''}`}>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16 animate-slide-up">
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-container rounded-3xl flex items-center justify-center text-white font-black text-5xl shadow-[0_20px_40px_rgba(229,9,20,0.2)]">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="text-center md:text-left flex-1 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">{user?.name || 'Guest User'}</h1>
          <p className="text-gray-400 font-medium">{user?.email || 'Premium Member'}</p>
        </div>
        <button 
          onClick={handleSignOut}
          className="btn-secondary !bg-surface-high hover:!bg-primary-container hover:!text-white flex items-center gap-2 group transition-all duration-300"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-surface-high mb-12 animate-fade-in">
        <button 
          onClick={() => setActiveTab('watchlist')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
            activeTab === 'watchlist' 
              ? 'text-white border-b-2 border-primary-container' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <List size={18} />
            My List ({watchlist.length})
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
            activeTab === 'history' 
              ? 'text-white border-b-2 border-primary-container' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
           <div className="flex items-center gap-2">
            <History size={18} />
            Watch History ({history.length})
          </div>
        </button>
      </div>

      {/* Grid */}
      {displayedList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12 pb-32 animate-slide-up">
          {displayedList.map((show, index) => (
            <MovieCard 
              key={`${show.id}-${index}`} 
              show={show} 
              onOpenModal={setSelectedShow} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-32 text-gray-500 animate-fade-in">
          <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6 shadow-inner">
            {activeTab === 'watchlist' ? <List size={40} className="opacity-20" /> : <History size={40} className="opacity-20" />}
          </div>
          <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">
            {activeTab === 'watchlist' ? 'Your list is empty' : 'No watch history'}
          </h3>
          <p className="max-w-xs text-sm font-medium text-center">
            {activeTab === 'watchlist' 
              ? 'Save shows and movies to your list to watch them later.' 
              : 'Movies and shows you watch will appear here.'}
          </p>
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

export default Profile;
