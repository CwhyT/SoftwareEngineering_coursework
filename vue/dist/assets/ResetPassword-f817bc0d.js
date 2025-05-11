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
import { a3 as useRoute, u as useRouter, ag as reactive, r as ref, I as onMounted, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, i as withModifiers, t as toDisplayString, f as createCommentVNode, j as createTextVNode, k as resolveComponent, o as openBlock, _ as userApi } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const ResetPassword_vue_vue_type_style_index_0_scoped_0dcf42a2_lang = "";
const _hoisted_1 = { class: "reset-password-page min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center" };
const _hoisted_2 = { class: "max-w-md w-full bg-white p-8 rounded-lg shadow-md" };
const _hoisted_3 = {
  key: 0,
  class: "mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
};
const _hoisted_4 = {
  key: 1,
  class: "mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded"
};
const _hoisted_5 = { class: "mt-2" };
const _hoisted_6 = {
  key: 2,
  class: "mt-6 text-center"
};
const _sfc_main = {
  __name: "ResetPassword",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const formData = reactive({
      password: "",
      confirmPassword: "",
      token: ""
    });
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不能小于6个字符"));
      } else {
        if (formData.confirmPassword !== "") {
          resetFormRef.value.validateField("confirmPassword");
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== formData.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const formRules = {
      password: [
        { validator: validatePassword, trigger: "blur" }
      ],
      confirmPassword: [
        { validator: validateConfirmPassword, trigger: "blur" }
      ]
    };
    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const resetFormRef = ref(null);
    const tokenValid = ref(false);
    onMounted(() => {
      const token = route.params.token || route.query.token;
      if (!token) {
        errorMessage.value = "重置令牌不存在，请重新申请找回密码";
        return;
      }
      formData.token = token;
      tokenValid.value = true;
    });
    const handleSubmit = () => {
      if (!tokenValid.value) {
        errorMessage.value = "重置令牌无效，请重新申请找回密码";
        return;
      }
      resetFormRef.value.validate((valid) => __async(this, null, function* () {
        var _a, _b;
        if (!valid)
          return;
        loading.value = true;
        errorMessage.value = "";
        successMessage.value = "";
        try {
          const response = yield userApi.resetPassword(formData.token, formData.password);
          successMessage.value = response.data.message || "密码重置成功，请使用新密码登录";
          formData.password = "";
          formData.confirmPassword = "";
          resetFormRef.value.resetFields();
          setTimeout(() => {
            router.push("/auth/login");
          }, 3e3);
        } catch (error) {
          console.error("重置密码错误:", error);
          errorMessage.value = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "重置密码失败，请稍后重试";
        } finally {
          loading.value = false;
        }
      }));
    };
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[6] || (_cache[6] = createBaseVNode("div", { class: "text-center mb-6" }, [
            createBaseVNode("h2", { class: "text-2xl font-bold text-gray-800" }, "重置密码"),
            createBaseVNode("p", { class: "text-gray-600 mt-2" }, "请设置您的新密码")
          ], -1)),
          createVNode(_component_el_form, {
            ref_key: "resetFormRef",
            ref: resetFormRef,
            model: formData,
            rules: formRules,
            onSubmit: withModifiers(handleSubmit, ["prevent"])
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, { prop: "password" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: formData.password,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.password = $event),
                    placeholder: "新密码",
                    type: "password",
                    "prefix-icon": "Lock",
                    autocomplete: "new-password",
                    "show-password": ""
                  }, null, 8, ["modelValue"]),
                  _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-xs text-gray-500 mt-1 ml-1" }, " 密码长度不能小于6个字符 ", -1))
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, { prop: "confirmPassword" }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: formData.confirmPassword,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.confirmPassword = $event),
                    placeholder: "确认密码",
                    type: "password",
                    "prefix-icon": "Lock",
                    autocomplete: "new-password",
                    "show-password": ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                "native-type": "submit",
                class: "w-full mt-4",
                loading: loading.value
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" 重置密码 ")
                ])),
                _: 1
              }, 8, ["loading"])
            ]),
            _: 1
          }, 8, ["model"]),
          errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true),
          successMessage.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createTextVNode(toDisplayString(successMessage.value) + " ", 1),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_router_link, {
                to: "/auth/login",
                class: "text-green-700 font-semibold underline"
              }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" 立即登录 ")
                ])),
                _: 1
              })
            ])
          ])) : createCommentVNode("", true),
          !successMessage.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createVNode(_component_router_link, {
              to: "/auth/login",
              class: "text-blue-600 hover:text-blue-800"
            }, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createTextVNode(" 返回登录 ")
              ])),
              _: 1
            })
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0dcf42a2"]]);
export {
  ResetPassword as default
};
//# sourceMappingURL=ResetPassword-f817bc0d.js.map
