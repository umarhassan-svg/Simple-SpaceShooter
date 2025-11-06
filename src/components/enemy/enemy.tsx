import React from 'react'
import type { Enemy } from '../../types/game'

export default function EnemyBox({ e }: { e: Enemy }) {
  if (!e) return null
  if (!e.alive) {
    return (
      <div
        style={{
          left: `${e.x}px`,
          top: `${e.y}px`,
          width: `${e.w}px`,
          height: `${e.h}px`
        }}
        className="absolute flex items-center justify-center"
      >
      </div>
    )
  }
  return (
    <div
      style={{
        left: `${e.x}px`,
        top: `${e.y}px`,
        width: `${e.w}px`,
        height: `${e.h}px`
      }}
      className="absolute bg-red-600 rounded-sm flex items-center justify-center"
    >
      👾
    </div>
  )
}
