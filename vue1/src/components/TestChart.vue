<template>
  <div>
    <div style="width: 100%; height: 400px;">
      <e-charts :option="option" autoresize />
    </div>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import ECharts from 'vue-echarts';

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
]);

export default {
  components: {
    ECharts
  },
  data() {
    return {
      option: {
        title: {
          text: 'Test Chart'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirts', 'Sweaters', 'Chiffon', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [
          {
            name: 'Sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  }
};
</script> 