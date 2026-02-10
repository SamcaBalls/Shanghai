import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  background: #000;
  color: white;
  padding: 3rem 2rem 1rem;
  border-top: 2px solid rgba(212, 175, 55, 0.3);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #d4af37;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  color: #e0e0e0;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  color: #e0e0e0;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  padding-top: 2rem;
  text-align: center;
  color: #e0e0e0;
`;

const Copyright = styled.p`
  margin-bottom: 0.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>Restaurace Shangai</FooterTitle>
            <FooterText>
              Autentická čínská kuchyně v srdci Ústí nad Labem. 
              Přinášíme Vám skutečnou chuť Asie s více než 15letou tradicí.
            </FooterText>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Rychlé odkazy</FooterTitle>
            <FooterLink href="#about">O nás</FooterLink>
            <FooterLink href="#gallery">Galerie</FooterLink>
            <FooterLink href="#hours">Otevírací doba</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Kontakt</FooterTitle>
            <FooterText>
              Velká hradební 26/78<br />
              400 01 Ústí nad Labem-město<br />
              +420 721 888 918<br />
              info@shangai-usti.cz
            </FooterText>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {currentYear} Restaurace Shangai. Všechna práva vyhrazena.
          </Copyright>
          <FooterLinks>
            <FooterLink href="#privacy">Zásady ochrany osobních údajů</FooterLink>
            <FooterLink href="#terms">Obchodní podmínky</FooterLink>
          </FooterLinks>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;
