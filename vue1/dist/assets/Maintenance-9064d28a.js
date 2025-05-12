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
import { r as ref, Z as computed, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, k as resolveComponent, o as openBlock, e as unref, an as plus_default, j as createTextVNode, aA as search_default, t as toDisplayString, F as Fragment, J as renderList, g as createBlock, E as ElMessageBox, L as ElMessage } from "./index-af7cb7d5.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
const Maintenance_vue_vue_type_style_index_0_scoped_dbbb7375_lang = "";
const _hoisted_1 = { class: "maintenance-page" };
const _hoisted_2 = { class: "flex justify-between items-center mb-6" };
const _hoisted_3 = { class: "bg-white p-4 rounded-lg shadow mb-6" };
const _hoisted_4 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_5 = { class: "flex justify-end mt-4" };
const _hoisted_6 = { class: "dialog-footer" };
const _sfc_main = {
  __name: "Maintenance",
  setup(__props) {
    const searchQuery = ref("");
    const statusFilter = ref("");
    const dateRange = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const showAddDialog = ref(false);
    const editingRecord = ref(null);
    const formRef = ref(null);
    const recordForm = ref({
      id: "",
      vehicleId: "",
      type: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "planned",
      technician: "",
      cost: 0
    });
    const rules = {
      vehicleId: [
        { required: true, message: "请选择车辆", trigger: "change" }
      ],
      type: [
        { required: true, message: "请选择维护类型", trigger: "change" }
      ],
      description: [
        { required: true, message: "请输入描述", trigger: "blur" }
      ],
      startDate: [
        { required: true, message: "请选择开始日期", trigger: "change" }
      ],
      endDate: [
        { required: true, message: "请选择预计完成日期", trigger: "change" }
      ],
      status: [
        { required: true, message: "请选择状态", trigger: "change" }
      ],
      technician: [
        { required: true, message: "请选择维护人员", trigger: "change" }
      ]
    };
    const maintenanceRecords = ref([
      {
        id: "M001",
        vehicleId: "A0001",
        type: "日常检查",
        description: "例行检查刹车系统和电池状态",
        startDate: "2024-03-15 09:00",
        endDate: "2024-03-15 11:00",
        status: "completed",
        technician: "张工",
        cost: 50
      },
      {
        id: "M002",
        vehicleId: "B0002",
        type: "电池更换",
        description: "更换老化电池",
        startDate: "2024-03-18 14:00",
        endDate: "2024-03-18 16:00",
        status: "completed",
        technician: "李工",
        cost: 300
      },
      {
        id: "M003",
        vehicleId: "C0003",
        type: "轮胎维修",
        description: "修复前轮漏气问题",
        startDate: "2024-03-20 10:00",
        endDate: "2024-03-20 12:00",
        status: "in_progress",
        technician: "王工",
        cost: 80
      },
      {
        id: "M004",
        vehicleId: "A0005",
        type: "全面检修",
        description: "全车系统检修和清洁",
        startDate: "2024-03-25 09:00",
        endDate: "2024-03-25 17:00",
        status: "planned",
        technician: "赵工",
        cost: 200
      }
    ]);
    const vehicles = ref([
      { id: "A0001", name: "电动滑板车 #A0001" },
      { id: "B0002", name: "电动滑板车 #B0002" },
      { id: "C0003", name: "电动滑板车 #C0003" },
      { id: "A0004", name: "电动滑板车 #A0004" },
      { id: "A0005", name: "电动滑板车 #A0005" },
      { id: "B0006", name: "电动滑板车 #B0006" }
    ]);
    const totalRecords = computed(() => maintenanceRecords.value.length);
    const filteredRecords = computed(() => {
      return maintenanceRecords.value.filter((record) => {
        const matchSearch = !searchQuery.value || record.vehicleId.toLowerCase().includes(searchQuery.value.toLowerCase()) || record.type.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchStatus = !statusFilter.value || record.status === statusFilter.value;
        let matchDate = true;
        if (dateRange.value && dateRange.value.length === 2) {
          const startDate = new Date(dateRange.value[0]);
          const endDate = new Date(dateRange.value[1]);
          const recordDate = new Date(record.startDate);
          matchDate = recordDate >= startDate && recordDate <= endDate;
        }
        return matchSearch && matchStatus && matchDate;
      });
    });
    function getStatusType(status) {
      const types = {
        "planned": "info",
        "in_progress": "warning",
        "completed": "success",
        "cancelled": "danger"
      };
      return types[status] || "info";
    }
    function getStatusText(status) {
      const texts = {
        "planned": "计划中",
        "in_progress": "进行中",
        "completed": "已完成",
        "cancelled": "已取消"
      };
      return texts[status] || status;
    }
    function handleEdit(row) {
      editingRecord.value = row;
      recordForm.value = __spreadValues({}, row);
      showAddDialog.value = true;
    }
    function handleComplete(row) {
      ElMessageBox.confirm(
        `确定将维护记录 ${row.id} 标记为已完成吗？`,
        "确认完成",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        }
      ).then(() => {
        row.status = "completed";
        row.endDate = (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).replace(/\//g, "-");
        ElMessage.success("维护记录已标记为完成");
      });
    }
    function handleCancel(row) {
      ElMessageBox.confirm(
        `确定要取消维护记录 ${row.id} 吗？`,
        "确认取消",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        row.status = "cancelled";
        ElMessage.success("维护记录已取消");
      });
    }
    function handleSubmit() {
      return __async(this, null, function* () {
        if (!formRef.value)
          return;
        yield formRef.value.validate((valid) => {
          if (valid) {
            if (editingRecord.value) {
              const index = maintenanceRecords.value.findIndex((r) => r.id === editingRecord.value.id);
              if (index > -1) {
                maintenanceRecords.value[index] = __spreadValues({}, recordForm.value);
              }
            } else {
              const newId = "M" + String(maintenanceRecords.value.length + 1).padStart(3, "0");
              maintenanceRecords.value.push(__spreadProps(__spreadValues({}, recordForm.value), {
                id: newId
              }));
            }
            showAddDialog.value = false;
            editingRecord.value = null;
            resetForm();
            ElMessage.success(editingRecord.value ? "更新成功" : "添加成功");
          }
        });
      });
    }
    function resetForm() {
      recordForm.value = {
        id: "",
        vehicleId: "",
        type: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "planned",
        technician: "",
        cost: 0
      };
    }
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_button_group = resolveComponent("el-button-group");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_card = resolveComponent("el-card");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[17] || (_cache[17] = createBaseVNode("h1", { class: "text-2xl font-bold" }, "维护记录管理", -1)),
          createVNode(_component_el_button, {
            type: "primary",
            onClick: _cache[0] || (_cache[0] = ($event) => showAddDialog.value = true)
          }, {
            default: withCtx(() => [
              createVNode(_component_el_icon, { class: "mr-1" }, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              _cache[16] || (_cache[16] = createTextVNode(" 添加维护记录 "))
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_el_input, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchQuery.value = $event),
              placeholder: "搜索车辆编号或维护类型",
              class: "w-full"
            }, {
              prefix: withCtx(() => [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(search_default))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_select, {
              modelValue: statusFilter.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => statusFilter.value = $event),
              placeholder: "状态筛选",
              class: "w-full"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_option, {
                  label: "全部",
                  value: ""
                }),
                createVNode(_component_el_option, {
                  label: "计划中",
                  value: "planned"
                }),
                createVNode(_component_el_option, {
                  label: "进行中",
                  value: "in_progress"
                }),
                createVNode(_component_el_option, {
                  label: "已完成",
                  value: "completed"
                }),
                createVNode(_component_el_option, {
                  label: "已取消",
                  value: "cancelled"
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(_component_el_date_picker, {
              modelValue: dateRange.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dateRange.value = $event),
              type: "daterange",
              "range-separator": "至",
              "start-placeholder": "开始日期",
              "end-placeholder": "结束日期",
              class: "w-full"
            }, null, 8, ["modelValue"])
          ])
        ]),
        createVNode(_component_el_card, { shadow: "hover" }, {
          default: withCtx(() => [
            createVNode(_component_el_table, {
              data: filteredRecords.value,
              style: { "width": "100%" }
            }, {
              default: withCtx(() => [
                createVNode(_component_el_table_column, {
                  prop: "id",
                  label: "记录ID",
                  width: "100"
                }),
                createVNode(_component_el_table_column, {
                  prop: "vehicleId",
                  label: "车辆编号",
                  width: "120"
                }, {
                  default: withCtx(({ row }) => [
                    _cache[18] || (_cache[18] = createBaseVNode("span", { class: "mr-1" }, "🛴", -1)),
                    createTextVNode(" " + toDisplayString(row.vehicleId), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  prop: "type",
                  label: "维护类型",
                  width: "140"
                }),
                createVNode(_component_el_table_column, {
                  prop: "description",
                  label: "描述",
                  "min-width": "180",
                  "show-overflow-tooltip": true
                }),
                createVNode(_component_el_table_column, {
                  prop: "startDate",
                  label: "开始日期",
                  width: "180"
                }),
                createVNode(_component_el_table_column, {
                  prop: "endDate",
                  label: "完成日期",
                  width: "180"
                }),
                createVNode(_component_el_table_column, {
                  prop: "status",
                  label: "状态",
                  width: "120"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_tag, {
                      type: getStatusType(row.status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  prop: "technician",
                  label: "维护人员",
                  width: "120"
                }),
                createVNode(_component_el_table_column, {
                  label: "操作",
                  width: "180",
                  fixed: "right"
                }, {
                  default: withCtx(({ row }) => [
                    createVNode(_component_el_button_group, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          size: "small",
                          onClick: ($event) => handleEdit(row)
                        }, {
                          default: withCtx(() => _cache[19] || (_cache[19] = [
                            createTextVNode(" 编辑 ")
                          ])),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_el_button, {
                          size: "small",
                          type: "success",
                          onClick: ($event) => handleComplete(row),
                          disabled: row.status === "completed" || row.status === "cancelled"
                        }, {
                          default: withCtx(() => _cache[20] || (_cache[20] = [
                            createTextVNode(" 完成 ")
                          ])),
                          _: 2
                        }, 1032, ["onClick", "disabled"]),
                        createVNode(_component_el_button, {
                          size: "small",
                          type: "danger",
                          onClick: ($event) => handleCancel(row),
                          disabled: row.status === "completed" || row.status === "cancelled"
                        }, {
                          default: withCtx(() => _cache[21] || (_cache[21] = [
                            createTextVNode(" 取消 ")
                          ])),
                          _: 2
                        }, 1032, ["onClick", "disabled"])
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"]),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_el_pagination, {
                "current-page": currentPage.value,
                "onUpdate:currentPage": _cache[4] || (_cache[4] = ($event) => currentPage.value = $event),
                "page-size": pageSize.value,
                "onUpdate:pageSize": _cache[5] || (_cache[5] = ($event) => pageSize.value = $event),
                "page-sizes": [10, 20, 50, 100],
                total: totalRecords.value,
                layout: "total, sizes, prev, pager, next"
              }, null, 8, ["current-page", "page-size", "total"])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_el_dialog, {
          modelValue: showAddDialog.value,
          "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => showAddDialog.value = $event),
          title: editingRecord.value ? "编辑维护记录" : "添加维护记录",
          width: "600px"
        }, {
          footer: withCtx(() => [
            createBaseVNode("span", _hoisted_6, [
              createVNode(_component_el_button, {
                onClick: _cache[14] || (_cache[14] = ($event) => showAddDialog.value = false)
              }, {
                default: withCtx(() => _cache[22] || (_cache[22] = [
                  createTextVNode("取消")
                ])),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: handleSubmit
              }, {
                default: withCtx(() => _cache[23] || (_cache[23] = [
                  createTextVNode(" 确定 ")
                ])),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            createVNode(_component_el_form, {
              ref_key: "formRef",
              ref: formRef,
              model: recordForm.value,
              rules,
              "label-width": "100px"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_form_item, {
                  label: "车辆编号",
                  prop: "vehicleId"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_select, {
                      modelValue: recordForm.value.vehicleId,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => recordForm.value.vehicleId = $event),
                      placeholder: "请选择车辆",
                      filterable: ""
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(vehicles.value, (vehicle) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: vehicle.id,
                            label: vehicle.id,
                            value: vehicle.id
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "维护类型",
                  prop: "type"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_select, {
                      modelValue: recordForm.value.type,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => recordForm.value.type = $event),
                      placeholder: "请选择维护类型"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_option, {
                          label: "日常检查",
                          value: "regular_check"
                        }),
                        createVNode(_component_el_option, {
                          label: "电池更换",
                          value: "battery_replacement"
                        }),
                        createVNode(_component_el_option, {
                          label: "轮胎维修",
                          value: "tire_repair"
                        }),
                        createVNode(_component_el_option, {
                          label: "制动系统",
                          value: "brake_system"
                        }),
                        createVNode(_component_el_option, {
                          label: "控制器维修",
                          value: "controller_repair"
                        }),
                        createVNode(_component_el_option, {
                          label: "全面检修",
                          value: "full_maintenance"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "描述",
                  prop: "description"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: recordForm.value.description,
                      "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => recordForm.value.description = $event),
                      type: "textarea",
                      rows: "3",
                      placeholder: "请输入维护详情描述"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "开始日期",
                  prop: "startDate"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_date_picker, {
                      modelValue: recordForm.value.startDate,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => recordForm.value.startDate = $event),
                      type: "datetime",
                      placeholder: "选择开始日期时间",
                      format: "YYYY-MM-DD HH:mm",
                      "value-format": "YYYY-MM-DD HH:mm"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "预计完成",
                  prop: "endDate"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_date_picker, {
                      modelValue: recordForm.value.endDate,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => recordForm.value.endDate = $event),
                      type: "datetime",
                      placeholder: "选择预计完成日期时间",
                      format: "YYYY-MM-DD HH:mm",
                      "value-format": "YYYY-MM-DD HH:mm"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "状态",
                  prop: "status"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_select, {
                      modelValue: recordForm.value.status,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => recordForm.value.status = $event),
                      placeholder: "请选择状态"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_option, {
                          label: "计划中",
                          value: "planned"
                        }),
                        createVNode(_component_el_option, {
                          label: "进行中",
                          value: "in_progress"
                        }),
                        createVNode(_component_el_option, {
                          label: "已完成",
                          value: "completed"
                        }),
                        createVNode(_component_el_option, {
                          label: "已取消",
                          value: "cancelled"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "维护人员",
                  prop: "technician"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_select, {
                      modelValue: recordForm.value.technician,
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => recordForm.value.technician = $event),
                      placeholder: "请选择维护人员"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_option, {
                          label: "张工",
                          value: "张工"
                        }),
                        createVNode(_component_el_option, {
                          label: "李工",
                          value: "李工"
                        }),
                        createVNode(_component_el_option, {
                          label: "王工",
                          value: "王工"
                        }),
                        createVNode(_component_el_option, {
                          label: "赵工",
                          value: "赵工"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, {
                  label: "维护费用",
                  prop: "cost"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input_number, {
                      modelValue: recordForm.value.cost,
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => recordForm.value.cost = $event),
                      min: 0,
                      precision: 2,
                      step: 10,
                      class: "w-full"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
const Maintenance = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dbbb7375"]]);
export {
  Maintenance as default
};
//# sourceMappingURL=Maintenance-9064d28a.js.map
