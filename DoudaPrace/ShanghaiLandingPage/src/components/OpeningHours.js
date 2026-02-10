import React from 'react';
import styled from 'styled-components';
import { FaClock } from 'react-icons/fa';

const HoursSection = styled.section`
  padding: 5rem 2rem;
  background: #1a1a1a;
  color: white;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d4af37;
`;

const HoursContainer = styled.div`
  background: rgba(212, 175, 55, 0.1);
  border-radius: 15px;
  padding: 2rem;
  border: 2px solid rgba(212, 175, 55, 0.3);
`;

const HoursHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const HoursIcon = styled.div`
  font-size: 2rem;
  color: #d4af37;
`;

const HoursTitle = styled.h3`
  font-size: 1.5rem;
  color: #d4af37;
`;

const HoursList = styled.div`
  display: grid;
  gap: 1rem;
`;

const DayItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: translateX(5px);
  }
`;

const DayName = styled.span`
  font-weight: bold;
  color: #e0e0e0;
  font-size: 1.1rem;
`;

const DayHours = styled.span`
  color: #d4af37;
  font-weight: 500;
  font-size: 1.1rem;
`;

const Note = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #e0e0e0;
  font-style: italic;
`;

const openingHours = [
  { day: 'Pondělí', hours: '11:00 – 21:30' },
  { day: 'Úterý', hours: '11:00 – 21:30' },
  { day: 'Středa', hours: '11:00 – 21:30' },
  { day: 'Čtvrtek', hours: '11:00 – 21:30' },
  { day: 'Pátek', hours: '11:00 – 21:30' },
  { day: 'Sobota', hours: '11:00 – 21:30' },
  { day: 'Neděle', hours: '11:00 – 15:00' }
];

const OpeningHours = () => {
  return (
    <HoursSection id="hours" className="scroll-animate">
      <Container>
        <SectionTitle>Otevírací doba</SectionTitle>
        <HoursContainer>
          <HoursHeader>
            <HoursIcon>
              <FaClock />
            </HoursIcon>
            <HoursTitle>Otevírací hodiny</HoursTitle>
          </HoursHeader>
          
          <HoursList>
            {openingHours.map((item, index) => (
              <DayItem key={index} className="scroll-animate">
                <DayName>{item.day}</DayName>
                <DayHours>{item.hours}</DayHours>
              </DayItem>
            ))}
          </HoursList>
          
          <Note>
            V neděli máme zkrácenou otevírací dobu. Těšíme se na Vaši návštěvu!
          </Note>
        </HoursContainer>
      </Container>
    </HoursSection>
  );
};

export default OpeningHours;
