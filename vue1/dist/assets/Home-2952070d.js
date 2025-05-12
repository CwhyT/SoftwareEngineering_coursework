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
import { r as ref, a as useUserStore, u as useRouter, I as onMounted, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, t as toDisplayString, f as createCommentVNode, F as Fragment, J as renderList, K as createStaticVNode, e as unref, L as ElMessage, k as resolveComponent, o as openBlock, n as user_default, j as createTextVNode, M as location_default, N as zoom_in_default, O as zoom_out_default, P as arrow_right_default, q as timer_default, p as wallet_default, Q as connection_default, R as user_filled_default, g as createBlock, S as normalizeStyle, T as position_default, U as money_default, V as promotion_default, W as service_default, X as star_filled_default, s as star_default, Y as monitor_default, H as setting_default } from "./index-af7cb7d5.js";
import { S as ScooterIcon } from "./ScooterIcon-c95a9db3.js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
const Home_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "home-page" };
const _hoisted_2 = { class: "banner bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-6" };
const _hoisted_3 = { class: "container mx-auto" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "hidden md:block" };
const _hoisted_6 = { class: "map-section relative bg-gray-100" };
const _hoisted_7 = { class: "absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm px-6 py-2 z-20" };
const _hoisted_8 = { class: "container mx-auto flex items-center justify-between" };
const _hoisted_9 = { class: "map-container h-full pt-12" };
const _hoisted_10 = {
  key: 0,
  class: "location-prompt absolute top-16 left-0 right-0 mx-auto text-center z-10"
};
const _hoisted_11 = { class: "inline-block bg-white px-4 py-2 rounded-full shadow-sm text-sm" };
const _hoisted_12 = {
  key: 1,
  class: "location-error absolute top-16 left-0 right-0 mx-auto text-center z-10"
};
const _hoisted_13 = { class: "inline-block bg-white px-4 py-2 rounded-full shadow-sm text-sm" };
const _hoisted_14 = { class: "text-gray-700" };
const _hoisted_15 = { class: "map-placeholder flex flex-col items-center justify-center h-[50vh] relative bg-gray-50 shadow-inner overflow-hidden" };
const _hoisted_16 = { class: "relative z-10" };
const _hoisted_17 = { class: "bg-white rounded-full p-2 shadow-sm" };
const _hoisted_18 = { class: "absolute bottom-2 right-2 z-10" };
const _hoisted_19 = { class: "bg-white rounded-lg shadow-sm overflow-hidden" };
const _hoisted_20 = { class: "p-1.5 hover:bg-gray-100 block border-b border-gray-100" };
const _hoisted_21 = { class: "p-1.5 hover:bg-gray-100 block" };
const _hoisted_22 = { class: "absolute bottom-20 left-1/4 z-10" };
const _hoisted_23 = { class: "bg-white p-2 rounded-full shadow-sm" };
const _hoisted_24 = { class: "relative flex items-center" };
const _hoisted_25 = { class: "absolute top-1/4 right-1/3 z-10" };
const _hoisted_26 = { class: "bg-white p-2 rounded-full shadow-sm" };
const _hoisted_27 = { class: "relative flex items-center" };
const _hoisted_28 = { class: "absolute top-1/3 right-1/5 z-10" };
const _hoisted_29 = { class: "bg-white p-2 rounded-full shadow-sm" };
const _hoisted_30 = { class: "relative flex items-center" };
const _hoisted_31 = { class: "absolute bottom-1/3 left-1/5 z-10" };
const _hoisted_32 = { class: "bg-white p-2 rounded-full shadow-sm" };
const _hoisted_33 = { class: "relative flex items-center" };
const _hoisted_34 = { class: "vehicle-info bg-white py-4 border-b" };
const _hoisted_35 = { class: "container mx-auto px-6" };
const _hoisted_36 = { class: "flex items-center justify-between mb-4" };
const _hoisted_37 = { class: "flex items-center" };
const _hoisted_38 = { class: "p-2 bg-blue-50 rounded-lg mr-3" };
const _hoisted_39 = { class: "overflow-x-auto pb-2 -mx-1" };
const _hoisted_40 = { class: "flex" };
const _hoisted_41 = { class: "scooter-item border border-gray-100 rounded-lg p-2 hover:border-blue-200 transition-all bg-white shadow-sm" };
const _hoisted_42 = { class: "flex items-center mb-2" };
const _hoisted_43 = { class: "ml-2" };
const _hoisted_44 = { class: "text-xs font-medium" };
const _hoisted_45 = { class: "text-xs text-gray-500" };
const _hoisted_46 = { class: "info-cards bg-gray-50 py-4" };
const _hoisted_47 = { class: "container mx-auto px-6" };
const _hoisted_48 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_49 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_50 = { class: "bg-white rounded-lg shadow-sm p-4" };
const _hoisted_51 = { class: "flex items-center" };
const _hoisted_52 = { class: "p-2 bg-blue-50 rounded-lg" };
const _hoisted_53 = { class: "bg-white rounded-lg shadow-sm p-4" };
const _hoisted_54 = { class: "flex items-center" };
const _hoisted_55 = { class: "p-2 bg-green-50 rounded-lg" };
const _hoisted_56 = { class: "text-lg font-semibold text-gray-800 mb-3" };
const _hoisted_57 = { class: "bg-white rounded-lg shadow-sm p-4" };
const _hoisted_58 = {
  key: 0,
  class: "mb-3 p-2 bg-amber-50 rounded-lg border border-amber-100"
};
const _hoisted_59 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_60 = { class: "function-card bg-amber-100 hover:bg-amber-200 rounded-lg p-3 text-center transition-all cursor-pointer" };
const _hoisted_61 = { class: "function-card bg-amber-100 hover:bg-amber-200 rounded-lg p-3 text-center transition-all cursor-pointer" };
const _hoisted_62 = { class: "grid grid-cols-3 gap-3" };
const _hoisted_63 = { class: "function-card bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-all cursor-pointer" };
const _hoisted_64 = { class: "function-card bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-all cursor-pointer" };
const _hoisted_65 = { class: "function-card bg-orange-50 hover:bg-orange-100 rounded-lg p-3 text-center transition-all cursor-pointer" };
const _hoisted_66 = { class: "offers-section bg-white py-8" };
const _hoisted_67 = { class: "container mx-auto px-6" };
const _hoisted_68 = { class: "flex items-center justify-between mb-4" };
const _hoisted_69 = { class: "flex h-full items-center" };
const _hoisted_70 = { class: "px-8 text-white flex-1" };
const _hoisted_71 = { class: "text-xl font-bold mb-1" };
const _hoisted_72 = { class: "text-sm opacity-90 mb-4" };
const _hoisted_73 = { class: "features-section py-4 bg-gray-50" };
const _hoisted_74 = { class: "container mx-auto px-6" };
const _hoisted_75 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2" };
const _hoisted_76 = { class: "feature-card" };
const _hoisted_77 = { class: "feature-icon bg-blue-50 text-blue-600 p-4 rounded-full inline-flex mb-4" };
const _hoisted_78 = { class: "feature-card" };
const _hoisted_79 = { class: "feature-icon bg-green-50 text-green-600 p-4 rounded-full inline-flex mb-4" };
const _hoisted_80 = { class: "feature-card" };
const _hoisted_81 = { class: "feature-icon bg-yellow-50 text-yellow-600 p-4 rounded-full inline-flex mb-4" };
const _hoisted_82 = { class: "feature-card" };
const _hoisted_83 = { class: "feature-icon bg-orange-50 text-orange-600 p-4 rounded-full inline-flex mb-4" };
const _hoisted_84 = { class: "testimonial-section py-6 bg-gray-50" };
const _hoisted_85 = { class: "container mx-auto px-6" };
const _hoisted_86 = { class: "testimonial-container mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" };
const _hoisted_87 = { class: "testimonial-card bg-white p-4 rounded-lg shadow-md" };
const _hoisted_88 = { class: "testimonial-stars flex mb-2" };
const _hoisted_89 = { class: "testimonial-card bg-white p-4 rounded-lg shadow-md" };
const _hoisted_90 = { class: "testimonial-stars flex mb-2" };
const _hoisted_91 = { class: "testimonial-card bg-white p-4 rounded-lg shadow-md" };
const _hoisted_92 = { class: "testimonial-stars flex mb-2" };
const _hoisted_93 = {
  key: 0,
  class: "fixed bottom-6 right-6 z-50"
};
const _hoisted_94 = {
  key: 1,
  class: "fixed bottom-6 right-6 z-50 flex flex-col space-y-3"
};
const _hoisted_95 = {
  href: "/jump-admin.html",
  class: "no-underline",
  target: "_self"
};
const _sfc_main = {
  __name: "Home",
  setup(__props) {
    const showScooters = ref(false);
    const showLocationPrompt = ref(true);
    const userStore = useUserStore();
    const router = useRouter();
    const mapLoaded = ref(false);
    const nearbyScooters = ref([]);
    const loadingScooters = ref(false);
    const locationError = ref(null);
    const defaultPosition = {
      latitude: 39.9042,
      longitude: 116.4074
      // 默认位置坐标
    };
    const userPosition = ref(null);
    function loadNearbyScooters() {
      return __async(this, null, function* () {
        try {
          loadingScooters.value = true;
          yield new Promise((resolve) => setTimeout(resolve, 1e3));
          nearbyScooters.value = [
            { id: 1, name: "滑板车-A1", available: true, battery: 85, distance: 120 },
            { id: 2, name: "滑板车-B2", available: true, battery: 72, distance: 180 },
            { id: 3, name: "滑板车-C3", available: true, battery: 65, distance: 150 },
            { id: 4, name: "滑板车-D4", available: true, battery: 90, distance: 90 }
          ];
          loadingScooters.value = false;
          mapLoaded.value = true;
        } catch (error) {
          console.error("加载滑板车数据失败:", error);
          ElMessage.error("加载滑板车数据失败，请重试");
          loadingScooters.value = false;
        }
      });
    }
    function getUserLocation() {
      return __async(this, null, function* () {
        showLocationPrompt.value = false;
        try {
          if (!navigator.geolocation) {
            throw new Error("您的浏览器不支持地理定位");
          }
          const position = yield new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 1e4,
              maximumAge: 0
            });
          });
          userPosition.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          yield loadNearbyScooters();
        } catch (error) {
          console.error("获取位置失败:", error);
          locationError.value = error.message || "无法获取您的位置";
          ElMessage.warning("无法获取您的位置，使用默认位置");
          userPosition.value = defaultPosition;
          yield loadNearbyScooters();
        }
      });
    }
    const goToVehicleManagement = () => {
      console.log("正在跳转到车辆管理...");
      if (userStore.isAdmin) {
        ElMessage.success("正在跳转到车辆管理");
        router.push("/admin/vehicles");
      } else {
        ElMessage.warning("您不是管理员，无法访问此功能");
      }
    };
    const goToUserManagement = () => {
      console.log("正在跳转到用户管理...");
      if (userStore.isAdmin) {
        ElMessage.success("正在跳转到用户管理");
        router.push("/admin/users");
      } else {
        ElMessage.warning("您不是管理员，无法访问此功能");
      }
    };
    onMounted(() => {
      setTimeout(() => {
        showScooters.value = true;
      }, 500);
      if (userStore.isAuthenticated) {
        getUserLocation();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_router_link = resolveComponent("router-link");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_carousel_item = resolveComponent("el-carousel-item");
      const _component_el_carousel = resolveComponent("el-carousel");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("main", null, [
          createBaseVNode("section", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                _cache[0] || (_cache[0] = createBaseVNode("div", null, [
                  createBaseVNode("h1", { class: "text-2xl md:text-3xl font-bold mb-2" }, "电动滑板车租赁系统"),
                  createBaseVNode("p", { class: "text-blue-100" }, "方便快捷的城市短途出行解决方案")
                ], -1)),
                createBaseVNode("div", _hoisted_5, [
                  createVNode(ScooterIcon, {
                    size: 64,
                    color: "white"
                  })
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                _cache[1] || (_cache[1] = createBaseVNode("h2", { class: "text-gray-700 font-medium" }, "附近地图", -1)),
                createVNode(_component_router_link, {
                  to: "/profile",
                  class: "text-gray-600 hover:text-blue-600"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { size: "20" }, {
                      default: withCtx(() => [
                        createVNode(unref(user_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_9, [
              showLocationPrompt.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  _cache[3] || (_cache[3] = createBaseVNode("span", { class: "text-gray-700" }, "需要获取您的位置以找到附近的滑板车", -1)),
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "small",
                    class: "ml-2",
                    onClick: getUserLocation
                  }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode("允许")
                    ])),
                    _: 1
                  })
                ])
              ])) : locationError.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("span", _hoisted_14, toDisplayString(locationError.value), 1),
                  createVNode(_component_el_button, {
                    type: "primary",
                    size: "small",
                    class: "ml-2",
                    onClick: getUserLocation
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode("重试")
                    ])),
                    _: 1
                  })
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("div", _hoisted_17, [
                    createVNode(_component_el_icon, {
                      size: "20",
                      class: "text-blue-600"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(location_default))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "absolute inset-0 flex items-center justify-center pointer-events-none" }, [
                  createBaseVNode("div", { class: "w-[200px] h-[200px] border border-blue-200/30 rounded-full" })
                ], -1)),
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "absolute bottom-2 left-2 z-10 bg-white/80 px-2 py-1 rounded text-xs text-gray-700" }, " 约200米 ", -1)),
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("button", _hoisted_20, [
                      createVNode(_component_el_icon, {
                        size: "16",
                        class: "text-gray-600"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(zoom_in_default))
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("button", _hoisted_21, [
                      createVNode(_component_el_icon, {
                        size: "16",
                        class: "text-gray-600"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(zoom_out_default))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_22, [
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_24, [
                      createVNode(ScooterIcon, {
                        size: 18,
                        color: "#3b82f6"
                      }),
                      _cache[5] || (_cache[5] = createBaseVNode("span", { class: "ml-2 text-xs text-gray-600" }, "120m", -1))
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("div", _hoisted_26, [
                    createBaseVNode("div", _hoisted_27, [
                      createVNode(ScooterIcon, {
                        size: 18,
                        color: "#3b82f6"
                      }),
                      _cache[6] || (_cache[6] = createBaseVNode("span", { class: "ml-2 text-xs text-gray-600" }, "180m", -1))
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("div", _hoisted_29, [
                    createBaseVNode("div", _hoisted_30, [
                      createVNode(ScooterIcon, {
                        size: 18,
                        color: "#3b82f6"
                      }),
                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "ml-2 text-xs text-gray-600" }, "150m", -1))
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("div", _hoisted_33, [
                      createVNode(ScooterIcon, {
                        size: 18,
                        color: "#3b82f6"
                      }),
                      _cache[8] || (_cache[8] = createBaseVNode("span", { class: "ml-2 text-xs text-gray-600" }, "90m", -1))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_34, [
            createBaseVNode("div", _hoisted_35, [
              createBaseVNode("div", _hoisted_36, [
                createBaseVNode("div", _hoisted_37, [
                  createBaseVNode("div", _hoisted_38, [
                    createVNode(ScooterIcon, {
                      size: 20,
                      color: "#3b82f6"
                    })
                  ]),
                  _cache[11] || (_cache[11] = createBaseVNode("div", null, [
                    createBaseVNode("p", { class: "text-sm font-medium" }, "附近可用车辆"),
                    createBaseVNode("p", { class: "text-lg font-bold text-blue-600" }, "12 辆")
                  ], -1))
                ]),
                createVNode(_component_router_link, {
                  to: "/rent",
                  class: "text-blue-600 text-sm flex items-center"
                }, {
                  default: withCtx(() => [
                    _cache[12] || (_cache[12] = createTextVNode(" 查看全部 ")),
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
              createBaseVNode("div", _hoisted_39, [
                createBaseVNode("div", _hoisted_40, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(6, (i) => {
                    return createBaseVNode("div", {
                      key: i,
                      class: "flex-shrink-0 w-36 mx-1"
                    }, [
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("div", _hoisted_42, [
                          createVNode(ScooterIcon, {
                            size: 18,
                            color: "#3b82f6"
                          }),
                          createBaseVNode("div", _hoisted_43, [
                            createBaseVNode("div", _hoisted_44, "E-" + toDisplayString(1e3 + i * 12), 1),
                            createBaseVNode("div", _hoisted_45, toDisplayString(80 + i * 20) + "m", 1)
                          ])
                        ]),
                        createVNode(_component_router_link, { to: "/rent" }, {
                          default: withCtx(() => [
                            createVNode(_component_el_button, {
                              type: "primary",
                              size: "small",
                              block: ""
                            }, {
                              default: withCtx(() => _cache[13] || (_cache[13] = [
                                createTextVNode("租用")
                              ])),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]);
                  }), 64))
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_46, [
            createBaseVNode("div", _hoisted_47, [
              createBaseVNode("div", _hoisted_48, [
                createBaseVNode("div", null, [
                  _cache[16] || (_cache[16] = createBaseVNode("h2", { class: "text-lg font-semibold text-gray-800 mb-3" }, "骑行统计", -1)),
                  createBaseVNode("div", _hoisted_49, [
                    createBaseVNode("div", _hoisted_50, [
                      createBaseVNode("div", _hoisted_51, [
                        createBaseVNode("div", _hoisted_52, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-blue-600"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(timer_default))
                            ]),
                            _: 1
                          })
                        ]),
                        _cache[14] || (_cache[14] = createBaseVNode("div", { class: "ml-3" }, [
                          createBaseVNode("h3", { class: "text-sm font-medium" }, "总骑行次数"),
                          createBaseVNode("p", { class: "text-xl font-bold text-blue-600" }, "24次")
                        ], -1))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_53, [
                      createBaseVNode("div", _hoisted_54, [
                        createBaseVNode("div", _hoisted_55, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-green-600"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(wallet_default))
                            ]),
                            _: 1
                          })
                        ]),
                        _cache[15] || (_cache[15] = createBaseVNode("div", { class: "ml-3" }, [
                          createBaseVNode("h3", { class: "text-sm font-medium" }, "账户余额"),
                          createBaseVNode("p", { class: "text-xl font-bold text-green-600" }, "¥25.00")
                        ], -1))
                      ])
                    ])
                  ]),
                  _cache[17] || (_cache[17] = createStaticVNode('<div class="mt-3 bg-white rounded-lg shadow-sm p-4"><h3 class="font-medium mb-2">本月骑行</h3><div class="flex justify-between items-center"><div class="text-center"><p class="text-xl font-bold text-blue-600">8次</p><p class="text-xs text-gray-500">骑行次数</p></div><div class="text-center"><p class="text-xl font-bold text-green-600">2.5h</p><p class="text-xs text-gray-500">总时长</p></div><div class="text-center"><p class="text-xl font-bold text-orange-600">12.8km</p><p class="text-xs text-gray-500">总里程</p></div></div></div>', 1))
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("h2", _hoisted_56, toDisplayString(unref(userStore).isAdmin ? "管理员功能" : "推荐功能"), 1),
                  createBaseVNode("div", _hoisted_57, [
                    unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_58, [
                      _cache[20] || (_cache[20] = createBaseVNode("h3", { class: "text-sm font-medium mb-2 text-amber-700" }, "管理员专属功能", -1)),
                      createBaseVNode("div", _hoisted_59, [
                        createBaseVNode("div", {
                          class: "block",
                          onClick: goToVehicleManagement
                        }, [
                          createBaseVNode("div", _hoisted_60, [
                            createVNode(_component_el_icon, {
                              size: "32",
                              class: "text-amber-600 mb-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(connection_default))
                              ]),
                              _: 1
                            }),
                            _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-xs block" }, "车辆管理", -1))
                          ])
                        ]),
                        createBaseVNode("div", {
                          class: "block",
                          onClick: goToUserManagement
                        }, [
                          createBaseVNode("div", _hoisted_61, [
                            createVNode(_component_el_icon, {
                              size: "32",
                              class: "text-amber-600 mb-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(user_filled_default))
                              ]),
                              _: 1
                            }),
                            _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-xs block" }, "用户管理", -1))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_62, [
                      createVNode(_component_router_link, {
                        to: "/rent",
                        class: "block"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_63, [
                            createVNode(_component_el_icon, {
                              size: "32",
                              class: "text-blue-600 mb-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(location_default))
                              ]),
                              _: 1
                            }),
                            _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-xs block" }, "附近车辆", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/payment",
                        class: "block"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_64, [
                            createVNode(_component_el_icon, {
                              size: "32",
                              class: "text-green-600 mb-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(wallet_default))
                              ]),
                              _: 1
                            }),
                            _cache[22] || (_cache[22] = createBaseVNode("span", { class: "text-xs block" }, "充值余额", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/profile",
                        class: "block"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_65, [
                            createVNode(_component_el_icon, {
                              size: "32",
                              class: "text-orange-600 mb-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(user_default))
                              ]),
                              _: 1
                            }),
                            _cache[23] || (_cache[23] = createBaseVNode("span", { class: "text-xs block" }, "个人中心", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_66, [
            createBaseVNode("div", _hoisted_67, [
              createBaseVNode("div", _hoisted_68, [
                _cache[25] || (_cache[25] = createBaseVNode("h2", { class: "text-lg font-semibold text-gray-800" }, "精选优惠活动", -1)),
                createVNode(_component_router_link, {
                  to: "/payment",
                  class: "text-blue-600 text-sm flex items-center"
                }, {
                  default: withCtx(() => [
                    _cache[24] || (_cache[24] = createTextVNode(" 更多优惠 ")),
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
              createVNode(_component_el_carousel, {
                height: "180px",
                interval: 4e3,
                "indicator-position": "outside",
                class: "rounded-lg overflow-hidden shadow-sm",
                trigger: "click"
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.promotions, (item) => {
                    return openBlock(), createBlock(_component_el_carousel_item, {
                      key: item.id
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", {
                          class: "carousel-item h-full bg-gradient-to-r",
                          style: normalizeStyle({ backgroundImage: `linear-gradient(to right, ${item.startColor}, ${item.endColor})` })
                        }, [
                          createBaseVNode("div", _hoisted_69, [
                            createBaseVNode("div", _hoisted_70, [
                              createBaseVNode("h3", _hoisted_71, toDisplayString(item.title), 1),
                              createBaseVNode("p", _hoisted_72, toDisplayString(item.description), 1),
                              createVNode(_component_router_link, {
                                to: item.link
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_button, {
                                    class: "mt-2",
                                    type: "primary",
                                    plain: ""
                                  }, {
                                    default: withCtx(() => _cache[26] || (_cache[26] = [
                                      createTextVNode("查看详情")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ])
                          ])
                        ], 4)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("section", _hoisted_73, [
            createBaseVNode("div", _hoisted_74, [
              _cache[35] || (_cache[35] = createBaseVNode("h2", { class: "section-title mb-4" }, "我们的特色服务", -1)),
              createBaseVNode("div", _hoisted_75, [
                createBaseVNode("div", _hoisted_76, [
                  createBaseVNode("div", _hoisted_77, [
                    createVNode(_component_el_icon, { size: "30" }, {
                      default: withCtx(() => [
                        createVNode(unref(position_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[27] || (_cache[27] = createBaseVNode("h3", { class: "feature-title text-lg font-medium mb-2" }, "便捷定位", -1)),
                  _cache[28] || (_cache[28] = createBaseVNode("p", { class: "feature-desc text-gray-600" }, "智能地图显示，快速找到附近的可用滑板车，方便用户规划行程。", -1))
                ]),
                createBaseVNode("div", _hoisted_78, [
                  createBaseVNode("div", _hoisted_79, [
                    createVNode(_component_el_icon, { size: "30" }, {
                      default: withCtx(() => [
                        createVNode(unref(money_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[29] || (_cache[29] = createBaseVNode("h3", { class: "feature-title text-lg font-medium mb-2" }, "经济实惠", -1)),
                  _cache[30] || (_cache[30] = createBaseVNode("p", { class: "feature-desc text-gray-600" }, "灵活的计费模式，短途出行更经济，多种套餐满足不同需求。", -1))
                ]),
                createBaseVNode("div", _hoisted_80, [
                  createBaseVNode("div", _hoisted_81, [
                    createVNode(_component_el_icon, { size: "30" }, {
                      default: withCtx(() => [
                        createVNode(unref(promotion_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[31] || (_cache[31] = createBaseVNode("h3", { class: "feature-title text-lg font-medium mb-2" }, "多重优惠", -1)),
                  _cache[32] || (_cache[32] = createBaseVNode("p", { class: "feature-desc text-gray-600" }, "新用户专享福利，老用户推荐奖励，节假日特别活动折扣。", -1))
                ]),
                createBaseVNode("div", _hoisted_82, [
                  createBaseVNode("div", _hoisted_83, [
                    createVNode(_component_el_icon, { size: "30" }, {
                      default: withCtx(() => [
                        createVNode(unref(service_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[33] || (_cache[33] = createBaseVNode("h3", { class: "feature-title text-lg font-medium mb-2" }, "贴心服务", -1)),
                  _cache[34] || (_cache[34] = createBaseVNode("p", { class: "feature-desc text-gray-600" }, "全天候客服支持，紧急情况快速响应，让您的出行更加安心。", -1))
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_84, [
            createBaseVNode("div", _hoisted_85, [
              _cache[42] || (_cache[42] = createBaseVNode("h2", { class: "section-title mb-4" }, "用户见证", -1)),
              createBaseVNode("div", _hoisted_86, [
                createBaseVNode("div", _hoisted_87, [
                  _cache[36] || (_cache[36] = createBaseVNode("div", { class: "flex items-center mb-3" }, [
                    createBaseVNode("img", {
                      src: "https://randomuser.me/api/portraits/women/24.jpg",
                      alt: "用户头像",
                      class: "rounded-full h-12 w-12 object-cover mr-3"
                    }),
                    createBaseVNode("div", null, [
                      createBaseVNode("p", { class: "font-medium" }, "李女士"),
                      createBaseVNode("p", { class: "text-xs text-gray-500" }, "上海")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_88, [
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[37] || (_cache[37] = createBaseVNode("p", { class: "testimonial-text text-sm leading-relaxed text-gray-700" }, '"非常方便的出行方式，APP操作简单，找车、扫码、租赁一气呵成，价格也很合理。"', -1))
                ]),
                createBaseVNode("div", _hoisted_89, [
                  _cache[38] || (_cache[38] = createBaseVNode("div", { class: "flex items-center mb-3" }, [
                    createBaseVNode("img", {
                      src: "https://randomuser.me/api/portraits/men/44.jpg",
                      alt: "用户头像",
                      class: "rounded-full h-12 w-12 object-cover mr-3"
                    }),
                    createBaseVNode("div", null, [
                      createBaseVNode("p", { class: "font-medium" }, "王先生"),
                      createBaseVNode("p", { class: "text-xs text-gray-500" }, "北京")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_90, [
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[39] || (_cache[39] = createBaseVNode("p", { class: "testimonial-text text-sm leading-relaxed text-gray-700" }, '"解决了我最后一公里的通勤问题，比等公交快多了，滑板车状态都很好，骑行很顺畅。"', -1))
                ]),
                createBaseVNode("div", _hoisted_91, [
                  _cache[40] || (_cache[40] = createBaseVNode("div", { class: "flex items-center mb-3" }, [
                    createBaseVNode("img", {
                      src: "https://randomuser.me/api/portraits/women/72.jpg",
                      alt: "用户头像",
                      class: "rounded-full h-12 w-12 object-cover mr-3"
                    }),
                    createBaseVNode("div", null, [
                      createBaseVNode("p", { class: "font-medium" }, "张女士"),
                      createBaseVNode("p", { class: "text-xs text-gray-500" }, "广州")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_92, [
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-yellow-500 mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_filled_default))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_icon, { class: "text-gray-300" }, {
                      default: withCtx(() => [
                        createVNode(unref(star_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _cache[41] || (_cache[41] = createBaseVNode("p", { class: "testimonial-text text-sm leading-relaxed text-gray-700" }, '"周末骑着滑板车游览城市很方便，随取随还，客服服务态度也很好，推荐给身边的朋友了。"', -1))
                ])
              ])
            ])
          ]),
          !unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_93, [
            createVNode(_component_router_link, { to: "/scan" }, {
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  size: "large",
                  round: "",
                  class: "shadow-lg"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "mr-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(monitor_default))
                      ]),
                      _: 1
                    }),
                    _cache[43] || (_cache[43] = createTextVNode(" 扫码租车 "))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_94, [
            createBaseVNode("a", _hoisted_95, [
              createVNode(_component_el_button, {
                type: "danger",
                size: "large",
                round: "",
                class: "shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-red-600 border-red-700 animate-pulse"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, { class: "mr-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(setting_default))
                    ]),
                    _: 1
                  }),
                  _cache[44] || (_cache[44] = createTextVNode(" 管理控制台 "))
                ]),
                _: 1
              })
            ])
          ]))
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Home-2952070d.js.map
