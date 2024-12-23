import Hero from '@/components/globale/navbar/hero'
import Navbar from '@/components/globale/navbar/navbar'
import React from 'react'

export default function Home () {
  return(
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar/>
      <Hero/>
    </main>
  )
}