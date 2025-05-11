// 简单API服务器，仅用于解决前端连接问题
import http from 'http';

// 生成6位随机验证码
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] 收到请求: ${req.method} ${req.url}`);
  
  // 增强CORS设置，允许前端访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24小时
  
  // 处理OPTIONS请求 (预检请求)
  if (req.method === 'OPTIONS') {
    console.log(`处理OPTIONS预检请求: ${req.url}`);
    res.writeHead(200);
    res.end();
    return;
  }
  
  // 解析URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(`处理请求: ${req.method} ${url.pathname}`);
  
  // API测试端点
  if (url.pathname === '/api/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      success: true, 
      message: 'API服务正常运行' 
    }));
    console.log(`成功响应: /api/test`);
    return;
  }
  
  // 登录端点
  if (url.pathname === '/api/auth/login' && req.method === 'POST') {
    console.log(`处理登录请求...`);
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        console.log(`接收到登录请求数据: ${body}`);
        const data = JSON.parse(body);
        const { username, password } = data;
        
        if (!username || !password) {
          res.writeHead(400, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: false, message: '请提供用户名和密码' }));
          return;
        }
        
        // 验证管理员账户
        if (username === 'admin' && password === 'admin123') {
          console.log(`管理员登录成功: ${username}`);
          
          res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({
            success: true,
            message: '登录成功',
            token: 'admin-mock-token-123456',
            user: {
              id: 'admin-id',
              username: 'admin',
              email: 'admin@example.com',
              role: 'admin',
              isAdmin: true
            }
          }));
        } else {
          // 登录失败
          console.log(`登录失败: ${username}`);
          res.writeHead(401, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ 
            success: false, 
            message: '用户名或密码错误' 
          }));
        }
      } catch (error) {
        console.error(`处理登录请求时出错:`, error);
        res.writeHead(400, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ 
          success: false, 
          message: '请求格式错误',
          error: error.message
        }));
      }
    });
    return;
  }
  
  // 验证码发送端点
  if (url.pathname === '/api/auth/send-email-code' && req.method === 'POST') {
    console.log(`处理邮箱验证码请求...`);
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        console.log(`接收到请求数据: ${body}`);
        const data = JSON.parse(body);
        const email = data.email;
        
        if (!email) {
          console.log(`错误: 邮箱地址为空`);
          res.writeHead(400, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: false, message: '请提供邮箱地址' }));
          return;
        }
        
        // 生成验证码
        const code = generateCode();
        
        console.log(`======================================`);
        console.log(`注意: 这是开发环境，没有真实发送邮件`);
        console.log(`邮箱验证码(${email}): ${code}`);
        console.log(`请在前端使用此验证码: ${code}`);
        console.log(`======================================`);
        
        // 设置成功响应头
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        });
        
        // 返回标准格式的响应 - 在开发环境中直接返回验证码
        const response = { 
          success: true, 
          message: '开发环境: 验证码已生成（未真实发送邮件）',
          code: code, // 开发环境下返回验证码
          dev_note: '这是开发环境，没有真实发送邮件，请使用返回的验证码'
        };
        
        console.log(`成功响应:`, response);
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error(`处理验证码请求时出错:`, error);
        res.writeHead(400, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ 
          success: false, 
          message: '请求格式错误',
          error: error.message
        }));
      }
    });
    return;
  }
  
  // 添加验证邮箱端点
  if (url.pathname === '/api/auth/verify-email' && req.method === 'POST') {
    console.log(`处理邮箱验证请求...`);
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { email, code } = data;
        
        if (!email || !code) {
          res.writeHead(400, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: false, message: '请提供邮箱和验证码' }));
          return;
        }
        
        // 在实际应用中这里应该验证验证码是否正确
        // 为简单起见，我们假设所有验证都通过
        console.log(`验证邮箱成功: ${email}, 验证码: ${code}`);
        
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        });
        res.end(JSON.stringify({ 
          success: true, 
          message: '邮箱验证成功' 
        }));
      } catch (error) {
        console.error(`处理邮箱验证请求时出错:`, error);
        res.writeHead(400, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: false, message: '请求格式错误' }));
      }
    });
    return;
  }
  
  // 添加注册端点
  if (url.pathname === '/api/auth/register' && req.method === 'POST') {
    console.log(`处理注册请求...`);
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        console.log(`注册数据:`, userData);
        
        // 简单验证
        if (!userData.username || !userData.email || !userData.password) {
          res.writeHead(400, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ success: false, message: '请填写所有必填字段' }));
          return;
        }
        
        // 模拟注册成功
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ 
          success: true, 
          message: '注册成功',
          token: 'mock-jwt-token-for-development',
          user: {
            id: '12345',
            username: userData.username,
            email: userData.email,
            role: 'user'
          }
        }));
      } catch (error) {
        console.error(`处理注册请求时出错:`, error);
        res.writeHead(400, { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: false, message: '请求格式错误' }));
      }
    });
    return;
  }
  
  // 数据库管理API接口
  if (url.pathname === '/api/admin/db/info' && req.method === 'GET') {
    // 返回模拟数据库信息
    const dbInfo = {
      success: true,
      data: {
        type: 'SQLite',
        path: 'backend/data/scooter_rental.db',
        size: 1024 * 1024 * 2.5, // 2.5MB
        tables: ['users', 'user_roles', 'verification_tokens', 'scooters', 'scooter_models', 
                'maintenance_records', 'orders', 'payments', 'refunds', 'system_logs'],
        version: '3.36.0'
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dbInfo));
    console.log(`成功响应: /api/admin/db/info`);
    return;
  }

  if (url.pathname === '/api/admin/db/ping' && req.method === 'GET') {
    // 返回数据库连接状态
    const pingResult = {
      success: true,
      data: {
        status: 'connected',
        ping: 1, // 毫秒
        timestamp: new Date().toISOString()
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(pingResult));
    console.log(`成功响应: /api/admin/db/ping`);
    return;
  }

  if (url.pathname === '/api/admin/db/test-connection' && req.method === 'GET') {
    // 返回数据库连接测试结果
    const testResult = {
      success: true,
      data: {
        connected: true,
        message: '数据库连接测试成功',
        details: {
          dbType: 'SQLite',
          version: '3.36.0',
          readPermission: true,
          writePermission: true
        }
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(testResult));
    console.log(`成功响应: /api/admin/db/test-connection`);
    return;
  }

  if (url.pathname === '/api/admin/db/file-check' && req.method === 'GET') {
    // 返回数据库文件检查结果
    const fileCheckResult = {
      success: true,
      data: {
        exists: true,
        path: 'backend/data/scooter_rental.db',
        size: 1024 * 1024 * 2.5, // 2.5MB
        permissions: 'rw-r--r--',
        lastModified: new Date().toISOString()
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fileCheckResult));
    console.log(`成功响应: /api/admin/db/file-check`);
    return;
  }

  if (url.pathname.startsWith('/api/admin/db/table/') && url.pathname.endsWith('/data') && req.method === 'GET') {
    // 解析表名
    const pathParts = url.pathname.split('/');
    const tableName = pathParts[4];

    // 获取查询参数
    const params = new URLSearchParams(url.search);
    const page = parseInt(params.get('page') || '1');
    const limit = parseInt(params.get('limit') || '20');
    
    // 生成模拟数据
    const mockData = [];
    const total = 100; // 模拟总记录数
    
    // 根据不同表生成不同结构的模拟数据
    for (let i = (page - 1) * limit + 1; i <= Math.min(page * limit, total); i++) {
      if (tableName === 'users') {
        mockData.push({
          id: i,
          username: `user${i}`,
          email: `user${i}@example.com`,
          role: i % 4 === 0 ? 'admin' : 'user',
          status: i % 5 === 0 ? 'inactive' : 'active',
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
          lastLogin: new Date(Date.now() - i * 3600000).toISOString()
        });
      } else if (tableName === 'scooters') {
        mockData.push({
          id: i,
          code: `SCT-${1000 + i}`,
          model_id: i % 5 + 1,
          status: ['available', 'in_use', 'maintenance', 'damaged'][i % 4],
          battery_level: Math.floor(Math.random() * 100),
          latitude: 30 + Math.random(),
          longitude: 120 + Math.random(),
          last_maintenance: new Date(Date.now() - i * 30 * 86400000).toISOString(),
          created_at: new Date(Date.now() - i * 86400000).toISOString()
        });
      } else if (tableName === 'orders') {
        mockData.push({
          id: i,
          order_number: `ORD-${10000 + i}`,
          user_id: i % 20 + 1,
          scooter_id: i % 30 + 1,
          status: ['created', 'in_progress', 'completed', 'cancelled'][i % 4],
          start_time: new Date(Date.now() - i * 3600000).toISOString(),
          end_time: i % 4 === 2 ? new Date(Date.now() - i * 3600000 + 1800000).toISOString() : null,
          duration: i % 4 === 2 ? 30 : null,
          amount: Math.floor(5 + Math.random() * 20),
          payment_status: i % 4 === 2 ? 'paid' : 'pending',
          created_at: new Date(Date.now() - i * 3600000).toISOString()
        });
      } else {
        // 默认数据结构
        mockData.push({
          id: i,
          name: `Item ${i}`,
          description: `Description for item ${i}`,
          created_at: new Date(Date.now() - i * 86400000).toISOString()
        });
      }
    }
    
    const response = {
      success: true,
      data: {
        rows: mockData,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    console.log(`成功响应: ${url.pathname} (表: ${tableName})`);
    return;
  }

  if (url.pathname.startsWith('/api/admin/db/table/') && url.pathname.endsWith('/schema') && req.method === 'GET') {
    // 解析表名
    const pathParts = url.pathname.split('/');
    const tableName = pathParts[4];
    
    // 根据表名返回模拟的表结构
    let columns = [];
    
    if (tableName === 'users') {
      columns = [
        { name: 'id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 1 },
        { name: 'username', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'email', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'password', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'role', type: 'TEXT', notnull: 1, dflt_value: "'user'", pk: 0 },
        { name: 'status', type: 'TEXT', notnull: 1, dflt_value: "'active'", pk: 0 },
        { name: 'emailVerified', type: 'INTEGER', notnull: 0, dflt_value: "0", pk: 0 },
        { name: 'createdAt', type: 'DATETIME', notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
        { name: 'lastLogin', type: 'DATETIME', notnull: 0, dflt_value: null, pk: 0 }
      ];
    } else if (tableName === 'scooters') {
      columns = [
        { name: 'id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 1 },
        { name: 'code', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'model_id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'status', type: 'TEXT', notnull: 1, dflt_value: "'available'", pk: 0 },
        { name: 'battery_level', type: 'INTEGER', notnull: 1, dflt_value: "100", pk: 0 },
        { name: 'latitude', type: 'REAL', notnull: 0, dflt_value: null, pk: 0 },
        { name: 'longitude', type: 'REAL', notnull: 0, dflt_value: null, pk: 0 },
        { name: 'last_maintenance', type: 'DATETIME', notnull: 0, dflt_value: null, pk: 0 },
        { name: 'created_at', type: 'DATETIME', notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
        { name: 'updated_at', type: 'DATETIME', notnull: 0, dflt_value: null, pk: 0 }
      ];
    } else if (tableName === 'orders') {
      columns = [
        { name: 'id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 1 },
        { name: 'order_number', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'user_id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'scooter_id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'status', type: 'TEXT', notnull: 1, dflt_value: "'created'", pk: 0 },
        { name: 'start_time', type: 'DATETIME', notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 },
        { name: 'end_time', type: 'DATETIME', notnull: 0, dflt_value: null, pk: 0 },
        { name: 'duration', type: 'INTEGER', notnull: 0, dflt_value: null, pk: 0 },
        { name: 'amount', type: 'REAL', notnull: 1, dflt_value: "0", pk: 0 },
        { name: 'payment_status', type: 'TEXT', notnull: 1, dflt_value: "'pending'", pk: 0 },
        { name: 'created_at', type: 'DATETIME', notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 }
      ];
    } else {
      // 默认表结构
      columns = [
        { name: 'id', type: 'INTEGER', notnull: 1, dflt_value: null, pk: 1 },
        { name: 'name', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { name: 'description', type: 'TEXT', notnull: 0, dflt_value: null, pk: 0 },
        { name: 'created_at', type: 'DATETIME', notnull: 1, dflt_value: "CURRENT_TIMESTAMP", pk: 0 }
      ];
    }
    
    const response = {
      success: true,
      data: {
        table: tableName,
        columns: columns
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    console.log(`成功响应: ${url.pathname} (表: ${tableName})`);
    return;
  }

  if (url.pathname === '/api/admin/db/query' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const sql = data.sql;
        
        // 模拟SQL查询结果
        let result;
        if (sql.toLowerCase().startsWith('select')) {
          // 模拟查询结果
          result = [];
          for (let i = 1; i <= 5; i++) {
            result.push({
              id: i,
              name: `Result ${i}`,
              value: Math.floor(Math.random() * 100)
            });
          }
        } else {
          // 模拟修改操作结果
          result = {
            affectedRows: Math.floor(Math.random() * 10) + 1
          };
        }
        
        const response = {
          success: true,
          data: {
            sql: sql,
            result: result
          }
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
        console.log(`成功响应: /api/admin/db/query`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: '无效的请求数据: ' + error.message
        }));
        console.error(`错误响应: /api/admin/db/query - ${error.message}`);
      }
    });
    
    return;
  }

  if (url.pathname.startsWith('/api/admin/db/table/') && url.pathname.includes('/record/') && req.method === 'PUT') {
    // 处理更新记录请求
    const pathParts = url.pathname.split('/');
    const tableName = pathParts[4];
    const recordId = pathParts[6];
    
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        const response = {
          success: true,
          data: {
            id: recordId,
            ...data,
            updated_at: new Date().toISOString()
          },
          message: '记录更新成功'
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
        console.log(`成功响应: ${url.pathname} (表: ${tableName}, ID: ${recordId})`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: '无效的请求数据: ' + error.message
        }));
        console.error(`错误响应: ${url.pathname} - ${error.message}`);
      }
    });
    
    return;
  }

  if (url.pathname.startsWith('/api/admin/db/table/') && url.pathname.endsWith('/record') && req.method === 'POST') {
    // 处理添加记录请求
    const pathParts = url.pathname.split('/');
    const tableName = pathParts[4];
    
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        const response = {
          success: true,
          data: {
            id: Math.floor(Math.random() * 1000) + 1,
            ...data,
            created_at: new Date().toISOString()
          },
          message: '记录添加成功'
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
        console.log(`成功响应: ${url.pathname} (表: ${tableName})`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          message: '无效的请求数据: ' + error.message
        }));
        console.error(`错误响应: ${url.pathname} - ${error.message}`);
      }
    });
    
    return;
  }

  if (url.pathname.startsWith('/api/admin/db/table/') && url.pathname.includes('/record/') && req.method === 'DELETE') {
    // 处理删除记录请求
    const pathParts = url.pathname.split('/');
    const tableName = pathParts[4];
    const recordId = pathParts[6];
    
    const response = {
      success: true,
      data: {
        id: recordId
      },
      message: '记录删除成功'
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    console.log(`成功响应: ${url.pathname} (表: ${tableName}, ID: ${recordId})`);
    return;
  }

  if (url.pathname === '/api/admin/db/backup' && req.method === 'POST') {
    // 返回数据库备份结果
    const backupResult = {
      success: true,
      data: {
        backupPath: 'backend/backups/scooter_rental_' + new Date().toISOString().replace(/:/g, '-') + '.db',
        timestamp: new Date().toISOString(),
        size: 1024 * 1024 * 2.6, // 2.6MB
        message: '数据库备份成功'
      }
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(backupResult));
    console.log(`成功响应: /api/admin/db/backup`);
    return;
  }
  
  // 默认返回404
  console.log(`404: 找不到路径 ${url.pathname}`);
  res.writeHead(404, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify({ success: false, message: '接口不存在' }));
});

// 监听端口
const PORT = 8082;
server.listen(PORT, () => {
  console.log(`======================================`);
  console.log(`简易API服务器已启动: http://localhost:${PORT}`);
  console.log(`API测试: http://localhost:${PORT}/api/test`);
  console.log(`登录接口: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`验证码接口: POST http://localhost:${PORT}/api/auth/send-email-code`);
  console.log(`邮箱验证: POST http://localhost:${PORT}/api/auth/verify-email`);
  console.log(`注册接口: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`数据库信息接口: GET http://localhost:${PORT}/api/admin/db/info`);
  console.log(`数据库连接状态接口: GET http://localhost:${PORT}/api/admin/db/ping`);
  console.log(`数据库连接测试接口: GET http://localhost:${PORT}/api/admin/db/test-connection`);
  console.log(`数据库文件检查接口: GET http://localhost:${PORT}/api/admin/db/file-check`);
  console.log(`数据库表数据接口: GET http://localhost:${PORT}/api/admin/db/table/<table>/data`);
  console.log(`数据库表结构接口: GET http://localhost:${PORT}/api/admin/db/table/<table>/schema`);
  console.log(`数据库查询接口: POST http://localhost:${PORT}/api/admin/db/query`);
  console.log(`数据库记录更新接口: PUT http://localhost:${PORT}/api/admin/db/table/<table>/record/<id>`);
  console.log(`数据库记录添加接口: POST http://localhost:${PORT}/api/admin/db/table/<table>/record`);
  console.log(`数据库记录删除接口: DELETE http://localhost:${PORT}/api/admin/db/table/<table>/record/<id>`);
  console.log(`数据库备份接口: POST http://localhost:${PORT}/api/admin/db/backup`);
  console.log(`======================================`);
}); 