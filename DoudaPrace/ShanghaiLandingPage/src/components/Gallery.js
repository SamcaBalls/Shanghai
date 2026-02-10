import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GallerySection = styled.section`
  padding: 5rem 2rem;
  background: #2d1810;
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  aspect-ratio: 1;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${GalleryItem}:hover & {
    transform: scale(1.1);
  }
`;

const Lightbox = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(212, 175, 55, 0.8);
  border: none;
  color: black;
  font-size: 1.5rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #d4af37;
    transform: translateY(-50%) scale(1.1);
  }
  
  ${props => props.direction === 'prev' ? 'left: 2rem;' : 'right: 2rem;'}
`;

const galleryImages = [
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(galleryImages[newIndex]);
    } else {
      const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(galleryImages[newIndex]);
    }
  };

  return (
    <GallerySection id="gallery" className="scroll-animate">
      <Container>
        <SectionTitle>Galerie</SectionTitle>
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryItem 
              key={index} 
              onClick={() => openLightbox(index)}
              className="scroll-animate"
            >
              <GalleryImage src={image} alt={`Galerie ${index + 1}`} />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Container>

      <Lightbox isOpen={!!selectedImage} onClick={closeLightbox}>
        <CloseButton onClick={closeLightbox}>
          <FaTimes />
        </CloseButton>
        
        {selectedImage && (
          <>
            <NavButton direction="prev" onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}>
              <FaChevronLeft />
            </NavButton>
            <LightboxImage src={selectedImage} alt="Lightbox" />
            <NavButton direction="next" onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}>
              <FaChevronRight />
            </NavButton>
          </>
        )}
      </Lightbox>
    </GallerySection>
  );
};

export default Gallery;
