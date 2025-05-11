import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { o as openBlock, c as createElementBlock, b as createBaseVNode } from "./index-af7cb7d5.js";
const ScooterIcon_vue_vue_type_style_index_0_scoped_fa2db4e9_lang = "";
const _hoisted_1 = ["width", "height"];
const _hoisted_2 = ["stroke", "stroke-linecap", "stroke-linejoin"];
const _hoisted_3 = ["stroke", "stroke-linecap", "stroke-linejoin"];
const _hoisted_4 = ["stroke", "stroke-linecap", "stroke-linejoin"];
const _hoisted_5 = ["stroke", "stroke-linecap", "stroke-linejoin"];
const _hoisted_6 = ["stroke"];
const _hoisted_7 = ["stroke"];
const _sfc_main = {
  __name: "ScooterIcon",
  props: {
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: "currentColor"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        width: __props.size,
        height: __props.size,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        createBaseVNode("path", {
          d: "M15 6h2a2 2 0 0 1 2 2v9",
          stroke: __props.color,
          "stroke-width": 1.5,
          "stroke-linecap": _ctx.round,
          "stroke-linejoin": _ctx.round
        }, null, 8, _hoisted_2),
        createBaseVNode("path", {
          d: "M7 12h5l3 5",
          stroke: __props.color,
          "stroke-width": 1.5,
          "stroke-linecap": _ctx.round,
          "stroke-linejoin": _ctx.round
        }, null, 8, _hoisted_3),
        createBaseVNode("path", {
          d: "M10 6v4",
          stroke: __props.color,
          "stroke-width": 1.5,
          "stroke-linecap": _ctx.round,
          "stroke-linejoin": _ctx.round
        }, null, 8, _hoisted_4),
        createBaseVNode("path", {
          d: "M8 6h4",
          stroke: __props.color,
          "stroke-width": 1.5,
          "stroke-linecap": _ctx.round,
          "stroke-linejoin": _ctx.round
        }, null, 8, _hoisted_5),
        createBaseVNode("circle", {
          cx: "7",
          cy: "17",
          r: "2",
          stroke: __props.color,
          "stroke-width": 1.5
        }, null, 8, _hoisted_6),
        createBaseVNode("circle", {
          cx: "17",
          cy: "17",
          r: "2",
          stroke: __props.color,
          "stroke-width": 1.5
        }, null, 8, _hoisted_7)
      ], 8, _hoisted_1);
    };
  }
};
const ScooterIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa2db4e9"]]);
export {
  ScooterIcon as S
};
//# sourceMappingURL=ScooterIcon-c95a9db3.js.map
