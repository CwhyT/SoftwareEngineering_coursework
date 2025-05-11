import { _ as _sfc_main$1 } from "./TableManager-3ea786d6.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { r as ref, c as createElementBlock, b as createBaseVNode, d as createVNode, w as withCtx, k as resolveComponent, o as openBlock, j as createTextVNode, L as ElMessage } from "./index-af7cb7d5.js";
const Users_vue_vue_type_style_index_0_scoped_bd368776_lang = "";
const _hoisted_1 = { class: "p-6" };
const _hoisted_2 = { class: "bg-white p-6 rounded-lg shadow-md mb-6" };
const _hoisted_3 = { class: "flex justify-between items-center mb-6" };
const _hoisted_4 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_5 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _hoisted_6 = { class: "bg-white p-6 rounded-lg shadow-md" };
const _sfc_main = {
  __name: "Users",
  setup(__props) {
    const activeTab = ref("userList");
    const handleAddUser = () => {
      ElMessage.info("添加用户功能正在开发中");
    };
    const userColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "username", label: "用户名", sortable: true, searchable: true },
      { prop: "email", label: "邮箱", sortable: true, searchable: true },
      { prop: "role", label: "角色", sortable: true },
      { prop: "status", label: "状态", sortable: true },
      { prop: "createdAt", label: "创建时间", sortable: true, type: "datetime" },
      { prop: "lastLogin", label: "最后登录", sortable: true, type: "datetime" }
    ];
    const userFormFields = [
      {
        prop: "username",
        label: "用户名",
        type: "text",
        rules: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      {
        prop: "email",
        label: "邮箱",
        type: "text",
        rules: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入有效的邮箱地址", trigger: "blur" }
        ]
      },
      {
        prop: "password",
        label: "密码",
        type: "text",
        placeholder: "编辑时留空表示不修改"
      },
      {
        prop: "role",
        label: "角色",
        type: "select",
        options: [
          { value: "user", label: "普通用户" },
          { value: "vip", label: "VIP用户" },
          { value: "customer_service", label: "客服" },
          { value: "admin", label: "管理员" },
          { value: "super_admin", label: "超级管理员" }
        ],
        rules: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      {
        prop: "status",
        label: "状态",
        type: "select",
        options: [
          { value: "active", label: "活跃" },
          { value: "inactive", label: "不活跃" },
          { value: "banned", label: "封禁" },
          { value: "pending", label: "待验证" }
        ],
        rules: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      {
        prop: "emailVerified",
        label: "邮箱已验证",
        type: "boolean"
      }
    ];
    const userFilterOptions = [
      { label: "角色: 普通用户", value: "role:user" },
      { label: "角色: VIP", value: "role:vip" },
      { label: "角色: 客服", value: "role:customer_service" },
      { label: "角色: 管理员", value: "role:admin" },
      { label: "状态: 活跃", value: "status:active" },
      { label: "状态: 不活跃", value: "status:inactive" },
      { label: "状态: 封禁", value: "status:banned" }
    ];
    const roleColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "name", label: "角色名称", sortable: true, searchable: true },
      { prop: "description", label: "描述", searchable: true },
      { prop: "permissions", label: "权限" },
      { prop: "createdAt", label: "创建时间", sortable: true, type: "datetime" }
    ];
    const roleFormFields = [
      {
        prop: "name",
        label: "角色名称",
        type: "text",
        rules: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      {
        prop: "description",
        label: "描述",
        type: "text"
      },
      {
        prop: "permissions",
        label: "权限",
        type: "text",
        placeholder: "用逗号分隔的权限列表"
      }
    ];
    const verificationColumns = [
      { prop: "id", label: "ID", sortable: true, width: "80" },
      { prop: "userId", label: "用户ID", sortable: true },
      { prop: "token", label: "令牌", width: "120" },
      { prop: "type", label: "类型", sortable: true },
      { prop: "expiresAt", label: "过期时间", sortable: true, type: "datetime" },
      { prop: "createdAt", label: "创建时间", sortable: true, type: "datetime" },
      { prop: "usedAt", label: "使用时间", sortable: true, type: "datetime" }
    ];
    const verificationFormFields = [
      {
        prop: "userId",
        label: "用户ID",
        type: "text",
        rules: [{ required: true, message: "请输入用户ID", trigger: "blur" }]
      },
      {
        prop: "token",
        label: "令牌",
        type: "text",
        rules: [{ required: true, message: "请输入令牌", trigger: "blur" }]
      },
      {
        prop: "type",
        label: "类型",
        type: "select",
        options: [
          { value: "email", label: "邮箱验证" },
          { value: "password", label: "密码重置" },
          { value: "phone", label: "手机验证" }
        ],
        rules: [{ required: true, message: "请选择类型", trigger: "change" }]
      },
      {
        prop: "expiresAt",
        label: "过期时间",
        type: "datetime",
        rules: [{ required: true, message: "请选择过期时间", trigger: "change" }]
      }
    ];
    const verificationFilterOptions = [
      { label: "类型: 邮箱验证", value: "type:email" },
      { label: "类型: 密码重置", value: "type:password" },
      { label: "类型: 手机验证", value: "type:phone" },
      { label: "状态: 已使用", value: "usedAt:not null" },
      { label: "状态: 未使用", value: "usedAt:null" }
    ];
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "mb-6" }, [
          createBaseVNode("h1", { class: "text-2xl font-bold mb-2" }, "用户管理"),
          createBaseVNode("p", { class: "text-gray-600" }, "管理所有用户账户和权限")
        ], -1)),
        createVNode(_component_el_tabs, {
          modelValue: activeTab.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activeTab.value = $event),
          class: "mb-6"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_tab_pane, {
              label: "用户列表",
              name: "userList"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  createBaseVNode("div", _hoisted_3, [
                    _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-lg font-semibold" }, "系统用户", -1)),
                    createVNode(_component_el_button, {
                      type: "primary",
                      onClick: handleAddUser
                    }, {
                      default: withCtx(() => _cache[1] || (_cache[1] = [
                        createTextVNode("添加用户")
                      ])),
                      _: 1
                    })
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_tab_pane, {
              label: "用户数据管理",
              name: "userData"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_4, [
                  createVNode(_sfc_main$1, {
                    tableName: "users",
                    title: "用户数据表",
                    columns: userColumns,
                    formFields: userFormFields,
                    filterOptions: userFilterOptions
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_tab_pane, {
              label: "用户角色管理",
              name: "userRoles"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(_sfc_main$1, {
                    tableName: "user_roles",
                    title: "用户角色表",
                    columns: roleColumns,
                    formFields: roleFormFields
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(_component_el_tab_pane, {
              label: "验证信息",
              name: "userVerification"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_sfc_main$1, {
                    tableName: "verification_tokens",
                    title: "验证令牌记录",
                    columns: verificationColumns,
                    formFields: verificationFormFields,
                    filterOptions: verificationFilterOptions
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
const Users = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd368776"]]);
export {
  Users as default
};
//# sourceMappingURL=Users-6700fbfd.js.map
