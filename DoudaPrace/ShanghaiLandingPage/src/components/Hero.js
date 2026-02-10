import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;
  animation: fadeInUp 1s ease-out;
`;

const RestaurantName = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #d4af37;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Slogan = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #d4af37, #b8941f);
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    background: linear-gradient(135deg, #e6c44a, #d4af37);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const Hero = () => {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="hero">
      <HeroContent>
        <RestaurantName>Shangai</RestaurantName>
        <Slogan>Autentická čínská kuchyně v srdci Ústí nad Labem</Slogan>
        <CTAButton onClick={() => window.open('tel:+420721888918')}>
          Zavolejte nám: 721 888 918
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
