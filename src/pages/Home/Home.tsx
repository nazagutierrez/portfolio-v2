import Silk from '@/components/Silk'
import React from 'react'
import Work from './Work'

const Home = () => {
  const BORDER = 12
  const RADIUS = 28
  const SIZE = 1000

  return (
    <div className="h-full w-full flex">
      <div className="fixed left-0 top-0 h-screen w-1/2 overflow-hidden">
        {/* Fondo */}
        <div
          className="absolute inset-0"
          style={{ clipPath: 'url(#clip-left)' }}
        >
          <Silk color="#8b7732" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 p-20 flex flex-col h-full text-main-white">
          <h1 className="flex mt-16 flex-col mb-10 italic text-[8rem] leading-[7.5rem]">
            <span>Nazareno</span>
            <span>Gutierrez</span>
          </h1>

          <h2 className="text-[2rem] mb-5 italic ms-5">
            Frontend Developer SSR
          </h2>

          <h3 className="ms-5">
            Buscás un desarrollador con
          </h3>
        </div>

        {/* Frame */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <defs>
            <clipPath id="clip-left" clipPathUnits="userSpaceOnUse">
              <rect
                x={BORDER}
                y={BORDER}
                width={945}
                height={903}
                rx={RADIUS}
              />
            </clipPath>
          </defs>
        </svg>
      </div>


      <div className="ml-[50%] h-screen w-1/2 overflow-y-auto overflow-x-hidden">
        <div className="relative min-h-screen bg-main-black">
          {/* Fondo */}
          <div
            className="absolute inset-0 text-[#4b4b4b]"
            style={{ clipPath: 'url(#clip-right)' }}
          >
            <Silk color="#4b4b4b" />
          </div>

          {/* Contenido scrolleable */}
          <div className="relative z-10 p-20 text-main-white space-y-40">
            <section className="h-screen">Hero</section>
            <section className="h-screen">Work</section>
            <section className="h-screen">More</section>
          </div>

          {/* Frame */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            <defs>
              <clipPath id="clip-right" clipPathUnits="userSpaceOnUse">
                <rect
                  x={BORDER}
                  y={BORDER}
                  width="920"
                  height={SIZE - BORDER * 2}
                  rx={RADIUS}
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>


      {/* <Work /> */}
    </div>
  )
}

export default Home
