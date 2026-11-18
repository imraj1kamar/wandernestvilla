'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

/**
 * AdminFileUpload Component
 * Upload Receipt Image/PDF dropzone with document preview matching the screenshot.
 */
export default function AdminFileUpload({
  label = 'Upload Receipt Image/PDF',
  onChange,
  className = '',
}) {
  const [fileName, setFileName] = useState('receipt_sample.pdf');
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setFilePreview(url);
      } else {
        setFilePreview(null);
      }
      if (onChange) onChange(file);
    }
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-400 font-sans tracking-wide">
          {label}
        </label>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-full border-2 border-dashed border-gold-main/30 rounded-xl p-3 bg-[#1a1f33]/40 hover:bg-[#1a1f33]/80 transition-all cursor-pointer flex items-center justify-center min-h-[95px] group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Thumbnail preview document as seen in the screenshot */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-16 bg-white rounded shadow-md border border-gray-300 p-1 flex flex-col justify-between overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
            {filePreview ? (
              <div className="relative w-full h-full">
                <Image src={filePreview} alt="Receipt preview" fill className="object-cover" />
              </div>
            ) : (
              <>
                <div className="space-y-0.5">
                  <div className="h-1 bg-gray-800 rounded w-2/3" />
                  <div className="h-0.5 bg-gray-400 rounded w-full" />
                  <div className="h-0.5 bg-gray-300 rounded w-4/5" />
                  <div className="h-0.5 bg-gray-300 rounded w-full" />
                </div>
                <div className="border-t border-gray-200 pt-0.5 space-y-0.5">
                  <div className="h-0.5 bg-gray-300 rounded w-3/4" />
                  <div className="h-1 bg-gold-dark rounded w-1/2 ml-auto" />
                </div>
              </>
            )}
          </div>

          <div className="text-left">
            <p className="text-xs font-medium text-white/90 group-hover:text-gold-light transition-colors line-clamp-1">
              {fileName || 'Click or drag receipt file'}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-light">
              PDF, PNG, JPG up to 10MB
            </p>
            <span className="inline-block mt-1 text-[10px] text-gold-main font-semibold underline underline-offset-2">
              Browse Document
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
