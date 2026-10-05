import { onBeforeUnmount, onMounted } from 'vue'

export function useBodyScrollLock() {
  let previousOverflow = ''

  onMounted(() => {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = previousOverflow
  })
}
