import { useCallback, useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const MIN_LOADING_TIME = 1200

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const startedAt = performance.now()

    async function cargar() {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as T
        const elapsed = performance.now() - startedAt
        const remaining = MIN_LOADING_TIME - elapsed

        if (remaining > 0) {
          await new Promise<void>((resolve, reject) => {
            const timeout = window.setTimeout(resolve, remaining)
            controller.signal.addEventListener(
              'abort',
              () => {
                window.clearTimeout(timeout)
                reject(new DOMException('Petición cancelada', 'AbortError'))
              },
              { once: true },
            )
          })
        }

        setState({ data: json, loading: false, error: null })
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Error desconocido',
        })
      }
    }

    cargar()
    return () => controller.abort()
  }, [url, reloadKey])

  const refetch = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }))
    setReloadKey((k) => k + 1)
  }, [])

  return { ...state, refetch }
}
