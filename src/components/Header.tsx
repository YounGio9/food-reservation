import React from 'react'
import logo from '../assets/logo.png'

function Header() {
  return (
    <div className=' w-full h-20 px-5 py-3'>
      <img
        src={logo}
        className='h-full w-auto'
        alt='Feeling Food logo'
      />
    </div>
  )
}

export default Header
