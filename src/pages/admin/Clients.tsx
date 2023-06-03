import React from 'react'
import clients from '../../db/clients.json'
import { Pagination } from '@mui/material'
import { types } from '../../helpers'
import ClientCard from '../../components/ClientCard'

function Clients() {
   const [page, setPage] = React.useState<number>(1)
   const [totalPages, setTotalPages] = React.useState<number>(1)
   const [pageData, setPageData] = React.useState<types.Client[]>([] as types.Client[])

   const dataPerPage: number = 9

   const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
   }

   const treatData = (data: types.Client[]) => {
      setTotalPages(Math.ceil(data.length / dataPerPage))
      console.log(data.length)
   }

   const divideData = (data: types.Client[]) => {
      const prev = (page - 1) * dataPerPage
      setPageData(data.slice(prev, prev + dataPerPage))
   }

   React.useEffect(() => {
      treatData(clients)
      divideData(clients)

      // eslint-disable-next-line
   }, [page])

   return (
      <>
         <div className='w-full h-full flex flex-col  px-6'>
            <div className='flex justify-end my-4 h-8'>
               <input
                  name='search'
                  className='w-1/3 rounded-full text-black p-2'
                  placeholder='Rechercher un client'
               />
            </div>

            <div className='w-full h-auto bg-white'>
               {pageData.map((client: types.Client, idx: number) => (
                  <ClientCard key={(client.phoneNumber as number) + idx} client={client} />
               ))}
            </div>
            <div className='flex items-center justify-center my-3'>
               <Pagination
                  color='primary'
                  page={page}
                  count={totalPages}
                  shape='rounded'
                  onChange={handleChangePage}
               />
            </div>
         </div>
      </>
   )
}

export default Clients
