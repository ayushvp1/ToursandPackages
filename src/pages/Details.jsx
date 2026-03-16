import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Details = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative group">
          <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmNtcU8ujktdBtlm4SKSSJZvt86A9iAmosqoZn7ReYhON7dIIDDsYvN_KC7TbOpP7H1O3mkN29Olfm9UlOy9k3YOuAQJSeRCVSQePSFSerIYnrAeYz7DTa_yktmWstQlj13L5vlmMZOQGBP1M8cM2NJo_ZeJR20QfQ3xEY3GZtM5xh-d03YRfNfnfZom7qySXdCuAsjnH0F1fj9XmO9ME56m_3aULdpnjLoEqrHYqcXebr4vGp4KCb63XfG4R9KeBkoEaTrjOyfMc')" }}></div>
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button className="bg-white/90 backdrop-blur px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl hover:bg-white transition-all">
              <span className="material-symbols-outlined text-lg">grid_view</span> View all 24 photos
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <div className="flex-1 rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-cover bg-center transition-transform hover:scale-110 duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_UIZe9T9q07dTeZplQo-MIW2ccz_6Kazh-17l_iTxF2ZlFpw25d8T79j7cPRr0SpGZSqRnC9An2uqUBBHUQ6jOnFPS_lH_fA54bQjM5GV-wGqz2pXpXKIVED7zpoHxpMOJwK7cNalg-dPpv31DCrX3tjI-TJ2RueTLIGTtk1DbO9S-BVS7UY4Jlsr371696hIHgeMdqi_mKT-HDw5_UhNyeMJFERhDOGFocIZPoU29jNLBHNoegzkUXD0GRvPsNjy5HpFf06EF2s')" }}></div>
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-cover bg-center transition-transform hover:scale-110 duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqSfJ2EpAqEEujlJmJgr1XJVjfnDt24r2gDO6kthtYc1G4zbDMcLlu8sAZLCeCfo5dABPnkNSrrtGv6AUwPQRCAw3F_kiQRoPQvuErdQH8ZEDHRHumYN6gl8enHZukOOf2kT4tMNtO8guK6--cwtgUm9no8EhBpwqngS7qdOTPsqRqmOBqOGUSH7_yq9Wl-cWJ5SUCLzL7NhxPeKRKKKZM8jn9qFlgVIsxBAjq1VXYBCGXWsh9i1AECYZFXFhMgBepuLZyJHK_WLg')" }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-primary/20">TOP RATED</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg text-yellow-500 fill-1">star</span> 4.8 (124 Reviews)
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Ancient Wonders of Greece</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">location_on</span> Athens, Mykonos, Santorini
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { label: "Duration", val: "8 Days", icon: "calendar_today" },
              { label: "Group Size", val: "Max 12", icon: "group" },
              { label: "Availability", val: "High", icon: "check_circle", color: "text-green-600" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex-1 min-w-[180px] shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-base font-bold text-slate-900 dark:text-white ${stat.color || ''}`}>{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-slate-200 dark:border-slate-800 mb-10 sticky top-[64px] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur z-30 pt-4">
            <div className="flex gap-10">
              {['Overview', 'Itinerary', 'Inclusions', 'Reviews'].map((tab) => (
                <a key={tab} className={`pb-4 text-sm font-bold transition-all border-b-2 ${tab === 'Overview' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary'}`} href={`#${tab.toLowerCase()}`}>
                  {tab}
                </a>
              ))}
            </div>
          </div>

          <section className="mb-14 scroll-mt-32" id="overview">
            <h3 className="text-2xl font-bold mb-6">Tour Overview</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Journey through the cradle of Western civilization. Starting in the historic heart of Athens, you'll witness the grandeur of the Acropolis before setting sail for the sun-drenched Cyclades. Experience the cosmopolitan energy of Mykonos and the breathtaking caldera views of Santorini. This curated 8-day itinerary blends archeological discovery with island relaxation.
            </p>
          </section>

          <section className="mb-14 scroll-mt-32" id="itinerary">
            <h3 className="text-2xl font-bold mb-8">Day-by-Day Itinerary</h3>
            <div className="space-y-8">
              {[
                { day: "01", title: "Arrival in Athens", icon: "flight_land", desc: "Transfer to your boutique hotel in the Plaka district. Meet your guide for a welcome dinner overlooking the illuminated Parthenon." },
                { day: "02", title: "The Glory of the Acropolis", icon: "museum", desc: "Private guided tour of the Parthenon, Erechtheion, and the New Acropolis Museum. Afternoon at leisure for exploring the Monastiraki flea market." },
                { day: "03", title: "Athens to Mykonos", icon: "directions_boat", desc: "Board a high-speed ferry to Mykonos. Evening walk through the labyrinthine streets of Chora and sunset cocktails at Little Venice." }
              ].map((item, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black z-10 shadow-lg ring-4 ring-background-light dark:ring-background-dark">
                    {item.day}
                  </div>
                  {i < 2 && <div className="absolute left-4 top-8 bottom-[-32px] w-px bg-slate-200 dark:bg-slate-800"></div>}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h4 className="text-lg font-bold flex items-center justify-between mb-4">
                      {item.title}
                      <span className="material-symbols-outlined text-slate-400 text-xl">{item.icon}</span>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:relative">
          <div className="lg:sticky lg:top-32">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">$1,299</span>
                    <span className="text-slate-500 text-sm font-medium">/ person</span>
                  </div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-black">
                  SAVE $200
                </div>
              </div>
              
              <div className="space-y-5 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Travel Date</label>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                    <span className="text-sm font-bold italic text-slate-700 dark:text-slate-200">Oct 12 - Oct 20, 2024</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Guests</label>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                    <span className="text-sm font-bold italic text-slate-700 dark:text-slate-200">2 Adults</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link to="/booking" className="w-full flex items-center justify-center bg-primary hover:bg-primary/95 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
                  Book This Tour
                </Link>
                <button className="w-full border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold py-4 rounded-2xl transition-all">
                  Request Enquiry
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm text-green-500">verified</span>
                Free cancellation up to 30 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Details
