import { r as ref, Z as computed, k as resolveComponent, o as openBlock, c as createElementBlock, d as createVNode, w as withCtx, e as unref, ab as bell_default, b as createBaseVNode, g as createBlock, j as createTextVNode, f as createCommentVNode, F as Fragment, J as renderList, C as normalizeClass, ae as resolveDynamicComponent, t as toDisplayString, m as info_filled_default, L as ElMessage, $ as warning_default, a6 as check_default, av as circle_close_filled_default, a as useUserStore, u as useRouter, I as onMounted, H as setting_default, n as user_default, Q as connection_default, a2 as list_default, ac as tools_default, l as data_board_default, aw as trend_charts_default, y as chat_line_round_default, a8 as back_default, ax as right_default, D as menu_default, G as close_default } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const NotificationPanel_vue_vue_type_style_index_0_scoped_ae7a02c1_lang = "";
const _hoisted_1$1 = { class: "notification-panel" };
const _hoisted_2$1 = { class: "notification-header" };
const _hoisted_3$1 = { class: "notification-list" };
const _hoisted_4$1 = ["onClick"];
const _hoisted_5$1 = { class: "notification-content" };
const _hoisted_6$1 = { class: "notification-title" };
const _hoisted_7$1 = { class: "notification-message" };
const _hoisted_8$1 = { class: "notification-time" };
const _hoisted_9$1 = {
  key: 0,
  class: "notification-footer"
};
const _sfc_main$1 = {
  __name: "NotificationPanel",
  setup(__props) {
    const notifications = ref([
      {
        id: 1,
        type: "warning",
        title: "系统维护通知",
        message: "系统将于今晚22:00-23:00进行例行维护",
        timestamp: /* @__PURE__ */ new Date("2024-03-25T20:00:00"),
        read: false
      },
      {
        id: 2,
        type: "success",
        title: "订单完成",
        message: "您的订单 #12345 已完成，感谢使用",
        timestamp: /* @__PURE__ */ new Date("2024-03-25T15:30:00"),
        read: false
      },
      {
        id: 3,
        type: "info",
        title: "新功能上线",
        message: "我们新增了扫码租车功能，欢迎体验",
        timestamp: /* @__PURE__ */ new Date("2024-03-24T10:00:00"),
        read: true
      }
    ]);
    const unreadCount = computed(() => {
      return notifications.value.filter((n) => !n.read).length;
    });
    const getNotificationIcon = (type) => {
      const icons = {
        warning: warning_default,
        success: check_default,
        info: info_filled_default,
        error: circle_close_filled_default
      };
      return icons[type] || info_filled_default;
    };
    const formatTime = (timestamp) => {
      const now = /* @__PURE__ */ new Date();
      const date = new Date(timestamp);
      const diff = now - date;
      if (diff < 6e4) {
        return "刚刚";
      }
      if (diff < 36e5) {
        return `${Math.floor(diff / 6e4)}分钟前`;
      }
      if (diff < 864e5) {
        return `${Math.floor(diff / 36e5)}小时前`;
      }
      if (diff < 2592e6) {
        return `${Math.floor(diff / 864e5)}天前`;
      }
      return date.toLocaleDateString();
    };
    const handleNotificationClick = (notification) => {
      if (!notification.read) {
        notification.read = true;
      }
      switch (notification.type) {
        case "warning":
          ElMessage.info("系统维护通知");
          break;
        case "success":
          ElMessage.success("订单已完成");
          break;
        case "info":
          ElMessage.info("新功能已上线");
          break;
      }
    };
    const markAllAsRead = () => {
      notifications.value.forEach((notification) => {
        notification.read = true;
      });
      ElMessage.success("已全部标记为已读");
    };
    const viewAllNotifications = () => {
      ElMessage.info("查看全部通知功能开发中");
    };
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_badge = resolveComponent("el-badge");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_popover = resolveComponent("el-popover");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_component_el_popover, {
          placement: "bottom-end",
          width: 350,
          trigger: "click",
          "popper-class": "notification-popover"
        }, {
          reference: withCtx(() => [
            createVNode(_component_el_badge, {
              value: unreadCount.value,
              hidden: unreadCount.value === 0
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, {
                  size: "20",
                  class: "text-gray-500 cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(bell_default))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["value", "hidden"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2$1, [
              _cache[1] || (_cache[1] = createBaseVNode("h3", { class: "text-lg font-medium" }, "通知", -1)),
              notifications.value.length > 0 ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "primary",
                link: "",
                onClick: markAllAsRead
              }, {
                default: withCtx(() => _cache[0] || (_cache[0] = [
                  createTextVNode(" 全部标记为已读 ")
                ])),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_3$1, [
              notifications.value.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(notifications.value, (notification) => {
                return openBlock(), createElementBlock("div", {
                  key: notification.id,
                  class: normalizeClass(["notification-item", { "unread": !notification.read }]),
                  onClick: ($event) => handleNotificationClick(notification)
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["notification-icon", notification.type])
                  }, [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(getNotificationIcon(notification.type))))
                      ]),
                      _: 2
                    }, 1024)
                  ], 2),
                  createBaseVNode("div", _hoisted_5$1, [
                    createBaseVNode("div", _hoisted_6$1, toDisplayString(notification.title), 1),
                    createBaseVNode("div", _hoisted_7$1, toDisplayString(notification.message), 1),
                    createBaseVNode("div", _hoisted_8$1, toDisplayString(formatTime(notification.timestamp)), 1)
                  ])
                ], 10, _hoisted_4$1);
              }), 128)) : (openBlock(), createBlock(_component_el_empty, {
                key: 1,
                description: "暂无通知"
              }))
            ]),
            notifications.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
              createVNode(_component_el_button, {
                type: "primary",
                link: "",
                onClick: viewAllNotifications
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode(" 查看全部 ")
                ])),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
const NotificationPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-ae7a02c1"]]);
const AdminLayout_vue_vue_type_style_index_0_scoped_63e822be_lang = "";
const _hoisted_1 = { class: "admin-layout flex h-screen bg-gray-100" };
const _hoisted_2 = { class: "sidebar bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-800" };
const _hoisted_4 = { class: "flex items-center" };
const _hoisted_5 = { class: "w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center mr-3" };
const _hoisted_6 = { class: "py-4" };
const _hoisted_7 = { class: "flex items-center" };
const _hoisted_8 = { class: "flex-1 flex flex-col overflow-hidden" };
const _hoisted_9 = { class: "bg-white shadow-sm" };
const _hoisted_10 = { class: "flex items-center justify-between h-16 px-6" };
const _hoisted_11 = { class: "flex items-center" };
const _hoisted_12 = { class: "flex items-center" };
const _hoisted_13 = { class: "flex items-center" };
const _hoisted_14 = { class: "avatar w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2" };
const _hoisted_15 = { class: "hidden md:block" };
const _hoisted_16 = { class: "text-sm font-medium" };
const _hoisted_17 = {
  key: 0,
  class: "md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
};
const _hoisted_18 = { class: "w-64 h-full bg-gray-900 p-4 transform transition-transform duration-300 ease-in-out" };
const _hoisted_19 = { class: "flex justify-between items-center mb-6" };
const _hoisted_20 = { class: "flex-1 overflow-auto bg-gray-50 pb-8" };
const _sfc_main = {
  __name: "AdminLayout",
  setup(__props) {
    const userStore = useUserStore();
    const router = useRouter();
    const mobileMenuOpen = ref(false);
    const currentRoute = ref(router.currentRoute.value.path);
    onMounted(() => {
      console.log("AdminLayout mounted, isAdmin:", userStore.isAdmin);
      if (!userStore.isAdmin) {
        ElMessage({
          type: "error",
          message: "您没有管理员权限，无法访问此页面",
          duration: 3e3
        });
        router.push("/");
        return;
      }
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          redirectToHome();
          return;
        }
        const user = JSON.parse(userData);
        if (user.role !== "admin") {
          redirectToHome();
          return;
        }
      } catch (e) {
        redirectToHome();
      }
    });
    function redirectToHome() {
      ElMessage({
        type: "error",
        message: "权限验证失败，无法访问管理页面",
        duration: 3e3
      });
      router.push("/");
    }
    const logout = () => {
      userStore.clearUser();
      ElMessage({
        type: "success",
        message: "退出登录成功",
        duration: 1500
      });
      router.push("/login");
    };
    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };
    const navigateTo = (path) => {
      console.log("导航到:", path);
      currentRoute.value = path;
      router.push(path);
    };
    const isActive = (path) => {
      return router.currentRoute.value.path === path;
    };
    const navigateAndCloseMobile = (path) => {
      console.log("导航到:", path);
      currentRoute.value = path;
      router.push(path);
      closeMobileMenu();
    };
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_el_icon, { size: "20" }, {
                  default: withCtx(() => [
                    createVNode(unref(setting_default))
                  ]),
                  _: 1
                })
              ]),
              _cache[17] || (_cache[17] = createBaseVNode("div", null, [
                createBaseVNode("h1", { class: "text-lg font-semibold" }, "管理后台"),
                createBaseVNode("div", { class: "text-xs text-gray-400" }, "电动滑板车租赁系统")
              ], -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", {
              onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("/admin/users")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/users") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(user_default))
                ]),
                _: 1
              }),
              _cache[18] || (_cache[18] = createBaseVNode("span", null, "用户管理", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => navigateTo("/admin/vehicles")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/vehicles") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(connection_default))
                ]),
                _: 1
              }),
              _cache[19] || (_cache[19] = createBaseVNode("span", null, "车辆管理", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[2] || (_cache[2] = ($event) => navigateTo("/admin/orders")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/orders") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(list_default))
                ]),
                _: 1
              }),
              _cache[20] || (_cache[20] = createBaseVNode("span", null, "订单管理", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[3] || (_cache[3] = ($event) => navigateTo("/admin/maintenance")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/maintenance") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(tools_default))
                ]),
                _: 1
              }),
              _cache[21] || (_cache[21] = createBaseVNode("span", null, "维护记录", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[4] || (_cache[4] = ($event) => navigateTo("/admin/database")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/database") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(data_board_default))
                ]),
                _: 1
              }),
              _cache[22] || (_cache[22] = createBaseVNode("span", null, "数据库管理", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[5] || (_cache[5] = ($event) => navigateTo("/admin/reports")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/reports") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(trend_charts_default))
                ]),
                _: 1
              }),
              _cache[23] || (_cache[23] = createBaseVNode("span", null, "数据报表", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[6] || (_cache[6] = ($event) => navigateTo("/admin/feedback")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/feedback") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(chat_line_round_default))
                ]),
                _: 1
              }),
              _cache[24] || (_cache[24] = createBaseVNode("span", null, "反馈管理", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[7] || (_cache[7] = ($event) => navigateTo("/admin/settings")),
              class: normalizeClass(["menu-item", { "active": isActive("/admin/settings") }])
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(setting_default))
                ]),
                _: 1
              }),
              _cache[25] || (_cache[25] = createBaseVNode("span", null, "系统设置", -1))
            ], 2),
            createBaseVNode("div", {
              onClick: _cache[8] || (_cache[8] = ($event) => navigateTo("/")),
              class: "menu-item !justify-between mt-4"
            }, [
              createBaseVNode("div", _hoisted_7, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(back_default))
                  ]),
                  _: 1
                }),
                _cache[26] || (_cache[26] = createBaseVNode("span", null, "返回用户首页", -1))
              ])
            ]),
            createBaseVNode("div", {
              onClick: logout,
              class: "menu-item text-red-300 hover:text-red-200 cursor-pointer"
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(right_default))
                ]),
                _: 1
              }),
              _cache[27] || (_cache[27] = createBaseVNode("span", null, "退出登录", -1))
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("header", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("button", {
                  onClick: toggleMobileMenu,
                  class: "lg:hidden mr-2 text-gray-500"
                }, [
                  createVNode(_component_el_icon, { size: "24" }, {
                    default: withCtx(() => [
                      createVNode(unref(menu_default))
                    ]),
                    _: 1
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_12, [
                createVNode(NotificationPanel, { class: "mr-4" }),
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("div", _hoisted_14, toDisplayString(unref(userStore).username.slice(0, 1)), 1),
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", _hoisted_16, toDisplayString(unref(userStore).username), 1),
                    _cache[28] || (_cache[28] = createBaseVNode("div", { class: "text-xs text-gray-500" }, "管理员", -1))
                  ])
                ])
              ])
            ])
          ]),
          mobileMenuOpen.value ? (openBlock(), createElementBlock("div", _hoisted_17, [
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                _cache[29] || (_cache[29] = createBaseVNode("div", { class: "text-white text-lg font-semibold" }, "管理后台", -1)),
                createBaseVNode("button", {
                  onClick: toggleMobileMenu,
                  class: "text-white"
                }, [
                  createVNode(_component_el_icon, { size: "20" }, {
                    default: withCtx(() => [
                      createVNode(unref(close_default))
                    ]),
                    _: 1
                  })
                ])
              ]),
              createBaseVNode("div", {
                onClick: _cache[9] || (_cache[9] = ($event) => navigateAndCloseMobile("/admin/users")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/users") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(user_default))
                  ]),
                  _: 1
                }),
                _cache[30] || (_cache[30] = createBaseVNode("span", null, "用户管理", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[10] || (_cache[10] = ($event) => navigateAndCloseMobile("/admin/vehicles")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/vehicles") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(connection_default))
                  ]),
                  _: 1
                }),
                _cache[31] || (_cache[31] = createBaseVNode("span", null, "车辆管理", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[11] || (_cache[11] = ($event) => navigateAndCloseMobile("/admin/orders")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/orders") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(list_default))
                  ]),
                  _: 1
                }),
                _cache[32] || (_cache[32] = createBaseVNode("span", null, "订单管理", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[12] || (_cache[12] = ($event) => navigateAndCloseMobile("/admin/maintenance")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/maintenance") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(tools_default))
                  ]),
                  _: 1
                }),
                _cache[33] || (_cache[33] = createBaseVNode("span", null, "维护记录", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[13] || (_cache[13] = ($event) => navigateAndCloseMobile("/admin/database")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/database") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(data_board_default))
                  ]),
                  _: 1
                }),
                _cache[34] || (_cache[34] = createBaseVNode("span", null, "数据库管理", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[14] || (_cache[14] = ($event) => navigateAndCloseMobile("/admin/reports")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/reports") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(trend_charts_default))
                  ]),
                  _: 1
                }),
                _cache[35] || (_cache[35] = createBaseVNode("span", null, "数据报表", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[15] || (_cache[15] = ($event) => navigateAndCloseMobile("/admin/feedback")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/feedback") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(chat_line_round_default))
                  ]),
                  _: 1
                }),
                _cache[36] || (_cache[36] = createBaseVNode("span", null, "反馈管理", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: _cache[16] || (_cache[16] = ($event) => navigateAndCloseMobile("/admin/settings")),
                class: normalizeClass(["mobile-menu-item", { "active": isActive("/admin/settings") }])
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(setting_default))
                  ]),
                  _: 1
                }),
                _cache[37] || (_cache[37] = createBaseVNode("span", null, "系统设置", -1))
              ], 2),
              createBaseVNode("div", {
                onClick: logout,
                class: "mobile-menu-item text-red-300 cursor-pointer"
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(right_default))
                  ]),
                  _: 1
                }),
                _cache[38] || (_cache[38] = createBaseVNode("span", null, "退出登录", -1))
              ])
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("main", _hoisted_20, [
            createVNode(_component_router_view)
          ])
        ])
      ]);
    };
  }
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63e822be"]]);
export {
  AdminLayout as default
};
//# sourceMappingURL=AdminLayout-1f9ebc1f.js.map
