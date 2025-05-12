import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, k as resolveComponent, o as openBlock, j as createTextVNode } from "./index-af7cb7d5.js";
const NotFound_vue_vue_type_style_index_0_scoped_76e7fa52_lang = "";
const _sfc_main = {};
const _hoisted_1 = { class: "not-found" };
function _sfc_render(_ctx, _cache) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[1] || (_cache[1] = createBaseVNode("h1", null, "404", -1)),
    _cache[2] || (_cache[2] = createBaseVNode("h2", null, "页面不存在", -1)),
    _cache[3] || (_cache[3] = createBaseVNode("p", null, "您访问的页面不存在或已被删除", -1)),
    createVNode(_component_router_link, { to: "/" }, {
      default: withCtx(() => _cache[0] || (_cache[0] = [
        createTextVNode("返回首页")
      ])),
      _: 1
    })
  ]);
}
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-76e7fa52"]]);
export {
  NotFound as default
};
//# sourceMappingURL=NotFound-2f4a7ddb.js.map
