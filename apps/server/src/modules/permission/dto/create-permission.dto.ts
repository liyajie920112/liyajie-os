import { IsString, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionType } from '@prisma/client';

export class CreatePermissionDto {
  @ApiProperty({ description: '权限名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '权限代码' })
  @IsString()
  code: string;

  @ApiProperty({ description: '权限类型', enum: PermissionType })
  @IsEnum(PermissionType)
  type: PermissionType;

  @ApiPropertyOptional({ description: '权限描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: '权限状态', default: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean = true;
}
