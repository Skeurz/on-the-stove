"use client"
import { useEffect } from 'react'
export default function EnhanceButtons() {
  useEffect(() => {
    try {
      const els = Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"], input[type="reset"]'))
      els.forEach(el => {
        const cs = window.getComputedStyle(el)
        const padLeft = parseFloat(cs.paddingLeft) || 0
        const padRight = parseFloat(cs.paddingRight) || 0
        const padTotal = padLeft + padRight
        const br = parseFloat(cs.borderRadius) || 0
        if (padTotal > 14 || br > 8 || el.classList.contains('button')) {
          el.classList.add('button')
        }
      })
    } catch (e) {
      // fail silently
    }
  }, [])
  return null
}