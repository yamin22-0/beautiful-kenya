import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home      from './pages/Home'
import Discover  from './pages/Discover'
import Culture from './pages/Culture'
import Coastline from './pages/Coastal'
import Wildlife from './pages/Wildlife'


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/discover"   element={<Discover />} />
         <Route path="/culture"   element={<Culture />} />
         <Route path="/coastline"   element={<Coastline />} />
         <Route path="/wildlife"   element={<Wildlife />} />
      </Routes>
      <Footer />
    </>
  )
}