import React from 'react'
import food from '../../../assets/svg/food.svg'
import phone from '../../../assets/svg/phone.svg'

import Confirm from './Confirm'

function Finish() {
   return (
      <>
         <div className='px-6 mt-6 mb-5'>
            <div className='flex items-center'>
               <img src={food} alt='' width={35} height={35} />
               <ul className='w-full pl-4 pr-1 text-sm mb-4 select-none'>
                  <li className='font-semibold'> Feeling Food</li>
                  <li>149, rue de la Station, 7700 Mouscron</li>
                  <a
                     href='tel:+3256330366'
                     className='flex text-xs font-semibold p-2 w-36 mt-2 justify-center items-center rounded-full   border-2 border-barestho-blue text-barestho-blue hover:bg-barestho-blue hover:text-white'
                  >
                     <img src={phone} alt='' width={15} height={15} />
                     +32 56 33 03 66
                  </a>
               </ul>
            </div>
         </div>
         <Confirm />
      </>
   )
}

export default Finish
