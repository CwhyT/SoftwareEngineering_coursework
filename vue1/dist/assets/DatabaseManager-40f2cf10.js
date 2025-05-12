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
import { r as ref, Z as computed, I as onMounted, a4 as axios, L as ElMessage, c as createElementBlock, b as createBaseVNode, d as createVNode, f as createCommentVNode, g as createBlock, w as withCtx, t as toDisplayString, K as createStaticVNode, k as resolveComponent, o as openBlock, e as unref, aB as refresh_default, j as createTextVNode, aC as download_default, Q as connection_default, aA as search_default, i as withModifiers, F as Fragment, J as renderList, E as ElMessageBox } from "./index-af7cb7d5.js";
import { _ as _sfc_main$1 } from "./TableManager-3ea786d6.js";
const _hoisted_1 = { class: "p-6" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = {
  key: 0,
  class: "text-center py-12"
};
const _hoisted_4 = {
  key: 2,
  class: "mb-6"
};
const _hoisted_5 = { class: "bg-white rounded-lg shadow-md overflow-hidden" };
const _hoisted_6 = { class: "bg-blue-50 p-4 border-b" };
const _hoisted_7 = { class: "flex justify-between items-center" };
const _hoisted_8 = { class: "flex space-x-2" };
const _hoisted_9 = { class: "p-4" };
const _hoisted_10 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" };
const _hoisted_11 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_12 = { class: "font-medium" };
const _hoisted_13 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_14 = { class: "font-medium truncate" };
const _hoisted_15 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_16 = { class: "font-medium" };
const _hoisted_17 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_18 = { class: "font-medium" };
const _hoisted_19 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_20 = { class: "font-medium" };
const _hoisted_21 = { class: "bg-gray-50 p-4 rounded-lg" };
const _hoisted_22 = { class: "font-medium" };
const _hoisted_23 = {
  key: 3,
  class: "bg-white rounded-lg shadow-md p-6 mb-6"
};
const _hoisted_24 = { class: "text-center" };
const _hoisted_25 = { class: "flex justify-center gap-4" };
const _hoisted_26 = {
  key: 4,
  class: "bg-white rounded-lg shadow-md overflow-hidden mb-6"
};
const _hoisted_27 = { class: "p-4" };
const _hoisted_28 = { key: 0 };
const _hoisted_29 = { class: "flex space-x-2" };
const _hoisted_30 = {
  key: 5,
  class: "bg-white rounded-lg shadow-md overflow-hidden mb-6"
};
const _hoisted_31 = { class: "p-4" };
const _hoisted_32 = { class: "flex justify-between mb-4" };
const _hoisted_33 = {
  key: 0,
  class: "border rounded-lg overflow-hidden"
};
const _hoisted_34 = { class: "bg-gray-50 p-2 border-b text-sm" };
const _hoisted_35 = { class: "p-2 overflow-x-auto" };
const _hoisted_36 = {
  key: 1,
  class: "p-4"
};
const _hoisted_37 = {
  key: 2,
  class: "p-4"
};
const _hoisted_38 = {
  key: 1,
  class: "mt-4"
};
const _sfc_main = {
  __name: "DatabaseManager",
  setup(__props) {
    const loading = ref(true);
    const dbError = ref(false);
    const dbInfo = ref({});
    const searchQuery = ref("");
    const lastRefreshTime = ref(null);
    const tables = ref([]);
    const tablesData = ref({});
    const sqlQuery = ref("");
    const queryTemplate = ref("");
    const queryLoading = ref(false);
    const queryResult = ref(null);
    const queryError = ref("");
    const tableDataDialog = ref({
      visible: false,
      tableName: "",
      columns: [],
      formFields: []
    });
    const tableSchemaDialog = ref({
      visible: false,
      tableName: "",
      columns: []
    });
    const filteredTables = computed(() => {
      if (!searchQuery.value)
        return tables.value;
      const query = searchQuery.value.toLowerCase();
      return tables.value.filter(
        (table) => table.name.toLowerCase().includes(query)
      );
    });
    onMounted(() => __async(this, null, function* () {
      yield loadDatabaseInfo();
      setInterval(() => __async(this, null, function* () {
        try {
          if (dbError.value) {
            console.log("执行数据库连接健康检查...");
            const pingResponse = yield axios.get("/api/admin/db/ping", { timeout: 2e3 });
            if (pingResponse.data.success) {
              console.log("API服务正常，尝试重新加载数据...");
              yield loadDatabaseInfo();
            }
          }
        } catch (error) {
          console.warn("健康检查失败:", error.message);
        }
      }), 3e4);
    }));
    const loadDatabaseInfo = () => __async(this, null, function* () {
      loading.value = true;
      dbError.value = false;
      try {
        let attempts = 0;
        const maxAttempts = 3;
        let success = false;
        while (attempts < maxAttempts && !success) {
          attempts++;
          try {
            const response = yield axios.get("/api/admin/db/info", { timeout: 5e3 });
            if (response.data.success) {
              dbInfo.value = response.data.data;
              tables.value = dbInfo.value.tables.map((name) => ({ name }));
              lastRefreshTime.value = /* @__PURE__ */ new Date();
              success = true;
            } else {
              console.warn(`尝试 ${attempts}/${maxAttempts} 失败: ${response.data.message}`);
              if (attempts < maxAttempts)
                yield new Promise((r) => setTimeout(r, 1e3));
            }
          } catch (err) {
            console.warn(`尝试 ${attempts}/${maxAttempts} 出错:`, err.message);
            if (attempts < maxAttempts)
              yield new Promise((r) => setTimeout(r, 1e3));
          }
        }
        if (!success) {
          dbError.value = true;
          ElMessage.error("获取数据库信息失败，请检查API服务是否正常运行");
          checkDbConnection();
        }
      } catch (error) {
        console.error("获取数据库信息错误:", error);
        dbError.value = true;
        ElMessage.error("连接数据库失败: " + error.message);
        checkDbConnection();
      } finally {
        loading.value = false;
      }
    });
    const checkDbConnection = () => __async(this, null, function* () {
      try {
        const pingResponse = yield axios.get("/api/admin/db/ping", { timeout: 3e3 });
        if (pingResponse.data.success) {
          ElMessage.warning("API服务可用，但无法连接到数据库。请检查数据库配置或数据库文件是否存在。");
        }
      } catch (error) {
        console.error("API连接测试失败:", error);
        ElMessage.error("无法连接到API服务。请确认后端服务是否正常运行。");
      }
    });
    const checkDbFileExists = () => __async(this, null, function* () {
      try {
        const response = yield axios.get("/api/admin/db/file-check");
        if (response.data.success) {
          if (response.data.data.exists) {
            ElMessage.success(`数据库文件存在于路径: ${response.data.data.path}`);
          } else {
            ElMessage.error(`数据库文件不存在! 预期路径: ${response.data.data.path}`);
          }
        } else {
          ElMessage.error("检查数据库文件失败: " + response.data.message);
        }
      } catch (error) {
        console.error("检查数据库文件错误:", error);
        ElMessage.error("检查失败，无法连接到后端服务");
      }
    });
    const refreshDbInfo = () => __async(this, null, function* () {
      yield loadDatabaseInfo();
      ElMessage.success("数据库信息已刷新");
    });
    const backupDatabase = () => __async(this, null, function* () {
      try {
        ElMessage.info("正在备份数据库...");
        const response = yield axios.post("/api/admin/db/backup", {}, { timeout: 1e4 });
        if (response.data.success) {
          ElMessage.success("数据库备份成功");
          ElMessage({
            type: "success",
            message: `备份已保存到: ${response.data.data.backupPath}`,
            duration: 5e3
          });
        } else {
          ElMessage.error("数据库备份失败: " + response.data.message);
        }
      } catch (error) {
        console.error("备份数据库错误:", error);
        ElMessage.error("备份数据库失败: " + error.message);
      }
    });
    const loadTableData = (tableName) => __async(this, null, function* () {
      try {
        const response = yield axios.get(`/api/admin/db/table/${tableName}/data`, {
          params: { page: 1, limit: 1 }
        });
        if (response.data.success) {
          tablesData.value[tableName] = response.data.data.pagination;
        } else {
          ElMessage.error("加载表数据失败: " + response.data.message);
        }
      } catch (error) {
        console.error(`加载表 ${tableName} 数据错误:`, error);
        ElMessage.error(`加载表 ${tableName} 数据失败: ` + error.message);
      }
    });
    const viewTableData = (tableName) => __async(this, null, function* () {
      try {
        const response = yield axios.get(`/api/admin/db/table/${tableName}/schema`);
        if (response.data.success) {
          const columns = response.data.data.columns;
          const tableColumns = columns.map((col) => ({
            prop: col.name,
            label: col.name,
            sortable: true,
            searchable: col.type.includes("TEXT") || col.type.includes("VARCHAR"),
            type: col.type.includes("DATETIME") ? "datetime" : void 0
          }));
          const formFields = columns.map((col) => {
            const field = {
              prop: col.name,
              label: col.name,
              type: getFieldType(col.type)
            };
            if (col.notnull === 1 && col.pk !== 1) {
              field.rules = [{ required: true, message: `请输入${col.name}`, trigger: "blur" }];
            }
            return field;
          });
          tableDataDialog.value = {
            visible: true,
            tableName,
            columns: tableColumns,
            formFields
          };
        } else {
          ElMessage.error("获取表结构失败: " + response.data.message);
        }
      } catch (error) {
        console.error(`查看表 ${tableName} 数据错误:`, error);
        ElMessage.error(`查看表 ${tableName} 数据失败: ` + error.message);
      }
    });
    const viewTableSchema = (tableName) => __async(this, null, function* () {
      try {
        const response = yield axios.get(`/api/admin/db/table/${tableName}/schema`);
        if (response.data.success) {
          tableSchemaDialog.value = {
            visible: true,
            tableName,
            columns: response.data.data.columns
          };
        } else {
          ElMessage.error("获取表结构失败: " + response.data.message);
        }
      } catch (error) {
        console.error(`查看表 ${tableName} 结构错误:`, error);
        ElMessage.error(`查看表 ${tableName} 结构失败: ` + error.message);
      }
    });
    const clearTable = (tableName) => __async(this, null, function* () {
      try {
        yield ElMessageBox.confirm(
          `确定要清空 ${tableName} 表中的所有数据吗？此操作不可恢复。`,
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        );
        const response = yield axios.post("/api/admin/db/query", {
          sql: `DELETE FROM ${tableName}`
        });
        if (response.data.success) {
          ElMessage.success(`已清空 ${tableName} 表数据`);
          loadTableData(tableName);
        } else {
          ElMessage.error("清空表失败: " + response.data.message);
        }
      } catch (error) {
        if (error !== "cancel") {
          console.error(`清空表 ${tableName} 错误:`, error);
          ElMessage.error(`清空表 ${tableName} 失败: ` + error.message);
        }
      }
    });
    const executeQuery = () => __async(this, null, function* () {
      if (!sqlQuery.value.trim()) {
        ElMessage.warning("请输入SQL查询语句");
        return;
      }
      queryLoading.value = true;
      queryResult.value = null;
      queryError.value = "";
      try {
        let attempts = 0;
        const maxAttempts = 2;
        let success = false;
        while (attempts < maxAttempts && !success) {
          attempts++;
          try {
            const response = yield axios.post("/api/admin/db/query", {
              sql: sqlQuery.value
            }, { timeout: 1e4 });
            if (response.data.success) {
              queryResult.value = response.data.data.result;
              ElMessage.success("查询执行成功");
              success = true;
            } else {
              queryError.value = response.data.message;
              if (attempts < maxAttempts) {
                console.log(`SQL执行失败，正在重试(${attempts}/${maxAttempts})...`);
                yield new Promise((r) => setTimeout(r, 500));
              }
            }
          } catch (err) {
            console.error(`执行查询尝试 ${attempts}/${maxAttempts} 出错:`, err);
            if (attempts < maxAttempts)
              yield new Promise((r) => setTimeout(r, 500));
          }
        }
        if (!success) {
          ElMessage.error("执行SQL查询失败，请重试或检查SQL语法");
        }
      } catch (error) {
        console.error("执行SQL查询错误:", error);
        queryError.value = error.message;
      } finally {
        queryLoading.value = false;
      }
    });
    const applyTemplate = () => {
      sqlQuery.value = queryTemplate.value;
      queryTemplate.value = "";
    };
    const handleTableClick = (row) => {
      viewTableData(row.name);
    };
    const getFieldType = (dbType) => {
      const type = dbType.toUpperCase();
      if (type.includes("INT"))
        return "number";
      if (type.includes("FLOAT") || type.includes("DOUBLE") || type.includes("DECIMAL"))
        return "number";
      if (type.includes("DATETIME") || type.includes("TIMESTAMP"))
        return "datetime";
      if (type.includes("BOOLEAN"))
        return "boolean";
      return "text";
    };
    const testDbConnection = () => __async(this, null, function* () {
      try {
        ElMessage.info("正在测试数据库连接...");
        const response = yield axios.get("/api/admin/db/test-connection", { timeout: 5e3 });
        if (response.data.success) {
          ElMessage.success("数据库连接测试成功!");
          yield loadDatabaseInfo();
        } else {
          ElMessage.error("数据库连接测试失败: " + response.data.message);
        }
      } catch (error) {
        console.error("测试数据库连接错误:", error);
        ElMessage.error("测试连接失败: " + error.message);
      }
    });
    const formatFileSize = (bytes) => {
      if (bytes === 0)
        return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    const formatDateTime = (dateVal) => {
      if (!dateVal)
        return "未知";
      const date = new Date(dateVal);
      return date.toLocaleString("zh-CN");
    };
    const autoReconnect = () => __async(this, null, function* () {
      ElMessage.info("正在尝试重新连接数据库...");
      try {
        const pingResponse = yield axios.get("/api/admin/db/ping", { timeout: 3e3 });
        if (pingResponse.data.success) {
          yield loadDatabaseInfo();
          ElMessage.success("数据库连接已恢复");
        } else {
          ElMessage.error("无法连接到数据库服务");
        }
      } catch (error) {
        console.error("重新连接失败:", error);
        ElMessage.error("重新连接失败: " + error.message);
      }
    });
    return (_ctx, _cache) => {
      var _a;
      const _component_el_skeleton = resolveComponent("el-skeleton");
      const _component_el_alert = resolveComponent("el-alert");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_table_column = resolveComponent("el-table-column");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[30] || (_cache[30] = createBaseVNode("h1", { class: "text-2xl font-bold mb-2" }, "数据库管理", -1)),
          _cache[31] || (_cache[31] = createBaseVNode("p", { class: "text-gray-600" }, "管理和查看系统数据库中的所有表", -1)),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createVNode(_component_el_skeleton, {
              style: { "width": "100%" },
              rows: 10,
              animated: ""
            })
          ])) : createCommentVNode("", true),
          dbError.value ? (openBlock(), createBlock(_component_el_alert, {
            key: 1,
            title: "无法连接到数据库",
            type: "error",
            description: "请检查数据库配置和连接状态，或联系管理员。",
            "show-icon": "",
            closable: false,
            class: "mb-4"
          })) : createCommentVNode("", true),
          !loading.value && !dbError.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  _cache[10] || (_cache[10] = createBaseVNode("div", null, [
                    createBaseVNode("h2", { class: "text-lg font-semibold" }, "数据库信息"),
                    createBaseVNode("p", { class: "text-sm text-gray-600" }, "SQLite 文件数据库")
                  ], -1)),
                  createBaseVNode("div", _hoisted_8, [
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: refreshDbInfo
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(refresh_default))
                          ]),
                          _: 1
                        }),
                        _cache[7] || (_cache[7] = createTextVNode(" 刷新 "))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_button, {
                      type: "success",
                      onClick: backupDatabase
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(download_default))
                          ]),
                          _: 1
                        }),
                        _cache[8] || (_cache[8] = createTextVNode(" 备份数据库 "))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_button, {
                      type: "warning",
                      onClick: testDbConnection
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(connection_default))
                          ]),
                          _: 1
                        }),
                        _cache[9] || (_cache[9] = createTextVNode(" 测试连接 "))
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("div", _hoisted_11, [
                    _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-sm text-gray-500" }, "数据库类型", -1)),
                    createBaseVNode("div", _hoisted_12, toDisplayString(dbInfo.value.type || "SQLite"), 1)
                  ]),
                  createBaseVNode("div", _hoisted_13, [
                    _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-sm text-gray-500" }, "数据库文件路径", -1)),
                    createBaseVNode("div", _hoisted_14, toDisplayString(dbInfo.value.path || "backend/data/scooter_rental.db"), 1)
                  ]),
                  createBaseVNode("div", _hoisted_15, [
                    _cache[13] || (_cache[13] = createBaseVNode("div", { class: "text-sm text-gray-500" }, "表数量", -1)),
                    createBaseVNode("div", _hoisted_16, toDisplayString(((_a = dbInfo.value.tables) == null ? void 0 : _a.length) || 0) + " 个表", 1)
                  ]),
                  createBaseVNode("div", _hoisted_17, [
                    _cache[14] || (_cache[14] = createBaseVNode("div", { class: "text-sm text-gray-500" }, "数据库文件大小", -1)),
                    createBaseVNode("div", _hoisted_18, toDisplayString(dbInfo.value.size ? formatFileSize(dbInfo.value.size) : "未知"), 1)
                  ]),
                  createBaseVNode("div", _hoisted_19, [
                    _cache[16] || (_cache[16] = createBaseVNode("div", { class: "text-sm text-gray-500" }, "连接状态", -1)),
                    createBaseVNode("div", _hoisted_20, [
                      createVNode(_component_el_tag, {
                        type: "success",
                        size: "small",
                        effect: "dark"
                      }, {
                        default: withCtx(() => _cache[15] || (_cache[15] = [
                          createTextVNode("已连接")
                        ])),
                        _: 1
                      })
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_21, [
                    _cache[17] || (_cache[17] = createBaseVNode("div", { class: "text-sm text-gray-500" }, "上次刷新时间", -1)),
                    createBaseVNode("div", _hoisted_22, toDisplayString(formatDateTime(lastRefreshTime.value)), 1)
                  ])
                ])
              ])
            ])
          ])) : createCommentVNode("", true),
          !loading.value && dbError.value ? (openBlock(), createElementBlock("div", _hoisted_23, [
            createBaseVNode("div", _hoisted_24, [
              _cache[21] || (_cache[21] = createStaticVNode('<h3 class="text-lg font-semibold text-red-600 mb-2">数据库连接失败</h3><p class="text-gray-600 mb-4">无法连接到数据库。可能的原因：</p><ul class="text-left text-gray-600 max-w-lg mx-auto mb-4"><li class="mb-1">• 后端服务未启动或API地址配置错误</li><li class="mb-1">• 数据库文件路径错误或权限不足</li><li class="mb-1">• 数据库文件已损坏或被锁定</li><li class="mb-1">• 网络连接问题</li></ul>', 3)),
              createBaseVNode("div", _hoisted_25, [
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: loadDatabaseInfo,
                  loading: loading.value
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(refresh_default))
                      ]),
                      _: 1
                    }),
                    _cache[18] || (_cache[18] = createTextVNode(" 重试连接 "))
                  ]),
                  _: 1
                }, 8, ["loading"]),
                createVNode(_component_el_button, {
                  type: "info",
                  onClick: checkDbFileExists
                }, {
                  default: withCtx(() => _cache[19] || (_cache[19] = [
                    createTextVNode(" 检查数据库文件 ")
                  ])),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "success",
                  onClick: autoReconnect
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, { class: "mr-1" }, {
                      default: withCtx(() => [
                        createVNode(unref(connection_default))
                      ]),
                      _: 1
                    }),
                    _cache[20] || (_cache[20] = createTextVNode(" 自动修复连接 "))
                  ]),
                  _: 1
                })
              ])
            ])
          ])) : createCommentVNode("", true),
          !loading.value && !dbError.value ? (openBlock(), createElementBlock("div", _hoisted_26, [
            _cache[26] || (_cache[26] = createBaseVNode("div", { class: "bg-blue-50 p-4 border-b" }, [
              createBaseVNode("h2", { class: "text-lg font-semibold" }, "数据表总览")
            ], -1)),
            createBaseVNode("div", _hoisted_27, [
              createVNode(_component_el_input, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                placeholder: "搜索表名...",
                class: "mb-4 w-full md:w-64",
                clearable: ""
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
              createVNode(_component_el_table, {
                data: filteredTables.value,
                style: { "width": "100%" },
                onRowClick: handleTableClick
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "name",
                    label: "表名",
                    width: "200"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "记录数",
                    width: "120"
                  }, {
                    default: withCtx((scope) => [
                      tablesData.value[scope.row.name] ? (openBlock(), createElementBlock("div", _hoisted_28, toDisplayString(tablesData.value[scope.row.name].total || 0) + " 条记录 ", 1)) : (openBlock(), createBlock(_component_el_button, {
                        key: 1,
                        type: "primary",
                        link: "",
                        onClick: withModifiers(($event) => loadTableData(scope.row.name), ["stop"])
                      }, {
                        default: withCtx(() => _cache[22] || (_cache[22] = [
                          createTextVNode(" 加载数据 ")
                        ])),
                        _: 2
                      }, 1032, ["onClick"]))
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, { label: "操作" }, {
                    default: withCtx((scope) => [
                      createBaseVNode("div", _hoisted_29, [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "small",
                          onClick: withModifiers(($event) => viewTableData(scope.row.name), ["stop"])
                        }, {
                          default: withCtx(() => _cache[23] || (_cache[23] = [
                            createTextVNode(" 查看数据 ")
                          ])),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_el_button, {
                          type: "info",
                          size: "small",
                          onClick: withModifiers(($event) => viewTableSchema(scope.row.name), ["stop"])
                        }, {
                          default: withCtx(() => _cache[24] || (_cache[24] = [
                            createTextVNode(" 表结构 ")
                          ])),
                          _: 2
                        }, 1032, ["onClick"]),
                        createVNode(_component_el_button, {
                          type: "danger",
                          size: "small",
                          onClick: withModifiers(($event) => clearTable(scope.row.name), ["stop"])
                        }, {
                          default: withCtx(() => _cache[25] || (_cache[25] = [
                            createTextVNode(" 清空表 ")
                          ])),
                          _: 2
                        }, 1032, ["onClick"])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])
            ])
          ])) : createCommentVNode("", true),
          !loading.value && !dbError.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
            _cache[29] || (_cache[29] = createBaseVNode("div", { class: "bg-blue-50 p-4 border-b" }, [
              createBaseVNode("h2", { class: "text-lg font-semibold" }, "SQL查询工具")
            ], -1)),
            createBaseVNode("div", _hoisted_31, [
              createVNode(_component_el_input, {
                modelValue: sqlQuery.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => sqlQuery.value = $event),
                type: "textarea",
                rows: 4,
                placeholder: "输入SQL查询语句...",
                class: "mb-4"
              }, null, 8, ["modelValue"]),
              createBaseVNode("div", _hoisted_32, [
                createBaseVNode("div", null, [
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: executeQuery,
                    loading: queryLoading.value
                  }, {
                    default: withCtx(() => _cache[27] || (_cache[27] = [
                      createTextVNode(" 执行 ")
                    ])),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode(_component_el_button, {
                    onClick: _cache[2] || (_cache[2] = ($event) => sqlQuery.value = "")
                  }, {
                    default: withCtx(() => _cache[28] || (_cache[28] = [
                      createTextVNode(" 清空 ")
                    ])),
                    _: 1
                  })
                ]),
                createBaseVNode("div", null, [
                  createVNode(_component_el_select, {
                    modelValue: queryTemplate.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => queryTemplate.value = $event),
                    placeholder: "选择模板",
                    onChange: applyTemplate
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_option, {
                        label: "查询用户表",
                        value: "SELECT * FROM users LIMIT 10"
                      }),
                      createVNode(_component_el_option, {
                        label: "查询订单表",
                        value: "SELECT * FROM orders LIMIT 10"
                      }),
                      createVNode(_component_el_option, {
                        label: "查询车辆表",
                        value: "SELECT * FROM scooters LIMIT 10"
                      }),
                      createVNode(_component_el_option, {
                        label: "统计活跃用户",
                        value: "SELECT role, COUNT(*) as count FROM users WHERE status = 'active' GROUP BY role"
                      }),
                      createVNode(_component_el_option, {
                        label: "统计订单金额",
                        value: "SELECT DATE(created_at) as date, SUM(amount) as total FROM orders GROUP BY DATE(created_at) ORDER BY date DESC LIMIT 7"
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ])
              ]),
              queryResult.value ? (openBlock(), createElementBlock("div", _hoisted_33, [
                createBaseVNode("div", _hoisted_34, " 查询结果 (" + toDisplayString(Array.isArray(queryResult.value) ? queryResult.value.length : 1) + " 行) ", 1),
                createBaseVNode("div", _hoisted_35, [
                  Array.isArray(queryResult.value) && queryResult.value.length > 0 ? (openBlock(), createBlock(_component_el_table, {
                    key: 0,
                    data: queryResult.value,
                    border: "",
                    style: { "width": "100%" }
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(queryResult.value[0]), (column) => {
                        return openBlock(), createBlock(_component_el_table_column, {
                          key: column,
                          prop: column,
                          label: column
                        }, null, 8, ["prop", "label"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["data"])) : queryResult.value.affectedRows !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_36, [
                    createVNode(_component_el_alert, {
                      title: `操作成功: 影响了 ${queryResult.value.affectedRows} 行`,
                      type: "success",
                      "show-icon": ""
                    }, null, 8, ["title"])
                  ])) : Array.isArray(queryResult.value) && queryResult.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_37, [
                    createVNode(_component_el_alert, {
                      title: "查询成功，但没有返回数据",
                      type: "info",
                      "show-icon": ""
                    })
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              queryError.value ? (openBlock(), createElementBlock("div", _hoisted_38, [
                createVNode(_component_el_alert, {
                  title: queryError.value,
                  type: "error",
                  "show-icon": "",
                  closable: true,
                  onClose: _cache[4] || (_cache[4] = ($event) => queryError.value = "")
                }, null, 8, ["title"])
              ])) : createCommentVNode("", true)
            ])
          ])) : createCommentVNode("", true)
        ]),
        createVNode(_component_el_dialog, {
          modelValue: tableDataDialog.value.visible,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => tableDataDialog.value.visible = $event),
          title: `${tableDataDialog.value.tableName} - 数据`,
          width: "90%"
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$1, {
              tableName: tableDataDialog.value.tableName,
              title: tableDataDialog.value.tableName,
              columns: tableDataDialog.value.columns,
              formFields: tableDataDialog.value.formFields,
              apiPrefix: "/api/admin/db"
            }, null, 8, ["tableName", "title", "columns", "formFields"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"]),
        createVNode(_component_el_dialog, {
          modelValue: tableSchemaDialog.value.visible,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => tableSchemaDialog.value.visible = $event),
          title: `${tableSchemaDialog.value.tableName} - 表结构`,
          width: "80%"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_table, {
              data: tableSchemaDialog.value.columns,
              style: { "width": "100%" },
              border: ""
            }, {
              default: withCtx(() => [
                createVNode(_component_el_table_column, {
                  prop: "name",
                  label: "列名"
                }),
                createVNode(_component_el_table_column, {
                  prop: "type",
                  label: "数据类型"
                }),
                createVNode(_component_el_table_column, {
                  prop: "notnull",
                  label: "不允许为空"
                }, {
                  default: withCtx((scope) => [
                    createTextVNode(toDisplayString(scope.row.notnull === 1 ? "是" : "否"), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_el_table_column, {
                  prop: "dflt_value",
                  label: "默认值"
                }),
                createVNode(_component_el_table_column, {
                  prop: "pk",
                  label: "主键"
                }, {
                  default: withCtx((scope) => [
                    createTextVNode(toDisplayString(scope.row.pk === 1 ? "是" : "否"), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=DatabaseManager-40f2cf10.js.map
