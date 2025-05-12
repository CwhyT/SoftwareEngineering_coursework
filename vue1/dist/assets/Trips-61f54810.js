import { r as ref, Z as computed, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, F as Fragment, J as renderList, k as resolveComponent, o as openBlock, j as createTextVNode, t as toDisplayString, e as unref, q as timer_default } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Trips_vue_vue_type_style_index_0_scoped_7fdb6302_lang = "";
const _hoisted_1 = { class: "trips-page bg-gray-100 min-h-screen p-4" };
const _hoisted_2 = { class: "flex justify-between items-center mb-8" };
const _hoisted_3 = { class: "bg-white rounded-lg shadow p-5 mb-8" };
const _hoisted_4 = {
  key: 0,
  class: "text-center py-8"
};
const _hoisted_5 = { key: 1 };
const _hoisted_6 = { class: "flex justify-between items-center" };
const _hoisted_7 = { class: "flex-1" };
const _hoisted_8 = { class: "text-lg font-medium" };
const _hoisted_9 = { class: "text-sm text-gray-500 mt-1" };
const _hoisted_10 = { class: "flex items-center mt-2" };
const _hoisted_11 = { class: "text-sm text-gray-600 mr-4" };
const _hoisted_12 = { class: "text-sm text-gray-600" };
const _hoisted_13 = { class: "text-right" };
const _hoisted_14 = { class: "text-lg font-medium text-blue-600" };
const _hoisted_15 = { class: "text-xs text-gray-500 mt-1" };
const initialDisplayCount = 3;
const _sfc_main = {
  __name: "Trips",
  setup(__props) {
    const allTrips = [
      {
        location: "上海市徐汇区复兴中路",
        date: "2023-04-05 14:30",
        duration: "25分钟",
        distance: "3.5公里",
        price: "¥6.50",
        status: "已完成"
      },
      {
        location: "上海市静安区南京西路",
        date: "2023-04-03 09:15",
        duration: "18分钟",
        distance: "2.1公里",
        price: "¥4.00",
        status: "已完成"
      },
      {
        location: "上海市黄浦区人民广场",
        date: "2023-03-28 19:45",
        duration: "32分钟",
        distance: "4.2公里",
        price: "¥8.50",
        status: "已完成"
      },
      {
        location: "上海市浦东新区陆家嘴",
        date: "2023-03-25 10:20",
        duration: "45分钟",
        distance: "5.8公里",
        price: "¥11.00",
        status: "已完成"
      },
      {
        location: "上海市杨浦区五角场",
        date: "2023-03-20 16:40",
        duration: "22分钟",
        distance: "2.9公里",
        price: "¥5.50",
        status: "已完成"
      }
    ];
    const trips = ref(allTrips);
    const showAll = ref(false);
    const displayTrips = computed(() => {
      return showAll.value ? trips.value : trips.value.slice(0, initialDisplayCount);
    });
    function loadMoreTrips() {
      showAll.value = !showAll.value;
    }
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[0] || (_cache[0] = createBaseVNode("h1", { class: "text-2xl font-bold" }, "行程记录", -1)),
          createVNode(_component_el_button, {
            type: "primary",
            class: "bg-blue-500 text-white border-0 font-bold px-6 py-2 rounded-md",
            onClick: loadMoreTrips
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(showAll.value ? "收起" : "查看更多"), 1)
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          displayTrips.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(_component_el_icon, {
              size: "48",
              class: "text-gray-400 mb-4"
            }, {
              default: withCtx(() => [
                createVNode(unref(timer_default))
              ]),
              _: 1
            }),
            _cache[2] || (_cache[2] = createBaseVNode("h3", { class: "text-lg font-medium text-gray-500" }, "暂无行程记录", -1)),
            _cache[3] || (_cache[3] = createBaseVNode("p", { class: "text-gray-400 mt-2" }, "您还没有任何骑行记录", -1)),
            createVNode(_component_router_link, { to: "/rent" }, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  class: "mt-4"
                }, {
                  default: withCtx(() => _cache[1] || (_cache[1] = [
                    createTextVNode("立即用车")
                  ])),
                  _: 1
                })
              ]),
              _: 1
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(displayTrips.value, (trip, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "trip-item border-b border-gray-100 py-4 last:border-0"
              }, [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("h3", _hoisted_8, toDisplayString(trip.location), 1),
                    createBaseVNode("p", _hoisted_9, toDisplayString(trip.date), 1),
                    createBaseVNode("div", _hoisted_10, [
                      createBaseVNode("span", _hoisted_11, "骑行时间: " + toDisplayString(trip.duration), 1),
                      createBaseVNode("span", _hoisted_12, "骑行距离: " + toDisplayString(trip.distance), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("span", _hoisted_14, toDisplayString(trip.price), 1),
                    createBaseVNode("div", _hoisted_15, toDisplayString(trip.status), 1)
                  ])
                ])
              ]);
            }), 128))
          ]))
        ])
      ]);
    };
  }
};
const Trips = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7fdb6302"]]);
export {
  Trips as default
};
//# sourceMappingURL=Trips-61f54810.js.map
