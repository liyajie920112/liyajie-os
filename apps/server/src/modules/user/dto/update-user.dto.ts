import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: '用户名' })
  username?: string;

  @ApiPropertyOptional({ description: '邮箱' })
  email?: string;

  @ApiPropertyOptional({ description: '密码' })
  password?: string;

  @ApiPropertyOptional({ description: '姓名' })
  name?: string;

  @ApiPropertyOptional({ description: '头像' })
  avatar?: string;

  @ApiPropertyOptional({ description: '用户状态' })
  status?: boolean;
}
