'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/authSlice';
import { AdminButton, AdminInput } from '@/components/dashboard';
import { apiCollection } from '@/apiService/apiCollection';

/**
 * Dedicated Enterprise Dashboard & Management Login
 * Route: /user/login (also aliased via /admin/login)
 * 
 * Authentication and authorization are handled 100% via the backend API.
 * The backend verifies credentials, returns user details with assigned role/villa,
 * and handles authorization tokens.
 */
export default function DashboardUserLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg('Please enter both User ID / Email and Password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Call backend authentication endpoint
      const response = await apiCollection.login({
        email: username.trim(),
        username: username.trim(),
        password: password,
      });

      const resData = response?.data || response;
      const loggedUser = resData.user || resData.data?.user || resData.userData || resData;
      const token = resData.token || resData.accessToken || resData.data?.token;

      // Save token if returned in JSON payload
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('accessToken', token);
      }

      // Store authenticated user in Redux
      dispatch(setUser(loggedUser));

      // Persist session in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('wandernest_auth', JSON.stringify(loggedUser));
      }

      // Backend redirect target or fallback to /admin
      const targetRoute = resData.redirectTo || resData.redirectUrl || '/admin';
      router.push(targetRoute);
    } catch (err) {
      console.error('Dashboard login error:', err);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Authentication failed. Please check your credentials and try again.';
      setErrorMsg(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f121d] text-white flex flex-col justify-center items-center px-4 py-16 sm:py-20 relative overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-gold-main/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-36 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Top Management Brand Header */}
        <div className="text-center space-y-1">
          <Link href="/admin" className="inline-block group mb-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-gold-main uppercase block group-hover:brightness-110 transition-all">
              LUXEESTATE
            </h1>
            <span className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-sans font-medium block">
              DASHBOARD &amp; MANAGEMENT PORTAL
            </span>
          </Link>
          <p className="text-xs text-gray-400 font-sans max-w-xs mx-auto leading-relaxed pt-1">
            Sign in with your enterprise credentials to access your administrative dashboard.
          </p>
        </div>

        {/* ─── CREDENTIALS FORM CARD ───────────────────────────────────────── */}
        <div className="bg-[#161a29] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          {/* Server Error Alert Banner */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <AdminInput
              label="User ID / Corporate Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin@luxeestate.com"
              required
              autoComplete="username"
            />

            <AdminInput
              label="Password / Master Key"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
            />

            <div className="pt-2">
              <AdminButton
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full py-3.5 text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </span>
                ) : (
                  <span>Sign In &amp; Launch Dashboard &rarr;</span>
                )}
              </AdminButton>
            </div>
          </form>

          {/* Footer note: Website guest login link */}
          <div className="pt-3 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-500 font-sans">
              Looking for website villa bookings?{' '}
              <Link href="/login" className="text-gold-light hover:underline font-medium">
                Website Patron Login (/login) &rarr;
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
