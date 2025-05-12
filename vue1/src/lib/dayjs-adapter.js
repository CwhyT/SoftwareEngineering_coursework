// dayjs适配器 - 提供默认导出
// 这个文件解决了dayjs.min.js没有提供默认导出的问题

// 使用传统方式导入dayjs（会将dayjs添加到window对象）
import '/node_modules/dayjs/dayjs.min.js';

// 获取window上的全局对象并导出为默认
const dayjs = window.dayjs;

// 提供默认导出
export default dayjs; 