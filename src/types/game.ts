export type Bullet = {
  id: string
  x: number
  y: number
  w: number
  h: number
  speed: number
}

export type Enemy = {
  id: string
  x: number
  y: number
  w: number
  h: number
  alive: boolean
}

export type ShipState = {
  x: number
  y: number
  w: number
  h: number
  speed: number
}
