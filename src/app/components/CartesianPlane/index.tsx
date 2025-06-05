import { useEffect, useRef } from "react"

import { useCirc, useLine } from "../../hooks"
import type { Coords } from "../../types/Coords"

type Props = {
  equation?: string
  coords: Coords[]
}

export function CartesianPlane({equation, coords}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const { width, height } = canvas
    const midX = width / 2
    const midY = height / 2

    // função que desenha os eixos do plano cartesiano
    function drawAxes(){
      ctx.strokeStyle = "#000000"  // Cor dos eixos (preto)

      ctx.beginPath()
      ctx.moveTo(0, midY)
      ctx.lineTo(width, midY)
      ctx.moveTo(midX, 0)
      ctx.lineTo(midX, height)
      ctx.stroke()
    }

    function drawnGrid() {
      // Cor da grade
      ctx.strokeStyle = "#e0e0e0"; // cor cinza-claro
      ctx.lineWidth = 1; // Espessura da linha da grade

      for(let x = 0; x <= width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for(let y = 0; y <= height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // função que desenha o gráfico da função do 1° grau
    function drawnLine(a: number, b: number) {
      ctx.strokeStyle = "#000000"

      ctx.beginPath()

      // definir coordenadas de dois pontos para o desenho da reta
      let x1 = -midX / 10, y1 = a * x1 + b
      let x2 = midX / 10, y2 = a * x2 + b

      // converter para coordenadas no canvas
      x1 = midX + x1 * 10
      y1 = midY - y1 * 10
      x2 = midX + x2 * 10
      y2 = midY - y2 * 10

      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }

    function drawCircle(h: number, k: number, r: number) {
      ctx.strokeStyle = "#000000"

      ctx.beginPath()

      // converter as coordenadas do centro para o canvas
      const x = midX + h * 10
      const y = midY - k * 10
      ctx.arc(x, y, r * 10, 0, 2 * Math.PI)
      ctx.stroke()
    }

    function drawnPoint(coord: Coords) {
      const { x, y, active } = coord
      ctx.beginPath()
      ctx.arc(midX + x * 10, midY - y * 10, 5, 0, 2 * Math.PI)
      ctx.fillStyle = active ? "red" : "#4e5154"
      ctx.fill()

      // exibir as coordenadas do ponto
      ctx.fillStyle = "black"
      ctx.font = "12px Arial"
      ctx.fillText(`(${x}, ${y})`, midX + x * 10 + 5, midY - y * 10 + 5)
    }

    ctx.clearRect(0, 0, width, height)

    drawAxes()
    drawnGrid()

    coords.forEach((coord) => {
      drawnPoint(coord)
    })

    if(equation) {
      const lineCoef = useLine(equation)

      if(lineCoef) {
        const { a, b } = lineCoef
        drawnLine(a, b)
      }

      const circCoef = useCirc(equation)

      if(circCoef) {
        const { h, k, r } = circCoef
        drawCircle(h, k, r)
      }
    }
  }, [equation, coords])

  return (
    <canvas ref={canvasRef} width="400" height="400"></canvas>
  )
}