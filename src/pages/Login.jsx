import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInAsGuest, signInWithEmail } from '../services/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please enter credentials.");
    
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInAsGuest();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-surface overflow-hidden">
      {/* Background Image with extra dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 animate-fade-in opacity-40 blur-[2px]" 
        style={{backgroundImage: `url('https://images.unsplash.com/photo-1574267432553-4b202d6d0ff6?q=80&w=2000')`}}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      
      <div className="relative z-10 w-full max-w-[480px] px-6">
        <div className="bg-surface-container/40 backdrop-blur-3xl border border-surface-high/50 px-8 py-12 md:px-14 md:py-16 rounded-2xl shadow-2xl animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-primary-container text-5xl font-black tracking-tighter mb-2 shadow-primary-container/20 drop-shadow-xl">BINAIRE</h1>
            <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Short-Form Media Portal</p>
          </div>
          
          <h2 className="text-3xl font-black mb-8 tracking-tight">Sign In</h2>
          
          {error && <div className="mb-6 p-4 rounded-xl bg-primary-container/10 border border-primary text-primary-fixed-dim text-sm text-center">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Account ID</label>
              <input 
                type="email" 
                placeholder="Email or username" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-lowest border border-surface-high rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(255,180,170,0.1)]"
                required
              />
            </div>
            <div className="space-y-1.5">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Security Key</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-lowest border border-surface-high rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(255,180,170,0.1)]"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full btn-primary !py-4 !rounded-xl mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign In to Binaire'}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-surface-high"></div>
            <span className="px-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-surface-high"></div>
          </div>

          <button 
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <span>Continue as Guest</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>

          <div className="mt-10 text-center space-y-4">
             <p className="text-gray-500 text-sm">
               New to Binaire? <Link to="/signup" className="text-white font-bold hover:text-primary-container transition-colors ml-1">Create an account.</Link>
             </p>
             <p className="text-[10px] text-gray-600 leading-relaxed max-w-[280px] mx-auto uppercase tracking-tighter">
               This page is protected by Google reCAPTCHA to ensure you're not a bot.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
