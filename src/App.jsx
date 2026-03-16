import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Details from './pages/Details'
import Booking from './pages/Booking'
import Layout from './components/Layout'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/details" element={<Details />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
