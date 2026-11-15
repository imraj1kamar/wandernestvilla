import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button'; // Tumhara banaya hua base button

export default function ProductCard({ title, description, imageSrc, link, buttonText = "EXPLORE DETAILS" }) {
    return (
        <div className="product-glass-card h-100 d-flex flex-column rounded-4 p-4 transition-all duration-300">
            {/* Product Image */}
            <div className="card-image-wrapper position-relative w-100 mb-4" style={{ height: '200px' }}>
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="product-image transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="card-content d-flex flex-column flex-grow-1">
                <h3 className="h5 fw-bold text-dark mb-2">{title}</h3>
                <p className="text-muted small mb-4 flex-grow-1 line-clamp-3">
                    {description}
                </p>

                {/* Action Button */}
                <div className="mt-auto">
                    <Button href={link} variant="outline" className="w-100 justify-content-center">
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}