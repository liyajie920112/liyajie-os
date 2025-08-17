import { PermissionType } from '@prisma/client';

export class Permission {
  id: number;
  name: string;
  code: string;
  type: PermissionType;
  description: string | null | undefined;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null | undefined;
}
