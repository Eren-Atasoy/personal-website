import { GRADIENT_COLORS } from './constants';

/**
 * Generate a hash from a string
 * @param {string} str - Input string
 * @returns {number} Hash value
 */
export const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

/**
 * Generate a consistent gradient pair based on a title
 * @param {string} title - Title to generate gradient from
 * @returns {Array<string>} Array of two hex colors
 */
export const generateGradient = (title) => {
  const hash = hashString(title);
  return GRADIENT_COLORS[hash % GRADIENT_COLORS.length];
};

/**
 * Create a CSS gradient string
 * @param {string} title - Title to generate gradient from
 * @param {number} angle - Gradient angle in degrees (default: 135)
 * @returns {string} CSS gradient string
 */
export const generateGradientStyle = (title, angle = 135) => {
  const [color1, color2] = generateGradient(title);
  return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
};

