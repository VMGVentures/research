'use client';

import { useState, useEffect } from 'react';

interface PasswordProtectionProps {
  pageSlug: string;
  children: React.ReactNode;
}

export default function PasswordProtection({ pageSlug, children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [requiresPassword, setRequiresPassword] = useState(false);

  useEffect(() => {
    // Keyboard shortcut to clear auth for testing (CMD+OPT+R)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.altKey && event.key === '®') {
        event.preventDefault();
        event.stopPropagation();
        console.log(`🔄 Clearing authentication for ${pageSlug}...`);
        localStorage.removeItem(`auth_${pageSlug}`);
        setIsAuthenticated(false);
        setIsLoading(true);
        // Force a page reload to restart the authentication check
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    // Check if password is required for this page
    const checkPasswordRequirement = async () => {
      try {
        const response = await fetch('/api/check-password-required', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageSlug })
        });
        
        const data = await response.json();
        
        if (!data.requiresPassword) {
          // No password required, show content immediately
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        setRequiresPassword(true);
        
        // Check if user is already authenticated in localStorage
        const storedAuth = localStorage.getItem(`auth_${pageSlug}`);
        if (storedAuth === 'true') {
          setIsAuthenticated(true);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error checking password requirement:', err);
        // On error, assume no password required
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    };

    checkPasswordRequirement();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageSlug]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageSlug, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(`auth_${pageSlug}`, 'true');
        setIsAuthenticated(true);
      } else {
        setError('Incorrect password');
        setPassword('');
      }
    } catch (err) {
      setError('Error verifying password');
      console.error('Password verification error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!requiresPassword || isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Protected Content</h1>
            <p className="text-zinc-400">Enter password to access this research project</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              Access Project
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-zinc-500 hover:text-zinc-400 text-sm transition-colors"
            >
              ← Back to Research Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}