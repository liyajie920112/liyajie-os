/**
 * 权限类型使用示例
 * 展示如何使用不同类型的权限（MENU, BUTTON, API, DATA）
 */

/**
 * MENU类型权限示例
 * 用于控制菜单项的可见性
 */
const menuPermissions = [
  {
    name: '系统管理',
    code: 'SYSTEM_MANAGE',
    type: 'MENU',
    menuPath: '/system',
    description: '访问系统管理模块的权限'
  },
  {
    name: '用户管理',
    code: 'USER_MANAGE',
    type: 'MENU',
    menuPath: '/system/users',
    description: '访问用户管理页面的权限'
  },
  {
    name: '角色管理',
    code: 'ROLE_MANAGE',
    type: 'MENU',
    menuPath: '/system/roles',
    description: '访问角色管理页面的权限'
  }
];

/**
 * BUTTON类型权限示例
 * 用于控制页面内按钮操作的权限
 */
const buttonPermissions = [
  {
    name: '创建用户',
    code: 'USER_CREATE',
    type: 'BUTTON',
    menuPath: '/system/users',
    description: '在用户管理页面创建用户的权限'
  },
  {
    name: '编辑用户',
    code: 'USER_EDIT',
    type: 'BUTTON',
    menuPath: '/system/users',
    description: '在用户管理页面编辑用户的权限'
  },
  {
    name: '删除用户',
    code: 'USER_DELETE',
    type: 'BUTTON',
    menuPath: '/system/users',
    description: '在用户管理页面删除用户的权限'
  },
  {
    name: '导出用户',
    code: 'USER_EXPORT',
    type: 'BUTTON',
    menuPath: '/system/users',
    description: '在用户管理页面导出用户数据的权限'
  }
];

/**
 * API类型权限示例
 * 用于控制API接口访问的权限
 */
const apiPermissions = [
  {
    name: '获取用户列表',
    code: 'API_USER_LIST',
    type: 'API',
    apiPath: 'GET /api/users',
    description: '访问获取用户列表接口的权限'
  },
  {
    name: '创建用户',
    code: 'API_USER_CREATE',
    type: 'API',
    apiPath: 'POST /api/users',
    description: '访问创建用户接口的权限'
  },
  {
    name: '更新用户',
    code: 'API_USER_UPDATE',
    type: 'API',
    apiPath: 'PUT /api/users/:id',
    description: '访问更新用户接口的权限'
  },
  {
    name: '删除用户',
    code: 'API_USER_DELETE',
    type: 'API',
    apiPath: 'DELETE /api/users/:id',
    description: '访问删除用户接口的权限'
  }
];

/**
 * DATA类型权限示例
 * 用于控制数据访问范围的权限
 */
const dataPermissions = [
  {
    name: '查看所有用户数据',
    code: 'DATA_USER_ALL',
    type: 'DATA',
    dataScope: 'ALL_USERS',
    description: '查看所有用户数据的权限'
  },
  {
    name: '查看本部门用户数据',
    code: 'DATA_USER_DEPARTMENT',
    type: 'DATA',
    dataScope: 'DEPARTMENT_USERS',
    description: '仅查看本部门用户数据的权限'
  },
  {
    name: '查看个人用户数据',
    code: 'DATA_USER_SELF',
    type: 'DATA',
    dataScope: 'SELF_USERS',
    description: '仅查看个人相关用户数据的权限'
  },
  {
    name: '查看区域用户数据',
    code: 'DATA_USER_REGION',
    type: 'DATA',
    dataScope: 'REGION_USERS',
    description: '查看指定区域用户数据的权限'
  }
];

/**
 * 权限使用场景示例
 */
function demonstratePermissionUsage() {
  console.log('=== 权限使用场景示例 ===');
  
  // 1. 用户访问菜单页面
  console.log('1. 用户访问 /system/users 页面:');
  console.log('   - 需要 MENU 类型权限: USER_MANAGE');
  console.log('   - 需要对应的菜单路径匹配');
  
  // 2. 用户在页面中执行操作
  console.log('\n2. 用户在用户管理页面执行操作:');
  console.log('   - 显示"创建用户"按钮需要 BUTTON 类型权限: USER_CREATE');
  console.log('   - 显示"编辑用户"按钮需要 BUTTON 类型权限: USER_EDIT');
  console.log('   - 显示"删除用户"按钮需要 BUTTON 类型权限: USER_DELETE');
  
  // 3. 前端发起API请求
  console.log('\n3. 前端发起API请求:');
  console.log('   - 调用 GET /api/users 需要 API 类型权限: API_USER_LIST');
  console.log('   - 调用 POST /api/users 需要 API 类型权限: API_USER_CREATE');
  
  // 4. 后端控制数据访问范围
  console.log('\n4. 后端控制数据访问范围:');
  console.log('   - 返回所有用户数据需要 DATA 类型权限: DATA_USER_ALL');
  console.log('   - 只返回本部门数据需要 DATA 类型权限: DATA_USER_DEPARTMENT');
  console.log('   - 只返回个人数据需要 DATA 类型权限: DATA_USER_SELF');
}

/**
 * 权限关联示例
 */
function demonstratePermissionAssociation() {
  console.log('\n=== 权限关联示例 ===');
  
  // MENU权限通常与前端路由关联
  console.log('MENU权限关联:');
  console.log('  - 路由路径: /system/users');
  console.log('  - 关联权限: USER_MANAGE');
  console.log('  - 字段使用: menuPath = "/system/users"');
  
  // BUTTON权限通常与页面内操作关联
  console.log('\nBUTTON权限关联:');
  console.log('  - 页面路径: /system/users');
  console.log('  - 操作按钮: 创建用户');
  console.log('  - 关联权限: USER_CREATE');
  console.log('  - 字段使用: menuPath = "/system/users"');
  
  // API权限通常与后端接口关联
  console.log('\nAPI权限关联:');
  console.log('  - 接口路径: POST /api/users');
  console.log('  - 关联权限: API_USER_CREATE');
  console.log('  - 字段使用: apiPath = "POST /api/users"');
  
  // DATA权限通常与数据范围关联
  console.log('\nDATA权限关联:');
  console.log('  - 数据范围: 本部门用户');
  console.log('  - 关联权限: DATA_USER_DEPARTMENT');
  console.log('  - 字段使用: dataScope = "DEPARTMENT_USERS"');
}

/**
 * 权限查询示例
 */
async function demonstratePermissionQuery() {
  console.log('\n=== 权限查询示例 ===');
  
  // 按类型查询权限
  console.log('按类型查询权限:');
  console.log('  - 查询所有MENU权限');
  console.log('  - 查询所有BUTTON权限');
  console.log('  - 查询所有API权限');
  console.log('  - 查询所有DATA权限');
  
  // 按路径查询权限
  console.log('\n按路径查询权限:');
  console.log('  - 根据菜单路径查询权限: /system/users');
  console.log('  - 根据API路径查询权限: POST /api/users');
  console.log('  - 根据数据范围查询权限: DEPARTMENT_USERS');
  
  // 组合查询权限
  console.log('\n组合查询权限:');
  console.log('  - 查询用户管理页面的所有权限');
  console.log('  - 查询用户相关API的所有权限');
  console.log('  - 查询特定数据范围的所有权限');
}

// 运行示例
demonstratePermissionUsage();
demonstratePermissionAssociation();
demonstratePermissionQuery();

export {
  menuPermissions,
  buttonPermissions,
  apiPermissions,
  dataPermissions,
  demonstratePermissionUsage,
  demonstratePermissionAssociation,
  demonstratePermissionQuery
};