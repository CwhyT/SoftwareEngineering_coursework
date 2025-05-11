import { r as ref, ag as reactive, c as createElementBlock, b as createBaseVNode, F as Fragment, J as renderList, d as createVNode, w as withCtx, K as createStaticVNode, i as withModifiers, j as createTextVNode, t as toDisplayString, f as createCommentVNode, k as resolveComponent, o as openBlock, C as normalizeClass, g as createBlock, ae as resolveDynamicComponent, e as unref, m as info_filled_default, am as phone_default, al as message_default, M as location_default, ah as circle_check_filled_default, L as ElMessage } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Help_vue_vue_type_style_index_0_scoped_241bbb88_lang = "";
const _hoisted_1 = { class: "help-page py-8" };
const _hoisted_2 = { class: "container mx-auto px-4 sm:px-6 md:px-8" };
const _hoisted_3 = { class: "grid grid-cols-1 md:grid-cols-4 gap-8" };
const _hoisted_4 = { class: "md:col-span-1" };
const _hoisted_5 = { class: "bg-white rounded-xl shadow-md overflow-hidden sticky top-20" };
const _hoisted_6 = { class: "p-4" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "md:col-span-3" };
const _hoisted_9 = { class: "bg-white rounded-xl shadow-md overflow-hidden" };
const _hoisted_10 = {
  key: 0,
  class: "p-6"
};
const _hoisted_11 = { class: "py-2 px-1" };
const _hoisted_12 = { class: "mt-4 bg-amber-50 p-3 rounded-md" };
const _hoisted_13 = { class: "text-amber-800 text-sm" };
const _hoisted_14 = {
  key: 1,
  class: "p-6"
};
const _hoisted_15 = {
  key: 2,
  class: "p-6"
};
const _hoisted_16 = { class: "grid grid-cols-1 md:grid-cols-2 gap-8" };
const _hoisted_17 = { class: "space-y-4" };
const _hoisted_18 = { class: "flex items-start" };
const _hoisted_19 = { class: "flex items-start" };
const _hoisted_20 = { class: "flex items-start" };
const _hoisted_21 = { class: "mt-2" };
const _hoisted_22 = {
  key: 0,
  class: "mt-6 p-4 bg-green-50 rounded-lg"
};
const _hoisted_23 = { class: "flex items-center" };
const _hoisted_24 = { class: "mt-2 text-sm text-gray-700" };
const _hoisted_25 = { class: "font-medium" };
const _sfc_main = {
  __name: "Help",
  setup(__props) {
    const activeSection = ref(0);
    const activeCollapseNames = ref(["1"]);
    const sections = [
      {
        title: "常见问题",
        icon: "QuestionFilled"
      },
      {
        title: "使用指南",
        icon: "Document"
      },
      {
        title: "联系我们",
        icon: "Message"
      }
    ];
    const feedbackForm = reactive({
      type: "",
      content: "",
      contact: "",
      files: []
    });
    const submittingFeedback = ref(false);
    const feedbackSubmitted = ref(false);
    const feedbackId = ref("");
    const handleFileChange = (file) => {
      if (feedbackForm.files.length < 3) {
        feedbackForm.files.push(file);
      }
    };
    const submitFeedback = () => {
      if (!feedbackForm.type) {
        ElMessage.warning("请选择问题类型");
        return;
      }
      if (!feedbackForm.content || feedbackForm.content.trim().length < 10) {
        ElMessage.warning("请至少输入10个字的问题描述");
        return;
      }
      submittingFeedback.value = true;
      setTimeout(() => {
        submittingFeedback.value = false;
        feedbackSubmitted.value = true;
        const date = /* @__PURE__ */ new Date();
        const dateString = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
        const randomId = Math.floor(Math.random() * 1e4).toString().padStart(4, "0");
        feedbackId.value = `FB${dateString}${randomId}`;
        feedbackForm.type = "";
        feedbackForm.content = "";
        feedbackForm.contact = "";
        feedbackForm.files = [];
        ElMessage.success("反馈提交成功，感谢您的宝贵意见");
        setTimeout(() => {
          feedbackSubmitted.value = false;
        }, 5e3);
      }, 1500);
    };
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_collapse_item = resolveComponent("el-collapse-item");
      const _component_el_collapse = resolveComponent("el-collapse");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "p-4 bg-blue-500 text-white" }, [
                  createBaseVNode("h2", { class: "text-lg font-bold" }, "帮助中心")
                ], -1)),
                createBaseVNode("ul", _hoisted_6, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(sections, (section, index) => {
                    return createBaseVNode("li", {
                      key: index,
                      onClick: ($event) => activeSection.value = index,
                      class: normalizeClass([
                        "py-2.5 px-4 mb-1 rounded-md cursor-pointer transition-colors duration-200 flex items-center",
                        activeSection.value === index ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"
                      ])
                    }, [
                      createVNode(_component_el_icon, {
                        class: "mr-2",
                        size: 16
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(resolveDynamicComponent(section.icon)))
                        ]),
                        _: 2
                      }, 1024),
                      createBaseVNode("span", null, toDisplayString(section.title), 1)
                    ], 10, _hoisted_7);
                  }), 64))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                activeSection.value === 0 ? (openBlock(), createElementBlock("div", _hoisted_10, [
                  _cache[12] || (_cache[12] = createBaseVNode("h2", { class: "text-xl font-bold mb-6 pb-2 border-b border-gray-200" }, "常见问题", -1)),
                  createVNode(_component_el_collapse, {
                    modelValue: activeCollapseNames.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activeCollapseNames.value = $event)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_collapse_item, {
                        title: "如何开始使用共享滑板车？",
                        name: "1"
                      }, {
                        default: withCtx(() => _cache[5] || (_cache[5] = [
                          createBaseVNode("div", { class: "py-2 px-1" }, [
                            createBaseVNode("p", { class: "text-gray-700" }, " 使用共享滑板车非常简单，只需按照以下步骤操作： "),
                            createBaseVNode("ol", { class: "mt-3 list-decimal list-inside text-gray-700 space-y-2" }, [
                              createBaseVNode("li", null, "下载并安装我们的应用"),
                              createBaseVNode("li", null, "完成注册并验证您的身份"),
                              createBaseVNode("li", null, "在地图上找到附近的滑板车"),
                              createBaseVNode("li", null, "扫描车身上的二维码解锁"),
                              createBaseVNode("li", null, "骑行结束后，将车辆停放在指定区域并锁车")
                            ])
                          ], -1)
                        ])),
                        _: 1
                      }),
                      createVNode(_component_el_collapse_item, {
                        title: "如何充值余额？",
                        name: "2"
                      }, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createBaseVNode("div", { class: "py-2 px-1" }, [
                            createBaseVNode("p", { class: "text-gray-700" }, " 您可以通过以下方式充值账户余额： "),
                            createBaseVNode("ul", { class: "mt-3 list-disc list-inside text-gray-700 space-y-2" }, [
                              createBaseVNode("li", null, '在"我的钱包"页面，点击"充值"按钮'),
                              createBaseVNode("li", null, "选择充值金额或输入自定义金额"),
                              createBaseVNode("li", null, "选择支付方式：支付宝、微信支付、银行卡"),
                              createBaseVNode("li", null, "确认支付并完成充值")
                            ]),
                            createBaseVNode("p", { class: "mt-3 text-gray-700" }, [
                              createBaseVNode("span", { class: "text-blue-600 font-medium" }, "提示："),
                              createTextVNode("首次充值满50元可获得额外5元骑行券。 ")
                            ])
                          ], -1)
                        ])),
                        _: 1
                      }),
                      createVNode(_component_el_collapse_item, {
                        title: "费用是如何计算的？",
                        name: "3"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_11, [
                            _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-gray-700" }, " 我们的计费方式为：基础费用 + 时长费用。 ", -1)),
                            _cache[9] || (_cache[9] = createBaseVNode("ul", { class: "mt-3 list-disc list-inside text-gray-700 space-y-2" }, [
                              createBaseVNode("li", null, "基础费用：解锁滑板车需支付1元"),
                              createBaseVNode("li", null, "时长费用：每15分钟0.5元"),
                              createBaseVNode("li", null, "不足15分钟的部分按照15分钟计算")
                            ], -1)),
                            createBaseVNode("div", _hoisted_12, [
                              createBaseVNode("p", _hoisted_13, [
                                createVNode(_component_el_icon, { class: "mr-1" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(info_filled_default))
                                  ]),
                                  _: 1
                                }),
                                _cache[7] || (_cache[7] = createTextVNode(" 示例：骑行35分钟，费用 = 1元(基础费用) + 0.5元×3(时长费用) = 2.5元 "))
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_collapse_item, {
                        title: "如果车辆发生故障怎么办？",
                        name: "4"
                      }, {
                        default: withCtx(() => _cache[10] || (_cache[10] = [
                          createBaseVNode("div", { class: "py-2 px-1" }, [
                            createBaseVNode("p", { class: "text-gray-700" }, " 遇到车辆故障时，请按照以下步骤处理： "),
                            createBaseVNode("ol", { class: "mt-3 list-decimal list-inside text-gray-700 space-y-2" }, [
                              createBaseVNode("li", null, '在APP中点击"结束行程"以锁定车辆'),
                              createBaseVNode("li", null, '在APP中找到"问题反馈"选项'),
                              createBaseVNode("li", null, '选择"车辆故障"并拍照上传'),
                              createBaseVNode("li", null, "提交反馈后，我们会尽快处理并联系您")
                            ]),
                            createBaseVNode("p", { class: "mt-3 text-gray-700" }, [
                              createBaseVNode("span", { class: "text-red-600 font-medium" }, "重要："),
                              createTextVNode("请勿自行维修或拆卸车辆，以免造成更严重的损坏或安全隐患。 ")
                            ])
                          ], -1)
                        ])),
                        _: 1
                      }),
                      createVNode(_component_el_collapse_item, {
                        title: "如何举报违规停放的车辆？",
                        name: "5"
                      }, {
                        default: withCtx(() => _cache[11] || (_cache[11] = [
                          createBaseVNode("div", { class: "py-2 px-1" }, [
                            createBaseVNode("p", { class: "text-gray-700" }, " 如果您发现违规停放的共享滑板车，可以通过以下方式举报： "),
                            createBaseVNode("ul", { class: "mt-3 list-disc list-inside text-gray-700 space-y-2" }, [
                              createBaseVNode("li", null, '在APP首页点击"扫码"按钮'),
                              createBaseVNode("li", null, "扫描违规车辆的二维码"),
                              createBaseVNode("li", null, '选择"举报违规停放"'),
                              createBaseVNode("li", null, "拍照上传并提交")
                            ]),
                            createBaseVNode("p", { class: "mt-3 text-gray-700 italic" }, " 感谢您帮助我们维护城市秩序，成功举报将获得积分奖励。 ")
                          ], -1)
                        ])),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ])) : activeSection.value === 1 ? (openBlock(), createElementBlock("div", _hoisted_14, _cache[13] || (_cache[13] = [
                  createStaticVNode('<h2 class="text-xl font-bold mb-6 pb-2 border-b border-gray-200" data-v-241bbb88>使用指南</h2><div class="mb-8" data-v-241bbb88><h3 class="text-lg font-semibold text-gray-800 mb-3" data-v-241bbb88>安全骑行须知</h3><ul class="list-disc list-inside text-gray-700 space-y-2" data-v-241bbb88><li data-v-241bbb88>骑行前检查滑板车的刹车、轮胎和转向机构是否正常</li><li data-v-241bbb88>建议佩戴头盔和护具，保障自身安全</li><li data-v-241bbb88>遵守交通规则，不在机动车道上骑行</li><li data-v-241bbb88>不要超载，不能载人</li><li data-v-241bbb88>不要酒后骑行</li></ul></div><div class="mb-8" data-v-241bbb88><h3 class="text-lg font-semibold text-gray-800 mb-3" data-v-241bbb88>正确的停放方式</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" data-v-241bbb88><div class="bg-green-50 p-3 rounded-md" data-v-241bbb88><h4 class="text-green-700 font-medium mb-2" data-v-241bbb88>√ 正确示范</h4><ul class="list-disc list-inside text-gray-700 space-y-1" data-v-241bbb88><li data-v-241bbb88>停放在专用停车区内</li><li data-v-241bbb88>整齐摆放，不阻碍通行</li><li data-v-241bbb88>使用滑板车支架支撑车辆</li></ul></div><div class="bg-red-50 p-3 rounded-md" data-v-241bbb88><h4 class="text-red-700 font-medium mb-2" data-v-241bbb88>× 错误示范</h4><ul class="list-disc list-inside text-gray-700 space-y-1" data-v-241bbb88><li data-v-241bbb88>停放在盲道或消防通道上</li><li data-v-241bbb88>横躺在人行道中间</li><li data-v-241bbb88>停放在建筑物入口处</li></ul></div></div><div class="text-sm text-gray-600" data-v-241bbb88> 违规停放将可能导致账号扣分或罚款，请您配合规范停放。 </div></div><div class="mb-8" data-v-241bbb88><h3 class="text-lg font-semibold text-gray-800 mb-3" data-v-241bbb88>充电与电量</h3><p class="text-gray-700 mb-3" data-v-241bbb88> 我们的滑板车配备智能电池管理系统，显示的电量为实时数据。您可以在地图上看到每辆车的剩余电量。 </p><div class="bg-blue-50 p-3 rounded-md" data-v-241bbb88><h4 class="text-blue-700 font-medium mb-2" data-v-241bbb88>电量提示</h4><ul class="list-disc list-inside text-gray-700 space-y-1" data-v-241bbb88><li data-v-241bbb88>建议选择电量超过50%的车辆进行长距离骑行</li><li data-v-241bbb88>电量低于20%时车辆会自动限速</li><li data-v-241bbb88>电量低于10%时可能无法启动</li></ul></div></div>', 4)
                ]))) : activeSection.value === 2 ? (openBlock(), createElementBlock("div", _hoisted_15, [
                  _cache[24] || (_cache[24] = createBaseVNode("h2", { class: "text-xl font-bold mb-6 pb-2 border-b border-gray-200" }, "联系我们", -1)),
                  createBaseVNode("div", _hoisted_16, [
                    createBaseVNode("div", null, [
                      _cache[17] || (_cache[17] = createBaseVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4" }, "客服信息", -1)),
                      createBaseVNode("div", _hoisted_17, [
                        createBaseVNode("div", _hoisted_18, [
                          createVNode(_component_el_icon, {
                            class: "mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(phone_default))
                            ]),
                            _: 1
                          }),
                          _cache[14] || (_cache[14] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "text-sm text-gray-500" }, "客服热线"),
                            createBaseVNode("div", { class: "text-gray-800 font-medium" }, "400-123-4567"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "周一至周日 8:00-22:00")
                          ], -1))
                        ]),
                        createBaseVNode("div", _hoisted_19, [
                          createVNode(_component_el_icon, {
                            class: "mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(message_default))
                            ]),
                            _: 1
                          }),
                          _cache[15] || (_cache[15] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "text-sm text-gray-500" }, "客服邮箱"),
                            createBaseVNode("div", { class: "text-gray-800 font-medium" }, "support@scooter-share.com"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "一般会在1-2个工作日内回复")
                          ], -1))
                        ]),
                        createBaseVNode("div", _hoisted_20, [
                          createVNode(_component_el_icon, {
                            class: "mr-3 p-1.5 bg-blue-100 text-blue-600 rounded-md",
                            size: "20"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(location_default))
                            ]),
                            _: 1
                          }),
                          _cache[16] || (_cache[16] = createBaseVNode("div", null, [
                            createBaseVNode("div", { class: "text-sm text-gray-500" }, "公司地址"),
                            createBaseVNode("div", { class: "text-gray-800 font-medium" }, "上海市浦东新区张江高科技园区"),
                            createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "邮编: 201203")
                          ], -1))
                        ])
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[21] || (_cache[21] = createBaseVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-4" }, "问题反馈", -1)),
                      createVNode(_component_el_form, {
                        model: feedbackForm,
                        "label-position": "top",
                        onSubmit: withModifiers(submitFeedback, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_form_item, {
                            label: "问题类型",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_select, {
                                modelValue: feedbackForm.type,
                                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => feedbackForm.type = $event),
                                placeholder: "请选择问题类型",
                                class: "w-full"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_option, {
                                    label: "车辆故障",
                                    value: "vehicle"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "账户问题",
                                    value: "account"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "收费问题",
                                    value: "billing"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "使用建议",
                                    value: "suggestion"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "投诉",
                                    value: "complaint"
                                  }),
                                  createVNode(_component_el_option, {
                                    label: "其他问题",
                                    value: "other"
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, {
                            label: "问题描述",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: feedbackForm.content,
                                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => feedbackForm.content = $event),
                                type: "textarea",
                                rows: 4,
                                placeholder: "请详细描述您遇到的问题或建议"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "联系方式" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: feedbackForm.contact,
                                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => feedbackForm.contact = $event),
                                placeholder: "请留下您的手机号或邮箱，以便我们回复您"
                              }, null, 8, ["modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_form_item, { label: "上传图片（可选）" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_upload, {
                                class: "upload-demo",
                                action: "#",
                                "auto-upload": false,
                                "on-change": handleFileChange,
                                limit: 3,
                                "list-type": "picture"
                              }, {
                                tip: withCtx(() => _cache[19] || (_cache[19] = [
                                  createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "可上传车辆或故障相关图片，帮助我们更好地解决问题", -1)
                                ])),
                                default: withCtx(() => [
                                  createVNode(_component_el_button, { type: "primary" }, {
                                    default: withCtx(() => _cache[18] || (_cache[18] = [
                                      createTextVNode("选择图片")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createBaseVNode("div", _hoisted_21, [
                            createVNode(_component_el_button, {
                              type: "primary",
                              "native-type": "submit",
                              class: "w-full",
                              loading: submittingFeedback.value
                            }, {
                              default: withCtx(() => _cache[20] || (_cache[20] = [
                                createTextVNode(" 提交反馈 ")
                              ])),
                              _: 1
                            }, 8, ["loading"])
                          ])
                        ]),
                        _: 1
                      }, 8, ["model"])
                    ])
                  ]),
                  feedbackSubmitted.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
                    createBaseVNode("div", _hoisted_23, [
                      createVNode(_component_el_icon, {
                        class: "mr-2 text-green-600",
                        size: "20"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(circle_check_filled_default))
                        ]),
                        _: 1
                      }),
                      _cache[22] || (_cache[22] = createBaseVNode("span", { class: "text-green-700 font-medium" }, "反馈提交成功", -1))
                    ]),
                    createBaseVNode("p", _hoisted_24, [
                      _cache[23] || (_cache[23] = createTextVNode(" 感谢您的反馈！我们将尽快处理您的问题并与您联系。 您的反馈编号：")),
                      createBaseVNode("span", _hoisted_25, toDisplayString(feedbackId.value), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ])
            ])
          ])
        ])
      ]);
    };
  }
};
const Help = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-241bbb88"]]);
export {
  Help as default
};
//# sourceMappingURL=Help-b2deee71.js.map
