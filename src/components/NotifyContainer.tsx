import { FC, PropsWithChildren, useRef } from 'react'

import { useAnimate } from '../core/hooks/useAnimate.ts'

import { NotifyAlignment } from '../types.ts'

import '../styles.css'

interface NotifyContainerProps {
  alignment: NotifyAlignment
}

export const NotifyContainer: FC<PropsWithChildren<NotifyContainerProps>> = ({
  alignment,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { isRendered } = useAnimate(containerRef, alignment)

  const containerClassName = `react-notify-container ${alignment}`

  return (
    <div className={containerClassName} ref={containerRef} key={alignment}>
      {isRendered && children}
    </div>
  )
}
