export default function SearchSection() {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-[95%] max-w-5xl px-2">
      <div className="bg-[#14120e] rounded-xl p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0 shadow-2xl border border-[#d4af37]/50">

        {/* Section 1: Destinations */}
        <div className="flex-[1.5] px-5 py-2 md:border-r border-[#d4af37]/20">
          <label className="block text-[#d4af37] text-sm font-medium mb-1">
            Destinations
          </label>
          <input
            type="text"
            placeholder="Goa, Alibaug, Udaipur"
            className="w-full bg-transparent text-white text-base placeholder-white/60 outline-none"
          />
        </div>

        {/* Section 2: Dates */}
        <div className="flex-1 px-5 py-2 md:border-r border-[#d4af37]/20 cursor-pointer group">
          <label className="block text-[#d4af37] text-sm font-medium mb-1">
            Dates
          </label>
          <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
            <span className="text-base flex-1">Add dates</span>
          </div>
        </div>

        {/* Section 3: Guests */}
        <div className="flex-1 px-5 py-2 cursor-pointer group">
          <label className="block text-[#d4af37] text-sm font-medium mb-1">
            Guests
          </label>
          <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
            <span className="text-base flex-1">Add guests</span>
          </div>
        </div>

        {/* Search Button */}
        <div className="px-2 md:px-3 mt-3 md:mt-0">
          <button className="w-full md:w-auto bg-gradient-to-r from-[#e6c875] via-[#d4af37] to-[#aa8623] text-black px-10 py-3.5 rounded-lg text-lg font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
            Search
          </button>
        </div>

      </div>
    </div>
  );
}