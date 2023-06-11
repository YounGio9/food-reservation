import React from 'react'
import { Modal } from 'antd'
import { func, types } from '../helpers'
import { getDateAndTime, getDateInFrench } from '../helpers/functions'

function CustomModal({
   activeItemData,
   setIsModalOpen,
   isModalOpen,
}: {
   activeItemData: types.Reservation & { group: number }
   setIsModalOpen: (status: boolean) => void
   isModalOpen: boolean
}) {
   return (
      <Modal
         className='relative'
         title='Réservation'
         width={800}
         cancelText={'Fermer'}
         centered
         onCancel={() => setIsModalOpen(false)}
         open={isModalOpen}
      >
         <hr className='absolute top-14 border-t border-grey w-full left-0' />
         <p className=' mb-1 mt-6 text-xl font-semibold leading-none'>
            {activeItemData.firstname + ' ' + activeItemData.lastname}
         </p>
         <p className='text-[#808080] my-1'>{activeItemData.email} </p>
         <p className='text-[#808080] '>{activeItemData.phoneNumber} </p>

         <p className='flex flex-wrap text-base mb-4'>
            {activeItemData.reservationDate && (
               <p className=' basis-1/3'>
                  {' '}
                  {getDateInFrench(getDateAndTime(activeItemData.reservationDate))}
               </p>
            )}
            <p className=' basis-1/3'> {activeItemData.reservationTime} </p>
            <p className=' basis-1/3'>
               {' '}
               {activeItemData.adultsGuests + activeItemData.childrenGuests} (
               {activeItemData.adultsGuests} adultes)
               {activeItemData.childrenGuests > 0 && (
                  <span> ({activeItemData.childrenGuests} enfants) </span>
               )}
            </p>
            <p className=' basis-1/3'> {activeItemData.typeOfMeal} </p>
            <p className=' basis-1/3'> default</p>
         </p>
         <p className='border-b border-grey pb-3'> {activeItemData.comment} </p>
         <p className=' text-[#dc0044]'>Table {func.getTable(activeItemData.group)} </p>
      </Modal>
   )
}

export default CustomModal
