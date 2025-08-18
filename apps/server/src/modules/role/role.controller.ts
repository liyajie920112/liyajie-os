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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { Role } from './entities/role.entity';

@ApiTags('角色管理')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '创建角色' })
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({
    status: 201,
    description: '成功创建角色',
    type: Role,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数错误',
  })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: '获取角色列表' })
  @ApiQuery({ name: 'name', required: false, description: '角色名称' })
  @ApiQuery({ name: 'code', required: false, description: '角色代码' })
  @ApiQuery({ name: 'status', required: false, description: '角色状态' })
  @ApiResponse({
    status: 200,
    description: '成功获取角色列表',
    type: [Role],
  })
  findAll(@Query() query: QueryRoleDto): Promise<Role[]> {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取角色详情' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取角色详情',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: '角色未找到',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: 200,
    description: '成功更新角色',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: '角色未找到',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, updateRoleDto);
  }

  /**
   * 软删除角色
   */
  @Delete(':id/soft')
  @ApiOperation({ summary: '软删除角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiResponse({
    status: 200,
    description: '成功软删除角色',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: '角色未找到',
  })
  softRemove(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.softRemove(id);
  }

  /**
   * 硬删除角色（物理删除）
   */
  @Delete(':id')
  @ApiOperation({ summary: '硬删除角色' })
  @ApiParam({ name: 'id', description: '角色ID' })
  @ApiResponse({
    status: 204,
    description: '成功硬删除角色',
  })
  @ApiResponse({
    status: 404,
    description: '角色未找到',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
