import React, { useEffect } from 'react'
import { useStepper } from '../../contexts/StepperContext'
import { types } from '../../helpers'
import Invitation from './steps/Invitation'

function Form() {
    const Steps: types.Step[] = [
        {
            label: 'Les invités',
            element: Invitation,
        },
    ]

    const { activeStep }: types.Stepper = useStepper()

    // const stepsImages: string[] = []

    useEffect(() => {
        console.log(activeStep)
    }, [activeStep])

    const Element = Steps[0].element

    return (
        <div className='w-full h-auto bg-white font-bold rounded-3xl'>
            <div className='font-bold text-xl border-b-2 w-full py-4 text-center'>
                Les invités
            </div>
            <div className='py-3'>
                <Element />
            </div>
        </div>
    )
}

export default Form
