'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout, setUser } from '@/redux/slices/authSlice';

/**
 * Dynamic Role-Based Admin Sidebar (components/dashboard/layout/Sidebar.jsx)
 * Renders distinct menus and submenus based on logged-in user role:
 * - 'super_admin' -> Full platform controls, P&L, audits, settlements, settings
 * - 'villa_owner' -> My Estates, Guest Bookings, Payout Slips, Maintenance
 * - 'concierge_manager' / 'staff' -> Daily Check-ins, Butler Requests, Housekeeping, Expense Logger
 */
export default function DynamicAdminSidebar({ isOpen = true, onClose }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // Fallback to localStorage on refresh
  const [user, setLocalUser] = useState(currentUser);
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    if (currentUser) {
      setLocalUser(currentUser);
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wandernest_auth');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setLocalUser(parsed);
          dispatch(setUser(parsed));
        } catch {}
      }
    }
  }, [currentUser, dispatch]);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wandernest_auth');
    }
    window.location.href = '/user/login';
  };

  // Determine active role (default to super_admin if not set)
  const role = user?.role || 'super_admin';

  // ════════════════════════════════════════════════════════════════════════════
  // 1. SUPER ADMIN MENU CONFIGURATION
  // ════════════════════════════════════════════════════════════════════════════
  const superAdminMenus = [
    {
      name: 'Dashboard',
      href: '/admin',
      active: pathname === '/admin' || pathname === '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      name: 'Villas',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      submenus: [
        { title: 'All Signature Villas', href: '/admin' },
        { title: 'Add New Villa Estate', href: '/admin' },
        { title: 'Quality Audits & Review', href: '/admin' },
      ],
    },
    {
      name: 'Bookings',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      submenus: [
        { title: 'All Reservations', href: '/admin' },
        { title: 'Master Occupancy Calendar', href: '/admin' },
        { title: 'Cancellations & Refunds', href: '/admin' },
      ],
    },
    {
      name: 'Financials & P&L',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      submenus: [
        { title: 'Villa Profitability Ledger', href: '/admin' },
        { title: 'Gross Revenue Reports', href: '/admin' },
        { title: 'GST & Tax Compliance', href: '/admin' },
      ],
    },
    {
      name: 'Expenses',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      submenus: [
        { title: 'Quick Expense Logger', href: '/admin' },
        { title: 'Audited Receipt Vault', href: '/admin' },
      ],
    },
    {
      name: 'Owner Settlements',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      submenus: [
        { title: 'Pending Payout Batches', href: '/admin' },
        { title: 'Wire Transfer History', href: '/admin' },
        { title: 'Commission Splits (70/30)', href: '/admin' },
      ],
    },
    {
      name: 'Settings',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      submenus: [
        { title: 'User Roles & Access Permissions', href: '/admin' },
        { title: 'Global Platform API Keys', href: '/admin' },
        { title: 'Security Audit Logs', href: '/admin' },
      ],
    },
  ];

  // ════════════════════════════════════════════════════════════════════════════
  // 2. VILLA OWNER MENU CONFIGURATION
  // ════════════════════════════════════════════════════════════════════════════
  const villaOwnerMenus = [
    {
      name: 'Owner Dashboard',
      href: '/admin',
      active: pathname === '/admin' || pathname === '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      name: 'My Estates',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      submenus: [
        { title: 'Assigned Villa Overview', href: '/admin' },
        { title: 'Nightly Rate & Seasonal Rules', href: '/admin' },
        { title: 'Photos & High-Res Tour', href: '/admin' },
      ],
    },
    {
      name: 'Bookings & Calendar',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      submenus: [
        { title: 'Confirmed Guest Stays', href: '/admin' },
        { title: 'Blocked Dates (Personal Use)', href: '/admin' },
        { title: 'Guest Feedback & Reviews', href: '/admin' },
      ],
    },
    {
      name: 'Earnings & Payouts',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      submenus: [
        { title: 'My Monthly 70% Share', href: '/admin' },
        { title: 'Bank Settlement Slips', href: '/admin' },
        { title: 'Annual Profitability Statement', href: '/admin' },
      ],
    },
    {
      name: 'Maintenance & Upgrades',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      submenus: [
        { title: 'Logged Villa Expenses', href: '/admin' },
        { title: 'Scheduled Deep Clean & Repairs', href: '/admin' },
      ],
    },
  ];

  // ════════════════════════════════════════════════════════════════════════════
  // 3. CONCIERGE & OPERATIONS STAFF MENU CONFIGURATION
  // ════════════════════════════════════════════════════════════════════════════
  const conciergeMenus = [
    {
      name: 'Ops Dashboard',
      href: '/admin',
      active: pathname === '/admin' || pathname === '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      name: 'Daily Guest Arrivals',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      submenus: [
        { title: "Today's VIP Check-Ins", href: '/admin' },
        { title: "Today's Check-Outs & Audits", href: '/admin' },
        { title: 'Airport Chauffeur Dispatch', href: '/admin' },
      ],
    },
    {
      name: 'Chef & Dining Orders',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      ),
      submenus: [
        { title: 'Degustation & Barbecue Menus', href: '/admin' },
        { title: 'Farm-to-Table Grocery Orders', href: '/admin' },
        { title: 'Guest Dietary Clearances', href: '/admin' },
      ],
    },
    {
      name: 'Housekeeping & Pool',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5-2 5 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        </svg>
      ),
      submenus: [
        { title: 'Room Turn-Down & Linen Roster', href: '/admin' },
        { title: 'Heated Infinity Pool PH Logs', href: '/admin' },
        { title: 'Jacuzzi & Sound System Check', href: '/admin' },
      ],
    },
    {
      name: 'Quick Expense Logger',
      href: '/admin',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
  ];

  // Select the appropriate menu items based on role
  let currentMenus = superAdminMenus;
  let roleDisplayName = 'Super Admin';
  let roleBadge = '👑 Super Admin';

  if (role === 'villa_owner') {
    currentMenus = villaOwnerMenus;
    roleDisplayName = 'Villa Owner';
    roleBadge = '🏡 Estate Owner';
  } else if (role === 'concierge_manager' || role === 'staff') {
    currentMenus = conciergeMenus;
    roleDisplayName = 'Operations Lead';
    roleBadge = '🛎️ Concierge Staff';
  }

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0f121d] border-r border-white/5 flex flex-col justify-between transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="px-6 pt-7 pb-5 border-b border-white/5">
          <Link href="/admin" className="block group">
            <h1 className="font-serif text-xl font-bold tracking-wider text-gold-main uppercase leading-none group-hover:brightness-110 transition-all">
              LUXEESTATE
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-gray-400 font-medium">
                {roleDisplayName.toUpperCase()}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-gold-main/20 text-gold-light font-bold">
                PORTAL
              </span>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation Items */}
        <nav className="p-3.5 space-y-1.5">
          {currentMenus.map((item) => {
            const hasSub = item.submenus && item.submenus.length > 0;
            const isSubOpen = openSubmenus[item.name];

            return (
              <div key={item.name} className="space-y-1">
                {hasSub ? (
                  // Parent Menu Item with Dropdown
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                      item.active
                        ? 'bg-gradient-to-r from-gold-main/20 to-gold-dark/25 border border-gold-main/40 text-gold-light shadow-md shadow-gold-main/5'
                        : isSubOpen
                        ? 'bg-white/5 text-white border border-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={item.active ? 'text-gold-main' : 'text-gray-400 group-hover:text-white transition-colors'}>
                        {item.icon}
                      </span>
                      <span className="font-sans text-left">{item.name}</span>
                    </div>

                    <svg
                      className={`w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-transform duration-200 ${
                        isSubOpen ? 'rotate-180 text-gold-main' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                ) : (
                  // Direct Link Menu Item
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      item.active
                        ? 'bg-gradient-to-r from-gold-main/20 to-gold-dark/25 border border-gold-main/40 text-gold-light shadow-md shadow-gold-main/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={item.active ? 'text-gold-main' : 'text-gray-400 group-hover:text-white transition-colors'}>
                        {item.icon}
                      </span>
                      <span className="font-sans">{item.name}</span>
                    </div>
                  </Link>
                )}

                {/* Submenu Dropdown Items */}
                {hasSub && isSubOpen && (
                  <div className="pl-9 pr-2 py-1 space-y-1">
                    {item.submenus.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        href={sub.href}
                        className="block px-3 py-1.5 rounded-lg text-xs font-sans text-gray-400 hover:text-gold-light hover:bg-white/5 transition-all"
                      >
                        • {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* ─── BOTTOM PROFILE & ROLE SWITCH ──────────────────────────────────── */}
      <div className="p-4 border-t border-white/5 bg-[#0b0e17]/60 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-gold-main/20 border border-gold-main/40 overflow-hidden flex-shrink-0">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">
              {user?.name || 'Super Admin'}
            </p>
            <p className="text-[10px] text-gold-light/90 truncate font-mono">
              {roleBadge}
            </p>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        </div>

        {/* Quick Switch Role or Logout */}
        <div className="flex items-center justify-between text-[11px] pt-1 text-gray-400">
          <Link
            href="/user/login"
            className="hover:text-gold-light transition-colors flex items-center gap-1 font-sans"
          >
            <span>🔄 Switch User</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="hover:text-red-400 transition-colors cursor-pointer font-sans"
          >
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
