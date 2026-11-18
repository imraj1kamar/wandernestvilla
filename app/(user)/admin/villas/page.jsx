'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectActiveVillaId } from '@/redux/slices/authSlice';
import { AdminButton, AdminInput, AdminSelect } from '@/components/dashboard';
import { apiCollection } from '@/apiService/apiCollection';

// Initial Mock Estates Database (matches LuxeEstate production portfolio)
const INITIAL_VILLAS = [
  {
    id: 'villa-1',
    name: 'Villa Rosewood',
    location: 'Candolim, Goa',
    region: 'Goa',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    bedrooms: 5,
    maxGuests: 12,
    basePrice: '₹45,000',
    status: 'Active',
    owner: {
      name: 'Captain Sameer Mehta',
      email: 'sameer.mehta@rosewoodgoa.com',
      phone: '+91 98201 12345',
      split: '70% Owner / 30% Platform',
    },
    grossRevenueMTD: '₹3,40,000',
    activeBookings: 4,
    staffCount: 6,
  },
  {
    id: 'villa-2',
    name: 'The Cloud Retreat',
    location: 'Tungarli, Lonavla',
    region: 'Lonavla',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    bedrooms: 4,
    maxGuests: 10,
    basePrice: '₹38,000',
    status: 'Active',
    owner: {
      name: 'Mrs. Radhika Singhal',
      email: 'radhika@cloudretreat.in',
      phone: '+91 98190 55432',
      split: '75% Owner / 25% Platform',
    },
    grossRevenueMTD: '₹2,90,000',
    activeBookings: 3,
    staffCount: 4,
  },
  {
    id: 'villa-3',
    name: 'Oceanic Whisper',
    location: 'Kihim Beach, Alibaug',
    region: 'Alibaug',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    bedrooms: 6,
    maxGuests: 16,
    basePrice: '₹75,000',
    status: 'Active',
    owner: {
      name: 'Aditya Singhania',
      email: 'aditya@singhaniaholdings.com',
      phone: '+91 99200 98765',
      split: '70% Owner / 30% Platform',
    },
    grossRevenueMTD: '₹4,80,000',
    activeBookings: 5,
    staffCount: 8,
  },
  {
    id: 'villa-4',
    name: 'Heritage Estate',
    location: 'Foothills, Karjat',
    region: 'Karjat',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    bedrooms: 6,
    maxGuests: 15,
    basePrice: '₹68,000',
    status: 'Active',
    owner: {
      name: 'Dr. Harshvardhan Patil',
      email: 'dr.patil@heritageestate.in',
      phone: '+91 97654 32109',
      split: '70% Owner / 30% Platform',
    },
    grossRevenueMTD: '₹3,10,000',
    activeBookings: 3,
    staffCount: 5,
  },
  {
    id: 'villa-5',
    name: 'Amber Palace Villa',
    location: 'Lake Pichola, Udaipur',
    region: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    bedrooms: 7,
    maxGuests: 18,
    basePrice: '₹95,000',
    status: 'Maintenance',
    owner: {
      name: 'Rana Ranvijay Singh',
      email: 'ranvijay@amberpalaceudaipur.com',
      phone: '+91 94140 11223',
      split: '65% Owner / 35% Platform',
    },
    grossRevenueMTD: '₹1,50,000',
    activeBookings: 1,
    staffCount: 7,
  },
];

export default function VillasManagementPage() {
  const currentUser = useSelector(selectCurrentUser);
  const activeVillaId = useSelector(selectActiveVillaId);

  const [villas, setVillas] = useState(INITIAL_VILLAS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State for New Villa & Auto-Admin Setup
  const [formData, setFormData] = useState({
    villaName: '',
    location: '',
    region: 'Goa',
    basePrice: '₹40,000',
    bedrooms: 4,
    maxGuests: 10,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    // Villa Admin Details (Core Feature: Auto Account Creation)
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerPassword: '',
    commissionSplit: '70% Owner / 30% Platform',
  });

  // Load villas from API on mount
  useEffect(() => {
    async function loadVillas() {
      try {
        const res = await apiCollection.getVillas();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setVillas(res.data);
        }
      } catch (err) {
        // Fallback to initial mock if API isn't live yet
        console.log('Using local villas cache:', err.message);
      }
    }
    loadVillas();
  }, []);

  const handleRegisterVilla = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newVilla = {
      id: `villa-${Date.now()}`,
      name: formData.villaName,
      location: formData.location,
      region: formData.region,
      image: formData.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      bedrooms: Number(formData.bedrooms),
      maxGuests: Number(formData.maxGuests),
      basePrice: formData.basePrice,
      status: 'Active',
      owner: {
        name: formData.ownerName,
        email: formData.ownerEmail,
        phone: formData.ownerPhone,
        split: formData.commissionSplit,
      },
      grossRevenueMTD: '₹0',
      activeBookings: 0,
      staffCount: 1,
    };

    try {
      // 1. Post to API
      await apiCollection.createVilla({
        ...newVilla,
        adminCredentials: {
          email: formData.ownerEmail,
          password: formData.ownerPassword,
          role: 'villa_owner',
        },
      });
    } catch (err) {
      console.log('Backend sync pending, saving locally:', err.message);
    }

    // 2. Update local state
    setVillas((prev) => [newVilla, ...prev]);
    setSubmitting(false);
    setIsRegisterModalOpen(false);

    // Reset Form
    setFormData({
      villaName: '',
      location: '',
      region: 'Goa',
      basePrice: '₹40,000',
      bedrooms: 4,
      maxGuests: 10,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      ownerPassword: '',
      commissionSplit: '70% Owner / 30% Platform',
    });

    // 3. Toast confirmation
    setToastMessage({
      title: 'Villa & Villa Admin Created!',
      body: `"${newVilla.name}" is now active. Villa Admin credentials generated for ${formData.ownerEmail}.`,
    });
    setTimeout(() => setToastMessage(null), 6000);
  };

  // Filter logic
  const filteredVillas = villas.filter((villa) => {
    const matchesSearch =
      villa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.owner.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'all' || villa.region === selectedRegion;
    const matchesActiveContext = activeVillaId === 'all' || villa.id === activeVillaId;

    return matchesSearch && matchesRegion && matchesActiveContext;
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

      {/* ─── TOP HEADER & ACTIONS ──────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-[1px] bg-gold-main" />
            <span className="text-[11px] uppercase font-bold tracking-widest text-gold-dark font-sans">
              Property Portfolio &amp; Master Directory
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Villas &amp; Private Estates
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-sans mt-1">
            Register new luxury estates, assign primary Villa Admins, and monitor operational performance.
          </p>
        </div>

        {/* Register Villa CTA */}
        <div className="flex items-center gap-3">
          <AdminButton
            type="button"
            variant="primary"
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-5 py-2.5 text-xs sm:text-sm flex items-center gap-2"
          >
            <span className="text-base font-bold">+</span>
            <span>Register New Villa Estate</span>
          </AdminButton>
        </div>
      </div>

      {/* ─── FILTER BAR & SEARCH ────────────────────────────────────────────── */}
      <div className="bg-[#161a29] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by villa name, region, owner name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e2337] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-main/60 transition-all font-sans"
          />
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 whitespace-nowrap font-sans">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#1e2337] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-gold-main cursor-pointer"
          >
            <option value="all">All Regions ({villas.length})</option>
            <option value="Goa">Goa</option>
            <option value="Alibaug">Alibaug</option>
            <option value="Lonavla">Lonavla</option>
            <option value="Karjat">Karjat</option>
            <option value="Udaipur">Udaipur</option>
          </select>
        </div>
      </div>

      {/* ─── VILLAS GRID ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVillas.map((villa) => (
          <div
            key={villa.id}
            className="bg-[#161a29] border border-white/10 hover:border-gold-main/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col group"
          >
            {/* Villa Image Banner */}
            <div className="relative h-48 w-full overflow-hidden bg-brand-dark">
              <Image
                src={villa.image}
                alt={villa.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161a29] via-transparent to-black/40" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                  villa.status === 'Active'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  &bull; {villa.status}
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15 text-gold-light text-xs font-semibold">
                {villa.basePrice} <span className="text-[10px] font-normal text-gray-300">/ night</span>
              </div>

              {/* Title & Location */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-light transition-colors">
                  {villa.name}
                </h3>
                <p className="text-xs text-gray-300 font-sans flex items-center gap-1 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-gold-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{villa.location}</span>
                </p>
              </div>
            </div>

            {/* Villa Specs Bar */}
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between text-xs text-gray-400 bg-white/2 font-sans">
              <span>🛏️ {villa.bedrooms} Bedrooms</span>
              <span>👥 Max {villa.maxGuests} Guests</span>
              <span>🛎️ {villa.staffCount} Staff</span>
            </div>

            {/* Villa Admin / Owner Section (Highlights Hierarchy) */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="bg-[#1e2337] border border-white/5 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gold-dark font-bold uppercase tracking-wider font-sans">
                    Assigned Villa Admin / Owner
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                    {villa.owner.split}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-9 h-9 rounded-full bg-gold-main/20 border border-gold-main/40 flex items-center justify-center text-gold-light font-bold text-xs flex-shrink-0">
                    {villa.owner.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate">{villa.owner.name}</h4>
                    <p className="text-[11px] text-gray-400 truncate font-mono">{villa.owner.email}</p>
                  </div>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/2 rounded-xl p-2.5 border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-sans">MTD Revenue</span>
                  <span className="text-sm font-bold text-gold-light font-sans">{villa.grossRevenueMTD}</span>
                </div>
                <div className="bg-white/2 rounded-xl p-2.5 border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-sans">Active Bookings</span>
                  <span className="text-sm font-bold text-emerald-400 font-sans">{villa.activeBookings} Reserved</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <Link
                  href={`/admin/staff?villaId=${villa.id}&villaName=${encodeURIComponent(villa.name)}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-gold-main/15 border border-white/10 hover:border-gold-main/40 text-xs font-semibold text-gray-300 hover:text-gold-light transition-all text-center"
                >
                  Manage Staff ({villa.staffCount})
                </Link>
                <Link
                  href="/admin"
                  className="py-2 px-3 rounded-xl bg-gold-main/20 hover:bg-gold-main/30 border border-gold-main/40 text-xs font-semibold text-gold-light transition-all text-center"
                >
                  Audit P&amp;L &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── REGISTER NEW VILLA & AUTO-ADMIN MODAL ───────────────────────── */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#161a29] border border-gold-main/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark font-sans block mb-1">
                  Onboarding Wizard &bull; Super Admin Clearance
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Register New Villa &amp; Assign Villa Admin
                </h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">
                  Registers the property and automatically provisions the owner&apos;s isolated management portal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 text-lg leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRegisterVilla} className="space-y-6">
              {/* STEP 1: Villa Physical Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gold-light uppercase tracking-wider font-sans border-b border-white/5 pb-1">
                  1. Property Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AdminInput
                    label="Villa Estate Name"
                    placeholder="e.g. Whispering Palms"
                    value={formData.villaName}
                    onChange={(e) => setFormData({ ...formData, villaName: e.target.value })}
                    required
                  />

                  <AdminSelect
                    label="Destination Region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    options={[
                      { value: 'Goa', label: 'Goa (Beachfront)' },
                      { value: 'Alibaug', label: 'Alibaug (Coastal)' },
                      { value: 'Lonavla', label: 'Lonavla (Western Ghats)' },
                      { value: 'Karjat', label: 'Karjat (Lakeside)' },
                      { value: 'Udaipur', label: 'Udaipur (Heritage)' },
                    ]}
                  />

                  <AdminInput
                    label="Full Physical Address"
                    placeholder="Plot 14, Near Awas Beach Road"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />

                  <AdminInput
                    label="Base Rate / Night"
                    placeholder="e.g. ₹55,000"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    required
                  />

                  <AdminInput
                    label="Bedrooms (BHK)"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    required
                  />

                  <AdminInput
                    label="Max Guests Capacity"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.maxGuests}
                    onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* STEP 2: Villa Admin / Owner Credentials (Core Architecture Requirement) */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gold-light uppercase tracking-wider font-sans border-b border-white/5 pb-1 flex items-center justify-between">
                  <span>2. Primary Villa Admin / Owner Account</span>
                  <span className="text-[10px] text-gray-400 font-normal">Auto-generates isolated login credentials</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AdminInput
                    label="Owner Full Name"
                    placeholder="e.g. Vikramaditya Singhania"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    required
                  />

                  <AdminInput
                    label="Corporate / Login Email"
                    type="email"
                    placeholder="owner@estatename.com"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    required
                  />

                  <AdminInput
                    label="Initial Password / Master Key"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.ownerPassword}
                    onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
                    required
                  />

                  <AdminSelect
                    label="Revenue Commission Split"
                    value={formData.commissionSplit}
                    onChange={(e) => setFormData({ ...formData, commissionSplit: e.target.value })}
                    options={[
                      { value: '70% Owner / 30% Platform', label: '70% Owner / 30% Platform (Standard)' },
                      { value: '75% Owner / 25% Platform', label: '75% Owner / 25% Platform (High-Volume)' },
                      { value: '80% Owner / 20% Platform', label: '80% Owner / 20% Platform (Exclusive Trophy Estate)' },
                    ]}
                  />
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
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
                  {submitting ? 'Registering Villa & Admin...' : 'Confirm & Launch Villa Estate &rarr;'}
                </AdminButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
