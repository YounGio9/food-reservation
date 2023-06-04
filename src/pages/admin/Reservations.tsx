import React from 'react'
import Loading from '../../components/UI/Loading'
import { types } from '../../helpers'
import client from '../../helpers/client'

function Reservations() {
   const [data, setData] = React.useState<types.Reservation[]>([])
   const [loading, setLoading] = React.useState<boolean>(false)

   const getReservations = async () => {
      setLoading(true)
      const data = await client.get('/reservations')
      setData(data.data.data)

      setLoading(false)
   }

   React.useMemo(() => {
      console.log(data)
   }, [data])

   React.useEffect(() => {
      getReservations()
   }, [])

   return loading ? <Loading /> : <div>Reservations</div>
}

export default Reservations
