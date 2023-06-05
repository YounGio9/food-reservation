import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import guest from '../../../assets/svg/guest.svg'
import time from '../../../assets/svg/time.svg'
import custom from '../../../assets/svg/custom.svg'

import { HiUserCircle } from 'react-icons/hi'
import { MdOutlineDone } from 'react-icons/md'

import { useStepper } from '../../../contexts/StepperContext'
import BackButton from '../Buttons/BackButton'

function Confirm() {
   const { choosenDateInString, activeStep, globalData, handleNext } = useStepper()

   return (
      <div>
         {activeStep === 5 && (
            <div className=' bg-black text-white text-xs w-app font-semibold flex items-center px-6'>
               <AiOutlineInfoCircle style={{ color: 'white' }} size={80} />
               <p className='pl-4'>
                  Pour confirmer votre réservation, cliquez sur le bouton réserver tout en bas
                  du formulaire.
               </p>
            </div>
         )}
         <div className='p-6 pb-0 relative select-none'>
            <div className='flex items-center mb-6'>
               <img src={time} width='35' alt='' height={35} />
               <p className='text-sm font-bold pl-4'>{choosenDateInString} </p>
            </div>
            <div className='flex items-center mb-6'>
               <img src={guest} width='35' alt='' height={35} />
               <p className='text-sm font-bold pl-4'>
                  {globalData.adultsGuests} adultes, {globalData.childrenGuests} enfants{' '}
               </p>
            </div>
            <div className='flex items-center mb-6'>
               <img src={custom} width='35' alt='' height={35} />
               <div className='flex flex-col items-start pl-4 text-sm'>
                  <h4 className='font-semibold'>Type de repas</h4>
                  <span className='mb-2 text-xs font-semibold'>{globalData.typeOfMeal} </span>
               </div>
            </div>

            <hr className='border border-barestho-light-gray min-w-full my-10' />

            <div className='flex items-center mb-6'>
               <HiUserCircle size={45} />
               <div className='flex flex-col items-start pl-4 text-sm'>
                  <h4 className='font-semibold'>{`${globalData.lastname} ${globalData.firstname}`}</h4>
                  <span className='mb-2 text-xs font-semibold'>{globalData.email} </span>
                  <span className='mb-2 text-xs font-semibold'>
                     {globalData.phoneNumber}{' '}
                  </span>
               </div>
            </div>
         </div>
         {activeStep === 5 && (
            <div className='flex items-center justify-between'>
               <BackButton label={''} />
               <div className={`flex justify-between px-6 py-6`}>
                  <button
                     onClick={() => handleNext(globalData)}
                     className={`button bg-[#44af69] opacity-90 disabled:text-white select-none transition-colors  py-2 px-2 relative rounded-full font-semibold text-xs text-right border-black hover:bg-black hover:text-white text-white`}
                  >
                     <span className='h-fit flex justify-center items-center'>
                        <MdOutlineDone fontSize={20} /> Réserver
                     </span>
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default Confirm
