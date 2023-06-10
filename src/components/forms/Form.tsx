import React from 'react'
import { useStepper } from '../../contexts/StepperContext'
import { types } from '../../helpers'
import Loading from '../UI/Loading'
import FormBanner from './Banner'
import { DayStep, Time, Guests, Preferences, Contact, Confirm, Finish } from './steps'

function Form() {
   const Steps: types.Step[] = [
      {
         label: 'Les invités',
         element: Guests,
      },
      {
         label: 'Le créneau souhaité',
         element: DayStep,
      },
      {
         label: 'Le créneau souhaité',
         element: Time,
      },
      {
         label: 'Vos préférences',
         element: Preferences,
      },
      {
         label: 'Vos coordonnées',
         element: Contact,
      },
      {
         label: 'On y est presque...',
         element: Confirm,
      },
      {
         label: 'Merci pour votre réservation',
         element: Finish,
      },
   ]

   const { activeStep, loading }: types.Stepper = useStepper()

   React.useEffect(() => {
      console.log(activeStep)
   }, [activeStep])

   const ActiveElement = Steps[activeStep].element
   const activeElementLabel = Steps[activeStep].label

   return (
      <div className='flex flex-col'>
         <div className='hidden xl:block'>
            {loading && <Loading />}
            <div className='text-white  text-4xl font-bold leading-relaxed mb-4'>
               Feeling Food
            </div>
            <div className='text-white  text-2xl font-bold leading-normal'>
               Réservez votre table
            </div>
            <div className='text-white text-xs font-normal leading-3 mb-3'>
               En quelques clics
            </div>
         </div>

         <div className='w-[330px] xl:mr-20 relative bg-white font-bold rounded-3xl mb-20'>
            <FormBanner />
            <div className='font-bold text-xl border-b-2 w-full py-4 text-center'>
               {activeElementLabel}
            </div>
            <div>
               <ActiveElement />
            </div>
         </div>
      </div>
   )
}

export default Form
