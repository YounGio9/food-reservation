import React from 'react'
import './UI.scss'

const Loading = () => {
   const Secondary = 'Chargement en cours ...'

   return (
      <React.Fragment>
         <div id='Loading' className='flex justify-center items-center'>
            <div className='text-center'>
               <div className='font-normal'>{Secondary}</div>

               <div className='lds-ring mt-8'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Loading
