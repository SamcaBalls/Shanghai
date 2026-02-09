import './Contact.css'

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-container">
        <h2>Kontakt</h2>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">🏪</div>
              <div className="info-content">
                <h3>Restaurace Shanghai</h3>
                <p>Autentická čínská kuchyně v Ústí nad Labem</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Adresa</h3>
                <p>
                  Velká hradební 26/78<br />
                  400 01 Ústí nad Labem-město
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>Telefon</h3>
                <p>
                  <a href="tel:721888918">721 888 918</a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h3>E-mail</h3>
                <p>
                  <a href="mailto:info@shanghai.cz">info@shanghai.cz</a>
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🌐</div>
              <div className="info-content">
                <h3>Sledujte nás</h3>
                <div className="social-links">
                  <a href="#" title="Facebook" aria-label="Facebook">f</a>
                  <a href="#" title="Instagram" aria-label="Instagram">📷</a>
                  <a href="#" title="Google" aria-label="Google">G</a>
                </div>
              </div>
            </div>
          </div>

          <div className="map-container">
            <div style={{ textAlign: 'center' }}>
              <p>🗺️</p>
              <p>Mapa bude dostupná zde</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Integrujte Google Maps dle potřeby</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
