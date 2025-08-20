import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { Permission } from './entities/permission.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    // 获取下一个可用的权限位位置
    const maxBitPosition = await this.prisma.permission.findFirst({
      orderBy: { bitPosition: 'desc' },
    });
    
    const nextBitPosition = maxBitPosition ? maxBitPosition.bitPosition + 1 : 0;

    const permission = await this.prisma.permission.create({
      data: {
        ...createPermissionDto,
        bitPosition: nextBitPosition,
      },
    });
    return permission as unknown as Permission;
  }

  async findAll(query: QueryPermissionDto): Promise<Permission[]> {
    const where: Prisma.PermissionWhereInput = {
      deletedAt: null, // 只查询未删除的权限
    };

    if (query.name) {
      where.name = {
        contains: query.name,
      };
    }

    if (query.code) {
      where.code = {
        contains: query.code,
      };
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.status !== undefined) {
      where.status = query.status;
    }

    if (query.menuPath) {
      where.menuPath = {
        contains: query.menuPath,
      };
    }

    if (query.apiPath) {
      where.apiPath = {
        contains: query.apiPath,
      };
    }

    if (query.dataScope) {
      where.dataScope = {
        contains: query.dataScope,
      };
    }

    const permissions = await this.prisma.permission.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return permissions as unknown as Permission[];
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.prisma.permission.findUnique({
      where: { 
        id,
      },
    });

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    // 检查是否已被软删除
    if (permission.deletedAt) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return permission as unknown as Permission;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    // 先检查是否存在且未被软删除
    await this.findOne(id);

    const permission = await this.prisma.permission.update({
      where: { 
        id,
      },
      data: updatePermissionDto,
    });

    return permission as unknown as Permission;
  }

  /**
   * 软删除权限
   * @param id 权限ID
   * @returns 被删除的权限
   */
  async softRemove(id: number): Promise<Permission> {
    try {
      // 先检查权限是否存在且未被软删除
      await this.findOne(id);

      const permission = await this.prisma.permission.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return permission as unknown as Permission;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Permission with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  /**
   * 硬删除权限（物理删除）
   * @param id 权限ID
   */
  async remove(id: number): Promise<void> {
    try {
      await this.prisma.permission.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Permission with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  /**
   * 根据菜单路径查找权限
   * @param menuPath 菜单路径
   * @returns 权限列表
   */
  async findByMenuPath(menuPath: string): Promise<Permission[]> {
    const permissions = await this.prisma.permission.findMany({
      where: {
        menuPath: {
          contains: menuPath,
        },
        deletedAt: null,
      },
    });
    return permissions as unknown as Permission[];
  }

  /**
   * 根据API路径查找权限
   * @param apiPath API路径
   * @returns 权限列表
   */
  async findByApiPath(apiPath: string): Promise<Permission[]> {
    const permissions = await this.prisma.permission.findMany({
      where: {
        apiPath: {
          contains: apiPath,
        },
        deletedAt: null,
      },
    });
    return permissions as unknown as Permission[];
  }

  /**
   * 根据数据范围查找权限
   * @param dataScope 数据范围
   * @returns 权限列表
   */
  async findByDataScope(dataScope: string): Promise<Permission[]> {
    const permissions = await this.prisma.permission.findMany({
      where: {
        dataScope: {
          contains: dataScope,
        },
        deletedAt: null,
      },
    });
    return permissions as unknown as Permission[];
  }

  /**
   * 根据权限类型查找权限
   * @param type 权限类型
   * @returns 权限列表
   */
  async findByType(type: string): Promise<Permission[]> {
    const permissions = await this.prisma.permission.findMany({
      where: {
        type,
        deletedAt: null,
      },
    });
    return permissions as unknown as Permission[];
  }
}