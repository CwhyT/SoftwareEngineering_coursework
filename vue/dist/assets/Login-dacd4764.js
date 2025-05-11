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
import { u as useRouter, a3 as useRoute, a as useUserStore, ag as reactive, r as ref, Z as computed, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, i as withModifiers, k as resolveComponent, o as openBlock, e as unref, n as user_default, z as lock_default, j as createTextVNode, t as toDisplayString, f as createCommentVNode, L as ElMessage } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Login_vue_vue_type_style_index_0_scoped_45614b01_lang = "";
const _hoisted_1 = { class: "login-page min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center" };
const _hoisted_2 = { class: "max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md" };
const _hoisted_3 = { class: "mb-6" };
const _hoisted_4 = { class: "flex justify-between items-center mt-2" };
const _hoisted_5 = { class: "mt-4 text-center" };
const _hoisted_6 = {
  key: 0,
  class: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
};
const _sfc_main = {
  __name: "Login",
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const loginForm = reactive({
      username: "",
      password: ""
    });
    const loginRules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ]
    };
    const loading = ref(false);
    ref(false);
    const errorMessage = ref("");
    const loginFormRef = ref(null);
    computed(() => false);
    const handleLogin = () => __async(this, null, function* () {
      if (!loginForm.username || !loginForm.password) {
        ElMessage.warning("请输入用户名和密码");
        return;
      }
      loading.value = true;
      errorMessage.value = "";
      try {
        const credentials = {
          username: loginForm.username,
          password: loginForm.password
        };
        const result = yield userStore.login(credentials);
        if (result.success) {
          ElMessage.success("登录成功");
          const redirectPath = route.query.redirect || (userStore.isAdmin ? "/admin" : "/");
          router.push(redirectPath);
        } else {
          errorMessage.value = result.message || "登录失败，请检查用户名和密码";
        }
      } catch (error) {
        console.error("登录错误:", error);
        errorMessage.value = "登录过程中发生错误";
      } finally {
        loading.value = false;
      }
    });
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_router_link = resolveComponent("router-link");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "text-center" }, [
            createBaseVNode("h2", { class: "mt-2 text-3xl font-extrabold text-gray-900" }, " 登录账户 "),
            createBaseVNode("p", { class: "mt-2 text-sm text-gray-600" }, " 电动滑板车租赁系统 ")
          ], -1)),
          createVNode(_component_el_form, {
            ref_key: "loginFormRef",
            ref: loginFormRef,
            model: loginForm,
            rules: loginRules,
            onSubmit: withModifiers(handleLogin, ["prevent"]),
            class: "mt-8 space-y-6"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_el_form_item, { prop: "username" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: loginForm.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => loginForm.username = $event),
                      placeholder: "请输入您的用户名",
                      "prefix-icon": unref(user_default),
                      autocomplete: "username",
                      class: "form-input"
                    }, null, 8, ["modelValue", "prefix-icon"]),
                    _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-xs text-gray-500 mt-1 ml-1" }, "用户名长度在3-20个字符之间", -1))
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, { prop: "password" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: loginForm.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => loginForm.password = $event),
                      type: "password",
                      placeholder: "请输入您的密码",
                      "prefix-icon": unref(lock_default),
                      autocomplete: "current-password",
                      class: "form-input",
                      "show-password": ""
                    }, null, 8, ["modelValue", "prefix-icon"]),
                    _cache[4] || (_cache[4] = createBaseVNode("div", { class: "text-xs text-gray-500 mt-1 ml-1" }, "密码长度在6-20个字符之间", -1))
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(_component_el_checkbox, {
                  modelValue: loginForm.remember,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => loginForm.remember = $event)
                }, {
                  default: withCtx(() => _cache[5] || (_cache[5] = [
                    createTextVNode("记住我")
                  ])),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(_component_router_link, {
                  to: "/auth/forgot-password",
                  class: "text-blue-500 text-sm"
                }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode("忘记密码?")
                  ])),
                  _: 1
                })
              ]),
              createVNode(_component_el_button, {
                type: "primary",
                "native-type": "submit",
                class: "w-full mt-4",
                loading: loading.value
              }, {
                default: withCtx(() => _cache[7] || (_cache[7] = [
                  createTextVNode("登录")
                ])),
                _: 1
              }, 8, ["loading"]),
              createBaseVNode("div", _hoisted_5, [
                createVNode(_component_router_link, {
                  to: "/auth/register",
                  class: "text-blue-500"
                }, {
                  default: withCtx(() => _cache[8] || (_cache[8] = [
                    createTextVNode("没有账号? 立即注册")
                  ])),
                  _: 1
                })
              ]),
              errorMessage.value ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["model"])
        ])
      ]);
    };
  }
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45614b01"]]);
export {
  Login as default
};
//# sourceMappingURL=Login-dacd4764.js.map
