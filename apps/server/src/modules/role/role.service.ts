import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { Role } from './entities/role.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.prisma.role.create({
      data: createRoleDto,
    });
    return role as unknown as Role;
  }

  async findAll(query: QueryRoleDto): Promise<Role[]> {
    const where: Prisma.RoleWhereInput = {
      deletedAt: null, // 只查询未删除的角色
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

    if (query.status !== undefined) {
      where.status = query.status;
    }

    const roles = await this.prisma.role.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return roles as unknown as Role[];
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // 检查是否已被软删除
    if (role.deletedAt) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role as unknown as Role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    // 先检查是否存在且未被软删除
    await this.findOne(id);

    const role = await this.prisma.role.update({
      where: {
        id,
      },
      data: updateRoleDto,
    });

    return role as unknown as Role;
  }

  /**
   * 软删除角色（假删除）
   * @param id 角色ID
   * @returns 被删除的角色
   */
  async softRemove(id: number): Promise<Role> {
    try {
      // 先检查角色是否存在且未被软删除
      await this.findOne(id);

      const role = await this.prisma.role.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return role as unknown as Role;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Role with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  /**
   * 硬删除角色（物理删除）
   * @param id 角色ID
   */
  async remove(id: number): Promise<void> {
    try {
      await this.prisma.role.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Role with ID ${id} not found`);
        }
      }
      throw error;
    }
  }
}
