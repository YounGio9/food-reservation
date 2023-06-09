import { faker, Faker } from '@faker-js/faker'
import randomColor from 'randomcolor'
import moment from 'moment'
import { FaUsers } from 'react-icons/fa'
import { TimelineGroupBase, TimelineItemBase } from 'react-calendar-timeline'
import tables from '../../db/tables.json'

export default function (groupCount = 30, itemCount = 1000, daysInPast = 30) {
   let randomSeed = Math.floor(Math.random() * 1000)
   let groups: TimelineGroupBase[] = []
   for (let i = 0; i < tables.length; i++) {
      groups.push({
         id: `${i + 1}`,
         title: (
            <div className='barestho-timeline-group-container'>
               <p className='barestho-timeline-group-name'>Table {tables[i].name}</p>
               <div className='barestho-timeline-group-seats flex items-center gap-1'>
                  <FaUsers />
                  {tables[i].places}
               </div>
            </div>
         ),
         // rightTitle: faker.name.lastName(),
      })
   }
   let items: TimelineItemBase<number>[] = []
   for (let i = 0; i < itemCount; i++) {
      const startDate =
         faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000
      const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
      const endValue = moment(
         startDate + faker.datatype.number({ min: 2, max: 20 }) * 15 * 60 * 1000,
      ).valueOf()

      items.push({
         id: i + '',
         group: faker.datatype.number({ min: 1, max: groups.length }) + '',
         title: <p className='bg-green'></p>,
         start_time: new Date().setHours(21, 0, 0), // Today at 9 PM
         end_time: new Date().setHours(22, 0, 0), //
         // canMove: startValue > new Date().getTime(),
         // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
         className:
            moment(startDate).day() === 6 || moment(startDate).day() === 0
               ? 'item-weekend'
               : '',
      })
   }

   items = items.sort((a: any, b: any) => b - a)

   return { groups, items }
}
