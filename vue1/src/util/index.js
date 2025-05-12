/**
 * 浏览器环境下的util模块替代实现
 * 提供常用的util功能，避免依赖Node.js特有API
 */

// 提供Object.assign作为_extend的替代
export const _extend = (target, source) => {
  console.warn('util._extend已弃用，请使用Object.assign()代替');
  return Object.assign(target, source);
};

// 其他可能需要的util功能...
export const isArray = Array.isArray;
export const isObject = obj => obj !== null && typeof obj === 'object';
export const isString = str => typeof str === 'string';
export const isNumber = num => typeof num === 'number';
export const isBoolean = bool => typeof bool === 'boolean';
export const isFunction = fn => typeof fn === 'function';

// 默认导出所有工具函数
export default {
  _extend,
  isArray,
  isObject,
  isString,
  isNumber,
  isBoolean,
  isFunction
}; 