export class Role {
  id: number;
  name: string;
  code: string;
  description?: string | null;
  status: boolean;
  permissions: bigint; // 基础权限位 (0-63)
  permissionsString?: string; // 扩展权限位字符串表示
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}