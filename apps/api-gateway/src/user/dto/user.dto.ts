import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UserDTO {
  @ApiProperty({
    description: '用户名称',
    example: '张三',
    required: true,
  })
  @Length(2, 20)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '用户昵称',
    example: '三哥',
    required: false,
  })
  @IsOptional()
  nickName?: string;

  @ApiProperty({
    description: '用户邮箱',
    example: '123456789@qq.com',
    required: true,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
    required: true,
  })
  @IsOptional()
  password: string;
}
