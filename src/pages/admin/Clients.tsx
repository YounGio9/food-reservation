import React from 'react'
import { Pagination } from '@mui/material'
import { types } from '../../helpers'
import ClientCard from '../../components/ClientCard'
import client from '../../helpers/client'
import Loading from '../../components/UI/Loading'

function Clients() {
   const [page, setPage] = React.useState<number>(1)
   const [totalPages, setTotalPages] = React.useState<number>(1)
   const [pageData, setPageData] = React.useState<types.Client[]>([] as types.Client[])
   const [loading, setLoading] = React.useState<boolean>(false)

   const dataPerPage: number = 9

   const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
   }

   const treatData = (data: types.Client[]) => {
      console.log(data)
      setTotalPages(Math.ceil(data.length / dataPerPage))
   }

   const divideData = (data: types.Client[]) => {
      const prev = (page - 1) * dataPerPage
      setPageData(data.slice(prev, prev + dataPerPage))
   }

   const fetchData = async () => {
      setLoading(true)
      const res = await client.get('/clients')
      const fetchedData = res.data.data
      treatData(fetchedData)
      divideData(fetchedData)
      setLoading(false)
   }

   // const getCountryFlag = (number: )

   React.useEffect(() => {
      fetchData()

      // eslint-disable-next-line
   }, [page])

   // React.useEffect(() => {
   //    getData()

   // }, [page])

   return (
      <>
         {!loading ? (
            <div className='w-full h-full flex flex-col  px-6'>
               {pageData.length > 0 ? (
                  <>
                     <div className='flex justify-end my-4 h-8'>
                        <input
                           name='search'
                           className='w-1/3 rounded-full text-black p-2'
                           placeholder='Rechercher un client'
                        />
                     </div>

                     <div className='w-full h-auto bg-white'>
                        {pageData.map((client: types.Client, idx: number) => (
                           <ClientCard
                              key={(client.phoneNumber as number) + idx}
                              client={client}
                           />
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
                  </>
               ) : (
                  <div className='flex items-center justify-center text-2xl mt-24'>
                     <span>Vous n'avez pas encore de client</span>
                  </div>
               )}
            </div>
         ) : (
            <Loading />
         )}
      </>
   )
}

export default Clients
