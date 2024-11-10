export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // If hour is 0, set to 12
  
    return `${padZero(hours)}:${minutes} ${amPm}`;
  }
  
  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }
  