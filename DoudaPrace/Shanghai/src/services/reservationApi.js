const API_URL = 'http://localhost:5000/api'

export async function testConnection() {
  try {
    const response = await fetch('http://localhost:5000/api/health')
    if (!response.ok) throw new Error('Server nereaguje')
    const data = await response.json()
    console.log('✓ Připojení k serveru OK:', data)
    return true
  } catch (error) {
    console.error('❌ Nelze se připojit k serveru:', error)
    return false
  }
}

export async function fetchReservations() {
  try {
    const response = await fetch(`${API_URL}/reservations`)
    if (!response.ok) throw new Error('Chyba při načítání rezervací')
    return await response.json()
  } catch (error) {
    console.error('Chyba:', error)
    throw error
  }
}

export async function createReservation(data) {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = body.error || 'Chyba při vytváření rezervace'
      const err = new Error(message)
      err.code = body.code
      err.freeSeats = body.freeSeats
      err.suggestedTime = body.suggestedTime
      throw err
    }
    return body
  } catch (error) {
    console.error('Chyba:', error)
    throw error
  }
}

export async function updateReservationStatus(id, status) {
  try {
    const response = await fetch(`${API_URL}/reservations/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) throw new Error('Chyba při aktualizaci rezervace')
    return await response.json()
  } catch (error) {
    console.error('Chyba:', error)
    throw error
  }
}

export async function deleteReservation(id) {
  try {
    const response = await fetch(`${API_URL}/reservations/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Chyba při smazání rezervace')
    return await response.json()
  } catch (error) {
    console.error('Chyba:', error)
    throw error
  }
}
