import { onMounted, onUnmounted } from 'vue'

/**
 * event-type: string
 * 
 * handler: function
 */
export function useEvent(eventType,handler) {
  onMounted(()=>{
    window.addEventListener(eventType,handler)
  })
  onUnmounted(()=>{
    window.removeEventListener(eventType,handler)
  })
}

//resize observer
export function useResizeObserver(handler,dom) {
  const resizeob = new ResizeObserver(entries => {
    entries.forEach(entry => {
      handler()
    })
  })
  onMounted(()=>{
    resizeob.observe(dom)
  })
  onUnmounted(()=>{
    resizeob.unobserve(dom)
  })
}

//intersection observer
export function useIntersectionObserver(handler,dom) {
  const intersectionob = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      handler()
    })
  })
  onMounted(()=>{
    intersectionob.observe(dom)
  })
  onUnmounted(()=>{
    intersectionob.unobserve(dom)
  })
}

