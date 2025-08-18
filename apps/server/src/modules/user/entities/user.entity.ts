export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  name?: string | null;
  avatar?: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
