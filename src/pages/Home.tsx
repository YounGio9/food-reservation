import React from 'react'
import Header from '../components/Header'
import Loading from '../components/UI/Loading'

function Home() {
   const Form = React.lazy(() => import('../components/forms'))
   return (
      <div className='w-[370px] h-full relative font-food text-black'>
         <Header />
         <div className='w-full py-1 px-6 text-xl flex items-center justify-between text-white font-semibold font-food'>
            <p>Feeling Food</p>
            <button className='bg-gradient py-2 px-4 rounded-full'>Infos</button>
         </div>

         <div className='py-3 px-6 mt-2'>
            <React.Suspense fallback={<Loading />}>
               <Form />
            </React.Suspense>
         </div>
      </div>
   )
}

export default Home
