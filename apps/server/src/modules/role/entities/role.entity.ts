export class Role {
  id: number;
  name: string;
  code: string;
  description?: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
