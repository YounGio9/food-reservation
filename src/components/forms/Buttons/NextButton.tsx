import React from 'react'
import { useStepper } from '../../../contexts/StepperContext'
import { types } from '../../../helpers'
import { IoArrowForwardOutline } from 'react-icons/io5'

interface Props {
   label: string | React.ReactElement
   datas: types.Reservation
}

function NextButton(props: Props) {
   const { handleNext }: types.Stepper = useStepper()

   const { label, datas } = props

   return (
      <div className='flex justify-between p-6'>
         <button
            onClick={() => handleNext(datas)}
            className='button disabled:border-grey disabled:bg-transparent disabled:text-grey select-none transition-colors border-2 py-2 px-2 relative rounded-full font-semibold text-xs text-right border-black hover:bg-black hover:text-white text-black'
         >
            <span className='h-fit flex justify-center items-center'>
               {label} <IoArrowForwardOutline fontSize={20} />
            </span>
         </button>
      </div>
   )
}

export default NextButton
