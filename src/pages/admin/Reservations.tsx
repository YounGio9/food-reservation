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
import generateTables from './generateTables'
import ReservationList from '../../components/ReservationList'
import { IoList } from 'react-icons/io5'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getDateAndTime, getDateInFrench } from '../../helpers/functions'
import { FaUser } from 'react-icons/fa'
import { types } from '../../helpers'
import { client } from '../../helpers'
import Loading from '../../components/UI/Loading'
import CustomModal from '../../components/CustomModal'

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
   const { groups } = generateTables()

   const [events, setEvents] = React.useState<TimelineItemBase<Date>[]>([])

   const [loading, setLoading] = React.useState<boolean>(false)
   const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
   // eslint-disable-next-line
   const [activeItemData, setActiveItemData] = React.useState<
      types.Reservation & { group: number }
   >({} as types.Reservation & { group: number })
   const [isOpenReservationList, setIsOpenReservationList] = React.useState<boolean>(false)
   const [reservations, setReservations] = React.useState<types.Reservation[]>([])
   const [timeStart, setTimeStart] = React.useState<moment.Moment>(moment())

   const handleNext = () => {
      setTimeStart((prev) => prev.clone().add(1, 'day'))
   }

   const handleBack = () => {
      setTimeStart((prev) => prev.clone().subtract(1, 'day'))
   }

   const getEndTime = (time: types.Schedule): string => {
      const start = time.slice(0, 2)
      const end = time.slice(3, 5)

      return `${+start + 2}:${end}`

      // switch (end) {
      //    case '00':
      //       return `${start}:${30}`
      //    case '30':
      //       return `${+start + 1}:00`
      //    default:
      //       return time
      // }
   }

   const getReservations = async () => {
      setLoading(true)
      const data = await client.get('/reservations')

      setReservations(data.data.data)
      setLoading(false)
   }

   const getActualreservations = () => {
      const filter = reservations.filter(
         (data: Partial<types.Reservation>) =>
            new Date(
               data.reservationDate?.split('/').reverse().join(' ') as string,
            ).getDay() === timeStart.toDate().getDay(),
      )

      setEvents(
         filter.map(
            (res: types.Reservation, idx: number): TimelineItemBase<Date> => ({
               id: res.phoneNumber,
               title: (
                  <div className='p-0 w-full h-full flex flex-col'>
                     <span>{res.firstname} </span>
                     <span className='flex items-center justify-end w-full text-xs'>
                        {res.adultsGuests + res.childrenGuests}
                        <FaUser />{' '}
                     </span>
                  </div>
               ),
               start_time: getDateAndTime(res.reservationDate, res.reservationTime),
               end_time: getDateAndTime(
                  res.reservationDate,
                  getEndTime(res.reservationTime as types.Schedule),
               ),
               group: idx + 1,
               className: 'event',

               // Today at 10 PM
            }),
         ),
      )
   }

   React.useMemo(() => {
      console.log('\nEvents', events)
   }, [events])

   React.useEffect(() => {
      getActualreservations()

      // eslint-disable-next-line
   }, [timeStart, reservations])

   React.useEffect(() => {
      getReservations()
      // eslint-disable-next-line
   }, [])

   React.useEffect(() => {
      console.log(timeStart.clone().startOf('day').toDate())
      console.log(timeStart.clone().endOf('day').toDate())
   }, [timeStart])

   return loading ? (
      <Loading />
   ) : (
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
            <CustomModal
               isModalOpen={isModalOpen}
               activeItemData={activeItemData}
               setIsModalOpen={setIsModalOpen}
            />
            {isOpenReservationList && (
               <div className='barestho-scrollable reservations-list mr-4 w-72'>
                  <ReservationList
                     reservations={reservations.filter(
                        (data: Partial<types.Reservation>) =>
                           new Date(
                              data.reservationDate?.split('/').reverse().join(' ') as string,
                           ).getDay() === timeStart.toDate().getDay(),
                     )}
                  />
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
                        setActiveItemData({
                           ...(reservations.find(
                              (res) => res.phoneNumber === id,
                           ) as types.Reservation),
                           group: events.find((event) => event.id === id)?.group as number,
                        })
                        setIsModalOpen(true)
                     }}
                     canMove={false}
                     lineHeight={47}
                     buffer={1}
                     sidebarWidth={105}
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
