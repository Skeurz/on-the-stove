'use client'

export default function HeroVideo() {
  return (
    <video
      className="hero-bg-video"
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={e => e.target.play().catch(() => {})}
    >
      <source src="/hero-background.mp4" type="video/mp4" />
    </video>
  )
}