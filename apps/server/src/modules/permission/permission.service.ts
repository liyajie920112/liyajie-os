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
    const result = await this.prisma.permission.create({
      data: createPermissionDto,
    });
    return result as unknown as Permission;
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

    const results = await this.prisma.permission.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return results as unknown as Permission[];
  }

  async findOne(id: number): Promise<Permission> {
    const result = await this.prisma.permission.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    // 检查是否已被软删除
    if (result.deletedAt) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return result as unknown as Permission;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    // 先检查是否存在且未被软删除
    await this.findOne(id);

    const result = await this.prisma.permission.update({
      where: {
        id,
      },
      data: updatePermissionDto,
    });

    return result as unknown as Permission;
  }

  /**
   * 软删除权限（假删除）
   * @param id 权限ID
   * @returns 被删除的权限
   */
  async softRemove(id: number): Promise<Permission> {
    try {
      // 先检查权限是否存在且未被软删除
      await this.findOne(id);

      const result = await this.prisma.permission.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return result as unknown as Permission;
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
}
