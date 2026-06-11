<template>
  <div
    class="generating-video-bg pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div class="generating-video-bg__gradient absolute inset-0" />
    <canvas
      ref="canvasRef"
      class="generating-video-bg__canvas absolute inset-0 h-full w-full"
    />
    <div class="generating-video-bg__glow absolute inset-x-0 bottom-0 h-1/2" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const canvasRef = ref(null)

const VISIBILITY_BOOST = 1.2
const PARTICLE_COUNT = Math.round(48 * VISIBILITY_BOOST)

let animationFrameId = 0
let resizeObserver = null

const createParticles = (width, height, count = PARTICLE_COUNT) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: (Math.random() * 2.2 + 0.6) * VISIBILITY_BOOST,
    speedX: (Math.random() - 0.5) * 0.18 * VISIBILITY_BOOST,
    speedY: -(Math.random() * 0.35 + 0.08) * VISIBILITY_BOOST,
    opacity: Math.min(1, (Math.random() * 0.55 + 0.25) * VISIBILITY_BOOST),
    twinkleSpeed: (Math.random() * 0.025 + 0.008) * VISIBILITY_BOOST,
    twinklePhase: Math.random() * Math.PI * 2,
    type: ["dot", "square", "triangle"][Math.floor(Math.random() * 3)],
    tint: Math.random() > 0.78 ? "cyan" : "white",
  }))

const drawTriangle = (ctx, x, y, size) => {
  ctx.beginPath()
  ctx.moveTo(x, y - size)
  ctx.lineTo(x + size, y + size * 0.8)
  ctx.lineTo(x - size, y + size * 0.8)
  ctx.closePath()
  ctx.fill()
}

const drawSquare = (ctx, x, y, size) => {
  ctx.fillRect(x - size * 0.7, y - size * 0.7, size * 1.4, size * 1.4)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  let particles = []
  let width = 0
  let height = 0
  let tick = 0

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return

    width = parent.clientWidth
    height = parent.clientHeight
    canvas.width = width
    canvas.height = height

    if (particles.length === 0) {
      particles = createParticles(width, height)
    }
  }

  const render = () => {
    tick += 1
    ctx.clearRect(0, 0, width, height)

    particles.forEach((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      if (particle.y < -8) {
        particle.y = height + 8
        particle.x = Math.random() * width
      }

      if (particle.x < -8) particle.x = width + 8
      if (particle.x > width + 8) particle.x = -8

      const twinkle = 0.54 + Math.sin(tick * particle.twinkleSpeed + particle.twinklePhase) * 0.42
      const alpha = Math.min(1, particle.opacity * twinkle)

      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.tint === "cyan" ? "#a5f3fc" : "#ffffff"
      ctx.shadowBlur = particle.size * 3.6
      ctx.shadowColor = particle.tint === "cyan"
        ? "rgba(165, 243, 252, 0.96)"
        : "rgba(255, 255, 255, 0.9)"

      if (particle.type === "triangle") {
        drawTriangle(ctx, particle.x, particle.y, particle.size)
      } else if (particle.type === "square") {
        drawSquare(ctx, particle.x, particle.y, particle.size * 0.75)
      } else {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.55, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    })

    animationFrameId = window.requestAnimationFrame(render)
  }

  resize()
  render()

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.parentElement)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrameId)
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.generating-video-bg__gradient {
  background: linear-gradient(
    180deg,
    #050514 0%,
    #0c1545 28%,
    #1e2a8f 58%,
    #4f46e5 82%,
    #7c83ff 100%
  );
}

.generating-video-bg__glow {
  background: radial-gradient(
    ellipse 92% 72% at 50% 100%,
    rgba(129, 140, 248, 0.54) 0%,
    rgba(99, 102, 241, 0.24) 45%,
    transparent 75%
  );
}

.generating-video-bg__canvas {
  opacity: 1;
  mix-blend-mode: screen;
}
</style>
