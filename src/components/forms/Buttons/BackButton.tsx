import React from 'react'
import { useStepper } from '../../../contexts/StepperContext'
import { types } from '../../../helpers'

interface Props {
    label: string
}

function BackButton(props: Props) {
    const { handleBack }: types.Stepper = useStepper()

    const { label } = props

    return (
        <div className='flex justify-between p-6'>
            <button
                onClick={handleBack}
                className='button disabled:border-grey disabled:bg-transparent disabled:text-grey select-none transition-colors border-2 py-2 px-2 relative rounded-full font-semibold text-xs text-right border-black hover:bg-black hover:text-white text-black '
            >
                <span className='h-fit flex justify-center items-center'>
                    {label}
                </span>
            </button>
        </div>
    )
}

export default BackButton
