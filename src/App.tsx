import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Founders from './components/Founders';
import OttPlatform from './components/OttPlatform';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import People from './components/People';

function App() {
  const [page, setPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') setPage('admin');
      else if (hash === 'people') setPage('people');
      else setPage('home');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Listen for localStorage changes to update Founders section instantly
  React.useEffect(() => {
    const handleStorage = () => {
      setPage(page => page); // force re-render
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {page === 'admin' ? (
          isAdmin ? (
            <AdminDashboard onLogout={() => setIsAdmin(false)} />
          ) : (
            <AdminLogin onLogin={() => setIsAdmin(true)} />
          )
        ) : page === 'people' ? (
          <People />
        ) : (
          <>
            <Hero />
            <About />
            <Services />
            <Founders />
            <OttPlatform />
            <Contact />
          </>
        )}
      </main>
    </div>
  );
}

export default App;