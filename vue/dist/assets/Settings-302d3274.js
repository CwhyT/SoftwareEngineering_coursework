import { r as ref, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, k as resolveComponent, o as openBlock, j as createTextVNode, e as unref, aB as refresh_default, af as delete_default, t as toDisplayString, f as createCommentVNode, L as ElMessage, E as ElMessageBox } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Settings_vue_vue_type_style_index_0_scoped_5f3cdf8d_lang = "";
const _hoisted_1 = { class: "settings-page" };
const _hoisted_2 = { class: "py-4" };
const _hoisted_3 = { class: "py-4" };
const _hoisted_4 = { class: "py-4" };
const _hoisted_5 = { class: "py-4" };
const _hoisted_6 = { class: "py-4" };
const _hoisted_7 = { class: "flex justify-between items-center mb-4" };
const _hoisted_8 = { class: "flex justify-end mt-4" };
const _hoisted_9 = { key: 0 };
const _hoisted_10 = { class: "mb-4" };
const _hoisted_11 = { class: "mb-4" };
const _hoisted_12 = { class: "mb-4" };
const _hoisted_13 = { class: "mb-4" };
const _hoisted_14 = { class: "p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap" };
const _hoisted_15 = { class: "mb-4" };
const _hoisted_16 = { class: "mb-4" };
const _hoisted_17 = { class: "mb-4" };
const _hoisted_18 = { class: "text-xs text-gray-700" };
const _sfc_main = {
  __name: "Settings",
  setup(__props) {
    const activeTab = ref("general");
    const generalSettings = ref({
      systemName: "电动滑板车租赁系统",
      companyName: "智慧出行科技有限公司",
      contactPhone: "400-123-4567",
      serviceEmail: "service@example.com",
      websiteDomain: "www.example.com",
      timezone: "Asia/Shanghai",
      currency: "CNY",
      maintenanceMode: false
    });
    const rentalSettings = ref({
      baseRate: 0.5,
      depositAmount: 99,
      maxRideTime: 120,
      reservationTime: 15,
      overtimeRate: 1,
      monthlyPassPrice: 29.9,
      quarterlyPassPrice: 79.9,
      yearlyPassPrice: 299.9,
      freeRideTime: 15
    });
    const userSettings = ref({
      defaultRole: "user",
      requireEmailVerification: true,
      requirePhoneVerification: true,
      maxLoginAttempts: 5,
      lockoutTime: 30,
      minPasswordLength: 8,
      passwordRequirements: ["lowercase", "numbers"],
      trackUserBehavior: true
    });
    const notificationSettings = ref({
      systemNotifications: true,
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      orderConfirmation: ["email", "push"],
      rentalStart: ["sms", "push"],
      rentalEnd: ["sms", "push"],
      paymentSuccess: ["email", "push"]
    });
    const logs = ref([
      {
        id: 1,
        timestamp: "2024-03-25 10:15:23",
        level: "INFO",
        source: "用户登录",
        message: "用户成功登录",
        user: "admin",
        ip: "192.168.1.1",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      },
      {
        id: 2,
        timestamp: "2024-03-25 09:45:12",
        level: "WARNING",
        source: "车辆管理",
        message: "车辆电量不足 (ID: E1005)",
        user: "system",
        ip: "192.168.1.10",
        userAgent: "SystemMonitor/1.0"
      },
      {
        id: 3,
        timestamp: "2024-03-24 18:23:45",
        level: "ERROR",
        source: "支付系统",
        message: "支付处理失败: 银行返回错误代码 DECLINED\n交易ID: TX12345678\n用户ID: 42\n金额: ¥50.00",
        user: "user42",
        ip: "192.168.1.42",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
      },
      {
        id: 4,
        timestamp: "2024-03-24 15:10:33",
        level: "INFO",
        source: "订单系统",
        message: "新订单创建成功 (订单ID: ORD-2403-1234)",
        user: "user78",
        ip: "192.168.1.78",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    ]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalLogs = ref(42);
    const logDetailVisible = ref(false);
    const selectedLog = ref(null);
    function saveGeneralSettings() {
      ElMessage.success("基础设置已保存");
    }
    function saveRentalSettings() {
      ElMessage.success("租赁设置已保存");
    }
    function saveUserSettings() {
      ElMessage.success("用户设置已保存");
    }
    function saveNotificationSettings() {
      ElMessage.success("通知设置已保存");
    }
    function resetGeneralSettings() {
      ElMessageBox.confirm(
        "确定要重置为默认设置吗？",
        "重置确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        generalSettings.value = {
          systemName: "电动滑板车租赁系统",
          companyName: "智慧出行科技有限公司",
          contactPhone: "400-123-4567",
          serviceEmail: "service@example.com",
          websiteDomain: "www.example.com",
          timezone: "Asia/Shanghai",
          currency: "CNY",
          maintenanceMode: false
        };
        ElMessage.success("已重置为默认设置");
      });
    }
    function resetRentalSettings() {
      ElMessageBox.confirm(
        "确定要重置为默认设置吗？",
        "重置确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        rentalSettings.value = {
          baseRate: 0.5,
          depositAmount: 99,
          maxRideTime: 120,
          reservationTime: 15,
          overtimeRate: 1,
          monthlyPassPrice: 29.9,
          quarterlyPassPrice: 79.9,
          yearlyPassPrice: 299.9,
          freeRideTime: 15
        };
        ElMessage.success("已重置为默认设置");
      });
    }
    function resetUserSettings() {
      ElMessageBox.confirm(
        "确定要重置为默认设置吗？",
        "重置确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        userSettings.value = {
          defaultRole: "user",
          requireEmailVerification: true,
          requirePhoneVerification: true,
          maxLoginAttempts: 5,
          lockoutTime: 30,
          minPasswordLength: 8,
          passwordRequirements: ["lowercase", "numbers"],
          trackUserBehavior: true
        };
        ElMessage.success("已重置为默认设置");
      });
    }
    function resetNotificationSettings() {
      ElMessageBox.confirm(
        "确定要重置为默认设置吗？",
        "重置确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        notificationSettings.value = {
          systemNotifications: true,
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true,
          orderConfirmation: ["email", "push"],
          rentalStart: ["sms", "push"],
          rentalEnd: ["sms", "push"],
          paymentSuccess: ["email", "push"]
        };
        ElMessage.success("已重置为默认设置");
      });
    }
    function refreshLogs() {
      ElMessage.success("日志已刷新");
    }
    function clearLogs() {
      ElMessageBox.confirm(
        "确定要清空所有系统日志吗？此操作不可恢复。",
        "清空日志",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "danger"
        }
      ).then(() => {
        logs.value = [];
        totalLogs.value = 0;
        ElMessage.success("已清空系统日志");
      });
    }
    function viewLogDetail(log) {
      selectedLog.value = log;
      logDetailVisible.value = true;
    }
    function getLogLevelType(level) {
      const types = {
        "INFO": "info",
        "WARNING": "warning",
        "ERROR": "danger",
        "DEBUG": "success"
      };
      return types[level] || "info";
    }
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[77] || (_cache[77] = createBaseVNode("div", { class: "mb-6" }, [
          createBaseVNode("h1", { class: "text-2xl font-bold" }, "系统设置"),
          createBaseVNode("p", { class: "text-gray-600" }, "管理系统配置和参数")
        ], -1)),
        createVNode(_component_el_card, {
          shadow: "hover",
          class: "mb-6"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_tabs, {
              modelValue: activeTab.value,
              "onUpdate:modelValue": _cache[35] || (_cache[35] = ($event) => activeTab.value = $event)
            }, {
              default: withCtx(() => [
                createVNode(_component_el_tab_pane, {
                  label: "基础设置",
                  name: "general"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, [
                      _cache[39] || (_cache[39] = createBaseVNode("h2", { class: "text-lg font-medium mb-4" }, "基础设置", -1)),
                      createVNode(_component_el_form, {
                        "label-width": "180px",
                        "label-position": "left",
                        model: generalSettings.value
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "系统名称" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: generalSettings.value.systemName,
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => generalSettings.value.systemName = $event),
                                placeholder: "电动滑板车租赁系统"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "公司名称" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: generalSettings.value.companyName,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => generalSettings.value.companyName = $event),
                                placeholder: "您的公司名称"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "联系电话" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: generalSettings.value.contactPhone,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => generalSettings.value.contactPhone = $event),
                                placeholder: "客服电话"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "客服邮箱" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: generalSettings.value.serviceEmail,
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => generalSettings.value.serviceEmail = $event),
                                placeholder: "客服邮箱"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "网站域名" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: generalSettings.value.websiteDomain,
                                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => generalSettings.value.websiteDomain = $event),
                                placeholder: "您的网站域名"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "系统时区" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: generalSettings.value.timezone,
                                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => generalSettings.value.timezone = $event),
                                placeholder: "请选择时区",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "北京时间 (GMT+8)",
                                    value: "Asia/Shanghai"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "东京时间 (GMT+9)",
                                    value: "Asia/Tokyo"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "伦敦时间 (GMT+0)",
                                    value: "Europe/London"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "纽约时间 (GMT-5)",
                                    value: "America/New_York"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "系统货币" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: generalSettings.value.currency,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => generalSettings.value.currency = $event),
                                placeholder: "请选择货币",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "人民币 (CNY)",
                                    value: "CNY"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "美元 (USD)",
                                    value: "USD"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "欧元 (EUR)",
                                    value: "EUR"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "日元 (JPY)",
                                    value: "JPY"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "维护模式" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: generalSettings.value.maintenanceMode,
                                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => generalSettings.value.maintenanceMode = $event),
                                "active-text": "开启",
                                "inactive-text": "关闭"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: saveGeneralSettings
                              }, {
                                default: withCtx(() => _cache[37] || (_cache[37] = [
                                  createTextVNode("保存设置")
                                ])),
                                _: 1
                              }),
                              createVNode(_component_el_button, { onClick: resetGeneralSettings }, {
                                default: withCtx(() => _cache[38] || (_cache[38] = [
                                  createTextVNode("重置")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tab_pane, {
                  label: "租赁设置",
                  name: "rental"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3, [
                      _cache[42] || (_cache[42] = createBaseVNode("h2", { class: "text-lg font-medium mb-4" }, "租赁参数设置", -1)),
                      createVNode(_component_el_form, {
                        "label-width": "180px",
                        "label-position": "left",
                        model: rentalSettings.value
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "基础骑行费率(元/分钟)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.baseRate,
                                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => rentalSettings.value.baseRate = $event),
                                min: 0,
                                precision: 2,
                                step: 0.1
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "预付款金额(元)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.depositAmount,
                                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => rentalSettings.value.depositAmount = $event),
                                min: 0,
                                precision: 2,
                                step: 10
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "骑行时长上限(分钟)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.maxRideTime,
                                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => rentalSettings.value.maxRideTime = $event),
                                min: 0,
                                step: 10
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "预约保留时间(分钟)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.reservationTime,
                                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => rentalSettings.value.reservationTime = $event),
                                min: 0,
                                step: 5
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "加班费率(元/分钟)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.overtimeRate,
                                "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => rentalSettings.value.overtimeRate = $event),
                                min: 0,
                                precision: 2,
                                step: 0.1
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "月卡价格(元)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.monthlyPassPrice,
                                "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => rentalSettings.value.monthlyPassPrice = $event),
                                min: 0,
                                precision: 2,
                                step: 10
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "季卡价格(元)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.quarterlyPassPrice,
                                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => rentalSettings.value.quarterlyPassPrice = $event),
                                min: 0,
                                precision: 2,
                                step: 10
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "年卡价格(元)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.yearlyPassPrice,
                                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => rentalSettings.value.yearlyPassPrice = $event),
                                min: 0,
                                precision: 2,
                                step: 10
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "免费骑行时间(分钟)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: rentalSettings.value.freeRideTime,
                                "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => rentalSettings.value.freeRideTime = $event),
                                min: 0,
                                step: 5
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: saveRentalSettings
                              }, {
                                default: withCtx(() => _cache[40] || (_cache[40] = [
                                  createTextVNode("保存设置")
                                ])),
                                _: 1
                              }),
                              createVNode(_component_el_button, { onClick: resetRentalSettings }, {
                                default: withCtx(() => _cache[41] || (_cache[41] = [
                                  createTextVNode("重置")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tab_pane, {
                  label: "用户设置",
                  name: "user"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, [
                      _cache[49] || (_cache[49] = createBaseVNode("h2", { class: "text-lg font-medium mb-4" }, "用户设置", -1)),
                      createVNode(_component_el_form, {
                        "label-width": "180px",
                        "label-position": "left",
                        model: userSettings.value
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "默认注册角色" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: userSettings.value.defaultRole,
                                "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => userSettings.value.defaultRole = $event),
                                placeholder: "请选择默认角色",
                                style: { "width": "100%" }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "普通用户",
                                    value: "user"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "会员用户",
                                    value: "member"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "需要邮箱验证" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: userSettings.value.requireEmailVerification,
                                "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => userSettings.value.requireEmailVerification = $event),
                                "active-text": "是",
                                "inactive-text": "否"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "需要手机验证" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: userSettings.value.requirePhoneVerification,
                                "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => userSettings.value.requirePhoneVerification = $event),
                                "active-text": "是",
                                "inactive-text": "否"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "登录失败尝试次数" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: userSettings.value.maxLoginAttempts,
                                "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => userSettings.value.maxLoginAttempts = $event),
                                min: 1,
                                max: 10
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "锁定时间(分钟)" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: userSettings.value.lockoutTime,
                                "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => userSettings.value.lockoutTime = $event),
                                min: 5,
                                step: 5
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "密码最小长度" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input_number, {
                                modelValue: userSettings.value.minPasswordLength,
                                "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => userSettings.value.minPasswordLength = $event),
                                min: 6,
                                max: 20
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "密码复杂度要求" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox_group, {
                                modelValue: userSettings.value.passwordRequirements,
                                "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => userSettings.value.passwordRequirements = $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, { label: "uppercase" }, {
                                    default: withCtx(() => _cache[43] || (_cache[43] = [
                                      createTextVNode("包含大写字母")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "lowercase" }, {
                                    default: withCtx(() => _cache[44] || (_cache[44] = [
                                      createTextVNode("包含小写字母")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "numbers" }, {
                                    default: withCtx(() => _cache[45] || (_cache[45] = [
                                      createTextVNode("包含数字")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "special" }, {
                                    default: withCtx(() => _cache[46] || (_cache[46] = [
                                      createTextVNode("包含特殊字符")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "用户行为记录" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: userSettings.value.trackUserBehavior,
                                "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => userSettings.value.trackUserBehavior = $event),
                                "active-text": "启用",
                                "inactive-text": "禁用"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: saveUserSettings
                              }, {
                                default: withCtx(() => _cache[47] || (_cache[47] = [
                                  createTextVNode("保存设置")
                                ])),
                                _: 1
                              }),
                              createVNode(_component_el_button, { onClick: resetUserSettings }, {
                                default: withCtx(() => _cache[48] || (_cache[48] = [
                                  createTextVNode("重置")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tab_pane, {
                  label: "通知设置",
                  name: "notification"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_5, [
                      _cache[65] || (_cache[65] = createBaseVNode("h2", { class: "text-lg font-medium mb-4" }, "通知设置", -1)),
                      createVNode(_component_el_form, {
                        "label-width": "180px",
                        "label-position": "left",
                        model: notificationSettings.value
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, { label: "系统通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: notificationSettings.value.systemNotifications,
                                "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => notificationSettings.value.systemNotifications = $event),
                                "active-text": "启用",
                                "inactive-text": "禁用"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "邮件通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: notificationSettings.value.emailNotifications,
                                "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => notificationSettings.value.emailNotifications = $event),
                                "active-text": "启用",
                                "inactive-text": "禁用"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "短信通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: notificationSettings.value.smsNotifications,
                                "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => notificationSettings.value.smsNotifications = $event),
                                "active-text": "启用",
                                "inactive-text": "禁用"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "推送通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_switch, {
                                modelValue: notificationSettings.value.pushNotifications,
                                "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => notificationSettings.value.pushNotifications = $event),
                                "active-text": "启用",
                                "inactive-text": "禁用"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          _cache[64] || (_cache[64] = createBaseVNode("h3", { class: "text-md font-medium my-4" }, "通知发送类型", -1)),
                          createVNode(_component_el_form_item, { label: "订单确认通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox_group, {
                                modelValue: notificationSettings.value.orderConfirmation,
                                "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => notificationSettings.value.orderConfirmation = $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, { label: "email" }, {
                                    default: withCtx(() => _cache[50] || (_cache[50] = [
                                      createTextVNode("邮件")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "sms" }, {
                                    default: withCtx(() => _cache[51] || (_cache[51] = [
                                      createTextVNode("短信")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "push" }, {
                                    default: withCtx(() => _cache[52] || (_cache[52] = [
                                      createTextVNode("推送")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "租赁开始通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox_group, {
                                modelValue: notificationSettings.value.rentalStart,
                                "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => notificationSettings.value.rentalStart = $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, { label: "email" }, {
                                    default: withCtx(() => _cache[53] || (_cache[53] = [
                                      createTextVNode("邮件")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "sms" }, {
                                    default: withCtx(() => _cache[54] || (_cache[54] = [
                                      createTextVNode("短信")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "push" }, {
                                    default: withCtx(() => _cache[55] || (_cache[55] = [
                                      createTextVNode("推送")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "租赁结束通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox_group, {
                                modelValue: notificationSettings.value.rentalEnd,
                                "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => notificationSettings.value.rentalEnd = $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, { label: "email" }, {
                                    default: withCtx(() => _cache[56] || (_cache[56] = [
                                      createTextVNode("邮件")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "sms" }, {
                                    default: withCtx(() => _cache[57] || (_cache[57] = [
                                      createTextVNode("短信")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "push" }, {
                                    default: withCtx(() => _cache[58] || (_cache[58] = [
                                      createTextVNode("推送")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "支付成功通知" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_checkbox_group, {
                                modelValue: notificationSettings.value.paymentSuccess,
                                "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => notificationSettings.value.paymentSuccess = $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_checkbox, { label: "email" }, {
                                    default: withCtx(() => _cache[59] || (_cache[59] = [
                                      createTextVNode("邮件")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "sms" }, {
                                    default: withCtx(() => _cache[60] || (_cache[60] = [
                                      createTextVNode("短信")
                                    ])),
                                    _: 1
                                  }),
                                  createVNode(_component_el_checkbox, { label: "push" }, {
                                    default: withCtx(() => _cache[61] || (_cache[61] = [
                                      createTextVNode("推送")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_button, {
                                type: "primary",
                                onClick: saveNotificationSettings
                              }, {
                                default: withCtx(() => _cache[62] || (_cache[62] = [
                                  createTextVNode("保存设置")
                                ])),
                                _: 1
                              }),
                              createVNode(_component_el_button, { onClick: resetNotificationSettings }, {
                                default: withCtx(() => _cache[63] || (_cache[63] = [
                                  createTextVNode("重置")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tab_pane, {
                  label: "系统日志",
                  name: "logs"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_6, [
                      createBaseVNode("div", _hoisted_7, [
                        _cache[68] || (_cache[68] = createBaseVNode("h2", { class: "text-lg font-medium" }, "系统日志", -1)),
                        createBaseVNode("div", null, [
                          createVNode(_component_el_button, {
                            type: "primary",
                            onClick: refreshLogs
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, { class: "mr-1" }, {
                                default: withCtx(() => [
                                  createVNode(unref(refresh_default))
                                ]),
                                _: 1
                              }),
                              _cache[66] || (_cache[66] = createTextVNode(" 刷新 "))
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, { onClick: clearLogs }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, { class: "mr-1" }, {
                                default: withCtx(() => [
                                  createVNode(unref(delete_default))
                                ]),
                                _: 1
                              }),
                              _cache[67] || (_cache[67] = createTextVNode(" 清空日志 "))
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(_component_el_table, {
                        data: logs.value,
                        style: { "width": "100%" },
                        height: "500"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_table_column, {
                            type: "index",
                            width: "50"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "timestamp",
                            label: "时间",
                            width: "180"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "level",
                            label: "级别",
                            width: "100"
                          }, {
                            default: withCtx(({ row }) => [
                              createVNode(_component_el_tag, {
                                type: getLogLevelType(row.level),
                                size: "small"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.level), 1)
                                ]),
                                _: 2
                              }, 1032, ["type"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "source",
                            label: "来源",
                            width: "150"
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "message",
                            label: "消息",
                            "min-width": "300",
                            "show-overflow-tooltip": true
                          }),
                          createVNode(_component_el_table_column, {
                            prop: "user",
                            label: "用户",
                            width: "120"
                          }),
                          createVNode(_component_el_table_column, {
                            label: "操作",
                            width: "80",
                            fixed: "right"
                          }, {
                            default: withCtx(({ row }) => [
                              createVNode(_component_el_button, {
                                size: "small",
                                type: "primary",
                                plain: "",
                                onClick: ($event) => viewLogDetail(row)
                              }, {
                                default: withCtx(() => _cache[69] || (_cache[69] = [
                                  createTextVNode(" 详情 ")
                                ])),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["data"]),
                      createBaseVNode("div", _hoisted_8, [
                        createVNode(_component_el_pagination, {
                          "current-page": currentPage.value,
                          "onUpdate:currentPage": _cache[33] || (_cache[33] = ($event) => currentPage.value = $event),
                          "page-size": pageSize.value,
                          "onUpdate:pageSize": _cache[34] || (_cache[34] = ($event) => pageSize.value = $event),
                          "page-sizes": [10, 20, 50, 100],
                          total: totalLogs.value,
                          layout: "total, sizes, prev, pager, next"
                        }, null, 8, ["current-page", "page-size", "total"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }),
        createVNode(_component_el_dialog, {
          modelValue: logDetailVisible.value,
          "onUpdate:modelValue": _cache[36] || (_cache[36] = ($event) => logDetailVisible.value = $event),
          title: "日志详情",
          width: "600px"
        }, {
          default: withCtx(() => [
            selectedLog.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                _cache[70] || (_cache[70] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "时间", -1)),
                createBaseVNode("div", null, toDisplayString(selectedLog.value.timestamp), 1)
              ]),
              createBaseVNode("div", _hoisted_11, [
                _cache[71] || (_cache[71] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "级别", -1)),
                createVNode(_component_el_tag, {
                  type: getLogLevelType(selectedLog.value.level)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(selectedLog.value.level), 1)
                  ]),
                  _: 1
                }, 8, ["type"])
              ]),
              createBaseVNode("div", _hoisted_12, [
                _cache[72] || (_cache[72] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "来源", -1)),
                createBaseVNode("div", null, toDisplayString(selectedLog.value.source), 1)
              ]),
              createBaseVNode("div", _hoisted_13, [
                _cache[73] || (_cache[73] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "消息", -1)),
                createBaseVNode("div", _hoisted_14, toDisplayString(selectedLog.value.message), 1)
              ]),
              createBaseVNode("div", _hoisted_15, [
                _cache[74] || (_cache[74] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "用户", -1)),
                createBaseVNode("div", null, toDisplayString(selectedLog.value.user), 1)
              ]),
              createBaseVNode("div", _hoisted_16, [
                _cache[75] || (_cache[75] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "IP地址", -1)),
                createBaseVNode("div", null, toDisplayString(selectedLog.value.ip), 1)
              ]),
              createBaseVNode("div", _hoisted_17, [
                _cache[76] || (_cache[76] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "用户代理", -1)),
                createBaseVNode("div", _hoisted_18, toDisplayString(selectedLog.value.userAgent), 1)
              ])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
const Settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f3cdf8d"]]);
export {
  Settings as default
};
//# sourceMappingURL=Settings-302d3274.js.map
