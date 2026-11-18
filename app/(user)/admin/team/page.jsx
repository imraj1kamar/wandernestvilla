'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { AdminButton, AdminInput, AdminSelect } from '@/components/dashboard';
import { apiCollection } from '@/apiService/apiCollection';

// Pre-configured platform permission registry
export const PLATFORM_PERMISSION_MODULES = [
  {
    moduleKey: 'villas',
    moduleTitle: '🏡 Villas & Estate Acquisitions',
    description: 'Permissions governing property registration and master listings across India.',
    permissions: [
      { key: 'villas.create', label: 'Onboard & Register New Villas', desc: 'Allows adding villas and auto-provisioning Villa Admin credentials' },
      { key: 'villas.edit', label: 'Modify Pricing & Amenities', desc: 'Can adjust base night rates, amenities, and seasonal rules' },
      { key: 'villas.audit', label: 'Property Quality Inspections', desc: 'Sign off on hygiene, safety, and brand compliance audits' },
      { key: 'villas.delist', label: 'Delist or Suspend Estates', desc: 'Temporary freeze on reservations during renovation/complaints' },
    ],
  },
  {
    moduleKey: 'financials',
    moduleTitle: '💰 Financials, Ledger & Settlements',
    description: 'High-clearance monetary reporting, expense validation and owner bank payouts.',
    permissions: [
      { key: 'financials.view', label: 'Consolidated P&L Ledger', desc: 'View gross revenue, platform cut, and net margins across all properties' },
      { key: 'expenses.audit', label: 'Audit & Verify Receipt Vault', desc: 'Review uploaded expense bills and flag suspicious claims' },
      { key: 'settlements.authorize', label: 'Trigger Owner Wire Transfers', desc: 'Approve 70/30 commission settlement batches to villa owner bank accounts' },
    ],
  },
  {
    moduleKey: 'bookings',
    moduleTitle: '📅 Master Reservations & Calendar',
    description: 'Central booking control across all 52+ verified Maharashtra & Goa villas.',
    permissions: [
      { key: 'bookings.view', label: 'Master Occupancy Calendar', desc: 'View all patron stays, guest contact details and arrival schedules' },
      { key: 'bookings.override', label: 'Date Blocking & VIP Rates', desc: 'Reserve dates for founders, partners, or apply custom pricing' },
      { key: 'bookings.refund', label: 'Issue Cancellations & Refunds', desc: 'Authorize emergency refund waivers and stay rescheduling' },
    ],
  },
  {
    moduleKey: 'delegation',
    moduleTitle: '👥 Team & Delegation Governance',
    description: 'Administrative power to create sub-users and delegate operational scopes.',
    permissions: [
      { key: 'team.create', label: 'Create Platform Sub-Admins', desc: 'Add new executives under Super Admin with custom permission scopes' },
      { key: 'team.permissions', label: 'Edit Role Permission Matrix', desc: 'Adjust module capabilities for existing team members' },
    ],
  },
];

// Initial mock platform team members
const INITIAL_TEAM = [
  {
    id: 'user-101',
    name: 'Anjali Deshmukh',
    email: 'anjali.d@luxeestate.com',
    phone: '+91 98200 44321',
    designation: 'Head of Villa Acquisitions & Onboarding',
    role: 'platform_sub_admin',
    scope: 'All Villas (Nationwide)',
    status: 'Active',
    permissions: ['villas.create', 'villas.edit', 'villas.audit', 'bookings.view'],
    joinedDate: '12 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'user-102',
    name: 'Rohan Varma, CA',
    email: 'rohan.v@luxeestate.com',
    phone: '+91 98199 87654',
    designation: 'Platform Financial Controller & Auditor',
    role: 'platform_sub_admin',
    scope: 'All Villas (Financial Scope)',
    status: 'Active',
    permissions: ['financials.view', 'expenses.audit', 'settlements.authorize', 'villas.audit'],
    joinedDate: '03 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'user-103',
    name: 'Devendra Shinde',
    email: 'devendra.s@luxeestate.com',
    phone: '+91 97654 11223',
    designation: 'Regional Operations Director (Goa & Alibaug)',
    role: 'platform_sub_admin',
    scope: 'Goa & Alibaug Regions (102 Villas)',
    status: 'Active',
    permissions: ['villas.create', 'villas.edit', 'bookings.view', 'bookings.override', 'expenses.audit'],
    joinedDate: '28 Feb 2026',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  },
];

export default function PlatformTeamPage() {
  const currentUser = useSelector(selectCurrentUser);

  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModule, setFilterModule] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Invite Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    password: '',
    scope: 'All Villas (Nationwide)',
    permissions: ['villas.create', 'villas.edit', 'bookings.view'],
  });

  // Load team from API on mount
  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await apiCollection.getTeamMembers();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setTeamMembers(res.data);
        }
      } catch (err) {
        console.log('Using local team cache:', err.message);
      }
    }
    loadTeam();
  }, []);

  // Toggle permission check in form
  const togglePermission = (permKey) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(permKey);
      const updated = exists
        ? prev.permissions.filter((k) => k !== permKey)
        : [...prev.permissions, permKey];
      return { ...prev, permissions: updated };
    });
  };

  // Toggle permission when editing existing member
  const toggleEditingPermission = (permKey) => {
    if (!editingMember) return;
    setEditingMember((prev) => {
      const exists = prev.permissions.includes(permKey);
      const updated = exists
        ? prev.permissions.filter((k) => k !== permKey)
        : [...prev.permissions, permKey];
      return { ...prev, permissions: updated };
    });
  };

  // Handle Save Edited Permissions
  const handleSaveEditedPermissions = async () => {
    if (!editingMember) return;
    setSubmitting(true);

    try {
      await apiCollection.updateUserPermissions(editingMember.id, editingMember.permissions);
    } catch (err) {
      console.log('Local permissions updated:', err.message);
    }

    setTeamMembers((prev) =>
      prev.map((m) => (m.id === editingMember.id ? editingMember : m))
    );
    setSubmitting(false);
    setEditingMember(null);

    setToastMessage({
      title: 'Permissions Updated',
      body: `Permission matrix updated successfully for ${editingMember.name}.`,
    });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Handle Create Member
  const handleCreateMember = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newMember = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 98000 00000',
      designation: formData.designation,
      role: 'platform_sub_admin',
      scope: formData.scope,
      status: 'Active',
      permissions: formData.permissions,
      joinedDate: 'Today',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    try {
      await apiCollection.createTeamMember({
        ...newMember,
        password: formData.password,
      });
    } catch (err) {
      console.log('Backend sync pending, saving locally:', err.message);
    }

    setTeamMembers((prev) => [newMember, ...prev]);
    setSubmitting(false);
    setIsInviteModalOpen(false);

    // Reset Form
    setFormData({
      name: '',
      email: '',
      phone: '',
      designation: '',
      password: '',
      scope: 'All Villas (Nationwide)',
      permissions: ['villas.create', 'villas.edit', 'bookings.view'],
    });

    setToastMessage({
      title: 'Platform Sub-Admin Created!',
      body: `${newMember.name} has been provisioned with ${newMember.permissions.length} active permissions.`,
    });
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Filter
  const filteredTeam = teamMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesModule =
      filterModule === 'all' || m.permissions.some((p) => p.startsWith(filterModule));

    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* ─── TOAST NOTIFICATION ────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1e2337] border border-gold-main/60 rounded-2xl p-4 shadow-2xl flex items-start gap-3 max-w-md animate-fade-in-up">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0 animate-ping" />
          <div className="flex-1">
            <h4 className="font-serif text-sm font-bold text-gold-light">{toastMessage.title}</h4>
            <p className="text-xs text-gray-300 font-sans mt-0.5 leading-relaxed">{toastMessage.body}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white text-xs cursor-pointer ml-2"
          >
            &times;
          </button>
        </div>
      )}

      {/* ─── TOP HEADER ────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-[1px] bg-gold-main" />
            <span className="text-[11px] uppercase font-bold tracking-widest text-gold-dark font-sans">
              Role-Based Access Control (RBAC)
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Platform Team &amp; Delegation Matrix
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1">
            Delegate operational control to Sub-Admins under Super Admin. Authorize villa registrations, financial audits, and ledger visibility.
          </p>
        </div>

        <AdminButton
          type="button"
          variant="primary"
          onClick={() => setIsInviteModalOpen(true)}
          className="px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
        >
          <span className="text-base font-bold">+</span>
          <span>Invite Platform Sub-Admin</span>
        </AdminButton>
      </div>

      {/* ─── SEARCH & MODULE FILTER BAR ─────────────────────────────────────── */}
      <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by member name, corporate email, or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e2337] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-main/60 transition-all font-sans"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap font-sans">Permission Filter:</span>
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="bg-[#1e2337] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-gold-main cursor-pointer"
          >
            <option value="all">All Modules ({teamMembers.length} Executives)</option>
            <option value="villas">Villas &amp; Onboarding</option>
            <option value="financials">Financials &amp; Settlements</option>
            <option value="bookings">Bookings &amp; Calendar</option>
          </select>
        </div>
      </div>

      {/* ─── TEAM MEMBERS TABLE ──────────────────────────────────────────────── */}
      <div className="bg-[#161a29] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#121522] text-[11px] font-sans font-bold uppercase tracking-wider text-gray-400">
                <th className="py-4 px-6">Executive Member</th>
                <th className="py-4 px-6">Jurisdiction Scope</th>
                <th className="py-4 px-6">Active Permissions</th>
                <th className="py-4 px-6">Clearance Level</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-sans">
              {filteredTeam.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  {/* Executive Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gold-main/40 flex-shrink-0 bg-brand-dark">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-gold-light transition-colors flex items-center gap-2">
                          <span>{member.name}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono">
                            {member.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5">{member.email}</p>
                        <p className="text-[11px] text-gold-dark font-medium mt-0.5">{member.designation}</p>
                      </div>
                    </div>
                  </td>

                  {/* Jurisdiction Scope */}
                  <td className="py-4 px-6 text-gray-300 font-medium">
                    <span className="bg-[#1e2337] px-2.5 py-1 rounded-lg border border-white/5 text-[11px] text-gray-300 block w-max">
                      {member.scope}
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-1">Joined: {member.joinedDate}</span>
                  </td>

                  {/* Active Permissions Badges */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1.5 max-w-sm">
                      {member.permissions.map((pKey) => (
                        <span
                          key={pKey}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-main/15 border border-gold-main/30 text-gold-light whitespace-nowrap"
                        >
                          {pKey}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-1">
                      {member.permissions.length} total privileges granted
                    </span>
                  </td>

                  {/* Clearance Level */}
                  <td className="py-4 px-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300">
                      Tier 2 Sub-Admin
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setEditingMember({ ...member })}
                      className="px-3 py-1.5 rounded-xl bg-gold-main/20 hover:bg-gold-main/30 border border-gold-main/40 text-gold-light text-xs font-semibold transition-all cursor-pointer"
                    >
                      Edit Matrix &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── INVITE SUB-ADMIN MODAL WITH FULL PERMISSION MATRIX ──────────── */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161a29] border border-gold-main/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative my-8 animate-fade-in-up">
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-sans block mb-1">
                  Security Protocol &bull; Delegation of Authority
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Provision Platform Sub-Admin
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  Grants platform-level permissions under the Super Admin to oversee villas, registrations &amp; financials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 text-lg leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-6">
              {/* Profile Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminInput
                  label="Executive Full Name"
                  placeholder="e.g. Anjali Deshmukh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <AdminInput
                  label="Corporate Email ID"
                  type="email"
                  placeholder="name@luxeestate.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <AdminInput
                  label="Designation / Title"
                  placeholder="e.g. Regional Manager - Maharashtra"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  required
                />

                <AdminInput
                  label="Temporary Master Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />

                <div className="sm:col-span-2">
                  <AdminSelect
                    label="Jurisdiction Scope (Villas Covered)"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    options={[
                      { value: 'All Villas (Nationwide)', label: 'All Villas (Nationwide - Full God-Eye View)' },
                      { value: 'Goa Region (64 Villas)', label: 'Goa Region (64 Signature Villas)' },
                      { value: 'Alibaug Region (38 Villas)', label: 'Alibaug Region (38 Coastal Mansions)' },
                      { value: 'Lonavla & Khandala (52 Villas)', label: 'Lonavla & Khandala (52 Hilltop Estates)' },
                      { value: 'Udaipur Heritage (16 Palaces)', label: 'Udaipur Heritage (16 Royal Palaces)' },
                    ]}
                  />
                </div>
              </div>

              {/* PERMISSION MATRIX CHECKBOXES */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-gold-light uppercase tracking-wider font-sans border-b border-white/5 pb-2">
                  Permission Delegation Matrix (Select Allowed Modules)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PLATFORM_PERMISSION_MODULES.map((module) => (
                    <div key={module.moduleKey} className="bg-[#1e2337] border border-white/5 rounded-2xl p-4 space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{module.moduleTitle}</span>
                        </h5>
                        <p className="text-[10px] text-gray-400 font-sans mt-0.5">{module.description}</p>
                      </div>

                      <div className="space-y-2 pt-1 border-t border-white/5">
                        {module.permissions.map((perm) => {
                          const isChecked = formData.permissions.includes(perm.key);
                          return (
                            <label
                              key={perm.key}
                              className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                                isChecked
                                  ? 'bg-gold-main/10 border-gold-main/40 text-white'
                                  : 'bg-transparent border-transparent text-gray-400 hover:text-gray-200'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => togglePermission(perm.key)}
                                className="mt-0.5 rounded border-white/20 text-gold-main focus:ring-gold-main/50 cursor-pointer"
                              />
                              <div className="text-[11px] min-w-0">
                                <span className="font-semibold block">{perm.label}</span>
                                <span className="text-[10px] text-gray-400 block leading-tight">{perm.desc}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <AdminButton
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-semibold"
                >
                  {submitting ? 'Granting Clearances...' : 'Provision Executive Access &rarr;'}
                </AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── EDIT PERMISSION MATRIX MODAL FOR EXISTING MEMBER ─────────────── */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161a29] border border-gold-main/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-fade-in-up">
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-sans block mb-1">
                  Adjust Privileges &bull; Live Matrix
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Edit Permissions: {editingMember.name}
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  {editingMember.designation} &bull; {editingMember.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="text-gray-400 hover:text-white p-1 text-lg leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {PLATFORM_PERMISSION_MODULES.map((module) => (
                <div key={module.moduleKey} className="bg-[#1e2337] border border-white/5 rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-bold text-gold-light">{module.moduleTitle}</h5>
                  <div className="space-y-2 border-t border-white/5 pt-2">
                    {module.permissions.map((perm) => {
                      const isChecked = editingMember.permissions.includes(perm.key);
                      return (
                        <label
                          key={perm.key}
                          className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                            isChecked
                              ? 'bg-gold-main/15 border-gold-main/50 text-white'
                              : 'bg-transparent border-transparent text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleEditingPermission(perm.key)}
                            className="mt-0.5 rounded border-white/20 text-gold-main focus:ring-gold-main/50 cursor-pointer"
                          />
                          <div className="text-[11px] min-w-0">
                            <span className="font-semibold block">{perm.label}</span>
                            <span className="text-[10px] text-gray-400 block leading-tight">{perm.desc}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <AdminButton
                type="button"
                variant="primary"
                onClick={handleSaveEditedPermissions}
                disabled={submitting}
                className="px-6 py-2.5 text-xs font-semibold"
              >
                {submitting ? 'Saving...' : 'Save Matrix Privileges &rarr;'}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
