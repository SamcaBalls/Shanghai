import { useState } from 'react'
import './Reviews.css'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: ''
  })
  const [showForm, setShowForm] = useState(false)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    if (!newReview.name.trim() || !newReview.text.trim()) {
      alert('Prosím vyplňte jméno a text recenze')
      return
    }

    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('cs-CZ', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      text: newReview.text,
      avatar: newReview.name.charAt(0).toUpperCase() === 'J' ? '👩' : '�'
    }

    setReviews([review, ...reviews])
    setNewReview({ name: '', rating: 5, text: '' })
    setShowForm(false)
    alert('Děkujeme za vaši recenzi!')
  }

  const renderStars = (rating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`star ${i < rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => setNewReview({...newReview, rating: i + 1}) : undefined}
      >
        ★
      </span>
    ))
  }

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <div className="section-header">
          <h2>Co říkají naši hosté</h2>
          <p>Podívejte se na recenze od našich spokojených zákazníků</p>
        </div>

        <div className="reviews-grid">
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <p>Zatím žádné recenze. Buďte první, kdo ohodnotí naši restauraci!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">{review.avatar}</div>
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="review-date">{review.date}</div>
                </div>
                
                <div className="review-content">
                  <p>{review.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="reviews-summary">
          <div className="summary-card">
            <div className="summary-rating">
              <div className="big-rating">4.4</div>
              <div className="stars">
                {renderStars(4)}
                <span className="partial-star">★</span>
              </div>
              <div className="total-reviews">založeno na 529 recenzích</div>
            </div>
          </div>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">5 hvězdiček</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '65%' }}></div>
              </div>
              <span className="stat-count">344</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">4 hvězdičky</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '20%' }}></div>
              </div>
              <span className="stat-count">106</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">3 hvězdičky</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '8%' }}></div>
              </div>
              <span className="stat-count">42</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">2 hvězdičky</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '4%' }}></div>
              </div>
              <span className="stat-count">21</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">1 hvězdička</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: '3%' }}></div>
              </div>
              <span className="stat-count">16</span>
            </div>
          </div>
        </div>

        <div className="reviews-cta">
          <h3>Zkušenosti s naší restaurací?</h3>
          <p>Přidejte svou recenzi a pomozte ostatním hostům</p>
          <div className="cta-buttons">
            <button className="write-review-btn" onClick={() => setShowForm(true)}>
              Napsat recenzi
            </button>
            <a href="https://www.google.com/search?q=%C4%8D%C3%ADnsk%C3%A1+restaurace+shanghai+%C3%BAst%C3%AD+nad+labem" 
               className="google-reviews-btn" 
               target="_blank" 
               rel="noopener noreferrer">
              Všechny recenze na Google
            </a>
          </div>
        </div>

        {showForm && (
          <div className="review-form-overlay" onClick={() => setShowForm(false)}>
            <div className="review-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="review-form-header">
                <h3>Napsat recenzi</h3>
                <button className="close-form-btn" onClick={() => setShowForm(false)}>✕</button>
              </div>
              
              <form onSubmit={handleSubmitReview} className="review-form">
                <div className="form-group">
                  <label htmlFor="reviewer-name">Vaše jméno *</label>
                  <input
                    type="text"
                    id="reviewer-name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    placeholder="Jméno a příjmení"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hodnocení *</label>
                  <div className="rating-input">
                    {renderStars(newReview.rating, true)}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="review-text">Text recenze *</label>
                  <textarea
                    id="review-text"
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    placeholder="Podělte se o své zážitky z naší restaurace..."
                    rows="5"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                    Zrušit
                  </button>
                  <button type="submit" className="submit-btn">
                    Odeslat recenzi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
