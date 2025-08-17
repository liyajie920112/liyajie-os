import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { PermissionType } from '@prisma/client';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsEnum(PermissionType)
  @IsOptional()
  type?: PermissionType = PermissionType.MENU;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean = true;
}