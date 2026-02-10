import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Shanghai</h1>
        <p>Autentická čínská kuchyně s tradicí a čerstvými surovinami v srdci Ústí nad Labem</p>
        <div className="hero-buttons">
          <button className="cta-button" onClick={() => document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' })}>
            Rezervovat stůl
          </button>
          <a 
            href="https://www.foodora.cz/restaurant/hb09/cinska-restaurace-shanghai-hb09?utm_campaign=google_reserve_place_order_action_CH-SEO_" 
            className="order-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Objednat online
          </a>
        </div>
      </div>
    </section>
  )
}
