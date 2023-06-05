import React from 'react'
import { useStepper } from '../../contexts/StepperContext'
import { types } from '../../helpers'
import Loading from '../UI/Loading'
import Banner from './Banner'
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
      <div className='w-full h-auto relative bg-white font-bold rounded-3xl mb-20'>
         {loading && <Loading />}
         <Banner />
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
