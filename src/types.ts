import { JSX, ReactNode } from 'react'

export enum NotifyAlignment {
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  topCenter = 'top-center',
  bottomCenter = 'bottom-center',
}

export interface NotifyRenderArgs {
  id: string
  duration: number
}

export type RenderFunction = (args: NotifyRenderArgs) => ReactNode | JSX.Element

export interface BaseNotifyOptions {
  duration: number
  alignment: NotifyAlignment
  render: RenderFunction
}

export interface NotifyOptions extends BaseNotifyOptions {
  id: string
}

export interface NotifyContextType {
  openNotify: (options: Omit<NotifyOptions, 'id'>) => void
  closeNotify: (id: string) => void
  closeAllNotify: () => void
}
export interface NotifyProps extends BaseNotifyOptions {
  id: string
}

export type GroupedNotify = {
  [key in NotifyAlignment]: NotifyOptions[]
}
