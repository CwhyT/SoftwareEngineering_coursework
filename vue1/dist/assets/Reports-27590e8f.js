import { aF as use, aG as install, aH as install$1, aI as install$2, aJ as install$3, aK as install$4, aL as install$5, aM as install$6, aN as install$7, r as ref, I as onMounted, aO as onUnmounted, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, f as createCommentVNode, aP as init, k as resolveComponent, o as openBlock, e as unref, aQ as loading_default } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Reports_vue_vue_type_style_index_0_scoped_e01497e7_lang = "";
const _hoisted_1 = { class: "reports-page p-6" };
const _hoisted_2 = { class: "bg-white rounded-lg shadow p-4 mb-8" };
const _hoisted_3 = { class: "flex justify-between items-center mb-4" };
const _hoisted_4 = {
  key: 0,
  class: "flex justify-center items-center",
  style: { "height": "450px" }
};
const _hoisted_5 = { class: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" };
const _hoisted_6 = { class: "bg-white rounded-lg shadow p-4" };
const _hoisted_7 = {
  key: 0,
  class: "flex justify-center items-center",
  style: { "height": "350px" }
};
const _hoisted_8 = { class: "bg-white rounded-lg shadow p-4" };
const _hoisted_9 = {
  key: 0,
  class: "flex justify-center items-center",
  style: { "height": "350px" }
};
const _hoisted_10 = { class: "bg-white rounded-lg shadow p-4 mb-6" };
const _hoisted_11 = {
  key: 0,
  class: "flex justify-center items-center",
  style: { "height": "450px" }
};
const _sfc_main = {
  __name: "Reports",
  setup(__props) {
    use([
      install,
      install$1,
      install$2,
      install$3,
      install$4,
      install$5,
      install$6,
      install$7
    ]);
    const incomeChartEl = ref(null);
    const areaChartEl = ref(null);
    const sourceChartEl = ref(null);
    const userChartEl = ref(null);
    let incomeChart = null;
    let areaChart = null;
    let sourceChart = null;
    let userChart = null;
    const incomePeriod = ref("7");
    const incomeLoading = ref(true);
    const areaLoading = ref(true);
    const sourceLoading = ref(true);
    const userLoading = ref(true);
    function initializeCharts() {
      console.log("正在初始化所有图表...");
      setTimeout(() => {
        if (incomeChartEl.value) {
          incomeChart = init(incomeChartEl.value);
          renderIncomeChart();
        }
        if (areaChartEl.value) {
          areaChart = init(areaChartEl.value);
          renderAreaChart();
        }
        if (sourceChartEl.value) {
          sourceChart = init(sourceChartEl.value);
          renderSourceChart();
        }
        if (userChartEl.value) {
          userChart = init(userChartEl.value);
          renderUserChart();
        }
      }, 800);
    }
    function renderIncomeChart() {
      console.log("渲染收入趋势图表");
      if (!incomeChart)
        return;
      incomeLoading.value = true;
      const days = parseInt(incomePeriod.value);
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
          left: "center",
          top: 10,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["总收入", "租赁收入", "会员收入"],
          top: 40,
          left: "center"
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: 100,
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
            type: "bar",
            stack: "income",
            data: rentalData,
            itemStyle: {
              color: "#67C23A"
            }
          },
          {
            name: "会员收入",
            type: "bar",
            stack: "income",
            data: memberData,
            itemStyle: {
              color: "#E6A23C"
            }
          }
        ]
      };
      incomeChart.setOption(option);
      incomeLoading.value = false;
    }
    function renderAreaChart() {
      console.log("渲染区域使用量图表");
      if (!areaChart)
        return;
      areaLoading.value = true;
      const option = {
        title: {
          text: "各区域使用量分布",
          left: "center",
          top: 10,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["工作日", "周末"],
          top: 40,
          left: "center"
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: 90,
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
      areaChart.setOption(option);
      areaLoading.value = false;
    }
    function renderSourceChart() {
      console.log("渲染收入来源图表");
      if (!sourceChart)
        return;
      sourceLoading.value = true;
      const option = {
        title: {
          text: "收入来源分布",
          left: "center",
          top: 10,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          top: 40,
          left: "center",
          itemWidth: 15,
          itemHeight: 10,
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            name: "收入来源",
            type: "pie",
            radius: ["30%", "60%"],
            center: ["50%", "60%"],
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
      sourceChart.setOption(option);
      sourceLoading.value = false;
    }
    function renderUserChart() {
      console.log("渲染用户活跃度图表");
      if (!userChart)
        return;
      userLoading.value = true;
      const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
      const activeUsers = [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330];
      const newUsers = [45, 52, 35, 84, 38, 120, 85, 65, 35, 65, 80, 120];
      const retentionRate = [65, 70, 60, 80, 75, 82, 75, 70, 68, 72, 78, 80];
      const option = {
        title: {
          text: "用户活跃度分析",
          left: "center",
          top: 10,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["活跃用户", "新增用户", "留存率"],
          top: 40,
          left: "center"
        },
        grid: {
          left: "5%",
          right: "7%",
          bottom: "5%",
          top: 100,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: months,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "用户数",
            min: 0,
            max: 400,
            interval: 50,
            axisLabel: {
              formatter: "{value} 人"
            }
          },
          {
            type: "value",
            name: "留存率",
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "活跃用户",
            type: "bar",
            data: activeUsers,
            itemStyle: {
              color: "#409EFF"
            }
          },
          {
            name: "新增用户",
            type: "bar",
            data: newUsers,
            itemStyle: {
              color: "#67C23A"
            }
          },
          {
            name: "留存率",
            type: "line",
            yAxisIndex: 1,
            data: retentionRate,
            smooth: true,
            itemStyle: {
              color: "#E6A23C"
            }
          }
        ]
      };
      userChart.setOption(option);
      userLoading.value = false;
    }
    function handleResize() {
      if (incomeChart)
        incomeChart.resize();
      if (areaChart)
        areaChart.resize();
      if (sourceChart)
        sourceChart.resize();
      if (userChart)
        userChart.resize();
    }
    onMounted(() => {
      console.log("Reports组件已挂载");
      initializeCharts();
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      console.log("Reports组件已卸载");
      if (incomeChart)
        incomeChart.dispose();
      if (areaChart)
        areaChart.dispose();
      if (sourceChart)
        sourceChart.dispose();
      if (userChart)
        userChart.dispose();
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_icon = resolveComponent("el-icon");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[9] || (_cache[9] = createBaseVNode("h1", { class: "text-2xl font-bold mb-6" }, "数据报表分析", -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[1] || (_cache[1] = createBaseVNode("h2", { class: "text-lg font-bold" }, "收入趋势分析", -1)),
            createVNode(_component_el_select, {
              modelValue: incomePeriod.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => incomePeriod.value = $event),
              size: "small",
              onChange: renderIncomeChart
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
          incomeLoading.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(_component_el_icon, {
              class: "animate-spin text-blue-500 mr-2",
              size: "24"
            }, {
              default: withCtx(() => [
                createVNode(unref(loading_default))
              ]),
              _: 1
            }),
            _cache[2] || (_cache[2] = createBaseVNode("span", null, "加载中...", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "incomeChartEl",
            ref: incomeChartEl,
            style: { "width": "100%", "height": "450px" }
          }, null, 512)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "text-lg font-bold mb-4" }, "各区域使用量统计", -1)),
            areaLoading.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createVNode(_component_el_icon, {
                class: "animate-spin text-blue-500 mr-2",
                size: "24"
              }, {
                default: withCtx(() => [
                  createVNode(unref(loading_default))
                ]),
                _: 1
              }),
              _cache[3] || (_cache[3] = createBaseVNode("span", null, "加载中...", -1))
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              ref_key: "areaChartEl",
              ref: areaChartEl,
              style: { "width": "100%", "height": "350px" }
            }, null, 512)
          ]),
          createBaseVNode("div", _hoisted_8, [
            _cache[6] || (_cache[6] = createBaseVNode("h2", { class: "text-lg font-bold mb-4" }, "收入来源分布", -1)),
            sourceLoading.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createVNode(_component_el_icon, {
                class: "animate-spin text-blue-500 mr-2",
                size: "24"
              }, {
                default: withCtx(() => [
                  createVNode(unref(loading_default))
                ]),
                _: 1
              }),
              _cache[5] || (_cache[5] = createBaseVNode("span", null, "加载中...", -1))
            ])) : createCommentVNode("", true),
            createBaseVNode("div", {
              ref_key: "sourceChartEl",
              ref: sourceChartEl,
              style: { "width": "100%", "height": "350px" }
            }, null, 512)
          ])
        ]),
        createBaseVNode("div", _hoisted_10, [
          _cache[8] || (_cache[8] = createBaseVNode("h2", { class: "text-lg font-bold mb-4" }, "用户活跃度分析", -1)),
          userLoading.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createVNode(_component_el_icon, {
              class: "animate-spin text-blue-500 mr-2",
              size: "24"
            }, {
              default: withCtx(() => [
                createVNode(unref(loading_default))
              ]),
              _: 1
            }),
            _cache[7] || (_cache[7] = createBaseVNode("span", null, "加载中...", -1))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "userChartEl",
            ref: userChartEl,
            style: { "width": "100%", "height": "450px" }
          }, null, 512)
        ])
      ]);
    };
  }
};
const Reports = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e01497e7"]]);
export {
  Reports as default
};
//# sourceMappingURL=Reports-27590e8f.js.map
