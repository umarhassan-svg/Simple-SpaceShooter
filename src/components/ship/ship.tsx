import React from 'react'
import type { ShipState } from '../../types/game'

type Props = {
  ship: ShipState
}

export default function Ship({ ship }: Props) {
  return (
    <div
      style={{
        left: `${ship.x}px`,
        top: `${ship.y}px`,
        width: `${ship.w}px`,
        height: `${ship.h}px`
      }}
      className="absolute bg-green-600 rounded-sm shadow-md flex items-center justify-center"
    >
      {/* small cockpit */}
      <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">▲</div>
    </div>
  )
}
