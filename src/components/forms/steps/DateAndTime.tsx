import React from 'react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { types } from '../../../helpers'
import { useStepper } from '../../../contexts/StepperContext'

function DateAndTime() {
    const [activeDate, setActiveDate] = React.useState<Date>(new Date())

    const { handleBack }: types.Stepper = useStepper()

    // const handleChange = ()
    React.useEffect(() => {
        console.log(activeDate)
    }, [activeDate])

    return (
        <div>
            <Calendar
                onChange={(value) => setActiveDate(value as Date)}
                value={activeDate}
                tileClassName={({ date }) =>
                    ![0, 1].includes(date.getDay()) && date >= new Date()
                        ? 'available'
                        : ''
                }
                minDate={new Date()}
                tileDisabled={({ date }) => [0, 1].includes(date.getDay())}
            />
            <div className='flex justify-between p-6'>
                <button
                    onClick={handleBack}
                    className='button disabled:border-grey disabled:bg-transparent disabled:text-grey select-none transition-colors border-2 py-2 px-2 relative rounded-full font-semibold text-xs text-right border-black hover:bg-black hover:text-white text-black '
                >
                    <span className='h-fit flex justify-center items-center'>
                        Modifier les convives
                    </span>
                </button>
            </div>
        </div>
    )
}

export default DateAndTime