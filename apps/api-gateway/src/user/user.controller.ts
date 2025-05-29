import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Prisma } from '@database/prisma';
import { CreateUserDTO } from './dto/create-user.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @Get('/list')
  async getUserList() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '获取用户详情' })
  @Get('/detail/:id')
  async getUserDetail(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDTO })
  @Post('/create')
  async createUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: '更新用户' })
  @Post('/update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(id, user);
  }

  @ApiOperation({ summary: '删除用户' })
  @Post('/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
