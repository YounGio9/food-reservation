import React from 'react'
import Home from '../pages/Home'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from '../pages/admin'

function App() {
   return (
      <Router>
         <div className='App relative min-h-[100vh]'>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/admin/*' element={<Admin />} />
            </Routes>
         </div>
      </Router>
   )
}

export default App
