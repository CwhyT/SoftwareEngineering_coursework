var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { r as ref, Z as computed, I as onMounted, c as createElementBlock, d as createVNode, w as withCtx, L as ElMessage, k as resolveComponent, aE as resolveDirective, o as openBlock, b as createBaseVNode, e as unref, an as plus_default, j as createTextVNode, h as withDirectives, g as createBlock, t as toDisplayString, f as createCommentVNode } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Feedback_vue_vue_type_style_index_0_scoped_e17a3cb1_lang = "";
const _hoisted_1 = { class: "feedback-management" };
const _hoisted_2 = { class: "card-header" };
const _hoisted_3 = { class: "filter-container" };
const _hoisted_4 = {
  key: 0,
  class: "feedback-detail"
};
const _hoisted_5 = { class: "detail-item" };
const _hoisted_6 = { class: "detail-item" };
const _hoisted_7 = { class: "detail-item" };
const _hoisted_8 = { class: "detail-item" };
const _hoisted_9 = { class: "detail-item" };
const _hoisted_10 = { class: "content" };
const _hoisted_11 = {
  key: 0,
  class: "detail-item"
};
const _hoisted_12 = {
  key: 1,
  class: "detail-item"
};
const _hoisted_13 = { class: "content" };
const _hoisted_14 = {
  key: 0,
  class: "reply-form"
};
const _hoisted_15 = { class: "feedback-content" };
const _hoisted_16 = { class: "dialog-footer" };
const _sfc_main = {
  __name: "Feedback",
  setup(__props) {
    const loading = ref(false);
    const feedback = ref([]);
    const filterType = ref("");
    const filterStatus = ref("");
    const detailVisible = ref(false);
    const replyVisible = ref(false);
    const currentFeedback = ref(null);
    const replyForm = ref({
      content: "",
      status: "processing"
    });
    const filteredFeedback = computed(() => {
      return feedback.value.filter((item) => {
        const typeMatch = !filterType.value || item.type === filterType.value;
        const statusMatch = !filterStatus.value || item.status === filterStatus.value;
        return typeMatch && statusMatch;
      });
    });
    const fetchFeedback = () => {
      loading.value = true;
      try {
        const storedFeedback = localStorage.getItem("feedback");
        if (storedFeedback) {
          feedback.value = JSON.parse(storedFeedback);
        }
      } catch (error) {
        console.error("获取反馈数据失败:", error);
        ElMessage.error("获取反馈数据失败");
      } finally {
        loading.value = false;
      }
    };
    const refreshData = () => {
      fetchFeedback();
    };
    const showDetail = (row) => {
      currentFeedback.value = row;
      detailVisible.value = true;
    };
    const showReply = (row) => {
      currentFeedback.value = row;
      replyForm.value = {
        content: "",
        status: row.status === "pending" ? "processing" : row.status
      };
      replyVisible.value = true;
    };
    const submitReply = () => {
      if (!replyForm.value.content.trim()) {
        ElMessage.warning("请输入回复内容");
        return;
      }
      const index = feedback.value.findIndex((f) => f.id === currentFeedback.value.id);
      if (index !== -1) {
        feedback.value[index] = __spreadProps(__spreadValues({}, feedback.value[index]), {
          reply: replyForm.value.content,
          status: replyForm.value.status
        });
        localStorage.setItem("feedback", JSON.stringify(feedback.value));
        ElMessage.success("回复成功");
        replyVisible.value = false;
        refreshData();
      }
    };
    const generateTestFeedback = () => {
      const testFeedback = [
        {
          id: Date.now(),
          type: "scooter",
          status: "pending",
          username: "测试用户1",
          content: "车辆无法启动，请检查",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          scooterId: "SCOOTER001"
        },
        {
          id: Date.now() + 1,
          type: "system",
          status: "processing",
          username: "测试用户2",
          content: "APP经常闪退，影响使用",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          reply: "正在排查问题，请稍候"
        },
        {
          id: Date.now() + 2,
          type: "suggestion",
          status: "completed",
          username: "测试用户3",
          content: "建议增加更多的停车点",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          reply: "感谢您的建议，我们会认真考虑"
        }
      ];
      const existingFeedback = localStorage.getItem("feedback");
      const allFeedback = existingFeedback ? [...JSON.parse(existingFeedback), ...testFeedback] : testFeedback;
      localStorage.setItem("feedback", JSON.stringify(allFeedback));
      ElMessage.success("测试数据生成成功");
      refreshData();
    };
    const getTypeTag = (type) => {
      const types = {
        scooter: "danger",
        system: "warning",
        suggestion: "info"
      };
      return types[type] || "info";
    };
    const getTypeLabel = (type) => {
      const labels = {
        scooter: "车辆问题",
        system: "系统问题",
        suggestion: "建议"
      };
      return labels[type] || type;
    };
    const getStatusTag = (status) => {
      const statuses = {
        pending: "info",
        processing: "warning",
        completed: "success"
      };
      return statuses[status] || "info";
    };
    const getStatusLabel = (status) => {
      const labels = {
        pending: "待处理",
        processing: "处理中",
        completed: "已完成"
      };
      return labels[status] || status;
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
    onMounted(() => {
      fetchFeedback();
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_form = resolveComponent("el-form");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_el_card, { class: "box-card" }, {
          header: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              _cache[8] || (_cache[8] = createBaseVNode("span", null, "反馈管理", -1)),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: generateTestFeedback
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(plus_default))
                    ]),
                    _: 1
                  }),
                  _cache[7] || (_cache[7] = createTextVNode("生成测试数据 "))
                ]),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3, [
              createVNode(_component_el_select, {
                modelValue: filterType.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filterType.value = $event),
                placeholder: "反馈类型",
                clearable: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_option, {
                    label: "车辆问题",
                    value: "scooter"
                  }),
                  createVNode(_component_el_option, {
                    label: "系统问题",
                    value: "system"
                  }),
                  createVNode(_component_el_option, {
                    label: "建议",
                    value: "suggestion"
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              createVNode(_component_el_select, {
                modelValue: filterStatus.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filterStatus.value = $event),
                placeholder: "处理状态",
                clearable: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_option, {
                    label: "待处理",
                    value: "pending"
                  }),
                  createVNode(_component_el_option, {
                    label: "处理中",
                    value: "processing"
                  }),
                  createVNode(_component_el_option, {
                    label: "已完成",
                    value: "completed"
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: refreshData
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode("刷新")
                ])),
                _: 1
              })
            ]),
            withDirectives((openBlock(), createBlock(_component_el_table, {
              data: filteredFeedback.value,
              style: { "width": "100%" }
            }, {
              default: withCtx(() => [
                createVNode(_component_el_table_column, {
                  prop: "username",
                  label: "用户名",
                  width: "120"
                }),
                createVNode(_component_el_table_column, {
                  prop: "type",
                  label: "类型",
                  width: "100"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_tag, {
                      type: getTypeTag(row.type)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getTypeLabel(row.type)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  prop: "content",
                  label: "内容",
                  "show-overflow-tooltip": ""
                }),
                createVNode(_component_el_table_column, {
                  prop: "status",
                  label: "状态",
                  width: "100"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_tag, {
                      type: getStatusTag(row.status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusLabel(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  prop: "timestamp",
                  label: "提交时间",
                  width: "180"
                }, {
                  default: withCtx(({ row }) => [
                    createTextVNode(toDisplayString(formatDate(row.timestamp)), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  label: "操作",
                  width: "200",
                  fixed: "right"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "small",
                      onClick: ($event) => showDetail(row)
                    }, {
                      default: withCtx(() => _cache[10] || (_cache[10] = [
                        createTextVNode(" 查看详情 ")
                      ])),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "success",
                      size: "small",
                      onClick: ($event) => showReply(row),
                      disabled: row.status === "completed"
                    }, {
                      default: withCtx(() => _cache[11] || (_cache[11] = [
                        createTextVNode(" 回复 ")
                      ])),
                      _: 2
                    }, 1032, ["onClick", "disabled"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])), [
              [_directive_loading, loading.value]
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_dialog, {
          modelValue: detailVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => detailVisible.value = $event),
          title: "反馈详情",
          width: "50%"
        }, {
          default: withCtx(() => [
            currentFeedback.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[12] || (_cache[12] = createBaseVNode("span", { class: "label" }, "用户名：", -1)),
                createBaseVNode("span", null, toDisplayString(currentFeedback.value.username), 1)
              ]),
              createBaseVNode("div", _hoisted_6, [
                _cache[13] || (_cache[13] = createBaseVNode("span", { class: "label" }, "反馈类型：", -1)),
                createVNode(_component_el_tag, {
                  type: getTypeTag(currentFeedback.value.type)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(getTypeLabel(currentFeedback.value.type)), 1)
                  ]),
                  _: 1
                }, 8, ["type"])
              ]),
              createBaseVNode("div", _hoisted_7, [
                _cache[14] || (_cache[14] = createBaseVNode("span", { class: "label" }, "处理状态：", -1)),
                createVNode(_component_el_tag, {
                  type: getStatusTag(currentFeedback.value.status)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(getStatusLabel(currentFeedback.value.status)), 1)
                  ]),
                  _: 1
                }, 8, ["type"])
              ]),
              createBaseVNode("div", _hoisted_8, [
                _cache[15] || (_cache[15] = createBaseVNode("span", { class: "label" }, "提交时间：", -1)),
                createBaseVNode("span", null, toDisplayString(formatDate(currentFeedback.value.timestamp)), 1)
              ]),
              createBaseVNode("div", _hoisted_9, [
                _cache[16] || (_cache[16] = createBaseVNode("span", { class: "label" }, "反馈内容：", -1)),
                createBaseVNode("div", _hoisted_10, toDisplayString(currentFeedback.value.content), 1)
              ]),
              currentFeedback.value.scooterId ? (openBlock(), createElementBlock("div", _hoisted_11, [
                _cache[17] || (_cache[17] = createBaseVNode("span", { class: "label" }, "相关车辆：", -1)),
                createBaseVNode("span", null, toDisplayString(currentFeedback.value.scooterId), 1)
              ])) : createCommentVNode("", true),
              currentFeedback.value.reply ? (openBlock(), createElementBlock("div", _hoisted_12, [
                _cache[18] || (_cache[18] = createBaseVNode("span", { class: "label" }, "回复内容：", -1)),
                createBaseVNode("div", _hoisted_13, toDisplayString(currentFeedback.value.reply), 1)
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(_component_el_dialog, {
          modelValue: replyVisible.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => replyVisible.value = $event),
          title: "回复反馈",
          width: "50%"
        }, {
          footer: withCtx(() => [
            createBaseVNode("span", _hoisted_16, [
              createVNode(_component_el_button, {
                onClick: _cache[5] || (_cache[5] = ($event) => replyVisible.value = false)
              }, {
                default: withCtx(() => _cache[20] || (_cache[20] = [
                  createTextVNode("取消")
                ])),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: submitReply
              }, {
                default: withCtx(() => _cache[21] || (_cache[21] = [
                  createTextVNode(" 提交回复 ")
                ])),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            currentFeedback.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, [
                _cache[19] || (_cache[19] = createBaseVNode("h4", null, "反馈内容：", -1)),
                createBaseVNode("p", null, toDisplayString(currentFeedback.value.content), 1)
              ]),
              createVNode(_component_el_form, {
                model: replyForm.value,
                "label-width": "80px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "回复内容" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: replyForm.value.content,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => replyForm.value.content = $event),
                        type: "textarea",
                        rows: 4,
                        placeholder: "请输入回复内容"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "处理状态" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_select, {
                        modelValue: replyForm.value.status,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => replyForm.value.status = $event)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_option, {
                            label: "处理中",
                            value: "processing"
                          }),
                          createVNode(_component_el_option, {
                            label: "已完成",
                            value: "completed"
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
const Feedback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e17a3cb1"]]);
export {
  Feedback as default
};
//# sourceMappingURL=Feedback-9d9804ad.js.map
