import { useState } from 'react'

import ReservationCard from './ReservationCard'

import './ReservationBoard.css'



export default function ReservationBoard({ reservations, onMoveReservation }) {

  const [expandedColumns, setExpandedColumns] = useState({

    upcoming: true,

    'in-progress': true,

    completed: true

  })



  const toggleColumn = (columnKey) => {

    setExpandedColumns(prev => ({

      ...prev,

      [columnKey]: !prev[columnKey]

    }))

  }



  const getReservationsByStatus = (status) => {

    return reservations.filter(res => res.status === status)

  }



  const upcomingCount = getReservationsByStatus('upcoming').length

  const inProgressCount = getReservationsByStatus('in-progress').length

  const completedCount = getReservationsByStatus('completed').length



  return (

    <div className="reservation-board-container">

      <div className="reservation-board">

        <div className={`board-column ${expandedColumns.upcoming ? 'expanded' : 'collapsed'}`}>

          <div 

            className="column-header upcoming clickable" 

            onClick={() => toggleColumn('upcoming')}

          >

            <h3>📋 Nadcházející</h3>

            <div className="header-right">

              <span className="count">{upcomingCount}</span>

              <span className="toggle-icon">{expandedColumns.upcoming ? '▼' : '▶'}</span>

            </div>

          </div>

          {expandedColumns.upcoming && (

            <div className="column-content">

              {getReservationsByStatus('upcoming').length > 0 ? (

                getReservationsByStatus('upcoming').map(reservation => (

                  <ReservationCard

                    key={reservation.id}

                    reservation={reservation}

                    onMove={onMoveReservation}

                    status="upcoming"

                  />

                ))

              ) : (

                <p className="empty-state">Žádné nadcházející rezervace</p>

              )}

            </div>

          )}

        </div>



        <div className={`board-column ${expandedColumns['in-progress'] ? 'expanded' : 'collapsed'}`}>

          <div 

            className="column-header in-progress clickable" 

            onClick={() => toggleColumn('in-progress')}

          >

            <h3>⏳ V průběhu</h3>

            <div className="header-right">

              <span className="count">{inProgressCount}</span>

              <span className="toggle-icon">{expandedColumns['in-progress'] ? '▼' : '▶'}</span>

            </div>

          </div>

          {expandedColumns['in-progress'] && (

            <div className="column-content">

              {getReservationsByStatus('in-progress').length > 0 ? (

                getReservationsByStatus('in-progress').map(reservation => (

                  <ReservationCard

                    key={reservation.id}

                    reservation={reservation}

                    onMove={onMoveReservation}

                    status="in-progress"

                  />

                ))

              ) : (

                <p className="empty-state">Žádné rezervace v průběhu</p>

              )}

            </div>

          )}

        </div>



        <div className={`board-column ${expandedColumns.completed ? 'expanded' : 'collapsed'}`}>

          <div 

            className="column-header completed clickable" 

            onClick={() => toggleColumn('completed')}

          >

            <h3>✅ Hotovo</h3>

            <div className="header-right">

              <span className="count">{completedCount}</span>

              <span className="toggle-icon">{expandedColumns.completed ? '▼' : '▶'}</span>

            </div>

          </div>

          {expandedColumns.completed && (

            <div className="column-content">

              {getReservationsByStatus('completed').length > 0 ? (

                getReservationsByStatus('completed').map(reservation => (

                  <ReservationCard

                    key={reservation.id}

                    reservation={reservation}

                    onMove={onMoveReservation}

                    status="completed"

                  />

                ))

              ) : (

                <p className="empty-state">Žádné hotové rezervace</p>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  )

}

