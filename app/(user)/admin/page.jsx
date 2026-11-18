'use client';

import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  selectActiveVillaId,
  setActiveVillaId,
} from '@/redux/slices/authSlice';
import {
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminFileUpload,
} from '@/components/dashboard';

/**
 * Common Master Dashboard (app/(user)/admin/page.jsx)
 * Supports Multi-Tenant Scoping:
 * - Super Admin: View ALL villas consolidated OR filter to any single villa.
 * - Villa Owner: Scoped strictly to their assigned villa (e.g., The Cloud Retreat).
 * - Operations Staff: Scoped to on-ground check-ins, dining & expense logging.
 */
export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const activeVillaId = useSelector(selectActiveVillaId) || 'all';

  // Role checks
  const isOwner = user?.role === 'villa_owner';
  const isOps = user?.role === 'concierge_manager' || user?.role === 'staff';
  const isSuperAdmin = !isOwner && !isOps;

  // Selected Villa Scope (All vs Single Villa)
  const [selectedScope, setSelectedScope] = useState(
    isOwner ? user?.assignedVilla || 'The Cloud Retreat, Lonavla' : 'all'
  );

  // Quick Expense Form State
  const [selectedVilla, setSelectedVilla] = useState(
    isOwner ? user?.assignedVilla || 'The Cloud Retreat, Lonavla' : 'Villa Rosewood, Goa'
  );
  const [category, setCategory] = useState('Maintenance');
  const [amount, setAmount] = useState('₹12,000');
  const [expenseDate, setExpenseDate] = useState('2026-11-18');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [selectedLedgerItem, setSelectedLedgerItem] = useState(null);

  // Master Ledger Data for ALL Villas
  const [allLedgerData, setAllLedgerData] = useState([
    {
      id: 1,
      villa: 'Villa Rosewood, Goa',
      month: 'Nov 2026',
      grossRevenue: '₹3,40,000',
      expensesLogged: '₹45,000',
      ownerShare: '₹2,36,000',
      netProfit: '+₹59,000',
    },
    {
      id: 2,
      villa: 'The Glasshouse, Candolim',
      month: 'Nov 2026',
      grossRevenue: '₹3,80,000',
      expensesLogged: '₹52,000',
      ownerShare: '₹2,64,000',
      netProfit: '+₹64,000',
    },
    {
      id: 3,
      villa: 'Casa de Sol, Alibaug',
      month: 'Nov 2026',
      grossRevenue: '₹2,90,000',
      expensesLogged: '₹38,000',
      ownerShare: '₹2,01,000',
      netProfit: '+₹51,000',
    },
    {
      id: 4,
      villa: 'The Cloud Retreat, Lonavla',
      month: 'Nov 2026',
      grossRevenue: '₹4,10,000',
      expensesLogged: '₹58,000',
      ownerShare: '₹2,85,000',
      netProfit: '+₹67,000',
    },
    {
      id: 5,
      villa: 'The Cloud Retreat, Lonavla',
      month: 'Oct 2026',
      grossRevenue: '₹3,60,000',
      expensesLogged: '₹42,000',
      ownerShare: '₹2,50,000',
      netProfit: '+₹68,000',
    },
    {
      id: 6,
      villa: 'Marigold Estate, Udaipur',
      month: 'Nov 2026',
      grossRevenue: '₹3,50,000',
      expensesLogged: '₹49,000',
      ownerShare: '₹2,43,000',
      netProfit: '+₹58,000',
    },
    {
      id: 7,
      villa: 'Heritage Estate, Karjat',
      month: 'Nov 2026',
      grossRevenue: '₹3,20,000',
      expensesLogged: '₹44,000',
      ownerShare: '₹2,22,000',
      netProfit: '+₹54,000',
    },
    {
      id: 8,
      villa: 'Villa Rosewood, Goa',
      month: 'Oct 2026',
      grossRevenue: '₹3,10,000',
      expensesLogged: '₹40,000',
      ownerShare: '₹2,15,000',
      netProfit: '+₹55,000',
    },
    {
      id: 9,
      villa: 'Casa de Sol, Alibaug',
      month: 'Oct 2026',
      grossRevenue: '₹2,75,000',
      expensesLogged: '₹35,000',
      ownerShare: '₹1,90,000',
      netProfit: '+₹50,000',
    },
  ]);

  // Filtered Ledger Rows based on selectedScope
  const filteredLedger = useMemo(() => {
    if (selectedScope === 'all') {
      return allLedgerData;
    }
    return allLedgerData.filter((item) =>
      item.villa.toLowerCase().includes(selectedScope.toLowerCase())
    );
  }, [selectedScope, allLedgerData]);

  // Dynamic Metrics based on Scope
  const metrics = useMemo(() => {
    if (selectedScope === 'all') {
      return {
        card1Label: 'Total Revenue (MTD)',
        card1Val: '₹12,45,000',
        card2Label: 'Total Expenses',
        card2Val: '₹3,12,000',
        card3Label: 'Net Platform Profit',
        card3Val: '₹2,49,000',
        card4Label: 'Pending Owner Payouts',
        card4Val: '₹6,84,000',
        scopeBadge: 'Consolidated All Properties',
      };
    } else {
      return {
        card1Label: `${selectedScope} Revenue`,
        card1Val: '₹4,10,000',
        card2Label: 'Operating Expenses',
        card2Val: '₹58,000',
        card3Label: isOwner ? 'Owner Net Earnings (70%)' : 'Net Retained Share',
        card3Val: '₹2,85,000',
        card4Label: isOwner ? 'Next Bank Wire Date' : 'Pending Approvals',
        card4Val: isOwner ? '25 Nov 2026' : '₹67,000',
        scopeBadge: `Scoped to: ${selectedScope}`,
      };
    }
  }, [selectedScope, isOwner]);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessToast(true);

      const newEntry = {
        id: Date.now(),
        villa: selectedVilla,
        month: 'Nov 2026',
        grossRevenue: '₹3,40,000',
        expensesLogged: amount || '₹12,000',
        ownerShare: '₹2,36,000',
        netProfit: '+₹59,000',
      };
      setAllLedgerData((prev) => [newEntry, ...prev.slice(0, 8)]);
      setTimeout(() => setSuccessToast(false), 4000);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* ─── TOAST NOTIFICATION ─────────────────────────────────────────── */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#161a29] border border-gold-main/60 rounded-xl p-4 shadow-2xl flex items-center gap-3 text-sm text-white animate-fade-in-up">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>
            Expense of <strong className="text-gold-light">{amount}</strong> logged &amp; audited for{' '}
            <strong className="text-white">{selectedVilla}</strong>!
          </span>
        </div>
      )}

      {/* ─── 0. MULTI-TENANT VILLA SCOPE SWITCHER BAR ────────────────────── */}
      <section className="bg-[#161a29] border border-white/5 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-main/20 border border-gold-main/40 flex items-center justify-center text-gold-light font-bold text-sm flex-shrink-0">
            {isOwner ? '🏡' : isOps ? '🛎️' : '👑'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-white leading-tight">
                {user?.name || 'Administrator Portal'}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-gold-main/20 text-gold-light">
                {user?.roleName || (isOwner ? 'Villa Owner' : isOps ? 'Concierge' : 'Super Admin')}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-sans mt-0.5">
              {metrics.scopeBadge}
            </p>
          </div>
        </div>

        {/* Villa Scope Filter Dropdown */}
        <div className="flex items-center gap-3">
          {isSuperAdmin ? (
            <div className="flex items-center gap-2 bg-[#1e2337] border border-white/10 rounded-xl px-3 py-1.5">
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Filter Estate:</span>
              <select
                value={selectedScope}
                onChange={(e) => {
                  setSelectedScope(e.target.value);
                  dispatch(setActiveVillaId(e.target.value));
                }}
                className="bg-transparent text-xs font-semibold text-gold-light focus:outline-none cursor-pointer pr-2"
              >
                <option value="all" className="bg-[#1e2337] text-white">
                  👑 All Signature Villas (Consolidated)
                </option>
                <option value="Villa Rosewood, Goa" className="bg-[#1e2337] text-white">
                  Villa Rosewood, Goa
                </option>
                <option value="The Glasshouse, Candolim" className="bg-[#1e2337] text-white">
                  The Glasshouse, Candolim, Goa
                </option>
                <option value="Casa de Sol, Alibaug" className="bg-[#1e2337] text-white">
                  Casa de Sol, Alibaug
                </option>
                <option value="The Cloud Retreat, Lonavla" className="bg-[#1e2337] text-white">
                  The Cloud Retreat, Lonavla
                </option>
                <option value="Marigold Estate, Udaipur" className="bg-[#1e2337] text-white">
                  Marigold Estate, Udaipur
                </option>
                <option value="Heritage Estate, Karjat" className="bg-[#1e2337] text-white">
                  Heritage Estate, Karjat
                </option>
              </select>
            </div>
          ) : (
            <div className="px-3.5 py-2 rounded-xl bg-gold-main/10 border border-gold-main/30 text-xs font-medium text-gold-light flex items-center gap-2">
              <span>🔒 Assigned Property:</span>
              <strong className="text-white">
                {user?.assignedVilla || 'The Cloud Retreat, Lonavla'}
              </strong>
            </div>
          )}
        </div>
      </section>

      {/* ─── 1. DYNAMIC SUMMARY METRIC CARDS ROW ─────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#2a2416] via-[#1f1b13] to-[#16140f] border border-gold-main/25 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-400 font-sans tracking-wide">
              {metrics.card1Label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              {metrics.card1Val}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gold-main/20 border border-gold-main/30 flex items-center justify-center text-gold-light shadow-inner flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#2c171e] via-[#201318] to-[#170e12] border border-red-500/25 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-400 font-sans tracking-wide">
              {metrics.card2Label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              {metrics.card2Val}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#122820] via-[#0e1f19] to-[#0a1713] border border-emerald-500/25 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-400 font-sans tracking-wide">
              {metrics.card3Label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight font-sans">
              {metrics.card3Val}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6H2.25m0 0H3m.75 0h16.5m.75 0h.75m-.75 0a.75.75 0 01-.75.75v.75m0 0a60.07 60.07 0 01-15.797 2.101C3.473 10.35 2.747 9.81 2.747 9.056V8.25" />
            </svg>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#1b2233] via-[#151a28] to-[#10141f] border border-blue-500/25 shadow-xl flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium text-gray-400 font-sans tracking-wide">
              {metrics.card4Label}
            </p>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#352514] border border-amber-500/40 text-amber-400 text-[10px] sm:text-[11px] font-semibold whitespace-nowrap shadow-sm">
              <span>▲</span>
              <span>Active Alerts</span>
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans mt-2">
            {metrics.card4Val}
          </p>
        </div>
      </section>

      {/* ─── 2. MAIN SECTION: LEDGER + QUICK EXPENSE LOGGER ──────────────── */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        
        {/* ─── LEFT COLUMN: VILLA PROFITABILITY & EXPENSE LEDGER (8 cols) ─── */}
        <div className="xl:col-span-8 bg-[#161a29] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/5">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                Villa Profitability &amp; Expense Ledger
              </h3>
              <p className="text-xs text-gray-400 font-sans">
                {selectedScope === 'all'
                  ? 'Showing live financial performance across all portfolio estates'
                  : `Historical ledger records for ${selectedScope}`}
              </p>
            </div>

            <div className="relative">
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl bg-[#1e2337] border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:border-gold-main/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Accent Alerts</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-white/5">
                  <th className="py-3 px-2 font-medium">Villa Name</th>
                  <th className="py-3 px-2 font-medium">Gross Revenue</th>
                  <th className="py-3 px-2 font-medium">Expenses Logged</th>
                  <th className="py-3 px-2 font-medium">Owner Share (70%)</th>
                  <th className="py-3 px-2 font-medium">Net P&amp;L</th>
                  <th className="py-3 px-2 font-medium text-right sm:text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {filteredLedger.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3 px-2 text-gray-300 font-medium whitespace-nowrap">
                      <span>{row.villa}</span>
                      <span className="text-gray-500 font-light ml-1">|</span>
                      {row.month && (
                        <span className="text-[10px] text-gray-400 font-mono ml-1.5">
                          ({row.month})
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-2 text-white font-medium whitespace-nowrap">
                      {row.grossRevenue}
                    </td>

                    <td className="py-3 px-2 text-red-400 font-medium whitespace-nowrap">
                      {row.expensesLogged}
                    </td>

                    <td className="py-3 px-2 text-gray-300 whitespace-nowrap">
                      {row.ownerShare}
                    </td>

                    <td className="py-3 px-2 text-emerald-400 font-semibold whitespace-nowrap">
                      {row.netProfit}
                    </td>

                    <td className="py-3 px-2 whitespace-nowrap text-right sm:text-left">
                      <button
                        type="button"
                        onClick={() => setSelectedLedgerItem(row)}
                        className="text-gold-main hover:text-gold-light hover:underline font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        [View Details]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: QUICK EXPENSE LOGGER (4 cols) ────────────────── */}
        <div className="xl:col-span-4 bg-[#161a29] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide mb-1">
            Quick Expense Logger
          </h3>
          <p className="text-xs text-gray-400 font-sans mb-4 pb-2 border-b border-white/5">
            Log operational on-ground bills &amp; maintenance audits
          </p>

          <form onSubmit={handleExpenseSubmit} className="space-y-4">
            {/* 1. Select Villa */}
            {isSuperAdmin ? (
              <AdminSelect
                label="Select Villa"
                value={selectedVilla}
                onChange={(e) => setSelectedVilla(e.target.value)}
                options={[
                  'Villa Rosewood, Goa',
                  'The Glasshouse, Candolim',
                  'Casa de Sol, Alibaug',
                  'The Cloud Retreat, Lonavla',
                  'Marigold Estate, Udaipur',
                  'Heritage Estate, Karjat',
                ]}
              />
            ) : (
              <div>
                <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide mb-1.5">
                  Assigned Villa
                </label>
                <div className="w-full bg-[#1e2337] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-gold-light font-medium">
                  {user?.assignedVilla || 'The Cloud Retreat, Lonavla'}
                </div>
              </div>
            )}

            {/* 2. Category */}
            <AdminSelect
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                'Maintenance',
                'Housekeeping & Amenities',
                'Chef & Culinary Supplies',
                'Pool & Jacuzzi Servicing',
                'Electricity & Utilities',
                'Gardening & Estate Landscaping',
              ]}
            />

            {/* 3. Amount */}
            <AdminInput
              label="Amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹12,000"
              required
            />

            {/* 4. Expense Date with Calendar Icon */}
            <AdminInput
              label="Expense Date"
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              placeholder="Expense Date"
              iconRight={
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              }
              required
            />

            {/* 5. Upload Receipt Image/PDF with invoice thumbnail */}
            <AdminFileUpload
              label="Upload Receipt Image/PDF"
              onChange={(file) => console.log('File uploaded:', file)}
            />

            {/* 6. Gold Gradient Primary Button with Sparkle Icon */}
            <div className="pt-2">
              <AdminButton
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm"
                icon={
                  <svg className="w-4 h-4 text-black/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.4L12 21.6l-2.4-7.2L2.4 12l7.2-2.4L12 2z" />
                  </svg>
                }
              >
                {isSubmitting ? 'Logging & Auditing...' : 'Log Expense & Audit'}
              </AdminButton>
            </div>
          </form>
        </div>

      </section>

      {/* ─── MODAL FOR [VIEW DETAILS] ────────────────────────────────────── */}
      {selectedLedgerItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161a29] border border-gold-main/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-dark font-bold font-sans">
                  Audit Breakdown
                </span>
                <h4 className="font-serif text-xl font-bold text-white mt-1">
                  {selectedLedgerItem.villa}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLedgerItem(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-sans text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Gross Booking Revenue</span>
                <span className="font-bold text-white">{selectedLedgerItem.grossRevenue}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5 text-red-400">
                <span>Verified Operating Expenses</span>
                <span className="font-bold">-{selectedLedgerItem.expensesLogged}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-gray-400">Owner Net Settlement (70%)</span>
                <span className="font-bold text-white">{selectedLedgerItem.ownerShare}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 text-emerald-400 text-base font-bold">
                <span>Net Platform Retained P&amp;L</span>
                <span>{selectedLedgerItem.netProfit}</span>
              </div>
            </div>

            <div className="pt-2">
              <AdminButton
                variant="primary"
                onClick={() => setSelectedLedgerItem(null)}
                className="w-full py-3"
              >
                Close Audit Breakdown
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
