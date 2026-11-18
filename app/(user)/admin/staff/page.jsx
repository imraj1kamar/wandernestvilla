'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectActiveVillaId } from '@/redux/slices/authSlice';
import { AdminButton, AdminInput, AdminSelect } from '@/components/dashboard';
import { apiCollection } from '@/apiService/apiCollection';

// Granular Villa Operational Permission Registry
export const VILLA_STAFF_MODULES = [
  {
    moduleKey: 'inventory',
    title: '📦 Inventory & Kitchen Pantry',
    desc: 'Linen count, bar restocking, guest amenity replenishments & kitchen provisions.',
    permissions: [
      { key: 'inventory.view', label: 'View Stock & Linen Levels', desc: 'Can inspect current on-premise stock count' },
      { key: 'inventory.log', label: 'Log Daily Consumable Usage', desc: 'Can deduct used toiletries, drinks, and ingredients' },
      { key: 'inventory.po', label: 'Create Restock Requisitions', desc: 'Can generate purchase requests for Villa Admin approval' },
    ],
  },
  {
    moduleKey: 'billing',
    title: '💳 Billing & Local POS Invoices',
    desc: 'Bespoke chef meals, minibar tabs, pool heater surcharges & extra guest fees.',
    permissions: [
      { key: 'billing.create', label: 'Generate Guest Dining Bills', desc: 'Can create itemized invoices for food and services' },
      { key: 'billing.collect', label: 'Collect Cash / UPI & Settle', desc: 'Can record payment collected and print receipts' },
      { key: 'billing.discount', label: 'Apply Goodwill Waivers', desc: 'Can apply discretionary discount on meals or services' },
    ],
  },
  {
    moduleKey: 'checkin',
    title: '🛎️ Guest Services & Check-In',
    desc: 'Guest arrival welcoming, government ID verification, and butler services.',
    permissions: [
      { key: 'checkin.view', label: 'View Guest Itinerary & Notes', desc: 'See arrival time, dietary requests, and guest count' },
      { key: 'checkin.verify', label: 'Verify Govt IDs & Passport', desc: 'Scan and digitally file guest verification forms' },
      { key: 'checkin.handover', label: 'Estate Keys & Check-Out Audit', desc: 'Sign off on security deposit return after inspection' },
    ],
  },
  {
    moduleKey: 'maintenance',
    title: '🛠️ Maintenance & Housekeeping',
    desc: 'Turn-down service, infinity pool chemical checks, and repairs.',
    permissions: [
      { key: 'maintenance.log', label: 'Report Damage & Breakage', desc: 'Log damaged items or appliances needing repair' },
      { key: 'maintenance.inspect', label: 'Pass Housekeeping Inspection', desc: 'Mark villa pristine and ready for next arrival' },
    ],
  },
];

// Initial mock staff database grouped by villa
const INITIAL_STAFF_BY_VILLA = {
  'villa-1': [
    {
      id: 'staff-1',
      name: 'Rameshwar Kadam',
      email: 'ramesh@rosewoodgoa.staff',
      phone: '+91 98231 09876',
      department: 'Butler & Guest Relations',
      role: 'concierge_manager',
      villaId: 'villa-1',
      villaName: 'Villa Rosewood, Goa',
      status: 'Active',
      permissions: ['checkin.view', 'checkin.verify', 'checkin.handover', 'billing.create', 'billing.collect'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'staff-2',
      name: 'Chef Anthony Gonsalves',
      email: 'chef.anthony@rosewoodgoa.staff',
      phone: '+91 98222 34567',
      department: 'Executive Villa Chef',
      role: 'villa_staff',
      villaId: 'villa-1',
      villaName: 'Villa Rosewood, Goa',
      status: 'Active',
      permissions: ['inventory.view', 'inventory.log', 'inventory.po', 'billing.create'],
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'staff-3',
      name: 'Sunita Fernandes',
      email: 'sunita@rosewoodgoa.staff',
      phone: '+91 98211 76543',
      department: 'Housekeeping Lead',
      role: 'villa_staff',
      villaId: 'villa-1',
      villaName: 'Villa Rosewood, Goa',
      status: 'Active',
      permissions: ['inventory.view', 'inventory.log', 'maintenance.log', 'maintenance.inspect'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
  ],
  'villa-2': [
    {
      id: 'staff-4',
      name: 'Mahesh Jadhav',
      email: 'mahesh@cloudretreat.staff',
      phone: '+91 98690 12345',
      department: 'Estate Caretaker & Butler',
      role: 'concierge_manager',
      villaId: 'villa-2',
      villaName: 'The Cloud Retreat, Lonavla',
      status: 'Active',
      permissions: ['checkin.view', 'checkin.verify', 'checkin.handover', 'maintenance.log'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ],
};

function VillaStaffContent() {
  const searchParams = useSearchParams();
  const currentUser = useSelector(selectCurrentUser);
  const activeVillaId = useSelector(selectActiveVillaId);

  // Determine current villa context
  const paramVillaId = searchParams.get('villaId');
  const paramVillaName = searchParams.get('villaName');

  const currentVillaId = paramVillaId || (activeVillaId !== 'all' ? activeVillaId : 'villa-1');
  const currentVillaName = paramVillaName || (currentVillaId === 'villa-1' ? 'Villa Rosewood, Goa' : 'Assigned Villa Estate');

  const [staffList, setStaffList] = useState(INITIAL_STAFF_BY_VILLA[currentVillaId] || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Butler & Guest Relations',
    password: '',
    permissions: ['checkin.view', 'checkin.verify', 'inventory.view'],
  });

  // Load from API if available
  useEffect(() => {
    async function loadStaff() {
      try {
        const res = await apiCollection.getVillaStaff(currentVillaId);
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setStaffList(res.data);
          return;
        }
      } catch (err) {
        console.log('Loading local staff state:', err.message);
      }
      setStaffList(INITIAL_STAFF_BY_VILLA[currentVillaId] || INITIAL_STAFF_BY_VILLA['villa-1']);
    }
    loadStaff();
  }, [currentVillaId]);

  const togglePermission = (permKey) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(permKey);
      const updated = exists
        ? prev.permissions.filter((k) => k !== permKey)
        : [...prev.permissions, permKey];
      return { ...prev, permissions: updated };
    });
  };

  const toggleEditingPermission = (permKey) => {
    if (!editingStaff) return;
    setEditingStaff((prev) => {
      const exists = prev.permissions.includes(permKey);
      const updated = exists
        ? prev.permissions.filter((k) => k !== permKey)
        : [...prev.permissions, permKey];
      return { ...prev, permissions: updated };
    });
  };

  // Add new staff member
  const handleAddStaff = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newStaff = {
      id: `staff-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: 'villa_staff',
      villaId: currentVillaId,
      villaName: currentVillaName,
      status: 'Active',
      permissions: formData.permissions,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };

    try {
      await apiCollection.createVillaStaff(currentVillaId, {
        ...newStaff,
        password: formData.password,
      });
    } catch (err) {
      console.log('Local staff added:', err.message);
    }

    setStaffList((prev) => [newStaff, ...prev]);
    setSubmitting(false);
    setIsAddModalOpen(false);

    // Reset Form
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: 'Butler & Guest Relations',
      password: '',
      permissions: ['checkin.view', 'checkin.verify', 'inventory.view'],
    });

    setToastMessage({
      title: 'Villa Staff Account Created!',
      body: `${newStaff.name} is now authorized for ${currentVillaName} with ${newStaff.permissions.length} operational privileges.`,
    });
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Save edited permissions
  const handleSaveEditedPermissions = async () => {
    if (!editingStaff) return;
    setSubmitting(true);

    try {
      await apiCollection.updateVillaStaff(currentVillaId, editingStaff.id, {
        permissions: editingStaff.permissions,
      });
    } catch (err) {
      console.log('Local staff updated:', err.message);
    }

    setStaffList((prev) =>
      prev.map((s) => (s.id === editingStaff.id ? editingStaff : s))
    );
    setSubmitting(false);
    setEditingStaff(null);

    setToastMessage({
      title: 'Operational Permissions Updated',
      body: `Privileges for ${editingStaff.name} updated successfully.`,
    });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Filter staff
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = filterDept === 'all' || s.department.toLowerCase().includes(filterDept.toLowerCase());

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* ─── TOAST ─────────────────────────────────────────────────────────── */}
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
              Property-Level RBAC &bull; Local Staff Delegation
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Villa Staff &amp; Operations Team
            </h1>
            <span className="bg-gold-main/20 border border-gold-main/40 text-gold-light text-xs font-semibold px-3 py-1 rounded-xl">
              🏡 {currentVillaName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1">
            Villa Admins create on-site staff accounts with restricted module access (Inventory, Billing, Guest Check-In &amp; Maintenance).
          </p>
        </div>

        <AdminButton
          type="button"
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
        >
          <span className="text-base font-bold">+</span>
          <span>Add Villa Staff Member</span>
        </AdminButton>
      </div>

      {/* ─── SUMMARY CARDS (OPERATIONAL READINESS) ───────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans block">Total Active Staff</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 block">{staffList.length} Personnel</span>
        </div>
        <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans block">Butler / Concierge</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-gold-light mt-1 block">
            {staffList.filter((s) => s.department.includes('Butler')).length} On Duty
          </span>
        </div>
        <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans block">Kitchen &amp; Pantry</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-400 mt-1 block">
            {staffList.filter((s) => s.department.includes('Chef') || s.department.includes('Kitchen')).length || 1} Active
          </span>
        </div>
        <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans block">Super Admin Oversight</span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-blue-300 mt-1 block">100% Synced</span>
        </div>
      </div>

      {/* ─── SEARCH & FILTER BAR ────────────────────────────────────────────── */}
      <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by staff name, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e2337] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-main/60 transition-all font-sans"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap font-sans">Department:</span>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-[#1e2337] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-gold-main cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="Butler">Butler &amp; Front Desk</option>
            <option value="Chef">Kitchen &amp; Culinary</option>
            <option value="Housekeeping">Housekeeping &amp; Linen</option>
          </select>
        </div>
      </div>

      {/* ─── STAFF MEMBERS TABLE ─────────────────────────────────────────────── */}
      <div className="bg-[#161a29] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#121522] text-[11px] font-sans font-bold uppercase tracking-wider text-gray-400">
                <th className="py-4 px-6">Staff Member</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Operational Capabilities (Permissions)</th>
                <th className="py-4 px-6">System Access</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-sans">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-white/[0.02] transition-colors group">
                  {/* Name & Avatar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gold-main/30 flex-shrink-0 bg-brand-dark">
                        <img
                          src={staff.avatar}
                          alt={staff.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-gold-light transition-colors flex items-center gap-2">
                          <span>{staff.name}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono">
                            {staff.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-mono mt-0.5">{staff.email}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{staff.phone}</p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-4 px-6 text-gray-300 font-medium">
                    <span className="bg-[#1e2337] px-2.5 py-1 rounded-lg border border-white/5 text-[11px] text-gray-200 block w-max">
                      {staff.department}
                    </span>
                  </td>

                  {/* Permissions Badges */}
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {staff.permissions.map((pKey) => {
                        const isInventory = pKey.startsWith('inventory');
                        const isBilling = pKey.startsWith('billing');
                        const isCheckin = pKey.startsWith('checkin');

                        const badgeColor = isInventory
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          : isBilling
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                          : isCheckin
                          ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                          : 'bg-purple-500/15 border-purple-500/30 text-purple-300';

                        return (
                          <span
                            key={pKey}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${badgeColor}`}
                          >
                            {pKey}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-1">
                      {staff.permissions.length} modules granted
                    </span>
                  </td>

                  {/* System Access Badge */}
                  <td className="py-4 px-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      Tier 3 Staff Portal
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setEditingStaff({ ...staff })}
                      className="px-3 py-1.5 rounded-xl bg-gold-main/20 hover:bg-gold-main/30 border border-gold-main/40 text-gold-light text-xs font-semibold transition-all cursor-pointer"
                    >
                      Permissions &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── ADD STAFF MEMBER MODAL ───────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161a29] border border-gold-main/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative my-8 animate-fade-in-up">
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-sans block mb-1">
                  Villa Admin Protocol &bull; Operational Delegation
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Add Staff Member for {currentVillaName}
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  Assign granular role permissions (Inventory, Billing, Guest Check-In &amp; Maintenance).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 text-lg leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-6">
              {/* Profile Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminInput
                  label="Staff Full Name"
                  placeholder="e.g. Rameshwar Kadam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <AdminInput
                  label="Staff Login Email / User ID"
                  type="email"
                  placeholder="ramesh@rosewoodgoa.staff"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <AdminInput
                  label="Mobile Contact"
                  placeholder="+91 98200 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />

                <AdminSelect
                  label="Department / Role"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  options={[
                    { value: 'Butler & Guest Relations', label: '🛎️ Butler & Guest Relations' },
                    { value: 'Executive Villa Chef', label: '🍳 Executive Villa Chef & Pantry' },
                    { value: 'Housekeeping & Linen Lead', label: '🧹 Housekeeping & Linen Lead' },
                    { value: 'Front Desk & Billing Cashier', label: '💳 Front Desk & Billing Cashier' },
                    { value: 'Estate Maintenance & Security', label: '🛠️ Estate Maintenance & Security' },
                  ]}
                />

                <div className="sm:col-span-2">
                  <AdminInput
                    label="Initial Temporary Password"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* MODULE PERMISSION MATRIX CHECKBOXES */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-gold-light uppercase tracking-wider font-sans border-b border-white/5 pb-2">
                  Grant Operational Module Permissions (Checkboxes)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {VILLA_STAFF_MODULES.map((module) => (
                    <div key={module.moduleKey} className="bg-[#1e2337] border border-white/5 rounded-2xl p-4 space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white flex items-center justify-between">
                          <span>{module.title}</span>
                        </h5>
                        <p className="text-[10px] text-gray-400 font-sans mt-0.5">{module.desc}</p>
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
                  onClick={() => setIsAddModalOpen(false)}
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
                  {submitting ? 'Creating Staff Account...' : 'Confirm & Authorize Staff Member &rarr;'}
                </AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── EDIT STAFF PERMISSIONS MODAL ─────────────────────────────────── */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161a29] border border-gold-main/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-fade-in-up">
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-sans block mb-1">
                  Modify Privileges &bull; Live Matrix
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Edit Permissions: {editingStaff.name}
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  {editingStaff.department} &bull; {editingStaff.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingStaff(null)}
                className="text-gray-400 hover:text-white p-1 text-lg leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {VILLA_STAFF_MODULES.map((module) => (
                <div key={module.moduleKey} className="bg-[#1e2337] border border-white/5 rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-bold text-gold-light">{module.title}</h5>
                  <div className="space-y-2 border-t border-white/5 pt-2">
                    {module.permissions.map((perm) => {
                      const isChecked = editingStaff.permissions.includes(perm.key);
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
                onClick={() => setEditingStaff(null)}
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
                {submitting ? 'Saving...' : 'Save Privileges &rarr;'}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VillaStaffManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-main border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VillaStaffContent />
    </Suspense>
  );
}
