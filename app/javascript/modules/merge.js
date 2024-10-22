export default function merge(object) {
  return Object.keys(object).map((key)=> `${key}=${object[key]}` ).join('&')
}
