// Currency formatting utilities

/**
 * Formats currency values by replacing currency codes with symbols and adding spaces
 * @param {string} value - The currency value to format
 * @returns {string} - Formatted currency value
 */
export const formatCurrency = (value) => {
  if (!value) return value;
  
  // Replace currency codes with symbols
  let formattedValue = value
    .replace(/INR/g, '₹')
    .replace(/USD/g, '$')
    .replace(/EUR/g, '€')
    .replace(/GBP/g, '£')
    .replace(/JPY/g, '¥');
  
  // Add space after currency symbol if not already present
  formattedValue = formattedValue.replace(/([₹$€£¥])([0-9])/g, '$1 $2');
  
  return formattedValue;
};

/**
 * Checks if a currency value is negative
 * @param {string} value - The value to check
 * @returns {boolean} - True if the value is negative
 */
export const isNegativeCurrency = (value) => {
  if (typeof value === 'string') {
    return value.includes('-') || 
           value.startsWith('INR-') || 
           value.startsWith('₹-') ||
           value.startsWith('$-') ||
           value.startsWith('€-') ||
           value.startsWith('£-') ||
           value.startsWith('¥-');
  }
  return false;
};

/**
 * Formats a numeric currency value with proper symbol and spacing
 * @param {string|number} value - The numeric value to format
 * @param {string} currency - The currency code (INR, USD, etc.)
 * @returns {string} - Formatted currency string
 */
export const formatNumericCurrency = (value, currency = 'INR') => {
  const numValue = parseFloat(value.toString().replace(/[,\-]/g, ''));
  const isNegative = value.toString().includes('-');
  
  const symbol = currency === 'INR' ? '₹' : 
                 currency === 'USD' ? '$' :
                 currency === 'EUR' ? '€' :
                 currency === 'GBP' ? '£' :
                 currency === 'JPY' ? '¥' : currency;
  
  return `${isNegative ? '-' : ''}${symbol} ${Math.abs(numValue).toLocaleString()}`;
};

/**
 * Parses text with bold formatting patterns and returns structured data
 * @param {string} text - The text to parse
 * @returns {Array} - Array of objects with type and content
 */
export const parseFormattedText = (text) => {
  if (!text) return [{ type: 'text', content: text }];
  
  // Split by **bold** patterns and return structured data
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // This is bold text - remove the ** markers
      const boldText = part.slice(2, -2);
      return {
        type: 'bold',
        content: boldText,
        key: index
      };
    }
    return {
      type: 'text',
      content: part,
      key: index
    };
  });
};
