/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-05-05 22:08:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-05-05 22:09:35
 * @FilePath: \undefinedc:\Users\86139\Desktop\backend\backend\test\routes.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const request = require('supertest');
const app = require('../app'); // 入口

describe('Auth Routes', () => {
  test('Register should return 200 or 400', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testUser',
      email: 'test@example.com',
      password: '123456'
    });
    expect([200, 400]).toContain(res.statusCode);
  });

  test('Login should return 200 or 401', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: '123456'
    });
    expect([200, 401]).toContain(res.statusCode);
  });
});

describe('Account Routes', () => {
  test('Balance endpoint should reject unauthorized access', async () => {
    const res = await request(app).get('/api/accounts/balance');
    expect(res.statusCode).toBe(401);
  });
});

describe('Admin Routes', () => {
  test('Get verification records should return 401 without token', async () => {
    const res = await request(app).get('/api/admin/verification-records');
    expect([401, 403]).toContain(res.statusCode);
  });
});

describe('Coupon Routes', () => {
  test('Get my coupons should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/coupons/my-coupons');
    expect(res.statusCode).toBe(401);
  });
});

describe('Feedback Routes', () => {
  test('Submit feedback requires login', async () => {
    const res = await request(app).post('/api/feedback').send({
      title: 'Bug Report',
      content: 'Something went wrong'
    });
    expect(res.statusCode).toBe(401);
  });
});

describe('Maintenance Routes', () => {
  test('Admin-only route: create maintenance requires token', async () => {
    const res = await request(app).post('/api/maintenance').send({});
    expect([401, 403]).toContain(res.statusCode);
  });
});

describe('Order Routes', () => {
  test('Create order requires token', async () => {
    const res = await request(app).post('/api/orders').send({});
    expect(res.statusCode).toBe(401);
  });
});

describe('Payment Routes', () => {
  test('Create payment requires token', async () => {
    const res = await request(app).post('/api/payments').send({});
    expect(res.statusCode).toBe(401);
  });
});

describe('Scooter Routes (Protected)', () => {
  test('GET /api/scooters/ - should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/scooters');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/scooters/nearby - should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/scooters/nearby');
    expect(res.statusCode).toBe(401);
  });
});

describe('Test Routes', () => {
  test('GET /api/test/ - should return success status', async () => {
    const res = await request(app).get('/api/test');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/测试路由正常工作/);
  });

  test('GET /api/test/test-email-config - should return status key', async () => {
    const res = await request(app).get('/api/test/test-email-config');
    expect([200, 500]).toContain(res.statusCode);
    expect(res.body.status).toBeDefined();
  });
});

describe('Users Routes (Admin & Auth required)', () => {
  test('GET /api/users/ - should return 401 if no token', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/users/stats - should return 401 if no token', async () => {
    const res = await request(app).get('/api/users/stats');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/users/test - should return test success', async () => {
    const res = await request(app).get('/api/users/test');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/用户API测试成功/);
  });
});

