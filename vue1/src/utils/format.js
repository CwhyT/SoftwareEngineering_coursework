// Date formatting utility functions

/**
 * Format date to localized string
 * @param {string|Date} dateString - Date string or Date object to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Format date, showing only year, month and day
 * @param {string|Date} dateString - Date string or Date object to format
 * @returns {string} Formatted date string (YYYY-MM-DD)
 */
export const formatDateOnly = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Format time, showing only hours, minutes and seconds
 * @param {string|Date} dateString - Date string or Date object to format
 * @returns {string} Formatted time string (HH:MM:SS)
 */
export const formatTimeOnly = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Calculate relative time (e.g., "5 minutes ago", "2 hours ago")
 * @param {string|Date} dateString - Date string or Date object to calculate
 * @returns {string} Relative time description
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;

  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    return formatDateOnly(date);
  } else if (diffDay > 0) {
    return `${diffDay} days ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hours ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minutes ago`;
  } else {
    return 'Just now';
  }
}; 