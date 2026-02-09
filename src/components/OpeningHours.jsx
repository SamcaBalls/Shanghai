import './OpeningHours.css'

export default function OpeningHours() {
  const currentDay = new Date().getDay()
  const dayNames = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

  const hours = [
    { day: 'Neděle', times: '11:00 – 15:00' },
    { day: 'Pondělí', times: '11:00 – 21:30' },
    { day: 'Úterý', times: '11:00 – 21:30' },
    { day: 'Středa', times: '11:00 – 21:30' },
    { day: 'Čtvrtek', times: '11:00 – 21:30' },
    { day: 'Pátek', times: '11:00 – 21:30' },
    { day: 'Sobota', times: '11:00 – 21:30' },
  ]

  return (
    <section id="hours">
      <div className="hours-container">
        <h2>Otevírací doba</h2>
        <div className="hours-grid">
          <div className="hours-card">
            {hours.map((item, index) => (
              <div key={index} className={`day-item ${index === currentDay ? 'today' : ''}`}>
                <span className="day-name">{item.day}</span>
                <span className="day-hours">{item.times}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
