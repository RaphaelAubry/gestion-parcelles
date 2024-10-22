export default function sequence(start, stop, step) {
  return Array.from({ length: (stop - start) / step }, (_, i) => (start + i * step).toString())
}
