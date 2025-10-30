// Common utility functions for date formatting, user info, and calculations

/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string or date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return "TBD";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return "Invalid Date";
  }
};

/**
 * Format a date to MMM DD, YYYY format (used in GeneralTable)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDateForTable = (dateInput) => {
  if (!dateInput) return "TBD";
  
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return "Invalid Date";
    
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
  } catch (error) {
    console.warn('Error formatting date for table:', error);
    return "Invalid Date";
  }
};

/**
 * Calculate days between today and a target date
 * @param {string} targetDate - Target date string
 * @returns {number|null} Number of days (positive = future, negative = past), null if invalid
 */
export const getDaysToRelease = (targetDate) => {
  if (!targetDate) return null;
  
  try {
    const today = new Date();
    const releaseDate = new Date(targetDate);
    
    if (isNaN(releaseDate.getTime())) return null;
    
    const diffTime = releaseDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    console.warn('Error calculating days to release:', error);
    return null;
  }
};

/**
 * Get user information by clerk ID (deprecated - use UsersProvider.getUserByClerkId instead)
 * @param {string} clerkId - Clerk user ID
 * @param {Array} users - Array of users from UsersProvider
 * @returns {Object} User info object with name, initials, avatar
 */
export const getUserInfo = (clerkId, users = []) => {
  const user = users.find(u => u.clerk_id === clerkId);
  
  if (!user) {
    return {
      name: "Unknown User",
      initials: "UU",
      avatar: null
    };
  }
  
  return {
    name: user.fullName,
    initials: generateInitials(user.fullName),
    avatar: user.image_url
  };
};

/**
 * Generate initials from a full name
 * @param {string} fullName - Full name string
 * @returns {string} Initials (e.g., "John Doe" -> "JD")
 */
export const generateInitials = (fullName) => {
  if (!fullName) return "??";
  return fullName.split(' ').map(n => n[0]).join('').toUpperCase();
};

/**
 * Calculate release health based on status and target date
 * @param {Object} release - Release object
 * @returns {number} Health percentage (0-100)
 */
export const calculateReleaseHealth = (release) => {
  if (!release) return 0;
  
  try {
    const baseHealth = 70;
    const statusBonus = release.status === 'rc' ? 20 : release.status === 'development' ? 10 : 0;
    const daysToRelease = getDaysToRelease(release.target_release_date);
    const daysBonus = Math.max(0, 20 - Math.abs(daysToRelease || 0));
    
    return Math.min(100, baseHealth + statusBonus + daysBonus);
  } catch (error) {
    console.warn('Error calculating release health:', error);
    return 0;
  }
};

export default {
  formatDate,
  formatDateForTable,
  getDaysToRelease,
  getUserInfo,
  generateInitials,
  calculateReleaseHealth,
};
