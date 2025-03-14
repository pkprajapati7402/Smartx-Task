'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsSignUp(searchParams.get('mode') !== 'login');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem("isLoggedIn", "true");
      router.push('/pages/dashboard'); // Redirect to dashboard after successful login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 text-white p-6">
      <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-lg rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 bg-white/30 text-white rounded-lg focus:ring-2 focus:ring-purple-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-white/30 text-white rounded-lg focus:ring-2 focus:ring-purple-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <a
            href={`/pages/authpage?mode=${isSignUp ? 'login' : 'signup'}`}
            className="text-purple-300 hover:text-purple-400 ml-1"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
}
