import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from './component/Footer/Footer'
import ThemeToggle from './component/Theme/ThemeToggle'

export default function Layout() {
  return (
    <>
      <Navbar/>
      <main>
      <Outlet/>

      </main>
      <Footer/>
      <ThemeToggle/>
    </>
  )
}
