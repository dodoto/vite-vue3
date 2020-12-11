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