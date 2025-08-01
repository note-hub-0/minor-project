import React from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Footer/Footer'
import ThemeToggle from './components/Theme/ThemeToggle'

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
