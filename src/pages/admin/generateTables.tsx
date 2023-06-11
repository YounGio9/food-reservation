import { FaUsers } from 'react-icons/fa'
import { TimelineGroupBase } from 'react-calendar-timeline'
import tables from '../../db/tables.json'

export default function generateTables() {
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

   return { groups }
}
