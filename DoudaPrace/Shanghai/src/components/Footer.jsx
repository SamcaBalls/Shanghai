import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🥢 Shanghai</h3>
          <p>Autentická čínská kuchyně s tradicí a čerstvými surovinami. Vítejte u nás v Ústí nad Labem.</p>
        </div>

        <div className="footer-section">
          <h3>Rychlé odkazy</h3>
          <ul>
            <li><a href="#gallery">Galerie</a></li>
            <li><a href="#hours">Otevírací doba</a></li>
            <li><a href="#reservation">Rezervace</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Kontakt</h3>
          <p>
            📞 <a href="tel:721888918">721 888 918</a><br />
            ✉️ <a href="mailto:info@shanghai.cz">info@shanghai.cz</a><br />
            📍 Velká hradební 26/78, 400 01 Ústí nad Labem-městobní 26/78, 400 01 Ústí nad Labem-město
          </p>
        </div>

        <div className="footer-section">
          <h3>Otevírací doba</h3>
          <p>
            Neděle: 11:00 – 15:00<br />
            Pondělí–Sobota:<br />
            11:00 – 21:30
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Shanghai - Čínská restaurace. Všechna práva vyhrazena.</p>
      </div>
    </footer>
  )
}
