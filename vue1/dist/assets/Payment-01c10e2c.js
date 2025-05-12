var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { a as useUserStore, u as useRouter, a3 as useRoute, r as ref, Z as computed, I as onMounted, L as ElMessage, c as createElementBlock, b as createBaseVNode, t as toDisplayString, f as createCommentVNode, F as Fragment, J as renderList, d as createVNode, w as withCtx, j as createTextVNode, a4 as axios, a5 as ElLoading, k as resolveComponent, o as openBlock, C as normalizeClass, e as unref, P as arrow_right_default, g as createBlock, a6 as check_default, U as money_default } from "./index-af7cb7d5.js";
const wechatIcon = "/assets/wechat-d9aad5f8.png";
const alipayIcon = "/assets/alipay-b660e27d.png";
const unionpayIcon = "/assets/unionpay-c51350a2.png";
const creditcardIcon = "/assets/creditcard-fb658891.png";
const Payment_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "payment-page py-8" };
const _hoisted_2 = { class: "container mx-auto px-4 sm:px-6 md:px-8" };
const _hoisted_3 = { class: "max-w-4xl mx-auto" };
const _hoisted_4 = {
  key: 0,
  class: "bg-white rounded-xl shadow-md overflow-hidden mb-8"
};
const _hoisted_5 = { class: "p-6 md:p-8" };
const _hoisted_6 = { class: "space-y-4" };
const _hoisted_7 = { class: "flex items-center" };
const _hoisted_8 = { class: "font-semibold" };
const _hoisted_9 = { class: "text-sm text-gray-500" };
const _hoisted_10 = { class: "bg-white rounded-xl shadow-md overflow-hidden mb-8" };
const _hoisted_11 = { class: "p-6 md:p-8" };
const _hoisted_12 = { class: "grid grid-cols-2 md:grid-cols-3 gap-4" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "text-xl font-bold text-gray-800" };
const _hoisted_15 = {
  key: 0,
  class: "text-xs text-emerald-500 mt-1"
};
const _hoisted_16 = { class: "amount-card border border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 transition-all" };
const _hoisted_17 = { class: "mt-2" };
const _hoisted_18 = { class: "bg-white rounded-xl shadow-md overflow-hidden mb-8" };
const _hoisted_19 = { class: "p-6 md:p-8" };
const _hoisted_20 = { class: "mb-5 border-b border-gray-100 pb-5" };
const _hoisted_21 = { class: "flex justify-between items-center mb-3" };
const _hoisted_22 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "flex-1" };
const _hoisted_25 = { class: "font-medium text-gray-800" };
const _hoisted_26 = { class: "text-xs text-gray-500" };
const _hoisted_27 = { class: "text-xs text-gray-500" };
const _hoisted_28 = { class: "ml-2" };
const _hoisted_29 = {
  key: 1,
  class: "text-center py-4 border border-dashed border-gray-200 rounded-lg"
};
const _hoisted_30 = { class: "space-y-4" };
const _hoisted_31 = ["onClick"];
const _hoisted_32 = { class: "payment-icon mr-4" };
const _hoisted_33 = ["src", "alt"];
const _hoisted_34 = { class: "flex-1" };
const _hoisted_35 = { class: "font-medium text-gray-800" };
const _hoisted_36 = { class: "ml-2" };
const _hoisted_37 = {
  key: 0,
  class: "mt-6 border-t border-gray-100 pt-5"
};
const _hoisted_38 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_39 = { class: "bg-white rounded-xl shadow-md overflow-hidden mb-8" };
const _hoisted_40 = { class: "p-6 md:p-8" };
const _hoisted_41 = { class: "space-y-4" };
const _hoisted_42 = { class: "flex justify-between py-2 border-b border-gray-100" };
const _hoisted_43 = { class: "font-medium text-gray-800" };
const _hoisted_44 = { class: "flex justify-between py-2 border-b border-gray-100" };
const _hoisted_45 = {
  key: 0,
  class: "font-medium text-red-500"
};
const _hoisted_46 = {
  key: 1,
  class: "text-gray-400"
};
const _hoisted_47 = { class: "flex justify-between py-2 border-b border-gray-100" };
const _hoisted_48 = { class: "font-medium text-emerald-500" };
const _hoisted_49 = { class: "flex justify-between py-2" };
const _hoisted_50 = { class: "font-medium text-xl text-blue-600" };
const _hoisted_51 = { class: "flex justify-center" };
const _hoisted_52 = ["disabled"];
const _hoisted_53 = { class: "text-center" };
const _hoisted_54 = { class: "success-icon mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center" };
const _hoisted_55 = { class: "text-lg font-semibold text-gray-800 mb-2" };
const _hoisted_56 = { class: "text-gray-600 mb-4" };
const _hoisted_57 = { class: "text-gray-600 mb-6" };
const _sfc_main = {
  __name: "Payment",
  setup(__props) {
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const scooterId = ref(route.query.scooterId || "");
    const battery = ref(route.query.battery || 0);
    const isRentalPayment = computed(() => !!scooterId.value);
    const accountBalance = ref(0);
    function fetchBalance() {
      return __async(this, null, function* () {
        try {
          console.log("获取账户余额，Token:", userStore.token);
          const response = yield axios.get("/api/accounts/balance", {
            headers: {
              Authorization: `Bearer ${userStore.token}`
            }
          });
          if (response.data.success) {
            accountBalance.value = response.data.data.balance;
            console.log("获取到用户余额:", accountBalance.value);
          } else {
            console.error("获取余额失败:", response.data.message);
            ElMessage.error("获取余额失败");
          }
        } catch (error) {
          console.error("获取余额错误:", error);
          ElMessage.error("无法连接到服务器");
        }
      });
    }
    const selectedCoupon = ref(null);
    const availableCoupons = ref([
      {
        id: 1,
        title: "新用户专享券",
        amount: "¥10",
        type: "无门槛抵用券",
        condition: "无使用门槛",
        expireDate: "2023-05-30"
      },
      {
        id: 2,
        title: "骑行折扣券",
        amount: "8折",
        type: "折扣券",
        condition: "满30元可用",
        expireDate: "2023-06-15"
      }
    ]);
    function selectCoupon(coupon) {
      if (selectedCoupon.value === coupon.id) {
        selectedCoupon.value = null;
      } else {
        selectedCoupon.value = coupon.id;
      }
    }
    const getSelectedCouponInfo = computed(() => {
      if (!selectedCoupon.value)
        return null;
      return availableCoupons.value.find((c) => c.id === selectedCoupon.value);
    });
    const getCouponDiscount = computed(() => {
      const coupon = getSelectedCouponInfo.value;
      if (!coupon)
        return 0;
      if (coupon.type === "折扣券") {
        const discount = parseFloat(coupon.amount) / 10;
        return selectedAmount.value * (1 - discount);
      } else {
        return parseFloat(coupon.amount.replace("¥", ""));
      }
    });
    const amounts = [
      { value: 10, label: "¥10", bonus: 0 },
      { value: 20, label: "¥20", bonus: 2 },
      { value: 50, label: "¥50", bonus: 5 },
      { value: 100, label: "¥100", bonus: 15 },
      { value: 200, label: "¥200", bonus: 30 }
    ];
    const paymentMethods = [
      { id: "wechat", name: "微信支付", icon: wechatIcon },
      { id: "alipay", name: "支付宝", icon: alipayIcon },
      { id: "unionpay", name: "银联支付", icon: unionpayIcon },
      { id: "creditcard", name: "信用卡支付", icon: creditcardIcon }
    ];
    const selectedAmount = ref(50);
    const customAmount = ref(10);
    const selectedPaymentMethod = ref("alipay");
    const showSuccessDialog = ref(false);
    const creditCardForm = ref({
      cardNumber: "",
      expiry: "",
      cvv: "",
      name: ""
    });
    function getBonus(amount) {
      const selectedOption = amounts.find((item) => item.value === amount);
      return selectedOption ? selectedOption.bonus : 0;
    }
    function handlePayment() {
      return __async(this, null, function* () {
        const loading = ElLoading.service({
          lock: true,
          text: "处理支付中...",
          background: "rgba(255, 255, 255, 0.8)"
        });
        try {
          if (selectedPaymentMethod.value === "creditcard") {
            if (!validateCreditCardForm()) {
              ElMessage({
                type: "warning",
                message: "请填写完整的信用卡信息",
                duration: 1500
              });
              loading.close();
              return;
            }
          }
          const bonusAmount = getBonus(selectedAmount.value);
          const response = yield axios.post("/api/accounts/recharge", {
            amount: selectedAmount.value,
            paymentMethod: selectedPaymentMethod.value,
            bonusAmount
          }, {
            headers: {
              Authorization: `Bearer ${userStore.token}`
            }
          });
          if (response.data.success) {
            accountBalance.value = response.data.data.newBalance;
            if (isRentalPayment.value) {
              const rentalInfo = {
                scooterId: scooterId.value,
                startTime: (/* @__PURE__ */ new Date()).toISOString(),
                battery: battery.value,
                deposit: 99,
                status: "active"
              };
              localStorage.setItem("currentRental", JSON.stringify(rentalInfo));
            }
            loading.close();
            showSuccessDialog.value = true;
          } else {
            loading.close();
            ElMessage({
              type: "error",
              message: response.data.message || "充值失败",
              duration: 1500
            });
          }
        } catch (error) {
          loading.close();
          console.error("支付失败:", error);
          ElMessage({
            type: "error",
            message: "支付失败，请重试",
            duration: 1500
          });
        }
      });
    }
    function validateCreditCardForm() {
      const { cardNumber, expiry, cvv, name } = creditCardForm.value;
      return cardNumber && expiry && cvv && name;
    }
    function handleSuccessClose() {
      showSuccessDialog.value = false;
      if (isRentalPayment.value) {
        router.push("/profile");
      } else {
        router.push("/rent");
      }
    }
    onMounted(() => {
      fetchBalance();
      if (isRentalPayment.value && !scooterId.value) {
        ElMessage({
          type: "error",
          message: "未找到车辆信息",
          duration: 1500
        });
        router.push("/rent");
      }
    });
    return (_ctx, _cache) => {
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_router_link = resolveComponent("router-link");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[24] || (_cache[24] = createBaseVNode("h1", { class: "text-2xl font-bold text-gray-800 mb-8 text-center" }, "账户充值", -1)),
            isRentalPayment.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[9] || (_cache[9] = createBaseVNode("h2", { class: "text-lg font-semibold text-gray-800 mb-5" }, "租车信息", -1)),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("div", _hoisted_7, [
                    _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-3xl mr-3" }, "🛴", -1)),
                    createBaseVNode("div", null, [
                      createBaseVNode("h3", _hoisted_8, "车辆 " + toDisplayString(scooterId.value), 1),
                      createBaseVNode("p", _hoisted_9, "电量: " + toDisplayString(battery.value) + "%", 1)
                    ])
                  ]),
                  _cache[8] || (_cache[8] = createBaseVNode("div", { class: "bg-blue-50 p-4 rounded-lg" }, [
                    createBaseVNode("h4", { class: "font-medium text-blue-800 mb-2" }, "租车费用说明"),
                    createBaseVNode("ul", { class: "text-sm text-blue-600 space-y-1" }, [
                      createBaseVNode("li", null, "• 起步价：5元（含15分钟）"),
                      createBaseVNode("li", null, "• 超时费用：2元/15分钟"),
                      createBaseVNode("li", null, "• 押金：99元（可退）")
                    ])
                  ], -1))
                ])
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                _cache[11] || (_cache[11] = createBaseVNode("h2", { class: "text-lg font-semibold text-gray-800 mb-5" }, "选择充值金额", -1)),
                createBaseVNode("div", _hoisted_12, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(amounts, (amount) => {
                    return createBaseVNode("div", {
                      key: amount.value,
                      class: normalizeClass(["amount-card border rounded-xl p-4 text-center cursor-pointer transition-all", selectedAmount.value === amount.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"]),
                      onClick: ($event) => selectedAmount.value = amount.value
                    }, [
                      createBaseVNode("div", _hoisted_14, toDisplayString(amount.label), 1),
                      amount.bonus ? (openBlock(), createElementBlock("div", _hoisted_15, "送" + toDisplayString(amount.bonus) + "元", 1)) : createCommentVNode("", true)
                    ], 10, _hoisted_13);
                  }), 64)),
                  createBaseVNode("div", _hoisted_16, [
                    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "text-xl font-bold text-gray-800" }, "其他金额", -1)),
                    createBaseVNode("div", _hoisted_17, [
                      createVNode(_component_el_input_number, {
                        modelValue: customAmount.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customAmount.value = $event),
                        min: 1,
                        max: 1e3,
                        size: "small",
                        onChange: _cache[1] || (_cache[1] = ($event) => selectedAmount.value = customAmount.value)
                      }, null, 8, ["modelValue"])
                    ])
                  ])
                ]),
                _cache[12] || (_cache[12] = createBaseVNode("div", { class: "mt-6 text-sm text-gray-500" }, [
                  createBaseVNode("p", null, "说明：充值金额将直接计入您的账户余额，可用于租赁滑板车。")
                ], -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                _cache[18] || (_cache[18] = createBaseVNode("h2", { class: "text-lg font-semibold text-gray-800 mb-5" }, "选择支付方式", -1)),
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("div", _hoisted_21, [
                    _cache[14] || (_cache[14] = createBaseVNode("h3", { class: "text-md font-semibold text-gray-700" }, "选择优惠券", -1)),
                    createVNode(_component_router_link, {
                      to: "/coupons",
                      class: "text-blue-600 text-sm flex items-center"
                    }, {
                      default: withCtx(() => [
                        _cache[13] || (_cache[13] = createTextVNode(" 我的优惠券 ")),
                        createVNode(_component_el_icon, { class: "ml-1" }, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_right_default))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  availableCoupons.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_22, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(availableCoupons.value, (coupon, index) => {
                      return openBlock(), createElementBlock("div", {
                        key: index,
                        class: normalizeClass(["coupon-item border rounded-lg p-3 cursor-pointer transition-all flex items-center", selectedCoupon.value === coupon.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"]),
                        onClick: ($event) => selectCoupon(coupon)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["flex-shrink-0 w-16 h-16 rounded-lg mr-3 flex items-center justify-center", coupon.type === "折扣券" ? "bg-orange-100" : "bg-blue-100"])
                        }, [
                          createBaseVNode("span", {
                            class: normalizeClass(["text-lg font-bold", coupon.type === "折扣券" ? "text-orange-600" : "text-blue-600"])
                          }, toDisplayString(coupon.amount), 3)
                        ], 2),
                        createBaseVNode("div", _hoisted_24, [
                          createBaseVNode("div", _hoisted_25, toDisplayString(coupon.title), 1),
                          createBaseVNode("div", _hoisted_26, toDisplayString(coupon.condition), 1),
                          createBaseVNode("div", _hoisted_27, "有效期至: " + toDisplayString(coupon.expireDate), 1)
                        ]),
                        createBaseVNode("div", _hoisted_28, [
                          selectedCoupon.value === coupon.id ? (openBlock(), createBlock(_component_el_icon, {
                            key: 0,
                            color: "#3b82f6",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(check_default))
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ])
                      ], 10, _hoisted_23);
                    }), 128))
                  ])) : (openBlock(), createElementBlock("div", _hoisted_29, [
                    createVNode(_component_el_icon, {
                      size: "24",
                      class: "text-gray-400 mb-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(money_default))
                      ]),
                      _: 1
                    }),
                    _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-sm text-gray-500" }, "暂无可用优惠券", -1)),
                    createVNode(_component_router_link, {
                      to: "/coupons",
                      class: "text-blue-600 text-sm inline-block mt-1"
                    }, {
                      default: withCtx(() => _cache[15] || (_cache[15] = [
                        createTextVNode(" 前往领取优惠券 ")
                      ])),
                      _: 1
                    })
                  ]))
                ]),
                createBaseVNode("div", _hoisted_30, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(paymentMethods, (method) => {
                    return createBaseVNode("div", {
                      key: method.id,
                      class: normalizeClass(["payment-method-item border rounded-lg p-4 cursor-pointer transition-all flex items-center", selectedPaymentMethod.value === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"]),
                      onClick: ($event) => selectedPaymentMethod.value = method.id
                    }, [
                      createBaseVNode("div", _hoisted_32, [
                        createBaseVNode("img", {
                          src: method.icon,
                          alt: method.name,
                          class: "h-8 w-8 object-contain"
                        }, null, 8, _hoisted_33)
                      ]),
                      createBaseVNode("div", _hoisted_34, [
                        createBaseVNode("div", _hoisted_35, toDisplayString(method.name), 1)
                      ]),
                      createBaseVNode("div", _hoisted_36, [
                        selectedPaymentMethod.value === method.id ? (openBlock(), createBlock(_component_el_icon, {
                          key: 0,
                          color: "#3b82f6",
                          size: "20"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ])
                    ], 10, _hoisted_31);
                  }), 64))
                ]),
                selectedPaymentMethod.value === "creditcard" ? (openBlock(), createElementBlock("div", _hoisted_37, [
                  _cache[17] || (_cache[17] = createBaseVNode("h3", { class: "text-md font-semibold text-gray-700 mb-4" }, "信用卡信息", -1)),
                  createVNode(_component_el_form, {
                    model: creditCardForm.value,
                    "label-position": "top"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_form_item, { label: "卡号" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: creditCardForm.value.cardNumber,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => creditCardForm.value.cardNumber = $event),
                            placeholder: "请输入信用卡号",
                            maxlength: "19"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createBaseVNode("div", _hoisted_38, [
                        createVNode(_component_el_form_item, { label: "有效期" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: creditCardForm.value.expiry,
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => creditCardForm.value.expiry = $event),
                              placeholder: "MM/YY",
                              maxlength: "5"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_form_item, { label: "CVV" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_input, {
                              modelValue: creditCardForm.value.cvv,
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => creditCardForm.value.cvv = $event),
                              placeholder: "123",
                              maxlength: "3",
                              type: "password"
                            }, null, 8, ["modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(_component_el_form_item, { label: "持卡人姓名" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_input, {
                            modelValue: creditCardForm.value.name,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => creditCardForm.value.name = $event),
                            placeholder: "请输入持卡人姓名"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model"])
                ])) : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_39, [
              createBaseVNode("div", _hoisted_40, [
                _cache[23] || (_cache[23] = createBaseVNode("h2", { class: "text-lg font-semibold text-gray-800 mb-5" }, "订单信息", -1)),
                createBaseVNode("div", _hoisted_41, [
                  createBaseVNode("div", _hoisted_42, [
                    _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-gray-600" }, "充值金额", -1)),
                    createBaseVNode("span", _hoisted_43, "¥" + toDisplayString(selectedAmount.value.toFixed(2)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_44, [
                    _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-gray-600" }, "优惠券", -1)),
                    getSelectedCouponInfo.value ? (openBlock(), createElementBlock("span", _hoisted_45, " -¥" + toDisplayString(getCouponDiscount.value.toFixed(2)), 1)) : (openBlock(), createElementBlock("span", _hoisted_46, "未使用"))
                  ]),
                  createBaseVNode("div", _hoisted_47, [
                    _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-gray-600" }, "赠送金额", -1)),
                    createBaseVNode("span", _hoisted_48, " +¥" + toDisplayString(getBonus(selectedAmount.value).toFixed(2)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_49, [
                    _cache[22] || (_cache[22] = createBaseVNode("span", { class: "text-gray-600" }, "实际到账", -1)),
                    createBaseVNode("span", _hoisted_50, " ¥" + toDisplayString((selectedAmount.value - getCouponDiscount.value + getBonus(selectedAmount.value)).toFixed(2)), 1)
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_51, [
              createBaseVNode("button", {
                onClick: handlePayment,
                class: "bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors",
                disabled: !selectedAmount.value || !selectedPaymentMethod.value
              }, toDisplayString(isRentalPayment.value ? "支付押金开始用车" : "确认充值"), 9, _hoisted_52)
            ]),
            _cache[25] || (_cache[25] = createBaseVNode("div", { class: "mt-8 text-sm text-gray-500 text-center space-y-2" }, [
              createBaseVNode("p", null, [
                createTextVNode("如遇到充值问题，请联系客服热线："),
                createBaseVNode("span", { class: "text-blue-600" }, "400-123-4567")
              ]),
              createBaseVNode("p", null, "工作时间：9:00-21:00")
            ], -1))
          ])
        ]),
        createVNode(_component_el_dialog, {
          modelValue: showSuccessDialog.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => showSuccessDialog.value = $event),
          title: isRentalPayment.value ? "租车成功" : "充值成功",
          width: "360px",
          center: "",
          "close-on-click-modal": false,
          "close-on-press-escape": false,
          "show-close": false
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_53, [
              createBaseVNode("div", _hoisted_54, [
                createVNode(_component_el_icon, {
                  size: "32",
                  color: "#10b981"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(check_default))
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("h3", _hoisted_55, toDisplayString(isRentalPayment.value ? "租车成功" : "充值成功"), 1),
              isRentalPayment.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-gray-600 mb-4" }, "押金已支付，祝您用车愉快！", -1)),
                _cache[27] || (_cache[27] = createBaseVNode("div", { class: "bg-gray-50 p-4 rounded-lg text-sm mb-6" }, [
                  createBaseVNode("p", { class: "font-medium mb-2" }, "温馨提示："),
                  createBaseVNode("ul", { class: "text-gray-600 space-y-1" }, [
                    createBaseVNode("li", null, "• 请遵守交通规则，注意安全"),
                    createBaseVNode("li", null, "• 还车时请停放在指定区域"),
                    createBaseVNode("li", null, "• 结束用车后将自动退还押金")
                  ])
                ], -1))
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("p", _hoisted_56, "您已成功充值 ¥" + toDisplayString(selectedAmount.value.toFixed(2)) + "元", 1),
                createBaseVNode("p", _hoisted_57, "账户余额：¥" + toDisplayString((accountBalance.value + selectedAmount.value + getBonus(selectedAmount.value)).toFixed(2)) + "元", 1)
              ], 64)),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: handleSuccessClose
              }, {
                default: withCtx(() => _cache[28] || (_cache[28] = [
                  createTextVNode("确定")
                ])),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Payment-01c10e2c.js.map
