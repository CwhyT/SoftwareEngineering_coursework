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
import { u as useRouter, ag as reactive, r as ref, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, i as withModifiers, k as resolveComponent, o as openBlock, e as unref, al as message_default, j as createTextVNode, t as toDisplayString, g as createBlock, ak as key_default, f as createCommentVNode, z as lock_default, L as ElMessage, _ as userApi } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const ForgotPassword_vue_vue_type_style_index_0_scoped_2f38af86_lang = "";
const _hoisted_1 = { class: "forgot-password-page min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center" };
const _hoisted_2 = { class: "max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md" };
const _hoisted_3 = { class: "flex items-center justify-center" };
const _hoisted_4 = { class: "text-sm" };
const _hoisted_5 = {
  key: 3,
  class: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
};
const _sfc_main = {
  __name: "ForgotPassword",
  setup(__props) {
    const router = useRouter();
    const form = reactive({
      email: "",
      code: "",
      password: "",
      confirmPassword: ""
    });
    const formRef = ref(null);
    const loading = ref(false);
    const errorMessage = ref("");
    const showCodeInput = ref(false);
    const showPasswordInput = ref(false);
    const countdown = ref(0);
    const sendingCode = ref(false);
    const rules = {
      email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
      ],
      code: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        { len: 6, message: "验证码长度为6位", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ],
      confirmPassword: [
        { required: true, message: "请确认密码", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value !== form.password) {
              callback(new Error("两次输入的密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    };
    const sendEmailCode = () => __async(this, null, function* () {
      var _a, _b;
      if (!form.email) {
        ElMessage.warning("请输入邮箱地址");
        return;
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
        ElMessage.warning("请输入有效的邮箱地址");
        return;
      }
      sendingCode.value = true;
      try {
        const response = yield userApi.sendEmailCode(form.email);
        if (response.data.success) {
          ElMessage.success("验证码已发送到您的邮箱");
          showCodeInput.value = true;
          countdown.value = 60;
          const timer = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0) {
              clearInterval(timer);
            }
          }, 1e3);
        } else {
          ElMessage.error(response.data.message || "发送验证码失败");
        }
      } catch (error) {
        console.error("发送验证码错误:", error);
        ElMessage.error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "发送验证码失败，请稍后重试");
      } finally {
        sendingCode.value = false;
      }
    });
    const submitForm = () => __async(this, null, function* () {
      if (!formRef.value)
        return;
      yield formRef.value.validate((valid) => __async(this, null, function* () {
        var _a, _b;
        if (!valid)
          return;
        loading.value = true;
        errorMessage.value = "";
        try {
          if (!showPasswordInput.value) {
            const response = yield userApi.verifyEmail(form.email, form.code);
            if (response.data.success) {
              ElMessage.success("邮箱验证成功，请设置新密码");
              showPasswordInput.value = true;
            } else {
              errorMessage.value = response.data.message || "验证码验证失败";
            }
          } else {
            const response = yield userApi.resetPassword({
              email: form.email,
              code: form.code,
              password: form.password
            });
            if (response.data.success) {
              ElMessage.success("密码重置成功，请使用新密码登录");
              router.push("/auth/login");
            } else {
              errorMessage.value = response.data.message || "密码重置失败";
            }
          }
        } catch (error) {
          console.error("操作失败:", error);
          errorMessage.value = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "操作失败，请稍后重试";
        } finally {
          loading.value = false;
        }
      }));
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_router_link = resolveComponent("router-link");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-center" }, [
            createBaseVNode("h2", { class: "mt-2 text-3xl font-extrabold text-gray-900" }, " 找回密码 "),
            createBaseVNode("p", { class: "mt-2 text-sm text-gray-600" }, " 请输入您注册时使用的邮箱地址 ")
          ], -1)),
          createVNode(_component_el_form, {
            ref_key: "formRef",
            ref: formRef,
            model: form,
            rules,
            onSubmit: withModifiers(submitForm, ["prevent"]),
            class: "mt-8 space-y-6"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, { prop: "email" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.email,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.email = $event),
                    placeholder: "邮箱地址",
                    "prefix-icon": unref(message_default),
                    autocomplete: "email"
                  }, {
                    append: withCtx(() => [
                      createVNode(_component_el_button, {
                        onClick: sendEmailCode,
                        disabled: countdown.value > 0,
                        loading: sendingCode.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(countdown.value > 0 ? `${countdown.value}s` : "获取验证码"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "prefix-icon"])
                ]),
                _: 1
              }),
              showCodeInput.value ? (openBlock(), createBlock(_component_el_form_item, {
                key: 0,
                prop: "code"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.code,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.code = $event),
                    placeholder: "验证码",
                    "prefix-icon": unref(key_default)
                  }, null, 8, ["modelValue", "prefix-icon"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              showPasswordInput.value ? (openBlock(), createBlock(_component_el_form_item, {
                key: 1,
                prop: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.password,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.password = $event),
                    type: "password",
                    placeholder: "新密码",
                    "prefix-icon": unref(lock_default),
                    "show-password": ""
                  }, null, 8, ["modelValue", "prefix-icon"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              showPasswordInput.value ? (openBlock(), createBlock(_component_el_form_item, {
                key: 2,
                prop: "confirmPassword"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.confirmPassword,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.confirmPassword = $event),
                    type: "password",
                    placeholder: "确认新密码",
                    "prefix-icon": unref(lock_default),
                    "show-password": ""
                  }, null, 8, ["modelValue", "prefix-icon"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createBaseVNode("div", null, [
                createVNode(_component_el_button, {
                  type: "primary",
                  "native-type": "submit",
                  class: "w-full",
                  loading: loading.value
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(showPasswordInput.value ? "重置密码" : "验证邮箱"), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("div", _hoisted_4, [
                  createVNode(_component_router_link, {
                    to: "/auth/login",
                    class: "text-blue-600 hover:text-blue-800"
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode(" 返回登录 ")
                    ])),
                    _: 1
                  })
                ])
              ]),
              errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["model"])
        ])
      ]);
    };
  }
};
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f38af86"]]);
export {
  ForgotPassword as default
};
//# sourceMappingURL=ForgotPassword-f75091f8.js.map
