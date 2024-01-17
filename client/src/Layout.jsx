import React from 'react'
import Header from './component/Header'
import { Outlet } from 'react-router'
import Footer from './component/Footer'

const Layout = () => {
  return (
    <div className=''>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
