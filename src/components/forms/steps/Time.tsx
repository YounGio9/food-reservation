import React from 'react'
import { useStepper } from '../../../contexts/StepperContext'
import BackButton from '../Buttons/BackButton'

function Time() {
    const { choosenDate } = useStepper()
    return (
        <div>
            <h2 className='relative text-white pb-6 font-bold text-center bg-[rgb(220,0,68)] pt-4 z-10 select-none'>
                {choosenDate}
            </h2>

            <BackButton label='Modifier la date' />
        </div>
    )
}

export default Time
