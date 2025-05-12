var __defProp = Object.defineProperty;
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
import { a as useUserStore, Z as computed, I as onMounted, c as createElementBlock, b as createBaseVNode, C as normalizeClass, e as unref, t as toDisplayString, d as createVNode, w as withCtx, j as createTextVNode, F as Fragment, f as createCommentVNode, _ as userApi, k as resolveComponent, o as openBlock, X as star_filled_default, n as user_default, $ as warning_default, a0 as data_line_default, R as user_filled_default, a1 as bicycle_default, a2 as list_default, p as wallet_default, q as timer_default, x as discount_default, z as lock_default, P as arrow_right_default, M as location_default } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Profile_vue_vue_type_style_index_0_scoped_d1dbf77d_lang = "";
const _hoisted_1 = { class: "profile-page py-8" };
const _hoisted_2 = { class: "container mx-auto px-4 sm:px-6 md:px-8" };
const _hoisted_3 = { class: "grid grid-cols-1 md:grid-cols-3 gap-8" };
const _hoisted_4 = { class: "md:col-span-1" };
const _hoisted_5 = { class: "bg-white rounded-xl shadow-md overflow-hidden" };
const _hoisted_6 = { class: "avatar-container mx-auto mb-5 w-24 h-24 rounded-full bg-white p-1 shadow-lg" };
const _hoisted_7 = ["src"];
const _hoisted_8 = { class: "text-white text-xl font-bold mb-1" };
const _hoisted_9 = { class: "px-2 py-0.5 rounded-full bg-white/20" };
const _hoisted_10 = { class: "p-6" };
const _hoisted_11 = {
  key: 0,
  class: "flex flex-col space-y-4"
};
const _hoisted_12 = { class: "p-3 bg-amber-50 rounded-lg" };
const _hoisted_13 = { class: "text-amber-800 font-medium mb-1 flex items-center" };
const _hoisted_14 = { class: "text-sm text-gray-600" };
const _hoisted_15 = { class: "flex justify-between py-1 border-b border-amber-100" };
const _hoisted_16 = { class: "font-medium" };
const _hoisted_17 = { class: "flex justify-between py-1 border-b border-amber-100" };
const _hoisted_18 = { class: "font-medium" };
const _hoisted_19 = { key: 1 };
const _hoisted_20 = { class: "flex items-center justify-between mb-4" };
const _hoisted_21 = { class: "stat-item text-center" };
const _hoisted_22 = { class: "text-lg font-bold text-gray-800" };
const _hoisted_23 = { class: "stat-item text-center" };
const _hoisted_24 = { class: "text-lg font-bold text-gray-800" };
const _hoisted_25 = { class: "stat-item text-center" };
const _hoisted_26 = { class: "text-lg font-bold text-gray-800" };
const _hoisted_27 = { class: "py-4 border-t border-gray-100" };
const _hoisted_28 = { class: "flex items-center" };
const _hoisted_29 = {
  key: 0,
  class: "text-xs text-gray-500"
};
const _hoisted_30 = {
  key: 1,
  class: "text-xs text-green-600"
};
const _hoisted_31 = { class: "mt-3" };
const _hoisted_32 = { class: "mt-4 flex space-x-2" };
const _hoisted_33 = {
  key: 2,
  class: "py-4 text-center"
};
const _hoisted_34 = { class: "md:col-span-2" };
const _hoisted_35 = {
  key: 0,
  class: "bg-white rounded-xl shadow-md overflow-hidden mb-6"
};
const _hoisted_36 = { class: "p-8 text-center" };
const _hoisted_37 = { class: "flex justify-center space-x-4" };
const _hoisted_38 = {
  key: 0,
  class: "bg-white rounded-xl shadow-md overflow-hidden mb-6"
};
const _hoisted_39 = { class: "p-5" };
const _hoisted_40 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_41 = { class: "bg-white rounded-xl shadow-md overflow-hidden mb-6" };
const _hoisted_42 = { class: "p-4 border-b border-gray-100" };
const _hoisted_43 = { class: "font-medium text-gray-800 flex items-center" };
const _hoisted_44 = { class: "p-5" };
const _hoisted_45 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_46 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_47 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_48 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_49 = { class: "bg-white rounded-xl shadow-md overflow-hidden mb-6" };
const _hoisted_50 = { class: "p-4 border-b border-gray-100" };
const _hoisted_51 = { class: "font-medium text-gray-800 flex items-center" };
const _hoisted_52 = { class: "p-5" };
const _hoisted_53 = { class: "grid grid-cols-2 gap-5" };
const _hoisted_54 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_55 = { class: "font-medium text-gray-800" };
const _hoisted_56 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_57 = { class: "font-medium text-gray-800" };
const _hoisted_58 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_59 = { class: "flex items-center" };
const _hoisted_60 = { class: "font-medium text-gray-800 mr-2" };
const _hoisted_61 = {
  key: 0,
  class: "text-xs text-blue-600"
};
const _hoisted_62 = {
  key: 0,
  class: "mt-2"
};
const _hoisted_63 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_64 = { class: "font-medium text-gray-800" };
const _hoisted_65 = { class: "bg-white rounded-xl shadow-md overflow-hidden mb-6" };
const _hoisted_66 = { class: "p-4 border-b border-gray-100 flex justify-between items-center" };
const _hoisted_67 = { class: "font-medium text-gray-800 flex items-center" };
const _hoisted_68 = { class: "p-5" };
const _hoisted_69 = {
  key: 0,
  class: "bg-blue-50 p-4 rounded-lg"
};
const _hoisted_70 = { class: "flex justify-between items-center" };
const _hoisted_71 = { class: "flex items-center" };
const _hoisted_72 = { class: "font-medium text-gray-800" };
const _hoisted_73 = { class: "mt-2 text-sm text-gray-500" };
const _hoisted_74 = { class: "text-right" };
const _hoisted_75 = { class: "font-medium text-gray-800" };
const _hoisted_76 = { class: "text-sm text-gray-500 mt-2" };
const _hoisted_77 = {
  key: 1,
  class: "py-6 text-center text-gray-500"
};
const _sfc_main = {
  __name: "Profile",
  setup(__props) {
    const userStore = useUserStore();
    const format = (percentage) => {
      return `${percentage}/100`;
    };
    const memberLevel = computed(() => {
      var _a, _b;
      const points = ((_b = (_a = userStore.user) == null ? void 0 : _a.statistics) == null ? void 0 : _b.points) || 0;
      if (points >= 200)
        return "黄金会员";
      if (points >= 100)
        return "白银会员";
      return "普通会员";
    });
    const memberProgress = computed(() => {
      var _a, _b;
      const points = ((_b = (_a = userStore.user) == null ? void 0 : _a.statistics) == null ? void 0 : _b.points) || 0;
      if (points >= 200)
        return 100;
      if (points >= 100)
        return points / 2;
      return points;
    });
    const nextLevelPoints = computed(() => {
      var _a, _b;
      const points = ((_b = (_a = userStore.user) == null ? void 0 : _a.statistics) == null ? void 0 : _b.points) || 0;
      if (points >= 200)
        return 0;
      if (points >= 100)
        return 200 - points;
      return 100 - points;
    });
    const formatDate = (dateString) => {
      if (!dateString)
        return "未知";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          console.warn("无效的日期格式:", dateString);
          return dateString;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      } catch (e) {
        console.error("日期格式化错误:", e);
        return dateString;
      }
    };
    const formatDuration = (minutes) => {
      if (!minutes && minutes !== 0)
        return "未知";
      const hours = Math.floor(minutes / 60);
      const mins = Math.floor(minutes % 60);
      if (hours > 0) {
        return `${hours}小时${mins > 0 ? ` ${mins}分钟` : ""}`;
      }
      return `${mins}分钟`;
    };
    const calculateAvgDistance = () => {
      var _a, _b, _c, _d;
      const totalDistance = ((_b = (_a = userStore.user) == null ? void 0 : _a.statistics) == null ? void 0 : _b.totalDistance) || 0;
      const ridesCount = ((_d = (_c = userStore.user) == null ? void 0 : _c.statistics) == null ? void 0 : _d.ridesCount) || 0;
      if (ridesCount === 0)
        return "0.0";
      const avgDistance = totalDistance / ridesCount;
      return avgDistance.toFixed(1);
    };
    const loadUserData = () => __async(this, null, function* () {
      var _a;
      try {
        const response = yield userApi.getProfile();
        console.log("获取到的用户信息:", response == null ? void 0 : response.data);
        if (((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.success) && response.data.user) {
          const userData = __spreadValues(__spreadValues({}, userStore.user), response.data.user);
          userStore.setUser(userData);
          console.log("用户信息已更新:", userData);
        }
      } catch (error) {
        console.error("加载用户信息失败:", error);
      }
    });
    onMounted(() => {
      loadUserData();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_progress = resolveComponent("el-progress");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", {
                  class: normalizeClass([unref(userStore).isAdmin ? "bg-gradient-to-r from-amber-500 to-amber-600" : "bg-gradient-to-r from-blue-500 to-blue-600", "px-6 py-10 text-center"])
                }, [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("img", {
                      src: ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || "https://randomuser.me/api/portraits/men/32.jpg",
                      class: "rounded-full w-full h-full object-cover",
                      alt: "用户头像"
                    }, null, 8, _hoisted_7)
                  ]),
                  createBaseVNode("h2", _hoisted_8, toDisplayString(((_b = unref(userStore).user) == null ? void 0 : _b.username) || "未登录用户"), 1),
                  createBaseVNode("div", {
                    class: normalizeClass(["text-sm", [unref(userStore).isAdmin ? "text-amber-100" : "text-blue-100"]])
                  }, [
                    createBaseVNode("span", _hoisted_9, toDisplayString(unref(userStore).isAdmin ? "系统管理员" : "普通用户"), 1)
                  ], 2)
                ], 2),
                createBaseVNode("div", _hoisted_10, [
                  unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, [
                      createBaseVNode("div", _hoisted_13, [
                        createVNode(_component_el_icon, { class: "mr-1" }, {
                          default: withCtx(() => [
                            createVNode(unref(star_filled_default))
                          ]),
                          _: 1
                        }),
                        _cache[0] || (_cache[0] = createTextVNode(" 管理员信息 "))
                      ]),
                      createBaseVNode("div", _hoisted_14, [
                        createBaseVNode("div", _hoisted_15, [
                          _cache[1] || (_cache[1] = createBaseVNode("span", null, "员工ID:", -1)),
                          createBaseVNode("span", _hoisted_16, toDisplayString(((_c = unref(userStore).user) == null ? void 0 : _c.id) || "ADM10086"), 1)
                        ]),
                        createBaseVNode("div", _hoisted_17, [
                          _cache[2] || (_cache[2] = createBaseVNode("span", null, "邮箱:", -1)),
                          createBaseVNode("span", _hoisted_18, toDisplayString(((_d = unref(userStore).user) == null ? void 0 : _d.email) || "admin@example.com"), 1)
                        ]),
                        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "flex justify-between py-1" }, [
                          createBaseVNode("span", null, "权限等级:"),
                          createBaseVNode("span", { class: "font-medium" }, "高级管理员")
                        ], -1))
                      ])
                    ])
                  ])) : unref(userStore).isAuthenticated ? (openBlock(), createElementBlock("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("div", _hoisted_21, [
                        createBaseVNode("div", _hoisted_22, toDisplayString(((_f = (_e = unref(userStore).user) == null ? void 0 : _e.statistics) == null ? void 0 : _f.ridesCount) || 0), 1),
                        _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-xs text-gray-500" }, "骑行次数", -1))
                      ]),
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("div", _hoisted_24, toDisplayString(calculateAvgDistance()), 1),
                        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-xs text-gray-500" }, "平均距离(km)", -1))
                      ]),
                      createBaseVNode("div", _hoisted_25, [
                        createBaseVNode("div", _hoisted_26, toDisplayString(((_h = (_g = unref(userStore).user) == null ? void 0 : _g.statistics) == null ? void 0 : _h.points) || 0), 1),
                        _cache[6] || (_cache[6] = createBaseVNode("div", { class: "text-xs text-gray-500" }, "累计积分", -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_27, [
                      _cache[7] || (_cache[7] = createBaseVNode("h3", { class: "font-medium text-gray-700 mb-3" }, "会员等级", -1)),
                      createBaseVNode("div", _hoisted_28, [
                        createBaseVNode("div", {
                          class: normalizeClass([
                            "level-badge rounded-full px-3 py-1 text-xs font-semibold mr-2",
                            memberLevel.value === "普通会员" ? "bg-blue-100 text-blue-800" : memberLevel.value === "白银会员" ? "bg-gray-200 text-gray-800" : "bg-yellow-100 text-yellow-800"
                          ])
                        }, toDisplayString(memberLevel.value), 3),
                        nextLevelPoints.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_29, "还需 " + toDisplayString(nextLevelPoints.value) + " 积分升级", 1)) : (openBlock(), createElementBlock("div", _hoisted_30, "已达最高等级"))
                      ]),
                      createBaseVNode("div", _hoisted_31, [
                        createVNode(_component_el_progress, {
                          percentage: memberProgress.value,
                          format,
                          color: memberLevel.value === "普通会员" ? "#3b82f6" : memberLevel.value === "白银会员" ? "#9ca3af" : "#eab308"
                        }, null, 8, ["percentage", "color"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_32, [
                      createVNode(_component_router_link, {
                        to: "/user/edit",
                        class: "flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-center text-sm transition duration-200"
                      }, {
                        default: withCtx(() => _cache[8] || (_cache[8] = [
                          createTextVNode("编辑个人资料")
                        ])),
                        _: 1
                      })
                    ])
                  ])) : (openBlock(), createElementBlock("div", _hoisted_33, [
                    createVNode(_component_el_icon, {
                      size: "32",
                      color: "#3b82f6",
                      class: "mb-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(user_default))
                      ]),
                      _: 1
                    }),
                    _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-gray-600 mb-3" }, "请登录查看账户信息", -1)),
                    createVNode(_component_router_link, {
                      to: "/auth/login",
                      class: "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm transition duration-200 inline-block"
                    }, {
                      default: withCtx(() => _cache[9] || (_cache[9] = [
                        createTextVNode("登录")
                      ])),
                      _: 1
                    })
                  ]))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_34, [
              !unref(userStore).isAuthenticated ? (openBlock(), createElementBlock("div", _hoisted_35, [
                createBaseVNode("div", _hoisted_36, [
                  createVNode(_component_el_icon, {
                    size: "48",
                    color: "#3b82f6",
                    class: "mb-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(warning_default))
                    ]),
                    _: 1
                  }),
                  _cache[13] || (_cache[13] = createBaseVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-3" }, "您尚未登录", -1)),
                  _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-gray-600 mb-6" }, "请登录后查看您的个人资料和账户信息", -1)),
                  createBaseVNode("div", _hoisted_37, [
                    createVNode(_component_router_link, {
                      to: "/auth/login",
                      class: "px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                    }, {
                      default: withCtx(() => _cache[11] || (_cache[11] = [
                        createTextVNode(" 登录 ")
                      ])),
                      _: 1
                    }),
                    createVNode(_component_router_link, {
                      to: "/auth/register",
                      class: "px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
                    }, {
                      default: withCtx(() => _cache[12] || (_cache[12] = [
                        createTextVNode(" 注册 ")
                      ])),
                      _: 1
                    })
                  ])
                ])
              ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_38, [
                  _cache[19] || (_cache[19] = createBaseVNode("div", { class: "p-4 border-b border-gray-100" }, [
                    createBaseVNode("h3", { class: "font-medium text-gray-800" }, "管理控制台")
                  ], -1)),
                  createBaseVNode("div", _hoisted_39, [
                    createBaseVNode("div", _hoisted_40, [
                      createVNode(_component_router_link, {
                        to: "/admin/dashboard",
                        class: "bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, {
                            class: "mr-3 text-amber-600",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(data_line_default))
                            ]),
                            _: 1
                          }),
                          _cache[15] || (_cache[15] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "font-medium text-gray-800" }, "数据概览"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "查看系统数据统计")
                          ], -1))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/admin/users",
                        class: "bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, {
                            class: "mr-3 text-amber-600",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(user_filled_default))
                            ]),
                            _: 1
                          }),
                          _cache[16] || (_cache[16] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "font-medium text-gray-800" }, "用户管理"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "管理所有用户账号")
                          ], -1))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/admin/scooters",
                        class: "bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, {
                            class: "mr-3 text-amber-600",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(bicycle_default))
                            ]),
                            _: 1
                          }),
                          _cache[17] || (_cache[17] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "font-medium text-gray-800" }, "车辆管理"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "查看和修改车辆信息")
                          ], -1))
                        ]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/admin/orders",
                        class: "bg-amber-50 hover:bg-amber-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, {
                            class: "mr-3 text-amber-600",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(list_default))
                            ]),
                            _: 1
                          }),
                          _cache[18] || (_cache[18] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "font-medium text-gray-800" }, "订单管理"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "查看所有骑行订单")
                          ], -1))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", _hoisted_41, [
                    createBaseVNode("div", _hoisted_42, [
                      createBaseVNode("h3", _hoisted_43, [
                        createVNode(_component_el_icon, { class: "mr-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(list_default))
                          ]),
                          _: 1
                        }),
                        _cache[20] || (_cache[20] = createTextVNode(" 快捷功能 "))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_44, [
                      createBaseVNode("div", _hoisted_45, [
                        createVNode(_component_router_link, {
                          to: "/payment",
                          class: "bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                        }, {
                          default: withCtx(() => {
                            var _a2, _b2;
                            return [
                              createVNode(_component_el_icon, {
                                class: "mr-3 text-blue-600",
                                size: "20"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(wallet_default))
                                ]),
                                _: 1
                              }),
                              createBaseVNode("div", null, [
                                _cache[21] || (_cache[21] = createBaseVNode("div", { class: "font-medium text-gray-800" }, "我的钱包", -1)),
                                createBaseVNode("div", _hoisted_46, "余额: ¥ " + toDisplayString(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.payment) == null ? void 0 : _b2.balance) || "0.00"), 1)
                              ])
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(_component_router_link, {
                          to: "/trips",
                          class: "bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                        }, {
                          default: withCtx(() => {
                            var _a2, _b2;
                            return [
                              createVNode(_component_el_icon, {
                                class: "mr-3 text-blue-600",
                                size: "20"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(timer_default))
                                ]),
                                _: 1
                              }),
                              createBaseVNode("div", null, [
                                _cache[22] || (_cache[22] = createBaseVNode("div", { class: "font-medium text-gray-800" }, "行程记录", -1)),
                                createBaseVNode("div", _hoisted_47, "已骑行: " + toDisplayString(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.statistics) == null ? void 0 : _b2.ridesCount) || 0) + " 次", 1)
                              ])
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(_component_router_link, {
                          to: "/coupons",
                          class: "bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                        }, {
                          default: withCtx(() => {
                            var _a2, _b2;
                            return [
                              createVNode(_component_el_icon, {
                                class: "mr-3 text-blue-600",
                                size: "20"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(discount_default))
                                ]),
                                _: 1
                              }),
                              createBaseVNode("div", null, [
                                _cache[23] || (_cache[23] = createBaseVNode("div", { class: "font-medium text-gray-800" }, "我的优惠券", -1)),
                                createBaseVNode("div", _hoisted_48, "可用: " + toDisplayString(((_b2 = (_a2 = unref(userStore).user) == null ? void 0 : _a2.coupons) == null ? void 0 : _b2.length) || 0) + " 张", 1)
                              ])
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(_component_router_link, {
                          to: "/security",
                          class: "bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors duration-200 flex items-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, {
                              class: "mr-3 text-blue-600",
                              size: "20"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(lock_default))
                              ]),
                              _: 1
                            }),
                            _cache[24] || (_cache[24] = createBaseVNode("div", null, [
                              createBaseVNode("div", { class: "font-medium text-gray-800" }, "安全设置"),
                              createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "管理账户安全")
                            ], -1))
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_49, [
                    createBaseVNode("div", _hoisted_50, [
                      createBaseVNode("h3", _hoisted_51, [
                        createVNode(_component_el_icon, { class: "mr-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(data_line_default))
                          ]),
                          _: 1
                        }),
                        _cache[25] || (_cache[25] = createTextVNode(" 账户概览 "))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_52, [
                      createBaseVNode("div", _hoisted_53, [
                        createBaseVNode("div", _hoisted_54, [
                          _cache[26] || (_cache[26] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "手机号", -1)),
                          createBaseVNode("div", _hoisted_55, toDisplayString(((_i = unref(userStore).user) == null ? void 0 : _i.phone) || "未设置"), 1)
                        ]),
                        createBaseVNode("div", _hoisted_56, [
                          _cache[27] || (_cache[27] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "邮箱", -1)),
                          createBaseVNode("div", _hoisted_57, toDisplayString(((_j = unref(userStore).user) == null ? void 0 : _j.email) || "未设置"), 1)
                        ]),
                        createBaseVNode("div", _hoisted_58, [
                          _cache[28] || (_cache[28] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "会员等级", -1)),
                          createBaseVNode("div", _hoisted_59, [
                            createBaseVNode("div", _hoisted_60, toDisplayString(memberLevel.value), 1),
                            nextLevelPoints.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_61, " 还需 " + toDisplayString(nextLevelPoints.value) + " 积分升级 ", 1)) : createCommentVNode("", true)
                          ]),
                          nextLevelPoints.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_62, [
                            createVNode(_component_el_progress, {
                              percentage: memberProgress.value,
                              format,
                              color: "#3b82f6",
                              "stroke-width": 6
                            }, null, 8, ["percentage"])
                          ])) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_63, [
                          _cache[29] || (_cache[29] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "注册时间", -1)),
                          createBaseVNode("div", _hoisted_64, toDisplayString(((_k = unref(userStore).user) == null ? void 0 : _k.createdAt) ? formatDate(unref(userStore).user.createdAt) : "加载中..."), 1)
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_65, [
                    createBaseVNode("div", _hoisted_66, [
                      createBaseVNode("h3", _hoisted_67, [
                        createVNode(_component_el_icon, { class: "mr-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(bicycle_default))
                          ]),
                          _: 1
                        }),
                        _cache[30] || (_cache[30] = createTextVNode(" 最近骑行 "))
                      ]),
                      createVNode(_component_router_link, {
                        to: "/trips",
                        class: "text-sm text-blue-500 hover:text-blue-600 flex items-center"
                      }, {
                        default: withCtx(() => [
                          _cache[31] || (_cache[31] = createTextVNode(" 查看全部 ")),
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
                    createBaseVNode("div", _hoisted_68, [
                      ((_l = unref(userStore).user) == null ? void 0 : _l.rides) && unref(userStore).user.rides.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_69, [
                        createBaseVNode("div", _hoisted_70, [
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_71, [
                              createVNode(_component_el_icon, { class: "mr-2 text-blue-600" }, {
                                default: withCtx(() => [
                                  createVNode(unref(location_default))
                                ]),
                                _: 1
                              }),
                              createBaseVNode("div", _hoisted_72, toDisplayString(unref(userStore).user.rides[0].startLocation) + " → " + toDisplayString(unref(userStore).user.rides[0].endLocation), 1)
                            ]),
                            createBaseVNode("div", _hoisted_73, toDisplayString(formatDate(unref(userStore).user.rides[0].startTime)) + " · " + toDisplayString(formatDuration(unref(userStore).user.rides[0].duration)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_74, [
                            createBaseVNode("div", _hoisted_75, "¥ " + toDisplayString(unref(userStore).user.rides[0].cost || "0.00"), 1),
                            createBaseVNode("div", _hoisted_76, toDisplayString(unref(userStore).user.rides[0].distance || "0.0") + "km", 1)
                          ])
                        ])
                      ])) : (openBlock(), createElementBlock("div", _hoisted_77, [
                        createVNode(_component_el_icon, {
                          size: "28",
                          class: "mb-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(bicycle_default))
                          ]),
                          _: 1
                        }),
                        _cache[32] || (_cache[32] = createBaseVNode("p", null, "您还没有骑行记录", -1))
                      ]))
                    ])
                  ])
                ], 64))
              ], 64))
            ])
          ])
        ])
      ]);
    };
  }
};
const Profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d1dbf77d"]]);
export {
  Profile as default
};
//# sourceMappingURL=Profile-2ba16d5b.js.map
