import { r as ref, Z as computed, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, F as Fragment, J as renderList, f as createCommentVNode, k as resolveComponent, o as openBlock, j as createTextVNode, C as normalizeClass, t as toDisplayString, e as unref, U as money_default, L as ElMessage } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Coupons_vue_vue_type_style_index_0_scoped_dd5ff2da_lang = "";
const _hoisted_1 = { class: "coupons-page bg-gray-100 min-h-screen p-4" };
const _hoisted_2 = { class: "flex justify-between items-center mb-8" };
const _hoisted_3 = { class: "bg-white rounded-lg shadow-sm mb-6" };
const _hoisted_4 = { class: "flex border-b" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "space-y-4" };
const _hoisted_7 = {
  key: 0,
  class: "text-center py-10 bg-white rounded-lg shadow"
};
const _hoisted_8 = {
  key: 0,
  class: "text-gray-400 mt-2"
};
const _hoisted_9 = {
  key: 1,
  class: "text-gray-400 mt-2"
};
const _hoisted_10 = {
  key: 2,
  class: "text-gray-400 mt-2"
};
const _hoisted_11 = { class: "relative" };
const _hoisted_12 = { class: "flex" };
const _hoisted_13 = { class: "text-white" };
const _hoisted_14 = { class: "text-2xl font-bold" };
const _hoisted_15 = { class: "text-sm opacity-80" };
const _hoisted_16 = { class: "coupon-right p-4 w-3/5" };
const _hoisted_17 = { class: "text-lg font-medium" };
const _hoisted_18 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_19 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_20 = {
  key: 0,
  class: "mt-2"
};
const _hoisted_21 = {
  key: 1,
  class: "mt-2"
};
const _hoisted_22 = {
  key: 2,
  class: "mt-2"
};
const _hoisted_23 = {
  key: 0,
  class: "absolute top-0 right-0 w-full h-full flex items-center justify-center"
};
const _hoisted_24 = { class: "transform rotate-45 text-4xl opacity-20 font-bold text-gray-500" };
const _hoisted_25 = { class: "coupon-center" };
const _hoisted_26 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_27 = { class: "flex justify-between items-center" };
const _hoisted_28 = { class: "text-lg font-medium" };
const _hoisted_29 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_30 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_31 = { class: "block text-xl font-bold text-blue-600" };
const _sfc_main = {
  __name: "Coupons",
  setup(__props) {
    const tabs = [
      { label: "未使用", value: "unused" },
      { label: "已使用", value: "used" },
      { label: "已过期", value: "expired" }
    ];
    const currentTab = ref("unused");
    const couponCenterVisible = ref(false);
    const coupons = ref([
      {
        title: "新用户专享券",
        amount: "¥10",
        type: "无门槛抵用券",
        condition: "无使用门槛",
        expireDate: "2023-05-30",
        status: "unused"
      },
      {
        title: "骑行折扣券",
        amount: "¥5",
        type: "满15元可用",
        condition: "满15元可使用",
        expireDate: "2023-05-15",
        status: "unused"
      },
      {
        title: "周末特惠券",
        amount: "8折",
        type: "折扣券",
        condition: "满30分钟可用",
        expireDate: "2023-04-10",
        status: "used"
      },
      {
        title: "限时优惠券",
        amount: "¥3",
        type: "抵用券",
        condition: "无使用门槛",
        expireDate: "2023-03-20",
        status: "expired"
      }
    ]);
    const availableOffers = ref([
      {
        title: "五一出行特惠",
        description: "五一假期骑行9折优惠",
        amount: "9折",
        validity: "2023-05-01至2023-05-05",
        received: false
      },
      {
        title: "首次充值奖励",
        description: "首次充值满50元赠送10元",
        amount: "¥10",
        validity: "2023-05-31前有效",
        received: false
      },
      {
        title: "夜间骑行优惠",
        description: "22:00-6:00骑行7折",
        amount: "7折",
        validity: "2023-05-31前有效",
        received: false
      },
      {
        title: "邀请好友返利",
        description: "邀请一位好友注册获得5元奖励",
        amount: "¥5",
        validity: "长期有效",
        received: false
      }
    ]);
    const filteredCoupons = computed(() => {
      return coupons.value.filter((coupon) => coupon.status === currentTab.value);
    });
    function showCouponCenter() {
      couponCenterVisible.value = true;
    }
    function handleDialogClose() {
      couponCenterVisible.value = false;
    }
    function receiveCoupon(offer) {
      if (offer.received) {
        ElMessage({
          type: "warning",
          message: "您已领取过该优惠券",
          duration: 1500
        });
        return;
      }
      coupons.value.push({
        title: offer.title,
        amount: offer.amount,
        type: offer.description,
        condition: offer.description,
        expireDate: offer.validity.split("至").pop() || offer.validity,
        status: "unused"
      });
      offer.received = true;
      ElMessage({
        type: "success",
        message: "优惠券领取成功",
        duration: 1500
      });
    }
    function useCoupon(coupon) {
      ElMessage({
        type: "success",
        message: "即将前往骑行页面使用优惠券",
        duration: 1500
      });
    }
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("h1", { class: "text-2xl font-bold" }, "我的优惠券", -1)),
          createVNode(_component_el_button, {
            type: "primary",
            class: "bg-blue-500 text-white border-0 font-bold px-6 py-2 rounded-md",
            onClick: showCouponCenter
          }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createTextVNode(" 领取更多 ")
            ])),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
              return createBaseVNode("div", {
                key: tab.value,
                onClick: ($event) => currentTab.value = tab.value,
                class: normalizeClass(["p-4 flex-1 text-center cursor-pointer transition-colors", currentTab.value === tab.value ? "text-blue-600 border-b-2 border-blue-500 font-medium" : "text-gray-600"])
              }, toDisplayString(tab.label), 11, _hoisted_5);
            }), 64))
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          filteredCoupons.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(_component_el_icon, {
              size: "48",
              class: "text-gray-400 mb-4"
            }, {
              default: withCtx(() => [
                createVNode(unref(money_default))
              ]),
              _: 1
            }),
            _cache[4] || (_cache[4] = createBaseVNode("h3", { class: "text-lg font-medium text-gray-500" }, "暂无优惠券", -1)),
            currentTab.value === "unused" ? (openBlock(), createElementBlock("p", _hoisted_8, "您还没有可用的优惠券")) : currentTab.value === "used" ? (openBlock(), createElementBlock("p", _hoisted_9, "您还没有已使用的优惠券")) : (openBlock(), createElementBlock("p", _hoisted_10, "您还没有已过期的优惠券")),
            createVNode(_component_el_button, {
              type: "primary",
              class: "mt-4",
              onClick: showCouponCenter
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode("去获取")
              ])),
              _: 1
            })
          ])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCoupons.value, (coupon, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: "coupon-card bg-white rounded-lg shadow overflow-hidden"
            }, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("div", {
                    class: normalizeClass(`coupon-left p-4 w-2/5 flex flex-col justify-center ${coupon.status === "unused" ? "bg-blue-500" : "bg-gray-400"}`)
                  }, [
                    createBaseVNode("div", _hoisted_13, [
                      createBaseVNode("div", _hoisted_14, toDisplayString(coupon.amount), 1),
                      createBaseVNode("div", _hoisted_15, toDisplayString(coupon.type), 1)
                    ])
                  ], 2),
                  createBaseVNode("div", _hoisted_16, [
                    createBaseVNode("h3", _hoisted_17, toDisplayString(coupon.title), 1),
                    createBaseVNode("p", _hoisted_18, toDisplayString(coupon.condition), 1),
                    createBaseVNode("p", _hoisted_19, "有效期至: " + toDisplayString(coupon.expireDate), 1),
                    coupon.status === "unused" ? (openBlock(), createElementBlock("div", _hoisted_20, [
                      createVNode(_component_el_button, {
                        size: "small",
                        type: "primary",
                        class: "mt-2",
                        onClick: ($event) => useCoupon()
                      }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createTextVNode("立即使用")
                        ])),
                        _: 2
                      }, 1032, ["onClick"])
                    ])) : coupon.status === "used" ? (openBlock(), createElementBlock("div", _hoisted_21, _cache[6] || (_cache[6] = [
                      createBaseVNode("span", { class: "text-xs text-gray-500" }, "已使用", -1)
                    ]))) : (openBlock(), createElementBlock("div", _hoisted_22, _cache[7] || (_cache[7] = [
                      createBaseVNode("span", { class: "text-xs text-gray-500" }, "已过期", -1)
                    ])))
                  ])
                ]),
                coupon.status !== "unused" ? (openBlock(), createElementBlock("div", _hoisted_23, [
                  createBaseVNode("div", _hoisted_24, toDisplayString(coupon.status === "used" ? "已使用" : "已过期"), 1)
                ])) : createCommentVNode("", true)
              ])
            ]);
          }), 128))
        ]),
        createVNode(_component_el_dialog, {
          modelValue: couponCenterVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => couponCenterVisible.value = $event),
          title: "优惠券中心",
          width: "80%",
          "before-close": handleDialogClose
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_25, [
              createBaseVNode("div", _hoisted_26, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(availableOffers.value, (offer, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: "coupon-offer p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  }, [
                    createBaseVNode("div", _hoisted_27, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h3", _hoisted_28, toDisplayString(offer.title), 1),
                        createBaseVNode("p", _hoisted_29, toDisplayString(offer.description), 1),
                        createBaseVNode("p", _hoisted_30, "有效期: " + toDisplayString(offer.validity), 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("span", _hoisted_31, toDisplayString(offer.amount), 1),
                        createVNode(_component_el_button, {
                          size: "small",
                          type: "primary",
                          class: "mt-2",
                          onClick: ($event) => receiveCoupon(offer)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(offer.received ? "已领取" : "立即领取"), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])
                    ])
                  ]);
                }), 128))
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
const Coupons = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd5ff2da"]]);
export {
  Coupons as default
};
//# sourceMappingURL=Coupons-2a57c48b.js.map
