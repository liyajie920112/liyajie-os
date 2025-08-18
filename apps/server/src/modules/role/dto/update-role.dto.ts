import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({ description: '角色名称' })
  name?: string;

  @ApiPropertyOptional({ description: '角色代码' })
  code?: string;

  @ApiPropertyOptional({ description: '角色描述' })
  description?: string;

  @ApiPropertyOptional({ description: '角色状态' })
  status?: boolean;
}
