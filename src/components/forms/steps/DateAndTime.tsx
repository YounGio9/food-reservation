import React from 'react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

function DateAndTime() {
    const [value, setValue] = React.useState<Date>(new Date())

    // const handleChange = ()
    console.log(value)

    return (
        <div>
            <Calendar
                onChange={(value) => setValue(value as Date)}
                value={value}
                minDate={new Date()}
            />
        </div>
    )
}

export default DateAndTime
