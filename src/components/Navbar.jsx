import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Bell } from 'lucide-react';

const Navbar = ({ user, setUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-[4%] py-4 flex items-center justify-between ${isScrolled ? 'glass-nav h-16' : 'bg-transparent h-20'}`}>
      <div className="flex items-center gap-12">
        <Link to="/" className="text-primary-container text-4xl font-extrabold tracking-tighter hover:scale-105 transition-transform duration-300">BINAIRE</Link>
        <div className="hidden lg:flex gap-6 text-[13px] font-medium">
          {[
            { label: 'Home', path: '/' },
            { label: 'TV Shows', path: '/tv-shows' },
            { label: 'Movies', path: '/movies' },
            { label: 'New & Popular', path: '/popular' },
            { label: 'My List', path: '/mylist' }
          ].map((item) => (
            <Link 
              key={item.label}
              to={item.path} 
              className={`transition-colors duration-300 hover:text-gray-400 ${isActive(item.path) ? 'text-white font-bold' : 'text-gray-300/80'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/search" className="text-gray-300 hover:text-white transition-all transform hover:scale-110 active:scale-95">
          <Search size={20} strokeWidth={2.5} />
        </Link>
        <button className="text-gray-300 hover:text-white transition-all transform hover:scale-110">
          <Bell size={20} strokeWidth={2.5} />
        </button>
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/20 group-hover:ring-2 ring-white/50 transition-all">
               <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`} alt="avatar" />
             </div>
          </div>
          <div className="absolute right-0 top-full mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-surface-container border border-surface-high rounded-lg p-3 min-w-[200px] shadow-2xl">
            <div className="px-3 py-2 border-b border-surface-high mb-2">
              <p className="font-bold text-sm text-white">{user?.name || 'Account'}</p>
              <p className="text-[11px] text-gray-400">Premium Member</p>
            </div>
            <button 
              onClick={() => setUser(null)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-high/50 rounded-md w-full transition-all"
            >
              <LogOut size={16} /> Sign Out of Binaire
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
