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
import { u as useRouter, r as ref, I as onMounted, L as ElMessage, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, e as unref, E as ElMessageBox, k as resolveComponent, o as openBlock, aa as camera_default, j as createTextVNode } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Scan_vue_vue_type_style_index_0_scoped_9643387c_lang = "";
const _hoisted_1 = { class: "scan-container" };
const _hoisted_2 = { class: "scan-box" };
const _hoisted_3 = { class: "camera-view" };
const _hoisted_4 = { class: "mt-4 text-center" };
const _sfc_main = {
  __name: "Scan",
  setup(__props) {
    const router = useRouter();
    const isScanActive = ref(false);
    const handleScan = () => __async(this, null, function* () {
      if (isScanActive.value)
        return;
      isScanActive.value = true;
      ElMessage.info({
        message: "正在扫描...",
        duration: 1500
      });
      yield new Promise((resolve) => setTimeout(resolve, 2e3));
      const scannedScooterId = "A" + Math.floor(1e3 + Math.random() * 9e3);
      ElMessageBox.confirm(
        `已扫描到车辆: ${scannedScooterId}，电量: 85%，确认租用？`,
        "扫描成功",
        {
          confirmButtonText: "确认租用",
          cancelButtonText: "取消",
          type: "success"
        }
      ).then(() => {
        ElMessage({
          type: "success",
          message: "租用成功，正在解锁车辆...",
          duration: 1500
        });
        setTimeout(() => {
          router.push("/payment");
        }, 1e3);
      }).catch(() => {
        ElMessage({
          type: "info",
          message: "已取消租用",
          duration: 1500
        });
      }).finally(() => {
        isScanActive.value = false;
      });
    });
    onMounted(() => {
      console.log("扫码页面已加载");
      ElMessage({
        message: "请允许使用相机权限以扫描车辆二维码",
        type: "info",
        duration: 1500
      });
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[4] || (_cache[4] = createBaseVNode("h1", { class: "text-2xl font-bold text-center mb-6" }, "扫码租车", -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_el_icon, { class: "scan-icon" }, {
              default: withCtx(() => [
                createVNode(unref(camera_default))
              ]),
              _: 1
            }),
            _cache[1] || (_cache[1] = createBaseVNode("p", { class: "text-gray-500 mt-3" }, "请将二维码对准扫描框", -1))
          ]),
          createVNode(_component_el_button, {
            type: "primary",
            class: "scan-btn",
            onClick: handleScan
          }, {
            default: withCtx(() => _cache[2] || (_cache[2] = [
              createTextVNode("开始扫描")
            ])),
            _: 1
          }),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_el_button, {
              type: "text",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/rent"))
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" 返回车辆列表 ")
              ])),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
const Scan = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9643387c"]]);
export {
  Scan as default
};
//# sourceMappingURL=Scan-99583fde.js.map
