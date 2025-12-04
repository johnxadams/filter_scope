import { onMounted, onUpdated, onUnmounted, nextTick } from 'vue'

export function useIntersectionObserver(
  itemRefs,
  // default options:threshold  triggers when 50% of the element is visible, rootMargin ensures early loading at 400px
  // the rootMargin macht derzeit dass wir die animation nicht vernehmen
  options = { threshold: 0.5, rootMargin: '400px' },
  animateClasses = ['animate-fadeInUp', 'text-red-700'],
) {
  let observer = null
  // der observeItems function sorgt dafür, dass alle referenzierten Elemente vom Observer beobachtet werden
  const observeItems = async () => {
    // Sicherstellen, dass das DOM aktualisiert ist, bevor die Elemente beobachtet werden
    await nextTick()
    itemRefs.value.forEach((comp) => {
      const elementRef = comp?.cardRef
      if (!elementRef) return
      // wenn das element bereits beobachtet wird, wird es nicht erneut hinzugefügt
      observer.observe(elementRef)
    })
  }

  onMounted(() => {
    // Instanzierung des IntersectionObservers sorgt dafür, dass die Animationen nur ausgelöst werden, wenn die Elemente in den Viewport kommen
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add(...animateClasses)
        entry.target.classList.remove('opacity-0')
        // hier wird das Element nach der Animation vom Observer getrennt, um unnötige Beobachtungen zu vermeiden
        observer.unobserve(entry.target)
      })
    }, options)

    observeItems()
  })

  // mit onUpdated wird sichergestellt, dass neu hinzugefügte/entfernte elemente nach Aktualisierungen des Komponentenstatus von dem Observer erfasst werden
  onUpdated(() => {
    observeItems()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
