import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'


const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-br from-cyan-400 to-sky-950'>
       <Navbar/>
       <Header/>
    </div>
  )
}

export default Home