import { computed } from 'vue'
//ref的收集顺序是从上到下,从里到外
export function useRef() {
  let el = null
  let ref = computed(() => el)
  const setRef = ele => { el = ele }
  return {
    ref,
    setRef
  }
}

export function useRefs() {
  let refs = []
  const setRefs = el => {
    refs.push(el)
  }
  return {
    refs,
    setRefs
  }
}