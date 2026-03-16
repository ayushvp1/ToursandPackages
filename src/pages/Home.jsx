import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TravelWidget from '../components/TravelWidget'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvJyVEjiWsCjGyQCJoJOKZ5tLzaPDpFYPLCB7Vv-0Zm6pH84GI-PrpwnAjhQLox3yG8MK_LwqPKzkq2_gMRMpsTeRQaRBn_QEosONchZTiD3-MKQR-otLe2_rhjF4GS8PyruZOog_y9sDV7kRc57zOyme_Y-VL5YlOnbVjMVdaXtjKHLVMPVhEm8NVmV7SDIZczpUG5Ppbk5wefQndrfl87GyRvAd3BOBY-MY6fDcU003Dd412hTANhSObZgXg2pso3-FhRokK6r0')",
            backgroundAttachment: "fixed"
          }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Your Gateway to Extraordinary Adventures</h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">Experience the world like never before with our professionally curated travel packages designed for the bold.</p>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl transition-all">Explore Tours</button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto -mt-12 relative z-20 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Destination</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
              <input className="w-full pl-10 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg focus:ring-primary focus:border-primary border p-2" placeholder="Where to?" type="text"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">calendar_today</span>
              <input className="w-full pl-10 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg focus:ring-primary focus:border-primary border p-2" type="date"/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Price Range</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">payments</span>
              <select className="w-full pl-10 border-slate-200 dark:border-slate-700 dark:bg-slate-800 rounded-lg focus:ring-primary focus:border-primary appearance-none border p-2">
                <option>All Prices</option>
                <option>$0 - $1,000</option>
                <option>$1,000 - $3,000</option>
                <option>$3,000+</option>
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary text-white h-11 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined">search</span> Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-2">Featured Experiences</h3>
            <p className="text-slate-600 dark:text-slate-400">Hand-picked destinations for your next escape.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Swiss Alps Discovery",
              price: "$2,499",
              days: "8",
              rating: "4.5",
              reviews: "120",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl4tWjPhc7rmp0uOJ7UgRiK74yeVLJokKKASi-zjJkL26sPkDskRGVWMYn-KqXsbMsIHqtv7d5Xwjdef9eF3qnYI5PDBiHg8KeN-LJQ6-p4ul8ZPxzZOubRJHqUPe9o1IrAUUFAFU5LknSsfoTVBiRB-JFRdtcJgduz2fIFDJbRVlQX5G25-v2xlmslPu8_raK-sQpzPah7MLvxRt0829pIC7LizfTa7YQKCDWW1ZZvtwYDydPRgi_5nMLUAIBhm1UJcJi_yt414s"
            },
            {
              title: "Bali Wellness Escape",
              price: "$1,850",
              days: "12",
              rating: "5.0",
              reviews: "85",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpxz9Lc7JszjSsAJWYtNmWOH9TTcj0Cl1qx88wWR4EvOR4ly7s6qDlSQ3Kg93AgMPTyjYtx94gzpRC7jIxxfyXzwjEksOyIAYPHCk1q1LkLJ0iEyKHok8rzVf69fo7mSpsaruXSMjUtHe8rwfiTBuxKIpFFh3IRs6AjhPxgXD-S2f7EzYVb85jmB_yzweicqhXRZJoURyzf4fMqjZlykSSM6LDcjFdzzOfNvX6zMKT3T7M0ryeiXaoB-xCqurcIZlCEdcitB9CByE"
            },
            {
              title: "Kenyan Safari Expedition",
              price: "$3,200",
              days: "10",
              rating: "5.0",
              reviews: "154",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrCnpr7VJC1qM5mk21z4d8tMd_x5TGuqH93w_aturOToIIIeHM1Ys63TMEIxpN38IC3W9HyXCAZT8zHXZtuRlTHaRFQ6H8gZUOIx-sp0mYxEk9sYrEG6y-PYav0Mb9gNPLoGj-FeP_DrBKCURArn8x7bF3xSWbvwXpx8o_GGk_9iuHdlSiuY5QbdvFzZkUvqZIRKxkGrRq29hkrrtVRcVPprFPcR-D5VdevEX7TIHVyazU6HAYKm8zu7n8UBPnutExPXlJxgxTf9c"
            }
          ].map((item, idx) => (
            <div key={idx} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.title}/>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">{item.days} Days</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(item.rating) ? 'fill-1' : ''}`}>star</span>
                  ))}
                  <span className="text-xs text-slate-500 ml-1">({item.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span className="text-2xl font-black text-primary">{item.price}</span>
                  <Link to="/details" className="text-sm font-bold underline hover:no-underline text-secondary">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TravelWidget />

      <section className="bg-primary/5 dark:bg-primary/10 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">What Our Explorers Say</h3>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Jenkins",
              tour: "Swiss Alps Discovery, 2023",
              text: "The attention to detail was incredible. Everything from the boutique hotels to the local guides was top-notch. Truly an extraordinary experience.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuApPvrkZ9agajm0gREmdaALnTTso6HSHWjvvtoXnIlbiCOoPbtoC2W3zBIfab0_n3iT0jfKpDYuKVlpzoEbRcLS0rNnXu2dg3FvXJr28GJbEdBmwnT2HNv4iozKRHPIgTakNCYblDrZ26DQ7vW94ezokKKbvex2gfg3BvroJE-AxqfEZ_4Yz5ScKbhe_9cifRKVSANqDMMJ4cIfxu2xeCBrUMHEEG7bA-3rD_VjkhF3CTqT-ZiPja_vSgLNj_2qwX5J1VtUqSTXjb0"
            },
            {
              name: "Mark Thompson",
              tour: "Kenyan Safari, 2023",
              text: "I've traveled with many agencies, but AdventureGate stands out. They find the most unique spots away from the crowds. Worth every penny.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAws-PUaguydegvehoMvtF7hioESO8TmZDY81ny1PxMMh0M4H3VkpNlRHZ-_CXIhScXzaDK9EruqirQHMpHs0YNYcGsL_SplHZyLpQrXvrWS6T3qZtUkmH2BNls1xkOu5w6mZGiandYqlSbRb4T6wr7SobF1QUSSIW6v8OMIDeu4ZkOU02YouFCJq8vD330rQ5u4_pWyeunDPgUyXgTHMXGUF5YJv62U2i_zsZDufDthMLMa_rYuxtIVFyV24cRmi_smtwbnS6sd7M"
            },
            {
              name: "Elena Rodriguez",
              tour: "Bali Wellness, 2022",
              text: "The perfect balance of adventure and relaxation. The local knowledge their team has is what made the difference for my trip to Bali.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwaIVBDmN2OO2qww5S_0LJr-jyvSGrI_-MaKTgboUQIbt3NnPZ9BS4pIbofUp0lqynkA2p64uWbS2Vk4oonSh70mwAG5Qug5BtBqkfeVcvSuN47heI9gdp2yqqRklnKkmxlQHsPUf42Bd7RR4eA73Ar4M3S5dFeqm5tZI6-MTWWV-w8MkhrF895m7OEri6LEpNcRH9UHbwHV7IFO4cG3zwURyjflnV__oMXBFZveb-pbm_AwmFnrovwB3U6x23GKuGnkOGVoGjsI4"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 relative">
              <span className="material-symbols-outlined text-primary/20 text-6xl absolute top-4 right-6">format_quote</span>
              <div className="flex items-center gap-4 mb-6">
                <img className="w-14 h-14 rounded-full object-cover" src={item.img} alt={item.name}/>
                <div>
                  <h5 className="font-bold">{item.name}</h5>
                  <p className="text-xs text-slate-500">{item.tour}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 italic">"{item.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default Home
