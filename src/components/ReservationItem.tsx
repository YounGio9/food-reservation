import React from 'react'
import { FaCheck, FaRestroom } from 'react-icons/fa'
import { BsFillCalendarFill } from 'react-icons/bs'
import { types, func } from '../helpers'

function ReservationItem({ item }: { item: types.Reservation & { group: number } }) {
   return (
      <div className='barestho-group mb-4'>
         <div className='barestho-group-header'>
            <div className='barestho-flex p-1'>
               <span className='font-bold'> {item.reservationTime} </span>
               <div className=' float-right flex items-center gap-1'>
                  {item.adultsGuests + item.childrenGuests}
                  <BsFillCalendarFill />
                  {func.getTable(item.group)}
                  <FaRestroom />
               </div>
            </div>
         </div>
         <div className='time-list'>
            <div className='time-separator barestho-noselect'>
               <span className='font-bold'>{item.reservationTime}</span>
               <span className=' float-right flex items-center gap-1'>
                  {item.adultsGuests + item.childrenGuests}
                  <BsFillCalendarFill />
                  {func.getTable(item.group)}
                  <FaRestroom />
               </span>
            </div>

            <div className='bg-white text-black'>
               <div className='reservation-item false'>
                  <div className='header'></div>
                  <div className='status-group'>
                     <FaCheck color={'#21ba45'} size={16} />
                  </div>
                  <div className='name primary text-ellipsis'>{item.firstname} </div>
                  <div className='start secondary'> {item.reservationTime} </div>
                  <div className='zone secondary text-ellipsis'>default</div>
                  <div className='count primary'>
                     {item.adultsGuests + item.childrenGuests}{' '}
                     <i aria-hidden='true' className='utensils small fitted icon'></i>
                  </div>

                  <div className='tables'>T. {func.getTable(item.group)} </div>
                  <div className='details'> </div>
                  <div className='other'></div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ReservationItem
