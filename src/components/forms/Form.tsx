import React, { useEffect } from 'react'
import { useStepper } from '../../contexts/StepperContext'
import { types } from '../../helpers'
import { DayStep, Time, Guests, Preferences, Contact } from './steps'

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
   ]

   const { activeStep }: types.Stepper = useStepper()

   useEffect(() => {
      console.log(activeStep)
   }, [activeStep])

   const ActiveElement = Steps[activeStep].element
   const activeElementLabel = Steps[activeStep].label

   return (
      <div className='w-full h-auto bg-white font-bold rounded-3xl mb-20'>
         <div className='font-bold text-xl border-b-2 w-full py-4 text-center'>
            {activeElementLabel}
         </div>
         <div>
            <ActiveElement />
         </div>
      </div>
   )
}

export default Form
