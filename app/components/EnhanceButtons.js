"use client"

import { useEffect } from 'react'

export default function EnhanceButtons() {
  useEffect(() => {
    try {
      const els = Array.from(document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"]'))
      els.forEach(el => {
        const cs = window.getComputedStyle(el)
        const padLeft = parseFloat(cs.paddingLeft) || 0
        const padRight = parseFloat(cs.paddingRight) || 0
        const padTotal = padLeft + padRight
        const br = parseFloat(cs.borderRadius) || 0
        // heuristics: treat as button-like if padded or rounded, or already has the utility class
        if (padTotal > 14 || br > 8 || el.classList.contains('full-width-mobile') || el.classList.contains('button') || el.getAttribute('role') === 'button') {
          el.classList.add('button')
          if (el.tagName.toLowerCase() === 'a') el.classList.add('button-link')
        }
      })
    } catch (e) {
      // fail silently
    }
  }, [])

  return null
}
