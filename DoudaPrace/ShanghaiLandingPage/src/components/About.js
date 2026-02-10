import React from 'react';
import styled from 'styled-components';
import { FaUtensils, FaClock, FaHeart } from 'react-icons/fa';

const AboutSection = styled.section`
  padding: 5rem 2rem;
  background: #1a1a1a;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d4af37;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutText = styled.div`
  scroll-animate;
`;

const AboutDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #e0e0e0;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Feature = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(212, 175, 55, 0.2);
    border-color: #d4af37;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #d4af37;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #d4af37;
`;

const FeatureDescription = styled.p`
  color: #e0e0e0;
  font-size: 0.9rem;
`;

const About = () => {
  return (
    <AboutSection id="about" className="scroll-animate">
      <Container>
        <SectionTitle>O restauraci</SectionTitle>
        <AboutContent>
          <AboutText>
            <AboutDescription>
              Restaurace Shangai Vás přivítá v srdci Ústí nad Labem s autentickou čínskou kuchyní, 
              která kombinuje tradiční recepty s moderním přístupem. Naše jídla připravujeme 
              pouze z čerstvých surovin dovezených přímo z Číny, abychom zajistili tu nejlepší 
              chuťovou podobu.
            </AboutDescription>
            <AboutDescription>
              S více než 15letou tradicí se pyšníme tím, že přinášíme skutečnou čínskou atmosféru 
              do České republiky. Naše profesionální kuchyňský tým vedou zkušení kuchaři, 
              kteří se naučili své umění přímo v Číně.
            </AboutDescription>
          </AboutText>
        </AboutContent>
        
        <Features>
          <Feature className="scroll-animate">
            <FeatureIcon>
              <FaUtensils />
            </FeatureIcon>
            <FeatureTitle>Autentické jídlo</FeatureTitle>
            <FeatureDescription>
              Tradiční čínské recepty a originální suroviny přímo z Číny
            </FeatureDescription>
          </Feature>
          
          <Feature className="scroll-animate">
            <FeatureIcon>
              <FaClock />
            </FeatureIcon>
            <FeatureTitle>Rychlé servírování</FeatureTitle>
            <FeatureDescription>
              Profesionální servis a rychlé podávání čerstvých jídel
            </FeatureDescription>
          </Feature>
          
          <Feature className="scroll-animate">
            <FeatureIcon>
              <FaHeart />
            </FeatureIcon>
            <FeatureTitle>Příjemné prostředí</FeatureTitle>
            <FeatureDescription>
              Autentická čínská atmosféra a moderní interiér
            </FeatureDescription>
          </Feature>
        </Features>
      </Container>
    </AboutSection>
  );
};

export default About;
