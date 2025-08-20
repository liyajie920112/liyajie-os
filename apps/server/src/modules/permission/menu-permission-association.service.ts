import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PermissionService } from './permission.service';

/**
 * 菜单权限关联服务
 * 处理菜单与权限的关联关系
 */
@Injectable()
export class MenuPermissionAssociationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permissionService: PermissionService,
  ) {}

  /**
   * 为菜单创建权限
   * @param menuPath 菜单路径
   * @param permissionData 权限数据
   * @returns 创建的权限
   */
  async createPermissionForMenu(
    menuPath: string,
    permissionData: {
      name: string;
      code: string;
      type?: string;
      description?: string;
    },
  ) {
    // 创建权限并关联菜单路径
    const permission = await this.permissionService.create({
      ...permissionData,
      type: permissionData.type as any || 'MENU',
      menuPath: menuPath,
    });

    return permission;
  }

  /**
   * 获取菜单的所有权限
   * @param menuPath 菜单路径
   * @returns 权限列表
   */
  async getPermissionsForMenu(menuPath: string) {
    return this.permissionService.findByMenuPath(menuPath);
  }

  /**
   * 为菜单分配权限
   * @param menuPath 菜单路径
   * @param permissionId 权限ID
   * @returns 更新后的权限
   */
  async assignPermissionToMenu(menuPath: string, permissionId: number) {
    const permission = await this.prisma.permission.update({
      where: { id: permissionId },
      data: { menuPath },
    });

    return permission;
  }

  /**
   * 移除菜单的权限关联
   * @param permissionId 权限ID
   * @returns 更新后的权限
   */
  async removeMenuPermissionAssociation(permissionId: number) {
    const permission = await this.prisma.permission.update({
      where: { id: permissionId },
      data: { menuPath: null },
    });

    return permission;
  }

  /**
   * 获取所有菜单及其权限的映射关系
   * @returns 菜单权限映射
   */
  async getMenuPermissionMap() {
    const permissions = await this.prisma.permission.findMany({
      where: {
        menuPath: {
          not: null,
        },
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        code: true,
        menuPath: true,
        type: true,
      },
    });

    // 构建菜单权限映射
    const menuPermissionMap: Record<string, any[]> = {};

    for (const permission of permissions) {
      const menuPath = permission.menuPath;
      if (menuPath) {
        if (!menuPermissionMap[menuPath]) {
          menuPermissionMap[menuPath] = [];
        }
        menuPermissionMap[menuPath].push(permission);
      }
    }

    return menuPermissionMap;
  }
}