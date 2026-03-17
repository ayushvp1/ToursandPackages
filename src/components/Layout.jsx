import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="text-primary">
                <span className="material-symbols-outlined text-4xl">terrain</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-dark font-serif lowercase italic">tours<span className="text-secondary">&</span>packages</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-10">
              <Link to="/listing" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Tours</Link>
              <a className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors" href="#">About</a>
              <a className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors" href="#">Contact</a>
              <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full text-xs font-black tracking-widest transition-all shadow-lg shadow-primary/20">SIGN IN</button>
            </nav>
            <div className="md:hidden">
              <span className="material-symbols-outlined cursor-pointer">menu</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">terrain</span>
              <h1 className="text-xl font-bold tracking-tight">Tours and Packages</h1>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Curating world-class travel experiences for over 15 years. Join us in exploring the hidden wonders of the globe.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-xl">camera</span>
              </a>
            </div>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-slate-200">Quick Links</h6>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/listing" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><a className="hover:text-white transition-colors" href="#">Special Offers</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Travel Guides</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Affiliate Program</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-slate-200">Support</h6>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Booking Policy</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-slate-200">Newsletter</h6>
            <p className="text-slate-400 text-sm mb-4">Get travel tips and exclusive discounts directly to your inbox.</p>
            <div className="flex flex-col gap-2">
              <input className="bg-slate-800 border-none rounded-lg focus:ring-primary text-white text-sm py-3 px-4" placeholder="Your email address" type="email"/>
              <button className="bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg text-sm transition-all shadow-lg shadow-primary/20">Subscribe Now</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">© 2024 Tours and Packages. All rights reserved.</p>
          <div className="flex gap-8">
            <img className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSQ5q-9ovsVxN6OAh22KQ4uCvhrhBSozoiieuQroN7m9oz6qM3I-ZwbXFSz1ZqcrG02IaT_HcEfqUCZ1PxUl3SkQt-qThptoKANt2irCQoVvX15K0DljbKRiD6viPofmW-uck5exBZwAzwiM76XybHim3Yr-XOA9V_gSEbeOgl2joqJwNUkhK__wKohbcEYyt2n6slH2t-6G7AmqNoWb2yM2Cqt0zbHonnprePzo4vc4abIt4eQontMpoFln0IjIcmaglRLP20M70" alt="Visa" />
            <img className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtSLTt-FoWvC7e_TBJnr5mnqGAZ3ukOxXVBpy5WSIfiAk0CmLWsJm2ObNRWyOBlZJQIjHrCmjYpbblExqDtpUse_PqT7MWfDDrMhcUITN1DJlHwGq9--6dwV5wsuVijK_HlnAn68-wN54DDm-pv-fBRRfP5TK4PCZcm87VKPdrL2WOi-EfHqrMugHst8GTN04cL3ul9TJAO6Kq9qLSikOx-o6dmcnNzq1mGqfW4SwIRrJHLRnP8cUlhOiVUZICpykf_rv9JZGU3_s" alt="Mastercard" />
            <img className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp2xseeU_W5X_wpyLyxWnzVs2EMautePBnHwBN72w6vVHkhfdxLtdOpkyXJNqQkDrdy4ErYP5SSGxFEfX5_pQidZZkc4ENlQVGQm8NB5F0OL61rjzLAXaXBrL4uGq-f24y3DQpj8jvMG7hZZWH02Xn5El3XNhv1iRKJFotCQN4d5t6O07ZHZyVZqb7_d8W4a1vBBbc97CMqDTvhTsN3Oul21FE9uMZpdoTd_hL6ietUwZe89P-NZyjqQSvRX2nc0CTEN5DZmdlQ5U" alt="Paypal" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
