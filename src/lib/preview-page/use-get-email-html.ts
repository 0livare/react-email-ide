import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import type { ResponseData } from '~/pages/api/generate-email-html'
import { useClearCacheAtInterval } from '../use-clear-cache-at-interval'

export function useGetEmailHtml() {
  const router = useRouter()
  const { data, ...rest } = useQuery('email', () => getHtml(router.query.componentName as string), {
    enabled: !!router.query.componentName,
  })
  useClearCacheAtInterval('email')

  const { rawHtml, html, errors } = data || {}
  return { rawHtml, html, errors, ...rest }
}

async function getHtml(componentName: string) {
  const res = await fetch(`/api/generate-email-html?componentName=${componentName}`)
  return res.json() as ResponseData
}
