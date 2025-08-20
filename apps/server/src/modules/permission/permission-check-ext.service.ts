import { Injectable } from '@nestjs/common';
import { PermissionBitExtService } from './permission-bit-ext.service';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * 扩展权限检查服务
 * 支持超过64个权限位的权限检查
 */
@Injectable()
export class PermissionCheckExtService {
  constructor(
    private readonly permissionBitExtService: PermissionBitExtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * 检查用户是否具有特定权限
   * @param userId 用户ID
   * @param permissionCode 权限代码
   * @returns 是否具有权限
   */
  async userHasPermission(userId: number, permissionCode: string): Promise<boolean> {
    // 查找用户关联的角色
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });

    if (!userRoles || userRoles.length === 0) {
      return false;
    }

    // 查找权限对应的位位置
    const permission = await this.prisma.permission.findUnique({
      where: { code: permissionCode },
    });

    if (!permission) {
      return false;
    }

    // 检查用户任何角色是否具有该权限
    for (const userRole of userRoles) {
      // 从角色中解析权限字段数组
      const rolePermissions = this.permissionBitExtService.stringToPermissions(
        (userRole.role as any).permissionsString || ''
      );
      
      if (this.permissionBitExtService.hasPermission(
        rolePermissions,
        permission.bitPosition,
      )) {
        return true;
      }
    }

    return false;
  }

  /**
   * 获取用户所有权限
   * @param userId 用户ID
   * @returns 用户权限字段数组
   */
  async getUserPermissions(userId: number): Promise<bigint[]> {
    // 查找用户关联的角色
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });

    if (!userRoles || userRoles.length === 0) {
      return [];
    }

    // 合并所有角色的权限
    let permissions: bigint[] = [];
    for (const userRole of userRoles) {
      const rolePermissions = this.permissionBitExtService.stringToPermissions(
        (userRole.role as any).permissionsString || ''
      );
      
      permissions = this.permissionBitExtService.combinePermissions(
        permissions,
        rolePermissions,
      );
    }

    return permissions;
  }

  /**
   * 为角色授予权限
   * @param roleId 角色ID
   * @param permissionCode 权限代码
   * @returns 更新后的角色
   */
  async grantRolePermission(roleId: number, permissionCode: string): Promise<any> {
    // 查找权限对应的位位置
    const permission = await this.prisma.permission.findUnique({
      where: { code: permissionCode },
    });

    if (!permission) {
      throw new Error(`Permission with code ${permissionCode} not found`);
    }

    // 获取角色当前权限
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    // 从角色中解析权限字段数组
    let rolePermissions = this.permissionBitExtService.stringToPermissions(
      (role as any).permissionsString || ''
    );
    
    // 授予权限
    rolePermissions = this.permissionBitExtService.grantPermission(
      rolePermissions,
      permission.bitPosition,
    );

    // 将权限字段数组转换为字符串存储
    const permissionsString = this.permissionBitExtService.permissionsToString(rolePermissions);

    // 更新角色权限
    return this.prisma.role.update({
      where: { id: roleId },
      data: { permissionsString },
    });
  }

  /**
   * 为角色撤销权限
   * @param roleId 角色ID
   * @param permissionCode 权限代码
   * @returns 更新后的角色
   */
  async revokeRolePermission(roleId: number, permissionCode: string): Promise<any> {
    // 查找权限对应的位位置
    const permission = await this.prisma.permission.findUnique({
      where: { code: permissionCode },
    });

    if (!permission) {
      throw new Error(`Permission with code ${permissionCode} not found`);
    }

    // 获取角色当前权限
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    // 从角色中解析权限字段数组
    let rolePermissions = this.permissionBitExtService.stringToPermissions(
      (role as any).permissionsString || ''
    );
    
    // 撤销权限
    rolePermissions = this.permissionBitExtService.revokePermission(
      rolePermissions,
      permission.bitPosition,
    );

    // 将权限字段数组转换为字符串存储
    const permissionsString = this.permissionBitExtService.permissionsToString(rolePermissions);

    // 更新角色权限
    return this.prisma.role.update({
      where: { id: roleId },
      data: { permissionsString },
    });
  }
}