import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';

@ApiTags('用户管理')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: '成功创建用户',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({ name: 'username', required: false, description: '用户名' })
  @ApiQuery({ name: 'email', required: false, description: '邮箱' })
  @ApiQuery({ name: 'status', required: false, description: '用户状态' })
  @ApiResponse({
    status: 200,
    description: '成功获取用户列表',
    type: [User],
  })
  findAll(@Query() query: QueryUserDto): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户详情' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取用户详情',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: '用户未找到',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: '成功更新用户',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: '用户未找到',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * 软删除用户
   */
  @Delete(':id/soft')
  @ApiOperation({ summary: '软删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功软删除用户',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: '用户未找到',
  })
  softRemove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.softRemove(id);
  }

  /**
   * 硬删除用户（物理删除）
   */
  @Delete(':id')
  @ApiOperation({ summary: '硬删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({
    status: 204,
    description: '成功硬删除用户',
  })
  @ApiResponse({
    status: 404,
    description: '用户未找到',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
