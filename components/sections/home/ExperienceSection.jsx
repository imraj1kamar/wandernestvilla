const experiences = [
  {
    title: "Private\nChefs",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ),
  },
  {
    title: "Heated\nPools",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
        <path d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        <path d="M2 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        <path d="M2 7c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
      </svg>
    ),
  },
  {
    title: "Full\nEstate Staff",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Custom\nConcierge",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function ExperienceSection() {
  return (
    <section className="w-full bg-brand-light py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Title and Subtitle adapted to match the reference screenshot */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            The LUXEESTATE Experience
          </h2>
          <p className="text-[14px] text-gray-600 font-sans mt-0.5">
            highlights
          </p>
        </div>

        {/* 4-Column Grid for the items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {experiences.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 md:gap-4"
            >
              {/* Light beige square container for the icon */}
              <div className="w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-[14px] bg-brand-cream-warm border border-border-luxury/50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              
              {/* Text rendering with whitespace-pre-line to support the \n break */}
              <span className="font-sans text-[14px] md:text-[15px] font-medium text-foreground leading-[1.25] whitespace-pre-line">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}