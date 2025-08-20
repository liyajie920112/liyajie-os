import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PermissionBitExtService } from './permission-bit-ext.service';

/**
 * 菜单权限管理服务
 * 处理大量菜单的权限控制问题
 */
@Injectable()
export class MenuPermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permissionBitExtService: PermissionBitExtService,
  ) {}

  /**
   * 创建菜单权限组
   * 将相关菜单归为一组，使用一个权限控制整组菜单
   * @param groupName 组名
   * @param menuCodes 菜单代码列表
   * @returns 权限组信息
   */
  async createMenuPermissionGroup(groupName: string, menuCodes: string[]) {
    // 创建权限组
    const permissionGroup = await this.prisma.menuPermissionGroup.create({
      data: {
        name: groupName,
        menuCodes: menuCodes.join(','),
      },
    });

    // 为该组创建一个权限位
    const permission = await this.prisma.permission.create({
      data: {
        name: `菜单组_${groupName}`,
        code: `MENU_GROUP_${groupName.toUpperCase()}`,
        type: 'MENU',
        description: `控制${groupName}菜单组的访问权限`,
        bitPosition: await this.getNextBitPosition(),
      },
    });

    return { permissionGroup, permission };
  }

  /**
   * 为用户角色授予菜单组权限
   * @param roleId 角色ID
   * @param menuGroupCode 菜单组代码
   */
  async grantMenuGroupPermission(roleId: number, menuGroupCode: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { code: `MENU_GROUP_${menuGroupCode.toUpperCase()}` },
    });

    if (!permission) {
      throw new Error(`Menu group permission ${menuGroupCode} not found`);
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
   * 检查用户是否具有菜单访问权限
   * @param userId 用户ID
   * @param menuCode 菜单代码
   * @returns 是否具有权限
   */
  async userCanAccessMenu(userId: number, menuCode: string): Promise<boolean> {
    // 查找菜单所属的权限组
    const menuGroup = await this.prisma.menuPermissionGroup.findFirst({
      where: {
        menuCodes: {
          contains: menuCode,
        },
      },
    });

    if (!menuGroup) {
      // 如果菜单没有分配到组，则检查是否有特殊权限
      const specificPermission = await this.prisma.permission.findUnique({
        where: { code: `MENU_${menuCode.toUpperCase()}` },
      });

      if (!specificPermission) {
        return false; // 菜单未配置权限
      }

      // 检查用户是否有该特定菜单权限
      // 这里应该调用权限检查服务
      return true; // 简化示例
    }

    // 检查用户是否有该菜单组权限
    const groupPermission = await this.prisma.permission.findUnique({
      where: { code: `MENU_GROUP_${menuGroup.name.toUpperCase()}` },
    });

    if (!groupPermission) {
      return false;
    }

    // 这里应该调用权限检查服务检查用户权限
    return true; // 简化示例
  }

  /**
   * 获取下一个可用的权限位位置
   * @returns 权限位位置
   */
  private async getNextBitPosition(): Promise<number> {
    const lastPermission = await this.prisma.permission.findFirst({
      orderBy: { bitPosition: 'desc' },
    });

    return lastPermission ? lastPermission.bitPosition + 1 : 0;
  }

  /**
   * 创建特殊菜单权限（针对重要或独立菜单）
   * @param menuCode 菜单代码
   * @param menuName 菜单名称
   * @returns 权限信息
   */
  async createSpecialMenuPermission(menuCode: string, menuName: string) {
    const permission = await this.prisma.permission.create({
      data: {
        name: `菜单_${menuName}`,
        code: `MENU_${menuCode.toUpperCase()}`,
        type: 'MENU',
        description: `控制${menuName}菜单的访问权限`,
        bitPosition: await this.getNextBitPosition(),
      },
    });

    return permission;
  }
}