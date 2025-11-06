import React, { useRef } from 'react'
import { useGame } from './hooks/useGame'
import Ship from './components/ship/ship'
import Bullet from './components/bullet/bullet'
import EnemyBox from './components/enemy/enemy'

import "./assets/styles/globals.css"

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { ship, bullets, enemy, score } = useGame(containerRef)

  // for responsivenes for mobile
  const sendKeyDown = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }
  const sendKeyUp = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key }))
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4">
      
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Space Shooter — TypeScript + React</h1>
          <div className="text-sm">
            <div>Score: <span className="font-arial">{score}</span></div>
          </div>
        </header>

        <>

        <div
          ref={containerRef}
          className="relative bg-white rounded-lg overflow-hidden
                     h-[55vh] min-h-[320px] lg:h-[70vh] md:min-h-[420px]
                     "
        >
          {/* Game entities */}
          <Ship ship={ship} />
          {bullets.map(b => <Bullet key={b.id} b={b} />)}
          {enemy && <EnemyBox e={enemy} />}

          {/* simple info */}
          <div className="absolute left-2 top-2 text-xs text-black">Press A / D to move — F to fire</div>
        </div>

        </>

        {/* mobile controls */}
        <div className="mt-4 flex justify-center gap-10 lg:hidden">
          <button
            onTouchStart={() => sendKeyDown('a')}
            onTouchEnd={() => sendKeyUp('a')}
            className="bg-zinc-700 px-4 py-2 rounded"
          >
            Left
          </button>

          <button
            onTouchStart={() => sendKeyDown('f')}
            onTouchEnd={() => sendKeyUp('f')}
            className="bg-zinc-700 px-4 py-2 rounded"
          >
            Fire
          </button>

          <button
            onTouchStart={() => sendKeyDown('d')}
            onTouchEnd={() => sendKeyUp('d')}
            className="bg-zinc-700 px-4 py-2 rounded"
          >
            Right
          </button>
          
        </div> 

      </div>
    </div>
  )
}
