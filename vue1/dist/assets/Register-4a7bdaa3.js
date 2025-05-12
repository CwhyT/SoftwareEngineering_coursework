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
import { u as useRouter, a as useUserStore, r as ref, ag as reactive, aR as onBeforeUnmount, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, i as withModifiers, k as resolveComponent, o as openBlock, e as unref, n as user_default, al as message_default, j as createTextVNode, t as toDisplayString, g as createBlock, ak as key_default, f as createCommentVNode, am as phone_default, z as lock_default, L as ElMessage, _ as userApi } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Register_vue_vue_type_style_index_0_scoped_9d18eff6_lang = "";
const _hoisted_1 = { class: "register-page min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center" };
const _hoisted_2 = { class: "max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md" };
const _hoisted_3 = { class: "space-y-6" };
const _hoisted_4 = { class: "verification-code-input" };
const _hoisted_5 = { class: "flex items-center ml-1" };
const _hoisted_6 = { class: "mt-8" };
const _hoisted_7 = { class: "flex items-center justify-center mt-6" };
const _hoisted_8 = { class: "text-sm" };
const _hoisted_9 = {
  key: 0,
  class: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
};
const maxRetryAttempts = 3;
const _sfc_main = {
  __name: "Register",
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const registerFormRef = ref(null);
    const loading = ref(false);
    const errorMessage = ref("");
    const emailCountdown = ref(0);
    const sendingEmailCode = ref(false);
    const retryAttempts = ref(0);
    let countdownTimer = null;
    const isDev = ref(false);
    const registerForm = reactive({
      username: "",
      email: "",
      emailCode: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false
    });
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不能小于6个字符"));
      } else {
        if (registerForm.confirmPassword !== "") {
          registerFormRef.value.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const registerRules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
      ],
      email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
      ],
      emailCode: [
        { required: true, message: "请获取并输入邮箱验证码", trigger: "blur" },
        { len: 6, message: "验证码应为6位数字", trigger: "blur" }
      ],
      phone: [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号码", trigger: "blur" }
      ],
      password: [
        { validator: validatePassword, trigger: "blur" }
      ],
      confirmPassword: [
        { validator: validateConfirmPassword, trigger: "blur" }
      ],
      agreeTerms: [
        { type: "boolean", message: "请阅读并同意用户协议", trigger: "change" },
        { required: true, message: "请阅读并同意用户协议", trigger: "change" }
      ]
    };
    const handleRegister = () => {
      registerFormRef.value.validate((valid) => __async(this, null, function* () {
        if (!valid)
          return;
        loading.value = true;
        errorMessage.value = "";
        retryAttempts.value = 0;
        const tryRegister = () => __async(this, null, function* () {
          try {
            console.log("开始注册请求...");
            if (!registerForm.emailCode) {
              errorMessage.value = "请先获取并输入邮箱验证码";
              loading.value = false;
              return;
            }
            const userData = {
              name: registerForm.username,
              // 名字使用用户名
              username: registerForm.username,
              email: registerForm.email,
              emailCode: registerForm.emailCode,
              phone: registerForm.phone,
              password: registerForm.password
            };
            console.log("发送注册数据:", JSON.stringify(userData));
            const response = yield userApi.register(userData);
            console.log("注册请求成功:", response);
            const data = response.data || response;
            ElMessage({
              type: "success",
              message: "注册成功，正在自动登录",
              duration: 1500
            });
            if (data.user) {
              userStore.setUser(data.user);
            } else {
              userStore.setUser({
                username: userData.username,
                email: userData.email,
                role: "user"
              });
            }
            if (data.token) {
              userStore.setToken(data.token);
            }
            router.push("/");
          } catch (error) {
            console.error("注册失败详细信息:", error);
            const isNetworkError = !error.response || error.message.includes("Network Error") || error.message.includes("timeout");
            if (isNetworkError && retryAttempts.value < maxRetryAttempts) {
              retryAttempts.value++;
              const retryDelay = 1e3 * retryAttempts.value;
              errorMessage.value = `网络连接不稳定，${retryAttempts.value}秒后自动重试(${retryAttempts.value}/${maxRetryAttempts})...`;
              yield new Promise((resolve) => setTimeout(resolve, retryDelay));
              errorMessage.value = "正在重试连接...";
              return tryRegister();
            }
            if (error.response) {
              const statusCode = error.response.status;
              const responseData = error.response.data || {};
              console.log("服务器响应错误:", statusCode, responseData);
              if (statusCode === 400) {
                if (responseData.message && responseData.message.includes("验证码")) {
                  errorMessage.value = responseData.message;
                  emailCountdown.value = 0;
                } else {
                  errorMessage.value = responseData.message || "提交的信息有误，请检查所有字段";
                }
              } else if (statusCode === 401 || statusCode === 403) {
                errorMessage.value = "无权限执行此操作";
              } else if (statusCode === 404) {
                errorMessage.value = "请求的资源不存在";
              } else if (statusCode === 409) {
                errorMessage.value = responseData.message || "用户名或邮箱已被注册";
              } else if (statusCode === 422) {
                errorMessage.value = responseData.message || "验证码错误或已过期";
                emailCountdown.value = 0;
              } else if (statusCode >= 500) {
                errorMessage.value = "服务器内部错误，请稍后再试";
              } else {
                errorMessage.value = responseData.message || "注册失败，请重试";
              }
            } else if (error.request) {
              errorMessage.value = "无法连接到服务器，请检查您的网络连接";
            } else {
              errorMessage.value = `请求错误: ${error.message}`;
            }
          } finally {
            loading.value = false;
          }
        });
        tryRegister();
      }));
    };
    const sendEmailCode = () => __async(this, null, function* () {
      if (!registerForm.email) {
        ElMessage.warning("请输入邮箱地址");
        return;
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerForm.email)) {
        ElMessage.warning("请输入有效的邮箱地址");
        return;
      }
      sendingEmailCode.value = true;
      retryAttempts.value = 0;
      let emailSent = false;
      const trySendCode = () => __async(this, null, function* () {
        try {
          console.log("开始发送验证码请求...");
          const response = yield userApi.sendEmailCode(registerForm.email);
          console.log("验证码请求成功:", response);
          emailSent = true;
          ElMessage.success(`验证码已发送，请查看您的邮箱收件箱或垃圾邮件文件夹 (${registerForm.email})`);
          if (isDev.value && response.code) {
            console.log("开发环境验证码(仅控制台显示):", response.code);
          }
          emailCountdown.value = 60;
          if (countdownTimer) {
            clearInterval(countdownTimer);
          }
          countdownTimer = setInterval(() => {
            emailCountdown.value--;
            if (emailCountdown.value <= 0) {
              clearInterval(countdownTimer);
              countdownTimer = null;
            }
          }, 1e3);
        } catch (error) {
          console.error("发送邮箱验证码错误详细信息:", error);
          const isNetworkError = !error.response || error.message.includes("Network Error") || error.message.includes("timeout");
          if (isNetworkError && retryAttempts.value < maxRetryAttempts) {
            retryAttempts.value++;
            const retryDelay = 1e3 * retryAttempts.value;
            ElMessage({
              type: "warning",
              message: `网络连接不稳定，${retryAttempts.value}秒后自动重试(${retryAttempts.value}/${maxRetryAttempts})...`,
              duration: retryDelay
            });
            yield new Promise((resolve) => setTimeout(resolve, retryDelay));
            if (!emailSent) {
              return trySendCode();
            }
          } else {
            if (error.response) {
              const statusCode = error.response.status;
              const responseData = error.response.data || {};
              if (statusCode === 400) {
                ElMessage.error(responseData.message || "邮箱格式不正确");
              } else if (statusCode === 429) {
                ElMessage.error(responseData.message || "发送频率过高，请稍后再试");
              } else if (statusCode >= 500) {
                ElMessage.error("服务器内部错误，请稍后再试");
              } else {
                ElMessage.error(`请求失败(${statusCode}): ${responseData.message || "未知错误"}`);
              }
            } else if (error.request) {
              ElMessage.error("服务器未响应，请检查网络连接");
            } else {
              ElMessage.error(`请求错误: ${error.message}`);
            }
          }
        } finally {
          if (emailSent || retryAttempts.value >= maxRetryAttempts) {
            sendingEmailCode.value = false;
          }
        }
      });
      trySendCode();
    });
    onBeforeUnmount(() => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_router_link = resolveComponent("router-link");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[13] || (_cache[13] = createBaseVNode("div", { class: "text-center" }, [
            createBaseVNode("h2", { class: "mt-2 text-3xl font-extrabold text-gray-900" }, " 注册账户 "),
            createBaseVNode("p", { class: "mt-3 text-sm text-gray-600" }, " 电动滑板车租赁系统 ")
          ], -1)),
          createVNode(_component_el_form, {
            ref_key: "registerFormRef",
            ref: registerFormRef,
            model: registerForm,
            rules: registerRules,
            onSubmit: withModifiers(handleRegister, ["prevent"]),
            class: "mt-10 space-y-8"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_el_form_item, {
                  prop: "username",
                  class: "mb-6"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => registerForm.username = $event),
                      placeholder: "用户名",
                      "prefix-icon": unref(user_default),
                      autocomplete: "username",
                      class: "form-input"
                    }, null, 8, ["modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "邮箱",
                  prop: "email"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, [
                      createVNode(_component_el_input, {
                        modelValue: registerForm.email,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => registerForm.email = $event),
                        placeholder: "请输入邮箱",
                        "prefix-icon": unref(message_default),
                        autocomplete: "email"
                      }, {
                        append: withCtx(() => [
                          createVNode(_component_el_button, {
                            class: "code-button",
                            onClick: sendEmailCode,
                            disabled: emailCountdown.value > 0,
                            loading: sendingEmailCode.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(emailCountdown.value > 0 ? `${emailCountdown.value}s` : "获取验证码"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "loading"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "prefix-icon"])
                    ])
                  ]),
                  _: 1
                }),
                registerForm.emailCode || emailCountdown.value > 0 ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 0,
                  label: "邮箱验证码",
                  prop: "emailCode"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.emailCode,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => registerForm.emailCode = $event),
                      placeholder: "请输入验证码",
                      "prefix-icon": unref(key_default)
                    }, null, 8, ["modelValue", "prefix-icon"]),
                    _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-xs text-gray-500 mt-1 ml-1" }, " 请前往邮箱查看验证码并填写 ", -1))
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_component_el_form_item, {
                  label: "手机号",
                  prop: "phone"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.phone,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => registerForm.phone = $event),
                      placeholder: "请输入手机号码",
                      "prefix-icon": unref(phone_default),
                      autocomplete: "tel"
                    }, null, 8, ["modelValue", "prefix-icon"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  prop: "password",
                  class: "mb-6"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.password,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => registerForm.password = $event),
                      type: "password",
                      placeholder: "密码",
                      "prefix-icon": unref(lock_default),
                      autocomplete: "new-password",
                      class: "form-input",
                      "show-password": ""
                    }, null, 8, ["modelValue", "prefix-icon"]),
                    _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-xs text-gray-500 mt-1 ml-1" }, "密码长度不能小于6个字符", -1))
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  prop: "confirmPassword",
                  class: "mb-6"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: registerForm.confirmPassword,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => registerForm.confirmPassword = $event),
                      type: "password",
                      placeholder: "确认密码",
                      "prefix-icon": unref(lock_default),
                      autocomplete: "new-password",
                      class: "form-input",
                      "show-password": ""
                    }, null, 8, ["modelValue", "prefix-icon"])
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_el_checkbox, {
                  modelValue: registerForm.agreeTerms,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => registerForm.agreeTerms = $event)
                }, {
                  default: withCtx(() => _cache[9] || (_cache[9] = [
                    createBaseVNode("span", { class: "text-sm" }, "我已阅读并同意", -1),
                    createBaseVNode("a", {
                      href: "#",
                      class: "text-blue-600 hover:text-blue-800 text-sm"
                    }, "用户协议", -1),
                    createBaseVNode("span", { class: "text-sm" }, "和", -1),
                    createBaseVNode("a", {
                      href: "#",
                      class: "text-blue-600 hover:text-blue-800 text-sm"
                    }, "隐私政策", -1)
                  ])),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_6, [
                createVNode(_component_el_button, {
                  type: "primary",
                  "native-type": "submit",
                  class: "w-full py-3 text-base",
                  loading: loading.value,
                  disabled: !registerForm.agreeTerms
                }, {
                  default: withCtx(() => _cache[10] || (_cache[10] = [
                    createTextVNode(" 注册 ")
                  ])),
                  _: 1
                }, 8, ["loading", "disabled"])
              ]),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-gray-600" }, "已有账户?", -1)),
                  createVNode(_component_router_link, {
                    to: "/auth/login",
                    class: "ml-1 text-blue-600 hover:text-blue-800"
                  }, {
                    default: withCtx(() => _cache[11] || (_cache[11] = [
                      createTextVNode(" 立即登录 ")
                    ])),
                    _: 1
                  })
                ])
              ]),
              errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["model"])
        ])
      ]);
    };
  }
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d18eff6"]]);
export {
  Register as default
};
//# sourceMappingURL=Register-4a7bdaa3.js.map
