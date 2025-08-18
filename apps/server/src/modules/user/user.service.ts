import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user as unknown as User;
  }

  async findAll(query: QueryUserDto): Promise<User[]> {
    const where: Prisma.UserWhereInput = {
      deletedAt: null, // 只查询未删除的用户
    };

    if (query.username) {
      where.username = {
        contains: query.username,
      };
    }

    if (query.email) {
      where.email = {
        contains: query.email,
      };
    }

    if (query.status !== undefined) {
      where.status = query.status;
    }

    const users = await this.prisma.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return users as unknown as User[];
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // 检查是否已被软删除
    if (user.deletedAt) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user as unknown as User;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // 先检查是否存在且未被软删除
    await this.findOne(id);

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user as unknown as User;
  }

  /**
   * 软删除用户（假删除）
   * @param id 用户ID
   * @returns 被删除的用户
   */
  async softRemove(id: number): Promise<User> {
    try {
      // 先检查用户是否存在且未被软删除
      await this.findOne(id);

      const user = await this.prisma.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return user as unknown as User;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  /**
   * 硬删除用户（物理删除）
   * @param id 用户ID
   */
  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw error;
    }
  }
}
