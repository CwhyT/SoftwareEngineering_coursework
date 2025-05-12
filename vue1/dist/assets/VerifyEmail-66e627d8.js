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
import { a3 as useRoute, r as ref, I as onMounted, _ as userApi, c as createElementBlock, b as createBaseVNode, K as createStaticVNode, d as createVNode, w as withCtx, t as toDisplayString, k as resolveComponent, o as openBlock, j as createTextVNode } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const VerifyEmail_vue_vue_type_style_index_0_scoped_f1082441_lang = "";
const _hoisted_1 = { class: "verify-email-page min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center" };
const _hoisted_2 = { class: "max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center" };
const _hoisted_3 = {
  key: 0,
  class: "py-8"
};
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { key: 2 };
const _hoisted_6 = { class: "text-gray-600 mb-6" };
const _hoisted_7 = { class: "flex flex-col space-y-3" };
const _sfc_main = {
  __name: "VerifyEmail",
  setup(__props) {
    const route = useRoute();
    const loading = ref(true);
    const verified = ref(false);
    const errorMessage = ref("");
    onMounted(() => __async(this, null, function* () {
      var _a, _b;
      const token = route.params.token || route.query.token;
      if (!token) {
        loading.value = false;
        errorMessage.value = "验证令牌不存在";
        return;
      }
      try {
        const response = yield userApi.verifyEmail(token);
        if (response.data.success) {
          verified.value = true;
        } else {
          errorMessage.value = response.data.message;
        }
      } catch (error) {
        console.error("邮箱验证错误:", error);
        errorMessage.value = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "验证过程中发生错误";
      } finally {
        loading.value = false;
      }
    }));
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_3, _cache[0] || (_cache[0] = [
            createBaseVNode("div", { class: "animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto" }, null, -1),
            createBaseVNode("p", { class: "mt-4 text-gray-600" }, "正在验证邮箱...", -1)
          ]))) : verified.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            _cache[2] || (_cache[2] = createStaticVNode('<div class="flex justify-center mb-4" data-v-f1082441><div class="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center" data-v-f1082441><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor" data-v-f1082441><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-f1082441></path></svg></div></div><h2 class="text-2xl font-bold text-gray-800 mb-4" data-v-f1082441>邮箱验证成功</h2><p class="text-gray-600 mb-6" data-v-f1082441>您的邮箱已成功验证，账户已激活。</p>', 3)),
            createVNode(_component_router_link, {
              to: "/auth/login",
              class: "block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            }, {
              default: withCtx(() => _cache[1] || (_cache[1] = [
                createTextVNode(" 前往登录 ")
              ])),
              _: 1
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
            _cache[5] || (_cache[5] = createStaticVNode('<div class="flex justify-center mb-4" data-v-f1082441><div class="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center" data-v-f1082441><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor" data-v-f1082441><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-f1082441></path></svg></div></div><h2 class="text-2xl font-bold text-gray-800 mb-4" data-v-f1082441>验证失败</h2>', 2)),
            createBaseVNode("p", _hoisted_6, toDisplayString(errorMessage.value || "验证链接无效或已过期。"), 1),
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_router_link, {
                to: "/auth/login",
                class: "block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode(" 返回登录 ")
                ])),
                _: 1
              }),
              createVNode(_component_router_link, {
                to: "/auth/register",
                class: "block bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200"
              }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" 重新注册 ")
                ])),
                _: 1
              })
            ])
          ]))
        ])
      ]);
    };
  }
};
const VerifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f1082441"]]);
export {
  VerifyEmail as default
};
//# sourceMappingURL=VerifyEmail-66e627d8.js.map
