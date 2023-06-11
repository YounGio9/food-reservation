import React from 'react'
import { useStepper } from '../../../contexts/StepperContext'
import { types } from '../../../helpers'

function Guests() {
   const [adults, setAdults] = React.useState<number>(0)
   const [children, setChildren] = React.useState<number>(0)

   const props = useStepper()

   const totalGuests: number = adults + children

   type guests = 'adults' | 'children'

   const increment = (guest: guests) => {
      const action = (prev: number) => (prev <= 15 && totalGuests <= 15 ? prev + 1 : prev)
      if (guest === 'adults') {
         setAdults(action)
      }
      if (guest === 'children') {
         setChildren(action)
      }
   }

   const decrement = (guest: guests) => {
      const action = (prev: number) => (prev >= 1 ? prev - 1 : prev)
      if (guest === 'adults') {
         setAdults(action)
      }
      if (guest === 'children') {
         setChildren(action)
      }
   }

   return (
      <div className='grid'>
         <div className='flex p-6 items-center justify-between'>
            <p>Adultes</p>{' '}
            <div className='flex items-center justify-between basis-[45%]'>
               <button
                  onClick={() => decrement('adults')}
                  className={`flex items-center justify-center w-10 h-10 ${
                     adults > 0 ? 'border-red' : 'border-grey'
                  }   border-2 rounded-full`}
               >
                  -
               </button>
               {adults}
               <button
                  onClick={() => increment('adults')}
                  className={`flex items-center justify-center w-10 h-10 ${
                     adults <= 15 && totalGuests <= 15 ? 'border-red' : 'border-grey'
                  }   border-2 rounded-full`}
               >
                  +
               </button>
            </div>
         </div>
         <hr className='min-w-full border border-grey' />
         <div className='flex p-6 items-center justify-between'>
            <p>Enfants</p>{' '}
            <div className='flex items-center justify-between basis-[45%]'>
               <button
                  onClick={() => decrement('children')}
                  className={`flex items-center justify-center w-10 h-10 ${
                     children > 0 ? 'border-red' : 'border-grey'
                  }   border-2 rounded-full`}
               >
                  -
               </button>
               {children}
               <button
                  onClick={() => increment('children')}
                  className={`flex items-center justify-center w-10 h-10 ${
                     children <= 15 && totalGuests <= 15 ? 'border-red' : 'border-grey'
                  }   border-2 rounded-full`}
               >
                  +
               </button>
            </div>
         </div>
         {totalGuests === 16 && (
            <p className='text-xs px-4 py-6 text-white bg-blue text-left'>
               Pour toute réservation de plus de 16, contactez directement le restaurant.
            </p>
         )}
         {totalGuests > 0 && adults === 0 && (
            <p className='text-xs px-4 py-6 text-white bg-blue text-left'>
               Un adulte doit être présent
            </p>
         )}
         <div className='flex p-6 items-center justify-end'>
            <button
               disabled={adults <= 0}
               onClick={() =>
                  props.handleNext({
                     adultsGuests: adults,
                     childrenGuests: children,
                  } as types.Reservation)
               }
               className={`border-2 transition duration-500  ${
                  adults === 0 ? 'border-grey text-grey' : 'border-black'
               }  p-2 text-xs rounded-full`}
            >
               {adults === 0
                  ? "Nombre d'invites"
                  : totalGuests === 1
                  ? 'Juste moi'
                  : `Nous serons ${totalGuests}`}
               !
            </button>
         </div>
      </div>
   )
}

export default Guests
