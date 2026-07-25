import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './components/Footer.jsx';
import Portfolio from './pages/Portfolio.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}