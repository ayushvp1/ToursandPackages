import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const listingPackages = [
  {
    id: 1,
    title: "Parisian Nights & French Riviera",
    duration: "7 Days, 6 Nights",
    price: "$1,299",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ikP7H7R29AR7SzxZYuankjpzZahn5pvm1jpDrTluTHweWoCkBoTddjD1R7Q1VbuXlIU-LEO6WnbPehOmBfGo2m9i-72iRmlT9zxuGoUod1Upi0w5byrM4_aEiWFSRuQC5A2pFFwWTTckOx07DzFneJrWTmI41h-3cJjWGSKBlsDnxPjqpRHEolIPf1HC18kT4GdwMsxTtvd8Jh_bZwwQjtb2ogU4pYpZjJ9kOZKLA3yVZFQtOowrcqFtCGH6eQMyI8qdA9fpJ8w"
  },
  {
    id: 2,
    title: "Imperial Japan Discovery",
    duration: "10 Days, 9 Nights",
    price: "$2,450",
    rating: 4.8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgjOMr4vhOSly9nDsGl5ZzjPhrYWb5J_TdxnvOeyuzLrdUdAiK8U7a_yZPmdA0jnBYKcqPATiUw3EYrSEsPWAL4pRJoQCuCAes1BwlK_OUrNR2Jz5BOUY2Pn3UtIZw3b4-WEjtckEU3-vJODZYSaRDR02kzViMkePePzZ2eaZPyv3zi1dd2LnsVXgLRCz23hV6653dU4L8LoV0_V1UVc5zORopeYdYP3IRlttHU91O-ZsGB8VPamtV6xImKlViu8PP3lsGDTlJrGQ"
  },
  {
    id: 3,
    title: "Santorini & Mykonos Getaway",
    duration: "5 Days, 4 Nights",
    price: "$1,899",
    rating: 5.0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcj1zN8hcRZX3Ckjdwphvc9WaQdd-qtq-yFhfDeyJeTNTyKm73dm8-7omlih25RPuJGyCkwReU4mwGjydHFcytvnBeqCA37MlQXmSETPedM1eNJ9R-3E0uaN2ktriFAON3pYvF11MDN69TyFdGu5tDfiiVTAYkn95QveJ56050S8zlMPtP7rHFvbtvhJVEyd2mcStkXpNwVlEJohQBko8zx8ZCKP0PNn4SfA7OJdhW0ZvjYX2F_XsrBDASn5ANuqFfgwI8VHk7pgo"
  },
  {
    id: 4,
    title: "Moroccan Desert Expedition",
    duration: "8 Days, 7 Nights",
    price: "$950",
    rating: 4.7,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZSfGAZc50vk7_mWwyqDJYFmEI9v4xW9elwnT1oBE1-1yVn2DtohY73Zj7ZFZJGsRO0SPiSfjG_3Rthz360Td7U8Q-8Q59q6yMyF9awtsgoORMdoJvyEyeBxNtlyrP3V0Ey4cyT6uq5b090bUvEwgcRhPXcc5r8yRIVKIwzPXrYPed2KFE7pvqnrHIomNj16WGZzHldUFlgK0u903lmeE2dS3UOXFkpxaKRQGY7jceFWsDKHE120r8T-JloBEKuQoV1KvFpTyJ3xQ"
  },
  {
    id: 5,
    title: "Mediterranean Luxury Cruise",
    duration: "14 Days, 13 Nights",
    price: "$3,200",
    rating: 4.9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5WmLJIX63M82DfkjvC1msUXDhgAfQ1bSRgSdAZU-JZ6i4H2V_evXr7YYhqPonGRwQUZoU9v2yz8tndfPRdYT_UNk5d13tI3uO4rkONtf8weD8TX9iB4OO-zxUdW9Kd1akOOtVI_xvl2zFvemD2mcf1siknoqayrdQ3Y0xYcJxujSEeGIJurJXLkLWxcoLUAdGcHDljw217xzMbieu_5-fGRgrmOvYfi0Ze9BqBRbM-DNTe_f1qPSouxzk3GlAMjx32l6kQXYZl0E"
  },
  {
    id: 6,
    title: "Classic European Capitals",
    duration: "12 Days, 11 Nights",
    price: "$2,100",
    rating: 4.6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxSSS8ylXbk1kB5RQXYTFkGd6AEq0qJAgOLmg7dN3bsmgX5WfaPOjUt7jvtTPGgr4ojbOgSL_tfTzCqw0VTtOHlPNHzSCvYRrIL3TThY8FuJ4hHbibrWqHBQn6gg7TWrW_Ib1mRYdewf3dq3V7FhBBWgENd7gx9BrEqDoAwnfmCHC_0xufIykMoTjYtf3P1Yc18gUg5c2DhBMv7mKMzs0fyp276-Njk7e0RUneUq_1dFz2I_tPOEvKT5HVdYND1gE7KbmzikrEzw0"
  }
]

const Listing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col lg:flex-row px-6 lg:px-20 py-8 gap-8"
    >
      <aside className="w-full lg:w-72 flex flex-col gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">filter_list</span>
            Filters
          </h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Destinations</h4>
              <div className="space-y-2">
                {['Europe', 'Asia', 'North America', 'South America'].map((dest, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" defaultChecked={dest === 'Europe'} />
                    <span className="text-sm group-hover:text-primary transition-colors">{dest}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Duration</h4>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium">3-5 Days</button>
                <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-primary/10">1 Week</button>
                <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-primary/10">2 Weeks+</button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Price Range</h4>
              <div className="relative w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-6">
                <div className="absolute left-0 right-1/4 h-full bg-primary rounded-full"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md cursor-pointer"></div>
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md cursor-pointer"></div>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span>$500</span>
                <span>$5000</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 flex items-center justify-center rounded-lg h-11 bg-primary text-white text-sm font-bold tracking-wide hover:bg-opacity-90 transition-all">
            Apply Filters
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold">142 Packages Found</h2>
            <p className="text-sm text-slate-500">Based on your current filters</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Sort by:</span>
            <select className="text-sm rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-3 py-2 pr-10 min-w-[140px] border">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {listingPackages.map((pkg) => (
            <div key={pkg.id} className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <img className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" src={pkg.image} alt={pkg.title} />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs fill-1">star</span> {pkg.rating}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors mb-2">{pkg.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>{pkg.duration}</span>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">From</p>
                    <p className="text-lg font-bold text-primary">{pkg.price}</p>
                  </div>
                  <Link to="/details" className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center py-10">
          <nav className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-primary transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-primary transition-colors">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-primary transition-colors">12</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
    </motion.div>
  )
}

export default Listing
