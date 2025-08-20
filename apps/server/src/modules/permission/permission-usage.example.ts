/**
 * 权限系统使用示例
 * 展示如何使用扩展的二进制权限控制系统
 */

import { PermissionBitExtService } from './permission-bit-ext.service';
import { ALL_PERMISSIONS } from './permission-bits.constants';

// 假设我们有一个权限服务实例
const permissionService = new PermissionBitExtService();

// 示例1: 创建具有多种权限的角色
function createAdminRolePermissions(): bigint[] {
  // 创建一个空的权限数组
  let permissions: bigint[] = [];
  
  // 为管理员授予所有用户管理权限
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_READ);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_WRITE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_UPDATE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_DELETE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_EXPORT);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_IMPORT);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_ROLE_ASSIGN);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_STATUS_CHANGE);
  
  // 为管理员授予所有角色管理权限
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.ROLE_READ);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.ROLE_WRITE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.ROLE_UPDATE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.ROLE_DELETE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.ROLE_PERMISSION_ASSIGN);
  
  // 为管理员授予系统管理权限
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.SYSTEM_CONFIG_READ);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.SYSTEM_CONFIG_WRITE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.SYSTEM_LOG_READ);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.SYSTEM_BACKUP);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.SYSTEM_RESTORE);
  
  // 为管理员授予数据管理权限（这些权限位超过64位）
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_READ);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_WRITE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_UPDATE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_DELETE);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_EXPORT);
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_IMPORT);
  
  return permissions;
}

// 示例2: 检查用户是否具有特定权限
async function checkUserPermission(userId: number, permissionCode: string): Promise<boolean> {
  // 这里应该调用实际的权限检查服务
  // 为演示目的，我们直接返回true
  return true;
}

// 示例3: 权限位操作演示
function demonstratePermissionOperations() {
  console.log('=== 权限位操作演示 ===');
  
  // 创建空权限
  let permissions: bigint[] = [];
  console.log('初始权限:', permissionService.getPermissionBits(permissions));
  
  // 授予用户读取权限 (位0)
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.USER_READ);
  console.log('授予用户读取权限后:', permissionService.getPermissionBits(permissions));
  
  // 授予数据读取权限 (位64，超过64位)
  permissions = permissionService.grantPermission(permissions, ALL_PERMISSIONS.DATA_READ);
  console.log('授予数据读取权限后:', permissionService.getPermissionBits(permissions));
  
  // 检查权限
  console.log('是否具有用户读取权限:', permissionService.hasPermission(permissions, ALL_PERMISSIONS.USER_READ));
  console.log('是否具有数据读取权限:', permissionService.hasPermission(permissions, ALL_PERMISSIONS.DATA_READ));
  console.log('是否具有用户写入权限:', permissionService.hasPermission(permissions, ALL_PERMISSIONS.USER_WRITE));
  
  // 撤销权限
  permissions = permissionService.revokePermission(permissions, ALL_PERMISSIONS.USER_READ);
  console.log('撤销用户读取权限后:', permissionService.getPermissionBits(permissions));
  console.log('是否还具有用户读取权限:', permissionService.hasPermission(permissions, ALL_PERMISSIONS.USER_READ));
}

// 示例4: 权限合并演示
function demonstratePermissionCombining() {
  console.log('\n=== 权限合并演示 ===');
  
  // 创建两个权限集
  const permissions1 = permissionService.createPermissionsFromBits([
    ALL_PERMISSIONS.USER_READ,
    ALL_PERMISSIONS.USER_WRITE,
    ALL_PERMISSIONS.DATA_READ
  ]);
  
  const permissions2 = permissionService.createPermissionsFromBits([
    ALL_PERMISSIONS.ROLE_READ,
    ALL_PERMISSIONS.ROLE_WRITE,
    ALL_PERMISSIONS.DATA_WRITE
  ]);
  
  console.log('权限集1:', permissionService.getPermissionBits(permissions1));
  console.log('权限集2:', permissionService.getPermissionBits(permissions2));
  
  // 合并权限
  const combinedPermissions = permissionService.combinePermissions(permissions1, permissions2);
  console.log('合并后权限:', permissionService.getPermissionBits(combinedPermissions));
  
  // 检查合并后的权限
  console.log('是否具有用户读取权限:', permissionService.hasPermission(combinedPermissions, ALL_PERMISSIONS.USER_READ));
  console.log('是否具有角色读取权限:', permissionService.hasPermission(combinedPermissions, ALL_PERMISSIONS.ROLE_READ));
  console.log('是否具有数据读取权限:', permissionService.hasPermission(combinedPermissions, ALL_PERMISSIONS.DATA_READ));
}

// 运行演示
demonstratePermissionOperations();
demonstratePermissionCombining();

export {
  createAdminRolePermissions,
  checkUserPermission,
  demonstratePermissionOperations,
  demonstratePermissionCombining
};