/**
 ** This function formats date
**/

export default function formatDate(date) {
  const today = new Date()
  const targetDate = new Date(date)
  const isSameYear = today.getFullYear() === targetDate.getFullYear()

  return targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: isSameYear ? undefined : 'numeric',
  })
}