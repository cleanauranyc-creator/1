"use client"

import { useRef, useState } from "react"
import "./tilted-card.css"

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null)
  const innerRef = useRef(null)
  const captionRef = useRef(null)

  const [transforms, setTransforms] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })
  const [captionPos, setCaptionPos] = useState({ x: 0, y: 0, opacity: 0, rotate: 0 })
  const [lastY, setLastY] = useState(0)

  function handleMouse(e) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    setTransforms((prev) => ({
      ...prev,
      rotateX: rotationX,
      rotateY: rotationY,
    }))

    const velocityY = offsetY - lastY
    setCaptionPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      rotate: -velocityY * 0.6,
    })
    setLastY(offsetY)
  }

  function handleMouseEnter() {
    setTransforms((prev) => ({ ...prev, scale: scaleOnHover }))
  }

  function handleMouseLeave() {
    setTransforms({ rotateX: 0, rotateY: 0, scale: 1 })
    setCaptionPos({ x: 0, y: 0, opacity: 0, rotate: 0 })
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <div
        ref={innerRef}
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: `perspective(1000px) rotateX(${transforms.rotateX}deg) rotateY(${transforms.rotateY}deg) scale(${transforms.scale})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        )}

        {displayOverlayContent && overlayContent && <div className="tilted-card-overlay">{overlayContent}</div>}
      </div>

      {showTooltip && (
        <figcaption
          ref={captionRef}
          className="tilted-card-caption"
          style={{
            transform: `translate(${captionPos.x}px, ${captionPos.y}px) rotate(${captionPos.rotate}deg)`,
            opacity: captionPos.opacity,
            transition: "opacity 0.2s ease-out",
          }}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  )
}
