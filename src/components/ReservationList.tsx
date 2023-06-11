import React from 'react'
import { types } from '../helpers'
import ReservationItem from './ReservationItem'

function ReservationList({ reservations }: { reservations: types.Reservation[] }) {
   return (
      <div className='bg-white'>
         {reservations.map((reservation, idx) => (
            <div className='barestho-reservation-day-list-container'>
               <ReservationItem item={{ ...reservation, group: idx + 1 }} />
            </div>
         ))}
      </div>
   )
}

export default ReservationList
