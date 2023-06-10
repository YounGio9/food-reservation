import React from 'react'
import moment from 'moment'
import { types } from '../helpers'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Overview from '../assets/images/overview.jpg'
import foodExample from '../assets/images/foodExample.png'

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function Infos() {
   const schedules: types.DaySchedule[] = [
      {
         day: 'Lundi',
         start: 'Fermé',
         end: '',
      },
      {
         day: 'Mardi',
         start: '12:00 - 14:30',
         end: '19:00 - 22:00',
      },
      {
         day: 'Mercredi',
         start: '12:00 - 14:00',
         end: '19:00 - 22:00',
      },
      {
         day: 'Jeudi',
         start: '12:00 - 14:30',
         end: '19:00 - 22:00',
      },
      {
         day: 'Vendredi',
         start: '12:00 - 14:30',
         end: '19:00 - 22:00',
      },
      {
         day: 'Samedi',
         start: '19:00 - 22:00',
         end: '',
      },
      {
         day: 'Dimanche',
         start: '12:00 - 14:00',
         end: '',
      },
   ]

   const isToday = (dayIndex: number): boolean => {
      return dayIndex === moment().toDate().getDay() - 1
   }

   return (
      <div className='h-fit w-80 xl:w-[40rem] relative bg-white rounded-3xl hidden xl:block'>
         <div className='relative mb-10'>
            <img className='rounded-t-3xl w-full h-full' src={Overview} alt='Feeling Food' />
            <img
               src={foodExample}
               alt='Feeling Food'
               className='rounded-full w-20 h-20 object-cover absolute top-6 left-10 md:w-28 md:h-28  '
            />
         </div>

         <div className='mt-4'>
            <div className='relative'>
               {schedules.map(({ day, start, end }, idx) => (
                  <div
                     className={`flex items-center p-3 w-full relative
                     ${
                        isToday(idx)
                           ? 'after:w-4 after:absolute after:left-full after:rounded-tr-[21px] after:rounded-br-[21px] after:bg-[#dc0044] after:h-full after:inline-block before:w-4 before:absolute before:right-full before:rounded-tl-[21px] before:rounded-bl-[21px] before:bg-[#dc0044] before:h-full before:inline-block'
                           : ''
                     }
                         ${!isToday(idx) ? 'text-[#000000]' : 'text-white'}  ${
                        isToday(idx) ? 'bg-[#dc0044]' : idx % 2 === 0 ? 'bg-[#e5e7eb]' : ''
                     }`}
                  >
                     {[day, start, end].map((item: string) => (
                        <div className='basis-1/3 text-center text-xs font-bold'>{item}</div>
                     ))}
                  </div>
               ))}
            </div>
            <div className='w-full h-[400px] relative mt-4'>
               <MapContainer
                  center={[50.7428587708401, 3.22692275047302]}
                  zoom={16}
                  className='absolute z-0 outline-none touch-none rounded-b-3xl leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom'
                  scrollWheelZoom={true}
               >
                  <TileLayer
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={[50.742885, 3.226849]}>
                     <Popup>Restaurant Feeling Food</Popup>
                  </Marker>
               </MapContainer>
               <div className='w-full p-4 z-10 text-white mt-4 absolute bottom-0  '>
                  <div className='flex justify-between items-center bg-blue rounded-2xl p-4'>
                     <div className='flex gap-y-4 justify-between w-full items-center flex-wrap'>
                        <div>
                           <h1 className='font-bold text-sm mb-4'>Feeling Food</h1>
                           <p className='text-xs w-2/3 mb-4'>
                              {' '}
                              149, rue de la Station, 7700 Mouscron
                           </p>
                           <p className='text-xs flex'>
                              <a
                                 href='tel:+3256330366'
                                 className='flex text-xs font-semibold p-2 w-36 mt-2 justify-center items-center rounded-full   bg-red text-white xl:hover:text-blue
                    xl:hover:bg-white'
                              >
                                 <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    aria-hidden='true'
                                    className='h-3 w-3 mr-1'
                                 >
                                    <path
                                       fill-rule='evenodd'
                                       d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
                                       clip-rule='evenodd'
                                    ></path>
                                 </svg>
                                 +32 56 33 03 66
                              </a>
                           </p>
                        </div>
                        <a
                           href='https://www.google.com/maps/place/149, rue de la Station, 7700 Mouscron'
                           target='_blank'
                           rel='noreferrer'
                           className='text-blue bg-white py-2 px-4 rounded-full font-semibold text-xs text-right'
                        >
                           Itinéraire
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Infos
