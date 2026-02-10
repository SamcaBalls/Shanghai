import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import OpeningHours from './components/OpeningHours';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Cookies from './components/Cookies';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
`;

const Main = styled.main`
  position: relative;
`;

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <AppContainer>
      <Navigation isScrolled={isScrolled} />
      <Main>
        <Hero />
        <About />
        <Gallery />
        <OpeningHours />
        <Contact />
        <Footer />
      </Main>
      <Cookies />
    </AppContainer>
  );
}

export default App;
