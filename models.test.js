// tests/models.test.js
const mongoose = require('mongoose');

const Coupon = require('../models/Coupon');
const Feedback = require('../models/Feedback');
const Maintenance = require('../models/Maintenance');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Scooter = require('../models/Scooter');
const User = require('../models/User');
const VerificationRecord = require('../models/VerificationRecord');

// Connect to in-memory test database before tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clean up data after each test
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

// Disconnect after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Model Tests', () => {
  test('Create and save a coupon', async () => {
    const coupon = new Coupon({ code: 'DISCOUNT10', type: 'percentage', value: 10, startDate: new Date(), endDate: new Date() });
    const savedCoupon = await coupon.save();
    expect(savedCoupon._id).toBeDefined();
    expect(savedCoupon.code).toBe('DISCOUNT10');
  });

  test('Create and save feedback', async () => {
    const feedback = new Feedback({ user: mongoose.Types.ObjectId(), order: mongoose.Types.ObjectId(), type: 'complaint', title: 'Issue', content: 'Problem description' });
    const savedFeedback = await feedback.save();
    expect(savedFeedback.type).toBe('complaint');
  });

  test('Create maintenance record', async () => {
    const maintenance = new Maintenance({ scooter: mongoose.Types.ObjectId(), maintenanceType: 'repair', description: 'Brake issues' });
    const savedMaintenance = await maintenance.save();
    expect(savedMaintenance.maintenanceType).toBe('repair');
  });

  test('Create an order', async () => {
    const order = new Order({
      user: mongoose.Types.ObjectId(),
      scooter: mongoose.Types.ObjectId(),
      startTime: new Date(),
      startLocation: { coordinates: [116.4, 39.9] },
      totalAmount: 100,
      paymentMethod: 'credit_card'
    });
    const savedOrder = await order.save();
    expect(savedOrder.totalAmount).toBe(100);
  });

  test('Create payment record', async () => {
    const payment = new Payment({
      order: mongoose.Types.ObjectId(),
      user: mongoose.Types.ObjectId(),
      amount: 100,
      paymentMethod: 'alipay'
    });
    const savedPayment = await payment.save();
    expect(savedPayment.paymentMethod).toBe('alipay');
  });

  test('Create scooter', async () => {
    const scooter = new Scooter({ scooterId: 'S123', batteryLevel: 100, location: { latitude: 39.9, longitude: 116.4 } });
    const savedScooter = await scooter.save();
    expect(savedScooter.scooterId).toBe('S123');
  });

  test('Create user', async () => {
    const user = new User({ name: 'Test User', username: 'testuser', email: 'test@example.com', password: '123456' });
    const savedUser = await user.save();
    expect(savedUser.email).toBe('test@example.com');
  });

  test('Create verification record', async () => {
    const record = new VerificationRecord({ type: 'email', recipient: 'test@example.com', code: '123456', expires: new Date(Date.now() + 3600000) });
    const savedRecord = await record.save();
    expect(savedRecord.recipient).toBe('test@example.com');
  });
});
