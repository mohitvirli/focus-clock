export const formatTitle = (currentTime: Date) => {
  // Format time as HH:MM:SS
  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  // Calculate percentage of time left in current hour
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  const totalSecondsInHour = 60 * 60 // 3600 seconds
  const elapsedSeconds = (minutes * 60) + seconds
  const remainingSeconds = totalSecondsInHour - elapsedSeconds
  const percentageLeft = Math.round((remainingSeconds / totalSecondsInHour) * 100)

  return `${timeString} • ${percentageLeft}% left`
}
