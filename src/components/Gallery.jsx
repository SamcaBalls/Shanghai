import { useState } from 'react'
import './Gallery.css'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryImages = [
    { id: 1, title: 'Interiér', emoji: '🏮', category: 'restaurant' },
    { id: 2, title: 'Chutné jídlo', emoji: '🍜', category: 'food' },
    { id: 3, title: 'Atmosféra', emoji: '✨', category: 'ambiance' },
    { id: 4, title: 'Speciality', emoji: '🥡', category: 'food' },
    { id: 5, title: 'Prostředí', emoji: '🪴', category: 'restaurant' },
    { id: 6, title: 'Pokrmy', emoji: '🍲', category: 'food' },
  ]

  return (
    <section id="gallery">
      <div className="gallery-container">
        <h2>Galerie</h2>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`gallery-item ${image.category}`}
              onClick={() => setSelectedImage(image)}
            >
              <span>{image.emoji}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="modal active"
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <h3>{selectedImage.title}</h3>
            <div>{selectedImage.emoji}</div>
          </div>
        </div>
      )}
    </section>
  )
}
