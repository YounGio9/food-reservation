import React, { useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import { useStepper } from '../../../contexts/StepperContext'
import BackButton from '../Buttons/BackButton'

function DayStep() {
    const { setDate, globalData } = useStepper()
    const [activeDate, setActiveDate] = React.useState<Date>()

    useEffect(() => {
        setActiveDate(
            new Date(globalData.reservationDate).toString() === 'Invalid Date'
                ? new Date()
                : new Date(globalData.reservationDate),
        )
        // eslint-disable-next-line
    }, [])

    console.log('activeDate', activeDate)

    return (
        <div>
            <Calendar
                value={activeDate}
                tileClassName={({ date }) =>
                    ![0, 1].includes(date.getDay()) && date >= new Date()
                        ? 'available'
                        : ''
                }
                onClickDay={(date) => setDate(date)}
                minDate={new Date()}
                tileDisabled={({ date }) => [0, 1].includes(date.getDay())}
            />
            <BackButton label={'Modifier les convives'} />
        </div>
    )
}

export default DayStep
