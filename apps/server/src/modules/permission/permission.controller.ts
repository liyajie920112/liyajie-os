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
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { Permission } from './entities/permission.entity';

@ApiTags('权限管理')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ summary: '创建权限' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponse({ 
    status: 201, 
    description: '成功创建权限', 
    type: Permission,
  })
  @ApiResponse({ 
    status: 400, 
    description: '请求参数错误' 
  })
  create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: '获取权限列表' })
  @ApiQuery({ name: 'name', required: false, description: '权限名称' })
  @ApiQuery({ name: 'code', required: false, description: '权限代码' })
  @ApiQuery({ name: 'type', required: false, description: '权限类型' })
  @ApiQuery({ name: 'status', required: false, description: '权限状态' })
  @ApiQuery({ name: 'menuPath', required: false, description: '菜单路径' })
  @ApiQuery({ name: 'apiPath', required: false, description: 'API路径' })
  @ApiQuery({ name: 'dataScope', required: false, description: '数据范围' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取权限列表', 
    type: [Permission],
  })
  findAll(@Query() query: QueryPermissionDto): Promise<Permission[]> {
    return this.permissionService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取权限详情' })
  @ApiParam({ name: 'id', description: '权限ID' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取权限详情', 
    type: Permission,
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Get('menu/:menuPath')
  @ApiOperation({ summary: '根据菜单路径获取权限' })
  @ApiParam({ name: 'menuPath', description: '菜单路径' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取权限列表', 
    type: [Permission],
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  findByMenuPath(@Param('menuPath') menuPath: string): Promise<Permission[]> {
    return this.permissionService.findByMenuPath(menuPath);
  }

  @Get('api/:apiPath')
  @ApiOperation({ summary: '根据API路径获取权限' })
  @ApiParam({ name: 'apiPath', description: 'API路径' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取权限列表', 
    type: [Permission],
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  findByApiPath(@Param('apiPath') apiPath: string): Promise<Permission[]> {
    return this.permissionService.findByApiPath(apiPath);
  }

  @Get('scope/:dataScope')
  @ApiOperation({ summary: '根据数据范围获取权限' })
  @ApiParam({ name: 'dataScope', description: '数据范围' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取权限列表', 
    type: [Permission],
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  findByDataScope(@Param('dataScope') dataScope: string): Promise<Permission[]> {
    return this.permissionService.findByDataScope(dataScope);
  }

  @Get('type/:type')
  @ApiOperation({ summary: '根据权限类型获取权限' })
  @ApiParam({ name: 'type', description: '权限类型' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取权限列表', 
    type: [Permission],
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  findByType(@Param('type') type: string): Promise<Permission[]> {
    return this.permissionService.findByType(type);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新权限' })
  @ApiParam({ name: 'id', description: '权限ID' })
  @ApiBody({ type: UpdatePermissionDto })
  @ApiResponse({ 
    status: 200, 
    description: '成功更新权限', 
    type: Permission,
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  /**
   * 软删除权限
   */
  @Delete(':id/soft')
  @ApiOperation({ summary: '软删除权限' })
  @ApiParam({ name: 'id', description: '权限ID' })
  @ApiResponse({ 
    status: 200, 
    description: '成功软删除权限', 
    type: Permission,
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  softRemove(@Param('id', ParseIntPipe) id: number): Promise<Permission> {
    return this.permissionService.softRemove(id);
  }

  /**
   * 硬删除权限（物理删除）
   */
  @Delete(':id')
  @ApiOperation({ summary: '硬删除权限' })
  @ApiParam({ name: 'id', description: '权限ID' })
  @ApiResponse({ 
    status: 204, 
    description: '成功硬删除权限' 
  })
  @ApiResponse({ 
    status: 404, 
    description: '权限未找到' 
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.permissionService.remove(id);
  }
}