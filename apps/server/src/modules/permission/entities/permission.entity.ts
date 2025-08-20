import { PermissionType } from '@prisma/client';

export class Permission {
  id: number;
  name: string;
  code: string;
  type: PermissionType;
  description?: string | null;
  status: boolean;
  bitPosition: number; // 权限位位置
  menuPath?: string | null; // 关联的菜单路径
  apiPath?: string | null; // API路径（用于API类型权限）
  dataScope?: string | null; // 数据范围（用于DATA类型权限）
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}