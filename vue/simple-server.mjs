/**
 * 纯Node.js服务器
 * 不依赖任何第三方模块，完全使用Node.js核心模块
 * 解决ETIMEDOUT连接超时问题
 */

import 'dotenv/config';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

// 获取__dirname (ES模块中没有直接提供)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 服务器端口配置
const PORT = process.env.PORT || 8083;

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // ... existing code ...
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`服务器正在运行: http://localhost:${PORT}`);
  console.log(`API测试: http://localhost:${PORT}/api/test`);
  console.log('-----------------------------------');
  console.log('管理员账号: admin');
  console.log('管理员密码: admin123');
  console.log('-----------------------------------');
});