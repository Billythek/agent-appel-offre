"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseWebSocketOptions {
  url: string
  onMessage?: (data: unknown) => void
  onOpen?: () => void
  onClose?: () => void
  reconnect?: boolean
  reconnectInterval?: number
}

export function useWebSocket({
  url,
  onMessage,
  onOpen,
  onClose,
  reconnect = true,
  reconnectInterval = 3000,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const connect = useCallback(() => {
    if (typeof window === "undefined") return

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage?.(data)
        } catch {
          onMessage?.(event.data)
        }
      }

      ws.onclose = () => {
        setIsConnected(false)
        onClose?.()
        if (reconnect) {
          reconnectTimer.current = setTimeout(connect, reconnectInterval)
        }
      }

      ws.onerror = () => {
        ws.close()
      }
    } catch {
      if (reconnect) {
        reconnectTimer.current = setTimeout(connect, reconnectInterval)
      }
    }
  }, [url, onMessage, onOpen, onClose, reconnect, reconnectInterval])

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
  }, [])

  const disconnect = useCallback(() => {
    if (reconnectTimer.current) clearTimeout(reconnectTimer.current)
    wsRef.current?.close()
  }, [])

  useEffect(() => {
    connect()
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current)
      wsRef.current?.close()
    }
  }, [connect])

  return { isConnected, send, disconnect }
}
