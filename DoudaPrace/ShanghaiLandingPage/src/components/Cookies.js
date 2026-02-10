import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const CookiesContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1.5rem;
  z-index: 3000;
  transform: translateY(${props => (props.isVisible ? '0' : '100%')});
  transition: transform 0.3s ease;
  border-top: 2px solid rgba(212, 175, 55, 0.3);
`;

const CookiesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const CookiesText = styled.div`
  flex: 1;
  line-height: 1.6;
`;

const CookiesTitle = styled.h3`
  color: #d4af37;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const CookiesDescription = styled.p`
  color: #e0e0e0;
  margin-bottom: 0.5rem;
`;

const CookiesLink = styled.a`
  color: #d4af37;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CookiesButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const CookiesButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #d4af37, #b8941f);
    color: #000;
    
    &:hover {
      background: linear-gradient(135deg, #e6c44a, #d4af37);
      transform: translateY(-2px);
    }
  ` : `
    background: transparent;
    color: #e0e0e0;
    border: 1px solid rgba(212, 175, 55, 0.3);
    
    &:hover {
      background: rgba(212, 175, 55, 0.1);
      border-color: #d4af37;
      color: #d4af37;
    }
  `}
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #e0e0e0;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const Cookies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedDate', new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookiesRejected', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <CookiesContainer isVisible={isVisible}>
      <CloseButton onClick={rejectCookies}>
        <FaTimes />
      </CloseButton>
      
      <CookiesContent>
        <CookiesText>
          <CookiesTitle>Používání cookies</CookiesTitle>
          <CookiesDescription>
            Tyto webové stránky používají cookies k poskytování služeb, personalizaci reklam a analýze návštěvnosti. 
            Informace o tom, jak používáte naše stránky, sdílíme se svými partnery pro sociální média, 
            reklamu a analýzu.
          </CookiesDescription>
          <CookiesDescription>
            Více informací najdete v našich{' '}
            <CookiesLink href="#privacy">Zásadách ochrany osobních údajů</CookiesLink>.
          </CookiesDescription>
        </CookiesText>
        
        <CookiesButtons>
          <CookiesButton onClick={rejectCookies}>
            Odmítnout
          </CookiesButton>
          <CookiesButton primary onClick={acceptCookies}>
            Přijmout vše
          </CookiesButton>
        </CookiesButtons>
      </CookiesContent>
    </CookiesContainer>
  );
};

export default Cookies;
