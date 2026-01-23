import Silk from '@/components/Silk'
import React from 'react'
import Work from './Work'

const Home = () => {
  return (
    <div className="h-full">
      {/* Contenedor exterior (borde) */}
      <div className="relative h-screen border-20 border-main-black">
        {/* Contenedor interior (recorte del borde) */}
        <div className="absolute -inset-[3px] rounded-lg overflow-hidden">
          <Silk color="#8b7732" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 h-full">
          <h1 className="text-2xl p-20 text-white">
            Frontend Developer SSR
          </h1>
        </div>
      </div>

      <Work />
    </div>
  )
}

export default Home
