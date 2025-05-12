var __defProp = Object.defineProperty;
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
import { ay as defineStore, a as useUserStore, u as useRouter, r as ref, Z as computed, I as onMounted, L as ElMessage, c as createElementBlock, b as createBaseVNode, e as unref, d as createVNode, w as withCtx, k as resolveComponent, o as openBlock, $ as warning_default, an as plus_default, j as createTextVNode, Q as connection_default, az as circle_check_default, ac as tools_default, t as toDisplayString, i as withModifiers, f as createCommentVNode, E as ElMessageBox } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { _ as _sfc_main$1 } from "./TableManager-3ea786d6.js";
const useDeviceStore = defineStore("device", {
  state: () => ({
    devices: [
      {
        id: "SCT001",
        name: "滑板车 #001",
        status: "online",
        location: "西湖区文教路",
        battery: 87,
        lastActive: "2025-05-05 08:30:24",
        totalUsage: 128,
        totalDistance: 356.2,
        avgRideTime: 23,
        deploymentDate: "2025-01-15",
        lastMaintenance: "2025-04-20",
        nextMaintenance: "2025-06-20"
      },
      {
        id: "SCT002",
        name: "滑板车 #002",
        status: "online",
        location: "西湖区文一路",
        battery: 65,
        lastActive: "2025-05-05 09:15:42",
        totalUsage: 95,
        totalDistance: 278.5,
        avgRideTime: 19,
        deploymentDate: "2025-01-20",
        lastMaintenance: "2025-04-15",
        nextMaintenance: "2025-06-15"
      },
      {
        id: "SCT003",
        name: "滑板车 #003",
        status: "maintenance",
        location: "余杭区良渚街道",
        battery: 12,
        lastActive: "2025-05-04 16:28:03",
        totalUsage: 157,
        totalDistance: 423.1,
        avgRideTime: 25,
        deploymentDate: "2025-01-10",
        lastMaintenance: "2025-05-05",
        nextMaintenance: "2025-07-05"
      },
      {
        id: "SCT004",
        name: "滑板车 #004",
        status: "offline",
        location: "上城区湖滨路",
        battery: 0,
        lastActive: "2025-05-03 10:45:17",
        totalUsage: 112,
        totalDistance: 315.8,
        avgRideTime: 21,
        deploymentDate: "2025-01-25",
        lastMaintenance: "2025-04-01",
        nextMaintenance: "2025-06-01"
      },
      {
        id: "SCT005",
        name: "滑板车 #005",
        status: "online",
        location: "滨江区江南大道",
        battery: 92,
        lastActive: "2025-05-05 09:30:51",
        totalUsage: 73,
        totalDistance: 198.4,
        avgRideTime: 17,
        deploymentDate: "2025-02-01",
        lastMaintenance: "2025-04-25",
        nextMaintenance: "2025-06-25"
      },
      {
        id: "SCT006",
        name: "滑板车 #006",
        status: "low_battery",
        location: "拱墅区莫干山路",
        battery: 15,
        lastActive: "2025-05-05 08:12:33",
        totalUsage: 89,
        totalDistance: 245.6,
        avgRideTime: 20,
        deploymentDate: "2025-02-05",
        lastMaintenance: "2025-04-10",
        nextMaintenance: "2025-06-10"
      }
    ],
    selectedDevice: null,
    loading: false,
    error: null
  }),
  getters: {
    getDeviceById: (state) => (id) => {
      return state.devices.find((device) => device.id === id) || null;
    },
    availableDevices: (state) => {
      return state.devices.filter((device) => device.status === "online");
    },
    maintenanceDevices: (state) => {
      return state.devices.filter((device) => device.status === "maintenance");
    },
    offlineDevices: (state) => {
      return state.devices.filter(
        (device) => device.status === "offline" || device.status === "low_battery"
      );
    },
    deviceStats: (state) => {
      return {
        total: state.devices.length,
        online: state.devices.filter((d) => d.status === "online").length,
        maintenance: state.devices.filter((d) => d.status === "maintenance").length,
        offline: state.devices.filter((d) => d.status === "offline").length,
        lowBattery: state.devices.filter((d) => d.status === "low_battery").length
      };
    }
  },
  actions: {
    fetchDevices() {
      return __async(this, null, function* () {
        this.loading = true;
        try {
          console.log("已加载设备数据:", this.devices.length, "条记录");
          this.loading = false;
        } catch (error) {
          console.error("获取设备数据失败:", error);
          this.error = "获取设备列表失败";
          this.loading = false;
        }
      });
    },
    selectDevice(deviceId) {
      this.selectedDevice = this.getDeviceById(deviceId);
    },
    updateDeviceStatus(deviceId, status) {
      const device = this.getDeviceById(deviceId);
      if (device) {
        device.status = status;
        console.log(`已更新设备 ${deviceId} 状态为 ${status}`);
      }
    }
  }
});
const ScooterBattery_vue_vue_type_style_index_0_scoped_8960fb8d_lang = "";
const Vehicles_vue_vue_type_style_index_0_scoped_e82fad75_lang = "";
const _hoisted_1 = { class: "admin-vehicles px-4 py-6" };
const _hoisted_2 = {
  key: 0,
  class: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
};
const _hoisted_3 = { class: "flex items-center" };
const _hoisted_4 = { class: "mt-3" };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = { class: "bg-white shadow rounded-lg p-4 mb-6" };
const _hoisted_7 = { class: "flex flex-wrap items-center justify-between gap-4" };
const _hoisted_8 = { class: "flex flex-wrap items-center gap-4" };
const _hoisted_9 = { class: "min-w-[200px]" };
const _hoisted_10 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" };
const _hoisted_11 = { class: "bg-white rounded-lg shadow p-4" };
const _hoisted_12 = { class: "flex justify-between" };
const _hoisted_13 = { class: "p-2 bg-blue-50 rounded-lg" };
const _hoisted_14 = { class: "bg-white rounded-lg shadow p-4" };
const _hoisted_15 = { class: "flex justify-between" };
const _hoisted_16 = { class: "p-2 bg-green-50 rounded-lg" };
const _hoisted_17 = { class: "bg-white rounded-lg shadow p-4" };
const _hoisted_18 = { class: "flex justify-between" };
const _hoisted_19 = { class: "p-2 bg-amber-50 rounded-lg" };
const _hoisted_20 = { class: "bg-white rounded-lg shadow p-4" };
const _hoisted_21 = { class: "flex justify-between" };
const _hoisted_22 = { class: "p-2 bg-red-50 rounded-lg" };
const _hoisted_23 = { class: "bg-white shadow rounded-lg overflow-hidden" };
const _hoisted_24 = { class: "flex items-center" };
const _hoisted_25 = { class: "ml-2" };
const _hoisted_26 = { class: "flex justify-end p-4 mb-4" };
const _hoisted_27 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_28 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_29 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_30 = {
  key: 0,
  class: "vehicle-details"
};
const _hoisted_31 = { class: "flex flex-col md:flex-row gap-6" };
const _hoisted_32 = { class: "flex-1" };
const _hoisted_33 = { class: "mb-4" };
const _hoisted_34 = { class: "font-medium" };
const _hoisted_35 = { class: "mb-4" };
const _hoisted_36 = { class: "font-medium" };
const _hoisted_37 = { class: "mb-4" };
const _hoisted_38 = { class: "mb-4" };
const _hoisted_39 = { class: "font-medium" };
const _hoisted_40 = { class: "mb-4" };
const _hoisted_41 = { class: "mb-4" };
const _hoisted_42 = { class: "font-medium" };
const _hoisted_43 = { class: "flex-1" };
const _hoisted_44 = { class: "mb-4" };
const _hoisted_45 = { class: "font-medium" };
const _hoisted_46 = { class: "mb-4" };
const _hoisted_47 = { class: "font-medium" };
const _hoisted_48 = { class: "mb-4" };
const _hoisted_49 = { class: "font-medium" };
const _hoisted_50 = { class: "mb-4" };
const _hoisted_51 = { class: "font-medium" };
const _hoisted_52 = { class: "mb-4" };
const _hoisted_53 = { class: "font-medium" };
const _hoisted_54 = { class: "mb-4" };
const _hoisted_55 = { class: "font-medium" };
const _hoisted_56 = { class: "flex justify-between" };
const _sfc_main = {
  __name: "Vehicles",
  setup(__props) {
    const userStore = useUserStore();
    const router = useRouter();
    const deviceStore = useDeviceStore();
    const search = ref("");
    const statusFilter = ref("");
    const sortOption = ref("id_asc");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const vehicleDialogVisible = ref(false);
    const selectedVehicle = ref(null);
    ref(false);
    const searchQuery = ref("");
    const deviceData = computed(() => deviceStore.devices);
    computed(() => {
      if (!searchQuery.value)
        return deviceData.value;
      const query = searchQuery.value.toLowerCase();
      return deviceData.value.filter(
        (device) => device.name.toLowerCase().includes(query) || device.id.toString().includes(query) || device.status.toLowerCase().includes(query)
      );
    });
    const activeTab = ref("scooterList");
    const scooterColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "code", label: "车辆编码", sortable: true, searchable: true },
      { prop: "model_id", label: "型号ID", sortable: true },
      { prop: "status", label: "状态", sortable: true },
      { prop: "battery_level", label: "电量(%)", sortable: true },
      { prop: "latitude", label: "纬度", sortable: true },
      { prop: "longitude", label: "经度", sortable: true },
      { prop: "last_maintenance", label: "上次维护", sortable: true, type: "datetime" },
      { prop: "created_at", label: "创建时间", sortable: true, type: "datetime" },
      { prop: "updated_at", label: "更新时间", sortable: true, type: "datetime" }
    ];
    const scooterFormFields = [
      {
        prop: "code",
        label: "车辆编码",
        type: "text",
        rules: [{ required: true, message: "请输入车辆编码", trigger: "blur" }]
      },
      {
        prop: "model_id",
        label: "型号ID",
        type: "number",
        rules: [{ required: true, message: "请输入型号ID", trigger: "blur" }]
      },
      {
        prop: "status",
        label: "状态",
        type: "select",
        options: [
          { value: "available", label: "可用" },
          { value: "in_use", label: "使用中" },
          { value: "maintenance", label: "维护中" },
          { value: "damaged", label: "损坏" },
          { value: "lost", label: "丢失" }
        ],
        rules: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      {
        prop: "battery_level",
        label: "电量(%)",
        type: "number",
        rules: [
          { required: true, message: "请输入电量", trigger: "blur" },
          { type: "number", min: 0, max: 100, message: "电量必须在0-100之间", trigger: "blur" }
        ]
      },
      {
        prop: "latitude",
        label: "纬度",
        type: "number"
      },
      {
        prop: "longitude",
        label: "经度",
        type: "number"
      },
      {
        prop: "last_maintenance",
        label: "上次维护",
        type: "datetime"
      }
    ];
    const scooterFilterOptions = [
      { label: "状态: 可用", value: "status:available" },
      { label: "状态: 使用中", value: "status:in_use" },
      { label: "状态: 维护中", value: "status:maintenance" },
      { label: "状态: 损坏", value: "status:damaged" },
      { label: "状态: 丢失", value: "status:lost" },
      { label: "电量: 低于20%", value: "battery_level:<20" },
      { label: "电量: 高于80%", value: "battery_level:>80" }
    ];
    const modelColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "name", label: "型号名称", sortable: true, searchable: true },
      { prop: "manufacturer", label: "制造商", sortable: true, searchable: true },
      { prop: "max_speed", label: "最高速度(km/h)", sortable: true },
      { prop: "battery_capacity", label: "电池容量(mAh)", sortable: true },
      { prop: "max_range", label: "最大续航(km)", sortable: true },
      { prop: "weight", label: "重量(kg)", sortable: true },
      { prop: "created_at", label: "创建时间", sortable: true, type: "datetime" }
    ];
    const modelFormFields = [
      {
        prop: "name",
        label: "型号名称",
        type: "text",
        rules: [{ required: true, message: "请输入型号名称", trigger: "blur" }]
      },
      {
        prop: "manufacturer",
        label: "制造商",
        type: "text",
        rules: [{ required: true, message: "请输入制造商", trigger: "blur" }]
      },
      {
        prop: "max_speed",
        label: "最高速度(km/h)",
        type: "number",
        rules: [{ required: true, message: "请输入最高速度", trigger: "blur" }]
      },
      {
        prop: "battery_capacity",
        label: "电池容量(mAh)",
        type: "number",
        rules: [{ required: true, message: "请输入电池容量", trigger: "blur" }]
      },
      {
        prop: "max_range",
        label: "最大续航(km)",
        type: "number",
        rules: [{ required: true, message: "请输入最大续航", trigger: "blur" }]
      },
      {
        prop: "weight",
        label: "重量(kg)",
        type: "number",
        rules: [{ required: true, message: "请输入重量", trigger: "blur" }]
      }
    ];
    const maintenanceColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "scooter_id", label: "车辆ID", sortable: true },
      { prop: "type", label: "维护类型", sortable: true },
      { prop: "description", label: "描述", searchable: true },
      { prop: "technician_id", label: "技术员ID", sortable: true },
      { prop: "status", label: "状态", sortable: true },
      { prop: "cost", label: "费用(元)", sortable: true },
      { prop: "start_date", label: "开始日期", sortable: true, type: "datetime" },
      { prop: "end_date", label: "结束日期", sortable: true, type: "datetime" },
      { prop: "created_at", label: "创建时间", sortable: true, type: "datetime" }
    ];
    const maintenanceFormFields = [
      {
        prop: "scooter_id",
        label: "车辆ID",
        type: "number",
        rules: [{ required: true, message: "请输入车辆ID", trigger: "blur" }]
      },
      {
        prop: "type",
        label: "维护类型",
        type: "select",
        options: [
          { value: "routine", label: "例行检查" },
          { value: "repair", label: "维修" },
          { value: "battery", label: "电池更换" },
          { value: "upgrade", label: "升级" },
          { value: "cleaning", label: "清洁" }
        ],
        rules: [{ required: true, message: "请选择维护类型", trigger: "change" }]
      },
      {
        prop: "description",
        label: "描述",
        type: "text",
        rules: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      {
        prop: "technician_id",
        label: "技术员ID",
        type: "number",
        rules: [{ required: true, message: "请输入技术员ID", trigger: "blur" }]
      },
      {
        prop: "status",
        label: "状态",
        type: "select",
        options: [
          { value: "pending", label: "待处理" },
          { value: "in_progress", label: "进行中" },
          { value: "completed", label: "已完成" },
          { value: "cancelled", label: "已取消" }
        ],
        rules: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      {
        prop: "cost",
        label: "费用(元)",
        type: "number"
      },
      {
        prop: "start_date",
        label: "开始日期",
        type: "datetime",
        rules: [{ required: true, message: "请选择开始日期", trigger: "change" }]
      },
      {
        prop: "end_date",
        label: "结束日期",
        type: "datetime"
      }
    ];
    const maintenanceFilterOptions = [
      { label: "类型: 例行检查", value: "type:routine" },
      { label: "类型: 维修", value: "type:repair" },
      { label: "类型: 电池更换", value: "type:battery" },
      { label: "类型: 升级", value: "type:upgrade" },
      { label: "类型: 清洁", value: "type:cleaning" },
      { label: "状态: 待处理", value: "status:pending" },
      { label: "状态: 进行中", value: "status:in_progress" },
      { label: "状态: 已完成", value: "status:completed" },
      { label: "状态: 已取消", value: "status:cancelled" }
    ];
    const totalVehicles = computed(() => vehicles.value.length);
    const filteredVehicles = computed(() => {
      let result = [...vehicles.value];
      if (search.value) {
        const searchLower = search.value.toLowerCase();
        result = result.filter(
          (v) => v.id.toLowerCase().includes(searchLower) || v.location.toLowerCase().includes(searchLower)
        );
      }
      if (statusFilter.value) {
        result = result.filter((v) => v.status === statusFilter.value);
      }
      if (sortOption.value) {
        const [field, order] = sortOption.value.split("_");
        result.sort((a, b) => {
          if (order === "asc") {
            return a[field] > b[field] ? 1 : -1;
          } else {
            return a[field] < b[field] ? 1 : -1;
          }
        });
      }
      return result;
    });
    const handleSearch = () => {
      currentPage.value = 1;
    };
    const handleFilter = () => {
      currentPage.value = 1;
    };
    const handleSort = () => {
      currentPage.value = 1;
    };
    const handleCurrentChange = (val) => {
      currentPage.value = val;
    };
    const getStatusType = (status) => {
      const statusMap = {
        "online": "success",
        "offline": "danger",
        "maintenance": "warning",
        "low_battery": "info"
      };
      return statusMap[status] || "default";
    };
    const getStatusText = (status) => {
      const statusMap = {
        "online": "在线",
        "offline": "离线",
        "maintenance": "维修中",
        "low_battery": "低电量"
      };
      return statusMap[status] || "未知";
    };
    const getBatteryColor = (battery) => {
      if (battery > 70)
        return "#67c23a";
      if (battery > 30)
        return "#e6a23c";
      return "#f56c6c";
    };
    const handleRowClick = (row) => {
      viewVehicleDetails(row);
    };
    const viewVehicleDetails = (vehicle) => {
      selectedVehicle.value = __spreadValues({}, vehicle);
      vehicleDialogVisible.value = true;
    };
    const editVehicle = (vehicle) => {
      ElMessage({
        type: "info",
        message: `编辑车辆 ${vehicle.id} 的信息`,
        duration: 2e3
      });
    };
    const maintainVehicle = (vehicle) => {
      ElMessageBox.confirm(
        `确定将车辆 ${vehicle.id} 转入维护状态吗？`,
        "维护确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        ElMessage({
          type: "success",
          message: `车辆 ${vehicle.id} 已转入维护状态`,
          duration: 2e3
        });
      }).catch(() => {
      });
    };
    const disableVehicle = (vehicle) => {
      ElMessageBox.confirm(
        `确定禁用车辆 ${vehicle.id} 吗？禁用后，用户将无法租用该车辆。`,
        "禁用确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "danger"
        }
      ).then(() => {
        ElMessage({
          type: "success",
          message: `车辆 ${vehicle.id} 已禁用`,
          duration: 2e3
        });
        vehicleDialogVisible.value = false;
      }).catch(() => {
      });
    };
    const addNewVehicle = () => {
      ElMessage({
        type: "info",
        message: "添加新车辆",
        duration: 2e3
      });
    };
    onMounted(() => {
      // if (!userStore.isAdmin) {
      //   ElMessage({
      //     type: "warning",
      //     message: "您不是管理员，无法管理车辆",
      //     duration: 3e3
      //   });
      // }
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_progress = resolveComponent("el-progress");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[34] || (_cache[34] = createBaseVNode("div", { class: "mb-6" }, [
          createBaseVNode("h1", { class: "text-2xl font-bold text-gray-800" }, "车辆管理"),
          createBaseVNode("p", { class: "text-gray-600" }, "管理和监控系统中的所有电动滑板车")
        ], -1)),
        !unref(userStore).isAdmin ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_el_icon, { class: "mr-2" }, {
              default: withCtx(() => [
                createVNode(unref(warning_default))
              ]),
              _: 1
            }),
            _cache[9] || (_cache[9] = createBaseVNode("div", null, [
              createBaseVNode("div", { class: "font-medium" }, "权限不足"),
              createBaseVNode("p", { class: "text-sm" }, "您当前不是管理员，无法管理车辆。")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/")),
              class: "bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md text-sm"
            }, " 返回首页 ")
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
          createVNode(_component_el_tabs, {
            modelValue: activeTab.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => activeTab.value = $event),
            class: "mb-6"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_tab_pane, {
                label: "车辆列表",
                name: "scooterList"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("div", _hoisted_9, [
                          createVNode(_component_el_input, {
                            modelValue: search.value,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value = $event),
                            placeholder: "搜索车辆ID或位置",
                            "prefix-icon": "Search",
                            clearable: "",
                            onClear: handleSearch,
                            onInput: handleSearch
                          }, null, 8, ["modelValue"])
                        ]),
                        createVNode(_component_el_select, {
                          modelValue: statusFilter.value,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => statusFilter.value = $event),
                          placeholder: "车辆状态",
                          onChange: handleFilter
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "全部",
                              value: ""
                            }),
                            createVNode(_component_el_option, {
                              label: "在线",
                              value: "online"
                            }),
                            createVNode(_component_el_option, {
                              label: "离线",
                              value: "offline"
                            }),
                            createVNode(_component_el_option, {
                              label: "维修中",
                              value: "maintenance"
                            }),
                            createVNode(_component_el_option, {
                              label: "低电量",
                              value: "low_battery"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"]),
                        createVNode(_component_el_select, {
                          modelValue: sortOption.value,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => sortOption.value = $event),
                          placeholder: "排序方式",
                          onChange: handleSort
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_option, {
                              label: "ID - 升序",
                              value: "id_asc"
                            }),
                            createVNode(_component_el_option, {
                              label: "ID - 降序",
                              value: "id_desc"
                            }),
                            createVNode(_component_el_option, {
                              label: "电量 - 升序",
                              value: "battery_asc"
                            }),
                            createVNode(_component_el_option, {
                              label: "电量 - 降序",
                              value: "battery_desc"
                            }),
                            createVNode(_component_el_option, {
                              label: "使用次数 - 升序",
                              value: "usage_asc"
                            }),
                            createVNode(_component_el_option, {
                              label: "使用次数 - 降序",
                              value: "usage_desc"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(_component_el_button, {
                          type: "primary",
                          onClick: addNewVehicle
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon, { class: "mr-1" }, {
                              default: withCtx(() => [
                                createVNode(unref(plus_default))
                              ]),
                              _: 1
                            }),
                            _cache[10] || (_cache[10] = createTextVNode("添加车辆 "))
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("div", _hoisted_11, [
                      createBaseVNode("div", _hoisted_12, [
                        _cache[11] || (_cache[11] = createBaseVNode("div", null, [
                          createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "总车辆数"),
                          createBaseVNode("div", { class: "text-2xl font-bold text-gray-800" }, "68")
                        ], -1)),
                        createBaseVNode("div", _hoisted_13, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-blue-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(connection_default))
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", _hoisted_15, [
                        _cache[12] || (_cache[12] = createBaseVNode("div", null, [
                          createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "在线车辆"),
                          createBaseVNode("div", { class: "text-2xl font-bold text-green-600" }, "56"),
                          createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "82.3% 可用率")
                        ], -1)),
                        createBaseVNode("div", _hoisted_16, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-green-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(circle_check_default))
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        _cache[13] || (_cache[13] = createBaseVNode("div", null, [
                          createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "维修中"),
                          createBaseVNode("div", { class: "text-2xl font-bold text-amber-600" }, "8"),
                          createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "11.8% 维修率")
                        ], -1)),
                        createBaseVNode("div", _hoisted_19, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-amber-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(tools_default))
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("div", _hoisted_21, [
                        _cache[14] || (_cache[14] = createBaseVNode("div", null, [
                          createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "离线车辆"),
                          createBaseVNode("div", { class: "text-2xl font-bold text-red-600" }, "4"),
                          createBaseVNode("div", { class: "text-xs text-gray-500 mt-1" }, "5.9% 离线率")
                        ], -1)),
                        createBaseVNode("div", _hoisted_22, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-red-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(warning_default))
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_23, [
                    createVNode(_component_el_table, {
                      data: filteredVehicles.value,
                      style: { "width": "100%" },
                      border: "",
                      stripe: "",
                      onRowClick: handleRowClick,
                      "empty-text": "没有找到符合条件的车辆"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_table_column, {
                          prop: "id",
                          label: "ID",
                          width: "120"
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "name",
                          label: "车辆名称",
                          width: "180"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "状态",
                          width: "120"
                        }, {
                          default: withCtx((scope) => [
                            createVNode(_component_el_tag, {
                              type: getStatusType(scope.row.status),
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getStatusText(scope.row.status)), 1)
                              ]),
                              _: 2
                            }, 1032, ["type"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "location",
                          label: "当前位置"
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "battery",
                          label: "电量",
                          width: "180"
                        }, {
                          default: withCtx((scope) => [
                            createBaseVNode("div", _hoisted_24, [
                              createVNode(_component_el_progress, {
                                percentage: scope.row.battery,
                                color: getBatteryColor(scope.row.battery),
                                "text-inside": true,
                                "stroke-width": 14,
                                "show-text": false,
                                style: { "width": "100px" }
                              }, null, 8, ["percentage", "color"]),
                              createBaseVNode("span", _hoisted_25, toDisplayString(scope.row.battery) + "%", 1)
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_table_column, {
                          prop: "lastActive",
                          label: "最后活动",
                          width: "180"
                        }),
                        createVNode(_component_el_table_column, {
                          label: "操作",
                          width: "200",
                          fixed: "right"
                        }, {
                          default: withCtx((scope) => [
                            createVNode(_component_el_button, {
                              size: "small",
                              type: "primary",
                              plain: "",
                              onClick: withModifiers(($event) => viewVehicleDetails(scope.row), ["stop"])
                            }, {
                              default: withCtx(() => _cache[15] || (_cache[15] = [
                                createTextVNode(" 详情 ")
                              ])),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(_component_el_button, {
                              size: "small",
                              type: "warning",
                              plain: "",
                              onClick: withModifiers(($event) => maintainVehicle(scope.row), ["stop"])
                            }, {
                              default: withCtx(() => _cache[16] || (_cache[16] = [
                                createTextVNode(" 维护 ")
                              ])),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(_component_el_button, {
                              size: "small",
                              type: "danger",
                              plain: "",
                              onClick: withModifiers(($event) => disableVehicle(scope.row), ["stop"])
                            }, {
                              default: withCtx(() => _cache[17] || (_cache[17] = [
                                createTextVNode(" 禁用 ")
                              ])),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data"]),
                    createBaseVNode("div", _hoisted_26, [
                      createVNode(_component_el_pagination, {
                        layout: "prev, pager, next",
                        total: totalVehicles.value,
                        "page-size": pageSize.value,
                        "current-page": currentPage.value,
                        onCurrentChange: handleCurrentChange
                      }, null, 8, ["total", "page-size", "current-page"])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_tab_pane, {
                label: "车辆数据管理",
                name: "scooterData"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_27, [
                    createVNode(_sfc_main$1, {
                      tableName: "scooters",
                      title: "滑板车数据表",
                      columns: scooterColumns,
                      formFields: scooterFormFields,
                      filterOptions: scooterFilterOptions
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_tab_pane, {
                label: "车辆类型管理",
                name: "scooterTypes"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_28, [
                    createVNode(_sfc_main$1, {
                      tableName: "scooter_models",
                      title: "滑板车型号表",
                      columns: modelColumns,
                      formFields: modelFormFields
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_tab_pane, {
                label: "维护记录管理",
                name: "maintenanceRecords"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_29, [
                    createVNode(_sfc_main$1, {
                      tableName: "maintenance_records",
                      title: "维护记录表",
                      columns: maintenanceColumns,
                      formFields: maintenanceFormFields,
                      filterOptions: maintenanceFilterOptions
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(_component_el_dialog, {
            modelValue: vehicleDialogVisible.value,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vehicleDialogVisible.value = $event),
            title: "车辆详情",
            width: "700px"
          }, {
            footer: withCtx(() => [
              createBaseVNode("div", _hoisted_56, [
                createBaseVNode("div", null, [
                  createVNode(_component_el_button, {
                    type: "danger",
                    plain: "",
                    onClick: _cache[5] || (_cache[5] = ($event) => disableVehicle(selectedVehicle.value))
                  }, {
                    default: withCtx(() => _cache[31] || (_cache[31] = [
                      createTextVNode(" 禁用车辆 ")
                    ])),
                    _: 1
                  })
                ]),
                createBaseVNode("div", null, [
                  createVNode(_component_el_button, {
                    onClick: _cache[6] || (_cache[6] = ($event) => vehicleDialogVisible.value = false)
                  }, {
                    default: withCtx(() => _cache[32] || (_cache[32] = [
                      createTextVNode(" 关闭 ")
                    ])),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[7] || (_cache[7] = ($event) => editVehicle(selectedVehicle.value))
                  }, {
                    default: withCtx(() => _cache[33] || (_cache[33] = [
                      createTextVNode(" 编辑信息 ")
                    ])),
                    _: 1
                  })
                ])
              ])
            ]),
            default: withCtx(() => [
              selectedVehicle.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("div", _hoisted_33, [
                      _cache[18] || (_cache[18] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "车辆ID", -1)),
                      createBaseVNode("div", _hoisted_34, toDisplayString(selectedVehicle.value.id), 1)
                    ]),
                    createBaseVNode("div", _hoisted_35, [
                      _cache[19] || (_cache[19] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "车辆名称", -1)),
                      createBaseVNode("div", _hoisted_36, toDisplayString(selectedVehicle.value.name), 1)
                    ]),
                    createBaseVNode("div", _hoisted_37, [
                      _cache[20] || (_cache[20] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "状态", -1)),
                      createVNode(_component_el_tag, {
                        type: getStatusType(selectedVehicle.value.status)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getStatusText(selectedVehicle.value.status)), 1)
                        ]),
                        _: 1
                      }, 8, ["type"])
                    ]),
                    createBaseVNode("div", _hoisted_38, [
                      _cache[21] || (_cache[21] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "当前位置", -1)),
                      createBaseVNode("div", _hoisted_39, toDisplayString(selectedVehicle.value.location), 1)
                    ]),
                    createBaseVNode("div", _hoisted_40, [
                      _cache[22] || (_cache[22] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "电量", -1)),
                      createVNode(_component_el_progress, {
                        percentage: selectedVehicle.value.battery,
                        color: getBatteryColor(selectedVehicle.value.battery)
                      }, null, 8, ["percentage", "color"])
                    ]),
                    createBaseVNode("div", _hoisted_41, [
                      _cache[23] || (_cache[23] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "最后活动时间", -1)),
                      createBaseVNode("div", _hoisted_42, toDisplayString(selectedVehicle.value.lastActive), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    createBaseVNode("div", _hoisted_44, [
                      _cache[24] || (_cache[24] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "总使用次数", -1)),
                      createBaseVNode("div", _hoisted_45, toDisplayString(selectedVehicle.value.totalUsage) + " 次", 1)
                    ]),
                    createBaseVNode("div", _hoisted_46, [
                      _cache[25] || (_cache[25] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "总骑行距离", -1)),
                      createBaseVNode("div", _hoisted_47, toDisplayString(selectedVehicle.value.totalDistance) + " 公里", 1)
                    ]),
                    createBaseVNode("div", _hoisted_48, [
                      _cache[26] || (_cache[26] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "平均骑行时长", -1)),
                      createBaseVNode("div", _hoisted_49, toDisplayString(selectedVehicle.value.avgRideTime) + " 分钟", 1)
                    ]),
                    createBaseVNode("div", _hoisted_50, [
                      _cache[27] || (_cache[27] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "投放日期", -1)),
                      createBaseVNode("div", _hoisted_51, toDisplayString(selectedVehicle.value.deploymentDate), 1)
                    ]),
                    createBaseVNode("div", _hoisted_52, [
                      _cache[28] || (_cache[28] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "上次维护", -1)),
                      createBaseVNode("div", _hoisted_53, toDisplayString(selectedVehicle.value.lastMaintenance), 1)
                    ]),
                    createBaseVNode("div", _hoisted_54, [
                      _cache[29] || (_cache[29] = createBaseVNode("div", { class: "text-sm text-gray-500 mb-1" }, "下次维护", -1)),
                      createBaseVNode("div", _hoisted_55, toDisplayString(selectedVehicle.value.nextMaintenance), 1)
                    ])
                  ])
                ]),
                _cache[30] || (_cache[30] = createBaseVNode("div", { class: "mt-4" }, [
                  createBaseVNode("div", { class: "text-sm text-gray-500 mb-2" }, "车辆位置"),
                  createBaseVNode("div", { class: "bg-gray-100 h-[200px] rounded flex items-center justify-center" }, [
                    createBaseVNode("span", { class: "text-gray-400" }, "地图加载中...")
                  ])
                ], -1))
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]))
      ]);
    };
  }
};
const Vehicles = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e82fad75"]]);
export {
  Vehicles as default
};
//# sourceMappingURL=Vehicles-79957d58.js.map
