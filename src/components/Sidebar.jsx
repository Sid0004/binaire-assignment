import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tv, Film, Gamepad2, Search, User, LogOut } from 'lucide-react';
import { signOutUser } from '../services/firebase';

const Sidebar = ({ user, setUser }) => {
  const location = useLocation();

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'TV Shows', path: '/tv-shows', icon: Tv },
    { label: 'Movies', path: '/movies', icon: Film },
    { label: 'Video Games', path: '/video-games', icon: Gamepad2 },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="fixed left-6 top-8 bottom-8 w-20 flex flex-col items-center py-8 z-50 rounded-3xl bg-surface-container/70 backdrop-blur-[24px] shadow-[0px_20px_40px_rgba(0,0,0,0.4)] border border-outline-variant/15 transition-all">
      <Link to="/" className="mb-12 flex flex-col items-center group">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0px_10px_20px_rgba(229,9,20,0.15)] group-hover:scale-105 transition-transform">
          B
        </div>
      </Link>

      <nav className="flex-1 flex flex-col items-center gap-8 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link 
              key={item.label}
              to={item.path} 
              className={`relative flex items-center justify-center w-full group transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              title={item.label}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-primary-container rounded-r-full shadow-[0_0_10px_rgba(229,9,20,0.5)]" />
              )}
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
            </Link>
          );
        })}
      </nav>

      {user && (
        <button 
          onClick={handleSignOut}
          className="mt-auto text-gray-400 hover:text-primary-container transition-colors group"
          title="Sign Out"
        >
          <LogOut size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
