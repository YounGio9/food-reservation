import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'

function index() {
   const Clients = React.lazy(() => import('./Clients'))
   const Reservations = React.lazy(() => import('./Reservations'))

   const routes = [
      {
         path: '/clients',
         element: Clients,
      },
      {
         path: '/reservations',
         element: Reservations,
      },
   ]
   return (
      <>
         <React.Suspense fallback={<div>Loading ...</div>}>
            <Layout>
               <Routes>
                  {routes.map((route) => (
                     <Route path={route.path} key={route.path} element={<route.element />} />
                  ))}
               </Routes>
            </Layout>
         </React.Suspense>
      </>
   )
}

export default index
