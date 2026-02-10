import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

const ContactSection = styled.section`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(212, 175, 55, 0.2);
    border-color: #d4af37;
  }
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: #d4af37;
  min-width: 30px;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  color: #e0e0e0;
  margin-bottom: 0.3rem;
`;

const ContactValue = styled.div`
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(212, 175, 55, 0.3);
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  color: #d4af37;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #d4af37;
    color: #000;
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  return (
    <ContactSection id="contact" className="scroll-animate">
      <Container>
        <SectionTitle>Kontakt</SectionTitle>
        
        <ContactGrid>
          <ContactInfo>
            <ContactItem className="scroll-animate">
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Adresa</ContactLabel>
                <ContactValue>
                  Velká hradební 26/78<br />
                  400 01 Ústí nad Labem-město
                </ContactValue>
              </ContactText>
            </ContactItem>

            <ContactItem className="scroll-animate">
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Telefon</ContactLabel>
                <ContactValue>
                  <ContactLink href="tel:+420721888918">
                    +420 721 888 918
                  </ContactLink>
                </ContactValue>
              </ContactText>
            </ContactItem>

            <ContactItem className="scroll-animate">
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>
                  <ContactLink href="mailto:info@shangai-usti.cz">
                    info@shangai-usti.cz
                  </ContactLink>
                </ContactValue>
              </ContactText>
            </ContactItem>

            <SocialLinks>
              <SocialLink 
                href="https://www.instagram.com/explore/locations/411822069220830/cinska-restaurace-shanghai-usti-nad-labem/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <MapContainer className="scroll-animate">
            <MapFrame
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.449896718!2d14.0441423!3d50.6617361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470984ac36cec613%3A0xd2078a95431f6f6!2s%C4%8C%C3%ADnsk%C3%A1%20restaurace%20Shanghai!5e0!3m2!1scs!2scz!4v1675923456789"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa restaurace Shangai - Velká hradební 26, Ústí nad Labem"
            />
          </MapContainer>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
