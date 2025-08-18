import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryRoleDto {
  @ApiPropertyOptional({ description: '角色名称' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: '角色代码' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ description: '角色状态' })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
