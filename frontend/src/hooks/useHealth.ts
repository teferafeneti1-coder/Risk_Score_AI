import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../api/client'

export type HealthStatus = 'loading' | 'online' | 'offline'

export function useHealth() {
  const query = useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    refetchInterval: 30_000,
    retry: 1,
  })

  const status: HealthStatus =
    query.isPending ? 'loading' :
    query.isError   ? 'offline' :
                      'online'

  return { status, data: query.data }
}
