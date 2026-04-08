import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUpWithEmail } from '../services/firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) return setError("Please fill all fields.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    
    setLoading(true);
    setError('');
    
    try {
      await signUpWithEmail(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-surface overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-110 animate-fade-in opacity-30 blur-[4px]" 
        style={{backgroundImage: `url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000')`}}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      
      <div className="relative z-10 w-full max-w-[480px] px-6">
        <div className="bg-surface-container/60 backdrop-blur-3xl border border-surface-high px-8 py-12 md:px-14 md:py-16 rounded-2xl shadow-2xl animate-slide-up">
          <div className="text-center mb-10">
            <h1 className="text-white text-4xl font-black tracking-tighter mb-2">Create Account</h1>
            <p className="text-primary-container text-sm font-bold tracking-widest uppercase">Binaire Premium</p>
          </div>
          
          {error && <div className="mb-6 p-4 rounded-xl bg-primary-container/10 border border-primary text-primary-fixed-dim text-sm text-center">{error}</div>}
          
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-lowest border border-surface-high rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 shadow-inner"
                required
              />
            </div>
            <div className="space-y-1.5">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Create Password</label>
              <input 
                type="password" 
                placeholder="Minimum 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-lowest border border-surface-high rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 shadow-inner"
                minLength="6"
                required
              />
            </div>
            <div className="space-y-1.5">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-lowest border border-surface-high rounded-xl p-4 text-white focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 shadow-inner"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full btn-primary !py-4 !rounded-xl mt-6 shadow-[0_0_20px_rgba(229,9,20,0.3)] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
             <p className="text-gray-400 text-sm">
               Already have an account? <Link to="/login" className="text-white font-bold hover:text-primary-container transition-colors ml-1">Sign In.</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
