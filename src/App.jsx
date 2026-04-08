import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Search from './pages/Search';
import Sidebar from './components/Sidebar';
import { WifiOff } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { subscribeToAuthChanges } from './services/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-surface-high border-t-primary-container rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface text-white font-sans selection:bg-primary-container selection:text-white">
      {/* Offline Alert */}
      {isOffline && (
        <div className="fixed top-0 w-full bg-surface-container-highest text-white py-2 text-center text-[10px] font-black z-[100] animate-pulse flex items-center justify-center gap-2 uppercase tracking-[0.2em] border-b border-primary shadow-2xl">
          <WifiOff size={14} className="text-primary-container" />
          <span>Local Mode: Connection Unavailable</span>
        </div>
      )}

      {user && <Sidebar user={user} setUser={setUser} />}

      <main className={`flex-1 transition-all duration-300 ${user ? 'ml-32' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/login" 
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/search" 
              element={user ? <Search /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/" />} 
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
