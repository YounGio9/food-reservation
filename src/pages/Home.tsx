import React from 'react'
import Header from '../components/Header'
import Infos from '../components/Infos'

function Home() {
   const Form = React.lazy(() => import('../components/forms'))

   const [infos, setInfos] = React.useState<boolean>(false)

   return (
      <div className='w-full h-full relative font-food text-black'>
         <Header />
         <div className='w-full xl:hidden py-1 px-6 text-xl flex items-center justify-between text-white font-semibold font-food'>
            <p>Feeling Food</p>
            <button
               onClick={() => setInfos(!infos)}
               className='bg-gradient py-2 px-4 rounded-full'
            >
               Infos
            </button>
         </div>
         <div className='py-3 px-6 mt-2 w-full flex justify-center'>
            <div className='flex items-start'>
               {!infos && (
                  <React.Suspense fallback={<div>Chargement ...</div>}>
                     <Form />
                  </React.Suspense>
               )}

               <Infos visibility={infos ? 'block' : 'hidden'} />
            </div>
         </div>
      </div>
   )
}

export default Home
