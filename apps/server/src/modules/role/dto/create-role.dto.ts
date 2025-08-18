import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '角色代码' })
  @IsString()
  code: string;

  @ApiPropertyOptional({ description: '角色描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: '角色状态', default: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean = true;
}
