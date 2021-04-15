import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function usePush() {
  const router = useRouter()
  const push = (url) => router.push(url)
  return push
}

export function useRouteName() {
  const route = useRoute()
  const routeName = computed(() => route.name)
  return routeName
}

export function useRoutes() {
  const routes = useRouter().options.routes
  return routes
}