import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Booking = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-4 py-20"
    >
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-12">
            <Link to="/details" className="text-sm font-bold text-primary flex items-center gap-2 mb-6 group">
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
              Back to Package
            </Link>
            <h1 className="text-4xl font-black mb-4">Complete Your Booking</h1>
            <p className="text-slate-500">Please provide your details to finalize your extraordinary adventure.</p>
          </div>

          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">First Name</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Last Name</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Doe" type="text" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" type="email" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                Travel Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Number of Travelers</label>
                  <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>1 Traveler</option>
                    <option selected>2 Travelers</option>
                    <option>3 Travelers</option>
                    <option>4+ Travelers</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Package Option</label>
                  <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>Standard Package</option>
                    <option>Premium Experience</option>
                    <option>Luxury All-Inclusive</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                Payment Information
              </h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold">Credit Card</div>
                  <div className="text-slate-400 text-xs font-bold hover:text-slate-600 cursor-pointer">PayPal</div>
                  <div className="text-slate-400 text-xs font-bold hover:text-slate-600 cursor-pointer">Bank Transfer</div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Card Number</label>
                    <div className="relative">
                      <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="0000 0000 0000 0000" type="text" />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">credit_card</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Expiry Date</label>
                      <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="MM/YY" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">CVV</label>
                      <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="123" type="password" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-primary/20 text-lg">
              Confirm & Pay $2,598
            </button>
          </form>
        </div>

        <div className="w-full md:w-80">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl sticky top-32">
            <h4 className="text-lg font-bold mb-6">Booking Summary</h4>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Package</span>
                <span className="font-bold">Ancient Wonders...</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Guests</span>
                <span className="font-bold">2 Adults</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="font-bold">8 Days</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-bold">$2,598</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 font-medium">Tax & Fees</span>
                  <span className="font-bold text-green-600">Included</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-lg font-black italic">Total</span>
                  <span className="text-2xl font-black text-primary">$2,598</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-2xl flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed uppercase tracking-wider">Secure Payment Guaranteed. Your data is protected by industry-standard encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Booking
