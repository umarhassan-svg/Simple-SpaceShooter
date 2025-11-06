import { useEffect, useRef, useState } from 'react'
import type { Bullet, Enemy, ShipState } from '../types/game'
import { checkCollision } from '../utils/collision'

const SHIP_W = 40
const SHIP_H = 20
const BULLET_W = 6
const BULLET_H = 10
const ENEMY_W = 40
const ENEMY_H = 20

export function useGame(containerRef: React.RefObject<HTMLElement | null>) {
  const [ship, setShip] = useState<ShipState>(() => ({
    x: 0,
    y: 0,
    w: SHIP_W,
    h: SHIP_H,
    speed: 320
  }))

  const bulletsRef = useRef<Bullet[]>([])
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [enemy, setEnemy] = useState<Enemy | null>(null)
  const [score, setScore] = useState(0)

  const keys = useRef({ left: false, right: false, fire: false })

  // center ship inside container
  const centerShip = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setShip(s => ({
      ...s,
      x: (width - SHIP_W) / 2,
      y: height - SHIP_H - 12,
    }));
  };

  // spawn an enemy somewhere in the upper half
  const spawnEnemy = () => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    const x = Math.max(8, Math.random() * (width - ENEMY_W - 16));
    const y = 12 + Math.random() * Math.max(20, height / 2 - ENEMY_H - 12);

    setEnemy({
      id: String(Date.now()),
      x,
      y,
      w: ENEMY_W,
      h: ENEMY_H,
      alive: true,
    });
  };

  useEffect(() => {
    centerShip();
    window.addEventListener('resize', centerShip);
    return () => window.removeEventListener('resize', centerShip);
  }, []);


  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'a' ) keys.current.left = true
      if (e.key === 'd' ) keys.current.right = true
      if (e.key === 'f' ) keys.current.fire = true
    }
    function up(e: KeyboardEvent) {
      if (e.key === 'a' || e.key === 'ArrowLeft') keys.current.left = false
      if (e.key === 'd' || e.key === 'ArrowRight') keys.current.right = false
      if (e.key === 'f' || e.code === 'Space') keys.current.fire = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    spawnEnemy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
  const interval = setInterval(() => {
    const c = containerRef.current
    if (!c) return
    const rect = c.getBoundingClientRect()

    // move ship small steps
    setShip(s => {
      let x = s.x
      if (keys.current.left) x -= 4
      if (keys.current.right) x += 4
      x = Math.max(4, Math.min(rect.width - s.w - 4, x))
      return { ...s, x }
    })

    // fire bullet
    if (keys.current.fire) {
      const s = ship
      const sx = s.x + s.w / 2 - BULLET_W / 2
      const sy = s.y - BULLET_H - 4

      bulletsRef.current.push({
        id: String(Math.random()),
        x: sx,
        y: sy,
        w: BULLET_W,
        h: BULLET_H,
        speed: 2
      })
      setBullets([...bulletsRef.current])
    }

    // move bullets upward step by step
    bulletsRef.current = bulletsRef.current
      .map(b => ({ ...b, y: b.y - b.speed }))
      .filter(b => b.y > -20)
    setBullets([...bulletsRef.current])

    // collision
    if (enemy && enemy.alive) {
      for (const b of bulletsRef.current) {
        if (checkCollision(b, enemy)) {
          setEnemy(e => e ? { ...e, alive: false } : e)
          bulletsRef.current = bulletsRef.current.filter(bb => bb.id !== b.id)
          setScore(s => s + 1)
          setTimeout(spawnEnemy, 1000)
          break
        }
      }
    }
  }, 20) // runs 50 times / sec

  return () => clearInterval(interval)
}, [ship, enemy])

  return { ship, bullets, enemy, score }
}
