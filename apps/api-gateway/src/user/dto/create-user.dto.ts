import { UserDTO } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class CreateUserDTO extends PickType(UserDTO, ['name', 'nickName', 'email', 'password']) {}
