import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function usePush() {
  const router = useRouter()
  const push = (url) => router.push(url)
  return push
}

export function useRouteName() {
  const route = useRoute()
  const routeName = computed(()=> route.name)
  return routeName
}

export function useRef() {
  let ref = null;
  const computedRef = computed(() => ref)
  const setRef = el => { ref = el }
  return {
    computedRef,
    setRef
  }
}