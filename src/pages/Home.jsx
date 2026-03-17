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
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvJyVEjiWsCjGyQCJoJOKZ5tLzaPDpFYPLCB7Vv-0Zm6pH84GI-PrpwnAjhQLox3yG8MK_LwqPKzkq2_gMRMpsTeRQaRBn_QEosONchZTiD3-MKQR-otLe2_rhjF4GS8PyruZOog_y9sDV7kRc57zOyme_Y-VL5YlOnbVjMVdaXtjKHLVMPVhEm8NVmV7SDIZczpUG5Ppbk5wefQndrfl87GyRvAd3BOBY-MY6fDcU003Dd412hTANhSObZgXg2pso3-FhRokK6r0')",
            backgroundAttachment: "fixed"
          }}
        ></motion.div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-24">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] font-serif"
          >
            Your Day, <br/>
            <span className="text-secondary italic font-serif">Perfectly Mapped.</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto font-medium"
          >
            Arriving by train? Tell us your window — we'll craft a beautifully time-mapped day and tell you exactly when to head back.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button className="group relative overflow-hidden bg-primary text-white px-8 py-4 rounded-full text-base font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              <span className="material-symbols-outlined fill-1">location_on</span>
              <span className="relative z-10">Detect My Location & Begin</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <p className="text-white/30 text-[9px] mt-3 font-medium tracking-[0.2em] uppercase">Location used once. Never stored.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto -mt-20 relative z-20 px-4">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-4 gap-6 border border-white/20"
        >
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
            <button className="w-full bg-primary text-white h-11 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">search</span> SEARCH
            </button>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-32">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <motion.h3 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              className="text-4xl font-black mb-4 font-serif italic lowercase text-dark"
            >
              featured experiences
            </motion.h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Hand-picked destinations for your next escape.</p>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
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
            <motion.div 
              key={idx} 
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800"
            >
              <div className="relative h-72 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" src={item.image} alt={item.title}/>
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-primary shadow-lg">{item.days} Days</div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm tracking-wide">VIEW EXPEDITION</span>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                <div className="flex items-center gap-1 text-yellow-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(item.rating) ? 'fill-1' : ''}`}>star</span>
                  ))}
                  <span className="text-xs text-slate-500 ml-2 font-bold uppercase tracking-widest">({item.reviews} reviews)</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Starting at</span>
                    <span className="text-3xl font-black text-primary leading-none">{item.price}</span>
                  </div>
                  <Link to="/details" className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <TravelWidget />

      <section className="bg-slate-50 dark:bg-slate-900/50 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-[12rem] font-black text-slate-100 dark:text-slate-800/10 pointer-events-none select-none"
          >
            STORY
          </motion.div>
          <div className="relative z-10 text-center">
            <h3 className="text-4xl font-black mb-6">What Our Explorers Say</h3>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 }
            }
          }}
          className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10"
        >
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
            <motion.div 
              key={idx} 
              variants={{
                hidden: { y: 30, opacity: 0, scale: 0.95 },
                visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.02 }}
              className="group bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 relative"
            >
              <span className="material-symbols-outlined text-primary/10 text-8xl absolute top-6 right-8 group-hover:text-primary/20 transition-colors duration-500">format_quote</span>
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="relative">
                  <img className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-50 dark:ring-slate-900 shadow-lg" src={item.img} alt={item.name}/>
                  <div className="absolute -bottom-1 -right-1 bg-primary w-6 h-6 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] text-white">verified</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-black text-lg">{item.name}</h5>
                  <p className="text-xs text-primary font-bold tracking-tighter uppercase">{item.tour}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 italic text-lg leading-relaxed relative z-10">"{item.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}

export default Home
