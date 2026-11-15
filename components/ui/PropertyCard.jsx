import Image from 'next/image';
import Link from 'next/link';

export default function PropertyCard({ image, title, rating, specs, price, exploreLink }) {
    return (
        <div className="property-card flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
            {/* Villa Image */}
            <div className="relative h-56 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <div className="text-yellow-500 text-sm">
                        {'★'.repeat(Math.floor(rating))}
                    </div>
                </div>

                <p className="text-sm text-gray-600 truncate">{specs}</p>

                {/* Price & Action Button */}
                <div className="flex justify-between items-center mt-2 pt-2">
                    <div className="font-bold text-gray-900">
                        {price}<span className="text-sm font-normal text-gray-600">/night</span>
                    </div>
                    <Link
                        href={exploreLink}
                        className="text-gold-dark font-semibold text-sm hover:underline decoration-2 underline-offset-4"
                    >
                        Explore Villa
                    </Link>
                </div>
            </div>
        </div>
    );
}