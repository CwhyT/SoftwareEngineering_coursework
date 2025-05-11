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
import { r as ref, I as onMounted, aD as watch, a4 as axios, L as ElMessage, k as resolveComponent, aE as resolveDirective, o as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, d as createVNode, w as withCtx, e as unref, aB as refresh_default, j as createTextVNode, an as plus_default, aA as search_default, g as createBlock, F as Fragment, J as renderList, f as createCommentVNode, h as withDirectives, a9 as edit_default, af as delete_default } from "./index-af7cb7d5.js";
const _hoisted_1 = { class: "table-manager" };
const _hoisted_2 = { class: "flex justify-between items-center mb-4" };
const _hoisted_3 = { class: "text-lg font-semibold" };
const _hoisted_4 = { class: "flex gap-2" };
const _hoisted_5 = { class: "flex flex-wrap gap-3 mb-4" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { key: 2 };
const _hoisted_9 = { key: 3 };
const _hoisted_10 = { class: "flex justify-end mt-4" };
const _hoisted_11 = { class: "dialog-footer" };
const _hoisted_12 = { class: "dialog-footer" };
const _sfc_main = {
  __name: "TableManager",
  props: {
    // 表名
    tableName: {
      type: String,
      required: true
    },
    // 表显示标题
    title: {
      type: String,
      required: true
    },
    // 表列定义
    columns: {
      type: Array,
      required: true
    },
    // 表单字段定义
    formFields: {
      type: Array,
      required: true
    },
    // 过滤选项
    filterOptions: {
      type: Array,
      default: () => []
    },
    // 自定义API前缀，默认使用通用的数据库API
    apiPrefix: {
      type: String,
      default: "/api/admin/db"
    }
  },
  emits: ["updated", "added", "deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tableData = ref([]);
    const loading = ref(false);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(20);
    const searchQuery = ref("");
    const filterValue = ref("");
    const sortField = ref("");
    const sortDirection = ref("");
    const dialogVisible = ref(false);
    const deleteDialogVisible = ref(false);
    const isEdit = ref(false);
    const form = ref({});
    const formRef = ref(null);
    const recordToDelete = ref(null);
    onMounted(() => {
      loadData();
    });
    watch([currentPage, pageSize, searchQuery, filterValue], () => {
      loadData();
    });
    const loadData = () => __async(this, null, function* () {
      loading.value = true;
      try {
        let filter = {};
        if (searchQuery.value) {
          const searchableColumns = props.columns.filter((col) => col.searchable).map((col) => col.prop);
          if (searchableColumns.length > 0) {
            searchableColumns.forEach((col) => {
              filter[col] = searchQuery.value;
            });
          }
        }
        if (filterValue.value) {
          const [key, value] = filterValue.value.split(":");
          filter[key] = value;
        }
        let order = {};
        if (sortField.value) {
          order = {
            field: sortField.value,
            direction: sortDirection.value
          };
        }
        const url = `${props.apiPrefix}/table/${props.tableName}/data`;
        const response = yield axios.get(url, {
          params: {
            page: currentPage.value,
            limit: pageSize.value,
            filter: Object.keys(filter).length > 0 ? JSON.stringify(filter) : void 0,
            order: Object.keys(order).length > 0 ? JSON.stringify(order) : void 0
          }
        });
        if (response.data.success) {
          tableData.value = response.data.data.rows;
          total.value = response.data.data.pagination.total;
        } else {
          ElMessage.error("加载数据失败");
        }
      } catch (error) {
        console.error("加载数据失败:", error);
        ElMessage.error("加载数据失败: " + error.message);
      } finally {
        loading.value = false;
      }
    });
    const handleSizeChange = (size) => {
      pageSize.value = size;
      currentPage.value = 1;
    };
    const handleCurrentChange = (page) => {
      currentPage.value = page;
    };
    const handleSearch = () => {
      currentPage.value = 1;
      loadData();
    };
    const handleFilter = () => {
      currentPage.value = 1;
      loadData();
    };
    const handleSortChange = ({ prop, order }) => {
      sortField.value = prop;
      sortDirection.value = order === "ascending" ? "asc" : "desc";
      loadData();
    };
    const refreshData = () => {
      loadData();
    };
    const formatDateTime = (dateStr) => {
      if (!dateStr)
        return "";
      const date = new Date(dateStr);
      return date.toLocaleString("zh-CN");
    };
    const handleAdd = () => {
      isEdit.value = false;
      form.value = {};
      dialogVisible.value = true;
    };
    const handleEdit = (row) => {
      isEdit.value = true;
      form.value = __spreadValues({}, row);
      dialogVisible.value = true;
    };
    const submitForm = () => __async(this, null, function* () {
      try {
        if (formRef.value) {
          yield formRef.value.validate();
        }
        if (isEdit.value) {
          const url = `${props.apiPrefix}/table/${props.tableName}/record/${form.value.id}`;
          const response = yield axios.put(url, form.value);
          if (response.data.success) {
            ElMessage.success("记录更新成功");
            dialogVisible.value = false;
            loadData();
            emit("updated", form.value);
          } else {
            ElMessage.error("更新失败: " + response.data.message);
          }
        } else {
          const url = `${props.apiPrefix}/table/${props.tableName}/record`;
          const response = yield axios.post(url, form.value);
          if (response.data.success) {
            ElMessage.success("记录添加成功");
            dialogVisible.value = false;
            loadData();
            emit("added", response.data.data);
          } else {
            ElMessage.error("添加失败: " + response.data.message);
          }
        }
      } catch (error) {
        console.error(isEdit.value ? "更新记录失败:" : "添加记录失败:", error);
        ElMessage.error((isEdit.value ? "更新" : "添加") + "失败: " + error.message);
      }
    });
    const handleDelete = (row) => {
      recordToDelete.value = row;
      deleteDialogVisible.value = true;
    };
    const confirmDelete = () => __async(this, null, function* () {
      if (!recordToDelete.value || !recordToDelete.value.id) {
        ElMessage.error("删除记录ID无效");
        return;
      }
      try {
        const url = `${props.apiPrefix}/table/${props.tableName}/record/${recordToDelete.value.id}`;
        const response = yield axios.delete(url);
        if (response.data.success) {
          ElMessage.success("记录删除成功");
          deleteDialogVisible.value = false;
          loadData();
          emit("deleted", recordToDelete.value);
        } else {
          ElMessage.error("删除失败: " + response.data.message);
        }
      } catch (error) {
        console.error("删除记录失败:", error);
        ElMessage.error("删除失败: " + error.message);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_button_group = resolveComponent("el-button-group");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_el_switch = resolveComponent("el-switch");
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h3", _hoisted_3, toDisplayString(__props.title), 1),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_el_button, {
              type: "primary",
              size: "small",
              onClick: refreshData
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(refresh_default))
                  ]),
                  _: 1
                }),
                _cache[8] || (_cache[8] = createTextVNode(" 刷新 "))
              ]),
              _: 1
            }),
            createVNode(_component_el_button, {
              type: "success",
              size: "small",
              onClick: handleAdd
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(plus_default))
                  ]),
                  _: 1
                }),
                _cache[9] || (_cache[9] = createTextVNode(" 添加 "))
              ]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createVNode(_component_el_input, {
            modelValue: searchQuery.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
            placeholder: "搜索...",
            class: "w-64",
            clearable: "",
            onChange: handleSearch
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
          __props.filterOptions.length > 0 ? (openBlock(), createBlock(_component_el_select, {
            key: 0,
            modelValue: filterValue.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filterValue.value = $event),
            placeholder: "筛选...",
            class: "w-40",
            clearable: "",
            onChange: handleFilter
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.filterOptions, (option) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: option.value,
                  label: option.label,
                  value: option.value
                }, null, 8, ["label", "value"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])) : createCommentVNode("", true)
        ]),
        withDirectives((openBlock(), createBlock(_component_el_table, {
          data: tableData.value,
          border: "",
          stripe: "",
          style: { "width": "100%" },
          onSortChange: handleSortChange
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
              return openBlock(), createBlock(_component_el_table_column, {
                key: column.prop,
                prop: column.prop,
                label: column.label,
                sortable: column.sortable,
                width: column.width
              }, {
                default: withCtx((scope) => [
                  column.formatter ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(column.formatter(scope.row[column.prop], scope.row)), 1)) : column.type === "datetime" && scope.row[column.prop] ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(formatDateTime(scope.row[column.prop])), 1)) : column.type === "boolean" ? (openBlock(), createElementBlock("span", _hoisted_8, [
                    createVNode(_component_el_tag, {
                      type: scope.row[column.prop] ? "success" : "info"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(scope.row[column.prop] ? "是" : "否"), 1)
                      ]),
                      _: 2
                    }, 1032, ["type"])
                  ])) : (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(scope.row[column.prop]), 1))
                ]),
                _: 2
              }, 1032, ["prop", "label", "sortable", "width"]);
            }), 128)),
            createVNode(_component_el_table_column, {
              label: "操作",
              width: "150",
              fixed: "right"
            }, {
              default: withCtx((scope) => [
                createVNode(_component_el_button_group, null, {
                  default: withCtx(() => [
                    createVNode(_component_el_button, {
                      type: "primary",
                      size: "small",
                      onClick: ($event) => handleEdit(scope.row),
                      text: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(edit_default))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(_component_el_button, {
                      type: "danger",
                      size: "small",
                      onClick: ($event) => handleDelete(scope.row),
                      text: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(delete_default))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["data"])), [
          [_directive_loading, loading.value]
        ]),
        createBaseVNode("div", _hoisted_10, [
          createVNode(_component_el_pagination, {
            "current-page": currentPage.value,
            "onUpdate:currentPage": _cache[2] || (_cache[2] = ($event) => currentPage.value = $event),
            "page-size": pageSize.value,
            "onUpdate:pageSize": _cache[3] || (_cache[3] = ($event) => pageSize.value = $event),
            "page-sizes": [10, 20, 50, 100],
            layout: "total, sizes, prev, pager, next",
            total: total.value,
            onSizeChange: handleSizeChange,
            onCurrentChange: handleCurrentChange
          }, null, 8, ["current-page", "page-size", "total"])
        ]),
        createVNode(_component_el_dialog, {
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => dialogVisible.value = $event),
          title: isEdit.value ? "编辑记录" : "添加记录",
          width: "600px"
        }, {
          footer: withCtx(() => [
            createBaseVNode("div", _hoisted_11, [
              createVNode(_component_el_button, {
                onClick: _cache[4] || (_cache[4] = ($event) => dialogVisible.value = false)
              }, {
                default: withCtx(() => _cache[10] || (_cache[10] = [
                  createTextVNode("取消")
                ])),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: submitForm
              }, {
                default: withCtx(() => _cache[11] || (_cache[11] = [
                  createTextVNode("确定")
                ])),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            createVNode(_component_el_form, {
              ref_key: "formRef",
              ref: formRef,
              model: form.value,
              "label-width": "120px",
              "label-position": "right"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.formFields, (field) => {
                  return openBlock(), createBlock(_component_el_form_item, {
                    key: field.prop,
                    label: field.label,
                    prop: field.prop,
                    rules: field.rules
                  }, {
                    default: withCtx(() => [
                      field.type === "text" || field.type === "number" ? (openBlock(), createBlock(_component_el_input, {
                        key: 0,
                        modelValue: form.value[field.prop],
                        "onUpdate:modelValue": ($event) => form.value[field.prop] = $event,
                        type: field.type === "number" ? "number" : "text",
                        placeholder: field.placeholder || "请输入" + field.label
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "placeholder"])) : field.type === "select" ? (openBlock(), createBlock(_component_el_select, {
                        key: 1,
                        modelValue: form.value[field.prop],
                        "onUpdate:modelValue": ($event) => form.value[field.prop] = $event,
                        placeholder: field.placeholder || "请选择" + field.label,
                        style: { "width": "100%" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(field.options, (option) => {
                            return openBlock(), createBlock(_component_el_option, {
                              key: option.value,
                              label: option.label,
                              value: option.value
                            }, null, 8, ["label", "value"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder"])) : field.type === "boolean" ? (openBlock(), createBlock(_component_el_switch, {
                        key: 2,
                        modelValue: form.value[field.prop],
                        "onUpdate:modelValue": ($event) => form.value[field.prop] = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])) : field.type === "datetime" ? (openBlock(), createBlock(_component_el_date_picker, {
                        key: 3,
                        modelValue: form.value[field.prop],
                        "onUpdate:modelValue": ($event) => form.value[field.prop] = $event,
                        type: "datetime",
                        style: { "width": "100%" },
                        placeholder: field.placeholder || "选择日期时间"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["label", "prop", "rules"]);
                }), 128))
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        createVNode(_component_el_dialog, {
          modelValue: deleteDialogVisible.value,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => deleteDialogVisible.value = $event),
          title: "确认删除",
          width: "400px"
        }, {
          footer: withCtx(() => [
            createBaseVNode("div", _hoisted_12, [
              createVNode(_component_el_button, {
                onClick: _cache[6] || (_cache[6] = ($event) => deleteDialogVisible.value = false)
              }, {
                default: withCtx(() => _cache[12] || (_cache[12] = [
                  createTextVNode("取消")
                ])),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "danger",
                onClick: confirmDelete
              }, {
                default: withCtx(() => _cache[13] || (_cache[13] = [
                  createTextVNode("确认删除")
                ])),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            _cache[14] || (_cache[14] = createBaseVNode("p", null, "确定要删除这条记录吗？此操作不可撤销。", -1))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
export {
  _sfc_main as _
};
//# sourceMappingURL=TableManager-3ea786d6.js.map
