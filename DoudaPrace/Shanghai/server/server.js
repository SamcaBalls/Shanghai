import express from 'express'

import cors from 'cors'

import bodyParser from 'body-parser'

import * as db from './db.js'



const app = express()

const PORT = 5000



// Middleware

app.use(cors())

app.use(bodyParser.json())



// Inicializace databáze

await db.initializeDatabase()



// Test endpoint

app.get('/api/health', (req, res) => {

  res.json({ status: 'ok', message: '🍜 Server běží' })

})



const CAPACITY = 35

const RESERVATION_DURATION_MINUTES = 90



/** Vrátí počet ms od půlnoci pro řetězec "HH:MM" */

function timeToMs(timeStr) {

  const [h, m] = timeStr.split(':').map(Number)

  return (h * 60 + (m || 0)) * 60 * 1000

}



/** Zkontroluje, zda se dva časové intervaly na stejný den překrývají (délka každého = durationMs) */

function intervalsOverlap(start1Ms, start2Ms, durationMs) {

  const end1 = start1Ms + durationMs

  const end2 = start2Ms + durationMs

  return start1Ms < end2 && start2Ms < end1

}



/** Připočte minuty k času "HH:MM", vrátí "HH:MM" (při přetečení přes půlnoc vrátí např. "00:30") */

function addMinutesToTime(timeStr, minutes) {

  const [h, m] = timeStr.split(':').map(Number)

  const totalMinutes = (h || 0) * 60 + (m || 0) + minutes

  const newH = Math.floor(totalMinutes / 60) % 24

  const newM = totalMinutes % 60

  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`

}



// Routes

app.post('/api/reservations', async (req, res) => {

  try {

    const { date, time, guests } = req.body

    const guestCount = parseInt(guests, 10) || 0

    const durationMs = RESERVATION_DURATION_MINUTES * 60 * 1000

    const newStartMs = timeToMs(time)



    const reservationsOnDate = await db.getReservationsByDate(date)

    let overlappingGuests = 0

    for (const existing of reservationsOnDate) {

      const existingStartMs = timeToMs(existing.time)

      if (intervalsOverlap(newStartMs, existingStartMs, durationMs)) {

        overlappingGuests += existing.guests

      }

    }



    const totalGuests = overlappingGuests + guestCount

    if (totalGuests > CAPACITY) {

      const free = Math.max(0, CAPACITY - overlappingGuests)

      const suggestedTime = addMinutesToTime(time, RESERVATION_DURATION_MINUTES)

      return res.status(400).json({

        error: 'Kapacita restaurace je v tomto čase naplněna.',

        code: 'CAPACITY_EXCEEDED',

        currentGuests: overlappingGuests,

        capacity: CAPACITY,

        freeSeats: free,

        suggestedTime

      })

    }



    const reservation = await db.addReservation(req.body)

    res.status(201).json(reservation)

  } catch (error) {

    if (error.message && error.message.includes('CAPACITY')) {

      return res.status(400).json({ error: error.message })

    }

    res.status(500).json({ error: 'Chyba při přidání rezervace' })

  }

})



app.get('/api/reservations', async (req, res) => {

  try {

    const reservations = await db.getReservations()

    res.json(reservations)

  } catch (error) {

    res.status(500).json({ error: 'Chyba při načítání rezervací' })

  }

})



app.patch('/api/reservations/:id/status', async (req, res) => {

  try {

    const { status } = req.body

    const reservation = await db.updateReservationStatus(req.params.id, status)

    res.json(reservation)

  } catch (error) {

    res.status(500).json({ error: 'Chyba při aktualizaci rezervace' })

  }

})



app.delete('/api/reservations/:id', async (req, res) => {

  try {

    const result = await db.deleteReservation(req.params.id)

    res.json(result)

  } catch (error) {

    res.status(500).json({ error: 'Chyba při smazání rezervace' })

  }

})



app.listen(PORT, () => {

  console.log(`🍜 Server běží na http://localhost:${PORT}`)

})

