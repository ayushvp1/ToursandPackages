import { useEffect } from 'react'

const TravelWidget = () => {
  useEffect(() => {
    // Only add the script if it doesn't already exist
    if (!document.getElementById('tiw-script')) {
      const isProd = window.location.hostname !== 'localhost'
      // Use absolute origin in prod to avoid any path resolution issues
      const apiOrigin = isProd ? window.location.origin : 'http://localhost:3001'
      
      const script = document.createElement('script')
      script.id = 'tiw-script'
      // Script is now in the main 'public' folder for Vercel/Vite to serve natively
      script.src = '/itinerary-widget.js?v=2.0.2'
      script.dataset.apiBase = apiOrigin
      script.dataset.target = '#itinerary-widget'
      script.async = true
      
      script.onload = () => {
        if (window.TravelItineraryWidget) {
          window.TravelItineraryWidget.mount()
        }
      }
      
      document.body.appendChild(script)
    } else {
      // If script exists, just remount if needed
      if (window.TravelItineraryWidget) {
        window.TravelItineraryWidget.mount()
      }
    }

    return () => {
      // Cleanup if necessary, though the widget creates its own styles/content
    }
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-20" id="itinerary-planner">
      <div className="mb-12 text-center">
        <h3 className="text-4xl font-black mb-4 font-serif italic lowercase text-primary">ai trip planner</h3>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Arriving by train? Use our AI-powered travel widget to map out your perfect day. 
          Simply detect your location or enter your destination to get started.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div id="itinerary-widget"></div>
      </div>
    </section>
  )
}

export default TravelWidget
