import { useState, useEffect, useRef } from 'react'



import './Reservation.css'







export default function Reservation({ onReservationSubmit }) {



  // Získat dnešní datum ve formátu YYYY-MM-DD



  const getTodayDate = () => {



    const today = new Date()



    const year = today.getFullYear()



    const month = String(today.getMonth() + 1).padStart(2, '0')



    const day = String(today.getDate()).padStart(2, '0')



    return `${year}-${month}-${day}`



  }







  // Získat aktuální čas ve formátu HH:MM



  const getCurrentTime = () => {



    const now = new Date()



    const hours = String(now.getHours()).padStart(2, '0')



    const minutes = String(now.getMinutes()).padStart(2, '0')



    return `${hours}:${minutes}`



  }







  const [formData, setFormData] = useState({



    name: '',



    email: '',



    phone: '',



    date: '',



    time: '',



    guests: '2',



    note: '',



  })







  const [submitted, setSubmitted] = useState(false)



  const [error, setError] = useState('')



  const timeInputRef = useRef(null)







  // Validace, zda je datum a čas v budoucnosti



  const isDateTimeInPast = (date, time) => {



    if (!date || !time) return false



    



    const selectedDateTime = new Date(`${date}T${time}`)



    const now = new Date()



    



    return selectedDateTime <= now



  }







  // Aktualizovat min čas při změně data



  useEffect(() => {



    if (timeInputRef.current && formData.date) {



      if (formData.date === getTodayDate()) {



        // Pokud je vybrané dnešní datum, nastavit min čas na aktuální čas



        timeInputRef.current.setAttribute('min', getCurrentTime())



      } else {



        // Pro budoucí datumy není min čas potřeba



        timeInputRef.current.removeAttribute('min')



      }



    }



  }, [formData.date])







  const handleChange = (e) => {



    const { name, value } = e.target



    setFormData(prev => ({



      ...prev,



      [name]: value,



    }))



    setError('')



    



    // Validace při změně data nebo času



    if (name === 'date' || name === 'time') {



      const newDate = name === 'date' ? value : formData.date



      const newTime = name === 'time' ? value : formData.time



      



      if (newDate && newTime && isDateTimeInPast(newDate, newTime)) {



        if (newDate === getTodayDate()) {



          setError('Nelze rezervovat čas v minulosti. Prosím vyberte čas po ' + getCurrentTime() + '.')



        } else {



          setError('Nelze rezervovat čas v minulosti. Prosím vyberte budoucí datum a čas.')



        }



      }



    }



  }







  const handleSubmit = async (e) => {



    e.preventDefault()







    // Validation



    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {



      setError('Prosím vyplňte všechna povinná pole.')



      return



    }







    // Email validation



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/



    if (!emailRegex.test(formData.email)) {



      setError('Prosím zadejte platnou e-mailovou adresu.')



      return



    }







    // Validace, zda není datum a čas v minulosti



    if (isDateTimeInPast(formData.date, formData.time)) {



      if (formData.date === getTodayDate()) {



        setError('Nelze rezervovat čas v minulosti. Prosím vyberte čas po ' + getCurrentTime() + '.')



      } else {



        setError('Nelze rezervovat čas v minulosti. Prosím vyberte budoucí datum a čas.')



      }



      return



    }







    try {



      // Submit to parent component



      await onReservationSubmit(formData)



      



      // Reset form and show success message



      setSubmitted(true)



      setFormData({



        name: '',



        email: '',



        phone: '',



        date: '',



        time: '',



        guests: '2',



        note: '',



      })







      // Hide success message after 5 seconds



      setTimeout(() => setSubmitted(false), 5000)



    } catch (error) {



      console.error('Chyba při odesílání rezervace:', error)



      const message = error.message || 'Chyba při odesílání rezervace. Zkontrolujte připojení k serveru.'



      const suggestedTime = error.suggestedTime



      const freeSeats = error.freeSeats



      let fullMessage = message



      if (suggestedTime) {



        fullMessage = `${message} Zkuste rezervovat na ${suggestedTime} nebo později.`



      } else if (freeSeats !== undefined && freeSeats > 0) {



        fullMessage = `${message} Zkuste menší počet osob (max. ${freeSeats} volných míst na tento čas).`



      }



      setError(fullMessage)



    }



  }







  return (



    <section id="reservation">



      <div className="reservation-container">



        <h2>Rezervace online</h2>







        {submitted && (



          <div className="success-message">



            ✓ Vaše rezervace byla přijata! Brzy se vám ozveme.



          </div>



        )}







        {error && (



          <div className="error-message">



            ✗ {error}



          </div>



        )}







        <form onSubmit={handleSubmit}>



          <div className="form-row">



            <div className="form-group">



              <label htmlFor="name">Jméno *</label>



              <input



                type="text"



                id="name"



                name="name"



                value={formData.name}



                onChange={handleChange}



                placeholder="Vaše jméno"



                required



              />



            </div>







            <div className="form-group">



              <label htmlFor="phone">Telefon *</label>



              <input



                type="tel"



                id="phone"



                name="phone"



                value={formData.phone}



                onChange={handleChange}



                placeholder="+420 xxx xxx xxx"



                required



              />



            </div>



          </div>







          <div className="form-group">



            <label htmlFor="email">E-mail *</label>



            <input



              type="email"



              id="email"



              name="email"



              value={formData.email}



              onChange={handleChange}



              placeholder="vaseho@email.cz"



              required



            />



          </div>







          <div className="form-row">



            <div className="form-group">



              <label htmlFor="date">Datum *</label>



              <input



                type="date"



                id="date"



                name="date"



                value={formData.date}



                onChange={handleChange}



                min={getTodayDate()}



                required



              />



            </div>







            <div className="form-group">



              <label htmlFor="time">Čas *</label>



              <input



                ref={timeInputRef}



                type="time"



                id="time"



                name="time"



                value={formData.time}



                onChange={handleChange}



                required



              />



            </div>



          </div>







          <div className="form-group">



            <label htmlFor="guests">Počet osob</label>



            <select



              id="guests"



              name="guests"



              value={formData.guests}



              onChange={handleChange}



            >



              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (



                <option key={num} value={num}>{num}</option>



              ))}



            </select>



          </div>







          <div className="form-group">



            <label htmlFor="note">Poznámka</label>



            <textarea



              id="note"



              name="note"



              value={formData.note}



              onChange={handleChange}



              placeholder="Speciální přání nebo informace..."



            />



          </div>







          <button type="submit" className="submit-button">



            Odeslat rezervaci



          </button>



        </form>



      </div>



    </section>



  )



}



