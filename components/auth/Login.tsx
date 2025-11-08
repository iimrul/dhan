import React, { useState } from 'react';
// FIX: Remove v9 modular imports, as functions are now called on the auth instance.
import { auth } from '../../firebase/config';
import Button from '../common/Button';

type AuthMode = 'login' | 'signup';

const Login: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'signup') {
        // FIX: Use auth.createUserWithEmailAndPassword from the v8 API.
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        // FIX: Use auth.signInWithEmailAndPassword from the v8 API.
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-beige p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-green">Amader<span className="text-brand-yellow">Dhan</span></h1>
            <p className="text-gray-500 mt-2">Restoring Bangladesh's Natural Rice Ecosystem</p>
        </div>
        
        <div className="flex border-b mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 font-semibold text-center transition-colors ${mode === 'login' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 font-semibold text-center transition-colors ${mode === 'signup' ? 'text-brand-green border-b-2 border-brand-green' : 'text-gray-500'}`}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light-green"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-light-green"
            required
          />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
