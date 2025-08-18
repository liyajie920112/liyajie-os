import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionType } from '@prisma/client';

export class QueryPermissionDto {
  @ApiPropertyOptional({ description: '权限名称' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: '权限代码' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ description: '权限类型', enum: PermissionType })
  @IsOptional()
  type?: PermissionType;

  @ApiPropertyOptional({ description: '权限状态' })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
