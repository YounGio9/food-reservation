import React from 'react'
import Form from '../components/Form'
import Header from '../components/Header'

function Home() {
  return (
    <div className='w-full h-full border-2 border-white bg-transparent'>
      <Header />
      <div className='w-full py-1 px-5 text-xl flex items-center justify-between text-white font-semibold font-food'>
        <p>Feeling Food</p>
        <button className='bg-gradient py-2 px-4 rounded-full'>
          Infos
        </button>
      </div>

      <div className='py-3 px-5'>
        <Form />
      </div>
    </div>
  )
}

export default Home
