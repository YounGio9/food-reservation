import React from 'react'
import custom from '../../assets/svg/custom.svg'
import finish from '../../assets/svg/finish.svg'
import guest from '../../assets/svg/guest.svg'
import time from '../../assets/svg/time.svg'
import { useStepper } from '../../contexts/StepperContext'
import { HiUserCircle } from 'react-icons/hi'

function Banner() {
   const { activeStep } = useStepper()

   const icons: any = [guest, time, custom, finish].map((svg) => (
      <img src={svg} key={svg} alt='' width={35} height={35} />
   ))

   return (
      <div className='pt-6 relative'>
         <hr className='border border-barestho-light-gray min-w-full absolute bottom-5 pl-10' />

         <div className='flex justify-center items-center px-10 relative'>
            {activeStep === 0 && icons[0]}
            {(activeStep === 1 || activeStep === 2) && icons[1]}
            {activeStep === 3 && icons[2]}
            {activeStep === 4 && <HiUserCircle size={40} />}
            {activeStep === 5 && icons[3]}
            {activeStep === 6 && icons[3]}
         </div>
      </div>
   )
}

export default Banner
