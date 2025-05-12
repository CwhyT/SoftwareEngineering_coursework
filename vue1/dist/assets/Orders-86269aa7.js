import { _ as _sfc_main$1 } from "./TableManager-3ea786d6.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { r as ref, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, k as resolveComponent, o as openBlock, j as createTextVNode, L as ElMessage } from "./index-af7cb7d5.js";
const Orders_vue_vue_type_style_index_0_scoped_7b26ecb6_lang = "";
const _hoisted_1 = { class: "p-6" };
const _hoisted_2 = { class: "bg-white p-6 rounded-lg shadow-md mb-6" };
const _hoisted_3 = { class: "flex justify-between items-center mb-6" };
const _hoisted_4 = { class: "flex space-x-2" };
const _hoisted_5 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_6 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_7 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _sfc_main = {
  __name: "Orders",
  setup(__props) {
    const activeTab = ref("orderList");
    const exportOrderData = () => {
      ElMessage.info("导出订单功能正在开发中");
    };
    const orderColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "order_number", label: "订单编号", sortable: true, searchable: true },
      { prop: "user_id", label: "用户ID", sortable: true },
      { prop: "scooter_id", label: "车辆ID", sortable: true },
      { prop: "status", label: "状态", sortable: true },
      { prop: "start_time", label: "开始时间", sortable: true, type: "datetime" },
      { prop: "end_time", label: "结束时间", sortable: true, type: "datetime" },
      { prop: "duration", label: "租赁时长(分)", sortable: true },
      { prop: "amount", label: "金额(元)", sortable: true },
      { prop: "payment_status", label: "支付状态", sortable: true },
      { prop: "created_at", label: "创建时间", sortable: true, type: "datetime" }
    ];
    const orderFormFields = [
      {
        prop: "order_number",
        label: "订单编号",
        type: "text",
        rules: [{ required: true, message: "请输入订单编号", trigger: "blur" }]
      },
      {
        prop: "user_id",
        label: "用户ID",
        type: "number",
        rules: [{ required: true, message: "请输入用户ID", trigger: "blur" }]
      },
      {
        prop: "scooter_id",
        label: "车辆ID",
        type: "number",
        rules: [{ required: true, message: "请输入车辆ID", trigger: "blur" }]
      },
      {
        prop: "status",
        label: "状态",
        type: "select",
        options: [
          { value: "created", label: "已创建" },
          { value: "in_progress", label: "进行中" },
          { value: "completed", label: "已完成" },
          { value: "cancelled", label: "已取消" },
          { value: "failed", label: "失败" }
        ],
        rules: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      {
        prop: "start_time",
        label: "开始时间",
        type: "datetime",
        rules: [{ required: true, message: "请选择开始时间", trigger: "change" }]
      },
      {
        prop: "end_time",
        label: "结束时间",
        type: "datetime"
      },
      {
        prop: "duration",
        label: "租赁时长(分)",
        type: "number"
      },
      {
        prop: "amount",
        label: "金额(元)",
        type: "number",
        rules: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      {
        prop: "payment_status",
        label: "支付状态",
        type: "select",
        options: [
          { value: "pending", label: "待支付" },
          { value: "paid", label: "已支付" },
          { value: "refunded", label: "已退款" },
          { value: "failed", label: "失败" }
        ],
        rules: [{ required: true, message: "请选择支付状态", trigger: "change" }]
      }
    ];
    const orderFilterOptions = [
      { label: "状态: 已创建", value: "status:created" },
      { label: "状态: 进行中", value: "status:in_progress" },
      { label: "状态: 已完成", value: "status:completed" },
      { label: "状态: 已取消", value: "status:cancelled" },
      { label: "状态: 失败", value: "status:failed" },
      { label: "支付状态: 待支付", value: "payment_status:pending" },
      { label: "支付状态: 已支付", value: "payment_status:paid" },
      { label: "支付状态: 已退款", value: "payment_status:refunded" },
      { label: "支付状态: 失败", value: "payment_status:failed" }
    ];
    const paymentColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "payment_number", label: "支付编号", sortable: true, searchable: true },
      { prop: "order_id", label: "订单ID", sortable: true },
      { prop: "user_id", label: "用户ID", sortable: true },
      { prop: "amount", label: "金额(元)", sortable: true },
      { prop: "payment_method", label: "支付方式", sortable: true },
      { prop: "status", label: "状态", sortable: true },
      { prop: "transaction_id", label: "交易ID", searchable: true },
      { prop: "payment_time", label: "支付时间", sortable: true, type: "datetime" },
      { prop: "created_at", label: "创建时间", sortable: true, type: "datetime" }
    ];
    const paymentFormFields = [
      {
        prop: "payment_number",
        label: "支付编号",
        type: "text",
        rules: [{ required: true, message: "请输入支付编号", trigger: "blur" }]
      },
      {
        prop: "order_id",
        label: "订单ID",
        type: "number",
        rules: [{ required: true, message: "请输入订单ID", trigger: "blur" }]
      },
      {
        prop: "user_id",
        label: "用户ID",
        type: "number",
        rules: [{ required: true, message: "请输入用户ID", trigger: "blur" }]
      },
      {
        prop: "amount",
        label: "金额(元)",
        type: "number",
        rules: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      {
        prop: "payment_method",
        label: "支付方式",
        type: "select",
        options: [
          { value: "alipay", label: "支付宝" },
          { value: "wechat", label: "微信支付" },
          { value: "credit_card", label: "信用卡" },
          { value: "balance", label: "余额支付" }
        ],
        rules: [{ required: true, message: "请选择支付方式", trigger: "change" }]
      },
      {
        prop: "status",
        label: "状态",
        type: "select",
        options: [
          { value: "pending", label: "处理中" },
          { value: "success", label: "成功" },
          { value: "failed", label: "失败" },
          { value: "refunded", label: "已退款" }
        ],
        rules: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      {
        prop: "transaction_id",
        label: "交易ID",
        type: "text"
      },
      {
        prop: "payment_time",
        label: "支付时间",
        type: "datetime"
      }
    ];
    const paymentFilterOptions = [
      { label: "状态: 处理中", value: "status:pending" },
      { label: "状态: 成功", value: "status:success" },
      { label: "状态: 失败", value: "status:failed" },
      { label: "状态: 已退款", value: "status:refunded" },
      { label: "支付方式: 支付宝", value: "payment_method:alipay" },
      { label: "支付方式: 微信支付", value: "payment_method:wechat" },
      { label: "支付方式: 信用卡", value: "payment_method:credit_card" },
      { label: "支付方式: 余额支付", value: "payment_method:balance" }
    ];
    const refundColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "refund_number", label: "退款编号", sortable: true, searchable: true },
      { prop: "payment_id", label: "支付ID", sortable: true },
      { prop: "order_id", label: "订单ID", sortable: true },
      { prop: "user_id", label: "用户ID", sortable: true },
      { prop: "amount", label: "金额(元)", sortable: true },
      { prop: "reason", label: "退款原因", searchable: true },
      { prop: "status", label: "状态", sortable: true },
      { prop: "processor_id", label: "处理人ID", sortable: true },
      { prop: "refund_time", label: "退款时间", sortable: true, type: "datetime" },
      { prop: "created_at", label: "创建时间", sortable: true, type: "datetime" }
    ];
    const refundFormFields = [
      {
        prop: "refund_number",
        label: "退款编号",
        type: "text",
        rules: [{ required: true, message: "请输入退款编号", trigger: "blur" }]
      },
      {
        prop: "payment_id",
        label: "支付ID",
        type: "number",
        rules: [{ required: true, message: "请输入支付ID", trigger: "blur" }]
      },
      {
        prop: "order_id",
        label: "订单ID",
        type: "number",
        rules: [{ required: true, message: "请输入订单ID", trigger: "blur" }]
      },
      {
        prop: "user_id",
        label: "用户ID",
        type: "number",
        rules: [{ required: true, message: "请输入用户ID", trigger: "blur" }]
      },
      {
        prop: "amount",
        label: "金额(元)",
        type: "number",
        rules: [{ required: true, message: "请输入金额", trigger: "blur" }]
      },
      {
        prop: "reason",
        label: "退款原因",
        type: "text",
        rules: [{ required: true, message: "请输入退款原因", trigger: "blur" }]
      },
      {
        prop: "status",
        label: "状态",
        type: "select",
        options: [
          { value: "pending", label: "待处理" },
          { value: "processing", label: "处理中" },
          { value: "approved", label: "已批准" },
          { value: "completed", label: "已完成" },
          { value: "rejected", label: "已拒绝" }
        ],
        rules: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      {
        prop: "processor_id",
        label: "处理人ID",
        type: "number"
      },
      {
        prop: "refund_time",
        label: "退款时间",
        type: "datetime"
      }
    ];
    const refundFilterOptions = [
      { label: "状态: 待处理", value: "status:pending" },
      { label: "状态: 处理中", value: "status:processing" },
      { label: "状态: 已批准", value: "status:approved" },
      { label: "状态: 已完成", value: "status:completed" },
      { label: "状态: 已拒绝", value: "status:rejected" }
    ];
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "mb-6" }, [
          createBaseVNode("h1", { class: "text-2xl font-bold mb-2" }, "订单管理"),
          createBaseVNode("p", { class: "text-gray-600" }, "管理所有租赁订单和付款数据")
        ], -1)),
        createVNode(_component_el_tabs, {
          modelValue: activeTab.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activeTab.value = $event),
          class: "mb-6"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_tab_pane, {
              label: "订单列表",
              name: "orderList"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  createBaseVNode("div", _hoisted_3, [
                    _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-lg font-semibold" }, "租赁订单", -1)),
                    createBaseVNode("div", _hoisted_4, [
                      createVNode(_component_el_button, {
                        type: "primary",
                        onClick: exportOrderData
                      }, {
                        default: withCtx(() => _cache[1] || (_cache[1] = [
                          createTextVNode("导出数据")
                        ])),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_tab_pane, {
              label: "订单数据管理",
              name: "orderData"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(_sfc_main$1, {
                    tableName: "orders",
                    title: "订单数据表",
                    columns: orderColumns,
                    formFields: orderFormFields,
                    filterOptions: orderFilterOptions
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_tab_pane, {
              label: "支付记录管理",
              name: "paymentRecords"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_sfc_main$1, {
                    tableName: "payments",
                    title: "支付记录表",
                    columns: paymentColumns,
                    formFields: paymentFormFields,
                    filterOptions: paymentFilterOptions
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_tab_pane, {
              label: "退款记录管理",
              name: "refundRecords"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_7, [
                  createVNode(_sfc_main$1, {
                    tableName: "refunds",
                    title: "退款记录表",
                    columns: refundColumns,
                    formFields: refundFormFields,
                    filterOptions: refundFilterOptions
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
const Orders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b26ecb6"]]);
export {
  Orders as default
};
//# sourceMappingURL=Orders-86269aa7.js.map
