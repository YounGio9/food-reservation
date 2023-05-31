import React from 'react'
import { useStepper } from '../../../contexts/StepperContext'
import { types } from '../../../helpers'
import BackButton from '../Buttons/BackButton'

function Time() {
    const { choosenDateInString, setHour } = useStepper()

    const hours: types.Schedule[] = [
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
    ]

    return (
        <div>
            <h2 className='relative text-white pb-6 font-bold text-center bg-[rgb(220,0,68)] pt-4 z-10 select-none'>
                {choosenDateInString}
            </h2>
            <div className='flex items-center justify-center'>
                <div className='flex flex-wrap w-[85%] mt-6'>
                    {hours.map((hour) => (
                        <button
                            onClick={() => setHour(hour)}
                            key={hour}
                            className='mx-auto mb-2 text-center text-xs font-bold rounded-full w-20 py-2 available'
                        >
                            {hour}
                        </button>
                    ))}
                </div>
            </div>

            <BackButton label=' Modifier la date' />
        </div>
    )
}

export default Time
