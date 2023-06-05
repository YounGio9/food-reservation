import { Button } from '@mui/material'
import React from 'react'
import Loading from '../../components/UI/Loading'
import { types } from '../../helpers'
import client from '../../helpers/client'
import { Scheduler } from '@aldabil/react-scheduler'
import { ProcessedEvent } from '@aldabil/react-scheduler/types'

function Reservations() {
   const [data, setData] = React.useState<ProcessedEvent[]>([])
   const [loading, setLoading] = React.useState<boolean>(false)

   const getEndTime = (time: types.Schedule): string => {
      const start = time.slice(0, 2)
      const end = time.slice(3, 5)

      switch (end) {
         case '00':
            return `${start}:${30}`
         case '30':
            return `${+start + 1}:00`
         default:
            return time
      }
   }

   console.log(getEndTime('14:00'))
   const getReservations = async () => {
      setLoading(true)
      const data = await client.get('/reservations')
      console.log(data.data.data)

      setData(
         data.data.data.map(
            (res: any, idx: number): ProcessedEvent => ({
               event_id: idx,
               title: res.client + '\n' + res.numberOfGuests,
               start: new Date(
                  res.reservationDate.split('/').reverse().join(' ') +
                     ' ' +
                     res.reservationTime,
               ),
               end: new Date(
                  [
                     ...res.reservationDate.split('/').reverse(),
                     getEndTime(res.reservationTime),
                  ].join(' '),
               ),
            }),
         ),
      )

      setLoading(false)
   }

   React.useMemo(() => {
      console.log(data)
   }, [data])

   React.useEffect(() => {
      getReservations()

      // eslint-disable-next-line
   }, [])

   return loading ? (
      <Loading />
   ) : (
      <div className='text-black h-full overflow-scroll'>
         <Scheduler
            events={data}
            view='week'
            week={{
               weekDays: [0, 2, 3, 4, 5, 6],
               weekStartOn: 6,
               startHour: 9,
               endHour: 23,
               step: 30,
               cellRenderer: ({ height, start, onClick, ...props }) => {
                  // Fake some condition up
                  const hour = start.getHours()
                  const disabled = hour === 14
                  const restProps = disabled ? {} : props
                  return (
                     <Button
                        style={{
                           height: '100%',
                           background: disabled ? '#eee' : 'transparent',
                           cursor: disabled ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => {
                           if (disabled) {
                              return alert('Opss')
                           }
                           onClick()
                        }}
                        disableRipple={disabled}
                        {...restProps}
                     ></Button>
                  )
               },
            }}
         />
      </div>
   )
}

export default Reservations
