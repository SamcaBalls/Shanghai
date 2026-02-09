import './ReservationCard.css'

export default function ReservationCard({ reservation, onMove, status }) {
  const getNextStatus = () => {
    if (status === 'upcoming') return 'in-progress'
    if (status === 'in-progress') return 'completed'
    return 'upcoming'
  }

  const handleMove = (newStatus) => {
    onMove(reservation.id, newStatus)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T' + reservation.time)
    return date.toLocaleDateString('cs-CZ', { month: 'short', day: 'numeric' })
  }

  // Zkontroluj, zda je rezervace do 20 minut nebo v průběhu
  const isUpcomingSoon = () => {
    if (status !== 'upcoming' && status !== 'in-progress') return false
    
    const now = new Date()
    const reservationDateTime = new Date(reservation.date + 'T' + reservation.time)
    const timeDiff = reservationDateTime - now
    const minutesDiff = timeDiff / (1000 * 60)
    
    // Zvýrazni, pokud je do 20 minut a ještě neprobíhá, nebo pokud právě probíhá
    return (minutesDiff <= 20 && minutesDiff > 0) || status === 'in-progress'
  }

  const cardClassName = `reservation-card ${isUpcomingSoon() ? 'upcoming-soon' : ''}`

  return (
    <div className={cardClassName}>
      <div className="card-header">
        <h4>{reservation.name}</h4>
        <span className="guest-count">👥 {reservation.guests}</span>
      </div>

      <div className="card-body">
        <p className="time">
          📅 {formatDate(reservation.date)} | ⏰ {reservation.time}
        </p>
        <p className="phone">
          📞 {reservation.phone}
        </p>
        <p className="email">
          ✉️ {reservation.email}
        </p>
        {reservation.note && (
          <p className="note">
            💬 {reservation.note}
          </p>
        )}
      </div>

      <div className="card-actions">
        {status !== 'upcoming' && (
          <button
            className="btn-action btn-prev"
            onClick={() => {
              if (status === 'in-progress') {
                handleMove('upcoming')
              } else if (status === 'completed') {
                handleMove('in-progress')
              }
            }}
            title="Přesunout zpět"
          >
            ← Zpět
          </button>
        )}

        {status !== 'completed' && (
          <button
            className="btn-action btn-next"
            onClick={() => handleMove(getNextStatus())}
            title="Přesunout dopředu"
          >
            Dál →
          </button>
        )}

        <button
          className="btn-action btn-delete"
          onClick={() => {
            if (confirm('Skutečně chcete smazat tuto rezervaci?')) {
              onMove(reservation.id, 'delete')
            }
          }}
          title="Smazat"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
