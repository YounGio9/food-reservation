import React from 'react'
import { types } from '../helpers'

function ClientCard({
   client: { firstname, lastname, email, phoneNumber },
}: {
   client: types.Client
}) {
   const fullName: string = firstname + ' ' + lastname

   return (
      <div className='w-full flex flex-col gap-[4.5px] px-4 py-2 border-grey border text-black'>
         <span className='text-bold'>{fullName}</span>
         <span className='text-semibold'>{email}</span>
         <span className='text-semibold text-cyan-700'>{phoneNumber}</span>
      </div>
   )
}

export default ClientCard
