import React from 'react'
import { types } from '../../helpers'
import { useNavigate } from 'react-router-dom'

interface Props {
   children: types.contextChildren
}

function Layout({ children }: Props) {
   const navigate = useNavigate()
   return (
      <div className='w-screen h-screen font-food bg-blue text-white text-sm overflow-hidden'>
         <div className='bg-black h-14 flex justify-end'>
            <button className=' mx-4' onClick={() => navigate('/admin/reservations')}>
               Réservations
            </button>
            <button className=' mx-4' onClick={() => navigate('/admin/clients')}>
               Clients
            </button>
         </div>

         {children}
      </div>
   )
}

export default Layout
