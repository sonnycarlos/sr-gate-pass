/**
 ** This function formats time
**/

export default function formatTime(dateString) {
  const options = { hour12: true, hour: 'numeric', minute: 'numeric' }
  const date = new Date(dateString)
  const time = date.toLocaleTimeString(undefined, options).toLowerCase()

  return time
}