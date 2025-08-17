import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { PermissionType } from '@prisma/client';

export class QueryPermissionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsEnum(PermissionType)
  @IsOptional()
  type?: PermissionType;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}