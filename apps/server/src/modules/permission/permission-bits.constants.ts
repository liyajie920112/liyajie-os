/**
 * 权限位常量定义
 * 定义系统中各种权限对应的位位置
 */

// 用户管理权限 (0-15)
export const USER_PERMISSIONS = {
  USER_READ: 0,      // 用户读取权限
  USER_WRITE: 1,     // 用户写入权限
  USER_UPDATE: 2,    // 用户更新权限
  USER_DELETE: 3,    // 用户删除权限
  USER_EXPORT: 4,    // 用户导出权限
  USER_IMPORT: 5,    // 用户导入权限
  USER_ROLE_ASSIGN: 6, // 用户角色分配权限
  USER_STATUS_CHANGE: 7, // 用户状态变更权限
  // ... 可以继续扩展到15
};

// 角色管理权限 (16-31)
export const ROLE_PERMISSIONS = {
  ROLE_READ: 16,     // 角色读取权限
  ROLE_WRITE: 17,    // 角色写入权限
  ROLE_UPDATE: 18,   // 角色更新权限
  ROLE_DELETE: 19,   // 角色删除权限
  ROLE_EXPORT: 20,   // 角色导出权限
  ROLE_PERMISSION_ASSIGN: 21, // 角色权限分配权限
  ROLE_STATUS_CHANGE: 22, // 角色状态变更权限
  // ... 可以继续扩展到31
};

// 权限管理权限 (32-47)
export const PERMISSION_PERMISSIONS = {
  PERMISSION_READ: 32,   // 权限读取权限
  PERMISSION_WRITE: 33,  // 权限写入权限
  PERMISSION_UPDATE: 34, // 权限更新权限
  PERMISSION_DELETE: 35, // 权限删除权限
  PERMISSION_EXPORT: 36, // 权限导出权限
  // ... 可以继续扩展到47
};

// 系统管理权限 (48-63)
export const SYSTEM_PERMISSIONS = {
  SYSTEM_CONFIG_READ: 48,  // 系统配置读取权限
  SYSTEM_CONFIG_WRITE: 49, // 系统配置写入权限
  SYSTEM_LOG_READ: 50,     // 系统日志读取权限
  SYSTEM_BACKUP: 51,       // 系统备份权限
  SYSTEM_RESTORE: 52,      // 系统恢复权限
  // ... 可以继续扩展到63
};

// 扩展权限组 - 数据管理权限 (64-127)
export const DATA_PERMISSIONS = {
  DATA_READ: 64,      // 数据读取权限
  DATA_WRITE: 65,     // 数据写入权限
  DATA_UPDATE: 66,    // 数据更新权限
  DATA_DELETE: 67,    // 数据删除权限
  DATA_EXPORT: 68,    // 数据导出权限
  DATA_IMPORT: 69,    // 数据导入权限
  // ... 可以继续扩展
};

// 扩展权限组 - 报表权限 (128-191)
export const REPORT_PERMISSIONS = {
  REPORT_VIEW: 128,   // 查看报表权限
  REPORT_EXPORT: 129, // 导出报表权限
  REPORT_SCHEDULE: 130, // 定时报表权限
  // ... 可以继续扩展
};

// 获取所有权限位定义
export const ALL_PERMISSIONS = {
  ...USER_PERMISSIONS,
  ...ROLE_PERMISSIONS,
  ...PERMISSION_PERMISSIONS,
  ...SYSTEM_PERMISSIONS,
  ...DATA_PERMISSIONS,
  ...REPORT_PERMISSIONS,
};