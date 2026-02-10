import sqlite3 from 'sqlite3'

import path from 'path'

import { fileURLToPath } from 'url'



const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)



let db = null



export async function initializeDatabase() {

  return new Promise((resolve, reject) => {

    const dbPath = path.join(__dirname, 'database.db')

    db = new sqlite3.Database(dbPath, (err) => {

      if (err) {

        console.error('Chyba při otevření databáze:', err)

        reject(err)

        return

      }



      db.run('PRAGMA foreign_keys = ON', (err) => {

        if (err) {

          reject(err)

          return

        }



        // Vytvořit tabulku pokud neexistuje

        db.run(`

          CREATE TABLE IF NOT EXISTS reservations (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT NOT NULL,

            phone TEXT NOT NULL,

            date TEXT NOT NULL,

            time TEXT NOT NULL,

            guests INTEGER NOT NULL,

            note TEXT,

            status TEXT DEFAULT 'upcoming',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

          )

        `, (err) => {

          if (err) {

            reject(err)

            return

          }

          console.log('✓ Databáze inicializována')

          resolve(db)

        })

      })

    })

  })

}



export async function addReservation(reservation) {

  return new Promise((resolve, reject) => {

    db.run(

      `INSERT INTO reservations (name, email, phone, date, time, guests, note, status)

       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

      [

        reservation.name,

        reservation.email,

        reservation.phone,

        reservation.date,

        reservation.time,

        parseInt(reservation.guests),

        reservation.note || '',

        'upcoming'

      ],

      function(err) {

        if (err) {

          console.error('Chyba při přidání rezervace:', err)

          reject(err)

          return

        }

        resolve({ id: this.lastID, ...reservation, status: 'upcoming' })

      }

    )

  })

}



const CAPACITY = 35



export async function getReservations() {

  return new Promise((resolve, reject) => {

    db.all(

      'SELECT * FROM reservations ORDER BY date DESC, time DESC',

      (err, rows) => {

        if (err) {

          console.error('Chyba při načítání rezervací:', err)

          reject(err)

          return

        }

        resolve(rows || [])

      }

    )

  })

}



/** Vrátí všechny rezervace na dané datum se statusem upcoming nebo in-progress (pro výpočet překrývající se kapacity) */

export async function getReservationsByDate(date) {

  return new Promise((resolve, reject) => {

    db.all(

      `SELECT id, date, time, guests FROM reservations 

       WHERE date = ? AND status IN ('upcoming', 'in-progress')`,

      [date],

      (err, rows) => {

        if (err) {

          console.error('Chyba při načítání rezervací pro datum:', err)

          reject(err)

          return

        }

        resolve(rows || [])

      }

    )

  })

}



export function getCapacity() {

  return CAPACITY

}



export async function updateReservationStatus(id, status) {

  return new Promise((resolve, reject) => {

    db.run(

      `UPDATE reservations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,

      [status, id],

      function(err) {

        if (err) {

          console.error('Chyba při aktualizaci rezervace:', err)

          reject(err)

          return

        }

        

        db.get('SELECT * FROM reservations WHERE id = ?', id, (err, row) => {

          if (err) {

            reject(err)

            return

          }

          resolve(row)

        })

      }

    )

  })

}



export async function deleteReservation(id) {

  return new Promise((resolve, reject) => {

    db.run('DELETE FROM reservations WHERE id = ?', id, function(err) {

      if (err) {

        console.error('Chyba při smazání rezervace:', err)

        reject(err)

        return

      }

      resolve({ success: true })

    })

  })

}

