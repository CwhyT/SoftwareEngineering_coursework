<template>
  <div class="revenue-page">
    <h1 class="title">收入统计</h1>
    
    <div class="filter-bar">
      <div class="filter-group">
        <span class="filter-label">时间范围:</span>
        <select class="filter-select">
          <option value="today">今天</option>
          <option value="yesterday">昨天</option>
          <option value="this-week">本周</option>
          <option value="last-week">上周</option>
          <option value="this-month">本月</option>
          <option value="last-month">上月</option>
          <option value="custom">自定义...</option>
        </select>
      </div>
      
      <div class="filter-group">
        <span class="filter-label">显示方式:</span>
        <select class="filter-select">
          <option value="daily">按日</option>
          <option value="weekly">按周</option>
          <option value="monthly">按月</option>
        </select>
      </div>
      
      <button class="export-btn">导出报表</button>
    </div>

    <div class="stats-cards">
      <div class="stat-card primary">
        <div class="stat-icon">¥</div>
        <div class="stat-content">
          <div class="stat-number">15,230</div>
          <div class="stat-label">总收入</div>
        </div>
        <div class="stat-change up">+8.5%</div>
      </div>

      <div class="stat-card secondary">
        <div class="stat-icon">🛴</div>
        <div class="stat-content">
          <div class="stat-number">312</div>
          <div class="stat-label">订单数</div>
        </div>
        <div class="stat-change up">+12.3%</div>
      </div>

      <div class="stat-card success">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <div class="stat-number">¥48.80</div>
          <div class="stat-label">平均订单金额</div>
        </div>
        <div class="stat-change down">-2.1%</div>
      </div>

      <div class="stat-card warning">
        <div class="stat-icon">⏱️</div>
        <div class="stat-content">
          <div class="stat-number">58分钟</div>
          <div class="stat-label">平均租赁时长</div>
        </div>
        <div class="stat-change up">+5.7%</div>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-header">
        <h2 class="chart-title">收入趋势</h2>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color" style="background-color: #3498db;"></div>
            <div class="legend-label">收入</div>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #2ecc71;"></div>
            <div class="legend-label">订单数</div>
          </div>
        </div>
      </div>
      <div class="chart-placeholder">
        <!-- 实际项目中这里会放图表组件 -->
        <div class="chart-mockup">
          <div class="chart-bars">
            <div class="chart-bar" style="height: 30%;"></div>
            <div class="chart-bar" style="height: 45%;"></div>
            <div class="chart-bar" style="height: 60%;"></div>
            <div class="chart-bar" style="height: 40%;"></div>
            <div class="chart-bar" style="height: 55%;"></div>
            <div class="chart-bar" style="height: 75%;"></div>
            <div class="chart-bar" style="height: 65%;"></div>
          </div>
          <div class="chart-line"></div>
        </div>
      </div>
    </div>

    <div class="secondary-charts">
      <div class="chart-container">
        <div class="chart-header">
          <h2 class="chart-title">支付方式分布</h2>
        </div>
        <div class="chart-placeholder pie-chart">
          <!-- 实际项目中这里会放饼图组件 -->
          <div class="pie-mockup">
            <div class="pie-slice" style="transform: rotate(0deg); background-color: #3498db;"></div>
            <div class="pie-slice" style="transform: rotate(120deg); background-color: #2ecc71;"></div>
            <div class="pie-slice" style="transform: rotate(250deg); background-color: #e74c3c;"></div>
          </div>
          <div class="pie-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #3498db;"></div>
              <div class="legend-label">支付宝 (45%)</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #2ecc71;"></div>
              <div class="legend-label">微信支付 (35%)</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #e74c3c;"></div>
              <div class="legend-label">余额支付 (20%)</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <div class="chart-header">
          <h2 class="chart-title">热门租赁地点</h2>
        </div>
        <div class="chart-placeholder">
          <table class="data-table small">
            <thead>
              <tr>
                <th>地点</th>
                <th>订单数</th>
                <th>收入</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>科技园区</td>
                <td>87</td>
                <td>¥3,480</td>
              </tr>
              <tr>
                <td>大学城</td>
                <td>65</td>
                <td>¥2,600</td>
              </tr>
              <tr>
                <td>中央公园</td>
                <td>58</td>
                <td>¥2,320</td>
              </tr>
              <tr>
                <td>商业中心</td>
                <td>45</td>
                <td>¥1,800</td>
              </tr>
              <tr>
                <td>滨海地区</td>
                <td>32</td>
                <td>¥1,280</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div class="chart-container">
      <div class="chart-header">
        <h2 class="chart-title">每日收入明细</h2>
      </div>
      <div class="chart-placeholder">
        <table class="data-table">
          <thead>
            <tr>
              <th>日期</th>
              <th>订单数</th>
              <th>会员订单</th>
              <th>普通订单</th>
              <th>总收入</th>
              <th>平均金额</th>
              <th>同比</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023-05-01</td>
              <td>45</td>
              <td>18</td>
              <td>27</td>
              <td>¥2,250</td>
              <td>¥50.00</td>
              <td><span class="change-indicator up">+12%</span></td>
            </tr>
            <tr>
              <td>2023-05-02</td>
              <td>38</td>
              <td>15</td>
              <td>23</td>
              <td>¥1,900</td>
              <td>¥50.00</td>
              <td><span class="change-indicator up">+8%</span></td>
            </tr>
            <tr>
              <td>2023-05-03</td>
              <td>52</td>
              <td>22</td>
              <td>30</td>
              <td>¥2,600</td>
              <td>¥50.00</td>
              <td><span class="change-indicator up">+15%</span></td>
            </tr>
            <tr>
              <td>2023-05-04</td>
              <td>41</td>
              <td>16</td>
              <td>25</td>
              <td>¥2,050</td>
              <td>¥50.00</td>
              <td><span class="change-indicator down">-3%</span></td>
            </tr>
            <tr>
              <td>2023-05-05</td>
              <td>47</td>
              <td>21</td>
              <td>26</td>
              <td>¥2,350</td>
              <td>¥50.00</td>
              <td><span class="change-indicator up">+5%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.revenue-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 8px;
  color: #666;
  white-space: nowrap;
}

.filter-select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.export-btn {
  background-color: #16a085;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  white-space: nowrap;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .stats-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-card.primary {
  border-left: 4px solid #3498db;
}

.stat-card.secondary {
  border-left: 4px solid #9b59b6;
}

.stat-card.success {
  border-left: 4px solid #2ecc71;
}

.stat-card.warning {
  border-left: 4px solid #f1c40f;
}

.stat-icon {
  font-size: 1.8rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #34495e;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 3px;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.85rem;
}

.stat-change {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 3px 6px;
  border-radius: 12px;
}

.stat-change.up {
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.1);
}

.stat-change.down {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.chart-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.chart-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 6px;
}

.legend-label {
  font-size: 0.85rem;
  color: #7f8c8d;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chart-mockup {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 30px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.chart-bar {
  width: 40px;
  background-color: rgba(52, 152, 219, 0.7);
  border-radius: 4px 4px 0 0;
}

.chart-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #2ecc71;
  bottom: 80px;
  z-index: 1;
}

.secondary-charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .secondary-charts {
    grid-template-columns: 1fr 1fr;
  }
}

.pie-chart {
  align-items: flex-start;
}

.pie-mockup {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ecf0f1;
  overflow: hidden;
}

.pie-slice {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%);
}

.pie-legend {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table.small {
  font-size: 0.9rem;
}

.data-table th, 
.data-table td {
  padding: 10px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f9f9f9;
  font-weight: 500;
}

.change-indicator {
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.85rem;
}

.change-indicator.up {
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.1);
}

.change-indicator.down {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}
</style>