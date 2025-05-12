import { Z as computed, ab as bell_default, V as promotion_default, ac as tools_default, a1 as bicycle_default, ad as present_default, $ as warning_default, k as resolveComponent, o as openBlock, c as createElementBlock, b as createBaseVNode, C as normalizeClass, d as createVNode, w as withCtx, g as createBlock, ae as resolveDynamicComponent, j as createTextVNode, t as toDisplayString, f as createCommentVNode, r as ref, L as ElMessage, E as ElMessageBox, e as unref, a6 as check_default, af as delete_default, F as Fragment, J as renderList } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const MessageItem_vue_vue_type_style_index_0_scoped_d277e81e_lang = "";
const _hoisted_1$1 = { class: "flex items-start" };
const _hoisted_2$1 = { class: "message-icon mr-4 flex-shrink-0" };
const _hoisted_3$1 = { class: "message-content flex-grow" };
const _hoisted_4$1 = { class: "flex items-center justify-between mb-1" };
const _hoisted_5$1 = { class: "message-title font-medium text-gray-900 flex items-center" };
const _hoisted_6$1 = {
  key: 0,
  class: "ml-2 w-2 h-2 rounded-full bg-red-500"
};
const _hoisted_7$1 = { class: "message-time text-xs text-gray-500" };
const _hoisted_8$1 = { class: "message-body text-sm text-gray-600 mb-2" };
const _hoisted_9$1 = { class: "message-actions flex justify-end space-x-2" };
const _sfc_main$1 = {
  __name: "MessageItem",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  emits: ["mark-read", "delete"],
  setup(__props) {
    const props = __props;
    const getIconComponent = computed(() => {
      switch (props.message.icon) {
        case "warning":
          return warning_default;
        case "gift":
          return present_default;
        case "bike":
          return bicycle_default;
        case "tools":
          return tools_default;
        case "promotion":
          return promotion_default;
        default:
          return bell_default;
      }
    });
    const iconBackgroundClass = computed(() => {
      switch (props.message.type) {
        case "system":
          return "bg-blue-100";
        case "activity":
          return "bg-amber-100";
        case "trip":
          return "bg-green-100";
        default:
          return "bg-gray-100";
      }
    });
    const iconColor = computed(() => {
      switch (props.message.type) {
        case "system":
          return "#3b82f6";
        case "activity":
          return "#f59e0b";
        case "trip":
          return "#10b981";
        default:
          return "#6b7280";
      }
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["message-item-container", { "unread": !__props.message.isRead }])
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            createBaseVNode("div", {
              class: normalizeClass(["icon-wrapper", iconBackgroundClass.value])
            }, [
              createVNode(_component_el_icon, {
                size: 20,
                color: iconColor.value
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(getIconComponent.value)))
                ]),
                _: 1
              }, 8, ["color"])
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                createTextVNode(toDisplayString(__props.message.title) + " ", 1),
                !__props.message.isRead ? (openBlock(), createElementBlock("div", _hoisted_6$1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_7$1, toDisplayString(__props.message.time), 1)
            ]),
            createBaseVNode("div", _hoisted_8$1, toDisplayString(__props.message.content), 1),
            createBaseVNode("div", _hoisted_9$1, [
              !__props.message.isRead ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "text",
                size: "small",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("mark-read", __props.message.id))
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" 标记为已读 ")
                ])),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_el_button, {
                type: "text",
                size: "small",
                class: "text-red-500",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("delete", __props.message.id))
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" 删除 ")
                ])),
                _: 1
              })
            ])
          ])
        ])
      ], 2);
    };
  }
};
const MessageItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d277e81e"]]);
const Messages_vue_vue_type_style_index_0_scoped_732eaf89_lang = "";
const _hoisted_1 = { class: "messages-page py-8" };
const _hoisted_2 = { class: "container mx-auto px-4 sm:px-6 lg:px-8" };
const _hoisted_3 = { class: "bg-white rounded-xl shadow-md overflow-hidden" };
const _hoisted_4 = { class: "p-6" };
const _hoisted_5 = { class: "flex justify-between items-center mb-6" };
const _hoisted_6 = { class: "flex space-x-2" };
const _hoisted_7 = { class: "message-list" };
const _hoisted_8 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_9 = { class: "message-list" };
const _hoisted_10 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_11 = { class: "message-list" };
const _hoisted_12 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_13 = { class: "message-list" };
const _hoisted_14 = {
  key: 1,
  class: "empty-state"
};
const _sfc_main = {
  __name: "Messages",
  setup(__props) {
    const activeTab = ref("all");
    const messages = ref([
      {
        id: 1,
        type: "system",
        title: "账户安全提醒",
        content: "您的账户刚刚成功登录，登录时间: 2024-04-12 14:30，如非本人操作，请立即修改密码。",
        time: "2024-04-12 14:30",
        isRead: false,
        icon: "warning"
      },
      {
        id: 2,
        type: "activity",
        title: "专属优惠来啦！",
        content: "尊敬的用户，您有一张5元骑行券已发放到账户，有效期7天，请及时使用。",
        time: "2024-04-11 10:15",
        isRead: true,
        icon: "gift"
      },
      {
        id: 3,
        type: "trip",
        title: "骑行结束提醒",
        content: "您的行程已结束，费用3.5元已从账户余额扣除，骑行时长25分钟，距离3.2公里。",
        time: "2024-04-10 18:45",
        isRead: false,
        icon: "bike"
      },
      {
        id: 4,
        type: "system",
        title: "系统维护通知",
        content: "系统将于2024-04-15 03:00-05:00进行例行维护，维护期间可能无法使用部分功能，请提前做好安排。",
        time: "2024-04-10 09:30",
        isRead: false,
        icon: "tools"
      },
      {
        id: 5,
        type: "activity",
        title: "周末骑行优惠活动",
        content: "本周末（4月13-14日）骑行满30分钟，即可获得10积分奖励，多骑多得，上不封顶！",
        time: "2024-04-09 16:20",
        isRead: true,
        icon: "promotion"
      }
    ]);
    const filteredMessages = computed(() => {
      if (activeTab.value === "all") {
        return messages.value;
      } else {
        return messages.value.filter((message) => message.type === activeTab.value);
      }
    });
    const getMessagesByType = (type) => {
      return messages.value.filter((message) => message.type === type);
    };
    const markAsRead = (messageId) => {
      const message = messages.value.find((msg) => msg.id === messageId);
      if (message && !message.isRead) {
        message.isRead = true;
        ElMessage.success("消息已标记为已读");
      }
    };
    const markAllAsRead = () => {
      if (messages.value.some((msg) => !msg.isRead)) {
        messages.value.forEach((msg) => {
          msg.isRead = true;
        });
        ElMessage.success("全部消息已标记为已读");
      } else {
        ElMessage.info("没有未读消息");
      }
    };
    const deleteMessage = (messageId) => {
      ElMessageBox.confirm("确定要删除这条消息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        messages.value = messages.value.filter((msg) => msg.id !== messageId);
        ElMessage.success("消息已删除");
      }).catch(() => {
      });
    };
    const clearAllMessages = () => {
      if (messages.value.length === 0) {
        ElMessage.info("没有消息可清空");
        return;
      }
      ElMessageBox.confirm("确定要清空所有消息吗？此操作不可恢复！", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        messages.value = [];
        ElMessage.success("所有消息已清空");
      }).catch(() => {
      });
    };
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[3] || (_cache[3] = createBaseVNode("h1", { class: "text-2xl font-bold text-gray-800" }, "消息通知", -1)),
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    plain: "",
                    size: "small",
                    onClick: markAllAsRead
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx(() => [
                          createVNode(unref(check_default))
                        ]),
                        _: 1
                      }),
                      _cache[1] || (_cache[1] = createTextVNode(" 全部已读 "))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "danger",
                    plain: "",
                    size: "small",
                    onClick: clearAllMessages
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx(() => [
                          createVNode(unref(delete_default))
                        ]),
                        _: 1
                      }),
                      _cache[2] || (_cache[2] = createTextVNode(" 清空消息 "))
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode(_component_el_tabs, {
                modelValue: activeTab.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activeTab.value = $event),
                class: "message-tabs"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_tab_pane, {
                    name: "all",
                    label: "全部消息"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_7, [
                        filteredMessages.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(filteredMessages.value, (message, index) => {
                          return openBlock(), createElementBlock("div", {
                            key: message.id,
                            class: normalizeClass(["message-item", { "border-b border-gray-200": index !== filteredMessages.value.length - 1 }])
                          }, [
                            createVNode(MessageItem, {
                              message,
                              onMarkRead: ($event) => markAsRead(message.id),
                              onDelete: ($event) => deleteMessage(message.id)
                            }, null, 8, ["message", "onMarkRead", "onDelete"])
                          ], 2);
                        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_8, [
                          createVNode(_component_el_empty, { description: "暂无消息" })
                        ]))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_tab_pane, {
                    name: "system",
                    label: "系统通知"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9, [
                        getMessagesByType("system").length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(getMessagesByType("system"), (message, index) => {
                          return openBlock(), createElementBlock("div", {
                            key: message.id,
                            class: normalizeClass(["message-item", { "border-b border-gray-200": index !== getMessagesByType("system").length - 1 }])
                          }, [
                            createVNode(MessageItem, {
                              message,
                              onMarkRead: ($event) => markAsRead(message.id),
                              onDelete: ($event) => deleteMessage(message.id)
                            }, null, 8, ["message", "onMarkRead", "onDelete"])
                          ], 2);
                        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_10, [
                          createVNode(_component_el_empty, { description: "暂无系统通知" })
                        ]))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_tab_pane, {
                    name: "activity",
                    label: "活动消息"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_11, [
                        getMessagesByType("activity").length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(getMessagesByType("activity"), (message, index) => {
                          return openBlock(), createElementBlock("div", {
                            key: message.id,
                            class: normalizeClass(["message-item", { "border-b border-gray-200": index !== getMessagesByType("activity").length - 1 }])
                          }, [
                            createVNode(MessageItem, {
                              message,
                              onMarkRead: ($event) => markAsRead(message.id),
                              onDelete: ($event) => deleteMessage(message.id)
                            }, null, 8, ["message", "onMarkRead", "onDelete"])
                          ], 2);
                        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_12, [
                          createVNode(_component_el_empty, { description: "暂无活动消息" })
                        ]))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_tab_pane, {
                    name: "trip",
                    label: "行程提醒"
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_13, [
                        getMessagesByType("trip").length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(getMessagesByType("trip"), (message, index) => {
                          return openBlock(), createElementBlock("div", {
                            key: message.id,
                            class: normalizeClass(["message-item", { "border-b border-gray-200": index !== getMessagesByType("trip").length - 1 }])
                          }, [
                            createVNode(MessageItem, {
                              message,
                              onMarkRead: ($event) => markAsRead(message.id),
                              onDelete: ($event) => deleteMessage(message.id)
                            }, null, 8, ["message", "onMarkRead", "onDelete"])
                          ], 2);
                        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_14, [
                          createVNode(_component_el_empty, { description: "暂无行程提醒" })
                        ]))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ])
          ])
        ])
      ]);
    };
  }
};
const Messages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-732eaf89"]]);
export {
  Messages as default
};
//# sourceMappingURL=Messages-8e172f4f.js.map
