<template>
  <div class="particle-bg">
    <canvas ref="canvasRef" class="particle-bg__canvas" />
    <div v-if="cameraActive" class="particle-bg__indicator">● Camera active</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const cameraActive = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let particles: Particle[] = []
let facePosition: { x: number; y: number } | null = null
let video: HTMLVideoElement | null = null
let faceApiLoaded = false

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const PARTICLE_COUNT = 60

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
  }
}

function initParticles(w: number, h: number) {
  particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(w, h))
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    // Face-reactive movement
    if (facePosition) {
      const dx = facePosition.x - p.x
      const dy = facePosition.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 0) {
        p.vx += (dx / dist) * 0.02
        p.vy += (dy / dist) * 0.02
      }
    }

    // Apply velocity with damping
    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.995
    p.vy *= 0.995

    // Add slight random drift
    p.vx += (Math.random() - 0.5) * 0.05
    p.vy += (Math.random() - 0.5) * 0.05

    // Wrap around edges
    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0

    // Draw
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(86, 156, 214, ${p.opacity})`
    ctx.fill()
  }

  animId = requestAnimationFrame(animate)
}

async function startCamera() {
  if (!faceApiLoaded) {
    try {
      await Promise.all([
        (window as any).faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        (window as any).faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      ])
      faceApiLoaded = true
    } catch {
      return
    }
  }

  try {
    video = document.createElement('video')
    video.width = 640
    video.height = 480
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    video.srcObject = stream
    await video.play()
    cameraActive.value = true
    detectFace()
  } catch {
    // Camera permission denied; stay in ambient mode
  }
}

async function detectFace() {
  if (!video || !cameraActive.value) return

  try {
    const detection = await (window as any).faceapi
      .detectSingleFace(video, new (window as any).faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()

    if (detection) {
      const canvas = canvasRef.value
      if (canvas) {
        facePosition = {
          x: (1 - detection.detection.box.x / 640) * canvas.width,
          y: (detection.detection.box.y / 480) * canvas.height,
        }
      }
    } else {
      facePosition = null
    }
  } catch {
    facePosition = null
  }

  if (cameraActive.value) {
    setTimeout(() => detectFace(), 100)
  }
}

function stopCamera() {
  cameraActive.value = false
  facePosition = null
  if (video && video.srcObject) {
    (video.srcObject as MediaStream).getTracks().forEach(t => t.stop())
  }
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  if (particles.length === 0) {
    initParticles(canvas.width, canvas.height)
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  handleResize()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  stopCamera()
  window.removeEventListener('resize', handleResize)
})

defineExpose({ startCamera, stopCamera, cameraActive })
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particle-bg__canvas {
  width: 100%;
  height: 100%;
}

.particle-bg__indicator {
  position: fixed;
  bottom: 12px;
  left: 12px;
  color: var(--accent-green);
  font-family: var(--font-mono);
  font-size: 10px;
  z-index: 1;
  opacity: 0.6;
}
</style>
