import { u as useRouter, a as useUserStore, r as ref, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, e as unref, f as createCommentVNode, g as createBlock, F as Fragment, h as withDirectives, v as vShow, i as withModifiers, j as createTextVNode, E as ElMessageBox, k as resolveComponent, o as openBlock, l as data_board_default, t as toDisplayString, s as star_default, m as info_filled_default, n as user_default, p as wallet_default, q as timer_default, x as discount_default, y as chat_line_round_default, z as lock_default, A as switch_button_default, B as arrow_down_default, C as normalizeClass, D as menu_default, G as close_default, H as setting_default } from "./index-af7cb7d5.js";
import { S as ScooterIcon } from "./ScooterIcon-c95a9db3.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const UserLayout_vue_vue_type_style_index_0_scoped_f5300991_lang = "";
const _hoisted_1 = { class: "user-layout min-h-screen flex flex-col bg-gray-50" };
const _hoisted_2 = { class: "bg-white shadow-sm" };
const _hoisted_3 = { class: "container mx-auto px-4" };
const _hoisted_4 = { class: "flex justify-between items-center h-16" };
const _hoisted_5 = { class: "flex items-center" };
const _hoisted_6 = {
  key: 0,
  class: "hidden md:flex items-center mr-4"
};
const _hoisted_7 = {
  href: "/jump-admin.html",
  target: "_self"
};
const _hoisted_8 = { class: "hidden md:flex items-center space-x-4 px-2 py-1 rounded-lg" };
const _hoisted_9 = { class: "flex items-center space-x-4" };
const _hoisted_10 = { class: "flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200" };
const _hoisted_11 = { class: "relative" };
const _hoisted_12 = {
  key: 0,
  class: "w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"
};
const _hoisted_13 = ["src"];
const _hoisted_14 = {
  key: 1,
  class: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white shadow-md"
};
const _hoisted_15 = { class: "text-white font-semibold" };
const _hoisted_16 = {
  key: 2,
  class: "absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
};
const _hoisted_17 = { class: "hidden sm:block" };
const _hoisted_18 = { class: "text-white text-sm font-medium" };
const _hoisted_19 = { class: "text-blue-100 text-xs -mt-0.5" };
const _hoisted_20 = { class: "bg-gradient-to-r from-blue-600 to-blue-800 py-4 px-5 text-white rounded-t" };
const _hoisted_21 = { class: "flex items-start mb-3" };
const _hoisted_22 = { class: "relative mr-3" };
const _hoisted_23 = {
  key: 0,
  class: "w-14 h-14 rounded-full overflow-hidden border-2 border-white"
};
const _hoisted_24 = ["src"];
const _hoisted_25 = {
  key: 1,
  class: "w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-white"
};
const _hoisted_26 = { class: "text-white text-xl font-semibold" };
const _hoisted_27 = {
  key: 2,
  class: "absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
};
const _hoisted_28 = { class: "flex-1" };
const _hoisted_29 = { class: "font-bold text-lg mb-1" };
const _hoisted_30 = { class: "flex items-center text-sm text-blue-200" };
const _hoisted_31 = { class: "flex justify-between items-center pt-2 border-t border-blue-500" };
const _hoisted_32 = { class: "text-center flex-1" };
const _hoisted_33 = { class: "text-xl font-bold" };
const _hoisted_34 = { class: "text-center flex-1" };
const _hoisted_35 = { class: "text-xl font-bold" };
const _hoisted_36 = { class: "text-center flex-1" };
const _hoisted_37 = { class: "text-xl font-bold" };
const _hoisted_38 = { class: "grid grid-cols-2 gap-2 p-3 bg-gray-50" };
const _hoisted_39 = { class: "flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition" };
const _hoisted_40 = { class: "flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition" };
const _hoisted_41 = { class: "flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition" };
const _hoisted_42 = { class: "flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition" };
const _hoisted_43 = { class: "flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition" };
const _hoisted_44 = { class: "relative" };
const _hoisted_45 = { class: "flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition" };
const _hoisted_46 = { class: "p-3 border-t border-gray-200" };
const _hoisted_47 = { class: "p-4 border-b relative" };
const _hoisted_48 = { class: "p-4" };
const _hoisted_49 = {
  key: 3,
  class: "py-1 border-t border-blue-600 mt-2 pt-2"
};
const _hoisted_50 = { class: "main-content flex-grow" };
const _hoisted_51 = { class: "bg-gray-800 text-white py-8" };
const _hoisted_52 = { class: "container mx-auto px-4" };
const _hoisted_53 = { class: "grid grid-cols-1 md:grid-cols-3 gap-8" };
const _hoisted_54 = { class: "space-y-2" };
const _sfc_main = {
  __name: "UserLayout",
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const mobileMenuOpen = ref(false);
    const dropdownVisible = ref(false);
    const dropdownVisibleChange = (visible) => {
      dropdownVisible.value = visible;
    };
    const handleLogout = () => {
      ElMessageBox.confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        userStore.logout();
        router.push("/");
      }).catch(() => {
      });
    };
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
    };
    const goToAdminConsole = () => {
      window.location.href = "/jump-admin.html";
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_router_link, {
                  to: "/",
                  class: "flex items-center"
                }, {
                  default: withCtx(() => [
                    createVNode(ScooterIcon, { class: "mr-2" }),
                    _cache[9] || (_cache[9] = createBaseVNode("span", { class: "text-lg font-medium" }, "共享滑板车应用", -1))
                  ]),
                  _: 1
                })
              ]),
              unref(userStore).isAdmin && unref(userStore).isAuthenticated ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createBaseVNode("a", _hoisted_7, [
                  createVNode(_component_el_button, {
                    type: "warning",
                    size: "small",
                    class: "font-medium hover:shadow-md"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, { class: "mr-1" }, {
                        default: withCtx(() => [
                          createVNode(unref(data_board_default))
                        ]),
                        _: 1
                      }),
                      _cache[10] || (_cache[10] = createTextVNode("管理控制台 "))
                    ]),
                    _: 1
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("nav", _hoisted_8, [
                createVNode(_component_router_link, {
                  to: "/",
                  class: "nav-link",
                  "active-class": "nav-link-active"
                }, {
                  default: withCtx(() => _cache[11] || (_cache[11] = [
                    createTextVNode("首页")
                  ])),
                  _: 1
                }),
                unref(userStore).isAuthenticated ? (openBlock(), createBlock(_component_router_link, {
                  key: 0,
                  to: "/rent",
                  class: "nav-link",
                  "active-class": "nav-link-active"
                }, {
                  default: withCtx(() => _cache[12] || (_cache[12] = [
                    createTextVNode("租车")
                  ])),
                  _: 1
                })) : createCommentVNode("", true),
                unref(userStore).isAuthenticated ? (openBlock(), createBlock(_component_router_link, {
                  key: 1,
                  to: "/scan",
                  class: "nav-link",
                  "active-class": "nav-link-active"
                }, {
                  default: withCtx(() => _cache[13] || (_cache[13] = [
                    createTextVNode("扫码")
                  ])),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_component_router_link, {
                  to: "/help",
                  class: "nav-link",
                  "active-class": "nav-link-active"
                }, {
                  default: withCtx(() => _cache[14] || (_cache[14] = [
                    createTextVNode("帮助")
                  ])),
                  _: 1
                }),
                createVNode(_component_router_link, {
                  to: "/about",
                  class: "nav-link",
                  "active-class": "nav-link-active"
                }, {
                  default: withCtx(() => _cache[15] || (_cache[15] = [
                    createTextVNode("关于我们")
                  ])),
                  _: 1
                })
              ]),
              createBaseVNode("div", _hoisted_9, [
                !unref(userStore).isAuthenticated ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createVNode(_component_router_link, {
                    to: "/auth/login",
                    class: "nav-btn bg-blue-100 text-blue-600 border border-blue-600"
                  }, {
                    default: withCtx(() => _cache[16] || (_cache[16] = [
                      createTextVNode(" 登录 ")
                    ])),
                    _: 1
                  }),
                  createVNode(_component_router_link, {
                    to: "/auth/register",
                    class: "nav-btn bg-blue-600 text-white"
                  }, {
                    default: withCtx(() => _cache[17] || (_cache[17] = [
                      createTextVNode(" 注册 ")
                    ])),
                    _: 1
                  })
                ], 64)) : (openBlock(), createBlock(_component_el_dropdown, {
                  key: 1,
                  trigger: "click",
                  onVisibleChange: dropdownVisibleChange
                }, {
                  dropdown: withCtx(() => [
                    createVNode(_component_el_dropdown_menu, { class: "user-dropdown-menu !p-0 !min-w-64" }, {
                      default: withCtx(() => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        return [
                          createBaseVNode("div", _hoisted_20, [
                            createBaseVNode("div", _hoisted_21, [
                              createBaseVNode("div", _hoisted_22, [
                                ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) ? (openBlock(), createElementBlock("div", _hoisted_23, [
                                  createBaseVNode("img", {
                                    src: unref(userStore).user.avatar,
                                    alt: "用户头像",
                                    class: "w-full h-full object-cover"
                                  }, null, 8, _hoisted_24)
                                ])) : (openBlock(), createElementBlock("div", _hoisted_25, [
                                  createBaseVNode("span", _hoisted_26, toDisplayString(unref(userStore).username.charAt(0).toUpperCase()), 1)
                                ])),
                                unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_27, [
                                  createVNode(_component_el_icon, {
                                    class: "text-white",
                                    size: 10
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(star_default))
                                    ]),
                                    _: 1
                                  })
                                ])) : createCommentVNode("", true)
                              ]),
                              createBaseVNode("div", _hoisted_28, [
                                createBaseVNode("div", _hoisted_29, toDisplayString(unref(userStore).username), 1),
                                createBaseVNode("div", _hoisted_30, [
                                  createVNode(_component_el_icon, { class: "mr-1" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(info_filled_default))
                                    ]),
                                    _: 1
                                  }),
                                  createBaseVNode("span", null, toDisplayString(unref(userStore).isAdmin ? "系统管理员" : "普通用户"), 1)
                                ])
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_31, [
                              createBaseVNode("div", _hoisted_32, [
                                createBaseVNode("div", _hoisted_33, "¥ " + toDisplayString(((_c = (_b = unref(userStore).user) == null ? void 0 : _b.payment) == null ? void 0 : _c.balance) || "0.00"), 1),
                                _cache[18] || (_cache[18] = createBaseVNode("div", { class: "text-xs text-blue-200" }, "账户余额", -1))
                              ]),
                              _cache[21] || (_cache[21] = createBaseVNode("div", { class: "h-10 w-px bg-blue-500" }, null, -1)),
                              createBaseVNode("div", _hoisted_34, [
                                createBaseVNode("div", _hoisted_35, toDisplayString(((_e = (_d = unref(userStore).user) == null ? void 0 : _d.statistics) == null ? void 0 : _e.points) || 0), 1),
                                _cache[19] || (_cache[19] = createBaseVNode("div", { class: "text-xs text-blue-200" }, "积分", -1))
                              ]),
                              _cache[22] || (_cache[22] = createBaseVNode("div", { class: "h-10 w-px bg-blue-500" }, null, -1)),
                              createBaseVNode("div", _hoisted_36, [
                                createBaseVNode("div", _hoisted_37, toDisplayString(((_g = (_f = unref(userStore).user) == null ? void 0 : _f.statistics) == null ? void 0 : _g.ridesCount) || 0), 1),
                                _cache[20] || (_cache[20] = createBaseVNode("div", { class: "text-xs text-blue-200" }, "骑行次数", -1))
                              ])
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_38, [
                            createVNode(_component_el_dropdown_item, {
                              command: "/profile",
                              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push("/profile"))
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_39, [
                                  createVNode(_component_el_icon, {
                                    class: "text-blue-600 mb-1",
                                    size: 20
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(user_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[23] || (_cache[23] = createBaseVNode("span", { class: "text-sm" }, "个人中心", -1))
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown_item, {
                              command: "/payment",
                              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$router.push("/payment"))
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_40, [
                                  createVNode(_component_el_icon, {
                                    class: "text-green-600 mb-1",
                                    size: 20
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(wallet_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-sm" }, "我的钱包", -1))
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown_item, {
                              command: "/trips",
                              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$router.push("/trips"))
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_41, [
                                  createVNode(_component_el_icon, {
                                    class: "text-purple-600 mb-1",
                                    size: 20
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(timer_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[25] || (_cache[25] = createBaseVNode("span", { class: "text-sm" }, "行程记录", -1))
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown_item, {
                              command: "/coupons",
                              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$router.push("/coupons"))
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_42, [
                                  createVNode(_component_el_icon, {
                                    class: "text-yellow-600 mb-1",
                                    size: 20
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(discount_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[26] || (_cache[26] = createBaseVNode("span", { class: "text-sm" }, "我的优惠券", -1))
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown_item, {
                              command: "/messages",
                              onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$router.push("/messages"))
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_43, [
                                  createBaseVNode("div", _hoisted_44, [
                                    createVNode(_component_el_icon, {
                                      class: "text-indigo-600 mb-1",
                                      size: 20
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(chat_line_round_default))
                                      ]),
                                      _: 1
                                    }),
                                    _cache[27] || (_cache[27] = createBaseVNode("div", { class: "absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white flex items-center justify-center" }, [
                                      createBaseVNode("span", { class: "text-xs" }, "2")
                                    ], -1))
                                  ]),
                                  _cache[28] || (_cache[28] = createBaseVNode("span", { class: "text-sm" }, "消息通知", -1))
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_el_dropdown_item, {
                              command: "/security",
                              onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$router.push("/security"))
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_45, [
                                  createVNode(_component_el_icon, {
                                    class: "text-red-600 mb-1",
                                    size: 20
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(lock_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[29] || (_cache[29] = createBaseVNode("span", { class: "text-sm" }, "安全设置", -1))
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          createBaseVNode("div", _hoisted_46, [
                            unref(userStore).isAdmin ? (openBlock(), createBlock(_component_el_dropdown_item, {
                              key: 0,
                              command: "/admin"
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", {
                                  class: "flex items-center p-2 bg-amber-50 rounded-lg hover:bg-amber-100 transition",
                                  onClick: goToAdminConsole
                                }, [
                                  createVNode(_component_el_icon, {
                                    class: "text-amber-600 mr-2",
                                    size: 18
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(data_board_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[30] || (_cache[30] = createBaseVNode("span", null, "管理控制台", -1))
                                ])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(_component_el_dropdown_item, null, {
                              default: withCtx(() => [
                                createBaseVNode("div", {
                                  class: "flex items-center p-2 mt-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition",
                                  onClick: handleLogout
                                }, [
                                  createVNode(_component_el_icon, {
                                    class: "mr-2",
                                    size: 18
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(switch_button_default))
                                    ]),
                                    _: 1
                                  }),
                                  _cache[31] || (_cache[31] = createBaseVNode("span", null, "退出登录", -1))
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => {
                    var _a;
                    return [
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", _hoisted_11, [
                          ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) ? (openBlock(), createElementBlock("div", _hoisted_12, [
                            createBaseVNode("img", {
                              src: unref(userStore).user.avatar,
                              alt: "用户头像",
                              class: "w-full h-full object-cover"
                            }, null, 8, _hoisted_13)
                          ])) : (openBlock(), createElementBlock("div", _hoisted_14, [
                            createBaseVNode("span", _hoisted_15, toDisplayString(unref(userStore).username.charAt(0).toUpperCase()), 1)
                          ])),
                          unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_16, [
                            createVNode(_component_el_icon, {
                              class: "text-white",
                              size: 10
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(star_default))
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_17, [
                          createBaseVNode("div", _hoisted_18, toDisplayString(unref(userStore).username), 1),
                          createBaseVNode("div", _hoisted_19, toDisplayString(unref(userStore).isAdmin ? "管理员" : "普通用户"), 1)
                        ]),
                        createVNode(_component_el_icon, {
                          class: normalizeClass(["text-white transition-transform duration-200", { "rotate-180": dropdownVisible.value }])
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_down_default))
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ])
                    ];
                  }),
                  _: 1
                })),
                createBaseVNode("button", {
                  onClick: _cache[6] || (_cache[6] = ($event) => mobileMenuOpen.value = !mobileMenuOpen.value),
                  class: "md:hidden"
                }, [
                  createVNode(_component_el_icon, { size: "24" }, {
                    default: withCtx(() => [
                      createVNode(unref(menu_default))
                    ]),
                    _: 1
                  })
                ])
              ])
            ])
          ]),
          withDirectives(createBaseVNode("div", {
            class: "md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40",
            onClick: closeMobileMenu
          }, [
            createBaseVNode("div", {
              class: "absolute right-0 top-0 h-full w-64 bg-white shadow-lg",
              onClick: _cache[8] || (_cache[8] = withModifiers(() => {
              }, ["stop"]))
            }, [
              createBaseVNode("div", _hoisted_47, [
                createBaseVNode("button", {
                  onClick: closeMobileMenu,
                  class: "absolute top-4 right-4 text-gray-500"
                }, [
                  createVNode(_component_el_icon, { size: "20" }, {
                    default: withCtx(() => [
                      createVNode(unref(close_default))
                    ]),
                    _: 1
                  })
                ]),
                _cache[32] || (_cache[32] = createBaseVNode("h3", { class: "text-lg font-medium text-gray-900" }, "导航菜单", -1))
              ]),
              createBaseVNode("div", _hoisted_48, [
                createVNode(_component_router_link, {
                  to: "/",
                  class: "block px-3 py-2 rounded bg-blue-600 text-white mb-2",
                  onClick: closeMobileMenu
                }, {
                  default: withCtx(() => _cache[33] || (_cache[33] = [
                    createTextVNode("首页")
                  ])),
                  _: 1
                }),
                unref(userStore).isAuthenticated ? (openBlock(), createBlock(_component_router_link, {
                  key: 0,
                  to: "/rent",
                  class: "block px-3 py-2 rounded bg-blue-600 text-white mb-2",
                  onClick: closeMobileMenu
                }, {
                  default: withCtx(() => _cache[34] || (_cache[34] = [
                    createTextVNode("租车")
                  ])),
                  _: 1
                })) : createCommentVNode("", true),
                unref(userStore).isAuthenticated ? (openBlock(), createBlock(_component_router_link, {
                  key: 1,
                  to: "/scan",
                  class: "block px-3 py-2 rounded bg-blue-600 text-white mb-2",
                  onClick: closeMobileMenu
                }, {
                  default: withCtx(() => _cache[35] || (_cache[35] = [
                    createTextVNode("扫码")
                  ])),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_component_router_link, {
                  to: "/help",
                  class: "block px-3 py-2 rounded bg-blue-600 text-white mb-2",
                  onClick: closeMobileMenu
                }, {
                  default: withCtx(() => _cache[36] || (_cache[36] = [
                    createTextVNode("帮助")
                  ])),
                  _: 1
                }),
                createVNode(_component_router_link, {
                  to: "/about",
                  class: "block px-3 py-2 rounded bg-blue-600 text-white mb-2",
                  onClick: closeMobileMenu
                }, {
                  default: withCtx(() => _cache[37] || (_cache[37] = [
                    createTextVNode("关于我们")
                  ])),
                  _: 1
                }),
                unref(userStore).isAdmin ? (openBlock(), createElementBlock("a", {
                  key: 2,
                  href: "/jump-admin.html",
                  class: "block px-3 py-2 rounded bg-red-600 text-white mb-4 font-bold flex items-center justify-center",
                  onClick: closeMobileMenu,
                  target: "_self"
                }, [
                  createVNode(_component_el_icon, { class: "mr-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(setting_default))
                    ]),
                    _: 1
                  }),
                  _cache[38] || (_cache[38] = createTextVNode(" 管理控制台 "))
                ])) : createCommentVNode("", true),
                unref(userStore).isAuthenticated ? (openBlock(), createElementBlock("div", _hoisted_49, [
                  createBaseVNode("button", {
                    onClick: _cache[7] || (_cache[7] = ($event) => {
                      handleLogout();
                      closeMobileMenu();
                    }),
                    class: "block px-3 py-2 rounded bg-red-500 text-white w-full text-left flex items-center"
                  }, [
                    createVNode(_component_el_icon, { class: "mr-2 text-white" }, {
                      default: withCtx(() => [
                        createVNode(unref(switch_button_default))
                      ]),
                      _: 1
                    }),
                    _cache[39] || (_cache[39] = createTextVNode(" 退出登录 "))
                  ])
                ])) : createCommentVNode("", true)
              ])
            ])
          ], 512), [
            [vShow, mobileMenuOpen.value]
          ])
        ]),
        createBaseVNode("main", _hoisted_50, [
          createVNode(_component_router_view)
        ]),
        createBaseVNode("footer", _hoisted_51, [
          createBaseVNode("div", _hoisted_52, [
            createBaseVNode("div", _hoisted_53, [
              _cache[44] || (_cache[44] = createBaseVNode("div", null, [
                createBaseVNode("h3", { class: "text-lg font-bold mb-4" }, "共享滑板车"),
                createBaseVNode("p", { class: "text-gray-400" }, "便捷、环保、经济的城市短途出行解决方案")
              ], -1)),
              createBaseVNode("div", null, [
                _cache[43] || (_cache[43] = createBaseVNode("h3", { class: "text-lg font-bold mb-4" }, "快速链接", -1)),
                createBaseVNode("ul", _hoisted_54, [
                  createBaseVNode("li", null, [
                    createVNode(_component_router_link, {
                      to: "/about",
                      class: "text-gray-400"
                    }, {
                      default: withCtx(() => _cache[40] || (_cache[40] = [
                        createTextVNode("关于我们")
                      ])),
                      _: 1
                    })
                  ]),
                  createBaseVNode("li", null, [
                    createVNode(_component_router_link, {
                      to: "/help",
                      class: "text-gray-400"
                    }, {
                      default: withCtx(() => _cache[41] || (_cache[41] = [
                        createTextVNode("帮助中心")
                      ])),
                      _: 1
                    })
                  ]),
                  _cache[42] || (_cache[42] = createBaseVNode("li", null, [
                    createBaseVNode("a", {
                      href: "#",
                      class: "text-gray-400"
                    }, "联系我们")
                  ], -1))
                ])
              ]),
              _cache[45] || (_cache[45] = createBaseVNode("div", null, [
                createBaseVNode("h3", { class: "text-lg font-bold mb-4" }, "联系方式"),
                createBaseVNode("p", { class: "text-gray-400" }, "电话: 400-123-4567"),
                createBaseVNode("p", { class: "text-gray-400" }, "邮箱: support@scooter-sharing.com")
              ], -1))
            ]),
            _cache[46] || (_cache[46] = createBaseVNode("div", { class: "mt-8 pt-4 border-t border-gray-700 text-center text-gray-500" }, [
              createBaseVNode("p", null, "© 2024 共享滑板车应用 - 软件工程课程作业")
            ], -1))
          ])
        ])
      ]);
    };
  }
};
const UserLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5300991"]]);
export {
  UserLayout as default
};
//# sourceMappingURL=UserLayout-1256e502.js.map
