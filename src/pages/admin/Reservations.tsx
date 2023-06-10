import React from 'react'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import 'moment/locale/fr'

import Timeline, {
   TimelineHeaders,
   SidebarHeader,
   DateHeader,
   TimelineItemBase,
   TodayMarker,
} from 'react-calendar-timeline'
import generateFakeData from './generateFakeData'
import ReservationList from '../../components/ReservationList'
import { Modal } from 'antd'
import { IoList } from 'react-icons/io5'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getDateInFrench } from '../../helpers/functions'
import { FaUser } from 'react-icons/fa'

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
      console.log(timeStart.clone().startOf('day').toDate())
      console.log(timeStart.clone().endOf('day').toDate())
   }, [timeStart])

   const events: TimelineItemBase<any>[] = [
      {
         id: 1,
         title: (
            <div className='p-0 w-full h-full flex flex-col'>
               <span>event</span>
               <span className='flex items-center justify-end w-full text-xs'>
                  {' '}
                  2<FaUser />{' '}
               </span>
            </div>
         ),
         start_time: new Date('2023 6 8 10:00'),
         end_time: new Date('2023 6 8 12:00'),
         group: 2,
         className: 'event',

         // Today at 10 PM
      },
   ]

   return (
      <div className='flex flex-col'>
         <div className='w-full flex items-center justify-center mt-5'>
            <div className=' w-72 bg-[#dc0044] flex rounded-full justify-between items-center p-2 text-base'>
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
               className='relative'
               title='Réservation'
               width={800}
               cancelText={'Fermer'}
               centered
               onCancel={() => setIsModalOpen(false)}
               open={isModalOpen}
            >
               <hr className='absolute top-14 border-t border-grey w-full left-0' />
               <p className=' mb-1 mt-6 text-xl font-semibold leading-none'>Dubois Sophie</p>
               <p className='text-[#808080] my-1'>sofinic@hotmail.com</p>
               <p className='text-[#808080] '>+32 475 27 49 34</p>

               <p className='flex flex-wrap text-base mb-4'>
                  <p className=' basis-1/3'> samedi 10 juin 2023</p>
                  <p className=' basis-1/3'> 18:30</p>
                  <p className=' basis-1/3'>2 (2 adultes)</p>
                  <p className=' basis-1/3'> Moment détente</p>
                  <p className=' basis-1/3'> default</p>
               </p>
               <p className='border-b border-grey pb-3'>Si possible en terrasse </p>
               <p className=' text-[#dc0044]'>Table</p>
            </Modal>
            {isOpenReservationList && (
               <div className='barestho-scrollable reservations-list mr-4 w-72'>
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
                     buffer={1}
                     // minResizeWidth={}

                     canResize={false}
                     visibleTimeStart={timeStart.clone().startOf('day').toDate()}
                     visibleTimeEnd={timeStart.clone().endOf('day').toDate()}
                  >
                     <TodayMarker date={moment().toDate()} />
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
