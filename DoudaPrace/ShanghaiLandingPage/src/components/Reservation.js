import React, { useState } from 'react';
import styled from 'styled-components';

const ReservationSection = styled.section`
  padding: 5rem 2rem;
  background: #2d1810;
  color: white;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d4af37;
`;

const ReservationForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  border: 2px solid rgba(212, 175, 55, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #d4af37;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #2d1810;
    color: white;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4caf50;
  color: #4caf50;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    guests: '2',
    note: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Jméno je povinné';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Telefon nebo email je povinný';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact) && !/^[+]?[\d\s-]+$/.test(formData.contact)) {
      newErrors.contact = 'Zadejte platný email nebo telefonní číslo';
    }
    
    if (!formData.date) {
      newErrors.date = 'Datum je povinné';
    }
    
    if (!formData.time) {
      newErrors.time = 'Čas je povinný';
    }
    
    if (!formData.guests || formData.guests < 1 || formData.guests > 20) {
      newErrors.guests = 'Počet osob musí být mezi 1 a 20';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          contact: '',
          date: '',
          time: '',
          guests: '2',
          note: ''
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <ReservationSection id="reservation" className="scroll-animate">
        <Container>
          <SuccessMessage>
            <h3>Děkujeme za rezervaci!</h3>
            <p>Vaše rezervace byla úspěšně odeslána. Budeme Vás kontaktovat pro potvrzení.</p>
          </SuccessMessage>
        </Container>
      </ReservationSection>
    );
  }

  return (
    <ReservationSection id="reservation" className="scroll-animate">
      <Container>
        <SectionTitle>Rezervace stolu</SectionTitle>
        <ReservationForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Jméno *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Zadejte své jméno"
              required
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact">Telefon / Email *</Label>
            <Input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Zadejte telefon nebo email"
              required
            />
            {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date">Datum *</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="time">Čas *</Label>
            <Input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              min="11:00"
              max="21:30"
              required
            />
            {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="guests">Počet osob *</Label>
            <Select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'osoba' : i < 4 ? 'osoby' : 'osob'}
                </option>
              ))}
            </Select>
            {errors.guests && <ErrorMessage>{errors.guests}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="note">Poznámka (volitelné)</Label>
            <TextArea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Speciální přání, alergie, atd."
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Odesílám...' : 'Rezervovat stůl'}
          </SubmitButton>
        </ReservationForm>
      </Container>
    </ReservationSection>
  );
};

export default Reservation;
