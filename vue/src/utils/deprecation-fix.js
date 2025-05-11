/**
 * 修复浏览器兼容性问题的空补丁文件
 * 
 * 原本尝试修复util._extend的弃用警告，但在浏览器环境下
 * Node.js核心模块被Vite外部化处理，无法直接访问
 */

// 不再尝试直接修改util模块
console.log('浏览器环境下，跳过Node.js特定补丁');

export default {}; 