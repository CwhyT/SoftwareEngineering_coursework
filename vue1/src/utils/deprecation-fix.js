/**
 * Empty patch file for browser compatibility fixes
 * 
 * Originally attempted to fix util._extend deprecation warning, but in browser environment
 * Node.js core modules are externalized by Vite, cannot be accessed directly
 */

// No longer attempting to directly modify util module
console.log('Skipping Node.js specific patches in browser environment');

export default {}; 