import React from 'react'
import { FaCheck, FaCookie, FaRestroom } from 'react-icons/fa'

function ReservationItem() {
   return (
      <div className='barestho-group'>
         <div className='barestho-group-header'>
            <div className='barestho-flex'>
               <span className='font-bold'>18:00</span>
               <div className=' float-right flex items-center gap-1'>
                  2
                  <FaCookie />
                  5
                  <FaRestroom />
               </div>
            </div>
         </div>
         <div className='time-list'>
            <div className='time-separator barestho-noselect'>
               <span className='font-bold'>18:00</span>
               <span className=' float-right flex items-center gap-1'>
                  2
                  <FaCookie />
                  5
                  <FaRestroom />
               </span>
            </div>

            <div className='bg-white text-black'>
               <div className='reservation-item false'>
                  <div className='header'></div>
                  <div className='status-group'>
                     <FaCheck />
                  </div>
                  <div className='name primary text-ellipsis'>Marion</div>
                  <div className='start secondary'>18:00</div>
                  <div className='zone secondary text-ellipsis'>default</div>
                  <div className='count primary'>
                     3 <i aria-hidden='true' className='utensils small fitted icon'></i>
                  </div>

                  <div className='tables'>T. 6 </div>
                  <div className='details'> </div>
                  <div className='other'></div>
               </div>
               <div className='reservation-item false'>
                  <div className='header'></div>
                  <div className='status-group'>
                     <i className='icons'>
                        <i
                           aria-hidden='true'
                           className='green check large icon barestho-mobile-status-icon'
                        ></i>
                     </i>
                  </div>
                  <div className='name primary text-ellipsis'>A Martine</div>
                  <div className='zone secondary text-ellipsis'>default</div>
                  <div className='count primary'>
                     2 <i aria-hidden='true' className='utensils small fitted icon'></i>
                  </div>
                  <div className='start secondary'>18:00</div>
                  <div className='tables'>T. 7 </div>
                  <div className='details'> </div>
                  <div className='other'></div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ReservationItem
