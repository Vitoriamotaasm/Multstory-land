import { onBeforeUnmount, onMounted } from 'vue'

export function useEscapeKey(onEscape: () => void) {
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') onEscape()
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
