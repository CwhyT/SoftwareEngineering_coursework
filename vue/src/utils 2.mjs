// 简化版utils.mjs - 日期时间工具函数
import * as dayjsModule from '/node_modules/dayjs/dayjs.min.js';
const dayjs = dayjsModule.default || dayjsModule;

// 日期格式化函数
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';
  try {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  } catch (e) {
    console.error('Date formatting error:', e);
    return '';
  }
};

// 时间格式化函数
export const formatTime = (date, format = 'HH:mm:ss') => {
  if (!date) return '';
  try {
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  } catch (e) {
    console.error('Time formatting error:', e);
    return '';
  }
};

// 日期时间格式化函数
export const formatDateTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '';
  try {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  } catch (e) {
    console.error('DateTime formatting error:', e);
    return '';
  }
};

// 获取相对时间（例如：3小时前，2天前）
export const fromNow = (date) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) return `${diffDay}天前`;
    if (diffHour > 0) return `${diffHour}小时前`;
    if (diffMin > 0) return `${diffMin}分钟前`;
    return '刚刚';
  } catch (e) {
    console.error('FromNow calculation error:', e);
    return '';
  }
};

// 计算两个日期之间的差异（天数）
export const diffDays = (date1, date2) => {
  if (!date1 || !date2) return 0;
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = d1 - d2;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  } catch (e) {
    console.error('DiffDays calculation error:', e);
    return 0;
  }
};

// 计算两个日期之间的差异（小时）
export const diffHours = (date1, date2) => {
  if (!date1 || !date2) return 0;
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = d1 - d2;
    return Math.floor(diffMs / (1000 * 60 * 60));
  } catch (e) {
    console.error('DiffHours calculation error:', e);
    return 0;
  }
};

// 计算两个日期之间的差异（分钟）
export const diffMinutes = (date1, date2) => {
  if (!date1 || !date2) return 0;
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = d1 - d2;
    return Math.floor(diffMs / (1000 * 60));
  } catch (e) {
    console.error('DiffMinutes calculation error:', e);
    return 0;
  }
};

// 添加天数
export const addDays = (date, days) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  } catch (e) {
    console.error('AddDays calculation error:', e);
    return '';
  }
};

// 添加小时
export const addHours = (date, hours) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d;
  } catch (e) {
    console.error('AddHours calculation error:', e);
    return '';
  }
};

// 是否为同一天
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  } catch (e) {
    console.error('IsSameDay calculation error:', e);
    return false;
  }
}; 