import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

export function useClearCacheAtInterval(queryKey: string, interval: number = 5000) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const id = setInterval(() => {
      // console.info(`Refreshing ${queryKey}`)
      queryClient.invalidateQueries(queryKey)
    }, interval)

    return () => clearInterval(id)
  }, [queryClient, queryKey, interval])
}
