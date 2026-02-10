import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent'};
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #d4af37;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <Nav isScrolled={isScrolled}>
      <NavContainer>
        <Logo>Shangai</Logo>
        <MenuToggle onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
        <NavLinks isOpen={isOpen}>
          <li><NavLink href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Domů</NavLink></li>
          <li><NavLink href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>O nás</NavLink></li>
          <li><NavLink href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Galerie</NavLink></li>
          <li><NavLink href="#hours" onClick={(e) => { e.preventDefault(); scrollToSection('hours'); }}>Otevírací doba</NavLink></li>
          <li><NavLink href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Kontakt</NavLink></li>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
