import React from 'react'
import type { Bullet as BulletType } from '../../types/game'

export default function Bullet({ b }: { b: BulletType }) {
  return (
    <div
      style={{
        left: `${b.x}px`,
        top: `${b.y}px`,
        width: `${b.w}px`,
        height: `${b.h}px`
      }}
      className="absolute rounded-sm bg-yellow-400"
    />
  )
}
