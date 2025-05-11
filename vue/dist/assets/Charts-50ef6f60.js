import { r as ref, I as onMounted, aO as onUnmounted, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, aP as init, k as resolveComponent, o as openBlock } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Charts_vue_vue_type_style_index_0_scoped_f29d6965_lang = "";
const _hoisted_1 = { class: "chart-test-page p-6" };
const _hoisted_2 = { class: "bg-white rounded-lg shadow p-4 mb-6" };
const _hoisted_3 = { class: "flex justify-end mb-4" };
const _hoisted_4 = { class: "bg-white rounded-lg shadow p-4 mb-6" };
const _hoisted_5 = { class: "bg-white rounded-lg shadow p-4 mb-6" };
const _sfc_main = {
  __name: "Charts",
  setup(__props) {
    const lineChartRef = ref(null);
    const pieChartRef = ref(null);
    const barChartRef = ref(null);
    let lineChart = null;
    let pieChart = null;
    let barChart = null;
    const linePeriod = ref("7");
    function renderLineChart() {
      console.log("正在渲染折线图...");
      if (!lineChartRef.value)
        return;
      if (lineChart) {
        lineChart.dispose();
      }
      lineChart = init(lineChartRef.value);
      const days = parseInt(linePeriod.value);
      const dates = [];
      const totalData = [];
      const rentalData = [];
      const memberData = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = days - 1; i >= 0; i--) {
        const date = /* @__PURE__ */ new Date();
        date.setDate(today.getDate() - i);
        dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
        const total = Math.floor(Math.random() * 1e3) + 500;
        const rental = Math.floor(total * 0.7);
        const member = total - rental;
        totalData.push(total);
        rentalData.push(rental);
        memberData.push(member);
      }
      const option = {
        title: {
          text: "每日收入趋势",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["总收入", "租赁收入", "会员收入"],
          top: 30
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 80,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: dates
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "¥{value}"
          }
        },
        series: [
          {
            name: "总收入",
            type: "line",
            data: totalData,
            smooth: true,
            lineStyle: {
              width: 3
            },
            itemStyle: {
              color: "#409EFF"
            }
          },
          {
            name: "租赁收入",
            type: "line",
            data: rentalData,
            smooth: true,
            itemStyle: {
              color: "#67C23A"
            }
          },
          {
            name: "会员收入",
            type: "line",
            data: memberData,
            smooth: true,
            itemStyle: {
              color: "#E6A23C"
            }
          }
        ]
      };
      lineChart.setOption(option);
      console.log("折线图渲染完成");
    }
    function renderPieChart() {
      console.log("正在渲染饼图...");
      if (!pieChartRef.value)
        return;
      if (pieChart) {
        pieChart.dispose();
      }
      pieChart = init(pieChartRef.value);
      const option = {
        title: {
          text: "收入来源分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          top: 40,
          data: ["单次租赁", "会员订阅", "长时租赁", "优惠活动", "其他"]
        },
        series: [
          {
            name: "收入来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2
            },
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 18,
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: "单次租赁" },
              { value: 735, name: "会员订阅" },
              { value: 580, name: "长时租赁" },
              { value: 484, name: "优惠活动" },
              { value: 300, name: "其他" }
            ]
          }
        ]
      };
      pieChart.setOption(option);
      console.log("饼图渲染完成");
    }
    function renderBarChart() {
      console.log("正在渲染柱状图...");
      if (!barChartRef.value)
        return;
      if (barChart) {
        barChart.dispose();
      }
      barChart = init(barChartRef.value);
      const option = {
        title: {
          text: "各区域车辆使用量",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          top: 40,
          data: ["工作日", "周末"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: 80,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["市中心", "大学城", "科技园", "商业区", "居民区"]
        },
        yAxis: {
          type: "value",
          name: "使用次数",
          axisLabel: {
            formatter: "{value} 次"
          }
        },
        series: [
          {
            name: "工作日",
            type: "bar",
            data: [320, 302, 301, 334, 390],
            itemStyle: {
              color: "#409EFF"
            }
          },
          {
            name: "周末",
            type: "bar",
            data: [120, 132, 101, 134, 90],
            itemStyle: {
              color: "#FF9F43"
            }
          }
        ]
      };
      barChart.setOption(option);
      console.log("柱状图渲染完成");
    }
    function handleResize() {
      console.log("处理窗口大小变化");
      if (lineChart)
        lineChart.resize();
      if (pieChart)
        pieChart.resize();
      if (barChart)
        barChart.resize();
    }
    onMounted(() => {
      console.log("Charts组件已挂载");
      setTimeout(() => {
        renderLineChart();
        renderPieChart();
        renderBarChart();
      }, 300);
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      console.log("Charts组件已卸载");
      if (lineChart)
        lineChart.dispose();
      if (pieChart)
        pieChart.dispose();
      if (barChart)
        barChart.dispose();
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[4] || (_cache[4] = createBaseVNode("h1", { class: "text-2xl font-bold mb-6" }, "图表测试页面", -1)),
        createBaseVNode("div", _hoisted_2, [
          _cache[1] || (_cache[1] = createBaseVNode("h2", { class: "text-lg font-bold mb-4" }, "收入趋势折线图", -1)),
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_el_select, {
              modelValue: linePeriod.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => linePeriod.value = $event),
              size: "small",
              onChange: renderLineChart
            }, {
              default: withCtx(() => [
                createVNode(_component_el_option, {
                  label: "最近7天",
                  value: "7"
                }),
                createVNode(_component_el_option, {
                  label: "最近30天",
                  value: "30"
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          createBaseVNode("div", {
            ref_key: "lineChartRef",
            ref: lineChartRef,
            style: { "width": "100%", "height": "400px" }
          }, null, 512)
        ]),
        createBaseVNode("div", _hoisted_4, [
          _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-lg font-bold mb-4" }, "收入来源分布", -1)),
          createBaseVNode("div", {
            ref_key: "pieChartRef",
            ref: pieChartRef,
            style: { "width": "100%", "height": "400px" }
          }, null, 512)
        ]),
        createBaseVNode("div", _hoisted_5, [
          _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "text-lg font-bold mb-4" }, "各区域车辆使用量", -1)),
          createBaseVNode("div", {
            ref_key: "barChartRef",
            ref: barChartRef,
            style: { "width": "100%", "height": "400px" }
          }, null, 512)
        ])
      ]);
    };
  }
};
const Charts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f29d6965"]]);
export {
  Charts as default
};
//# sourceMappingURL=Charts-50ef6f60.js.map
