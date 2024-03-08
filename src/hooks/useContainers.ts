import { useEffect, useMemo, useState } from 'react'
import { GroupedNotify, NotifyAlignment } from '../types'
import { useNotifyStore } from './useNotifyStore'

interface UseContainersProps {
  unmountMs: number
}

export const useContainers = ({ unmountMs }: UseContainersProps) => {
  const { notify } = useNotifyStore(['notify'])

  const [containers, setContainers] = useState<NotifyAlignment[]>([])

  const notifyGrouped = useMemo<GroupedNotify>(() => {
    return Array.from(notify.get().entries()).reduce(
      (acc, [, notification]) => {
        const { alignment } = notification

        acc[alignment] = acc[alignment] || []
        acc[alignment].push(notification)

        if (!containers.includes(alignment)) {
          setContainers((prevContainers) => [...prevContainers, alignment])
        }

        return acc
      },
      {} as GroupedNotify,
    )
  }, [containers, notify.get()])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainers((prevContainers) => {
        return prevContainers.filter((alignment) =>
          Array.from(notify.get().values()).some(
            (notification) => notification.alignment === alignment,
          ),
        )
      })
    }, unmountMs)

    return () => clearTimeout(timeout)
  }, [notify.get()])

  return {
    notifyGrouped,
    containers,
  }
}
