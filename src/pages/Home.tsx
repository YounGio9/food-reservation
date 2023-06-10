import React from 'react'
import Header from '../components/Header'

function Home() {
   const Form = React.lazy(() => import('../components/forms'))
   return (
      <div className='w-full h-full relative font-food text-black'>
         <Header />
         <div className='w-full xl:hidden py-1 px-6 text-xl flex items-center justify-between text-white font-semibold font-food'>
            <p>Feeling Food</p>
            <button className='bg-gradient py-2 px-4 rounded-full'>Infos</button>
         </div>
         <div className='py-3 px-6 mt-2 w-full flex justify-center'>
            <React.Suspense fallback={<div>Loading ...</div>}>
               <Form />
            </React.Suspense>
         </div>
      </div>
   )
}

export default Home
