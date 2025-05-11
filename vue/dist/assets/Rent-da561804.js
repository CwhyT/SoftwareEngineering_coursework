var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
import { u as useRouter, a as useUserStore, r as ref, Z as computed, I as onMounted, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, C as normalizeClass, a7 as Transition, L as ElMessage, k as resolveComponent, o as openBlock, j as createTextVNode, t as toDisplayString, F as Fragment, J as renderList, S as normalizeStyle, e as unref, a8 as back_default, f as createCommentVNode, a9 as edit_default, $ as warning_default, a6 as check_default, E as ElMessageBox, a5 as ElLoading } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Rent_vue_vue_type_style_index_0_scoped_40ab1769_lang = "";
const _hoisted_1 = { class: "rent-page bg-gray-100 min-h-screen p-4" };
const _hoisted_2 = { class: "flex justify-between items-center mb-8" };
const _hoisted_3 = { class: "bg-white rounded-lg shadow p-5 mb-8" };
const _hoisted_4 = { class: "flex items-center" };
const _hoisted_5 = { class: "flex-1 text-center" };
const _hoisted_6 = { class: "flex-1 text-center" };
const _hoisted_7 = { class: "flex-1 text-center" };
const _hoisted_8 = { key: 0 };
const _hoisted_9 = { class: "bg-white rounded-lg shadow p-5 mb-6 flex items-center" };
const _hoisted_10 = { class: "flex-1" };
const _hoisted_11 = { class: "text-lg font-medium mb-1" };
const _hoisted_12 = { class: "text-sm text-gray-500" };
const _hoisted_13 = {
  key: 0,
  class: "space-y-5 mb-8"
};
const _hoisted_14 = { class: "flex items-center justify-between" };
const _hoisted_15 = { class: "flex items-center" };
const _hoisted_16 = { class: "text-lg font-medium" };
const _hoisted_17 = { class: "text-sm text-gray-500 mt-2" };
const _hoisted_18 = { class: "mt-4 grid grid-cols-2 gap-6" };
const _hoisted_19 = { class: "flex items-center" };
const _hoisted_20 = { class: "flex-1 bg-gray-200 h-3 rounded-full overflow-hidden" };
const _hoisted_21 = {
  key: 1,
  class: "bg-white rounded-lg shadow p-6 text-center"
};
const _hoisted_22 = {
  key: 2,
  class: "bg-white rounded-lg shadow p-6 text-center"
};
const _hoisted_23 = { class: "mt-6 bg-white rounded-lg shadow p-5" };
const _hoisted_24 = { class: "flex items-center justify-between" };
const _hoisted_25 = {
  key: 1,
  class: "bg-white rounded-lg shadow p-5 mb-8"
};
const _hoisted_26 = { class: "mb-5" };
const _hoisted_27 = {
  key: 0,
  class: "border-b pb-4 mb-4"
};
const _hoisted_28 = { class: "flex items-center mb-4" };
const _hoisted_29 = { class: "flex-1" };
const _hoisted_30 = { class: "text-lg font-medium" };
const _hoisted_31 = { class: "flex items-center text-sm text-gray-500 mt-1" };
const _hoisted_32 = { class: "mr-3" };
const _hoisted_33 = { class: "mb-4" };
const _hoisted_34 = { class: "flex mb-4" };
const _hoisted_35 = { key: 0 };
const _hoisted_36 = { class: "grid grid-cols-2 gap-2 sm:grid-cols-4 mb-3" };
const _hoisted_37 = ["onClick"];
const _hoisted_38 = { class: "text-center" };
const _hoisted_39 = { class: "font-medium text-lg" };
const _hoisted_40 = { class: "text-blue-600 font-medium mt-1" };
const _hoisted_41 = { class: "text-center" };
const _hoisted_42 = { class: "text-blue-600 font-medium mt-1" };
const _hoisted_43 = {
  key: 0,
  class: "bg-gray-50 rounded-lg p-4 mb-3 animate-fadeIn"
};
const _hoisted_44 = { class: "mb-3" };
const _hoisted_45 = { class: "flex flex-wrap gap-2" };
const _hoisted_46 = { class: "w-full sm:w-auto" };
const _hoisted_47 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_48 = { class: "flex justify-between text-sm" };
const _hoisted_49 = { class: "text-blue-600 font-medium" };
const _hoisted_50 = {
  key: 1,
  class: "bg-gray-50 rounded-lg p-4 mb-3 animate-fadeIn"
};
const _hoisted_51 = { class: "mb-4" };
const _hoisted_52 = { class: "mb-4" };
const _hoisted_53 = { class: "flex justify-between items-center text-sm border-t border-gray-200 pt-3" };
const _hoisted_54 = { class: "text-blue-600 font-medium" };
const _hoisted_55 = { class: "mt-3 text-xs text-gray-500" };
const _hoisted_56 = { class: "flex items-start" };
const _hoisted_57 = { class: "flex items-start mt-1" };
const _hoisted_58 = { class: "mb-4" };
const _hoisted_59 = { class: "bg-gray-50 rounded-lg p-4" };
const _hoisted_60 = { class: "flex justify-between mb-2" };
const _hoisted_61 = { class: "text-gray-600" };
const _hoisted_62 = { class: "font-medium" };
const _hoisted_63 = { class: "border-t border-gray-200 mt-2 pt-2 flex justify-between text-lg" };
const _hoisted_64 = { class: "text-red-500 font-bold" };
const _hoisted_65 = { class: "mb-4" };
const _hoisted_66 = { class: "bg-gray-50 rounded-lg p-4 text-sm text-gray-600" };
const _hoisted_67 = { class: "flex items-start mb-2" };
const _hoisted_68 = { class: "flex items-start mb-2" };
const _hoisted_69 = { class: "flex items-start mb-2" };
const _hoisted_70 = { class: "flex items-start" };
const _hoisted_71 = { class: "flex justify-center" };
const _hoisted_72 = {
  key: 2,
  class: "bg-white rounded-lg shadow p-6 text-center"
};
const _hoisted_73 = { class: "inline-block p-4 bg-green-100 rounded-full mb-4" };
const _hoisted_74 = { class: "text-xl font-bold mb-2" };
const _hoisted_75 = { class: "text-gray-500 mb-6" };
const _hoisted_76 = { class: "bg-gray-50 rounded-lg p-4 mb-6" };
const _hoisted_77 = { class: "flex items-center justify-between mb-3" };
const _hoisted_78 = { class: "font-medium" };
const _hoisted_79 = { class: "flex items-center justify-between mb-3" };
const _hoisted_80 = { class: "font-medium" };
const _hoisted_81 = { class: "flex items-center justify-between mb-3" };
const _hoisted_82 = { class: "font-medium" };
const _hoisted_83 = { class: "flex items-center justify-between mb-3" };
const _hoisted_84 = { class: "font-medium" };
const _hoisted_85 = { class: "flex items-center justify-between mb-3" };
const _hoisted_86 = { class: "font-medium" };
const _hoisted_87 = { class: "flex items-center justify-between mb-3" };
const _hoisted_88 = { class: "font-medium" };
const _hoisted_89 = { class: "flex items-center justify-between mb-3" };
const _hoisted_90 = { class: "font-medium" };
const _hoisted_91 = { class: "flex items-center justify-between" };
const _hoisted_92 = { class: "font-medium" };
const _hoisted_93 = {
  key: 0,
  class: "mb-6"
};
const _sfc_main = {
  __name: "Rent",
  setup(__props) {
    const router = useRouter();
    useUserStore();
    const scooters = ref([]);
    const isLoading = ref(false);
    const isSubmitting = ref(false);
    const selectedScooter = ref(null);
    const currentLocation = ref("");
    const activeStep = ref(1);
    const rentalInfo = ref({});
    const selectedRentalDuration = ref("1");
    const isCustomDuration = ref(false);
    const customHours = ref(1);
    const customMinutes = ref(0);
    const customDurationValue = ref("custom_1:0");
    const rentalMode = ref("duration");
    const reservationStartTime = ref("");
    const reservationEndTime = ref("");
    const isReservation = computed(() => rentalMode.value === "reservation");
    const rentalDurationOptions = [
      { value: "1", label: "1小时", price: 8 },
      { value: "4", label: "4小时", price: 25 },
      { value: "1d", label: "1天", price: 50 },
      { value: "7d", label: "1周", price: 280 }
    ];
    const fetchNearbyScooters = () => __async(this, null, function* () {
      if (isLoading.value)
        return;
      isLoading.value = true;
      try {
        yield new Promise((resolve) => setTimeout(resolve, 500));
        currentLocation.value = "某某大学北门附近";
        yield new Promise((resolve) => setTimeout(resolve, 800));
        scooters.value = generateMockScooters();
        ElMessage({
          type: "success",
          message: "已更新车辆列表",
          duration: 1500
        });
      } catch (error) {
        console.error("获取车辆失败:", error);
        ElMessage({
          type: "error",
          message: "获取车辆列表失败",
          duration: 1500
        });
      } finally {
        isLoading.value = false;
      }
    });
    const generateMockScooters = () => {
      const count = 5;
      const result = [];
      for (let i = 0; i < count; i++) {
        const areas = ["A", "B", "C"];
        const area = areas[i % areas.length];
        const number = 1e3 + i;
        result.push({
          id: area + number,
          battery: Math.floor(20 + Math.random() * 80),
          // 保证至少有20%电量
          distance: Math.floor(50 + Math.random() * 450)
          // 50-500米
        });
      }
      return result.sort((a, b) => a.distance - b.distance);
    };
    const formatDistance = (meters) => {
      return meters < 1e3 ? `${meters}米` : `${(meters / 1e3).toFixed(1)}千米`;
    };
    const formatTime = (timestamp) => {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    };
    const formatDateTime = (timestamp) => {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${month}月${day}日 ${hours}:${minutes}`;
    };
    const selectScooter = (scooter) => {
      selectedScooter.value = scooter;
      activeStep.value = 2;
    };
    const switchRentalMode = (mode) => {
      rentalMode.value = mode;
    };
    const disablePastDates = (date) => {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      return date.getTime() < today.getTime();
    };
    const disablePastHours = () => {
      const now = /* @__PURE__ */ new Date();
      const hours = [];
      if (reservationStartTime.value) {
        const selectedDate = new Date(reservationStartTime.value);
        const today = /* @__PURE__ */ new Date();
        if (selectedDate.getDate() === today.getDate() && selectedDate.getMonth() === today.getMonth() && selectedDate.getFullYear() === today.getFullYear()) {
          for (let i = 0; i < now.getHours(); i++) {
            hours.push(i);
          }
        }
      }
      return hours;
    };
    const disableInvalidEndDates = (date) => {
      if (!reservationStartTime.value)
        return true;
      const startTime = new Date(reservationStartTime.value);
      if (date.getTime() < startTime.getTime()) {
        return true;
      }
      const maxDate = new Date(startTime);
      maxDate.setDate(maxDate.getDate() + 7);
      return date.getTime() > maxDate.getTime();
    };
    const updateReservation = () => {
      if (reservationStartTime.value && reservationEndTime.value) {
        const startTime = new Date(reservationStartTime.value);
        const endTime = new Date(reservationEndTime.value);
        const now = /* @__PURE__ */ new Date();
        const minStartTime = new Date(now);
        minStartTime.setHours(minStartTime.getHours() + 1);
        if (startTime < minStartTime) {
          ElMessage({
            type: "warning",
            message: "预约时间必须至少提前1小时",
            duration: 2e3
          });
          reservationStartTime.value = "";
          return;
        }
        if (endTime <= startTime) {
          ElMessage({
            type: "warning",
            message: "结束时间必须晚于开始时间",
            duration: 2e3
          });
          reservationEndTime.value = "";
          return;
        }
      }
    };
    const calculateReservationPrice = () => {
      if (!reservationStartTime.value || !reservationEndTime.value) {
        return 0;
      }
      const startTime = new Date(reservationStartTime.value);
      const endTime = new Date(reservationEndTime.value);
      const diffHours = (endTime - startTime) / (1e3 * 60 * 60);
      if (diffHours <= 1) {
        return diffHours * 8;
      } else if (diffHours <= 4) {
        return diffHours * (25 / 4);
      } else if (diffHours <= 24) {
        return diffHours * (50 / 24);
      } else {
        const days = Math.floor(diffHours / 24);
        const remainingHours = diffHours % 24;
        let price = days * 50;
        if (remainingHours > 0) {
          if (remainingHours * (50 / 24) > 25) {
            price += 50;
          } else {
            price += remainingHours * (50 / 24);
          }
        }
        return price;
      }
    };
    const formatReservationTime = (timestamp) => {
      if (!timestamp)
        return "";
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    };
    const showCancelConfirm = () => {
      ElMessageBox.confirm(
        "确定要取消预约吗？预约费用将退回您的账户",
        "取消预约",
        {
          confirmButtonText: "确定取消",
          cancelButtonText: "返回",
          type: "warning"
        }
      ).then(() => {
        cancelReservation();
      }).catch(() => {
      });
    };
    const cancelReservation = () => __async(this, null, function* () {
      const loading = ElLoading.service({
        lock: true,
        text: "正在处理...",
        background: "rgba(255, 255, 255, 0.8)"
      });
      try {
        yield new Promise((resolve) => setTimeout(resolve, 1500));
        localStorage.removeItem("currentRental");
        loading.close();
        ElMessage({
          type: "success",
          message: "预约已成功取消，费用将在1-3个工作日内退回您的账户",
          duration: 2500
        });
        router.push("/");
      } catch (error) {
        console.error("取消预约失败:", error);
        ElMessage({
          type: "error",
          message: "取消预约失败，请重试",
          duration: 1500
        });
      } finally {
        loading.close();
      }
    });
    const confirmRent = () => __async(this, null, function* () {
      if (!selectedScooter.value || isSubmitting.value)
        return;
      if (rentalMode.value === "duration" && !selectedRentalDuration.value) {
        ElMessage({
          type: "warning",
          message: "请选择租赁时长",
          duration: 1500
        });
        return;
      }
      if (rentalMode.value === "reservation" && (!reservationStartTime.value || !reservationEndTime.value)) {
        ElMessage({
          type: "warning",
          message: "请选择预约时间",
          duration: 1500
        });
        return;
      }
      isSubmitting.value = true;
      try {
        const loading = ElLoading.service({
          lock: true,
          text: "正在处理...",
          background: "rgba(255, 255, 255, 0.8)"
        });
        yield new Promise((resolve) => setTimeout(resolve, 1500));
        let rentalData = {
          scooterId: selectedScooter.value.id,
          deposit: 99,
          status: "active"
        };
        if (rentalMode.value === "duration") {
          const startTime = /* @__PURE__ */ new Date();
          const endTime = new Date(startTime);
          if (selectedRentalDuration.value.startsWith("custom_")) {
            const [hours, minutes] = selectedRentalDuration.value.replace("custom_", "").split(":");
            endTime.setHours(endTime.getHours() + parseInt(hours));
            endTime.setMinutes(endTime.getMinutes() + parseInt(minutes));
          } else {
            switch (selectedRentalDuration.value) {
              case "1":
                endTime.setHours(endTime.getHours() + 1);
                break;
              case "4":
                endTime.setHours(endTime.getHours() + 4);
                break;
              case "1d":
                endTime.setDate(endTime.getDate() + 1);
                break;
              case "7d":
                endTime.setDate(endTime.getDate() + 7);
                break;
            }
          }
          rentalData = __spreadProps(__spreadValues({}, rentalData), {
            startTime,
            endTime,
            rentalDuration: selectedRentalDuration.value,
            rentalPrice: getSelectedDurationPrice(),
            totalPaid: getSelectedDurationPrice() + 99,
            isReservation: false
          });
        } else {
          const reservationId = `RSV-${Date.now().toString().slice(-6)}`;
          rentalData = __spreadProps(__spreadValues({}, rentalData), {
            reservationId,
            startTime: new Date(reservationStartTime.value),
            endTime: new Date(reservationEndTime.value),
            rentalPrice: calculateReservationPrice(),
            totalPaid: calculateReservationPrice() + 99,
            isReservation: true
          });
        }
        rentalInfo.value = rentalData;
        localStorage.setItem("currentRental", JSON.stringify(rentalData));
        loading.close();
        activeStep.value = 3;
      } catch (error) {
        ElMessage({
          type: "error",
          message: "支付失败，请重试",
          duration: 1500
        });
        console.error("租车失败:", error);
      } finally {
        isSubmitting.value = false;
      }
    });
    const goToProfile = () => {
      router.push("/profile");
    };
    const goToHome = () => {
      router.push("/");
    };
    const goToScanPage = () => {
      router.push("/scan");
    };
    const refreshScooters = () => {
      fetchNearbyScooters();
    };
    const getBatteryColor = (battery) => {
      if (battery >= 60)
        return "#10B981";
      if (battery >= 30)
        return "#F59E0B";
      return "#EF4444";
    };
    const getBatteryTextColor = (battery) => {
      if (battery >= 60)
        return "text-green-500";
      if (battery >= 30)
        return "text-yellow-500";
      return "text-red-500";
    };
    const toggleCustomDuration = () => {
      isCustomDuration.value = true;
      updateCustomDuration();
    };
    const updateCustomDuration = () => {
      if (customHours.value === 0 && customMinutes.value === 0) {
        customHours.value = 1;
      }
      customDurationValue.value = `custom_${customHours.value}:${customMinutes.value}`;
      selectedRentalDuration.value = customDurationValue.value;
    };
    const calculateCustomPrice = () => {
      const totalHours = customHours.value + customMinutes.value / 60;
      const hourlyRate = 8;
      if (totalHours <= 1) {
        return totalHours * hourlyRate;
      } else if (totalHours <= 4) {
        return totalHours * (25 / 4);
      } else if (totalHours <= 24) {
        return totalHours * (50 / 24);
      } else {
        const days = Math.floor(totalHours / 24);
        const remainingHours = totalHours % 24;
        let price = days * 50;
        if (remainingHours > 0) {
          if (remainingHours * (50 / 24) > 25) {
            price += 50;
          } else {
            price += remainingHours * (50 / 24);
          }
        }
        return price;
      }
    };
    const selectRentalDuration = (duration) => {
      selectedRentalDuration.value = duration;
      if (duration !== customDurationValue.value) {
        isCustomDuration.value = false;
      }
    };
    const getSelectedDurationLabel = () => {
      if (selectedRentalDuration.value && selectedRentalDuration.value.startsWith("custom_")) {
        const [hours, minutes] = selectedRentalDuration.value.replace("custom_", "").split(":");
        if (minutes === "0") {
          return `${hours}小时`;
        }
        return `${hours}小时${minutes}分钟`;
      }
      const duration = selectedRentalDuration.value;
      const option = rentalDurationOptions.find((opt) => opt.value === duration);
      return option ? option.label : "1小时";
    };
    const getSelectedDurationPrice = () => {
      if (selectedRentalDuration.value && selectedRentalDuration.value.startsWith("custom_")) {
        return calculateCustomPrice();
      }
      const duration = selectedRentalDuration.value;
      const option = rentalDurationOptions.find((opt) => opt.value === duration);
      return option ? option.price : 8;
    };
    onMounted(() => {
      fetchNearbyScooters();
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[8] || (_cache[8] = createBaseVNode("h1", { class: "text-2xl font-bold" }, "附近车辆", -1)),
          createVNode(_component_el_button, {
            type: "primary",
            class: "bg-blue-500 text-white border-0 font-bold px-6 py-2 rounded-md"
          }, {
            default: withCtx(() => _cache[7] || (_cache[7] = [
              createTextVNode(" 查看全部 ")
            ])),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", {
                class: normalizeClass(["w-12 h-12 rounded-full flex items-center justify-center mx-auto", activeStep.value >= 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-white"])
              }, "1", 2),
              createBaseVNode("div", {
                class: normalizeClass(["mt-3 text-base font-medium", activeStep.value >= 1 ? "" : "text-gray-500"])
              }, "选择车辆", 2)
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["w-10 h-px", activeStep.value >= 2 ? "bg-blue-300" : "bg-gray-300"])
            }, null, 2),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("div", {
                class: normalizeClass(["w-12 h-12 rounded-full flex items-center justify-center mx-auto", activeStep.value >= 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-white"])
              }, "2", 2),
              createBaseVNode("div", {
                class: normalizeClass(["mt-3 text-base font-medium", activeStep.value >= 2 ? "" : "text-gray-500"])
              }, "确认信息", 2)
            ]),
            createBaseVNode("div", {
              class: normalizeClass(["w-10 h-px", activeStep.value >= 3 ? "bg-blue-300" : "bg-gray-300"])
            }, null, 2),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", {
                class: normalizeClass(["w-12 h-12 rounded-full flex items-center justify-center mx-auto", activeStep.value >= 3 ? "bg-blue-500 text-white" : "bg-gray-300 text-white"])
              }, "3", 2),
              createBaseVNode("div", {
                class: normalizeClass(["mt-3 text-base font-medium", activeStep.value >= 3 ? "" : "text-gray-500"])
              }, "开始使用", 2)
            ])
          ])
        ]),
        createVNode(Transition, {
          name: "fade",
          mode: "out-in"
        }, {
          default: withCtx(() => {
            var _a, _b;
            return [
              (openBlock(), createElementBlock("div", { key: activeStep.value }, [
                activeStep.value === 1 ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  createBaseVNode("div", _hoisted_9, [
                    createBaseVNode("div", _hoisted_10, [
                      createBaseVNode("div", _hoisted_11, toDisplayString(currentLocation.value || "正在获取位置..."), 1),
                      createBaseVNode("div", _hoisted_12, "找到 " + toDisplayString(scooters.value.length) + " 辆可用车辆", 1)
                    ]),
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: refreshScooters,
                      loading: isLoading.value,
                      class: "bg-blue-500 text-white border-0 font-bold px-4 py-2 rounded-md"
                    }, {
                      default: withCtx(() => _cache[9] || (_cache[9] = [
                        createTextVNode(" 刷新列表 ")
                      ])),
                      _: 1
                    }, 8, ["loading"])
                  ]),
                  scooters.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(scooters.value, (scooter) => {
                      return openBlock(), createElementBlock("div", {
                        key: scooter.id,
                        class: "bg-white rounded-lg shadow p-5"
                      }, [
                        createBaseVNode("div", _hoisted_14, [
                          createBaseVNode("div", _hoisted_15, [
                            _cache[10] || (_cache[10] = createBaseVNode("div", { class: "bg-blue-50 p-4 rounded-lg mr-4" }, [
                              createBaseVNode("span", { class: "text-xl" }, "🛴")
                            ], -1)),
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_16, "车辆编号: " + toDisplayString(scooter.id), 1),
                              createBaseVNode("div", _hoisted_17, "距离: " + toDisplayString(formatDistance(scooter.distance)), 1)
                            ])
                          ]),
                          createVNode(_component_el_button, {
                            type: "primary",
                            size: "small",
                            disabled: scooter.battery < 20,
                            onClick: ($event) => selectScooter(scooter),
                            class: normalizeClass(["bg-blue-500 text-white border-0 font-bold px-6 py-2 text-base rounded-md", scooter.battery < 20 ? "bg-red-500" : ""])
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(scooter.battery < 20 ? "电量不足" : "立即租用"), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled", "onClick", "class"])
                        ]),
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("div", _hoisted_19, [
                            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-sm text-gray-500 mr-2" }, "电量:", -1)),
                            createBaseVNode("div", _hoisted_20, [
                              createBaseVNode("div", {
                                class: "h-full",
                                style: normalizeStyle({
                                  width: `${scooter.battery}%`,
                                  backgroundColor: getBatteryColor(scooter.battery)
                                })
                              }, null, 4)
                            ]),
                            createBaseVNode("div", {
                              class: normalizeClass(["ml-2 text-sm", getBatteryTextColor(scooter.battery)])
                            }, toDisplayString(scooter.battery) + "% ", 3)
                          ]),
                          _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-sm text-right" }, [
                            createBaseVNode("span", { class: "text-gray-500" }, "价格:"),
                            createBaseVNode("span", { class: "text-blue-600 ml-1 font-medium" }, "¥2.00/15分钟")
                          ], -1))
                        ])
                      ]);
                    }), 128))
                  ])) : isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_21, _cache[13] || (_cache[13] = [
                    createBaseVNode("div", { class: "inline-block animate-spin mb-2" }, [
                      createBaseVNode("svg", {
                        class: "w-8 h-8 text-blue-500",
                        fill: "none",
                        viewBox: "0 0 24 24"
                      }, [
                        createBaseVNode("circle", {
                          class: "opacity-25",
                          cx: "12",
                          cy: "12",
                          r: "10",
                          stroke: "currentColor",
                          "stroke-width": "4"
                        }),
                        createBaseVNode("path", {
                          class: "opacity-75",
                          fill: "currentColor",
                          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        })
                      ])
                    ], -1),
                    createBaseVNode("div", { class: "text-gray-500" }, "正在搜索附近车辆...", -1)
                  ]))) : (openBlock(), createElementBlock("div", _hoisted_22, [
                    _cache[15] || (_cache[15] = createBaseVNode("div", { class: "text-gray-400 text-5xl mb-2" }, "🔍", -1)),
                    _cache[16] || (_cache[16] = createBaseVNode("div", { class: "text-lg font-medium mb-2" }, "附近暂无可用车辆", -1)),
                    _cache[17] || (_cache[17] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-4" }, "请尝试调整位置或稍后再试", -1)),
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: refreshScooters,
                      class: "bg-blue-500 text-white border-0 font-bold px-6 py-2 rounded-md"
                    }, {
                      default: withCtx(() => _cache[14] || (_cache[14] = [
                        createTextVNode("刷新列表")
                      ])),
                      _: 1
                    })
                  ])),
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_24, [
                      _cache[19] || (_cache[19] = createBaseVNode("div", null, [
                        createBaseVNode("div", { class: "font-medium" }, "找不到合适的车辆?"),
                        createBaseVNode("div", { class: "text-sm text-gray-500 mt-1" }, "使用扫码方式快速租用")
                      ], -1)),
                      createVNode(_component_el_button, {
                        type: "success",
                        onClick: goToScanPage,
                        class: "bg-green-500 text-white border-0 font-bold px-6 py-2 rounded-md"
                      }, {
                        default: withCtx(() => _cache[18] || (_cache[18] = [
                          createTextVNode(" 扫码用车 ")
                        ])),
                        _: 1
                      })
                    ])
                  ])
                ])) : activeStep.value === 2 ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  createBaseVNode("div", _hoisted_26, [
                    createVNode(_component_el_button, {
                      size: "small",
                      onClick: _cache[0] || (_cache[0] = ($event) => activeStep.value = 1),
                      class: "font-bold"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, { class: "mr-1" }, {
                          default: withCtx(() => [
                            createVNode(unref(back_default))
                          ]),
                          _: 1
                        }),
                        _cache[20] || (_cache[20] = createTextVNode(" 返回列表 "))
                      ]),
                      _: 1
                    })
                  ]),
                  selectedScooter.value ? (openBlock(), createElementBlock("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      _cache[21] || (_cache[21] = createBaseVNode("div", { class: "bg-blue-100 p-3 rounded-lg text-3xl mr-4" }, "🛴", -1)),
                      createBaseVNode("div", _hoisted_29, [
                        createBaseVNode("div", _hoisted_30, "车辆编号: " + toDisplayString(selectedScooter.value.id), 1),
                        createBaseVNode("div", _hoisted_31, [
                          createBaseVNode("span", _hoisted_32, "电量: " + toDisplayString(selectedScooter.value.battery) + "%", 1),
                          createBaseVNode("span", null, "距离: " + toDisplayString(formatDistance(selectedScooter.value.distance)), 1)
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_33, [
                    _cache[33] || (_cache[33] = createBaseVNode("h3", { class: "text-lg font-medium mb-3" }, "选择租赁方式", -1)),
                    createBaseVNode("div", _hoisted_34, [
                      createBaseVNode("div", {
                        class: normalizeClass(["flex-1 text-center p-3 border-b-2 cursor-pointer", rentalMode.value === "duration" ? "border-blue-500 text-blue-600 font-medium" : "border-gray-200 text-gray-500"]),
                        onClick: _cache[1] || (_cache[1] = ($event) => switchRentalMode("duration"))
                      }, " 按时长租赁 ", 2),
                      createBaseVNode("div", {
                        class: normalizeClass(["flex-1 text-center p-3 border-b-2 cursor-pointer", rentalMode.value === "reservation" ? "border-blue-500 text-blue-600 font-medium" : "border-gray-200 text-gray-500"]),
                        onClick: _cache[2] || (_cache[2] = ($event) => switchRentalMode("reservation"))
                      }, " 预约时段 ", 2)
                    ]),
                    rentalMode.value === "duration" ? (openBlock(), createElementBlock("div", _hoisted_35, [
                      createBaseVNode("div", _hoisted_36, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(rentalDurationOptions, (option) => {
                          return createBaseVNode("div", {
                            key: option.value,
                            class: normalizeClass(["border rounded-lg p-3 cursor-pointer transition-colors", selectedRentalDuration.value === option.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"]),
                            onClick: ($event) => selectRentalDuration(option.value)
                          }, [
                            createBaseVNode("div", _hoisted_38, [
                              createBaseVNode("div", _hoisted_39, toDisplayString(option.label), 1),
                              createBaseVNode("div", _hoisted_40, "¥" + toDisplayString(option.price.toFixed(2)), 1)
                            ])
                          ], 10, _hoisted_37);
                        }), 64)),
                        createBaseVNode("div", {
                          class: normalizeClass(["border rounded-lg p-3 cursor-pointer transition-colors", isCustomDuration.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"]),
                          onClick: toggleCustomDuration
                        }, [
                          createBaseVNode("div", _hoisted_41, [
                            _cache[22] || (_cache[22] = createBaseVNode("div", { class: "font-medium text-lg" }, "自定义", -1)),
                            createBaseVNode("div", _hoisted_42, [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(unref(edit_default))
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ], 2)
                      ]),
                      isCustomDuration.value ? (openBlock(), createElementBlock("div", _hoisted_43, [
                        createBaseVNode("div", _hoisted_44, [
                          _cache[25] || (_cache[25] = createBaseVNode("div", { class: "text-sm text-gray-600 mb-2" }, "选择租赁时长", -1)),
                          createBaseVNode("div", _hoisted_45, [
                            createBaseVNode("div", _hoisted_46, [
                              createBaseVNode("div", _hoisted_47, [
                                createBaseVNode("div", null, [
                                  _cache[23] || (_cache[23] = createBaseVNode("label", { class: "text-sm text-gray-500 block mb-1" }, "小时", -1)),
                                  createVNode(_component_el_input_number, {
                                    modelValue: customHours.value,
                                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => customHours.value = $event),
                                    min: 0,
                                    max: 72,
                                    size: "large",
                                    onChange: updateCustomDuration
                                  }, null, 8, ["modelValue"])
                                ]),
                                createBaseVNode("div", null, [
                                  _cache[24] || (_cache[24] = createBaseVNode("label", { class: "text-sm text-gray-500 block mb-1" }, "分钟", -1)),
                                  createVNode(_component_el_input_number, {
                                    modelValue: customMinutes.value,
                                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => customMinutes.value = $event),
                                    min: 0,
                                    max: 59,
                                    step: 15,
                                    size: "large",
                                    onChange: updateCustomDuration
                                  }, null, 8, ["modelValue"])
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_48, [
                          _cache[26] || (_cache[26] = createBaseVNode("span", { class: "text-gray-600" }, "预计费用:", -1)),
                          createBaseVNode("span", _hoisted_49, "¥" + toDisplayString(calculateCustomPrice().toFixed(2)), 1)
                        ]),
                        _cache[27] || (_cache[27] = createBaseVNode("div", { class: "text-xs text-gray-500 mt-2" }, " 注意: 自定义时长最长不超过3天(72小时)，超出租期将收取额外费用 ", -1))
                      ])) : createCommentVNode("", true)
                    ])) : (openBlock(), createElementBlock("div", _hoisted_50, [
                      createBaseVNode("div", _hoisted_51, [
                        createBaseVNode("div", _hoisted_52, [
                          _cache[28] || (_cache[28] = createBaseVNode("label", { class: "text-sm text-gray-600 block mb-2" }, "开始时间", -1)),
                          createVNode(_component_el_date_picker, {
                            modelValue: reservationStartTime.value,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => reservationStartTime.value = $event),
                            type: "datetime",
                            placeholder: "选择开始时间",
                            format: "YYYY-MM-DD HH:mm",
                            "value-format": "YYYY-MM-DD HH:mm",
                            "disabled-date": disablePastDates,
                            "disabled-hours": disablePastHours,
                            onChange: updateReservation,
                            class: "w-full",
                            size: "large"
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _cache[29] || (_cache[29] = createBaseVNode("label", { class: "text-sm text-gray-600 block mb-2" }, "结束时间", -1)),
                          createVNode(_component_el_date_picker, {
                            modelValue: reservationEndTime.value,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => reservationEndTime.value = $event),
                            type: "datetime",
                            placeholder: "选择结束时间",
                            format: "YYYY-MM-DD HH:mm",
                            "value-format": "YYYY-MM-DD HH:mm",
                            "disabled-date": disableInvalidEndDates,
                            onChange: updateReservation,
                            class: "w-full",
                            size: "large"
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_53, [
                        _cache[30] || (_cache[30] = createBaseVNode("span", { class: "text-gray-600" }, "预约费用:", -1)),
                        createBaseVNode("span", _hoisted_54, "¥" + toDisplayString(calculateReservationPrice().toFixed(2)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_55, [
                        createBaseVNode("div", _hoisted_56, [
                          createVNode(_component_el_icon, { class: "mt-0.5 mr-1 text-orange-500" }, {
                            default: withCtx(() => [
                              createVNode(unref(warning_default))
                            ]),
                            _: 1
                          }),
                          _cache[31] || (_cache[31] = createBaseVNode("div", null, "预约时间必须至少提前1小时，且最长不超过7天", -1))
                        ]),
                        createBaseVNode("div", _hoisted_57, [
                          createVNode(_component_el_icon, { class: "mt-0.5 mr-1 text-orange-500" }, {
                            default: withCtx(() => [
                              createVNode(unref(warning_default))
                            ]),
                            _: 1
                          }),
                          _cache[32] || (_cache[32] = createBaseVNode("div", null, "预约成功后，请在预约时间内前往取车，否则预约将自动取消", -1))
                        ])
                      ])
                    ]))
                  ]),
                  createBaseVNode("div", _hoisted_58, [
                    _cache[37] || (_cache[37] = createBaseVNode("h3", { class: "text-lg font-medium mb-3" }, "价格明细", -1)),
                    createBaseVNode("div", _hoisted_59, [
                      createBaseVNode("div", _hoisted_60, [
                        createBaseVNode("span", _hoisted_61, toDisplayString(getSelectedDurationLabel()), 1),
                        createBaseVNode("span", _hoisted_62, "¥" + toDisplayString(getSelectedDurationPrice().toFixed(2)), 1)
                      ]),
                      _cache[35] || (_cache[35] = createBaseVNode("div", { class: "flex justify-between mb-2" }, [
                        createBaseVNode("span", { class: "text-gray-600" }, "超时费用"),
                        createBaseVNode("span", { class: "font-medium" }, "¥2.00/15分钟")
                      ], -1)),
                      _cache[36] || (_cache[36] = createBaseVNode("div", { class: "flex justify-between mb-2" }, [
                        createBaseVNode("span", { class: "text-gray-600" }, "押金（可退）"),
                        createBaseVNode("span", { class: "font-medium" }, "¥99.00")
                      ], -1)),
                      createBaseVNode("div", _hoisted_63, [
                        _cache[34] || (_cache[34] = createBaseVNode("span", { class: "font-medium" }, "需支付", -1)),
                        createBaseVNode("span", _hoisted_64, "¥" + toDisplayString((getSelectedDurationPrice() + 99).toFixed(2)), 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_65, [
                    _cache[42] || (_cache[42] = createBaseVNode("h3", { class: "text-lg font-medium mb-3" }, "用车须知", -1)),
                    createBaseVNode("div", _hoisted_66, [
                      createBaseVNode("div", _hoisted_67, [
                        createVNode(_component_el_icon, { class: "mt-0.5 mr-2 text-green-500" }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        }),
                        _cache[38] || (_cache[38] = createBaseVNode("div", null, "骑行前请检查车辆状况，如有问题请联系客服", -1))
                      ]),
                      createBaseVNode("div", _hoisted_68, [
                        createVNode(_component_el_icon, { class: "mt-0.5 mr-2 text-green-500" }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        }),
                        _cache[39] || (_cache[39] = createBaseVNode("div", null, "请遵守交通规则，注意安全，不要逆行或闯红灯", -1))
                      ]),
                      createBaseVNode("div", _hoisted_69, [
                        createVNode(_component_el_icon, { class: "mt-0.5 mr-2 text-green-500" }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        }),
                        _cache[40] || (_cache[40] = createBaseVNode("div", null, "使用完毕请停放在指定区域，避免影响他人通行", -1))
                      ]),
                      createBaseVNode("div", _hoisted_70, [
                        createVNode(_component_el_icon, { class: "mt-0.5 mr-2 text-green-500" }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        }),
                        _cache[41] || (_cache[41] = createBaseVNode("div", null, "结束行程后系统将自动退还押金至您的账户", -1))
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_71, [
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "large",
                      class: "w-full font-bold",
                      loading: isSubmitting.value,
                      onClick: confirmRent
                    }, {
                      default: withCtx(() => _cache[43] || (_cache[43] = [
                        createTextVNode(" 确认支付并用车 ")
                      ])),
                      _: 1
                    }, 8, ["loading"])
                  ])
                ])) : activeStep.value === 3 ? (openBlock(), createElementBlock("div", _hoisted_72, [
                  createBaseVNode("div", _hoisted_73, [
                    createVNode(_component_el_icon, { class: "text-4xl text-green-500" }, {
                      default: withCtx(() => [
                        createVNode(unref(check_default))
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("h2", _hoisted_74, toDisplayString(isReservation.value ? "预约成功！" : "租车成功！"), 1),
                  createBaseVNode("p", _hoisted_75, toDisplayString(isReservation.value ? "您已成功预约车辆，请在预约时间内前往取车" : "您已成功租用车辆，祝您用车愉快"), 1),
                  createBaseVNode("div", _hoisted_76, [
                    createBaseVNode("div", _hoisted_77, [
                      _cache[44] || (_cache[44] = createBaseVNode("span", { class: "text-gray-500" }, "车辆编号", -1)),
                      createBaseVNode("span", _hoisted_78, toDisplayString((_a = selectedScooter.value) == null ? void 0 : _a.id), 1)
                    ]),
                    isReservation.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createBaseVNode("div", _hoisted_79, [
                        _cache[45] || (_cache[45] = createBaseVNode("span", { class: "text-gray-500" }, "预约ID", -1)),
                        createBaseVNode("span", _hoisted_80, toDisplayString(rentalInfo.value.reservationId), 1)
                      ]),
                      createBaseVNode("div", _hoisted_81, [
                        _cache[46] || (_cache[46] = createBaseVNode("span", { class: "text-gray-500" }, "预约时间", -1)),
                        createBaseVNode("span", _hoisted_82, toDisplayString(formatReservationTime(rentalInfo.value.startTime)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_83, [
                        _cache[47] || (_cache[47] = createBaseVNode("span", { class: "text-gray-500" }, "结束时间", -1)),
                        createBaseVNode("span", _hoisted_84, toDisplayString(formatReservationTime(rentalInfo.value.endTime)), 1)
                      ])
                    ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createBaseVNode("div", _hoisted_85, [
                        _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-gray-500" }, "开始时间", -1)),
                        createBaseVNode("span", _hoisted_86, toDisplayString(formatTime(rentalInfo.value.startTime)), 1)
                      ]),
                      createBaseVNode("div", _hoisted_87, [
                        _cache[49] || (_cache[49] = createBaseVNode("span", { class: "text-gray-500" }, "租赁时长", -1)),
                        createBaseVNode("span", _hoisted_88, toDisplayString(getSelectedDurationLabel()), 1)
                      ]),
                      createBaseVNode("div", _hoisted_89, [
                        _cache[50] || (_cache[50] = createBaseVNode("span", { class: "text-gray-500" }, "预计结束时间", -1)),
                        createBaseVNode("span", _hoisted_90, toDisplayString(formatDateTime(rentalInfo.value.endTime)), 1)
                      ])
                    ], 64)),
                    createBaseVNode("div", _hoisted_91, [
                      _cache[51] || (_cache[51] = createBaseVNode("span", { class: "text-gray-500" }, "计费说明", -1)),
                      createBaseVNode("span", _hoisted_92, "¥" + toDisplayString((_b = rentalInfo.value.rentalPrice) == null ? void 0 : _b.toFixed(2)), 1)
                    ])
                  ]),
                  isReservation.value ? (openBlock(), createElementBlock("div", _hoisted_93, [
                    createVNode(_component_el_button, {
                      type: "danger",
                      onClick: showCancelConfirm,
                      class: "font-bold"
                    }, {
                      default: withCtx(() => _cache[52] || (_cache[52] = [
                        createTextVNode("取消预约")
                      ])),
                      _: 1
                    })
                  ])) : createCommentVNode("", true),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: goToProfile,
                    class: "font-bold"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("查看" + toDisplayString(isReservation.value ? "预约" : "订单") + "详情", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    class: "ml-2 font-bold",
                    onClick: goToHome
                  }, {
                    default: withCtx(() => _cache[53] || (_cache[53] = [
                      createTextVNode("返回首页")
                    ])),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ]))
            ];
          }),
          _: 1
        })
      ]);
    };
  }
};
const Rent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40ab1769"]]);
export {
  Rent as default
};
//# sourceMappingURL=Rent-da561804.js.map
