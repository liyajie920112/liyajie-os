import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiPropertyOptional({ description: '权限名称' })
  name?: string;

  @ApiPropertyOptional({ description: '权限代码' })
  code?: string;

  @ApiPropertyOptional({ description: '权限类型' })
  type?: string;

  @ApiPropertyOptional({ description: '权限描述' })
  description?: string;

  @ApiPropertyOptional({ description: '权限状态' })
  status?: boolean;

  @ApiPropertyOptional({ description: '关联的菜单路径' })
  menuPath?: string;

  @ApiPropertyOptional({ description: 'API路径（用于API类型权限）' })
  apiPath?: string;

  @ApiPropertyOptional({ description: '数据范围（用于DATA类型权限）' })
  dataScope?: string;
}