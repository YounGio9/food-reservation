import React, { Component } from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import 'moment/locale/fr'

import Timeline, {
   TimelineHeaders,
   SidebarHeader,
   DateHeader,
   TimelineItemBase,
} from 'react-calendar-timeline'
import generateFakeData from './generateFakeData'
import ReservationList from '../../components/ReservationList'
import { Modal } from 'antd'
import { IoList } from 'react-icons/io5'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getDateInFrench } from '../../helpers/functions'

var keys = {
   groupIdKey: 'id',
   groupTitleKey: 'title',
   groupRightTitleKey: 'rightTitle',
   itemIdKey: 'id',
   itemTitleKey: 'title',
   itemDivTitleKey: 'title',
   itemGroupKey: 'group',
   itemTimeStartKey: 'start_time',
   itemTimeEndKey: 'end_time',
   groupLabelKey: 'title',
}

export default function Reservations() {
   const { groups } = generateFakeData(150, 150, 1)

   const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
   const [activeItemData, setActiveItemData] = React.useState({})
   const [isOpenReservationList, setIsOpenReservationList] = React.useState<boolean>(false)

   const [timeStart, setTimeStart] = React.useState<moment.Moment>(moment())

   const handleNext = () => {
      setTimeStart((prev) => prev.clone().add(1, 'day'))
   }

   const handleBack = () => {
      setTimeStart((prev) => prev.clone().subtract(1, 'day'))
   }

   React.useEffect(() => {
      console.log(timeStart)
      console.log(timeStart.toDate())
   }, [timeStart])

   const events: TimelineItemBase<any>[] = [
      {
         id: 1,
         title: 'Event',
         start_time: new Date('2023 6 8 10:00'),
         end_time: new Date('2023 6 8 12:00'),
         group: 2,
         className: 'event',

         // Today at 10 PM
      },
      {
         id: 2,
         title: 'Event',
         start_time: new Date('2023 6 8 15:00'),
         end_time: new Date('2023 6 8 17:00'),
         group: 4,
         className: 'event',

         // Today at 10 PM
      },
      {
         id: 3,
         title: 'Event',
         start_time: new Date('2023 6 8 17:00'),
         end_time: new Date('2023 6 8 19:00'),
         group: 6,
         className: 'event',

         // Today at 10 PM
      },
   ]

   return (
      <div className='flex flex-col'>
         <div className='w-full flex items-center justify-center mt-5'>
            <div className=' w-72 bg-[#dc0044] flex rounded-full justify-between items-center p-2 text-lg'>
               <button className=' hover:opacity-50' onClick={handleBack}>
                  <FiChevronLeft />
               </button>

               <button className=' hover:opacity-50 font-bold'>
                  {getDateInFrench(timeStart.toDate())}
               </button>

               <button className=' hover:opacity-50' onClick={handleNext}>
                  <FiChevronRight />
               </button>
            </div>
         </div>

         <div className='flex mt-5 justify-center'>
            <Modal
               title='Basic Modal'
               cancelText={false}
               centered
               onCancel={() => setIsModalOpen(false)}
               open={isModalOpen}
            >
               <p>Some contents...</p>
               <p>Some contents...</p>
               <p>Some contents...</p>
            </Modal>
            {isOpenReservationList && (
               <div className='barestho-scrollable reservations-list mr-12 w-72'>
                  <ReservationList />
               </div>
            )}
            <div className='bg-white w-3/4'>
               <div className='w-full'>
                  <Timeline
                     groups={groups}
                     items={events as TimelineItemBase<any>[]}
                     keys={keys}
                     itemTouchSendsClick={false}
                     stackItems
                     itemHeightRatio={0.75}
                     onItemSelect={(id, e, time) => {
                        console.log(id, e, time)
                        setActiveItemData({
                           e,
                           id,
                           time,
                        })
                        setIsModalOpen(true)
                     }}
                     canMove={false}
                     lineHeight={47}
                     sidebarWidth={105}
                     // minResizeWidth={}
                     canResize={false}
                     visibleTimeStart={timeStart.startOf('day').toDate()}
                     visibleTimeEnd={timeStart.endOf('day').toDate()}
                  >
                     <TimelineHeaders className='sticky'>
                        <SidebarHeader>
                           {({ getRootProps }) => {
                              return (
                                 <div
                                    className='rct-sidebar-header flex items-center justify-center'
                                    {...getRootProps()}
                                 >
                                    <button
                                       className='border-2 border-white p-2 rounded-full'
                                       onClick={() =>
                                          setIsOpenReservationList(!isOpenReservationList)
                                       }
                                    >
                                       <IoList size={23} />
                                    </button>
                                 </div>
                              )
                           }}
                        </SidebarHeader>
                        <DateHeader unit='primaryHeader' className='rct-primary' />
                        <DateHeader className='rct-label' />
                     </TimelineHeaders>
                  </Timeline>
               </div>
            </div>
         </div>
      </div>
   )
}

// import { Button } from '@mui/material'
// import React from 'react'
// import Loading from '../../components/UI/Loading'
// import { types } from '../../helpers'
// import client from '../../helpers/client'
// import { Scheduler } from '@aldabil/react-scheduler'
// import { ProcessedEvent } from '@aldabil/react-scheduler/types'

// function Reservations() {
//    const [data, setData] = React.useState<ProcessedEvent[]>([])
//    const [loading, setLoading] = React.useState<boolean>(false)

//    const getEndTime = (time: types.Schedule): string => {
//       const start = time.slice(0, 2)
//       const end = time.slice(3, 5)

//       switch (end) {
//          case '00':
//             return `${start}:${30}`
//          case '30':
//             return `${+start + 1}:00`
//          default:
//             return time
//       }
//    }

//    console.log(getEndTime('14:00'))
//    const getReservations = async () => {
//       setLoading(true)
//       const data = await client.get('/reservations')
//       console.log(data.data.data)

//       setData(
//          data.data.data.map(
//             (res: any, idx: number): ProcessedEvent => ({
//                event_id: idx,
//                title: res.client + '\n' + res.numberOfGuests,
//                start: new Date(
//                   res.reservationDate.split('/').reverse().join(' ') +
//                      ' ' +
//                      res.reservationTime,
//                ),
//                end: new Date(
//                   [
//                      ...res.reservationDate.split('/').reverse(),
//                      getEndTime(res.reservationTime),
//                   ].join(' '),
//                ),
//             }),
//          ),
//       )

//       setLoading(false)
//    }

//    React.useMemo(() => {
//       console.log(data)
//    }, [data])

//    React.useEffect(() => {
//       getReservations()

//       // eslint-disable-next-line
//    }, [])

//    return loading ? (
//       <Loading />
//    ) : (
//       <div className='text-black h-full overflow-scroll'>
//          <Scheduler
//             editable={false}
//             deletable={false}
//             events={data}
//             view='week'
//             day={{
//                startHour: 11,
//                endHour: 23,
//                step: 60,
//                cellRenderer: ({ height, start, onClick, ...props }) => {
//                   // Fake some condition up
//                   const hour = start.getHours()
//                   const minutes = start.getMinutes()
//                   const disabled = [15, 16, 17, 18].includes(hour)
//                   const restProps = disabled ? {} : props
//                   return (
//                      <Button
//                         style={{
//                            height: '100%',
//                            background:
//                               disabled || (hour === 14 && minutes === 30)
//                                  ? '#eee'
//                                  : 'transparent',
//                            cursor: disabled ? 'not-allowed' : 'pointer',
//                         }}
//                         onClick={() => {
//                            if (disabled) {
//                               return alert('Feeling Food est fermé de 14h à 19h')
//                            }
//                            onClick()
//                         }}
//                         disableRipple={disabled}
//                         {...restProps}
//                      ></Button>
//                   )
//                },
//             }}
//             week={{
//                weekDays: [0, 3, 4, 5, 6],
//                step: 30,
//                weekStartOn: 6,
//                startHour: 11,
//                endHour: 23,
//                cellRenderer: ({ height, start, onClick, ...props }) => {
//                   // Fake some condition up
//                   const hour = start.getHours()
//                   const minutes = start.getMinutes()
//                   const disabled = [15, 16, 17, 18].includes(hour)
//                   const restProps = disabled ? {} : props
//                   return (
//                      <Button
//                         style={{
//                            height: '100%',
//                            background:
//                               disabled || (hour === 14 && minutes === 30)
//                                  ? '#eee'
//                                  : 'transparent',
//                            cursor: disabled ? 'not-allowed' : 'pointer',
//                         }}
//                         onClick={() => {
//                            if (disabled) {
//                               return alert('Feeling Food est fermé de 14h à 19h')
//                            }
//                            onClick()
//                         }}
//                         disableRipple={disabled}
//                         {...restProps}
//                      ></Button>
//                   )
//                },
//             }}
//             month={{
//                weekDays: [0, 2, 3, 4, 5, 6],
//                weekStartOn: 6,
//                startHour: 11,
//                endHour: 23,
//                cellRenderer: ({ height, start, onClick, ...props }) => {
//                   // Fake some condition up
//                   const hour = start.getHours()
//                   const minutes = start.getMinutes()
//                   const disabled = [15, 16, 17, 18].includes(hour)
//                   const restProps = disabled ? {} : props
//                   return (
//                      <Button
//                         style={{
//                            height: '100%',
//                            background:
//                               disabled || (hour === 14 && minutes === 30)
//                                  ? '#eee'
//                                  : 'transparent',
//                            cursor: disabled ? 'not-allowed' : 'pointer',
//                         }}
//                         onClick={() => {
//                            if (disabled) {
//                               return alert('Feeling Food est fermé de 14h à 19h')
//                            }
//                            onClick()
//                         }}
//                         disableRipple={disabled}
//                         {...restProps}
//                      ></Button>
//                   )
//                },
//             }}
//          />
//       </div>
//    )
// }

// export default Reservations
