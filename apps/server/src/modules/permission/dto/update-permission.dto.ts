import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PermissionType } from '@prisma/client';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiPropertyOptional({ description: '权限名称' })
  name?: string;

  @ApiPropertyOptional({ description: '权限代码' })
  code?: string;

  @ApiPropertyOptional({ description: '权限类型', enum: PermissionType })
  @IsEnum(PermissionType)
  type?: PermissionType;

  @ApiPropertyOptional({ description: '权限描述' })
  description?: string;

  @ApiPropertyOptional({ description: '权限状态' })
  status?: boolean;
}
