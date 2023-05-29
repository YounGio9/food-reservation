import React, { useEffect } from 'react'
import { useStepper } from '../../contexts/StepperContext'
import { types } from '../../helpers'
import DateAndTime from './steps/DateAndTime'
import Guests from './steps/Guests'

function Form() {
    const Steps: types.Step[] = [
        {
            label: 'Les invités',
            element: Guests,
        },
        {
            label: 'Le créneau souhaité',
            element: DateAndTime,
        },
    ]

    const { activeStep }: types.Stepper = useStepper()

    // const stepsImages: string[] = []

    useEffect(() => {
        console.log(activeStep)
    }, [activeStep])

    const Element = Steps[1].element

    return (
        <div className='w-full h-auto bg-white font-bold rounded-3xl'>
            <div className='font-bold text-xl border-b-2 w-full py-4 text-center'>
                Les invités
            </div>
            <div>
                <Element />
            </div>
        </div>
    )
}

export default Form
