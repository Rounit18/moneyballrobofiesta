import React, { useState } from 'react';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuction } from '../context/AuctionContext.tsx';
import { soundEffects } from '../utils/audio.ts';

interface LoginScreenProps {
  onReplayIntro?: () => void;
  onOpenViewer?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { login } = useAuction();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please provide both username and password.');
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);
    soundEffects.playClick();

    const res = await login(username, password);
    setSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Invalid credentials. Please verify your login.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border-4 border-black brutal-shadow-lg p-6 sm:p-8">
          {/* Top Brand Crest */}
          <div className="text-center mb-6">
            <div className="inline-flex w-16 h-16 bg-[#FFD600] border-3 border-black brutal-shadow-sm items-center justify-center mb-3">
              <span className="font-heading font-black text-3xl text-black">M</span>
            </div>

            <div className="block">
              <span className="inline-block bg-black text-[#FFD600] px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider mb-2 rotate-[-1deg]">
                MONEYBALL '26 AUCTION &amp; TRANSFER PLATFORM
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-black leading-none">
              ENTER THE ARENA
            </h1>
            <p className="text-xs text-black/70 mt-1 font-mono font-bold">
              10 Franchises · £500M Starting Purse · 200 Top-flight Players
            </p>
          </div>

          {/* Error Box */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-[#FF5CA8] border-2 border-black text-black text-xs flex items-center gap-2 font-mono font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            <div>
              <label className="block text-xs uppercase font-black text-black mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FFF8E7] border-2 border-black text-xs text-black font-bold placeholder-black/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0_#000]"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-black text-black mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FFF8E7] border-2 border-black text-xs text-black font-bold placeholder-black/50 focus:outline-none focus:bg-white focus:shadow-[3px_3px_0_#000]"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#3D5AFE] hover:bg-black text-white font-heading font-black text-sm uppercase tracking-wider border-3 border-black brutal-shadow transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{submitting ? 'AUTHENTICATING...' : 'AUTHENTICATE & ENTER'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
